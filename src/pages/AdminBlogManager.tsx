import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from 'react-router-dom'
import {
    Plus, Edit, Trash2, Search, ArrowLeft, Save,
    FileText, AlertCircle, Loader2, Check, X,
    Sparkles, Eye, Settings, Globe, Image,
    Terminal, ExternalLink, RefreshCw,
    ChevronLeft, ChevronRight
} from 'lucide-react'
import { BLOG_POSTS, type BlogPost } from '../data/blog'
import type { LanguageCode } from '../utils/languageManager'
import { BlogContentEditor } from '../components/BlogContentEditor'
import './Admin.css'
import { useTutorial } from '../context/TutorialContext'
import { getAdminUser } from '../utils/adminAuth'


const AdminBlogManager: React.FC = () => {
    const [view, setView] = useState<'list' | 'editor'>('list')
    const { currentStep, nextStep } = useTutorial()

    const [posts, setPosts] = useState<BlogPost[]>([])

    // Auto-sync view with tutorial steps
    useEffect(() => {
        // Only force editor view for the initial AI generation tutorial steps
        if (currentStep >= 5 && currentStep <= 8 && view === 'list') {
            handleNew();
        }
    }, [currentStep, view]);

    const [searchTerm, setSearchTerm] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string, imageUrl?: string } | null>(null)

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
    const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'queued' | 'building' | 'verifying' | 'ready' | 'failed'>('idle')
    const [deploymentLogs, setDeploymentLogs] = useState<{ msg: string, time: string, type: 'info' | 'success' | 'error' | 'warning' }[]>([])
    const [iframeKey, setIframeKey] = useState(0)
    const [showLogs, setShowLogs] = useState(false)
    const [deploymentTargetSlug, setDeploymentTargetSlug] = useState<string | null>(null)
    const [deploymentSlugs, setDeploymentSlugs] = useState<string[]>([])
    const [verifyAttempts, setVerifyAttempts] = useState(0)
    const [verifiedSlugs, setVerifiedSlugs] = useState<string[]>([])
    const [previewIndex, setPreviewIndex] = useState(0)

    // Refs for interval closures to prevent stale state bugs
    const verifyAttemptsRef = useRef(0)
    const deploymentTargetSlugRef = useRef<string | null>(null)
    const deploymentSlugsRef = useRef<string[]>([])
    const verifiedSlugsRef = useRef<string[]>([])

    const addLog = React.useCallback((msg: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setDeploymentLogs(prev => {
            return [...prev, { msg, time, type }];
        });
    }, []);

    useEffect(() => {
        deploymentTargetSlugRef.current = deploymentTargetSlug
    }, [deploymentTargetSlug])

    useEffect(() => {
        deploymentSlugsRef.current = deploymentSlugs
    }, [deploymentSlugs])

    useEffect(() => {
        verifyAttemptsRef.current = verifyAttempts
    }, [verifyAttempts])

    useEffect(() => {
        verifiedSlugsRef.current = verifiedSlugs
    }, [verifiedSlugs])

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

    // Poll for deployment status and Live Health simultaneously
    useEffect(() => {


        let liveIntervalId: any;
        let iframeIntervalId: any;

        if (activeDeploymentSha && deploymentStatus !== 'ready' && deploymentStatus !== 'failed') {
            const verifyLive = async () => {
                try {
                    const allSlugs = deploymentSlugsRef.current;
                    const alreadyVerified = verifiedSlugsRef.current;
                    const pendingSlugs = allSlugs.filter(s => !alreadyVerified.includes(s));

                    if (pendingSlugs.length === 0 && allSlugs.length > 0) {
                        setDeploymentStatus('ready');
                        addLog(`✅ All ${allSlugs.length} pages are now verified live!`, 'success');
                        if (liveIntervalId) clearInterval(liveIntervalId);
                        if (iframeIntervalId) clearInterval(iframeIntervalId);
                        return;
                    }

                    const nextAttempt = verifyAttemptsRef.current + 1;
                    setVerifyAttempts(nextAttempt);

                    const newlyVerified: string[] = [];

                    // Check each pending slug individually
                    for (const slug of pendingSlugs) {
                        try {
                            const post = posts.find(p => p.slug === slug);
                            const targetUrl = `/blog/${slug}`;
                            const response = await fetch(targetUrl, { method: 'GET', cache: 'no-store' });

                            if (response.status === 200) {
                                const html = await response.text();

                                // Markers for a REAL live blog post (not the SPA 404 shell)
                                // We check if the title exists in the body OR if the blog content ID exists
                                const hasTitle = post?.title && html.toLowerCase().includes(post.title.toLowerCase());
                                const hasBlogId = html.includes('id="blog-post-title"');
                                const isNotFound = html.includes('Page Not Found') || html.includes('Halaman Tidak Ditemukan');

                                if ((hasTitle || hasBlogId) && !isNotFound) {
                                    newlyVerified.push(slug);
                                    addLog(`✨ CONTENT DETECTED: "${post?.title || slug}" is CONTENT-LIVE!`, 'success');
                                } else {
                                    // Log for debugging (admin console)
                                    console.log(`Live Check [${slug}]: Status 200 but content check failed. Title: ${hasTitle}, ID: ${hasBlogId}, NotFound: ${isNotFound}`);
                                }
                            }
                        } catch (e) {
                            console.warn(`Check for ${slug} failed:`, e);
                        }
                    }

                    if (newlyVerified.length > 0) {
                        setVerifiedSlugs(prev => [...prev, ...newlyVerified]);
                    }

                    // Log heartbeat showing progress
                    const remainingCount = pendingSlugs.length - newlyVerified.length;
                    if (remainingCount > 0) {
                        addLog(`[Attempt #${nextAttempt}] Scanning... ${remainingCount}/${allSlugs.length} pages still pending.`, 'warning');
                        setIframeKey(k => k + 1);
                    } else if (allSlugs.length > 0) {
                        // All done in this pass
                        setDeploymentStatus('ready');
                        addLog(`✅ SUCCESS: All pages are officially live!`, 'success');
                        if (liveIntervalId) clearInterval(liveIntervalId);
                        if (iframeIntervalId) clearInterval(iframeIntervalId);
                    }
                } catch (error) {
                    console.error('Live verification error:', error);
                }
            };

            verifyLive();
            liveIntervalId = setInterval(verifyLive, 3000);

            // Auto-refresh iframe every 10 seconds
            iframeIntervalId = setInterval(() => {
                setIframeKey(k => k + 1);
                addLog('Refreshing live preview iframe...', 'info');
            }, 10000);

            if (deploymentLogs.length === 0) {
                addLog('Deployment initiated. Scanning live site for changes...', 'info');
            }
        }

        return () => {
            if (liveIntervalId) clearInterval(liveIntervalId);
            if (iframeIntervalId) clearInterval(iframeIntervalId);
        };
    }, [activeDeploymentSha, deploymentStatus, posts, addLog])

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
        // Include full date and time in local timezone
        const now = new Date()
        const tzOffset = now.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0, 16).replace('T', ' ');

        const username = getAdminUser()
        const defaultAuthor = username === 'rio' || username === 'rioanggara' ? 'Angga' :
            (username === 'brifki' || username === 'rifki') ? 'Moh Rifki' :
                username || 'Angga'

        setEditingPost({
            id: newId,
            slug: '',
            title: '',
            category: 'Tips and Trick',
            excerpt: '',
            image: '',
            date: localISOTime,
            author: defaultAuthor,
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
        if (currentStep === 9) nextStep();
        setMessage({ type: 'success', text: 'Post saved locally as draft. Click "Deploy Changes" to make it live.' })
    }

    const handleSyncToFiles = async () => {
        if (currentStep === 10) nextStep();
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
                const draftPosts = posts.filter(p => p.status === 'draft');
                const draftSlugs = draftPosts.map(p => p.slug);

                // Mark all as synced and clear local drafts
                const syncedPosts = posts.map(p => ({ ...p, status: 'synced' as const }))
                setPosts(syncedPosts)
                localStorage.removeItem('NATURRA_blog_drafts')

                if (deployResult.commitSha) {
                    setActiveDeploymentSha(deployResult.commitSha)
                    setDeploymentStatus('idle')
                    setVerifiedSlugs([])
                    setPreviewIndex(0)
                    setVerifyAttempts(0)

                    const targetSlug = draftSlugs[0] || posts[posts.length - 1]?.slug;

                    setDeploymentSlugs(draftSlugs.length > 0 ? draftSlugs : [targetSlug].filter(Boolean) as string[]);
                    setDeploymentTargetSlug(targetSlug || null);

                    setDeploymentLogs([{
                        msg: `🚀 Changes pushed! Monitoring ${draftSlugs.length || 1} pages: ${draftSlugs.length > 0 ? draftSlugs.join(', ') : targetSlug}`,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        type: 'success'
                    }])
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
            if (!editingPost) return; // Should not happen but for TS

            // 1. Prepare updated post object
            const updatedPost: BlogPost = {
                ...editingPost,
                title: article.title || editingPost.title,
                slug: article.slug || editingPost.slug,
                excerpt: article.excerpt || editingPost.excerpt,
                category: article.category || editingPost.category,
                image: article.image || editingPost.image,
                customContent: {
                    introduction: article.introduction || '',
                    keyPoints: article.keyPoints || [],
                    language: (article.language as LanguageCode) || selectedLanguage || 'id',
                    sections: article.sections || [],
                    conclusion: article.conclusion || ''
                }
            };

            // 2. Set the post state
            setEditingPost(updatedPost);
            setShowAIModal(false);
            setAiPrompt('');
            setMessage({ type: 'success', text: '✨ Article generated! Now searching for a matching cover image...' });

            // 3. Automatically trigger Suggest Cover using the NEW article data
            try {
                const imgResponse = await fetch('/api/admin/suggest-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: updatedPost.title,
                        excerpt: updatedPost.excerpt,
                        model: selectedModel
                    })
                });

                const imgResult = await imgResponse.json();
                if (imgResponse.ok && imgResult.success && imgResult.image) {
                    setEditingPost(current => current ? { ...current, image: imgResult.image } : null);
                    setMessage({
                        type: 'success',
                        text: `✨ Article generated & Found a perfect cover: "${imgResult.searchQuery}"`,
                        imageUrl: imgResult.image
                    });
                } else {
                    setMessage({ type: 'success', text: '✨ Article generated successfully! (No matching cover found, you can add one manually)' });
                }
            } catch (err) {
                console.error('Auto-suggest image error:', err);
                // Don't fail the whole process if only the image fails
            }

        } catch (error) {
            console.error('AI generation error:', error)
            setMessage({ type: 'error', text: `AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}` })
        } finally {
            setIsGenerating(false)
            if (currentStep === 7) nextStep(); // Move to Review step after generation
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
                setMessage({
                    type: 'success',
                    text: `✨ Found a perfect image for: "${result.searchQuery}"`,
                    imageUrl: result.image
                })
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

                setMessage({
                    type: 'success',
                    text: `✨ Found section image for: "${result.searchQuery}"`,
                    imageUrl: result.url
                })
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
                        <button id="admin-deploy-btn" onClick={handleSyncToFiles} className="save-btn" disabled={isSaving}>
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
                    <div className={`admin-message ${message.type}`}>
                        <div className="message-content">
                            {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                            <span>{message.text}</span>
                        </div>
                        {message.imageUrl && (
                            <div className="message-image-preview">
                                <img src={message.imageUrl} alt="Preview" />
                            </div>
                        )}
                        <button onClick={() => setMessage(null)} className="message-close">
                            <X size={14} />
                        </button>
                    </div>
                )}

                {activeDeploymentSha && (
                    <div className={`deployment-status-card ${deploymentStatus}`}>
                        <div className="status-header">
                            <div className="status-indicator">
                                {deploymentStatus === 'ready' ? <Check size={20} /> :
                                    deploymentStatus === 'failed' ? <X size={20} /> :
                                        <Loader2 size={20} className="animate-spin" />}
                                <h3>NATURRA LIVE SYNC: {deploymentStatus === 'verifying' ? 'CHECKING WEBSITE' : deploymentStatus.toUpperCase()}</h3>
                            </div>
                            <div className="deployment-header-actions">
                                <button className="toggle-logs-btn" onClick={() => setShowLogs(!showLogs)} title="Toggle Activity Logs">
                                    <Terminal size={16} />
                                    <span>{showLogs ? 'Hide Logs' : 'Show Logs'}</span>
                                </button>
                                <button className="close-status" onClick={() => setActiveDeploymentSha(null)}>
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="status-body">
                            <div className="status-message-main">
                                <p>
                                    {deploymentStatus === 'ready' && '✨ EXCELLENT! Your changes are now LIVE.'}
                                    {deploymentStatus === 'failed' && '❌ Sync failed. Please contact support.'}
                                    {(deploymentStatus === 'queued' || deploymentStatus === 'building' || deploymentStatus === 'verifying') && (
                                        <>
                                            <span className="pulsing-text">The site is currently being updated. You can track progress below.</span>
                                            <div className="status-button-group">
                                                <button
                                                    className="inline-recheck-btn highlight"
                                                    onClick={() => {
                                                        addLog('Force Re-check triggered by user...', 'warning');
                                                        setIframeKey(k => k + 1);
                                                        fetch(`/api/admin/health?t=${Date.now()}`)
                                                            .then(r => r.json())
                                                            .then((data: any) => {
                                                                const latestLocalPost = posts[posts.length - 1];
                                                                const isLive = data.postCount === posts.length && (!latestLocalPost || data.latestPost?.id === latestLocalPost.id);
                                                                if (isLive) {
                                                                    setDeploymentStatus('ready');
                                                                    addLog('Force Check SUCCESS: Content is finally live!', 'success');
                                                                } else {
                                                                    // Use a type cast to bypass narrowing if we want to force reset from terminal states
                                                                    const currentStatus = deploymentStatus as string;
                                                                    if (currentStatus === 'ready' || currentStatus === 'failed') {
                                                                        setDeploymentStatus('verifying');
                                                                        setVerifyAttempts(0);
                                                                    }
                                                                    addLog(`Force Check: Content still pending on live site. Retrying...`, 'warning');
                                                                }
                                                            });
                                                    }}
                                                >
                                                    <RefreshCw size={14} className={deploymentStatus === 'verifying' ? 'animate-spin' : ''} />
                                                    Force Re-check Live Site
                                                </button>
                                                <button className="inline-recheck-btn" onClick={() => setIframeKey(k => k + 1)}>
                                                    <RefreshCw size={14} />
                                                    Refresh Preview
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </p>
                            </div>

                            <div className="deployment-visual-check">
                                <div className="iframe-wrapper">
                                    <div className="iframe-header">
                                        <div className="iframe-header-left">
                                            <Globe size={12} />
                                            <span className="iframe-url">PREVIEW: {deploymentTargetSlug ? `/blog/${deploymentTargetSlug}` : '/'}</span>
                                        </div>

                                        {deploymentSlugs.length > 1 && (
                                            <div className="iframe-nav-controls">
                                                <button
                                                    className="iframe-nav-btn"
                                                    onClick={() => {
                                                        const newIndex = (previewIndex - 1 + deploymentSlugs.length) % deploymentSlugs.length;
                                                        setPreviewIndex(newIndex);
                                                        setDeploymentTargetSlug(deploymentSlugs[newIndex]);
                                                    }}
                                                    title="Previous Post"
                                                >
                                                    <ChevronLeft size={14} />
                                                </button>
                                                <span className="iframe-nav-count">{previewIndex + 1} / {deploymentSlugs.length}</span>
                                                <button
                                                    className="iframe-nav-btn"
                                                    onClick={() => {
                                                        const newIndex = (previewIndex + 1) % deploymentSlugs.length;
                                                        setPreviewIndex(newIndex);
                                                        setDeploymentTargetSlug(deploymentSlugs[newIndex]);
                                                    }}
                                                    title="Next Post"
                                                >
                                                    <ChevronRight size={14} />
                                                </button>
                                            </div>
                                        )}

                                        <div className="iframe-dot green"></div>
                                    </div>
                                    <iframe
                                        key={iframeKey}
                                        src={`/${deploymentTargetSlug ? `blog/${deploymentTargetSlug}` : ''}?t=${iframeKey}`}
                                        className="deployment-preview-iframe"
                                        title="Live Preview"
                                    />
                                </div>

                                {showLogs && (
                                    <div id="admin-activity-log" className="deployment-logs-terminal">
                                        <div className="terminal-header">
                                            <Terminal size={12} />
                                            <span>ACTIVITY LOG</span>
                                        </div>
                                        <div className="logs-content">
                                            {deploymentLogs.length === 0 ? (
                                                <div className="log-entry info">Starting deployment tracker...</div>
                                            ) : (
                                                deploymentLogs.slice().reverse().map((log, i) => (
                                                    <div key={i} className={`log-entry ${log.type}`}>
                                                        <span className="log-time">[{log.time}]</span>
                                                        <span className="log-msg">{log.msg}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {deploymentStatus === 'ready' && (
                            <div className="status-footer">
                                <button className="refresh-btn" onClick={() => window.location.reload()}>
                                    Refresh Admin Page to Sync Everything
                                </button>
                                <div className="visit-links-grid">
                                    {deploymentSlugs.length > 0 ? (
                                        deploymentSlugs.map((slug, idx) => (
                                            <a
                                                id="admin-live-link"
                                                key={idx}
                                                href={`/blog/${slug}`}
                                                target="_blank"
                                                className="visit-site-btn"
                                                title={`Visit /blog/${slug}`}
                                            >
                                                <span>Visit: {slug.length > 15 ? slug.substring(0, 12) + '...' : slug}</span>
                                                <ExternalLink size={12} />
                                            </a>
                                        ))
                                    ) : (
                                        <a href="/" target="_blank" className="visit-site-btn">
                                            Visit Live Site <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}



                {view === 'list' ? (
                    <div className="admin-blog-list-view">
                        <div className="admin-stats-bar">
                            <div className="stat-item">
                                <span className="stat-label">Angga</span>
                                <span className="stat-count">{posts.filter(p => p.author === 'Angga').length}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-label">Moh Rifki</span>
                                <span className="stat-count">{posts.filter(p => p.author === 'Moh Rifki').length}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-label">Others</span>
                                <span className="stat-count">{posts.length - posts.filter(p => p.author === 'Angga' || p.author === 'Moh Rifki').length}</span>
                            </div>
                        </div>

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
                                                        <div className="post-meta-line">
                                                            <span className="post-author-tag">by {post.author || 'System'}</span>
                                                            <span className="meta-dot">•</span>
                                                            <span className="post-slug-text">{post.slug}</span>
                                                            <span className="meta-dot">•</span>
                                                            <span className="post-date-text">{post.date}</span>
                                                        </div>
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
                                                <Link to={`/blog/${post.slug}`} className="action-btn view" title="Preview Live" target="_blank" rel="noopener noreferrer">
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
                                    <div className="ai-buttons-container">
                                        <button
                                            id="admin-ai-generate-btn"
                                            className="ai-generate-btn"
                                            onClick={() => {
                                                setShowAIModal(true);
                                                if (currentStep === 5) nextStep();
                                            }}
                                            disabled={isGenerating}
                                        >
                                            <Sparkles size={18} />
                                            <span>Auto-Generate with AI</span>
                                        </button>
                                        <button
                                            className="ai-generate-btn secondary"
                                            onClick={handleSuggestImage}
                                            disabled={isGenerating}
                                            title="Suggest image from Unsplash"
                                        >
                                            <Sparkles size={18} />
                                            <span>Suggest Cover</span>
                                        </button>
                                    </div>
                                </section>

                                <section id="admin-content-editor" className="editor-section">
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
                                <div id="admin-metadata-editor" className="editor-sidebar-card">
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
                                            <option>Agricultural Commodity</option>
                                            <option>Cocoa & Spices</option>
                                            <option>Cocopeat Guide</option>
                                            <option>Export Standards</option>
                                            <option>Sustainable Farming</option>
                                            <option>Industry Insight</option>
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
                                        {editingPost?.image && (
                                            <div className="editor-image-preview-wrapper sidebar">
                                                <img src={editingPost.image} alt="Featured Preview" />
                                            </div>
                                        )}
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

                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#444', marginBottom: '8px', display: 'block' }}>What would you like to write about?</label>
                            <textarea
                                id="admin-ai-prompt-input"
                                value={aiPrompt}
                                onChange={(e) => {
                                    setAiPrompt(e.target.value);
                                    if (currentStep === 6 && e.target.value.length > 30) {
                                        nextStep();
                                    }
                                }}
                                placeholder="Example: Strategi ekspor biji kopi robusta ke pasar Eropa: Panduan kualitas dan logistik 2025"
                                rows={4}
                                disabled={isGenerating}
                                style={{ minHeight: '100px' }}
                            />
                            <p className="ai-modal-hint" style={{ marginTop: '10px', fontSize: '11px' }}>
                                💡 Tip: You can write the prompt in any language! The AI will automatically translate and generate the full article.
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
                                id="admin-ai-submit-btn"
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

                /* Editor Image Previews */
                .editor-image-preview-wrapper {
                    margin-top: 10px;
                    border: 1px dashed #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    background: #fdfdfd;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100px;
                    position: relative;
                }

                .editor-image-preview-wrapper img {
                    width: 100%;
                    height: auto;
                    max-height: 250px;
                    object-fit: contain;
                    display: block;
                }

                .editor-image-preview-wrapper.sidebar img {
                    max-height: 180px;
                }

                .image-preview-placeholder {
                    padding: 20px;
                    color: #aaa;
                    font-size: 0.8rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                
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

                /* Deployment Button & Status */
                .manager-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .deploy-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #004D2C 0%, #001e11 100%);
                    color: #fff;
                    border: none;
                    padding: 10px 18px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 15px rgba(0, 77, 44, 0.2);
                }

                .deploy-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 77, 44, 0.3);
                    filter: brightness(1.2);
                }

                .deploy-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                /* Compact Toolbar */
                .manager-toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    gap: 20px;
                }

                .search-box {
                    flex: 1;
                    max-width: 400px;
                    background: #fff;
                    border: 1px solid #eee;
                    border-radius: 50px;
                    padding: 4px 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: border-color 0.3s;
                }

                .iframe-header {
                    background: #f8f9fa;
                    padding: 8px 15px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                }

                .iframe-header-left {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                    min-width: 0;
                }

                .iframe-url {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .iframe-nav-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #fff;
                    padding: 2px 8px;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                }

                .iframe-nav-btn {
                    background: transparent;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2px;
                    border-radius: 50%;
                    transition: all 0.2s;
                }

                .iframe-nav-btn:hover {
                    background: #f1f5f9;
                    color: #004D2C;
                }

                .iframe-nav-count {
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: #1e293b;
                    min-width: 30px;
                    text-align: center;
                }
    transition: border-color 0.3s;
                }

                .search-box:focus-within {
                    border-color: #004D2C;
                    box-shadow: 0 0 0 4px rgba(0, 77, 44, 0.05);
                }

                .search-box input {
                    border: none;
                    outline: none;
                    padding: 8px 0;
                    width: 100%;
                    font-size: 0.9rem;
                    background: transparent;
                }

                .create-post-btn {
                    background: #004D2C;
                    color: #fff;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s;
                }

                .create-post-btn:hover {
                    box-shadow: 0 8px 25px rgba(0, 77, 44, 0.3);
                    transform: translateY(-2px);
                }

                .ai-buttons-container {
                    display: flex;
                    gap: 12px;
                }

                @media (max-width: 600px) {
                    .ai-buttons-container {
                        flex-direction: column;
                    }
                    .ai-generate-btn {
                        width: 100%;
                        justify-content: center;
                    }
                    .editor-section, .editor-sidebar-card {
                        padding: 15px;
                    }
                }

                /* Article List Redesign - Compact */
                .posts-table-card {
                    overflow-x: auto;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                    background: #fff;
                    border: 1px solid #f0f0f0;
                }

                .posts-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px;
                }

                .posts-table th {
                    background: #fcfcfb;
                    color: #666;
                    font-weight: 700;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    padding: 12px 15px;
                    text-align: left;
                    border-bottom: 2px solid #f0f0f0;
                }

                .posts-table td { 
                    padding: 10px 15px; 
                    border-bottom: 1px solid #f8f8f8;
                    vertical-align: middle;
                }

                .post-title-cell {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .post-title-text {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin-bottom: 1px;
                }

                .post-slug-text {
                    font-size: 0.7rem;
                    color: #888;
                    font-family: 'JetBrains Mono', monospace;
                }

                .post-date-text {
                    font-size: 0.65rem;
                    color: #bbb;
                }

                .post-thumb {
                    width: 40px;
                    height: 40px;
                    border-radius: 6px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    flex-shrink: 0;
                }

                .cat-badge {
                    background: #f0fdf4;
                    color: #166534;
                    padding: 4px 10px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                }

                .lang-badge {
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    background: #f1f5f9;
                    color: #475569;
                }

                .status-badge {
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #fff;
                }
                .status-badge.live { background: #10b981; }
                .status-badge.draft { background: #f59e0b; }

                .action-btn {
                    width: 32px;
                    height: 32px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    border: 1px solid #eee;
                    background: #fff;
                    color: #64748b;
                    transition: all 0.2s;
                    margin-right: 6px;
                }

                .action-btn:hover {
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                    transform: scale(1.05);
                }

                .action-btn.view:hover { border-color: #004D2C; color: #004D2C; }
                .action-btn.edit:hover { border-color: #3b82f6; color: #3b82f6; }
                .action-btn.delete:hover { border-color: #ef4444; color: #ef4444; }

                /* Mobile Optimization */
                @media (max-width: 768px) {
                    .manager-toolbar {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 12px;
                    }
                    .search-box { max-width: none; }
                    .create-post-btn { justify-content: center; width: 100%; }
                    
                    .admin-header { padding: 10px 20px; flex-direction: column; gap: 10px; }
                    .manager-header-actions { width: 100%; justify-content: center; }
                    .deploy-btn { width: 100%; justify-content: center; }
                }

                /* Pagination - Compact */
                .pagination-wrapper {
                    padding: 15px 20px;
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                /* Save/Back Buttons */
                .save-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: #fff;
                    border: none;
                    padding: 10px 18px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
                }

                .save-btn:hover {
                    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
                    transform: translateY(-2px);
                }

                .back-link {
                    color: #64748b;
                    transition: color 0.2s;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                }

                .back-link:hover {
                    background: #f1f5f9;
                    color: #004D2C;
                }

                /* Pagination - Fully Styled */
                .pagination-wrapper {
                    padding: 15px 25px;
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid #f0f0f0;
                }
                
                .pagination-info { 
                    font-size: 0.85rem; 
                    color: #64748b;
                    font-weight: 500;
                }

                .pagination-controls {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }

                .items-per-page {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                    color: #64748b;
                }

                .size-btn {
                    background: transparent;
                    border: 1px solid #e2e8f0;
                    color: #64748b;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .size-btn:hover { border-color: #004D2C; color: #004D2C; }
                .size-btn.active { background: #004D2C; color: #fff; border-color: #004D2C; }

                .page-btns {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .nav-btn {
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #1e293b;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    transition: all 0.2s;
                    cursor: pointer;
                }
                
                .nav-btn:hover:not(:disabled) {
                    border-color: #004D2C;
                    color: #004D2C;
                    background: #f0fdf4;
                }

                .nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    background: #f8fafc;
                }

                .page-num {
                    font-size: 0.85rem;
                    color: #1e293b;
                    font-weight: 600;
                    min-width: 100px;
                    text-align: center;
                }

                /* Stats Bar */
                .admin-stats-bar {
                    display: flex;
                    align-items: center;
                    background: #fff;
                    padding: 12px 25px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                    border: 1px solid #f0f0f0;
                }
                .stat-item {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .stat-label { font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
                .stat-count { font-size: 1.1rem; font-weight: 800; color: #1e293b; }
                .stat-divider { width: 1px; height: 30px; background: #f1f5f9; margin: 0 30px; }

                .post-title-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 0;
                }
                .post-meta-line {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .meta-dot { color: #e2e8f0; font-size: 10px; }
                .post-author-tag {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #004D2C;
                    background: #f0fdf4;
                    padding: 1px 6px;
                    border-radius: 4px;
                }

                .ai-modal-content {
                    background: #fff;
                    width: 95%;
                    max-width: 550px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 25px 70px rgba(0,0,0,0.15);
                    animation: modalSlideUp 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .ai-modal-body { padding: 20px 30px; }
                .ai-modal-header { padding: 20px 30px; border-bottom: 1px solid #f1f5f9; }
                .ai-modal-footer { padding: 15px 30px; background: #f8fafc; }

                /* Admin Message / Toast */
                .admin-message {
                    position: fixed;
                    bottom: 25px;
                    right: 25px;
                    z-index: 2500;
                    width: 300px;
                    background: #fff;
                    border-radius: 16px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
                    border: 1px solid #f1f5f9;
                    padding: 18px;
                    animation: toastSlideIn 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                }
                @keyframes toastSlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                
                .message-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 12px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #1e293b;
                    padding-right: 20px;
                }
                .admin-message.success .message-content { color: #059669; }
                .admin-message.error .message-content { color: #dc2626; }

                .message-image-preview {
                    width: 100%;
                    height: 140px;
                    border-radius: 10px;
                    overflow: hidden;
                    background: #f1f5f9;
                    margin-bottom: 5px;
                    border: 1px solid #f1f5f9;
                }
                .message-image-preview img { width: 100%; height: 100%; object-fit: cover; }
                
                .message-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                .message-close:hover { color: #1e293b; }

                .inline-recheck-btn {
                    margin-top: 10px;
                    padding: 8px 16px;
                    background: #004D2C;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: block;
                }
                .inline-recheck-btn:hover { background: #003d22; transform: translateY(-1px); }
            `}</style>
        </div>
    )
}

export default AdminBlogManager

