import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface TutorialStep {
    id: number;
    title: string;
    text: string;
    targetId: string;
    targetPage: string;
    btnText: string;
    position: 'top' | 'bottom' | 'left' | 'right' | 'center';
    hideNext?: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
    {
        id: 1,
        title: "Welcome to your Hub",
        text: "This dashboard gives you a bird's eye view of Naturra Extal's activity. From here, you can track leads and manage content.",
        targetId: "admin-welcome-banner",
        targetPage: "/admin",
        btnText: "Next: Content Power",
        position: "bottom"
    },
    {
        id: 2,
        title: "Blog Manager",
        text: "This is your control center for all site content. Head over here to manage your articles.",
        targetId: "admin-blog-card",
        targetPage: "/admin",
        btnText: "Go to Blog Manager",
        position: "top"
    },
    {
        id: 3,
        title: "Article Archive",
        text: "All your SEO-optimized articles are listed here. You can edit, preview, or delete them in seconds.",
        targetId: "admin-blog-list-card",
        targetPage: "/admin/blog",
        btnText: "Next: SEO Power",
        position: "top"
    },
    {
        id: 4,
        title: "Ready to Expand?",
        text: "Click here to create a new article from scratch or use our powerful AI generator.",
        targetId: "admin-create-post-btn",
        targetPage: "/admin/blog",
        btnText: "Let's Create!",
        position: "left"
    },
    {
        id: 5,
        title: "AI Generation Core",
        text: "The most powerful tool in your arsenal. Click the button highlighted below to open our AI content assistant.",
        targetId: "admin-ai-generate-btn",
        targetPage: "/admin/blog",
        btnText: "Open AI Modal",
        position: "bottom",
        hideNext: true
    },
    {
        id: 6,
        title: "Choose Language",
        text: "Select your target language. Naturra supports Multi-language SEO natively, so you can write in any language and it will handle the rest.",
        targetId: "admin-ai-language-select",
        targetPage: "/admin/blog",
        btnText: "Next",
        position: "bottom"
    },
    {
        id: 7,
        title: "Magic in the Making",
        text: "Fill something here! Type a descriptive prompt (e.g., 'Strategi ekspor vanila premium'). The more detail you give, the better the article!",
        targetId: "admin-ai-prompt-input",
        targetPage: "/admin/blog",
        btnText: "Got it!",
        position: "bottom"
    },
    {
        id: 8,
        title: "Release the AI",
        text: "Ready? Click the 'Generate Article' button highlighted below! Our AI will now handle the writing and SEO.",
        targetId: "admin-ai-submit-btn",
        targetPage: "/admin/blog",
        btnText: "Generate Now",
        position: "top",
        hideNext: true
    },
    {
        id: 9,
        title: "Review Your Masterpiece",
        text: "Generate complete! Take a moment to review the generated content in the editor. You can refine any section manually.",
        targetId: "admin-content-editor",
        targetPage: "/admin/blog",
        btnText: "Perfect, what's next?",
        position: "top"
    },
    {
        id: 10,
        title: "Finalizing & Saving",
        text: "Once you are happy with the content, click 'Done Editing' to save your progress locally.",
        targetId: "admin-save-btn",
        targetPage: "/admin/blog",
        btnText: "Save Draft",
        position: "bottom",
        hideNext: true
    },
    {
        id: 11,
        title: "Deploying Changes",
        text: "Ready to go live? Click 'Deploy Changes' to push all your drafts to the live website.",
        targetId: "admin-deploy-btn",
        targetPage: "/admin/blog",
        btnText: "Push to Live",
        position: "bottom",
        hideNext: true
    },
    {
        id: 12,
        title: "Real-time Monitoring",
        text: "The Activity Log shows every step manually. Green means 'Detected Live', Yellow means 'Scanning'. Wait for the success message here!",
        targetId: "admin-deployment-status-card",
        targetPage: "/admin/blog",
        btnText: "Wait for Green...",
        position: "top",
        hideNext: true
    },
    {
        id: 13,
        title: "Sync Everything",
        text: "Once everything is Green, click here to refresh the Admin dashboard. This syncs your local state with the global cloud.",
        targetId: "admin-refresh-sync-btn",
        targetPage: "/admin/blog",
        btnText: "Sync Now",
        position: "top",
        hideNext: true
    },
    {
        id: 14,
        title: "You are Live!",
        text: "Finally, click any of these links to see your masterpiece live on the website. Congratulations, you've mastered Naturra Admin!",
        targetId: "admin-live-link",
        targetPage: "/admin/blog",
        btnText: "Finish Tutorial 🚀",
        position: "top"
    }
];

interface TutorialContextType {
    currentStep: number;
    isActive: boolean;
    startTutorial: () => void;
    nextStep: () => void;
    closeTutorial: () => void;
    getStepData: () => TutorialStep | undefined;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

const STORAGE_KEY = 'NATURRA_tutorial_step';

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? parseInt(saved, 10) : 0;
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, currentStep.toString());
    }, [currentStep]);

    const startTutorial = () => setCurrentStep(1);
    const closeTutorial = () => {
        setCurrentStep(0);
        localStorage.removeItem(STORAGE_KEY);
    };

    const nextStep = useCallback(() => {
        const next = currentStep + 1;
        if (next > TUTORIAL_STEPS.length) {
            closeTutorial();
            return;
        }

        const nextStepData = TUTORIAL_STEPS[next - 1];

        // Handle navigation if same page but view might change (handled by components)
        // or if different page
        if (nextStepData.targetPage !== location.pathname && !(nextStepData.targetPage === '/admin' && location.pathname === '/admin/dashboard')) {
            navigate(nextStepData.targetPage);
        }

        setCurrentStep(next);
        localStorage.setItem(STORAGE_KEY, next.toString());
    }, [currentStep, location.pathname, navigate, closeTutorial]);

    const getStepData = useCallback(() => {
        if (currentStep < 1 || currentStep > TUTORIAL_STEPS.length) return undefined;
        return TUTORIAL_STEPS[currentStep - 1];
    }, [currentStep]);

    const contextValue = React.useMemo(() => ({
        currentStep,
        isActive: currentStep > 0,
        startTutorial,
        nextStep,
        closeTutorial,
        getStepData
    }), [currentStep, nextStep, getStepData]);

    return (
        <TutorialContext.Provider value={contextValue}>
            {children}
        </TutorialContext.Provider>
    );
};

export const useTutorial = () => {
    const context = useContext(TutorialContext);
    if (!context) throw new Error('useTutorial must be used within a TutorialProvider');
    return context;
};
