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
        text: "The most powerful tool in your arsenal. Click here to open the AI assistant.",
        targetId: "admin-ai-generate-btn",
        targetPage: "/admin/blog",
        btnText: "Open AI Modal",
        position: "bottom"
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
        text: "Click here to generate! Our AI will write the full article, find a matching cover image, and set up SEO - all in one go!",
        targetId: "admin-ai-submit-btn",
        targetPage: "/admin/blog",
        btnText: "Generate Now",
        position: "top"
    },
    {
        id: 8,
        title: "Review Your Masterpiece",
        text: "Review here! Take a look at the generated content. You can always tweak the introduction or key takeaways if needed.",
        targetId: "admin-content-editor",
        targetPage: "/admin/blog",
        btnText: "Looks Good!",
        position: "top"
    },
    {
        id: 9,
        title: "Metadata & SEO",
        text: "Fine-tune your URL slugs, categories, and languages to rank higher on Google.",
        targetId: "admin-metadata-editor",
        targetPage: "/admin/blog",
        btnText: "Next: Details",
        position: "top"
    },
    {
        id: 10,
        title: "Interactive Editor",
        text: "The main content area is now filled. Feel free to add more sections or refine the existing ones.",
        targetId: "admin-content-editor",
        targetPage: "/admin/blog",
        btnText: "Almost Done",
        position: "top"
    },
    {
        id: 11,
        title: "Deploy with Confidence",
        text: "Once you're satisfied, click here to save your work. Then deploy it live to the global market!",
        targetId: "admin-save-btn",
        targetPage: "/admin/blog",
        btnText: "Finish Tutorial 🚀",
        position: "bottom"
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
