import { GovernmentScheme } from '../types';

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'sch-1',
    name: 'Agriculture Infrastructure Fund (AIF)',
    shortCode: 'AIF',
    ministry: 'Ministry of Agriculture and Farmers Welfare, Govt. of India',
    category: 'Post-Harvest Infrastructure',
    eligibility: [
      'Individual Farmers and Farmer Producer Organizations (FPOs)',
      'Primary Agricultural Credit Societies (PACS)',
      'Agri-entrepreneurs, Startups and Self Help Groups (SHGs)'
    ],
    benefits: '3% per annum interest subvention on loans up to ₹2 Crores for setting up cold storage, dry warehouses, grading & sorting lines, and packhouses. Credit guarantee coverage under CGTMSE.',
    subsidyPercentage: '3% Interest Subvention + CGTMSE Fee waiver',
    documentsRequired: [
      'Aadhaar Card & PAN Card of Applicant / FPO Registration',
      'Detailed Project Report (DPR) for post-harvest facility',
      'Bank Loan In-principle sanction letter',
      'Land revenue records / lease agreement (minimum 10 years)'
    ],
    applicationProcess: 'Register on the central AIF portal, upload DPR, choose lending bank, receive digital in-principle approval within 60 days.',
    officialPortalUrl: 'https://agriinfra.dac.gov.in/',
    lastVerifiedDate: '15 Sep 2026',
    applicableStates: ['All States and UTs']
  },
  {
    id: 'sch-2',
    name: 'Pradhan Mantri Kisan SAMPADA Yojana (PMKSY)',
    shortCode: 'PMKSY',
    ministry: 'Ministry of Food Processing Industries, Govt. of India',
    category: 'Processing & Value Addition',
    eligibility: [
      'FPOs, Cooperatives, Agro-processors and Private Companies',
      'Must handle farm produce processing (puree, dehydration, flour, chips, pulp)'
    ],
    benefits: 'Capital grant of 35% to 50% of eligible project cost up to ₹5 Crores for creating food processing clusters, cold chain networks, and agro-processing clusters.',
    subsidyPercentage: '35% to 50% Capital Grant (Max ₹5 Cr)',
    documentsRequired: [
      'FPO / Business registration and GST Certificate',
      'Bank appraisal report and audited balance sheets (last 3 years)',
      'Technical civil estimate and plant machinery quotations'
    ],
    applicationProcess: 'Apply online on SAMPADA portal during open Expression of Interest (EoI) calls with chartered engineer valuation.',
    officialPortalUrl: 'https://www.mofpi.gov.in/schemes/pradhan-mantri-kisan-sampada-yojana',
    lastVerifiedDate: '12 Sep 2026',
    applicableStates: ['All States and UTs']
  },
  {
    id: 'sch-3',
    name: 'Operation Greens (TOP to TOTAL Scheme)',
    shortCode: 'OG-TOP',
    ministry: 'Ministry of Food Processing Industries, Govt. of India',
    category: 'Post-Harvest Infrastructure',
    eligibility: [
      'Farmers and FPOs cultivating Tomato, Onion, Potato (TOP) and 22 notified perishable crops'
    ],
    benefits: '50% subsidy on transportation freight of eligible crops from surplus production clusters to major consumption centers, plus 50% subsidy on cold storage hiring charges during glut periods.',
    subsidyPercentage: '50% Freight & 50% Storage Subsidy',
    documentsRequired: [
      'Transporter Bilty / Railway Rake receipt',
      'Cold Storage rent receipt and weighbridge slip',
      'FPO bank account details and geo-tagged farm photos'
    ],
    applicationProcess: 'Direct claims submission via SAMPADA Operation Greens window with bills verification within 45 days.',
    officialPortalUrl: 'https://www.mofpi.gov.in/schemes/operation-greens',
    lastVerifiedDate: '10 Sep 2026',
    applicableStates: ['All States and UTs']
  },
  {
    id: 'sch-4',
    name: 'Mission for Integrated Development of Horticulture (MIDH)',
    shortCode: 'MIDH',
    ministry: 'Department of Agriculture & Cooperation, Govt. of India',
    category: 'Post-Harvest Infrastructure',
    eligibility: [
      'Horticulture produce farmers (Vegetables, Fruits, Spices, Flowers)',
      'Registered FPOs and SHGs'
    ],
    benefits: 'Financial assistance of 35% to 50% for establishment of pre-cooling units, on-farm collection centers, ripening chambers, and refrigerated transport vans.',
    subsidyPercentage: '35% to 50% Project Cost Assistance',
    documentsRequired: [
      '7/12 Land extract / Khasra-Khatauni showing horticulture cultivation',
      'Quotation for pre-cooling / ripening chamber equipment',
      'Bank account seeded with Aadhaar'
    ],
    applicationProcess: 'Submit proposal through District Horticulture Officer (DHO) / State Horticulture Mission portal.',
    officialPortalUrl: 'https://midh.gov.in/',
    lastVerifiedDate: '14 Sep 2026',
    applicableStates: ['All States and UTs']
  },
  {
    id: 'sch-5',
    name: 'e-NAM Warehouse Based Trading (e-NWR)',
    shortCode: 'WDRA-eNAM',
    ministry: 'Warehousing Development and Regulatory Authority (WDRA)',
    category: 'Price Support & Insurance',
    eligibility: [
      'All farmers depositing non-perishable produce in WDRA registered warehouses'
    ],
    benefits: 'Enables farmers to receive electronic Negotiable Warehouse Receipts (e-NWR) and pledge financing up to 75% of produce value without distress sale, plus direct online trading on e-NAM.',
    subsidyPercentage: 'Up to 75% Pledge Loan at Concessional 7% Rate',
    documentsRequired: [
      'e-NWR receipt issued by WDRA accredited warehouse',
      'e-NAM Farmer Registration Card',
      'Aadhaar seeded bank account'
    ],
    applicationProcess: 'Deposit commodity in nearest accredited warehouse, ask warehouseman to generate e-NWR on repository, trade directly on e-NAM app.',
    officialPortalUrl: 'https://www.wdra.gov.in/',
    lastVerifiedDate: '16 Sep 2026',
    applicableStates: ['All States and UTs']
  }
];
