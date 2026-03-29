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
        <div className="admin-dashboard lobby-mode">
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

            <header className="admin-header lobby-header">
                <div className="admin-header-title">
                    <div className="system-status-indicator pulse"></div>
                    <h1>NATURRA <span className="brand-accent">EXTAL</span> <span className="admin-tag">COMMAND CENTER</span></h1>
                </div>

                <div className="admin-user-nav">
                    <div className="admin-user-info glass-profile">
                        <div className="user-avatar-hex">
                            <Users size={16} />
                        </div>
                        <div className="user-status-text">
                            <span className="user-name">{username}</span>
                            <span className="status-label">OPERATOR LEVEL 1</span>
                        </div>
                    </div>
                    <button onClick={logoutAdmin} className="logout-btn-lobby">
                        <LogOut size={16} />
                        <span>DISCONNECT</span>
                    </button>
                </div>
            </header>

            <main className="admin-main lobby-layout">
                <div id="admin-welcome-banner" className="welcome-banner-lobby glass-morphism">
                    <div className="banner-glitch-overlay"></div>
                    <div className="welcome-content">
                        <div className="banner-tag">SECURE CONNECTION ESTABLISHED</div>
                        <h2>System Initialization Complete</h2>
                        <p>Welcome to the core administration node. Neural link stabilized. You have full access to product management, content streams, and site telemetry.</p>
                        <div className="banner-actions">
                            <button
                                className="lobby-action-btn primary"
                                onClick={() => setShowOnboarding(true)}
                            >
                                <Settings size={16} />
                                RUN SYSTEM TUTORIAL
                            </button>
                            <div className="system-ping">
                                <BarChart3 size={14} />
                                <span>LATENCY: 24ms</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid-lobby">
                    <div id="admin-blog-card" className="lobby-card clickable" onClick={() => navigate('/admin/blog')}>
                        <div className="card-hex-bg"></div>
                        <div className="card-glow"></div>
                        <div className="stat-icon-lobby">
                            <FileText size={32} />
                        </div>
                        <div className="stat-info-lobby">
                            <span className="stat-label">MODULE</span>
                            <h3>BLOG MANAGER</h3>
                            <div className="stat-value-lobby">{articleCount} DATA CORES</div>
                        </div>
                        <div className="card-footer-lobby">
                            <span>ACCESS NODE</span>
                            <div className="arrow-right"></div>
                        </div>
                    </div>

                    <div className="lobby-card">
                        <div className="stat-icon-lobby active">
                            <LayoutDashboard size={32} />
                        </div>
                        <div className="stat-info-lobby">
                            <span className="stat-label">CORE STATUS</span>
                            <h3>SYSTEM ENGINE</h3>
                            <div className="stat-value-lobby status-online">OPTIMIZED</div>
                        </div>
                    </div>

                    <div className="lobby-card">
                        <div className="stat-icon-lobby">
                            <Database size={32} />
                        </div>
                        <div className="stat-info-lobby">
                            <span className="stat-label">STORAGE</span>
                            <h3>NEURAL DATABASE</h3>
                            <div className="stat-value-lobby">ENCRYPTED</div>
                        </div>
                    </div>

                    <div className="lobby-card warning">
                        <div className="stat-icon-lobby">
                            <BarChart3 size={32} />
                        </div>
                        <div className="stat-info-lobby">
                            <span className="stat-label">TELEMETRY</span>
                            <h3>ACTIVE LEADS</h3>
                            <div className="stat-value-lobby">ACQUIRING...</div>
                        </div>
                    </div>

                    <div className="lobby-card">
                        <div className="stat-icon-lobby">
                            <Settings size={32} />
                        </div>
                        <div className="stat-info-lobby">
                            <span className="stat-label">VERSION</span>
                            <h3>FIRMWARE</h3>
                            <div className="stat-value-lobby">OS v1.0.0</div>
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
