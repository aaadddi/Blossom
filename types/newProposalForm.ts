export type FormData = {
    basicInfo: {
      proposalTitle: string;
      shortDescription: string;
      category: string;
    };
    fundingDetails: {
      fundingGoal: string;
      fundingDeadline: string;
      walletAddress: string;
    };
    proposalInfo: {
      detailedDescription: string;
      problemStatement: string;
      fundUsage: string;
      tags: string[];
      coverImageUrl: string;
    };
    supportingDocs: {
      googleDriveLink: string;
      demoLink: string;
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
      proposalTitle: '',
      shortDescription: '',
      category: '',
    },
    fundingDetails: {
      fundingGoal: '',
      fundingDeadline: '',
      walletAddress: '', 
    },
    proposalInfo: {
      detailedDescription: '',
      problemStatement: '',
      fundUsage: '',
      coverImageUrl: '',
      tags: [],
    },
    supportingDocs: {
      googleDriveLink: '',
      demoLink: '',
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
      title: 'Supporting Documentation',
      description: 'Add links to any supporting documents or demos',
    },
    {
      id: 5,
      title: 'Agreements',
      description: 'Review and agree to our terms',
    },
  ];