import { FC, useState } from 'react';
import { User, FileText, Save, Plus, X, Briefcase, GraduationCap, Star, Award, Users, Shield } from 'lucide-react';

interface CVData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  references: Array<{
    id: string;
    name: string;
    position: string;
    company: string;
    email: string;
    phone: string;
  }>;
}

const CVBuilder: FC = () => {
  const [cvData, setCvData] = useState<CVData>({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: 'Tanzania'
    },
    experiences: [],
    education: [],
    skills: [],
    references: []
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate' });

  const updatePersonal = (field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        level: newSkill.level
      };
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill({ name: '', level: 'intermediate' });
    }
  };

  const removeSkill = (id: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addReference = () => {
    const newRef = {
      id: Date.now().toString(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: ''
    };
    setCvData(prev => ({
      ...prev,
      references: [...prev.references, newRef]
    }));
  };

  const updateReference = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      references: prev.references.map(ref => 
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const removeReference = (id: string) => {
    setCvData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  const saveCV = () => {
    const cvToSave = {
      ...cvData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      clientSafeVersion: {
        ...cvData,
        personal: {
          firstName: '[REDACTED]',
          lastName: '[REDACTED]',
          email: '[REDACTED]',
          phone: '[REDACTED]',
          address: '[REDACTED]',
          city: '[REDACTED]',
          country: cvData.personal.country
        },
        references: []
      }
    };
    
    const savedCVs = JSON.parse(localStorage.getItem('savedCVs') || '[]');
    savedCVs.push(cvToSave);
    localStorage.setItem('savedCVs', JSON.stringify(savedCVs));
    
    alert('CV saved successfully! Personal information will be protected when shared with clients.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CV Builder</h1>
          <p className="text-gray-600">
            Create a professional CV with built-in privacy protection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CV Builder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'personal', label: 'Personal Info', icon: User },
                    { id: 'experience', label: 'Experience', icon: Briefcase },
                    { id: 'education', label: 'Education', icon: GraduationCap },
                    { id: 'skills', label: 'Skills', icon: Star },
                    { id: 'references', label: 'References', icon: Users }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                        activeSection === id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Personal Information */}
                {activeSection === 'personal' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          value={cvData.personal.firstName}
                          onChange={(e) => updatePersonal('firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          value={cvData.personal.lastName}
                          onChange={(e) => updatePersonal('lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={cvData.personal.email}
                          onChange={(e) => updatePersonal('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                        <input
                          type="tel"
                          value={cvData.personal.phone}
                          onChange={(e) => updatePersonal('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          value={cvData.personal.city}
                          onChange={(e) => updatePersonal('city', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <input
                          type="text"
                          value={cvData.personal.country}
                          onChange={(e) => updatePersonal('country', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience */}
                {activeSection === 'experience' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                      <button
                        onClick={addExperience}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 inline mr-2" />
                        Add Experience
                      </button>
                    </div>

                    {cvData.experiences.map((exp, index) => (
                      <div key={exp.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Experience #{index + 1}</h3>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                              type="date"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="date"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {activeSection === 'skills' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                        <input
                          type="text"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., JavaScript"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                        <select
                          value={newSkill.level}
                          onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={addSkill}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4 inline mr-2" />
                          Add Skill
                        </button>
                      </div>
                    </div>

                    {cvData.skills.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium text-gray-900">Your Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              <span>{skill.name} ({skill.level})</span>
                              <button
                                onClick={() => removeSkill(skill.id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* References */}
                {activeSection === 'references' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">References</h2>
                      <button
                        onClick={addReference}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 inline mr-2" />
                        Add Reference
                      </button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">Privacy Notice</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Reference information will be automatically removed when your CV is shared with clients to protect privacy.
                          </p>
                        </div>
                      </div>
                    </div>

                    {cvData.references.map((ref, index) => (
                      <div key={ref.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Reference #{index + 1}</h3>
                          <button
                            onClick={() => removeReference(ref.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                            <input
                              type="text"
                              value={ref.name}
                              onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                            <input
                              type="text"
                              value={ref.position}
                              onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                            <input
                              type="text"
                              value={ref.company}
                              onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                            <input
                              type="email"
                              value={ref.email}
                              onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                            <input
                              type="tel"
                              value={ref.phone}
                              onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">CV Preview</h2>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    Privacy Protected
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
                  <div className="space-y-1 text-gray-600">
                    <p><strong>Name:</strong> {cvData.personal.firstName && cvData.personal.lastName ? `${cvData.personal.firstName} ${cvData.personal.lastName}` : 'Not provided'}</p>
                    <p><strong>Email:</strong> {cvData.personal.email || 'Not provided'}</p>
                    <p><strong>Phone:</strong> {cvData.personal.phone || 'Not provided'}</p>
                    <p><strong>Location:</strong> {cvData.personal.city && cvData.personal.country ? `${cvData.personal.city}, ${cvData.personal.country}` : 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Experience</h3>
                  <div className="space-y-2">
                    {cvData.experiences.length > 0 ? (
                      cvData.experiences.slice(0, 2).map((exp, index) => (
                        <div key={exp.id} className="text-gray-600">
                          <p className="font-medium">{exp.position}</p>
                          <p className="text-xs">{exp.company}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No experience added</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.length > 0 ? (
                      cvData.skills.slice(0, 6).map((skill) => (
                        <span key={skill.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills added</p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-medium text-blue-800">Client View</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        When shared with clients, personal information and references will be automatically removed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={saveCV}
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder; 