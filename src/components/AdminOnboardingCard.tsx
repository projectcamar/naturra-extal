import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Globe, ArrowRight, X } from 'lucide-react';

interface OnboardingCardProps {
    username: string;
    onClose: () => void;
}

export const AdminOnboardingCard: React.FC<OnboardingCardProps> = ({ username, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay for entrance animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const isRifki = username.toLowerCase() === 'brifki';

    return (
        <div className={`onboarding-overlay ${isVisible ? 'active' : ''}`}>
            <div className="onboarding-card">
                <button className="onboarding-close" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="onboarding-header">
                    <div className="onboarding-icon-wrap">
                        <Sparkles className="icon-sparkle" size={32} />
                    </div>
                    <div className="onboarding-badge">NEW ADMIN ACCESS</div>
                </div>

                <div className="onboarding-body">
                    <h2 className="onboarding-title">
                        Welcome, <span className="highlight">{username}</span>!
                    </h2>

                    {isRifki ? (
                        <div className="rifki-special-msg">
                            <div className="founder-badge">
                                <Trophy size={14} />
                                <span>Founder of Naturra Extal International</span>
                            </div>
                            <p className="onboarding-text">
                                Rifki, it's an honor to have you here. This dashboard is your command center for bridging Indonesia's finest harvests to the global market.
                                Wishing you immense success as we scale Naturra Extal together! 🚀
                            </p>
                        </div>
                    ) : (
                        <p className="onboarding-text">
                            Welcome to the Naturra Extal administration portal. You now have access to manage site content, track analytics, and optimize our global reach.
                        </p>
                    )}

                    <div className="onboarding-features">
                        <div className="feature-item">
                            <div className="feature-bullet"><Globe size={16} /></div>
                            <span>Global Reach Optimization</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-bullet"><Sparkles size={16} /></div>
                            <span>AI-Powered Content Generation</span>
                        </div>
                    </div>
                </div>

                <div className="onboarding-footer">
                    <button className="onboarding-btn" onClick={onClose}>
                        <span>Get Started</span>
                        <ArrowRight size={18} />
                    </button>
                </div>

                <style>{`
          .onboarding-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
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
            width: 90%;
            max-width: 500px;
            border-radius: 24px;
            padding: 40px;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            transform: translateY(20px);
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
          }
          .onboarding-overlay.active .onboarding-card {
            transform: translateY(0);
          }
          .onboarding-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #004D2C, #2E7D32);
          }
          .onboarding-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: #ccc;
            cursor: pointer;
            transition: color 0.3s;
          }
          .onboarding-close:hover {
            color: #666;
          }
          .onboarding-header {
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .onboarding-icon-wrap {
            width: 64px;
            height: 64px;
            background: #f0fdf4;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            color: #004D2C;
          }
          .icon-sparkle {
            animation: pulse 2s infinite;
          }
          .onboarding-badge {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #004D2C;
            background: #e6f4ea;
            padding: 4px 12px;
            border-radius: 100px;
          }
          .onboarding-title {
            font-size: 2rem;
            color: #1a1a1a;
            margin-bottom: 16px;
            text-align: center;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .onboarding-title .highlight {
            color: #004D2C;
            position: relative;
          }
          .onboarding-text {
            color: #666;
            line-height: 1.6;
            margin-bottom: 24px;
            text-align: center;
          }
          .founder-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #fff8e1;
            color: #b8860b;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            margin: 0 auto 16px auto;
            border: 1px solid #ffecb3;
          }
          .rifki-special-msg {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .onboarding-features {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 32px;
          }
          .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #444;
            font-size: 0.95rem;
            background: #f8f9fa;
            padding: 12px 16px;
            border-radius: 12px;
          }
          .feature-bullet {
            width: 28px;
            height: 28px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #004D2C;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .onboarding-footer {
            display: flex;
            justify-content: center;
          }
          .onboarding-btn {
            background: #004D2C;
            color: #fff;
            border: none;
            padding: 14px 32px;
            border-radius: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            transition: transform 0.3s, background 0.3s;
          }
          .onboarding-btn:hover {
            background: #003d23;
            transform: scale(1.02);
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
