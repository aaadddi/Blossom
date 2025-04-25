import { FormData, FormErrors } from '@/types/form';

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

export interface Proposal {
  id: string;
  title: string;
  description: string;
  amountRequested: number;
  amountReceived: number;
  fullyFunded: boolean;
  category: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  creator: {
    username: string;
    bio: string;
    social_handles: {
      twitter?: string;
      github?: string;
      website?: string;
    };
    previousFundings: number;
  };
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

