import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
        text: "The most powerful tool in your arsenal. Enter a prompt and let AI generate a full article with images and SEO metadata.",
        targetId: "admin-ai-generate-btn",
        targetPage: "/admin/blog", // View will be 'editor'
        btnText: "Got it!",
        position: "bottom"
    },
    {
        id: 6,
        title: "Metadata & SEO",
        text: "Fine-tune your URL slugs, categories, and languages to rank higher on Google.",
        targetId: "admin-metadata-editor",
        targetPage: "/admin/blog",
        btnText: "Next: Content",
        position: "top"
    },
    {
        id: 7,
        title: "Interactive Editor",
        text: "Write your introduction, add key takeaways, and build dynamic content sections effortlessly.",
        targetId: "admin-content-editor",
        targetPage: "/admin/blog",
        btnText: "Almost Done",
        position: "top"
    },
    {
        id: 8,
        title: "Deploy with Confidence",
        text: "Once you're done, click here to save your work. Then deploy it live to the global market!",
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

    const getStepData = () => TUTORIAL_STEPS[currentStep - 1];

    // Auto-save progress or handle initial state if needed
    useEffect(() => {
        if (currentStep > 0) {
            // Ensure if we navigate away manually, we might want to kill or pause tutorial
            // For now, we keep it active.
        }
    }, [currentStep]);

    return (
        <TutorialContext.Provider value={{
            currentStep,
            isActive: currentStep > 0,
            startTutorial,
            nextStep,
            closeTutorial,
            getStepData
        }}>
            {children}
        </TutorialContext.Provider>
    );
};

export const useTutorial = () => {
    const context = useContext(TutorialContext);
    if (!context) throw new Error('useTutorial must be used within a TutorialProvider');
    return context;
};
