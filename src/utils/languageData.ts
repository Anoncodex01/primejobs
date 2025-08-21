// Language proficiency levels
export const languageProficiencyLevels = [
  'Native / Bilingual Proficiency',
  'Full Professional Proficiency', 
  'Professional Working Proficiency',
  'Limited Working Proficiency',
  'Elementary Proficiency'
] as const;

export type LanguageProficiency = typeof languageProficiencyLevels[number];

// Comprehensive list of world languages
export const worldLanguages = [
  'Afrikaans',
  'Albanian',
  'Amharic',
  'Arabic',
  'Armenian',
  'Azerbaijani',
  'Bengali',
  'Bulgarian',
  'Catalan',
  'Chinese (Mandarin)',
  'Chinese (Cantonese)',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Estonian',
  'Filipino',
  'Finnish',
  'French',
  'Georgian',
  'German',
  'Greek',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Icelandic',
  'Indonesian',
  'Irish',
  'Italian',
  'Japanese',
  'Kazakh',
  'Korean',
  'Latvian',
  'Lithuanian',
  'Malay',
  'Malayalam',
  'Maltese',
  'Marathi',
  'Norwegian',
  'Persian',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Serbian',
  'Slovak',
  'Slovenian',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tamil',
  'Telugu',
  'Thai',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Vietnamese',
  'Welsh',
  'Yoruba',
  'Zulu'
];

// Helper functions
export const getLanguageProficiencyLevels = () => {
  return languageProficiencyLevels;
};

export const getAllLanguages = () => {
  return worldLanguages.sort();
};

export const searchLanguages = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return worldLanguages
    .filter(language => language.toLowerCase().includes(lowerQuery))
    .slice(0, 20); // Limit results
};
