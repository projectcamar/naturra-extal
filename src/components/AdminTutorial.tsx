import React, { useState, useEffect, useMemo } from 'react'
import { ArrowRight, Sparkles, BookOpen, Layout, FileText, MousePointer2 } from 'lucide-react'
import { useTutorial } from '../context/TutorialContext'

const AdminTutorial: React.FC = () => {
    const { currentStep, nextStep, getStepData, isActive } = useTutorial();
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const stepData = getStepData();

    useEffect(() => {
        if (!isActive || !stepData?.targetId) {
            setTargetRect(null);
            return;
        }

        const updateRect = () => {
            const el = document.getElementById(stepData.targetId);
            if (el) {
                setTargetRect(el.getBoundingClientRect());
            } else {
                setTargetRect(null);
            }
        };

        // Initial update
        updateRect();

        // Update on scroll/resize or when page content might have changed
        window.addEventListener('scroll', updateRect, true);
        window.addEventListener('resize', updateRect);

        // Polling as a fallback for dynamic content loading
        const interval = setInterval(updateRect, 500);

        return () => {
            window.removeEventListener('scroll', updateRect, true);
            window.removeEventListener('resize', updateRect);
            clearInterval(interval);
        };
    }, [isActive, stepData?.targetId, currentStep]);

    if (!isActive || !stepData) return null;

    const spotlightStyle = useMemo(() => {
        if (!targetRect) return {};

        const L = targetRect.left || 0;
        const T = targetRect.top || 0;
        const R = targetRect.right || 0;
        const B = targetRect.bottom || 0;

        return {
            clipPath: `polygon(
                0% 0%, 
                0% 100%, 
                ${L}px 100%, 
                ${L}px ${T}px, 
                ${R}px ${T}px, 
                ${R}px ${B}px, 
                ${L}px ${B}px, 
                ${L}px 100%, 
                100% 100%, 
                100% 0%
            )`
        };
    }, [targetRect]);

    const cardPosition = useMemo(() => {
        if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

        const padding = 24;
        const cardWidth = 400;
        const cardHeight = 280;

        const rect = {
            top: targetRect.top || 0,
            left: targetRect.left || 0,
            right: targetRect.right || 0,
            bottom: targetRect.bottom || 0,
            width: targetRect.width || 0,
            height: targetRect.height || 0
        };

        switch (stepData.position) {
            case 'bottom':
                return {
                    top: `${rect.bottom + padding}px`,
                    left: `${rect.left + rect.width / 2 - cardWidth / 2}px`
                };
            case 'top':
                return {
                    top: `${rect.top - cardHeight - padding}px`,
                    left: `${rect.left + rect.width / 2 - cardWidth / 2}px`
                };
            case 'left':
                return {
                    top: `${rect.top + rect.height / 2 - cardHeight / 2}px`,
                    left: `${rect.left - cardWidth - padding}px`
                };
            case 'right':
                return {
                    top: `${rect.top + rect.height / 2 - cardHeight / 2}px`,
                    left: `${rect.right + padding}px`
                };
            default:
                return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        }
    }, [targetRect, stepData]);

    const getIcon = (title: string) => {
        const t = title || '';
        if (t.includes('Welcome')) return <Layout className="text-blue-500" size={32} />;
        if (t.includes('Blog')) return <BookOpen className="text-green-500" size={32} />;
        if (t.includes('Article')) return <FileText className="text-purple-500" size={32} />;
        if (t.includes('AI')) return <Sparkles className="text-amber-500" size={32} />;
        return <MousePointer2 className="text-indigo-500" size={32} />;
    };

    return (
        <div className="tutorial-root">
            <div className="tutorial-overlay" style={spotlightStyle} />

            {targetRect && (
                <div
                    className="tutorial-highlight-box"
                    style={{
                        top: (targetRect.top || 0) - 4,
                        left: (targetRect.left || 0) - 4,
                        width: (targetRect.width || 0) + 8,
                        height: (targetRect.height || 0) + 8
                    }}
                />
            )}

            <div className="tutorial-card-container" style={cardPosition}>
                <div className={`tutorial-card step-${currentStep}`}>
                    <div className="tutorial-header">
                        <div className="tutorial-icon">
                            {getIcon(stepData.title)}
                        </div>
                        <div className="tutorial-badge">TUTORIAL STEP {currentStep}/8</div>
                    </div>

                    <h3 className="tutorial-title">{stepData.title || ''}</h3>
                    <p className="tutorial-text">{stepData.text || ''}</p>

                    <div className="tutorial-footer">
                        <button className="tutorial-btn" onClick={nextStep}>
                            {stepData.btnText || 'Next'}
                            {currentStep === 8 ? <Sparkles size={16} /> : <ArrowRight size={16} />}
                        </button>
                    </div>

                    <div className="tutorial-progress">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`progress-dot ${currentStep > i ? 'active' : ''}`} />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .tutorial-root {
          position: fixed;
          inset: 0;
          z-index: 10000;
          pointer-events: none;
        }

        .tutorial-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          pointer-events: auto;
          transition: clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tutorial-highlight-box {
          position: absolute;
          border: 3px solid #004D2C;
          border-radius: 12px;
          box-shadow: 0 0 0 4px rgba(0, 77, 44, 0.2), 0 0 20px rgba(0, 77, 44, 0.4);
          z-index: 10001;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tutorial-card-container {
          position: absolute;
          z-index: 10002;
          pointer-events: auto;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tutorial-card {
          background: #fff;
          width: 400px;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tutorial-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .tutorial-icon {
          width: 64px;
          height: 64px;
          background: #f8fafc;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .tutorial-badge {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 100px;
        }

        .tutorial-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
          text-align: center;
          font-family: 'Inter', sans-serif;
        }

        .tutorial-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #475569;
          text-align: center;
          margin-bottom: 24px;
        }

        .tutorial-footer {
          display: flex;
          justify-content: center;
        }

        .tutorial-btn {
          background: #004D2C;
          color: #fff;
          border: none;
          padding: 14px 24px;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .tutorial-btn:hover {
          background: #003d23;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 77, 44, 0.2);
        }

        .tutorial-progress {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 24px;
        }

        .progress-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e2e8f0;
          transition: all 0.3s;
        }

        .progress-dot.active {
          background: #004D2C;
          width: 16px;
          border-radius: 3px;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .tutorial-card-container {
             top: 50% !important;
             left: 50% !important;
             transform: translate(-50%, -50%) !important;
          }
          .tutorial-card {
            width: 90vw;
            padding: 24px;
          }
        }
      `}</style>
        </div>
    )
}

export default AdminTutorial
