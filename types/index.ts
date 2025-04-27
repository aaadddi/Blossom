import { FormData, FormErrors } from '@/types/newProposalForm';

export type ViewMode = 'card' | 'list';

export type SortOption = 'newest' | 'fundingGoal' | 'deadline';

export type CategoryFilter = 'All' | 'Development' | 'Art' | 'Content' | 'Research' | 'Community';

export interface ProfileHeaderProps {
  user: User;
  isOwner: boolean;
  onEditProfile: () => void;
}

export interface ProfilePageProps {
  user: User;
  proposals: Proposal[];
  isOwner?: boolean;
}

export type Step = 'welcome' | 'profile' | 'additional' | 'connect' | 'complete';

export interface OnboardingContextType {
  currentStep: Step;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: Step) => void;
  skipOnboarding: () => void;
  formData: User;
  updateFormData: (data: Partial<User>) => void;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
  isLoading: boolean;
}

export interface UserContextType {
  user: User | null;
  updateUser: (newUserInfo: User) => void;
  isLoading: boolean;
}

export interface OnboardingProviderProps {
  children: React.ReactNode;
  walletAddress: string;
  onComplete: (profile: User) => void;
  onSkip: () => void;
}

export interface StepProps {
  walletAddress: string;
}

export interface User {
  name: string;
  username: string;
  walletAddress: string;
  profileImage: string;
  bio: string;
  professionTitle: string;
  joinedDate: string;
  totalFundingReceived: number;
  proposalsCreated: number;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    website: string;
    discord: string;
  };
  location: string;
}
export interface ErrorNotification {
  id: number;
  message: string;
}

export interface ProposalPreviewProps {
  formData: FormData;
  onClose: () => void;
  onConfirmSubmit: () => void;
}
export interface Contributor {
  contributorWalletAddress: string;
  amount: number;
  timestamp: Date;
  metadata: JSON;
}
export interface FundingDetails {
  fundingGoal: number;
  fundingDeadline: Date;
  fullyFunded: boolean;
  fundingReceived: number;
  isExpired: boolean;
}
export interface ProposalDetails {
  shortDescription: string;
  detailedDescription: string;
  problemStatement: string;
  proposalTitle: string;
  coverImageUrl: string;
  category: string;
  createdAt: Date;
  tags: string[];
  demoLink: string;
  driveLink: string;
  fundUsage: string;
}
export interface Proposal {
  id: string;
  walletAddress: string;
  fundingDetails: FundingDetails;
  proposalDetails: ProposalDetails;
  contributors: Contributor[];
}

export interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AgreementsStepProps {
  formData: FormData;
  formErrors: FormErrors;
  updateFormData: (section: keyof FormData, field: string, value: any) => void;
  validateField: (section: keyof FormData, field: string) => void;
}

export interface BasicInfoStepProps {
  formData: FormData;
  formErrors: FormErrors;
  updateFormData: (section: keyof FormData, field: string, value: any) => void;
  validateField: (section: keyof FormData, field: string) => void;
}

export interface CreatorInfoStepProps {
  formData: FormData;
  formErrors: FormErrors;
  updateFormData: (section: keyof FormData, field: string, value: any) => void;
  validateField: (section: keyof FormData, field: string) => void;
}

export interface FundingDetailsStepProps {
  formData: FormData;
  formErrors: FormErrors;
  updateFormData: (section: keyof FormData, field: string, value: any) => void;
  validateField: (section: keyof FormData, field: string) => void;
}

export interface ProjectInfoStepProps {
  formData: FormData;
  formErrors: FormErrors;
  updateFormData: (section: keyof FormData, field: string, value: any) => void;
  validateField: (section: keyof FormData, field: string) => void;
}

export interface SocialValidationStepProps {
  formData: FormData;
  formErrors: FormErrors;
  updateFormData: (section: keyof FormData, field: string, value: any) => void;
  validateField: (section: keyof FormData, field: string) => void;
}

export interface SupportingDocsStepProps {
  formData: FormData;
  formErrors: FormErrors;
  updateFormData: (section: keyof FormData, field: string, value: any) => void;
  validateField: (section: keyof FormData, field: string) => void;
}

export interface AboutSectionProps {
  user: User;
  isEditing: boolean;
  onSave: (updatedUser: Partial<User>) => void;
  onCancel: () => void;
}

export interface ProposalCardProps {
  proposal: Proposal;
}

export interface ProposalsListProps {
  proposals: Proposal[];
  isOwner: boolean;
}

export interface SocialLinksProps {
  user: User;
  isEditing: boolean;
  onSave: (updatedUser: Partial<User>) => void;
  onCancel: () => void;
}