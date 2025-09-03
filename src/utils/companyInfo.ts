export interface CompanyInfo {
  name: string;
  address: string;
  poBox: string;
  city: string;
  country: string;
  vat: string;
  tin: string;
  bankDetails: BankDetails;
  contactInfo: ContactInfo;
}

export interface BankDetails {
  accountName: string;
  bankName: string;
  usdAccount: string;
  tzsAccount: string;
  swiftCode: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
}

export const axiaCompanyInfo: CompanyInfo = {
  name: "Axia HR Advisory & Recruitment",
  address: "Mezzanine Floor, Urban Rose Hotel & Apartments, Jamhuri/Asia Street",
  poBox: "P.O.Box 75303",
  city: "Dar es Salaam",
  country: "Tanzania",
  vat: "40-026189-K",
  tin: "116-019-442",
  bankDetails: {
    accountName: "RM Financial Consulting Limited",
    bankName: "Stanbic Bank Tanzania Limited",
    usdAccount: "9120002802463",
    tzsAccount: "9120002802382",
    swiftCode: "SBICTZTX"
  },
  contactInfo: {
    phone: "+255 22 2110471",
    email: "info@axiahr.co.tz",
    website: "www.axiahr.co.tz"
  }
};

export const crmCompanyInfo: CompanyInfo = {
  name: "CRM Financial Consulting Limited",
  address: "Office no: 425, Fourth Floor -Wing B, Harbour View Towers, Samora Avenue Road",
  poBox: "P.O. Box 75303",
  city: "Dar Es Salaam",
  country: "Tanzania",
  vat: "40-026189-K",
  tin: "116-019-442",
  bankDetails: {
    accountName: "RM Financial Consulting Limited",
    bankName: "Stanbic Bank Tanzania Limited",
    usdAccount: "9120002802463",
    tzsAccount: "9120002802382",
    swiftCode: "SBICTZTX"
  },
  contactInfo: {
    phone: "+255 22 2110471",
    email: "finance@rmfcl.co.tz",
    website: "www.mehtaassociates.co.tz"
  }
};

export const getVATAmount = (baseAmount: number): number => {
  return baseAmount * 0.18; // 18% VAT
};

export const getTotalWithVAT = (baseAmount: number): number => {
  return baseAmount + getVATAmount(baseAmount);
};

export const formatCurrency = (amount: number, currency: 'TZS' | 'USD'): string => {
  if (currency === 'TZS') {
    return `TZS ${amount.toLocaleString('en-TZ')}`;
  } else {
    return `USD ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }
};
