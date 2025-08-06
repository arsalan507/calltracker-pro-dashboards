import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { Button, Input } from '../common';
import toast from 'react-hot-toast';

const ScheduleDemoForm = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: The Moment of Truth
    triggerEvent: '',
    costOfInaction: '',
    
    // Step 2: The Attribution Detective
    currentTrackingMethod: [],
    magicWandInsight: '',
    mustHaveIntegrations: [],
    
    // Step 3: The Success Scenario
    victoryPriorities: [],
    decisionStyle: 50, // slider value
    
    // Step 4: The Connection
    stakeholders: [],
    personalWin: '',
    name: '',
    email: '',
    bestDemoTime: '',
    preferredDemoLength: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const totalSteps = 4;

  const triggerEventOptions = [
    { value: 'roi-questioned', label: '📞 A client/boss questioned our marketing ROI and we couldn\'t prove phone call value' },
    { value: 'lost-deal', label: '🔥 We lost a major deal and suspect it was due to poor call handling' },
    { value: 'wasted-ads', label: '📊 We\'re spending $X on ads but have no idea which campaigns drive calls' },
    { value: 'lead-quality', label: '🎯 Our sales team claims leads are \'low quality\' but we can\'t verify' },
    { value: 'competitor-stealing', label: '💔 We discovered competitors are stealing calls meant for us' },
    { value: 'scaling-chaos', label: '🚀 We\'re scaling fast and losing track of what\'s actually working' },
    { value: 'exploring', label: '🤔 Nothing urgent - just exploring options' }
  ];

  const costOfInactionOptions = [
    { value: 'client-relationships', label: 'Lost client relationships worth $10K-50K' },
    { value: 'wasted-spend', label: 'Wasted ad spend of $50K-100K' },
    { value: 'missed-revenue', label: 'Missed revenue opportunities $100K+' },
    { value: 'reputation', label: 'Team credibility and my reputation' },
    { value: 'competitive-advantage', label: 'Competitive advantage in our market' },
    { value: 'hard-to-quantify', label: 'Hard to quantify, but I know it\'s significant' }
  ];

  const trackingMethodOptions = [
    { value: 'ask-customers', label: '😅 We ask them (and hope they remember accurately)' },
    { value: 'manual-logging', label: '📝 Sales reps manually log their best guess' },
    { value: 'different-numbers', label: '📱 We use different phone numbers for different campaigns' },
    { value: 'google-analytics', label: '🔍 We check Google Analytics and make assumptions' },
    { value: 'incomplete-tracking', label: '📊 We have some call tracking but it\'s incomplete/unreliable' },
    { value: 'black-box', label: '🤷 Honestly, we just don\'t know - it\'s a black box' },
    { value: 'no-integration', label: '🎯 We have a system but it doesn\'t integrate with our other tools' }
  ];

  const integrationOptions = [
    'Google Ads', 'Facebook Ads', 'Salesforce', 'HubSpot', 'Google Analytics', 
    'Zapier', 'Custom CRM', 'We\'re surprisingly tool-light', 
    'Integration headaches are why we haven\'t solved this yet'
  ];

  const victoryOptions = [
    { value: 'prove-roi', label: 'Proved conclusively that our marketing budget should increase' },
    { value: 'eliminate-waste', label: 'Identified and eliminated our worst-performing campaigns' },
    { value: 'improve-sales', label: 'Improved sales team performance with call recording insights' },
    { value: 'save-client', label: 'Saved a client relationship by showing clear ROI' },
    { value: 'discover-sources', label: 'Discovered our highest-value lead sources' },
    { value: 'streamline-reporting', label: 'Streamlined our reporting to stakeholders' },
    { value: 'fix-call-handling', label: 'Caught and fixed call handling issues before losing deals' },
    { value: 'beat-competitors', label: 'Beat competitors by optimizing what they can\'t see' }
  ];

  const stakeholderOptions = [
    'Just me - I make the call', 'My boss/executive team', 'Finance/budget approvers',
    'IT/technical team', 'Other marketing team members', 'External clients', 
    'I\'ll be presenting to skeptics'
  ];

  const personalWinOptions = [
    { value: 'prove-strategic', label: 'Proving I\'m strategic, not just tactical' },
    { value: 'confidence', label: 'Finally having confidence in our marketing decisions' },
    { value: 'recognition', label: 'Getting recognition for optimizing our biggest expense' },
    { value: 'push-back', label: 'Having ammunition to push back on budget cuts' },
    { value: 'hero', label: 'Looking like a hero who solved an expensive problem' },
    { value: 'sleep-better', label: 'Just sleeping better knowing we\'re not hemorrhaging money' }
  ];

  const demoTimeOptions = [
    'First thing Monday morning', 'Mid-week afternoons', 'Friday end-of-week reviews', 
    'Whatever works - this is urgent'
  ];

  const demoLengthOptions = [
    'Quick 15-minute overview', 'Thorough 30-minute deep dive', 
    'Whatever it takes to see everything'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowValidation(false);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.triggerEvent !== '' && formData.costOfInaction !== '';
      case 2:
        return formData.currentTrackingMethod.length > 0 && 
               formData.magicWandInsight.trim() !== '' &&
               formData.mustHaveIntegrations.length > 0;
      case 3:
        return formData.victoryPriorities.length > 0 && 
               formData.decisionStyle !== null;
      case 4:
        return formData.name.trim() !== '' && 
               formData.email.trim() !== '' && 
               formData.stakeholders.length > 0 &&
               formData.personalWin !== '' &&
               formData.bestDemoTime !== '' &&
               formData.preferredDemoLength !== '';
      default:
        return true;
    }
  };

  const handleNext = () => {
    console.log('handleNext called - currentStep:', currentStep, 'formData:', formData);
    
    if (!validateStep(currentStep)) {
      console.log('Validation failed for step:', currentStep);
      setShowValidation(true);
      return;
    }

    // No special validation step needed for the new form

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      console.log('Moving to next step:', nextStep);
      setCurrentStep(nextStep);
    } else {
      console.log('Final step reached, submitting form');
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting form with data:', formData);
    setIsSubmitting(true);
    
    try {
      // Validate final form data
      if (!formData.name || !formData.email) {
        throw new Error('Please fill in all required fields');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Demo request submitted successfully:', formData);
      
      // Create personalized success message
      const triggerLabel = triggerEventOptions.find(opt => opt.value === formData.triggerEvent)?.label || 'your situation';
      const topVictory = formData.victoryPriorities[0];
      const victoryLabel = victoryOptions.find(opt => opt.value === topVictory)?.label || 'your goals';
      
      // Extract safe challenge description
      const challengeText = triggerLabel.includes('📞') ? 'call tracking challenges' :
                           triggerLabel.includes('🔥') ? 'deal conversion issues' :
                           triggerLabel.includes('📊') ? 'campaign attribution problems' :
                           triggerLabel.includes('🎯') ? 'lead quality concerns' :
                           triggerLabel.includes('💔') ? 'competitor threats' :
                           triggerLabel.includes('🚀') ? 'scaling challenges' : 'your business needs';
      
      toast.success(
        `🎯 Perfect! I'm preparing a demo focused on ${victoryLabel.toLowerCase()} and solving ${challengeText}. Check your email for next steps!`,
        { duration: 6000 }
      );
      
      // Reset form
      setFormData({
        triggerEvent: '', costOfInaction: '', currentTrackingMethod: [],
        magicWandInsight: '', mustHaveIntegrations: [], victoryPriorities: [],
        decisionStyle: 50, stakeholders: [], personalWin: '', name: '',
        email: '', bestDemoTime: '', preferredDemoLength: ''
      });
      setCurrentStep(1);
      setShowValidation(false);
      
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">The Moment of Truth</h3>
        <p className="text-gray-600">Tell us what's driving your urgency to solve this</p>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          What happened recently that made call tracking feel urgent?
          <span className="text-red-500 ml-1">*</span>
        </h4>
        
        <div className="space-y-3">
          {triggerEventOptions.map((option) => (
            <label key={option.value} className="flex items-start cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all">
              <input
                type="radio"
                name="triggerEvent"
                value={option.value}
                checked={formData.triggerEvent === option.value}
                onChange={(e) => handleInputChange('triggerEvent', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 mt-1"
              />
              <span className="ml-3 text-gray-700 font-medium leading-relaxed">{option.label}</span>
            </label>
          ))}
        </div>
        
        {showValidation && !formData.triggerEvent && (
          <p className="text-red-500 text-sm mt-2">Please select what triggered your interest</p>
        )}
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          If this problem persists for 3 more months, what's the real cost?
          <span className="text-red-500 ml-1">*</span>
        </h4>
        
        <div className="space-y-3">
          {costOfInactionOptions.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all">
              <input
                type="radio"
                name="costOfInaction"
                value={option.value}
                checked={formData.costOfInaction === option.value}
                onChange={(e) => handleInputChange('costOfInaction', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        
        {showValidation && !formData.costOfInaction && (
          <p className="text-red-500 text-sm mt-2">Please select the potential cost</p>
        )}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">The Attribution Detective</h3>
        <p className="text-gray-600">Help us understand your current tracking reality</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Right now, when a customer calls, how do you figure out what marketing brought them in?
          <span className="text-red-500 ml-1">*</span>
        </h4>
        <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
        
        <div className="space-y-3">
          {trackingMethodOptions.map((option) => (
            <label key={option.value} className="flex items-start cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.currentTrackingMethod.includes(option.value)}
                onChange={(e) => {
                  const newMethods = e.target.checked 
                    ? [...formData.currentTrackingMethod, option.value]
                    : formData.currentTrackingMethod.filter(m => m !== option.value);
                  handleInputChange('currentTrackingMethod', newMethods);
                }}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 mt-1"
              />
              <span className="ml-3 text-gray-700 font-medium leading-relaxed">{option.label}</span>
            </label>
          ))}
        </div>
        
        {showValidation && formData.currentTrackingMethod.length === 0 && (
          <p className="text-red-500 text-sm mt-2">Please select at least one method</p>
        )}
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          If you had a magic wand, what's the ONE call-related insight you'd want to see on your dashboard tomorrow morning?
          <span className="text-red-500 ml-1">*</span>
        </h4>
        <textarea
          value={formData.magicWandInsight}
          onChange={(e) => handleInputChange('magicWandInsight', e.target.value)}
          placeholder="Example: Which Google Ads keywords generate calls that actually convert to sales..."
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        {showValidation && !formData.magicWandInsight.trim() && (
          <p className="text-red-500 text-sm mt-1">Please share your ideal insight</p>
        )}
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          What tools absolutely must play nice with your call tracking?
          <span className="text-red-500 ml-1">*</span>
        </h4>
        <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
        
        <div className="grid grid-cols-2 gap-3">
          {integrationOptions.map((integration) => (
            <label key={integration} className="flex items-center cursor-pointer p-2 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all">
              <input
                type="checkbox"
                value={integration}
                checked={formData.mustHaveIntegrations.includes(integration)}
                onChange={(e) => {
                  const newIntegrations = e.target.checked 
                    ? [...formData.mustHaveIntegrations, integration]
                    : formData.mustHaveIntegrations.filter(i => i !== integration);
                  handleInputChange('mustHaveIntegrations', newIntegrations);
                }}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 font-medium">{integration}</span>
            </label>
          ))}
        </div>
        
        {showValidation && formData.mustHaveIntegrations.length === 0 && (
          <p className="text-red-500 text-sm mt-2">Please select at least one integration</p>
        )}
      </div>
    </motion.div>
  );

  const renderStep3 = () => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">The Success Scenario</h3>
          <p className="text-gray-600">Paint the picture of your victory</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Fast-forward 6 months: CallTracker Pro is working perfectly. What victory are you celebrating?
            <span className="text-red-500 ml-1">*</span>
          </h4>
          <p className="text-sm text-gray-500 mb-4">Select your top 3 priorities</p>
          
          <div className="space-y-3">
            {victoryOptions.map((option) => {
              const isSelected = formData.victoryPriorities.includes(option.value);
              const selectedIndex = formData.victoryPriorities.indexOf(option.value);
              
              return (
                <label 
                  key={option.value} 
                  className={`flex items-start cursor-pointer p-3 border rounded-lg transition-all ${
                    isSelected 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isSelected}
                    onChange={(e) => {
                      const newPriorities = e.target.checked 
                        ? [...formData.victoryPriorities, option.value].slice(0, 3)
                        : formData.victoryPriorities.filter(p => p !== option.value);
                      handleInputChange('victoryPriorities', newPriorities);
                    }}
                    disabled={!isSelected && formData.victoryPriorities.length >= 3}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 mt-1"
                  />
                  <span className="ml-3 text-gray-700 font-medium leading-relaxed">
                    {isSelected && (
                      <span className="inline-block w-6 h-6 bg-primary-600 text-white rounded-full text-xs text-center leading-6 mr-2">
                        {selectedIndex + 1}
                      </span>
                    )}
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
          
          {showValidation && formData.victoryPriorities.length === 0 && (
            <p className="text-red-500 text-sm mt-2">Please select at least one victory scenario</p>
          )}
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            For a tool like this, what convinces you more?
            <span className="text-red-500 ml-1">*</span>
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Seeing detailed data and ROI calculations</span>
              <span>Hearing success stories from similar businesses</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.decisionStyle}
              onChange={(e) => handleInputChange('decisionStyle', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center text-sm text-gray-500">
              {formData.decisionStyle < 30 ? 'Data-driven approach' : 
               formData.decisionStyle > 70 ? 'Story-driven approach' : 
               'Balanced approach'}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">The Connection</h3>
        <p className="text-gray-600">Let's personalize your demo experience</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Who else will be in the room (virtually or literally) when you present this solution?
          <span className="text-red-500 ml-1">*</span>
        </h4>
        <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
        
        <div className="space-y-3">
          {stakeholderOptions.map((stakeholder) => (
            <label key={stakeholder} className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all">
              <input
                type="checkbox"
                value={stakeholder}
                checked={formData.stakeholders.includes(stakeholder)}
                onChange={(e) => {
                  const newStakeholders = e.target.checked 
                    ? [...formData.stakeholders, stakeholder]
                    : formData.stakeholders.filter(s => s !== stakeholder);
                  handleInputChange('stakeholders', newStakeholders);
                }}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-3 text-gray-700 font-medium">{stakeholder}</span>
            </label>
          ))}
        </div>
        
        {showValidation && formData.stakeholders.length === 0 && (
          <p className="text-red-500 text-sm mt-2">Please select at least one stakeholder</p>
        )}
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Beyond business results, what would solving this mean for you personally?
          <span className="text-red-500 ml-1">*</span>
        </h4>
        
        <div className="space-y-3">
          {personalWinOptions.map((option) => (
            <label key={option.value} className="flex items-start cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all">
              <input
                type="radio"
                name="personalWin"
                value={option.value}
                checked={formData.personalWin === option.value}
                onChange={(e) => handleInputChange('personalWin', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 mt-1"
              />
              <span className="ml-3 text-gray-700 font-medium leading-relaxed">{option.label}</span>
            </label>
          ))}
        </div>
        
        {showValidation && !formData.personalWin && (
          <p className="text-red-500 text-sm mt-2">Please select what this means for you personally</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Your full name"
            icon={<BriefcaseIcon className="w-5 h-5" />}
          />
          {showValidation && !formData.name.trim() && (
            <p className="text-red-500 text-xs mt-1">Name is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your@company.com"
            icon={<EnvelopeIcon className="w-5 h-5" />}
          />
          {showValidation && !formData.email.trim() && (
            <p className="text-red-500 text-xs mt-1">Email is required</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Best time for demo <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.bestDemoTime}
            onChange={(e) => handleInputChange('bestDemoTime', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Choose...</option>
            {demoTimeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showValidation && !formData.bestDemoTime && (
            <p className="text-red-500 text-xs mt-1">Please select best demo time</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Preferred demo length <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.preferredDemoLength}
            onChange={(e) => handleInputChange('preferredDemoLength', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Choose...</option>
            {demoLengthOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showValidation && !formData.preferredDemoLength && (
            <p className="text-red-500 text-xs mt-1">Please select preferred demo length</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStepContent = () => {
    try {
      switch (currentStep) {
        case 1:
          return renderStep1();
        case 2:
          return renderStep2();
        case 3:
          return renderStep3();
        case 4:
          return renderStep4();
        default:
          console.error('Invalid step:', currentStep);
          return (
            <div className="text-center p-6">
              <p className="text-gray-600">Something went wrong. Please refresh and try again.</p>
              <Button onClick={() => setCurrentStep(1)} className="mt-4">
                Start Over
              </Button>
            </div>
          );
      }
    } catch (error) {
      console.error('Error rendering step content:', error);
      return (
        <div className="text-center p-6">
          <p className="text-red-600">Error loading form step. Please try again.</p>
          <Button onClick={() => setCurrentStep(1)} className="mt-4">
            Restart Form
          </Button>
        </div>
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        ></div>
        
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Let's Design Your Perfect Call Tracking Demo</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center space-x-2 min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Preparing Your Demo...</span>
                </>
              ) : currentStep === totalSteps ? (
                <>
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Book My Demo</span>
                </>
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDemoForm;