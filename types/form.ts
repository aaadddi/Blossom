export type FormData = {
    basicInfo: {
      projectTitle: string;
      shortDescription: string;
      category: string;
    };
    fundingDetails: {
      fundingGoal: string;
      fundingDeadline: string;
      walletAddress: string;
    };
    projectInfo: {
      detailedDescription: string;
      problemStatement: string;
      fundUsage: string;
    };
    socialValidation: {
      githubLink: string;
      twitterProfile: string;
      portfolioWebsite: string;
      linkedIn: string;
      discordTelegram: string;
      otherLinks: string;
    };
    supportingDocs: {
      googleDriveLink: string;
      demoLink: string;
    };
    creatorInfo: {
      creatorName: string;
      briefBio: string;
      contactEmail: string;
    };
    agreements: {
      communityGuidelines: boolean;
      projectUpdates: boolean;
    };
  };
  
  export type FormErrors = {
    [K in keyof FormData]: {
      [Field in keyof FormData[K]]?: string;
    };
  };
  
  export type FormStep = {
    id: number;
    title: string;
    description: string;
  };
  
  export const INITIAL_FORM_DATA: FormData = {
    basicInfo: {
      projectTitle: '',
      shortDescription: '',
      category: '',
    },
    fundingDetails: {
      fundingGoal: '',
      fundingDeadline: '',
      walletAddress: '8xHy9tT3JAaFuaGDQXwFzxEjN4UArmwpB3iGqJXZnuZx', // Example wallet address
    },
    projectInfo: {
      detailedDescription: '',
      problemStatement: '',
      fundUsage: '',
    },
    socialValidation: {
      githubLink: '',
      twitterProfile: '',
      portfolioWebsite: '',
      linkedIn: '',
      discordTelegram: '',
      otherLinks: '',
    },
    supportingDocs: {
      googleDriveLink: '',
      demoLink: '',
    },
    creatorInfo: {
      creatorName: '',
      briefBio: '',
      contactEmail: '',
    },
    agreements: {
      communityGuidelines: false,
      projectUpdates: false,
    },
  };
  
  export const FORM_STEPS: FormStep[] = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Let\'s start with some basic details about your project',
    },
    {
      id: 2,
      title: 'Funding Details',
      description: 'Tell us about your funding needs and timeline',
    },
    {
      id: 3,
      title: 'Project Information',
      description: 'Describe your project in detail',
    },
    {
      id: 4,
      title: 'Social Validation',
      description: 'Share your online presence to build credibility',
    },
    {
      id: 5,
      title: 'Supporting Documentation',
      description: 'Add links to any supporting documents or demos',
    },
    {
      id: 6,
      title: 'Creator Information',
      description: 'Tell us about yourself',
    },
    {
      id: 7,
      title: 'Agreements',
      description: 'Review and agree to our terms',
    },
  ];