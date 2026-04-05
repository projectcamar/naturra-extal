import React from 'react'
import { Helmet } from 'react-helmet-async'
import { LogOut, LayoutDashboard, Database, Settings, BarChart3, Users, FileText } from 'lucide-react'
import { logoutAdmin, getAdminUser } from '../utils/adminAuth'
import { useNavigate } from 'react-router-dom'
import { BLOG_POSTS } from '../data/blog'
import { AdminOnboardingCard } from '../components/AdminOnboardingCard'
import './Admin.css'

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate()
    const articleCount = BLOG_POSTS.length
    const username = getAdminUser()
    const [showOnboarding, setShowOnboarding] = React.useState(false)

    React.useEffect(() => {
        // Check if onboarding was already seen
        const seenKey = `naturra_onboarded_${username.toLowerCase()}`;
        const hasSeen = localStorage.getItem(seenKey);

        if (!hasSeen) {
            setShowOnboarding(username.toLowerCase() === 'brifki' || username.toLowerCase() === 'rifki');
        }

        // Add secret toggle for tutorial (Ctrl + G)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'g') {
                e.preventDefault();
                setShowOnboarding(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [username]);

    const closeOnboarding = () => {
        const seenKey = `naturra_onboarded_${username.toLowerCase()}`;
        localStorage.setItem(seenKey, 'true');
        setShowOnboarding(false);
    };

    return (
        <div className="admin-dashboard">
            {showOnboarding && (
                <AdminOnboardingCard
                    username={username}
                    onClose={closeOnboarding}
                />
            )}

            <Helmet>
                <title>Admin Dashboard | Naturra Extal</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <header className="admin-header">
                <div className="admin-header-title">
                    <h1>NATURRA <span style={{ color: '#004D2C' }}>EXTAL</span></h1>
                </div>

                <div className="admin-user-nav">
                    <div className="admin-user-info">
                        <Users size={18} />
                        <span style={{ textTransform: 'capitalize' }}>{username}</span>
                    </div>
                    <button onClick={logoutAdmin} className="logout-btn">
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <main className="admin-main">
                <div id="admin-welcome-banner" className="welcome-banner">
                    <div
                        className="admin-welcome-card"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200)' }}
                    >
                        <div className="admin-welcome-card-overlay"></div>
                        <div className="admin-welcome-card-content">
                            <div className="admin-welcome-card-header">
                                <div className="admin-welcome-icon">
                                    <Users size={28} />
                                </div>
                                <div className="admin-welcome-info">
                                    <span className="admin-welcome-by">Oleh:</span>
                                    <h2 className="admin-welcome-name">Moh Rifki</h2>
                                    <p className="admin-welcome-title">Export Associate di Asiatop / Unpad</p>
                                </div>
                            </div>

                            <div className="admin-welcome-experience">
                                <div className="admin-welcome-exp-item">
                                    <span className="admin-welcome-dot"></span>
                                    Pengembangan Bisnis Internasional
                                </div>
                                <div className="admin-welcome-exp-item">
                                    <span className="admin-welcome-dot"></span>
                                    Spesialis Operasi Ekspor
                                </div>
                                <div className="admin-welcome-exp-item">
                                    <span className="admin-welcome-dot"></span>
                                    Rantai Pasok Komoditas Pertanian
                                </div>
                                <div className="admin-welcome-exp-item">
                                    <span className="admin-welcome-dot"></span>
                                    Riset & Analisis Pasar
                                </div>
                            </div>

                            <div className="admin-welcome-footer">
                                <a
                                    href="https://www.linkedin.com/in/mohamad-bebi-rifki/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="admin-welcome-linkedin"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    Profil LinkedIn
                                </a>

                                <button
                                    className="recall-tutorial-btn on-welcome"
                                    onClick={() => setShowOnboarding(true)}
                                >
                                    <Settings size={16} />
                                    Tutorial
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-stats">
                    <div id="admin-blog-card" className="stat-card clickable" onClick={() => navigate('/admin/blog')}>
                        <div className="stat-icon">
                            <FileText size={28} />
                        </div>
                        <div className="stat-info">
                            <h3>Blog Manager</h3>
                            <div className="stat-value">{articleCount} Articles</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <LayoutDashboard size={28} />
                        </div>
                        <div className="stat-info">
                            <h3>System Status</h3>
                            <div className="stat-value">Active</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <Database size={28} />
                        </div>
                        <div className="stat-info">
                            <h3>Database</h3>
                            <div className="stat-value">Connected</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <BarChart3 size={28} />
                        </div>
                        <div className="stat-info">
                            <h3>Recent Leads</h3>
                            <div className="stat-value">Tracking...</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <Settings size={28} />
                        </div>
                        <div className="stat-info">
                            <h3>Settings</h3>
                            <div className="stat-value">v1.0.0</div>
                        </div>
                    </div>
                </div>
            </main>

            <footer style={{ padding: '40px', textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
                &copy; {new Date().getFullYear()} Naturra Extal Admin Portal • Powered by Vercel
            </footer>
        </div>
    )
}

export default AdminDashboard
