import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Globe, ArrowRight } from 'lucide-react';
import { useTutorial } from '../context/TutorialContext';

interface OnboardingCardProps {
    username: string;
    onClose: () => void;
}

export const AdminOnboardingCard: React.FC<OnboardingCardProps> = ({ username, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { startTutorial } = useTutorial();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const isRifki = username.toLowerCase() === 'brifki' || username.toLowerCase() === 'rifki';

    return (
        <div className={`onboarding-overlay ${isVisible ? 'active' : ''}`}>
            <div className="onboarding-card">
                <div className="onboarding-header">
                    <div className="onboarding-icon-wrap">
                        <Sparkles className="icon-sparkle" size={24} />
                    </div>
                    <div className="onboarding-badge">ADMIN ACCESS</div>
                </div>

                <div className="onboarding-body">
                    <h2 className="onboarding-title">
                        Welcome, <span className="highlight">{username}</span>!
                    </h2>

                    {isRifki && (
                        <div className="founder-badge">
                            <Trophy size={12} />
                            <span>Founder of Naturra Extal International</span>
                        </div>
                    )}

                    <p className="onboarding-text">
                        {isRifki
                            ? "This dashboard is your command center for bridging Indonesia's finest harvests to the global market. 🚀"
                            : "Manage site content, track analytics, and optimize our global reach from this portal."}
                    </p>

                    <div className="onboarding-features">
                        <div className="feature-item">
                            <Globe size={14} />
                            <span>Global Reach</span>
                        </div>
                        <div className="feature-item">
                            <Sparkles size={14} />
                            <span>AI Content</span>
                        </div>
                    </div>
                </div>

                <div className="onboarding-footer">
                    <button className="onboarding-btn" onClick={() => {
                        onClose();
                        setTimeout(() => {
                            startTutorial();
                        }, 100);
                    }}>
                        <span>Get Started</span>
                        <ArrowRight size={18} />
                    </button>
                </div>

                <style>{`
          .onboarding-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          .onboarding-overlay.active {
            opacity: 1;
          }
          .onboarding-card {
            background: #fff;
            width: 92%;
            max-width: 380px;
            border-radius: 20px;
            padding: 24px;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
            transform: scale(0.9) translateY(20px);
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .onboarding-overlay.active .onboarding-card {
            transform: scale(1) translateY(0);
          }
          .onboarding-header {
            margin-bottom: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .onboarding-icon-wrap {
            width: 48px;
            height: 48px;
            background: #f0fdf4;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            color: #004D2C;
          }
          .icon-sparkle {
            animation: pulse 2s infinite;
          }
          .onboarding-badge {
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: #004D2C;
            background: #e6f4ea;
            padding: 3px 10px;
            border-radius: 100px;
          }
          .onboarding-title {
            font-size: 1.4rem;
            color: #1a1a1a;
            margin-bottom: 8px;
            text-align: center;
            font-family: 'Inter', sans-serif;
            font-weight: 800;
          }
          .onboarding-title .highlight { color: #004D2C; }
          .onboarding-text {
            color: #4b5563;
            line-height: 1.5;
            margin-bottom: 16px;
            text-align: center;
            font-size: 0.9rem;
          }
          .founder-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #fffbeb;
            color: #92400e;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            margin: 0 auto 12px auto;
            border: 1px solid #fef3c7;
          }
          .onboarding-features {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
            width: 100%;
            justify-content: center;
          }
          .feature-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #374151;
            font-size: 0.8rem;
            background: #f3f4f6;
            padding: 8px 12px;
            border-radius: 10px;
            font-weight: 600;
          }
          .onboarding-footer { width: 100%; }
          .onboarding-btn {
            background: #004D2C;
            color: #fff;
            border: none;
            padding: 14px;
            border-radius: 12px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
            justify-content: center;
            font-size: 1rem;
            font-family: 'Inter', sans-serif;
          }
          .onboarding-btn:hover {
            background: #003d23;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 77, 44, 0.2);
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
            </div>
        </div>
    );
};
