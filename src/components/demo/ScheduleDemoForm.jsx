import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline';
import { Button, Input } from '../common';
import toast from 'react-hot-toast';

const ScheduleDemoForm = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Team size
    teamSize: '',
    
    // Step 2: Industry
    industry: '',
    
    // Step 3: Requirements
    whyNeedCRM: '',
    currentSolution: '',
    monthlyRevenue: '',
    
    // Step 4: Contact information
    name: '',
    phone: '',
    countryCode: '+1',
    companyName: '',
    companyEmail: '',
    jobTitle: '',
    startTimeframe: '',
    hearAboutUs: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const totalSteps = 4;

  const teamSizeOptions = [
    { value: 'upto2', label: 'Up to 2' },
    { value: '3-5', label: '3-5' },
    { value: '6-10', label: '6-10' },
    { value: '11-20', label: '11-20' },
    { value: '20plus', label: '20+' }
  ];

  const industryOptions = [
    'Education',
    'Real Estate',
    'Finance',
    'Travel',
    'Digital Marketing',
    'Manufacturing',
    'Automobiles',
    'E-commerce',
    'Insurance',
    'Software and IT Services',
    'Healthcare',
    'Other'
  ];

  const startTimeframeOptions = [
    'Immediately',
    'Within 1 month',
    'Within 3 months',
    'Within 6 months',
    'Not sure yet'
  ];

  const hearAboutUsOptions = [
    'Google Search',
    'Social Media',
    'Referral',
    'Advertisement',
    'Content/Blog',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowValidation(false);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.teamSize !== '';
      case 2:
        return formData.industry !== '';
      case 3:
        return formData.whyNeedCRM.trim() !== '' && 
               formData.currentSolution.trim() !== '';
      case 4:
        return formData.name.trim() !== '' && 
               formData.phone.trim() !== '' && 
               formData.companyName.trim() !== '' && 
               formData.companyEmail.trim() !== '' &&
               formData.jobTitle.trim() !== '' &&
               formData.startTimeframe !== '' &&
               formData.hearAboutUs !== '';
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

    if (currentStep === 1 && (formData.teamSize === 'upto2')) {
      console.log('Small team size detected, showing validation message');
      // Show team size validation message like in the screenshots
      setCurrentStep(2.5); // Special step for team size validation
      return;
    }

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
    if (currentStep === 2.5) {
      setCurrentStep(1);
      return;
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting form with data:', formData);
    setIsSubmitting(true);
    
    try {
      // Validate final form data
      if (!formData.name || !formData.phone || !formData.companyEmail) {
        throw new Error('Please fill in all required fields');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Demo request submitted successfully:', formData);
      toast.success('Demo request submitted successfully! We\'ll contact you soon.');
      
      // Reset form
      setFormData({
        teamSize: '', industry: '', whyNeedCRM: '', currentSolution: '',
        monthlyRevenue: '', name: '', phone: '', countryCode: '+1',
        companyName: '', companyEmail: '', jobTitle: '', startTimeframe: '',
        hearAboutUs: ''
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
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          How many people are there in your sales team?
          <span className="text-red-500 ml-1">*</span>
        </h3>
        
        <div className="space-y-3">
          {teamSizeOptions.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="teamSize"
                value={option.value}
                checked={formData.teamSize === option.value}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        
        {showValidation && !formData.teamSize && (
          <p className="text-red-500 text-sm mt-2">Please select your team size</p>
        )}
      </div>
    </motion.div>
  );

  const renderStep2Point5 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center space-y-6"
    >
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
          <SpeakerWaveIcon className="w-8 h-8 text-yellow-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Thank you for your interest in CallTracker Pro
          </h3>
          <p className="text-gray-600">
            We are best suited for teams with 3+ members.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <Button
          onClick={() => {
            handleInputChange('teamSize', '');
            setCurrentStep(1);
          }}
          className="w-full"
        >
          Change team size
        </Button>
        
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          Exit
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Industry <span className="text-red-500">*</span>
        </label>
        
        <select
          value={formData.industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Choose...</option>
          {industryOptions.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        
        {showValidation && !formData.industry && (
          <p className="text-red-500 text-sm mt-2">Please select your industry</p>
        )}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Why do you need a CRM? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.whyNeedCRM}
          onChange={(e) => handleInputChange('whyNeedCRM', e.target.value)}
          placeholder="Tell us about your specific needs..."
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        {showValidation && !formData.whyNeedCRM.trim() && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What are you using right now to manage your leads and follow-ups? <span className="text-red-500">*</span>
        </label>
        <Input
          value={formData.currentSolution}
          onChange={(e) => handleInputChange('currentSolution', e.target.value)}
          placeholder="e.g., Excel, Google Sheets, another CRM..."
          className="w-full"
        />
        {showValidation && !formData.currentSolution.trim() && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          What is your monthly revenue?
        </label>
        <Input
          value={formData.monthlyRevenue}
          onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
          placeholder="e.g., $10,000"
          className="w-full"
        />
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            Phone no. <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <select
              value={formData.countryCode}
              onChange={(e) => handleInputChange('countryCode', e.target.value)}
              className="w-20 p-3 border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+91">🇮🇳 +91</option>
              <option value="+86">🇨🇳 +86</option>
            </select>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="1234567890"
              className="flex-1 rounded-l-none"
            />
          </div>
          {showValidation && !formData.phone.trim() && (
            <p className="text-red-500 text-xs mt-1">Phone number is required</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company name <span className="text-red-500">*</span>
        </label>
        <Input
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          placeholder="Your company name"
          icon={<BuildingOfficeIcon className="w-5 h-5" />}
        />
        {showValidation && !formData.companyName.trim() && (
          <p className="text-red-500 text-xs mt-1">Company name is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company email <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          value={formData.companyEmail}
          onChange={(e) => handleInputChange('companyEmail', e.target.value)}
          placeholder="company@example.com"
          icon={<EnvelopeIcon className="w-5 h-5" />}
        />
        {showValidation && !formData.companyEmail.trim() && (
          <p className="text-red-500 text-xs mt-1">Company email is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Job title <span className="text-red-500">*</span>
        </label>
        <Input
          value={formData.jobTitle}
          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          placeholder="e.g., Sales Manager"
          icon={<BriefcaseIcon className="w-5 h-5" />}
        />
        {showValidation && !formData.jobTitle.trim() && (
          <p className="text-red-500 text-xs mt-1">Job title is required</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            How soon are you planning to start? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.startTimeframe}
            onChange={(e) => handleInputChange('startTimeframe', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Choose...</option>
            {startTimeframeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showValidation && !formData.startTimeframe && (
            <p className="text-red-500 text-xs mt-1">Please select timeframe</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            How did you hear about us? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.hearAboutUs}
            onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Choose...</option>
            {hearAboutUsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showValidation && !formData.hearAboutUs && (
            <p className="text-red-500 text-xs mt-1">Please select an option</p>
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
        case 2.5:
          return renderStep2Point5();
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

  const getStepNumber = () => {
    if (currentStep === 2.5) return 2;
    return Math.min(currentStep, totalSteps);
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
          <h2 className="text-xl font-semibold text-gray-900">Book a demo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Progress indicator */}
        {currentStep !== 2.5 && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Step {getStepNumber()} of {totalSteps}</span>
              <span>{Math.round((getStepNumber() / totalSteps) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(getStepNumber() / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {currentStep !== 2.5 && (
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
                  <span>Submitting...</span>
                </>
              ) : currentStep === totalSteps ? (
                <>
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Submit</span>
                </>
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDemoForm;