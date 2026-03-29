import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
    Plus, Edit, Trash2, Search, ArrowLeft, Save,
    FileText, AlertCircle, Loader2, Check, X,
    Sparkles, Eye, Settings, Globe, Image
} from 'lucide-react'
import { BLOG_POSTS, type BlogPost } from '../data/blog'
import type { LanguageCode } from '../utils/languageManager'
import { BlogContentEditor } from '../components/BlogContentEditor'
import './Admin.css'

import { useTutorial } from '../context/TutorialContext'

const AdminBlogManager: React.FC = () => {
    const location = useLocation()
    const [view, setView] = useState<'list' | 'editor'>('list')
    const { currentStep, nextStep } = useTutorial()

    const [posts, setPosts] = useState<BlogPost[]>([])

    // Auto-sync view with tutorial steps
    useEffect(() => {
        if (currentStep >= 5 && view === 'list') {
            handleNew();
        }
    }, [currentStep, view]);

    const [searchTerm, setSearchTerm] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Editor state
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

    // AI Generator state
    const [showAIModal, setShowAIModal] = useState(false)
    const [aiPrompt, setAiPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedModel, setSelectedModel] = useState('llama-3.3-70b-versatile')

    const [selectedLanguage, setSelectedLanguage] = useState('id')

    // Deployment Status state
    const [activeDeploymentSha, setActiveDeploymentSha] = useState<string | null>(null)
    const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'queued' | 'building' | 'ready' | 'failed'>('idle')
    const [deploymentDetails, setDeploymentDetails] = useState<any>(null)

    // Pagination state
    const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(10)
    const [currentPage, setCurrentPage] = useState(1)

    const navigate = useNavigate()

    useEffect(() => {
        // 1. Load from imported BLOG_POSTS (base)
        const basePosts: BlogPost[] = BLOG_POSTS.map(p => ({ ...p, status: 'synced' as const }))

        // 2. Load from localStorage (overrides/new drafts)
        const savedPosts = localStorage.getItem('NATURRA_blog_drafts')
        if (savedPosts) {
            try {
                const parsedDrafts = JSON.parse(savedPosts) as BlogPost[]
                // Merge logic: drafts with same ID as basePosts override them
                const mergedPosts = [...basePosts]
                parsedDrafts.forEach(draft => {
                    const index = mergedPosts.findIndex(p => p.id === draft.id)
                    if (index !== -1) {
                        mergedPosts[index] = draft
                    } else {
                        mergedPosts.push(draft)
                    }
                })
                setPosts(mergedPosts)
            } catch (e) {
                console.error('Error loading drafts:', e)
                setPosts(basePosts)
            }
        } else {
            setPosts(basePosts)
        }
        setIsLoading(false)
    }, [])

    // Save to localStorage whenever posts change
    useEffect(() => {
        if (!isLoading) {
            const drafts = posts.filter(p => p.status === 'draft')
            localStorage.setItem('NATURRA_blog_drafts', JSON.stringify(drafts))
        }
    }, [posts, isLoading])

    // Poll for deployment status
    useEffect(() => {
        let intervalId: any;

        if (activeDeploymentSha && (deploymentStatus === 'queued' || deploymentStatus === 'building' || deploymentStatus === 'idle')) {
            const checkStatus = async () => {
                try {
                    const response = await fetch(`/api/admin/deployment-status?sha=${activeDeploymentSha}`);
                    if (!response.ok) return;

                    const data = await response.json();
                    setDeploymentStatus(data.status);
                    setDeploymentDetails(data);

                    if (data.status === 'ready' || data.status === 'failed') {
                        // Stop polling if finished
                        if (intervalId) clearInterval(intervalId);
                    }
                } catch (error) {
                    console.error('Status check error:', error);
                }
            };

            // Initial check
            checkStatus();

            // Set up polling
            intervalId = setInterval(checkStatus, 5000); // Check every 5 seconds
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [activeDeploymentSha, deploymentStatus])

    const handleEdit = (post: BlogPost) => {
        setEditingPost({
            ...post,
            customContent: post.customContent || {
                introduction: '',
                keyPoints: [],
                language: 'id',
                sections: [],
                conclusion: ''
            }
        })
        setView('editor')
    }

    const handleNew = () => {
        if (currentStep === 4) nextStep();
        const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1
        // Include full date and time
        const now = new Date()
        const dateString = now.toISOString().replace('T', ' ').substring(0, 16)

        setEditingPost({
            id: newId,
            slug: '',
            title: '',
            category: 'Tips and Trick',
            excerpt: '',
            image: '',
            date: dateString,
            author: 'Helmi Ramdan',
            status: 'draft',
            customContent: {
                introduction: '',
                keyPoints: [],
                language: 'id',
                sections: [],
                conclusion: ''
            }
        })
        setView('editor')
    }

    const handleSavePost = () => {
        if (!editingPost || !editingPost.slug || !editingPost.title) {
            setMessage({ type: 'error', text: 'Slug and Title are required' })
            return
        }

        // New or edited posts get 'draft' status
        const postToSave = { ...editingPost, status: 'draft' as const }

        // Update posts list
        const exists = posts.find(p => p.id === postToSave.id)
        let updatedPosts: BlogPost[]
        if (exists) {
            updatedPosts = posts.map(p => p.id === postToSave.id ? postToSave : p)
        } else {
            updatedPosts = [...posts, postToSave]
        }

        setPosts(updatedPosts)
        setView('list')
        setMessage({ type: 'success', text: 'Post saved locally as draft. Click "Deploy Changes" to make it live.' })
    }

    const handleSyncToFiles = async () => {
        setIsSaving(true)
        setMessage(null)

        try {
            setMessage({ type: 'success', text: 'Deploying changes to GitHub...' })

            const deployResponse = await fetch('/api/admin/deploy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    posts: posts,
                    commitMessage: `Update blog posts via admin (${new Date().toISOString().split('T')[0]})`
                })
            })

            const deployResult = await deployResponse.json()

            if (deployResponse.ok && deployResult.deployed) {
                // Mark all as synced and clear local drafts
                const syncedPosts = posts.map(p => ({ ...p, status: 'synced' as const }))
                setPosts(syncedPosts)
                localStorage.removeItem('NATURRA_blog_drafts')

                if (deployResult.commitSha) {
                    setActiveDeploymentSha(deployResult.commitSha)
                    setDeploymentStatus('idle') // Will trigger polling
                }

                setMessage({
                    type: 'success',
                    text: '✅ Changes pushed to GitHub! Vercel build started. Tracking status below...'
                })
            } else if (deployResponse.ok && !deployResult.deployed) {
                setMessage({
                    type: 'success',
                    text: 'No changes detected to deploy.'
                })
            } else {
                throw new Error(deployResult.error || deployResult.details || 'Auto-deploy failed')
            }
        } catch (error) {
            console.error('Deploy error:', error)
            setMessage({ type: 'error', text: `Auto-deploy failed: ${error instanceof Error ? error.message : 'Unknown error'}` })
        } finally {
            setIsSaving(false)
        }
    }

    const handleGenerateWithAI = async () => {
        if (!aiPrompt.trim()) {
            setMessage({ type: 'error', text: 'Please enter a prompt for AI generation' })
            return
        }

        setIsGenerating(true)
        setMessage(null)

        try {
            const response = await fetch('/api/admin/generate-article', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: aiPrompt,
                    category: editingPost?.category,
                    model: selectedModel,
                    language: selectedLanguage
                })
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'AI generation failed')
            }

            const article = result.article

            // Auto-fill form with AI-generated content
            setEditingPost(p => p ? {
                ...p,
                title: article.title || p.title,
                slug: article.slug || p.slug,
                excerpt: article.excerpt || p.excerpt,
                category: article.category || p.category,
                image: article.image || p.image,
                customContent: {
                    introduction: article.introduction || '',
                    keyPoints: article.keyPoints || [],
                    language: (article.language as LanguageCode) || selectedLanguage || 'id',
                    sections: article.sections || [],
                    conclusion: article.conclusion || ''
                }
            } : null)

            setShowAIModal(false)
            setAiPrompt('')
            setMessage({ type: 'success', text: '✨ Article generated successfully! Review and edit as needed.' })

        } catch (error) {
            console.error('AI generation error:', error)
            setMessage({ type: 'error', text: `AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}` })
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSuggestImage = async () => {
        if (!editingPost?.title) {
            setMessage({ type: 'error', text: 'Please enter a title first so AI can suggest a relevant image' })
            return
        }

        setIsGenerating(true)
        setMessage(null)

        try {
            const response = await fetch('/api/admin/suggest-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editingPost.title,
                    excerpt: editingPost.excerpt,
                    model: selectedModel
                })
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to suggest image')
            }

            if (result.image) {
                setEditingPost(p => p ? { ...p, image: result.image } : null)
                setMessage({ type: 'success', text: `✨ Found a perfect image for: "${result.searchQuery}"` })
            } else {
                setMessage({ type: 'error', text: 'No matching image found on Unsplash' })
            }
        } catch (error) {
            console.error('Suggest image error:', error)
            setMessage({ type: 'error', text: `Failed to suggest image: ${error instanceof Error ? error.message : 'Unknown error'}` })
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSuggestSectionImage = async (index: number) => {
        if (!editingPost || !editingPost.customContent?.sections?.[index]) return

        const section = editingPost.customContent.sections[index]
        if (!section.heading) {
            setMessage({ type: 'error', text: 'Please enter a section heading first' })
            return
        }

        setIsGenerating(true)
        setMessage(null)

        try {
            const response = await fetch('/api/admin/suggest-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: section.heading,
                    excerpt: section.content.replace(/<[^>]*>/g, '').substring(0, 200),
                    model: selectedModel,
                    context: 'blog section content'
                })
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to suggest image')
            }

            if (result.image) {
                const updatedSections = [...(editingPost.customContent?.sections || [])]
                updatedSections[index] = {
                    ...updatedSections[index],
                    image: result.image,
                    imageAlt: result.searchQuery || section.heading
                }

                setEditingPost(p => p ? {
                    ...p,
                    customContent: {
                        ...p.customContent!,
                        sections: updatedSections
                    }
                } : null)

                setMessage({ type: 'success', text: `✨ Found section image for: "${result.searchQuery}"` })
            } else {
                setMessage({ type: 'error', text: 'No matching image found on Unsplash' })
            }
        } catch (error) {
            console.error('Suggest section image error:', error)
            setMessage({ type: 'error', text: `Failed to suggest image: ${error instanceof Error ? error.message : 'Unknown error'}` })
        } finally {
            setIsGenerating(false)
        }
    }

    const deletePost = (id: number) => {
        if (window.confirm('Delete this post? (Permanent after Sync)')) {
            setPosts(posts.filter(p => p.id !== id))
        }
    }

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Pagination Logic
    const sortedPosts = [...filteredPosts].reverse()
    const totalItems = sortedPosts.length
    const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage)

    // Reset to page 1 if search changes or items per page changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, itemsPerPage])

    const indexOfLastItem = currentPage * (itemsPerPage === 'all' ? totalItems : itemsPerPage)
    const indexOfFirstItem = indexOfLastItem - (itemsPerPage === 'all' ? totalItems : itemsPerPage)
    const currentItems = sortedPosts.slice(indexOfFirstItem, indexOfLastItem)

    if (isLoading) {
        return (
            <div className="admin-loading-screen-wrap">
                <div className="loader"></div>
                <p>Syncing Cloud Data...</p>
                <style>{`
                    .admin-loading-screen-wrap {
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: #f8f9fa;
                        color: #004D2C;
                    }
                    .loader {
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #004D2C;
                        
                        width: 40px;
                        height: 40px;
                        animation: spin 1s linear infinite;
                        margin-bottom: 20px;
                    }
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        )
    }

    return (
        <div className="admin-dashboard admin-blog-manager">
            <Helmet>
                <title>{view === 'list' ? 'Blog Manager' : 'Edit Post'} | NATURRA Admin</title>
            </Helmet>

            <header className="admin-header">
                <div className="admin-header-title">
                    <button onClick={() => view === 'list' ? navigate('/admin/dashboard') : setView('list')} className="back-link">
                        <ArrowLeft size={18} />
                    </button>
                    <h1>{view === 'list' ? 'BLOG MANAGER' : 'EDIT ARTICLE'}</h1>
                </div>

                <div className="admin-user-nav">
                    {view === 'list' ? (
                        <button onClick={handleSyncToFiles} className="save-btn" disabled={isSaving}>
                            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            <span>{isSaving ? 'Deploying...' : 'Deploy Changes'}</span>
                        </button>
                    ) : (
                        <button id="admin-save-btn" onClick={handleSavePost} className="save-btn">
                            <Check size={16} />
                            <span>Done Editing</span>
                        </button>
                    )}
                </div>
            </header>

            <main className="admin-main">

                {message && (
                    <div className={`admin-msg ${message.type}`}>
                        {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                        <span>{message.text}</span>
                        <X size={14} className="close-msg" onClick={() => setMessage(null)} />
                    </div>
                )}

                {activeDeploymentSha && (
                    <div className={`deployment-status-card ${deploymentStatus}`}>
                        <div className="status-header">
                            <div className="status-indicator">
                                {deploymentStatus === 'ready' ? <Check size={20} /> :
                                    deploymentStatus === 'failed' ? <X size={20} /> :
                                        <Loader2 size={20} className="animate-spin" />}
                                <h3>Vercel Deployment: {deploymentStatus.toUpperCase()}</h3>
                            </div>
                            <button className="close-status" onClick={() => setActiveDeploymentSha(null)}>
                                <X size={16} />
                            </button>
                        </div>

                        <div className="status-body">
                            <p>
                                {deploymentStatus === 'idle' && 'Initializing deployment tracking...'}
                                {deploymentStatus === 'queued' && 'Deployment is queued. Waiting for Vercel builders...'}
                                {deploymentStatus === 'building' && 'Vercel is currently building your site with the latest changes.'}
                                {deploymentStatus === 'ready' && '✅ Site is LIVE and updated!'}
                                {deploymentStatus === 'failed' && '❌ Deployment failed. Please check Vercel dashboard.'}
                            </p>

                            {deploymentDetails?.checkRunUrl && (
                                <a href={deploymentDetails.checkRunUrl} target="_blank" rel="noopener noreferrer" className="view-link">
                                    View on GitHub Checks
                                </a>
                            )}
                        </div>

                        {deploymentStatus === 'ready' && (
                            <div className="status-footer">
                                <button className="refresh-btn" onClick={() => window.location.reload()}>
                                    Refresh Page to See Updates
                                </button>
                            </div>
                        )}
                    </div>
                )}



                {view === 'list' ? (
                    <div className="admin-blog-list-view">
                        <div className="manager-toolbar">
                            <div className="search-box">
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button id="admin-create-post-btn" className="create-post-btn" onClick={handleNew}>
                                <Plus size={18} />
                                <span>New Article</span>
                            </button>
                        </div>

                        <div id="admin-blog-list-card" className="posts-table-card card">
                            <table className="posts-table">
                                <thead>
                                    <tr>
                                        <th>Title & Information</th>
                                        <th>Category</th>
                                        <th>Config</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(post => (
                                        <tr key={post.id}>
                                            <td>
                                                <div className="post-title-cell">
                                                    <div className="post-thumb">
                                                        {post.image ? (
                                                            <img src={post.image} alt="" />
                                                        ) : (
                                                            <div className="thumb-placeholder"><FileText size={18} /></div>
                                                        )}
                                                    </div>
                                                    <div className="post-title-info">
                                                        <span className="post-title-text">{post.title}</span>
                                                        <span className="post-slug-text">{post.slug}</span>
                                                        <span className="post-date-text">{post.date}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="cat-badge">{post.category}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <span className={`lang-badge ${post.customContent?.language || 'id'}`}>
                                                        {post.customContent?.language?.toUpperCase() || 'ID'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${post.status === 'draft' ? 'draft' : 'live'}`}>
                                                    {post.status === 'draft' ? 'Draft' : 'Live'}
                                                </span>
                                            </td>
                                            <td className="actions-cell">
                                                <Link to={`/blog/${post.slug}`} className="action-btn view" title="Preview Live">
                                                    <Eye size={16} />
                                                </Link>
                                                <button className="action-btn edit" onClick={() => handleEdit(post)} title="Edit Article">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="action-btn delete" onClick={() => deletePost(post.id)} title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <div className="pagination-wrapper">
                                <div className="pagination-info">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} articles
                                </div>
                                <div className="pagination-controls">
                                    <div className="items-per-page">
                                        <span>Show:</span>
                                        {[10, 20, 50, 'all'].map(size => (
                                            <button
                                                key={size}
                                                className={`size-btn ${itemsPerPage === size ? 'active' : ''}`}
                                                onClick={() => setItemsPerPage(size as any)}
                                            >
                                                {size === 'all' ? 'All' : size}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="page-btns">
                                        <button
                                            className="nav-btn"
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        <span className="page-num">Page {currentPage} of {totalPages}</span>
                                        <button
                                            className="nav-btn"
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                    : (
                        <div className="post-editor-container">
                            <div className="editor-main-panel">
                                <section className="editor-section">
                                    <h2 className="section-title">
                                        <Sparkles size={22} color="#004D2C" />
                                        AI Power Tools
                                    </h2>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button
                                            id="admin-ai-generate-btn"
                                            className="ai-generate-btn"
                                            style={{ flex: 1 }}
                                            onClick={() => setShowAIModal(true)}
                                            disabled={isGenerating}
                                        >
                                            <Sparkles size={18} />
                                            <span>Auto-Generate Full Article with AI</span>
                                        </button>
                                        <button
                                            className="ai-generate-btn secondary"
                                            onClick={handleSuggestImage}
                                            disabled={isGenerating}
                                            title="Suggest image from Unsplash"
                                        >
                                            <Sparkles size={18} />
                                            <span>Suggest Cover Image</span>
                                        </button>
                                    </div>
                                </section>

                                <section className="editor-section">
                                    <h2 className="section-title">
                                        <FileText size={22} color="#004D2C" />
                                        Blog Content Editor
                                    </h2>
                                    {editingPost && (
                                        <BlogContentEditor
                                            introduction={editingPost.customContent?.introduction || ''}
                                            keyPoints={editingPost.customContent?.keyPoints || []}
                                            sections={editingPost.customContent?.sections || []}
                                            conclusion={editingPost.customContent?.conclusion || ''}
                                            onIntroductionChange={(value) =>
                                                setEditingPost(p => p ? {
                                                    ...p,
                                                    customContent: {
                                                        ...p.customContent,
                                                        introduction: value,
                                                        keyPoints: p.customContent?.keyPoints || [],
                                                        sections: p.customContent?.sections || [],
                                                        conclusion: p.customContent?.conclusion || ''
                                                    }
                                                } : null)
                                            }
                                            onKeyPointsChange={(points) =>
                                                setEditingPost(p => p ? {
                                                    ...p,
                                                    customContent: {
                                                        ...p.customContent,
                                                        keyPoints: points,
                                                        introduction: p.customContent?.introduction || '',
                                                        sections: p.customContent?.sections || [],
                                                        conclusion: p.customContent?.conclusion || ''
                                                    }
                                                } : null)
                                            }
                                            onSectionsChange={(sections) =>
                                                setEditingPost(p => p ? {
                                                    ...p,
                                                    customContent: {
                                                        ...p.customContent,
                                                        sections: sections,
                                                        introduction: p.customContent?.introduction || '',
                                                        conclusion: p.customContent?.conclusion || ''
                                                    }
                                                } : null)
                                            }
                                            onConclusionChange={(value) =>
                                                setEditingPost(p => p ? {
                                                    ...p,
                                                    customContent: {
                                                        ...p.customContent,
                                                        conclusion: value,
                                                        introduction: p.customContent?.introduction || '',
                                                        sections: p.customContent?.sections || []
                                                    }
                                                } : null)
                                            }
                                            onSuggestSectionImage={handleSuggestSectionImage}
                                            isGenerating={isGenerating}
                                        />
                                    )}
                                </section>
                            </div>

                            <div className="editor-sidebar-panel">
                                <div className="editor-sidebar-card">
                                    <h3><Settings size={18} /> General Metadata</h3>
                                    <div className="input-group-compact">
                                        <label>Article Title</label>
                                        <textarea
                                            rows={2}
                                            style={{ width: '100%', resize: 'vertical' }}
                                            value={editingPost?.title || ''}
                                            onChange={e => setEditingPost(p => p ? { ...p, title: e.target.value } : null)}
                                            placeholder="Headline of the article"
                                        />
                                    </div>
                                    <div className="input-group-compact" style={{ marginTop: '15px' }}>
                                        <label>URL Slug</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%' }}
                                            value={editingPost?.slug || ''}
                                            onChange={e => setEditingPost(p => p ? { ...p, slug: e.target.value } : null)}
                                            placeholder="e.g. tips-memilih-furniture"
                                        />
                                    </div>
                                </div>

                                <div className="editor-sidebar-card">
                                    <h3><Globe size={18} /> Categorization</h3>
                                    <div className="input-group-compact">
                                        <label>Category</label>
                                        <select
                                            style={{ width: '100%' }}
                                            value={editingPost?.category || 'Tips and Trick'}
                                            onChange={e => setEditingPost(p => p ? { ...p, category: e.target.value } : null)}
                                        >
                                            <option>Tips and Trick</option>
                                            <option>Workshop & Production</option>
                                            <option>Commercial Furniture</option>
                                            <option>About Furniture</option>
                                            <option>Furniture Information</option>
                                            <option>Furniture Guide</option>
                                            <option>Design Inspiration</option>
                                        </select>
                                    </div>
                                    <div className="input-group-compact" style={{ marginTop: '15px' }}>
                                        <label>Language</label>
                                        <select
                                            style={{ width: '100%' }}
                                            value={editingPost?.customContent?.language || 'id'}
                                            onChange={e => setEditingPost(p => p ? {
                                                ...p,
                                                customContent: {
                                                    ...p.customContent,
                                                    language: e.target.value as LanguageCode,
                                                    introduction: p.customContent?.introduction || '',
                                                    sections: p.customContent?.sections || [],
                                                    conclusion: p.customContent?.conclusion || ''
                                                }
                                            } : null)}
                                        >
                                            <option value="id">Indonesian</option>
                                            <option value="en">English</option>
                                            <option value="ar">Arabic</option>
                                            <option value="zh">Chinese</option>
                                            <option value="ja">Japanese</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="ko">Korean</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="editor-sidebar-card">
                                    <h3><Image size={18} /> Media & SEO</h3>
                                    <div className="input-group-compact">
                                        <label>Featured Image URL</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%' }}
                                            value={editingPost?.image || ''}
                                            onChange={e => setEditingPost(p => p ? { ...p, image: e.target.value } : null)}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="input-group-compact" style={{ marginTop: '15px' }}>
                                        <label>SEO Excerpt</label>
                                        <textarea
                                            rows={3}
                                            style={{ width: '100%', resize: 'vertical' }}
                                            value={editingPost?.excerpt || ''}
                                            onChange={e => setEditingPost(p => p ? { ...p, excerpt: e.target.value } : null)}
                                            placeholder="Short description for search results"
                                        />
                                    </div>
                                    <div className="input-group-compact" style={{ marginTop: '15px' }}>
                                        <label>Author</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%' }}
                                            value={editingPost?.author || ''}
                                            onChange={e => setEditingPost(p => p ? { ...p, author: e.target.value } : null)}
                                        />
                                    </div>
                                    <div className="input-group-compact" style={{ marginTop: '15px' }}>
                                        <label>Publish Date</label>
                                        <input
                                            type="datetime-local"
                                            style={{ width: '100%' }}
                                            value={editingPost?.date?.includes(' ') ? editingPost.date.replace(' ', 'T') : editingPost?.date}
                                            onChange={e => setEditingPost(p => p ? { ...p, date: e.target.value.replace('T', ' ') } : null)}
                                        />
                                    </div>
                                </div>

                                <div className="editor-notice">
                                    <AlertCircle size={20} color="#004D2C" />
                                    <div>
                                        <strong>Auto-Generated Components</strong>
                                        <p>The following will be automatically added to your blog post:</p>
                                        <ul style={{ paddingLeft: '20px', fontSize: '0.8rem', marginTop: '5px' }}>
                                            <li>Product Showcase (after 2nd section)</li>
                                            <li>Author Bio & CTA (at the end)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </main>

            {/* AI Generator Modal */}
            {showAIModal && (
                <div className="ai-modal-overlay" onClick={() => setShowAIModal(false)}>
                    <div className="ai-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="ai-modal-header">
                            <h2>
                                <Sparkles size={24} />
                                Generate Article with AI
                            </h2>
                            <button className="ai-modal-close" onClick={() => setShowAIModal(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="ai-modal-body">
                            <div className="input-group">
                                <label>Target Language</label>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    disabled={isGenerating}
                                    className="ai-model-select"
                                    style={{ marginBottom: '15px' }}
                                >
                                    <option value="id">Indonesian (Bahasa Indonesia)</option>
                                    <option value="en">English (Global)</option>
                                    <option value="ar">Arabic (العربية)</option>
                                    <option value="zh">Chinese (中文)</option>
                                    <option value="ja">Japanese (日本語)</option>
                                    <option value="es">Spanish (Español)</option>
                                    <option value="fr">French (Français)</option>
                                    <option value="ko">Korean (한국어)</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Select AI Model</label>
                                <select
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    disabled={isGenerating}
                                    className="ai-model-select"
                                >
                                    <optgroup label="Groq (Fast)">
                                        <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Default - Fast & Balanced)</option>
                                        <option value="mixtral-8x7b-32768">Mixtral 8x7B (Creative)</option>
                                    </optgroup>
                                    <optgroup label="OpenRouter (Free Models)">
                                        <option value="tngtech/deepseek-r1t2-chimera:free">DeepSeek R1T2 Chimera (Reasoning)</option>
                                        <option value="arcee-ai/trinity-large-preview:free">Trinity Large (Creative Writing)</option>
                                        <option value="z-ai/glm-4.5-air:free">GLM 4.5 Air (Agent Tasks)</option>
                                        <option value="qwen/qwen3-coder:free">Qwen3 Coder 480B (Code Generation)</option>
                                        <option value="meta-llama/llama-3.3-70b-instruct:free">Llama 3.3 70B (Balanced)</option>
                                        <option value="google/gemma-3-27b:free">Gemma 3 27B (Multilingual)</option>
                                        <option value="upstage/solar-pro-3:free">Solar Pro 3 (Korean/English)</option>
                                    </optgroup>
                                </select>
                            </div>

                            <label>What would you like to write about?</label>
                            <textarea
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                placeholder="Example: Panduan memilih furniture cafe industrial yang tahan lama dan hemat budget untuk cafe kecil di Jakarta"
                                rows={5}
                                disabled={isGenerating}
                            />
                            <p className="ai-modal-hint">
                                💡 Tip: You can write the prompt in any language! The AI will automatically translate and generate the full article in the <strong>Target Language</strong> selected above.
                            </p>
                        </div>

                        <div className="ai-modal-footer">
                            <button
                                className="ai-modal-cancel"
                                onClick={() => setShowAIModal(false)}
                                disabled={isGenerating}
                            >
                                Cancel
                            </button>
                            <button
                                className="ai-modal-generate"
                                onClick={handleGenerateWithAI}
                                disabled={isGenerating || !aiPrompt.trim()}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={18} />
                                        Generate Article
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .admin-blog-list-view, .post-editor-container { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
                
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translateY(15px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }

                /* Layout Structure */
                .manager-toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    gap: 20px;
                }

                .create-post-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    background: linear-gradient(135deg, #004D2C 0%, #006b3e 100%);
                    color: #white;
                    border: none;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 0.95rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 25px rgba(0, 77, 44, 0.25);
                    color: #fff;
                }

                .create-post-btn:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 77, 44, 0.35);
                    filter: brightness(1.1);
                }

                .create-post-btn:active {
                    transform: translateY(0) scale(0.98);
                }

                .post-editor-container {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: 30px;
                    align-items: start;
                }

                @media (max-width: 1100px) {
                    .post-editor-container { grid-template-columns: 1fr; }
                    .editor-sidebar-panel { position: static; }
                }

                /* Panels */
                .editor-main-panel { display: flex; flex-direction: column; gap: 25px; }
                .editor-sidebar-panel { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 20px; }

                .editor-section {
                    background: #fff;
                    
                    padding: 25px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                    border: 1px solid #f0f0f0;
                }

                .editor-sidebar-card {
                    background: #fff;
                    
                    padding: 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                    border: 1px solid #f0f0f0;
                }

                .editor-sidebar-card h3 {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #004D2C;
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #f4f4f4;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .section-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #1a1a1a;
                    margin-bottom: 25px;
                }

                /* Form Elements */
                .input-group-compact label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #666;
                    margin-bottom: 6px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .input-group-compact input, 
                .input-group-compact select, 
                .input-group-compact textarea {
                    width: 100%;
                    padding: 10px 14px;
                    border: 1.5px solid #eee;
                    
                    font-size: 0.95rem;
                    color: #2c3e50;
                    transition: all 0.2s;
                    background: #fcfcfc;
                }

                .input-group-compact input:focus, 
                .input-group-compact select:focus, 
                .input-group-compact textarea:focus {
                    border-color: #004D2C;
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(0, 77, 44, 0.05);
                    outline: none;
                }

                /* AI Generate Button Redesign */
                .ai-generate-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 14px 24px;
                    background: linear-gradient(135deg, #004D2C 0%, #006b3e 100%);
                    color: #fff;
                    border: none;
                    
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(0, 77, 44, 0.2);
                }

                .ai-generate-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 77, 44, 0.3);
                    filter: brightness(1.1);
                }

                .ai-generate-btn.secondary {
                    background: #fff;
                    color: #004D2C;
                    border: 2px solid #004D2C;
                    box-shadow: none;
                }

                .ai-generate-btn.secondary:hover:not(:disabled) {
                    background: #f0faf5;
                    box-shadow: 0 4px 12px rgba(0, 77, 44, 0.1);
                }

                /* Article List Redesign */
                .posts-table-card {
                    overflow: hidden;
                    border: none;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.05);
                    background: #fff;
                }

                .posts-table th {
                    background: #fafaf9;
                    color: #555;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    padding: 20px;
                }

                .posts-table tr { transition: background 0.2s; }
                .posts-table tr:hover { background: #fdfdfd; }
                .posts-table td { padding: 15px 20px; border-bottom: 1px solid #f4f4f4; }

                .post-title-text {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin-bottom: 2px;
                    display: block;
                }

                .post-slug-text {
                    font-size: 0.75rem;
                    color: #888;
                    font-family: 'JetBrains Mono', monospace;
                }

                .post-date-text {
                    font-size: 0.75rem;
                    color: #aaa;
                    margin-top: 4px;
                    display: block;
                }

                .post-thumb {
                    width: 50px;
                    height: 50px;
                    
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .cat-badge {
                    background: #e8f5e9;
                    color: #004D2C;
                    padding: 6px 12px;
                    
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                }

                .status-badge {
                    padding: 6px 12px;
                    
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #fff;
                }
                .status-badge.live { background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); }
                .status-badge.draft { background: linear-gradient(135deg, #e67e22 0%, #f39c12 100%); }

                .action-btn {
                    width: 36px;
                    height: 36px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    
                    border: 1.5px solid #eee;
                    background: #fff;
                    color: #555;
                    transition: all 0.2s;
                    margin-right: 8px;
                }

                .action-btn:hover {
                    transform: scale(1.1);
                    border-color: #000;
                    color: #000;
                }

                .action-btn.delete:hover { border-color: #e74c3c; color: #e74c3c; }
                .action-btn.edit:hover { border-color: #3498db; color: #3498db; }
                .action-btn.view:hover { border-color: #004D2C; color: #004D2C; }

                /* Notices */
                .editor-notice {
                    background: #fdfaf7;
                    border-left: 4px solid #004D2C;
                    padding: 15px;
                    display: flex;
                    gap: 12px;
                    color: #5d4d3a;
                    font-size: 0.9rem;
                }

                .editor-notice ul li { margin-bottom: 4px; }

                /* Pagination */
                .pagination-wrapper {
                    padding: 25px;
                    background: #fff;
                    border-top: 1px solid #f0f0f0;
                }

                .nav-btn {
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-weight: 700;
                    color: #444;
                    background: #f8f9fa;
                    border: 1.5px solid #eee;
                    transition: all 0.2s;
                }

                .nav-btn:hover:not(:disabled) {
                    background: #fff;
                    border-color: #004D2C;
                    color: #004D2C;
                }
            `}</style>
        </div>
    )
}

export default AdminBlogManager

