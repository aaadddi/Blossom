import React from 'react';
import Input from '../ui/Input';
import FormSection from '../ui/FormSection';
import { SocialValidationStepProps } from '@/types';

const SocialValidationStep: React.FC<SocialValidationStepProps> = ({
  formData,
  formErrors,
  updateFormData,
  validateField,
}) => {
  return (
    <FormSection
      title="Social Validation"
      description="Share your online presence to build credibility"
    >
      <Input
        label="GitHub Link"
        placeholder="https://github.com/yourusername"
        value={formData.socialValidation.githubLink}
        onChange={(e) => updateFormData('socialValidation', 'githubLink', e.target.value)}
        onBlur={() => validateField('socialValidation', 'githubLink')}
        error={formErrors.socialValidation?.githubLink}
        type="url"
        helperText="Share your GitHub profile or project repository"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        }
      />
      
      <Input
        label="Twitter/X Profile"
        placeholder="https://twitter.com/yourusername"
        value={formData.socialValidation.twitterProfile}
        onChange={(e) => updateFormData('socialValidation', 'twitterProfile', e.target.value)}
        onBlur={() => validateField('socialValidation', 'twitterProfile')}
        error={formErrors.socialValidation?.twitterProfile}
        type="url"
        helperText="Share your Twitter/X profile"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        }
      />
      
      <Input
        label="Portfolio/Website"
        placeholder="https://yourwebsite.com"
        value={formData.socialValidation.portfolioWebsite}
        onChange={(e) => updateFormData('socialValidation', 'portfolioWebsite', e.target.value)}
        onBlur={() => validateField('socialValidation', 'portfolioWebsite')}
        error={formErrors.socialValidation?.portfolioWebsite}
        type="url"
        helperText="Link to your portfolio or personal website"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        }
      />
      
      <Input
        label="LinkedIn"
        placeholder="https://linkedin.com/in/yourusername"
        value={formData.socialValidation.linkedIn}
        onChange={(e) => updateFormData('socialValidation', 'linkedIn', e.target.value)}
        onBlur={() => validateField('socialValidation', 'linkedIn')}
        error={formErrors.socialValidation?.linkedIn}
        type="url"
        helperText="Share your LinkedIn profile"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        }
      />
      
      <Input
        label="Discord/Telegram"
        placeholder="Your Discord or Telegram username/link"
        value={formData.socialValidation.discordTelegram}
        onChange={(e) => updateFormData('socialValidation', 'discordTelegram', e.target.value)}
        onBlur={() => validateField('socialValidation', 'discordTelegram')}
        error={formErrors.socialValidation?.discordTelegram}
        helperText="Share your Discord or Telegram contact"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.874-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
          </svg>
        }
      />
      
      <Input
        label="Other Relevant Links"
        placeholder="Additional relevant links"
        value={formData.socialValidation.otherLinks}
        onChange={(e) => updateFormData('socialValidation', 'otherLinks', e.target.value)}
        onBlur={() => validateField('socialValidation', 'otherLinks')}
        error={formErrors.socialValidation?.otherLinks}
        type="url"
        helperText="Any other relevant links (Medium, YouTube, etc.)"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        }
      />
    </FormSection>
  );
};

export default SocialValidationStep;