// Global location data structure
export interface LocationData {
  country: string;
  regions: {
    name: string;
    cities: string[];
  }[];
}

// All countries list
export const allCountries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe'
];

// Comprehensive global location data
export const globalLocations: LocationData[] = [
  {
    country: "Tanzania",
    regions: [
      {
        name: "Dar es Salaam",
        cities: ["Dar es Salaam", "Mbezi Beach", "Masaki", "Oyster Bay", "Mikocheni", "Upanga", "Kinondoni", "Ilala", "Temeke", "Kigamboni"]
      },
      {
        name: "Arusha",
        cities: ["Arusha", "Moshi", "Karatu", "Mto wa Mbu", "Usa River", "Ngorongoro", "Longido", "Monduli"]
      },
      {
        name: "Dodoma",
        cities: ["Dodoma", "Kondoa", "Kongwa", "Mpwapwa", "Chamwino", "Chemba", "Bahi"]
      },
      {
        name: "Mwanza",
        cities: ["Mwanza", "Musoma", "Geita", "Sengerema", "Ukerewe", "Magu", "Kwimba", "Misungwi"]
      },
      {
        name: "Mbeya",
        cities: ["Mbeya", "Iringa", "Songea", "Njombe", "Makete", "Ludewa", "Mufindi", "Kilolo"]
      },
      {
        name: "Tanga",
        cities: ["Tanga", "Pangani", "Handeni", "Korogwe", "Lushoto", "Muheza", "Mkinga", "Kilindi"]
      },
      {
        name: "Morogoro",
        cities: ["Morogoro", "Kilosa", "Gairo", "Kilombero", "Mvomero", "Ulanga", "Malinyi"]
      },
      {
        name: "Tabora",
        cities: ["Tabora", "Urambo", "Sikonge", "Nzega", "Igunga", "Kaliua", "Uyui"]
      },
      {
        name: "Kigoma",
        cities: ["Kigoma", "Kasulu", "Kibondo", "Buhigwe", "Kakonko", "Uvinza"]
      },
      {
        name: "Mara",
        cities: ["Musoma", "Tarime", "Serengeti", "Bunda", "Rorya", "Butiama"]
      },
      {
        name: "Kagera",
        cities: ["Bukoba", "Muleba", "Karagwe", "Biharamulo", "Ngara", "Missenyi", "Kyerwa"]
      },
      {
        name: "Shinyanga",
        cities: ["Shinyanga", "Kahama", "Kishapu", "Maswa", "Meatu", "Bariadi"]
      },
      {
        name: "Singida",
        cities: ["Singida", "Manyoni", "Iramba", "Ikungi", "Mkalama", "Itigi"]
      },
      {
        name: "Rukwa",
        cities: ["Sumbawanga", "Nkasi", "Kalambo", "Mpanda"]
      },
      {
        name: "Ruvuma",
        cities: ["Songea", "Tunduru", "Namtumbo", "Nyasa", "Mbinga", "Peramiho"]
      },
      {
        name: "Iringa",
        cities: ["Iringa", "Mufindi", "Kilolo", "Makete", "Ludewa", "Njombe"]
      },
      {
        name: "Lindi",
        cities: ["Lindi", "Kilwa", "Nachingwea", "Ruangwa", "Liwale", "Nangurukuru"]
      },
      {
        name: "Pwani",
        cities: ["Kibaha", "Bagamoyo", "Kisarawe", "Mkuranga", "Rufiji", "Mafia"]
      },
      {
        name: "Zanzibar",
        cities: ["Stone Town", "Zanzibar City", "Nungwi", "Kendwa", "Paje", "Jambiani", "Bwejuu", "Matemwe"]
      }
    ]
  },
  {
    country: "Kenya",
    regions: [
      {
        name: "Nairobi",
        cities: ["Nairobi", "Westlands", "Kilimani", "Lavington", "Karen", "Muthaiga", "Upperhill", "CBD"]
      },
      {
        name: "Mombasa",
        cities: ["Mombasa", "Nyali", "Bamburi", "Shanzu", "Diani", "Ukunda", "Likoni"]
      },
      {
        name: "Kisumu",
        cities: ["Kisumu", "Kisii", "Homa Bay", "Migori", "Siaya", "Vihiga", "Busia"]
      }
    ]
  },
  {
    country: "Uganda",
    regions: [
      {
        name: "Kampala",
        cities: ["Kampala", "Entebbe", "Jinja", "Mbale", "Gulu", "Arua", "Mbarara"]
      }
    ]
  },
  {
    country: "Rwanda",
    regions: [
      {
        name: "Kigali",
        cities: ["Kigali", "Butare", "Gitarama", "Ruhengeri", "Gisenyi", "Kibuye", "Cyangugu"]
      }
    ]
  },
  {
    country: "United States",
    regions: [
      {
        name: "California",
        cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Oakland", "Long Beach", "Bakersfield", "Anaheim"]
      },
      {
        name: "New York",
        cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica"]
      },
      {
        name: "Texas",
        cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock"]
      },
      {
        name: "Florida",
        cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "St. Petersburg", "Hialeah", "Tallahassee", "Cape Coral", "Gainesville"]
      }
    ]
  },
  {
    country: "United Kingdom",
    regions: [
      {
        name: "England",
        cities: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Sheffield", "Bristol", "Newcastle", "Leicester", "Coventry"]
      },
      {
        name: "Scotland",
        cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness", "Perth", "Stirling", "Dunfermline"]
      },
      {
        name: "Wales",
        cities: ["Cardiff", "Swansea", "Newport", "Wrexham", "Barry", "Neath", "Cwmbran", "Bridgend"]
      }
    ]
  },
  {
    country: "Canada",
    regions: [
      {
        name: "Ontario",
        cities: ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Windsor", "Kitchener", "Vaughan", "Markham"]
      },
      {
        name: "Quebec",
        cities: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Levis", "Trois-Rivieres", "Terrebonne"]
      },
      {
        name: "British Columbia",
        cities: ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Nanaimo", "Kamloops", "Prince George"]
      }
    ]
  },
  {
    country: "Australia",
    regions: [
      {
        name: "New South Wales",
        cities: ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Wagga Wagga", "Coffs Harbour", "Port Macquarie", "Tamworth", "Orange", "Dubbo"]
      },
      {
        name: "Victoria",
        cities: ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton", "Mildura", "Warrnambool", "Melton", "Sunbury", "Albury"]
      },
      {
        name: "Queensland",
        cities: ["Brisbane", "Gold Coast", "Townsville", "Cairns", "Toowoomba", "Mackay", "Rockhampton", "Bundaberg", "Hervey Bay", "Gladstone"]
      }
    ]
  },
  {
    country: "India",
    regions: [
      {
        name: "Maharashtra",
        cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Nanded"]
      },
      {
        name: "Karnataka",
        cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga"]
      },
      {
        name: "Tamil Nadu",
        cities: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Vellore", "Erode", "Tiruppur", "Dindigul", "Thoothukkudi"]
      }
    ]
  },
  {
    country: "South Africa",
    regions: [
      {
        name: "Gauteng",
        cities: ["Johannesburg", "Pretoria", "Vereeniging", "Krugersdorp", "Randburg", "Soweto", "Roodepoort", "Benoni", "Boksburg", "Kempton Park"]
      },
      {
        name: "Western Cape",
        cities: ["Cape Town", "Bellville", "Stellenbosch", "Paarl", "Worcester", "George", "Oudtshoorn", "Mossel Bay", "Knysna", "Plettenberg Bay"]
      },
      {
        name: "KwaZulu-Natal",
        cities: ["Durban", "Pietermaritzburg", "Pinetown", "Newcastle", "Ladysmith", "Richards Bay", "Port Shepstone", "Ballito", "Umhlanga", "Westville"]
      }
    ]
  },
  {
    country: "Nigeria",
    regions: [
      {
        name: "Lagos",
        cities: ["Lagos", "Ikeja", "Victoria Island", "Lekki", "Surulere", "Alimosho", "Oshodi", "Ikorodu", "Agege", "Ifako-Ijaiye"]
      },
      {
        name: "Kano",
        cities: ["Kano", "Fagge", "Dala", "Gwale", "Tarauni", "Ungogo", "Nasarawa", "Umaru", "Municipal", "Tudun Wada"]
      },
      {
        name: "Rivers",
        cities: ["Port Harcourt", "Okrika", "Eleme", "Ikwerre", "Emohua", "Obio-Akpor", "Okrika", "Ogu-Bolo", "Tai", "Oyigbo"]
      }
    ]
  },
  {
    country: "Ghana",
    regions: [
      {
        name: "Greater Accra",
        cities: ["Accra", "Tema", "Ashaiman", "Madina", "Adenta", "Dodowa", "Prampram", "Nungua", "Teshie", "Labadi"]
      },
      {
        name: "Ashanti",
        cities: ["Kumasi", "Obuasi", "Ejisu", "Konongo", "Mampong", "Bekwai", "Offinso", "Juaben", "Effiduase", "Asokore"]
      }
    ]
  },
  {
    country: "Ethiopia",
    regions: [
      {
        name: "Addis Ababa",
        cities: ["Addis Ababa", "Bole", "Kirkos", "Yeka", "Arada", "Addis Ketema", "Kolfe Keranio", "Lideta", "Nifas Silk-Lafto", "Bole"]
      },
      {
        name: "Oromia",
        cities: ["Adama", "Jimma", "Nekemte", "Bishoftu", "Ambo", "Shashamane", "Dire Dawa", "Harar", "Jijiga", "Dessie"]
      }
    ]
  }
];

// Helper functions for location data
export const getAllCountries = () => {
  return allCountries.sort();
};

export const getRegionsByCountry = (country: string) => {
  const countryData = globalLocations.find(loc => loc.country === country);
  return countryData ? countryData.regions.map(region => region.name).sort() : [];
};

export const getCitiesByRegion = (country: string, region: string) => {
  const countryData = globalLocations.find(loc => loc.country === country);
  if (!countryData) return [];
  
  const regionData = countryData.regions.find(reg => reg.name === region);
  return regionData ? regionData.cities.sort() : [];
};

export const getAllCities = () => {
  const allCities: string[] = [];
  globalLocations.forEach(country => {
    country.regions.forEach(region => {
      allCities.push(...region.cities);
    });
  });
  return allCities.sort();
};

export const getCitiesByCountry = (country: string) => {
  const countryData = globalLocations.find(loc => loc.country === country);
  if (!countryData) return [];
  
  const cities: string[] = [];
  countryData.regions.forEach(region => {
    cities.push(...region.cities);
  });
  return cities.sort();
};

// Format location strings
export const formatLocation = (country: string, region?: string, city?: string) => {
  if (city && region) {
    return `${city}, ${region}, ${country}`;
  } else if (region) {
    return `${region}, ${country}`;
  } else {
    return country;
  }
};

// Search locations
export const searchLocations = (query: string) => {
  const results: string[] = [];
  const lowerQuery = query.toLowerCase();
  
  globalLocations.forEach(country => {
    if (country.country.toLowerCase().includes(lowerQuery)) {
      results.push(country.country);
    }
    
    country.regions.forEach(region => {
      if (region.name.toLowerCase().includes(lowerQuery)) {
        results.push(`${region.name}, ${country.country}`);
      }
      
      region.cities.forEach(city => {
        if (city.toLowerCase().includes(lowerQuery)) {
          results.push(`${city}, ${region.name}, ${country.country}`);
        }
      });
    });
  });
  
  return results.slice(0, 50); // Limit results
};

export const searchCountries = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return allCountries
    .filter(country => country.toLowerCase().includes(lowerQuery))
    .slice(0, 20); // Limit results
};

export const searchRegionsByCountry = (country: string, query: string) => {
  const lowerQuery = query.toLowerCase();
  const regions = getRegionsByCountry(country);
  return regions
    .filter(region => region.toLowerCase().includes(lowerQuery))
    .slice(0, 20); // Limit results
};

export const searchCitiesByRegion = (country: string, region: string, query: string) => {
  const lowerQuery = query.toLowerCase();
  const cities = getCitiesByRegion(country, region);
  return cities
    .filter(city => city.toLowerCase().includes(lowerQuery))
    .slice(0, 20); // Limit results
};
