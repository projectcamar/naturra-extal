import React from 'react'
import { X, ArrowRight, Sparkles, BookOpen, Layout } from 'lucide-react'

interface AdminTutorialProps {
    step: number
    onNext: () => void
    onClose: () => void
}

const AdminTutorial: React.FC<AdminTutorialProps> = ({ step, onNext, onClose }) => {
    if (step === 0) return null

    const steps = [
        {
            title: "Welcome to your Hub",
            text: "This dashboard gives you a bird's eye view of Naturra Extal's activity. From here, you can track leads and manage content.",
            icon: <Layout className="text-blue-500" size={32} />,
            btnText: "Next: Content Power",
            position: "center"
        },
        {
            title: "Blog & AI Generation",
            text: "Our most powerful tool. Head over to the Blog Manager to generate high-quality, SEO-optimized articles using AI.",
            icon: <BookOpen className="text-green-500" size={32} />,
            btnText: "Go to Blog Manager",
            position: "center"
        }
    ]

    const currentStep = steps[step - 1]
    if (!currentStep) return null

    return (
        <div className="tutorial-overlay">
            <div className={`tutorial-card step-${step}`}>
                <button className="tutorial-close" onClick={onClose} aria-label="Close tutorial">
                    <X size={18} />
                </button>

                <div className="tutorial-header">
                    <div className="tutorial-icon">
                        {currentStep.icon}
                    </div>
                    <div className="tutorial-badge">TUTORIAL STEP {step}/2</div>
                </div>

                <h3 className="tutorial-title">{currentStep.title}</h3>
                <p className="tutorial-text">{currentStep.text}</p>

                <div className="tutorial-footer">
                    <button className="tutorial-btn" onClick={onNext}>
                        {currentStep.btnText}
                        {step === 2 ? <Sparkles size={16} /> : <ArrowRight size={16} />}
                    </button>
                </div>

                <div className="tutorial-progress">
                    <div className={`progress-dot ${step >= 1 ? 'active' : ''}`} />
                    <div className={`progress-dot ${step >= 2 ? 'active' : ''}`} />
                </div>
            </div>

            <style>{`
        .tutorial-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .tutorial-card {
          background: #fff;
          width: 100%;
          max-width: 400px;
          border-radius: 24px;
          padding: 32px;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          transform: translateY(0);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tutorial-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #ccc;
          cursor: pointer;
          transition: color 0.3s;
        }

        .tutorial-close:hover {
          color: #666;
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
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .tutorial-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #475569;
          text-align: center;
          margin-bottom: 28px;
        }

        .tutorial-footer {
          display: flex;
          justify-content: center;
        }

        .tutorial-btn {
          background: #004D2C;
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          justify-content: center;
        }

        .tutorial-btn:hover {
          background: #003d23;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 77, 44, 0.2);
        }

        .tutorial-progress {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e2e8f0;
          transition: all 0.3s;
        }

        .progress-dot.active {
          background: #004D2C;
          width: 20px;
          border-radius: 4px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}

export default AdminTutorial
