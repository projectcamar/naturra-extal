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
            setShowOnboarding(username.toLowerCase() === 'brifki');
        }
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
                <div className="welcome-banner">
                    <h2>Welcome to your Dashboard</h2>
                    <p>This is the beginning of the Naturra Extal administration portal. From here, you will soon be able to manage products, content, and track site activity.</p>
                </div>

                <div className="dashboard-stats">
                    <div className="stat-card clickable" onClick={() => navigate('/admin/blog')}>
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
