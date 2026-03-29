import React, { createContext, useContext, useState, useCallback } from 'react';
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
        title: "Magic in the Making",
        text: "Fill something here! Type a descriptive prompt (e.g., 'Strategi ekspor vanila premium'). The more detail you give, the better the article!",
        targetId: "admin-ai-prompt-input",
        targetPage: "/admin/blog",
        btnText: "Got it!",
        position: "bottom"
    },
    {
        id: 7,
        title: "Release the AI",
        text: "Ready? Click the 'Generate Article' button highlighted below! Our AI will now handle the writing and SEO.",
        targetId: "admin-ai-submit-btn",
        targetPage: "/admin/blog",
        btnText: "Generate Now",
        position: "top",
        hideNext: true
    },
    {
        id: 8,
        title: "Review Your Masterpiece",
        text: "Generate complete! Take a moment to review the generated content in the editor. You can refine any section manually.",
        targetId: "admin-content-editor",
        targetPage: "/admin/blog",
        btnText: "Perfect, what's next?",
        position: "top"
    },
    {
        id: 9,
        title: "Finalizing & Saving",
        text: "Once you are happy with the content, click 'Done Editing' to save your progress locally.",
        targetId: "admin-save-btn",
        targetPage: "/admin/blog",
        btnText: "Save Draft",
        position: "bottom",
        hideNext: true
    },
    {
        id: 10,
        title: "Deploying Changes",
        text: "Ready to go live? Click 'Deploy Changes' to push all your drafts to the live website.",
        targetId: "admin-deploy-btn",
        targetPage: "/admin/blog",
        btnText: "Push to Live",
        position: "bottom",
        hideNext: true
    },
    {
        id: 11,
        title: "Real-time Monitoring",
        text: "The Activity Log shows the step-by-step sync process. Our system will automatically verify when pages are live.",
        targetId: "admin-activity-log",
        targetPage: "/admin/blog",
        btnText: "Monitoring...",
        position: "top"
    },
    {
        id: 12,
        title: "You are Live!",
        text: "Success! Once verified, you'll see live links here. Click one to see your new article on the actual website!",
        targetId: "admin-live-link",
        targetPage: "/admin/blog",
        btnText: "Everything is Done! 🚀",
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

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const startTutorial = () => setCurrentStep(1);
    const closeTutorial = () => setCurrentStep(0);

    const nextStep = useCallback(() => {
        const nextIdx = currentStep; // index is currentStep because currentStep is 1-based
        if (nextIdx >= TUTORIAL_STEPS.length) {
            closeTutorial();
            return;
        }

        const nextStepData = TUTORIAL_STEPS[nextIdx];

        // Handle navigation if same page but view might change (handled by components)
        // or if different page
        if (nextStepData.targetPage !== location.pathname && !(nextStepData.targetPage === '/admin' && location.pathname === '/admin/dashboard')) {
            navigate(nextStepData.targetPage);
        }

        setCurrentStep(currentStep + 1);
    }, [currentStep, location.pathname, navigate]);

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
