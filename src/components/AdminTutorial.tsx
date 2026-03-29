import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { ArrowRight, Sparkles, BookOpen, Layout, FileText, Info } from 'lucide-react'
import { useTutorial } from '../context/TutorialContext'

const AdminTutorial: React.FC = () => {
    const { currentStep, nextStep, getStepData, isActive } = useTutorial();
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const stepData = getStepData();

    const updateRect = useCallback(() => {
        if (!stepData?.targetId) return;
        const el = document.getElementById(stepData.targetId);
        if (el) {
            const rect = el.getBoundingClientRect();
            setTargetRect(prev => {
                if (!prev) return rect;
                if (Math.abs(prev.top - rect.top) < 1 && Math.abs(prev.left - rect.left) < 1 && Math.abs(prev.width - rect.width) < 1) return prev;
                return rect;
            });
        } else {
            setTargetRect(null);
        }
    }, [stepData?.targetId]);

    useEffect(() => {
        if (!isActive || !stepData?.targetId) {
            setTargetRect(null);
            return;
        }

        updateRect();
        window.addEventListener('scroll', updateRect, true);
        window.addEventListener('resize', updateRect);

        const interval = setInterval(updateRect, 800);

        return () => {
            window.removeEventListener('scroll', updateRect, true);
            window.removeEventListener('resize', updateRect);
            clearInterval(interval);
        };
    }, [isActive, stepData?.targetId, updateRect, currentStep]);

    const spotlightStyle = useMemo(() => {
        if (!targetRect) return {};

        const L = Math.round(targetRect.left || 0);
        const T = Math.round(targetRect.top || 0);
        const R = Math.round(targetRect.right || 0);
        const B = Math.round(targetRect.bottom || 0);

        return {
            clipPath: `polygon(0% 0%, 0% 100%, ${L}px 100%, ${L}px ${T}px, ${R}px ${T}px, ${R}px ${B}px, ${L}px ${B}px, ${L}px 100%, 100% 100%, 100% 0%)`
        };
    }, [targetRect]);

    const cardPosition = useMemo(() => {
        if (!targetRect || !stepData) {
            // Safe fallback: Bottom docked banner
            return { bottom: '40px', left: '50%', transform: 'translateX(-50%)' };
        }

        const padding = 20;
        const cardWidth = 560;
        const cardHeight = 84;

        const rect = {
            top: targetRect.top || 0,
            left: targetRect.left || 0,
            right: targetRect.right || 0,
            bottom: targetRect.bottom || 0,
            width: targetRect.width || 0,
            height: targetRect.height || 0
        };

        // Determine best side to place the horizontal bar
        // Default to 'bottom' if it fits, else 'top'
        let top = rect.bottom + padding;
        let left = rect.left + rect.width / 2 - cardWidth / 2;

        if (stepData.position === 'top' || (top + cardHeight > window.innerHeight - 20)) {
            top = rect.top - cardHeight - padding;
        }

        // Horizontal clamping
        if (left < 20) left = 20;
        if (left + cardWidth > window.innerWidth - 20) left = window.innerWidth - cardWidth - 20;

        return {
            top: `${top}px`,
            left: `${left}px`,
            transform: 'none'
        };
    }, [targetRect, stepData]);

    const getIcon = (title: string) => {
        const t = title || '';
        if (t.includes('Welcome')) return <Layout className="text-blue-500" size={24} />;
        if (t.includes('Blog')) return <BookOpen className="text-green-500" size={24} />;
        if (t.includes('Article')) return <FileText className="text-purple-500" size={24} />;
        if (t.includes('AI')) return <Sparkles className="text-amber-500" size={24} />;
        return <Info className="text-indigo-500" size={24} />;
    };

    if (!isActive || !stepData) return null;

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

            <div className="tutorial-bar-container" style={cardPosition}>
                <div className={`tutorial-bar step-${currentStep}`}>
                    <div className="bar-badge">
                        <span>{currentStep}/8</span>
                    </div>

                    <div className="bar-main">
                        <div className="bar-icon">{getIcon(stepData.title || '')}</div>
                        <div className="bar-content">
                            <h4 className="bar-title">{stepData.title}</h4>
                            <p className="bar-text">{stepData.text}</p>
                        </div>
                    </div>

                    <div className="bar-footer">
                        <button className="bar-next-btn" onClick={nextStep}>
                            <span>{stepData.btnText || 'Next'}</span>
                            {currentStep === 8 ? <Sparkles size={16} /> : <ArrowRight size={16} />}
                        </button>
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
          background: rgba(0, 0, 0, 0.7);
          pointer-events: auto;
        }

        .tutorial-highlight-box {
          position: absolute;
          border: 3px solid #004D2C;
          border-radius: 12px;
          box-shadow: 0 0 0 4px rgba(0, 77, 44, 0.2), 0 0 20px rgba(0, 77, 44, 0.4);
          z-index: 10001;
          pointer-events: none;
        }

        .tutorial-bar-container {
          position: absolute;
          z-index: 10002;
          pointer-events: auto;
          width: fit-content;
        }

        .tutorial-bar {
          background: #fff;
          width: 580px;
          height: 84px;
          border-radius: 100px;
          padding: 8px 12px 8px 8px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          gap: 16px;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(0, 77, 44, 0.1);
        }

        .bar-badge {
          width: 48px;
          height: 48px;
          background: #004D2C;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0, 77, 44, 0.3);
        }

        .bar-main {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .bar-icon {
          width: 40px;
          height: 40px;
          background: #f8fafc;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bar-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .bar-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .bar-text {
          font-size: 0.8rem;
          color: #64748b;
          margin: 2px 0 0 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bar-footer {
          flex-shrink: 0;
        }

        .bar-next-btn {
          background: #004D2C;
          color: #fff;
          border: none;
          padding: 10px 18px;
          border-radius: 100px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.85rem;
        }

        .bar-next-btn:hover {
          background: #003d23;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 77, 44, 0.2);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .tutorial-bar {
            width: 94vw;
            border-radius: 20px;
            height: auto;
            padding: 16px;
            flex-direction: column;
            gap: 12px;
          }
          .bar-badge { display: none; }
          .bar-main { width: 100%; }
          .bar-next-btn { width: 100%; justify-content: center; }
        }
      `}</style>
        </div>
    )
}

export default AdminTutorial
