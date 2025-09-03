import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileCompletion from '../../components/candidate/ProfileCompletion';
import { nationalities, getAllJobTitles, getJobCategories, getJobTitlesByCategory } from '../../utils/jobData';
import { 
  getAllCountries, 
  getRegionsByCountry, 
  getCitiesByRegion, 
  getAllCities,
  formatLocation,
  searchLocations 
} from '../../utils/globalData';
import { 
  getAllLanguages, 
  getLanguageProficiencyLevels, 
  searchLanguages,
  LanguageProficiency
} from '../../utils/languageData';
import { 
  countryCodes, 
  searchCountryCodes, 
  CountryCode 
} from '../../utils/countryCodes';
import { 
  searchNationalities 
} from '../../utils/jobData';
import { 
  searchCountries,
  searchRegionsByCountry,
  searchCitiesByRegion
} from '../../utils/globalData';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Upload,
  Globe,
  Home,
  Heart,
  Flag,
  Building,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Download,
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Trash2,
  Clock,
  Star,
  TrendingUp,
  Target,
  Zap,
  BookOpen,
  DollarSign,
  Type,
  Monitor,
  Code,
  Trophy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Circle,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

interface Employment {
  id: string;
  companyName: string;
  designation: string;
  fromDate: string;
  toDate: string;
  isCurrent: boolean;
  companyProfile: string;
  rolesResponsibilities: string;
  keyAchievements: string;
  industry: string;
  functionalArea: string;
}

interface Education {
  id: string;
  degree: string;
  specialization: string;
  institute: string;
  yearOfPassing: string;
  isHighestQualification: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  yearOfCompletion: string;
  validity?: string;
}

interface Project {
  id: string;
  title: string;
  client: string;
  duration: string;
  description: string;
  toolsTechnologies: string;
}

interface ITSkill {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'expert';
  yearsOfExperience: number;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'Native / Bilingual Proficiency' | 'Full Professional Proficiency' | 'Professional Working Proficiency' | 'Limited Working Proficiency' | 'Elementary Proficiency';
}

interface Accomplishment {
  id: string;
  type: 'certification' | 'award' | 'publication' | 'patent';
  title: string;
  description: string;
  year: string;
}

interface Reference {
  id: string;
  fullName: string;
  designation: string;
  organization: string;
  email: string;
  phone?: string;
  linkedinProfile?: string;
  relationship: 'manager' | 'colleague' | 'client' | 'mentor' | 'supervisor' | 'other';
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'unreachable';
  verificationDate?: string;
  verificationComments?: string;
  isAuthorized: boolean;
}

interface OnlinePresence {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  otherProfiles?: string[];
}

interface JobPreferences {
  jobType: 'permanent' | 'contract' | 'internship' | 'freelance';
  shiftPreference: 'day' | 'night' | 'rotational' | 'flexible';
  department: string;
  willingnessToRelocate: boolean;
  relocationLocations?: string[];
  workPermit?: string;
  travelFlexibility: boolean;
}

interface CandidateProfile {
  // Personal Information
  fullName: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  dateOfBirth: string;
  age: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'separated';
  
  // Contact Details
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  alternatePhone?: {
    countryCode: string;
    number: string;
  };
  whatsapp?: {
    countryCode: string;
    number: string;
  };
  
  // Location Information
  currentLocation: {
    city: string;
    state: string;
    country: string;
  };
  preferredLocations: string[];
  
  // Address
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  
  // Nationality
  nationality: string;
  
  // Employment Details
  isExperienced: boolean;
  totalExperience: {
    years: number;
    months: number;
  };
  currentEmployment?: Employment;
  previousEmployments: Employment[];
  
  // Education Details
  education: Education[];
  certifications: Certification[];
  
  // Salary & Preferences
  currentCTC: number;
  expectedCTC: number;
  noticePeriod: string;
  
  // Profile Content
  resumeHeadline: string;
  profileSummary: string;
  
  // Projects
  projects: Project[];
  
  // Skills
  itSkills: ITSkill[];
  languages: Language[];
  
  // Accomplishments
  accomplishments: Accomplishment[];
  
  // Job Preferences
  jobPreferences: JobPreferences;
  
  // Online Presence
  onlinePresence: OnlinePresence;
  
  // References
  references: Reference[];
  
  // Additional Information
  photoUrl?: string;
  resumeUrl?: string;
  coverLetter?: string;
  
  // Privacy Settings
  isProfilePublic: boolean;
  allowContactFromEmployers: boolean;
  
  // Profile Completion
           profileCompletion: {
           personalInfo: boolean;
           employment: boolean;
           education: boolean;
           salary: boolean;
           profileContent: boolean;
           skills: boolean;
           preferences: boolean;
           references: boolean;
         };
}

const CandidateProfile: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddEmployment, setShowAddEmployment] = useState(false);
  const [editingEmploymentId, setEditingEmploymentId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [editingReference, setEditingReference] = useState<Reference | null>(null);

  // Form state
  const [profile, setProfile] = useState<CandidateProfile>({
    fullName: 'John Michael Doe',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    age: 33,
    maritalStatus: 'single',
    email: 'john.doe@email.com',
    phone: {
      countryCode: '+1',
      number: '(555) 123-4567'
    },
    alternatePhone: {
      countryCode: '+1',
      number: '(555) 987-6543'
    },
    whatsapp: {
      countryCode: '+1',
      number: '(555) 123-4567'
    },
    currentLocation: {
      city: 'San Francisco',
      state: 'California',
      country: 'United States'
    },
    preferredLocations: ['San Francisco, CA', 'New York, NY', 'Remote', 'Austin, TX'],
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'California',
      postalCode: '94102',
      country: 'United States'
    },
    nationality: 'American',
    isExperienced: true,
    totalExperience: {
      years: 5,
      months: 3
    },
    currentEmployment: {
      id: '1',
      companyName: 'TechCorp Solutions',
      designation: 'Senior Software Engineer',
      fromDate: '2022-01-15',
      toDate: '',
      isCurrent: true,
      companyProfile: 'Leading technology company specializing in cloud solutions and enterprise software development.',
      rolesResponsibilities: 'Lead development of microservices architecture, mentor junior developers, collaborate with cross-functional teams.',
      keyAchievements: 'Reduced system downtime by 40%, improved team productivity by 25%, delivered 3 major features on time.',
      industry: 'Technology',
      functionalArea: 'Software Development'
    },
    previousEmployments: [
      {
        id: '2',
        companyName: 'InnovateTech Inc',
        designation: 'Software Engineer',
        fromDate: '2020-03-01',
        toDate: '2021-12-31',
        isCurrent: false,
        companyProfile: 'Startup focused on mobile app development and AI solutions.',
        rolesResponsibilities: 'Developed mobile applications using React Native, implemented REST APIs, participated in agile development.',
        keyAchievements: 'Launched 2 successful mobile apps, improved app performance by 30%, received employee of the month award.',
        industry: 'Technology',
        functionalArea: 'Mobile Development'
      },
      {
        id: '3',
        companyName: 'Digital Solutions Ltd',
        designation: 'Junior Developer',
        fromDate: '2019-06-01',
        toDate: '2020-02-28',
        isCurrent: false,
        companyProfile: 'Digital agency providing web development and digital marketing services.',
        rolesResponsibilities: 'Built responsive websites using HTML, CSS, JavaScript, collaborated with design team.',
        keyAchievements: 'Completed 15+ client projects, learned modern web technologies, improved coding skills significantly.',
        industry: 'Digital Marketing',
        functionalArea: 'Web Development'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Technology',
        specialization: 'Computer Science',
        institute: 'Stanford University',
        yearOfPassing: '2019',
        isHighestQualification: true
      },
      {
        id: '2',
        degree: 'High School Diploma',
        specialization: 'Science',
        institute: 'San Francisco High School',
        yearOfPassing: '2015',
        isHighestQualification: false
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuingBody: 'Amazon Web Services',
        yearOfCompletion: '2023',
        validity: '2026'
      },
      {
        id: '2',
        name: 'Google Cloud Professional Developer',
        issuingBody: 'Google',
        yearOfCompletion: '2022',
        validity: '2025'
      }
    ],
    currentCTC: 120000,
    expectedCTC: 150000,
    noticePeriod: '30 days',
    resumeHeadline: 'Senior Software Engineer with 5+ years experience in Full-Stack Development',
    profileSummary: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable applications and mentoring junior developers.',
    projects: [
      {
        id: '1',
        title: 'E-commerce Platform',
        client: 'TechCorp Solutions',
        duration: '6 months',
        description: 'Built a full-stack e-commerce platform with payment integration and inventory management.',
        toolsTechnologies: 'React, Node.js, MongoDB, Stripe'
      }
    ],
    itSkills: [
      {
        id: '1',
        name: 'React',
        proficiency: 'expert',
        yearsOfExperience: 4
      },
      {
        id: '2',
        name: 'Node.js',
        proficiency: 'expert',
        yearsOfExperience: 3
      }
    ],
    languages: [
      {
        id: '1',
        name: 'English',
        proficiency: 'Native / Bilingual Proficiency'
      },
      {
        id: '2',
        name: 'Swahili',
        proficiency: 'Full Professional Proficiency'
      },
      {
        id: '3',
        name: 'French',
        proficiency: 'Professional Working Proficiency'
      }
    ],
    accomplishments: [
      {
        id: '1',
        type: 'award',
        title: 'Employee of the Year',
        description: 'Recognized for outstanding performance and leadership',
        year: '2023'
      }
    ],
    references: [
      {
        id: '1',
        fullName: 'Sarah Johnson',
        designation: 'Senior HR Manager',
        organization: 'TechCorp Solutions',
        email: 'sarah.johnson@techcorp.com',
        phone: '+1-555-123-4567',
        linkedinProfile: 'https://linkedin.com/in/sarahjohnson',
        relationship: 'manager',
        verificationStatus: 'verified',
        verificationDate: '2024-01-15',
        verificationComments: 'Excellent team player with strong technical skills',
        isAuthorized: true
      },
      {
        id: '2',
        fullName: 'Michael Chen',
        designation: 'Technical Lead',
        organization: 'InnovateTech Inc',
        email: 'michael.chen@innovatetech.com',
        phone: '+1-555-987-6543',
        linkedinProfile: 'https://linkedin.com/in/michaelchen',
        relationship: 'colleague',
        verificationStatus: 'pending',
        verificationDate: undefined,
        verificationComments: undefined,
        isAuthorized: true
      },
      {
        id: '3',
        fullName: 'Emily Rodriguez',
        designation: 'Project Manager',
        organization: 'Digital Solutions Ltd',
        email: 'emily.rodriguez@digitalsolutions.com',
        phone: '+1-555-456-7890',
        linkedinProfile: 'https://linkedin.com/in/emilyrodriguez',
        relationship: 'client',
        verificationStatus: 'pending',
        verificationDate: undefined,
        verificationComments: undefined,
        isAuthorized: true
      }
    ],
    jobPreferences: {
      jobType: 'permanent',
      shiftPreference: 'day',
      department: 'Engineering',
      willingnessToRelocate: true,
      relocationLocations: ['New York', 'Seattle', 'Austin'],
      workPermit: 'US Citizen',
      travelFlexibility: true
    },
    onlinePresence: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      portfolio: 'https://johndoe.dev'
    },
    photoUrl: '/logo.png',
    resumeUrl: '/resume.pdf',
    coverLetter: 'Experienced software engineer with 5+ years in full-stack development...',
    isProfilePublic: true,
    allowContactFromEmployers: true,
    profileCompletion: {
      personalInfo: true,
      employment: true,
      education: false,
      salary: false,
      profileContent: false,
      skills: false,
      preferences: false,
      references: true
    }
  });

  // Location selection state - initialized after profile
  const [selectedCountry, setSelectedCountry] = useState(profile.currentLocation.country || 'Tanzania');
  const [selectedRegion, setSelectedRegion] = useState(profile.currentLocation.state || '');
  const [selectedCity, setSelectedCity] = useState(profile.currentLocation.city || '');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  
  // Language management state
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [languageSearchQuery, setLanguageSearchQuery] = useState('');
  
  // Searchable dropdown states
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showAddressCountryDropdown, setShowAddressCountryDropdown] = useState(false);
  const [showAddressStateDropdown, setShowAddressStateDropdown] = useState(false);
  
  // Education modal states
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  
  // Phone country code dropdown states
  const [showPhoneCountryDropdown, setShowPhoneCountryDropdown] = useState(false);
  const [showAlternatePhoneCountryDropdown, setShowAlternatePhoneCountryDropdown] = useState(false);
  const [showWhatsappCountryDropdown, setShowWhatsappCountryDropdown] = useState(false);



  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia',
    'Japan', 'South Korea', 'Singapore', 'India', 'China', 'Brazil', 'Mexico',
    'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Morocco', 'Ghana', 'Ethiopia'
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
    'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
    'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      currentLocation: {
        ...prev.currentLocation,
        [field]: value
      }
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const addPreferredLocation = () => {
    if (locationSearchQuery && !profile.preferredLocations.includes(locationSearchQuery)) {
      setProfile(prev => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, locationSearchQuery]
      }));
      setLocationSearchQuery('');
    }
  };

  // Language management functions
  const handleAddLanguage = (languageData: Omit<Language, 'id'>) => {
    const newLanguage: Language = {
      ...languageData,
      id: Date.now().toString()
    };
    
    setProfile(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
    setShowLanguageModal(false);
    setEditingLanguage(null);
  };

  const handleEditLanguage = (language: Language) => {
    setEditingLanguage(language);
    setShowLanguageModal(true);
  };

  const handleUpdateLanguage = (languageId: string, languageData: Omit<Language, 'id'>) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === languageId 
          ? { ...languageData, id: languageId }
          : lang
      )
    }));
    setShowLanguageModal(false);
    setEditingLanguage(null);
  };

  const handleRemoveLanguage = (languageId: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== languageId)
    }));
  };

  // Education management functions
  const handleAddEducation = (educationData: Omit<Education, 'id'>) => {
    const newEducation: Education = {
      ...educationData,
      id: Date.now().toString()
    };
    
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
    setShowEducationModal(false);
    setEditingEducation(null);
  };

  const handleEditEducation = (education: Education) => {
    setEditingEducation(education);
    setShowEducationModal(true);
  };

  const handleUpdateEducation = (educationId: string, educationData: Omit<Education, 'id'>) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === educationId 
          ? { ...educationData, id: educationId }
          : edu
      )
    }));
    setShowEducationModal(false);
    setEditingEducation(null);
  };

  const handleRemoveEducation = (educationId: string) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== educationId)
    }));
  };

  const removePreferredLocation = (location: string) => {
    setProfile(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter(l => l !== location)
    }));
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleDateOfBirthChange = (dateOfBirth: string) => {
    const age = calculateAge(dateOfBirth);
    setProfile(prev => ({
      ...prev,
      dateOfBirth,
      age
    }));
  };

  const addEmployment = (employment: Omit<Employment, 'id'>) => {
    const newEmployment: Employment = {
      ...employment,
      id: Date.now().toString()
    };

    if (employment.isCurrent) {
      // If this is current employment, move existing current to previous
      if (profile.currentEmployment) {
        setProfile(prev => ({
          ...prev,
          currentEmployment: newEmployment,
          previousEmployments: [prev.currentEmployment!, ...prev.previousEmployments]
        }));
      } else {
        setProfile(prev => ({
          ...prev,
          currentEmployment: newEmployment
        }));
      }
    } else {
      setProfile(prev => ({
        ...prev,
        previousEmployments: [...prev.previousEmployments, newEmployment]
      }));
    }
  };

  const updateEmployment = (id: string, employment: Partial<Employment>) => {
    if (profile.currentEmployment?.id === id) {
      setProfile(prev => ({
        ...prev,
        currentEmployment: { ...prev.currentEmployment!, ...employment }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        previousEmployments: prev.previousEmployments.map(emp => 
          emp.id === id ? { ...emp, ...employment } : emp
        )
      }));
    }
  };

  const deleteEmployment = (id: string) => {
    if (profile.currentEmployment?.id === id) {
      setProfile(prev => ({
        ...prev,
        currentEmployment: undefined
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        previousEmployments: prev.previousEmployments.filter(emp => emp.id !== id)
      }));
    }
  };

  // Reference handlers
  const handleAddReference = (reference: Omit<Reference, 'id'>) => {
    const newReference: Reference = {
      ...reference,
      id: Date.now().toString(),
      verificationStatus: 'pending',
      isAuthorized: true
    };
    
    setProfile(prev => ({
      ...prev,
      references: [...prev.references, newReference]
    }));
    
    setShowReferenceModal(false);
    setEditingReference(null);
  };

  const handleEditReference = (reference: Reference) => {
    setEditingReference(reference);
    setShowReferenceModal(true);
  };

  const handleUpdateReference = (id: string, reference: Partial<Reference>) => {
    setProfile(prev => ({
      ...prev,
      references: prev.references.map(ref => 
        ref.id === id ? { ...ref, ...reference } : ref
      )
    }));
    
    setShowReferenceModal(false);
    setEditingReference(null);
  };

  const handleDeleteReference = (id: string) => {
    setProfile(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    // In a real app, you'd want to reload from API
  };

  return (
    <div className="w-full">
      {/* Profile Completion Banner */}
      {!isProfileComplete && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Complete Your Profile</h3>
                <p className="text-blue-700 text-sm">
                  Complete your profile to increase your chances of getting hired. 
                  {Object.values(profile.profileCompletion).filter(Boolean).length} of {Object.keys(profile.profileCompletion).length} sections completed.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowProfileCompletion(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Complete Profile
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && (
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-[#4ebf9e] text-white rounded-lg hover:bg-[#3da88a] transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        value={profile.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                      >
                        {genderOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleDateOfBirthChange(e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                    <select
                      value={profile.maritalStatus}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    >
                      {maritalStatusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="Search or select nationality..."
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                  onFocus={() => isEditing && setShowNationalityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowNationalityDropdown(false), 200)}
                />
                {showNationalityDropdown && isEditing && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {searchNationalities(profile.nationality)
                      .map(nationality => (
                        <div
                          key={nationality}
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleInputChange('nationality', nationality);
                            setShowNationalityDropdown(false);
                          }}
                        >
                          {nationality}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  
                  {/* Contact Buttons for Employers/Admins */}
                  {!isEditing && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-900 mb-3">Quick Contact</h4>
                      <div className="flex flex-wrap gap-2">
                        {/* Email Contact */}
                        <a
                          href={`mailto:${profile.email}`}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50 text-sm"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                        
                        {/* Phone Contact */}
                        <a
                          href={`tel:${profile.phone.countryCode}${profile.phone.number.replace(/\D/g, '')}`}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50 text-sm"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </a>
                        
                        {/* WhatsApp Contact */}
                        {profile.whatsapp && (
                          <a
                            href={`https://wa.me/${profile.whatsapp.countryCode.replace('+', '')}${profile.whatsapp.number.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </a>
                        )}
                        
                        {/* Alternate Phone Contact */}
                        {profile.alternatePhone && (
                          <a
                            href={`tel:${profile.alternatePhone.countryCode}${profile.alternatePhone.number.replace(/\D/g, '')}`}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50 text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            Alt Call
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <div className="flex gap-2">
                      {/* Country Code Dropdown */}
                      <div className="relative w-32">
                        <input
                          type="text"
                          value={profile.phone.countryCode}
                          onChange={(e) => handleInputChange('phone', { ...profile.phone, countryCode: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100 text-center"
                          onFocus={() => isEditing && setShowPhoneCountryDropdown(true)}
                          onBlur={() => setTimeout(() => setShowPhoneCountryDropdown(false), 200)}
                        />
                        {showPhoneCountryDropdown && isEditing && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                            {searchCountryCodes(profile.phone.countryCode)
                              .map(country => (
                                <div
                                  key={country.code}
                                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                                  onClick={() => {
                                    handleInputChange('phone', { ...profile.phone, countryCode: country.dialCode });
                                    setShowPhoneCountryDropdown(false);
                                  }}
                                >
                                  <span>{country.flag}</span>
                                  <span className="text-sm">{country.dialCode}</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      {/* Phone Number Input */}
                      <input
                        type="tel"
                        value={profile.phone.number}
                        onChange={(e) => handleInputChange('phone', { ...profile.phone, number: e.target.value })}
                        disabled={!isEditing}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
                    <div className="flex gap-2">
                      {/* Country Code Dropdown */}
                      <div className="relative w-32">
                        <input
                          type="text"
                          value={profile.alternatePhone?.countryCode || '+1'}
                          onChange={(e) => handleInputChange('alternatePhone', { 
                            countryCode: e.target.value, 
                            number: profile.alternatePhone?.number || '' 
                          })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100 text-center"
                          onFocus={() => isEditing && setShowAlternatePhoneCountryDropdown(true)}
                          onBlur={() => setTimeout(() => setShowAlternatePhoneCountryDropdown(false), 200)}
                        />
                        {showAlternatePhoneCountryDropdown && isEditing && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                            {searchCountryCodes(profile.alternatePhone?.countryCode || '+1')
                              .map(country => (
                                <div
                                  key={country.code}
                                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                                  onClick={() => {
                                    handleInputChange('alternatePhone', { 
                                      countryCode: country.dialCode, 
                                      number: profile.alternatePhone?.number || '' 
                                    });
                                    setShowAlternatePhoneCountryDropdown(false);
                                  }}
                                >
                                  <span>{country.flag}</span>
                                  <span className="text-sm">{country.dialCode}</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      {/* Phone Number Input */}
                      <input
                        type="tel"
                        value={profile.alternatePhone?.number || ''}
                        onChange={(e) => handleInputChange('alternatePhone', { 
                          countryCode: profile.alternatePhone?.countryCode || '+1', 
                          number: e.target.value 
                        })}
                        disabled={!isEditing}
                        placeholder="Optional"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                    <div className="flex gap-2">
                      {/* Country Code Dropdown */}
                      <div className="relative w-32">
                        <input
                          type="text"
                          value={profile.whatsapp?.countryCode || '+1'}
                          onChange={(e) => handleInputChange('whatsapp', { 
                            countryCode: e.target.value, 
                            number: profile.whatsapp?.number || '' 
                          })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100 text-center"
                          onFocus={() => isEditing && setShowWhatsappCountryDropdown(true)}
                          onBlur={() => setTimeout(() => setShowWhatsappCountryDropdown(false), 200)}
                        />
                        {showWhatsappCountryDropdown && isEditing && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                            {searchCountryCodes(profile.whatsapp?.countryCode || '+1')
                              .map(country => (
                                <div
                                  key={country.code}
                                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                                  onClick={() => {
                                    handleInputChange('whatsapp', { 
                                      countryCode: country.dialCode, 
                                      number: profile.whatsapp?.number || '' 
                                    });
                                    setShowWhatsappCountryDropdown(false);
                                  }}
                                >
                                  <span>{country.flag}</span>
                                  <span className="text-sm">{country.dialCode}</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      {/* Phone Number Input */}
                      <input
                        type="tel"
                        value={profile.whatsapp?.number || ''}
                        onChange={(e) => handleInputChange('whatsapp', { 
                          countryCode: profile.whatsapp?.countryCode || '+1', 
                          number: e.target.value 
                        })}
                        disabled={!isEditing}
                        placeholder="WhatsApp number"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Country Dropdown */}
                <div className="relative">
                  <input
                    type="text"
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedRegion('');
                      setSelectedCity('');
                      handleLocationChange('country', e.target.value);
                      handleLocationChange('state', '');
                      handleLocationChange('city', '');
                    }}
                    placeholder="Search or select country..."
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    onFocus={() => isEditing && setShowCountryDropdown(true)}
                    onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
                  />
                  {showCountryDropdown && isEditing && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {searchCountries(selectedCountry)
                        .map(country => (
                          <div
                            key={country}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setSelectedCountry(country);
                              setSelectedRegion('');
                              setSelectedCity('');
                              handleLocationChange('country', country);
                              handleLocationChange('state', '');
                              handleLocationChange('city', '');
                              setShowCountryDropdown(false);
                            }}
                          >
                            {country}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Region/State Dropdown */}
                <div className="relative">
                  <input
                    type="text"
                    value={selectedRegion}
                    onChange={(e) => {
                      setSelectedRegion(e.target.value);
                      setSelectedCity('');
                      handleLocationChange('state', e.target.value);
                      handleLocationChange('city', '');
                    }}
                    placeholder="Search or select region/state..."
                    disabled={!isEditing || !selectedCountry}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    onFocus={() => isEditing && selectedCountry && setShowRegionDropdown(true)}
                    onBlur={() => setTimeout(() => setShowRegionDropdown(false), 200)}
                  />
                  {showRegionDropdown && isEditing && selectedCountry && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {searchRegionsByCountry(selectedCountry, selectedRegion)
                        .map(region => (
                          <div
                            key={region}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setSelectedRegion(region);
                              setSelectedCity('');
                              handleLocationChange('state', region);
                              handleLocationChange('city', '');
                              setShowRegionDropdown(false);
                            }}
                          >
                            {region}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* City Dropdown */}
                <div className="relative">
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      handleLocationChange('city', e.target.value);
                    }}
                    placeholder="Search or select city..."
                    disabled={!isEditing || !selectedRegion}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    onFocus={() => isEditing && selectedRegion && setShowCityDropdown(true)}
                    onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                  />
                  {showCityDropdown && isEditing && selectedRegion && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {searchCitiesByRegion(selectedCountry, selectedRegion, selectedCity)
                        .map(city => (
                          <div
                            key={city}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setSelectedCity(city);
                              handleLocationChange('city', city);
                              setShowCityDropdown(false);
                            }}
                          >
                            {city}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locations</label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={locationSearchQuery}
                          onChange={(e) => setLocationSearchQuery(e.target.value)}
                          placeholder="Search for locations..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                        />
                        {isEditing && (
                          <button
                            onClick={() => {
                              if (locationSearchQuery && !profile.preferredLocations.includes(locationSearchQuery)) {
                                addPreferredLocation();
                                setLocationSearchQuery('');
                              }
                            }}
                            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
                          >
                            Add
                          </button>
                        )}
                      </div>
                      
                      {/* Location Search Results */}
                      {locationSearchQuery && (
                        <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                          {searchLocations(locationSearchQuery).map((location, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => {
                                if (!profile.preferredLocations.includes(location)) {
                                  setProfile(prev => ({
                                    ...prev,
                                    preferredLocations: [...prev.preferredLocations, location]
                                  }));
                                }
                                setLocationSearchQuery('');
                              }}
                            >
                              {location}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {profile.preferredLocations.map((location, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#4ebf9e] text-white rounded-full text-sm flex items-center gap-2"
                          >
                            <MapPin className="w-3 h-3" />
                            {location}
                            {isEditing && (
                              <button
                                onClick={() => removePreferredLocation(location)}
                                className="text-white hover:text-red-200"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Address</h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={profile.address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={profile.address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                  />
                </div>
                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      placeholder="Search or select state..."
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                      onFocus={() => isEditing && setShowAddressStateDropdown(true)}
                      onBlur={() => setTimeout(() => setShowAddressStateDropdown(false), 200)}
                    />
                    {showAddressStateDropdown && isEditing && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                        {states
                          .filter(state => 
                            state.toLowerCase().includes(profile.address.state.toLowerCase()) || 
                            profile.address.state === ''
                          )
                          .map(state => (
                            <div
                              key={state}
                              className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => {
                                handleAddressChange('state', state);
                                setShowAddressStateDropdown(false);
                              }}
                            >
                              {state}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={profile.address.postalCode}
                    onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.address.country}
                    onChange={(e) => handleAddressChange('country', e.target.value)}
                    placeholder="Search or select country..."
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                    onFocus={() => isEditing && setShowAddressCountryDropdown(true)}
                    onBlur={() => setTimeout(() => setShowAddressCountryDropdown(false), 200)}
                  />
                  {showAddressCountryDropdown && isEditing && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {searchCountries(profile.address.country)
                        .map(country => (
                          <div
                            key={country}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              handleAddressChange('country', country);
                              setShowAddressCountryDropdown(false);
                            }}
                          >
                            {country}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Employment Details</h3>
              {isEditing && (
                <button
                  onClick={() => setShowAddEmployment(true)}
                  className="px-3 py-1 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Employment
                </button>
              )}
            </div>
            <div className="p-6 space-y-6">
              {/* Experience Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="fresher"
                    name="experienceStatus"
                    checked={!profile.isExperienced}
                    onChange={() => setProfile(prev => ({ ...prev, isExperienced: false }))}
                    disabled={!isEditing}
                    className="text-[#114373] focus:ring-[#114373]"
                  />
                  <label htmlFor="fresher" className="text-sm font-medium text-gray-700">Fresher</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="experienced"
                    name="experienceStatus"
                    checked={profile.isExperienced}
                    onChange={() => setProfile(prev => ({ ...prev, isExperienced: true }))}
                    disabled={!isEditing}
                    className="text-[#114373] focus:ring-[#114373]"
                  />
                  <label htmlFor="experienced" className="text-sm font-medium text-gray-700">Experienced</label>
                </div>
              </div>

              {profile.isExperienced && (
                <>
                  {/* Total Experience */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience (Years)</label>
                      <input
                        type="number"
                        value={profile.totalExperience.years}
                        onChange={(e) => setProfile(prev => ({
                          ...prev,
                          totalExperience: { ...prev.totalExperience, years: parseInt(e.target.value) || 0 }
                        }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience (Months)</label>
                      <input
                        type="number"
                        value={profile.totalExperience.months}
                        onChange={(e) => setProfile(prev => ({
                          ...prev,
                          totalExperience: { ...prev.totalExperience, months: parseInt(e.target.value) || 0 }
                        }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Current Employment */}
                  {profile.currentEmployment && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-[#114373]" />
                          Current Employment
                        </h4>
                        {isEditing && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingEmploymentId(profile.currentEmployment!.id)}
                              className="text-[#114373] hover:text-[#0d3559] text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteEmployment(profile.currentEmployment!.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Company Name</label>
                          <p className="text-sm text-gray-900 mt-1">{profile.currentEmployment.companyName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Designation</label>
                          <p className="text-sm text-gray-900 mt-1">{profile.currentEmployment.designation}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Duration</label>
                          <p className="text-sm text-gray-900 mt-1">
                            {new Date(profile.currentEmployment.fromDate).toLocaleDateString()} - Present
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Industry</label>
                          <p className="text-sm text-gray-900 mt-1">{profile.currentEmployment.industry}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Company Profile</label>
                        <p className="text-sm text-gray-900 mt-1">{profile.currentEmployment.companyProfile}</p>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Roles & Responsibilities</label>
                        <p className="text-sm text-gray-900 mt-1">{profile.currentEmployment.rolesResponsibilities}</p>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                        <p className="text-sm text-gray-900 mt-1">{profile.currentEmployment.keyAchievements}</p>
                      </div>
                    </div>
                  )}

                  {/* Previous Employments */}
                  {profile.previousEmployments.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#114373]" />
                        Previous Employments
                      </h4>
                      <div className="space-y-4">
                        {profile.previousEmployments.map((employment) => (
                          <div key={employment.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="font-medium text-gray-900">{employment.companyName}</h5>
                              {isEditing && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setEditingEmploymentId(employment.id)}
                                    className="text-[#114373] hover:text-[#0d3559] text-sm"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteEmployment(employment.id)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Designation</label>
                                <p className="text-sm text-gray-900 mt-1">{employment.designation}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Duration</label>
                                <p className="text-sm text-gray-900 mt-1">
                                  {new Date(employment.fromDate).toLocaleDateString()} - {new Date(employment.toDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Industry</label>
                                <p className="text-sm text-gray-900 mt-1">{employment.industry}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Functional Area</label>
                                <p className="text-sm text-gray-900 mt-1">{employment.functionalArea}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700">Company Profile</label>
                              <p className="text-sm text-gray-900 mt-1">{employment.companyProfile}</p>
                            </div>
                            
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700">Roles & Responsibilities</label>
                              <p className="text-sm text-gray-900 mt-1">{employment.rolesResponsibilities}</p>
                            </div>
                            
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                              <p className="text-sm text-gray-900 mt-1">{employment.keyAchievements}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Education Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Education Details</h3>
              {isEditing && (
                <button
                  onClick={() => setShowEducationModal(true)}
                  className="px-3 py-1 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              )}
            </div>
            <div className="p-6 space-y-6">
              {/* Education List */}
              {profile.education.length > 0 ? (
                <div className="space-y-4">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-[#114373]" />
                          {edu.degree}
                          {edu.isHighestQualification && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Highest Qualification
                            </span>
                          )}
                        </h4>
                        {isEditing && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditEducation(edu)}
                              className="text-[#114373] hover:text-[#0d3559] text-sm"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleRemoveEducation(edu.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Specialization</label>
                          <p className="text-sm text-gray-900 mt-1">{edu.specialization}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Institute</label>
                          <p className="text-sm text-gray-900 mt-1">{edu.institute}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Year of Passing</label>
                          <p className="text-sm text-gray-900 mt-1">{edu.yearOfPassing}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No education details added yet.</p>
                  {isEditing && (
                    <button 
                      onClick={() => setShowEducationModal(true)}
                      className="mt-4 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
                    >
                      Add Education
                    </button>
                  )}
                </div>
              )}

              {/* Certifications */}
              {profile.certifications.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#114373]" />
                    Certifications
                  </h4>
                  <div className="space-y-3">
                    {profile.certifications.map((cert) => (
                      <div key={cert.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">{cert.name}</h5>
                            <p className="text-sm text-gray-600">{cert.issuingBody}</p>
                            <p className="text-sm text-gray-500">
                              {cert.yearOfCompletion}
                              {cert.validity && ` - Valid until ${cert.validity}`}
                            </p>
                          </div>
                          {isEditing && (
                            <button className="text-red-600 hover:text-red-800 text-sm">
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Skills & Languages</h3>
              {isEditing && (
                <button
                  onClick={() => setShowLanguageModal(true)}
                  className="px-3 py-1 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Language
                </button>
              )}
            </div>
            <div className="p-6 space-y-6">
              {/* IT Skills */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#114373]" />
                  IT Skills
                </h4>
                {profile.itSkills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.itSkills.map((skill) => (
                      <div key={skill.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{skill.name}</h5>
                          {isEditing && (
                            <button className="text-red-600 hover:text-red-800 text-sm">
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Proficiency: {skill.proficiency}</span>
                          <span>{skill.yearsOfExperience} years</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No IT skills added yet.</p>
                  </div>
                )}
              </div>

              {/* Languages */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#114373]" />
                  Languages
                </h4>
                {profile.languages.length > 0 ? (
                  <div className="space-y-3">
                    {profile.languages.map((language) => (
                      <div key={language.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">{language.name}</h5>
                            <p className="text-sm text-gray-600">{language.proficiency}</p>
                          </div>
                          {isEditing && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEditLanguage(language)}
                                className="text-[#114373] hover:text-[#0d3559] text-sm"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleRemoveLanguage(language.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No languages added yet.</p>
                    {isEditing && (
                      <button
                        onClick={() => setShowLanguageModal(true)}
                        className="mt-4 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
                      >
                        Add Your First Language
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Salary & Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Salary & Preferences</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current CTC (USD)</label>
                  <input
                    type="number"
                    value={profile.currentCTC}
                    onChange={(e) => handleInputChange('currentCTC', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected CTC (USD)</label>
                  <input
                    type="number"
                    value={profile.expectedCTC}
                    onChange={(e) => handleInputChange('expectedCTC', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
                  <select
                    value={profile.noticePeriod}
                    onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                  >
                    <option value="">Select Notice Period</option>
                    <option value="Immediate">Immediate</option>
                    <option value="15 days">15 days</option>
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                    <option value="90 days">90 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Profile Content</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume Headline</label>
                <input
                  type="text"
                  value={profile.resumeHeadline}
                  onChange={(e) => handleInputChange('resumeHeadline', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                  placeholder="e.g., Senior Software Engineer with 5+ years experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Summary</label>
                <textarea
                  value={profile.profileSummary}
                  onChange={(e) => handleInputChange('profileSummary', e.target.value)}
                  rows={4}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373] disabled:bg-gray-50"
                  placeholder="Describe your background, achievements, and career aspirations..."
                />
              </div>
            </div>
          </div>

          {/* References Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">References / Referees</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Provide up to 3 professional references who can vouch for your skills and experience. 
                    Once your references are verified, your profile will receive a 5-Star rating on our portal.
                  </p>
                </div>
                {isEditing && (
                  <button
                    onClick={() => setShowReferenceModal(true)}
                    className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Reference
                  </button>
                )}
              </div>
            </div>
            <div className="p-6">
              {profile.references.length === 0 ? (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No references added yet</p>
                  {isEditing && (
                    <button
                      onClick={() => setShowReferenceModal(true)}
                      className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
                    >
                      Add Your First Reference
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.references.map((reference, index) => (
                    <div key={reference.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{reference.fullName}</h4>
                          <p className="text-sm text-gray-600">{reference.designation} at {reference.organization}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Verification Status Badge */}
                          {reference.verificationStatus === 'verified' && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              Verified ✅
                            </span>
                          )}
                          {reference.verificationStatus === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              <Clock className="w-3 h-3" />
                              Awaiting response
                            </span>
                          )}
                          {reference.verificationStatus === 'rejected' && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              <X className="w-3 h-3" />
                              Could not verify
                            </span>
                          )}
                          {reference.verificationStatus === 'unreachable' && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              <AlertCircle className="w-3 h-3" />
                              Unreachable
                            </span>
                          )}
                          
                          {isEditing && (
                            <button
                              onClick={() => handleEditReference(reference)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-2 text-gray-900">{reference.email}</span>
                        </div>
                        {reference.phone && (
                          <div>
                            <span className="text-gray-600">Phone:</span>
                            <span className="ml-2 text-gray-900">{reference.phone}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-600">Relationship:</span>
                          <span className="ml-2 text-gray-900 capitalize">{reference.relationship}</span>
                        </div>
                        {reference.linkedinProfile && (
                          <div>
                            <span className="text-gray-600">LinkedIn:</span>
                            <a
                              href={reference.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-[#114373] hover:underline flex items-center gap-1"
                            >
                              View Profile
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {reference.verificationComments && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Verification Comments:</span> {reference.verificationComments}
                          </p>
                        </div>
                      )}
                      
                      {!reference.isAuthorized && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <AlertCircle className="w-4 h-4 inline mr-1" />
                            Authorization pending for verification contact
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* 5-Star Rating Info */}
              {profile.references.filter(r => r.verificationStatus === 'verified').length >= 3 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-800">5-Star Profile Rating Achieved!</h4>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    All your references have been verified. Your profile now has the highest rating on our portal.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
            </div>
            <div className="p-6 text-center">
              <div className="relative inline-block">
                <img
                  src={profile.photoUrl || '/logo.png'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                {isEditing && (
                  <button
                    onClick={() => setShowPhotoUpload(true)}
                    className="absolute bottom-0 right-0 bg-[#114373] text-white p-2 rounded-full hover:bg-[#0d3559]"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">{profile.fullName}</h3>
              <p className="text-gray-600">{profile.currentLocation.city}, {profile.currentLocation.state}</p>
              
              {/* Privacy Status */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {profile.isProfilePublic ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Profile Public</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-600">
                    <EyeOff className="w-4 h-4" />
                    <span className="text-sm">Profile Private</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Info</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-medium">{profile.age} years old</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Marital Status</p>
                  <p className="font-medium capitalize">{profile.maritalStatus}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Flag className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Nationality</p>
                  <p className="font-medium">{profile.nationality}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Public Profile</p>
                  <p className="text-xs text-gray-600">Allow employers to view your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isProfilePublic}
                    onChange={(e) => handleInputChange('isProfilePublic', e.target.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#114373]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Allow Contact from Employers</p>
                  <p className="text-xs text-gray-600">Let employers contact you directly</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.allowContactFromEmployers}
                    onChange={(e) => handleInputChange('allowContactFromEmployers', e.target.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#114373]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employment Modal */}
      {(showAddEmployment || editingEmploymentId) && (
        <EmploymentModal
          isOpen={showAddEmployment || !!editingEmploymentId}
          onClose={() => {
            setShowAddEmployment(false);
            setEditingEmploymentId(null);
          }}
          employment={editingEmploymentId ? 
            (profile.currentEmployment?.id === editingEmploymentId ? profile.currentEmployment : 
             profile.previousEmployments.find(emp => emp.id === editingEmploymentId)) : undefined
          }
          onSave={(employmentData) => {
            if (editingEmploymentId) {
              updateEmployment(editingEmploymentId, employmentData);
            } else {
              addEmployment(employmentData);
            }
            setShowAddEmployment(false);
            setEditingEmploymentId(null);
          }}
        />
      )}

      {/* Profile Completion Modal */}
      {showProfileCompletion && (
        <ProfileCompletion
          profile={profile}
          onUpdate={(updates) => {
            setProfile(updates);
          }}
          onComplete={() => {
            setIsProfileComplete(true);
            setShowProfileCompletion(false);
          }}
          onClose={() => setShowProfileCompletion(false)}
        />
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <LanguageModal
          isOpen={showLanguageModal}
          onClose={() => {
            setShowLanguageModal(false);
            setEditingLanguage(null);
          }}
          language={editingLanguage}
          onSave={(languageData) => {
            if (editingLanguage) {
              handleUpdateLanguage(editingLanguage.id, languageData);
            } else {
              handleAddLanguage(languageData);
            }
          }}
        />
      )}

      {/* Education Modal */}
      {showEducationModal && (
        <EducationModal
          isOpen={showEducationModal}
          onClose={() => {
            setShowEducationModal(false);
            setEditingEducation(null);
          }}
          education={editingEducation}
          onSave={(educationData) => {
            if (editingEducation) {
              handleUpdateEducation(editingEducation.id, educationData);
            } else {
              handleAddEducation(educationData);
            }
          }}
        />
      )}
    </div>
  );
};

// Employment Modal Component
interface EmploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  employment?: Employment;
  onSave: (employment: Omit<Employment, 'id'>) => void;
}

const EmploymentModal: FC<EmploymentModalProps> = ({ isOpen, onClose, employment, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: employment?.companyName || '',
    designation: employment?.designation || '',
    fromDate: employment?.fromDate || '',
    toDate: employment?.toDate || '',
    isCurrent: employment?.isCurrent || false,
    companyProfile: employment?.companyProfile || '',
    rolesResponsibilities: employment?.rolesResponsibilities || '',
    keyAchievements: employment?.keyAchievements || '',
    industry: employment?.industry || '',
    functionalArea: employment?.functionalArea || ''
  });

  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showFunctionalAreaDropdown, setShowFunctionalAreaDropdown] = useState(false);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);

  // Use our comprehensive job categories as industries
  const industries = getJobCategories();

  // Use job titles as functional areas
  const functionalAreas = getAllJobTitles();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {employment ? 'Edit Employment' : 'Add Employment'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  placeholder="Search or select job title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                  required
                  onFocus={() => setShowJobTitleDropdown(true)}
                  onBlur={() => setTimeout(() => setShowJobTitleDropdown(false), 200)}
                />
                {showJobTitleDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {getAllJobTitles()
                      .filter(jobTitle => 
                        jobTitle.toLowerCase().includes(formData.designation.toLowerCase()) || 
                        formData.designation === ''
                      )
                      .slice(0, 20)
                      .map(jobTitle => (
                        <div
                          key={jobTitle}
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleInputChange('designation', jobTitle);
                            setShowJobTitleDropdown(false);
                          }}
                        >
                          {jobTitle}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
              <input
                type="date"
                value={formData.fromDate}
                onChange={(e) => handleInputChange('fromDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                value={formData.toDate}
                onChange={(e) => handleInputChange('toDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                disabled={formData.isCurrent}
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => handleInputChange('isCurrent', e.target.checked)}
                  className="text-[#114373] focus:ring-[#114373]"
                />
                <span className="text-sm font-medium text-gray-700">Current Employment</span>
              </label>
            </div>
          </div>

          {/* Industry and Functional Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="Search or select industry..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                  onFocus={() => setShowIndustryDropdown(true)}
                  onBlur={() => setTimeout(() => setShowIndustryDropdown(false), 200)}
                />
                {showIndustryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {industries
                      .filter(industry => 
                        industry.toLowerCase().includes(formData.industry.toLowerCase()) || 
                        formData.industry === ''
                      )
                      .map(industry => (
                        <div
                          key={industry}
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleInputChange('industry', industry);
                            setShowIndustryDropdown(false);
                          }}
                        >
                          {industry}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Functional Area</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.functionalArea}
                  onChange={(e) => handleInputChange('functionalArea', e.target.value)}
                  placeholder="Search or select functional area..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                  onFocus={() => setShowFunctionalAreaDropdown(true)}
                  onBlur={() => setTimeout(() => setShowFunctionalAreaDropdown(false), 200)}
                />
                {showFunctionalAreaDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {functionalAreas
                      .filter(area => 
                        area.toLowerCase().includes(formData.functionalArea.toLowerCase()) || 
                        formData.functionalArea === ''
                      )
                      .slice(0, 20)
                      .map(area => (
                        <div
                          key={area}
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleInputChange('functionalArea', area);
                            setShowFunctionalAreaDropdown(false);
                          }}
                        >
                          {area}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Company Profile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Profile / Brief</label>
            <textarea
              value={formData.companyProfile}
              onChange={(e) => handleInputChange('companyProfile', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="Overview of the employer or sector/industry of the company"
            />
          </div>

          {/* Roles & Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Roles & Responsibilities</label>
            <textarea
              value={formData.rolesResponsibilities}
              onChange={(e) => handleInputChange('rolesResponsibilities', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="Describe your roles and responsibilities in this position"
            />
          </div>

          {/* Key Achievements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
            <textarea
              value={formData.keyAchievements}
              onChange={(e) => handleInputChange('keyAchievements', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="List your key achievements and accomplishments"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
            >
              {employment ? 'Update Employment' : 'Add Employment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reference Modal Component
interface ReferenceModalProps {
  reference?: Reference | null;
  onSave: (reference: Omit<Reference, 'id'>) => void;
  onClose: () => void;
}

const ReferenceModal: FC<ReferenceModalProps> = ({ reference, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: reference?.fullName || '',
    designation: reference?.designation || '',
    organization: reference?.organization || '',
    email: reference?.email || '',
    phone: reference?.phone || '',
    linkedinProfile: reference?.linkedinProfile || '',
    relationship: reference?.relationship || 'manager' as const,
    isAuthorized: reference?.isAuthorized ?? true
  });

  const relationshipOptions = [
    { value: 'manager', label: 'Manager' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'client', label: 'Client' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {reference ? 'Edit Reference' : 'Add Reference'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                placeholder="e.g., John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Designation / Job Title *</label>
              <select
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                required
              >
                <option value="">Select Job Title</option>
                {getAllJobTitles().map(jobTitle => (
                  <option key={jobTitle} value={jobTitle}>{jobTitle}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization / Company *</label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="e.g., ABC Ltd."
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                placeholder="+1-555-123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
            <input
              type="url"
              value={formData.linkedinProfile}
              onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="https://www.linkedin.com/in/johndoe/"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
            <select
              value={formData.relationship}
              onChange={(e) => handleInputChange('relationship', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              required
            >
              <option value="">Select Relationship</option>
              {relationshipOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Authorization */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.isAuthorized}
                onChange={(e) => handleInputChange('isAuthorized', e.target.checked)}
                className="mt-1 text-[#114373] focus:ring-[#114373]"
              />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Authorization for Verification Contact
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  By providing this contact, you authorize us to reach out for verification of your professional background and skills.
                </p>
              </div>
            </div>
          </div>

          {/* 5-Star Rating Info */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-800">5-Star Profile Rating</h4>
            </div>
            <p className="text-sm text-yellow-700">
              Once your references are verified, your profile will receive a 5-Star rating on our portal, 
              making you more attractive to potential employers.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
            >
              {reference ? 'Update Reference' : 'Add Reference'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Language Modal Component
const LanguageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  language?: Language | null;
  onSave: (languageData: Omit<Language, 'id'>) => void;
}> = ({ isOpen, onClose, language, onSave }) => {
  const [formData, setFormData] = useState({
    name: language?.name || '',
    proficiency: language?.proficiency || 'Elementary Proficiency' as LanguageProficiency
  });

  const [languageSearchQuery, setLanguageSearchQuery] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.proficiency) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {language ? 'Edit Language' : 'Add Language'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
            <div className="relative">
              <input
                type="text"
                value={languageSearchQuery}
                onChange={(e) => setLanguageSearchQuery(e.target.value)}
                placeholder="Search for a language..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              />
              
              {/* Language Search Results */}
              {languageSearchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {searchLanguages(languageSearchQuery).map((lang, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, name: lang }));
                        setLanguageSearchQuery('');
                      }}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Selected Language Display */}
            {formData.name && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">Selected: <span className="font-medium">{formData.name}</span></p>
              </div>
            )}
          </div>

          {/* Proficiency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency Level *</label>
            <select
              value={formData.proficiency}
              onChange={(e) => handleInputChange('proficiency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              required
            >
              <option value="">Select Proficiency Level</option>
              {getLanguageProficiencyLevels().map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Proficiency Level Descriptions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Proficiency Level Guide:</h4>
            <div className="space-y-2 text-xs text-blue-800">
              <div>
                <strong>Native / Bilingual:</strong> Can speak, read, and write like a native speaker
              </div>
              <div>
                <strong>Full Professional:</strong> Can conduct business and professional discussions fluently
              </div>
              <div>
                <strong>Professional Working:</strong> Can handle work-related conversations and tasks
              </div>
              <div>
                <strong>Limited Working:</strong> Can handle basic work situations and simple conversations
              </div>
              <div>
                <strong>Elementary:</strong> Can understand and speak basic phrases and simple conversations
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name || !formData.proficiency}
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {language ? 'Update Language' : 'Add Language'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Education Modal Component
const EducationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  education?: Education | null;
  onSave: (educationData: Omit<Education, 'id'>) => void;
}> = ({ isOpen, onClose, education, onSave }) => {
  const [formData, setFormData] = useState({
    degree: education?.degree || '',
    specialization: education?.specialization || '',
    institute: education?.institute || '',
    yearOfPassing: education?.yearOfPassing || '',
    isHighestQualification: education?.isHighestQualification || false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.degree && formData.institute && formData.yearOfPassing) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {education ? 'Edit Education' : 'Add Education'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Degree */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => handleInputChange('degree', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="e.g., Bachelor of Technology, Master of Science"
              required
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="e.g., Computer Science, Business Administration"
            />
          </div>

          {/* Institute */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Institute *</label>
            <input
              type="text"
              value={formData.institute}
              onChange={(e) => handleInputChange('institute', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="e.g., Stanford University"
              required
            />
          </div>

          {/* Year of Passing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year of Passing *</label>
            <input
              type="number"
              value={formData.yearOfPassing}
              onChange={(e) => handleInputChange('yearOfPassing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              placeholder="e.g., 2019"
              min="1950"
              max={new Date().getFullYear() + 5}
              required
            />
          </div>

          {/* Highest Qualification */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isHighestQualification}
              onChange={(e) => handleInputChange('isHighestQualification', e.target.checked)}
              className="text-[#114373] focus:ring-[#114373]"
            />
            <label className="text-sm font-medium text-gray-700">
              This is my highest qualification
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.degree || !formData.institute || !formData.yearOfPassing}
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {education ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateProfile;
