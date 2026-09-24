export interface GradeBenchmarkTier {
  title: string;
  grade: 'Grade A' | 'Grade B' | 'Grade C';
  criteria: string;
  toleranceLimit: string;
  imageUrl: string;
  sourceLabel: string;
  typicalPriceMultiplier: number;
  marketDestination: string;
  keyVisualMarkers: string[];
}

export interface CommodityGradeBenchmark {
  crop: string;
  hindiName: string;
  standardAuthority: string;
  standardDocRef: string;
  grades: {
    'Grade A': GradeBenchmarkTier;
    'Grade B': GradeBenchmarkTier;
    'Grade C': GradeBenchmarkTier;
  };
  sampleTestImages: {
    id: string;
    label: string;
    expectedGrade: 'Grade A' | 'Grade B' | 'Grade C';
    description: string;
    imageUrl: string;
  }[];
}

export const COMMODITY_GRADE_BENCHMARKS: Record<string, CommodityGradeBenchmark> = {
  Tomato: {
    crop: 'Tomato',
    hindiName: 'टमाटर',
    standardAuthority: 'Directorate of Marketing & Inspection (DMI) - AGMARK Standards',
    standardDocRef: 'AGMARK-SCH-TOMATO-2023 / DMI Notification 14-2',
    grades: {
      'Grade A': {
        title: 'Grade A (Extra Class / Premium Export & Retail)',
        grade: 'Grade A',
        criteria: 'Uniform deep red/pinkish-red pigment, firm turgor, calyx intact, zero punctures or rot, blemishes strictly <= 2% surface area.',
        toleranceLimit: 'Max 2% minor superficial blemishes, 0% soft rot, 0% sunscald.',
        imageUrl: '/tomato-grade-a.jpg',
        sourceLabel: 'AGMARK Benchmark: Grade A Extra Class (DMI Standard)',
        typicalPriceMultiplier: 1.22,
        marketDestination: 'Direct Hypermarket Contracts (Reliance, BigBasket), Exporters, Modern Trade',
        keyVisualMarkers: [
          'Uniform glossy deep crimson epidermis',
          'Firm skin elasticity (4.5+ N/cm²)',
          'Taut stem attachment (calyx intact)',
          'Zero fungal hyphae, zero punctures or rot'
        ]
      },
      'Grade B': {
        title: 'Grade B (Standard Commercial APMC Mandi Lot)',
        grade: 'Grade B',
        criteria: 'Fair commercial quality, sound flesh, mild natural color variance or minor healed superficial scratches (2% - 8% surface area).',
        toleranceLimit: 'Max 8% superficial blemish area, 0% deep puncture, firm flesh.',
        imageUrl: '/tomato-grade-b.jpg',
        sourceLabel: 'APMC Mandi Benchmark: Grade B Commercial (Fair Average Quality)',
        typicalPriceMultiplier: 1.0,
        marketDestination: 'APMC Mandi Open Auction, Regional Wholesale Traders, Local Sabzi Mandis',
        keyVisualMarkers: [
          'Consistent commercial lot with sound firm pulp',
          'Minor healed surface markings (<8% area)',
          'Sound structural firmness for wholesale handling',
          'Standard retail and mandi auction suitability'
        ]
      },
      'Grade C': {
        title: 'Grade C (Substandard / Severe Rot & Decay Defect)',
        grade: 'Grade C',
        criteria: 'Severe agricultural defect, blossom end rot, fungal mold or spore colonies, softening, depressed necrotic lesions (>8% defect area).',
        toleranceLimit: 'Defect area >8% with active mold or decay; distress clearance only.',
        imageUrl: '/tomato-grade-c.jpg',
        sourceLabel: 'Quality Control Benchmark: Grade C Defective / Spoilage',
        typicalPriceMultiplier: 0.30,
        marketDestination: 'Distress Clearance, Industrial Biogas / Compost, Urgent Puree Extraction',
        keyVisualMarkers: [
          'Visible necrotic rot, deep lesions or fungal decay',
          'Depressed water-soaked soft lesions (Blossom End Rot)',
          'Peel breakdown with loss of internal turgor',
          'Unfit for fresh retail table sale'
        ]
      }
    },
    sampleTestImages: [
      {
        id: 'tomato-grade-a',
        label: 'Grade A Premium (Extra Class)',
        expectedGrade: 'Grade A',
        description: 'AGMARK Grade A Benchmark: Pristine, uniform crimson tomatoes with intact calyx, taut glossy skin, and zero rot.',
        imageUrl: '/tomato-grade-a.jpg'
      },
      {
        id: 'tomato-grade-b',
        label: 'Grade B Commercial (APMC Mandi)',
        expectedGrade: 'Grade B',
        description: 'APMC Commercial Benchmark: Sound market tomatoes with natural slight color variation, minor superficial markings, and firm pulp.',
        imageUrl: '/tomato-grade-b.jpg'
      },
      {
        id: 'tomato-grade-c',
        label: 'Grade C Substandard (Rot & Decay)',
        expectedGrade: 'Grade C',
        description: 'Grade C Defect Benchmark: Tomatoes exhibiting blossom end rot, necrotic lesions, sunken tissue, and severe fungal spoilage.',
        imageUrl: '/tomato-grade-c.jpg'
      }
    ]
  },
  Onion: {
    crop: 'Onion',
    hindiName: 'प्याज',
    standardAuthority: 'AGMARK Directorate of Marketing & Inspection - Allium Standards',
    standardDocRef: 'AGMARK-ONION-GRADING-RULES-2022',
    grades: {
      'Grade A': {
        title: 'Grade A (Extra Class / Export Pink & Red)',
        grade: 'Grade A',
        criteria: 'Well-cured, completely dry papery outer tunic intact, tight closed neck, uniform globe shape, 55-75mm diameter, zero sprouting or rot.',
        toleranceLimit: 'Max 1.5% outer peeling, 0% sprouted, 0% root growth.',
        imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Google Ag-Vision / AGMARK Benchmark: Grade A Nashik Red',
        typicalPriceMultiplier: 1.25,
        marketDestination: 'Gulf & SE Asia Export Consignments, Supermarkets, Cold Storage Holdings',
        keyVisualMarkers: [
          'Intact dry outer skin (papery tunic)',
          'Tight, well-dried neck stem',
          'Zero sprouting or premature roots',
          'High pungency and solid flesh density'
        ]
      },
      'Grade B': {
        title: 'Grade B (Standard APMC Mandi Grade)',
        grade: 'Grade B',
        criteria: 'Fairly well-dried outer tunic, slight skin peeling allowed (<10%), sound inner bulb, diameter 40-55mm, no decay.',
        toleranceLimit: 'Max 10% partial skin loose, 0% internal rot.',
        imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'APMC Mandi Standard Yard Sample: Grade B Commercial',
        typicalPriceMultiplier: 1.0,
        marketDestination: 'Domestic APMC Mandis, Hotel & Restaurant Suppliers, Retail Markets',
        keyVisualMarkers: [
          'Minor outer tunic peeling',
          'Uniform medium diameter (40-55mm)',
          'Dry neck with firm core',
          'Standard domestic consumption grade'
        ]
      },
      'Grade C': {
        title: 'Grade C (Substandard / Dehydration & Direct Clearance)',
        grade: 'Grade C',
        criteria: 'Visible sprouting, double or twin bulbs, significant skin loss, softened necks, or small diameter (<35mm).',
        toleranceLimit: 'Sprouted or twin bulbs, requires immediate clearance or industrial dehydration.',
        imageUrl: 'https://images.unsplash.com/photo-1620574387735-3624d75b2def?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Dehydration Plant Reference: Grade C Flake Spec',
        typicalPriceMultiplier: 0.60,
        marketDestination: 'Onion Powder Dehydration Plants (Jain Farm Fresh), Quick Discount Clearance',
        keyVisualMarkers: [
          'Premature green sprout emergence',
          'Double/twin bulb deformation',
          'Soft neck or fungal spore dust',
          'Heavy price discount required'
        ]
      }
    },
    sampleTestImages: [
      {
        id: 'onion-grade-a-sample',
        label: 'Real Grade A Sample (Dry Tight Neck)',
        expectedGrade: 'Grade A',
        description: 'Dry papery Nashik Red onion bulbs with tight neck and solid globe form.',
        imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'onion-grade-b-sample',
        label: 'Real Grade B Sample (Mandi Standard)',
        expectedGrade: 'Grade B',
        description: 'Standard mandi red onions with sound flesh and minor papery skin flakes.',
        imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'onion-grade-c-sample',
        label: 'Real Grade C Sample (Sprouted / Split)',
        expectedGrade: 'Grade C',
        description: 'Onion lot showing sprouting or double formation suitable for dehydration.',
        imageUrl: 'https://images.unsplash.com/photo-1620574387735-3624d75b2def?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  Potato: {
    crop: 'Potato',
    hindiName: 'आलू',
    standardAuthority: 'Directorate of Marketing & Inspection - Potato Grading & Marking Rules',
    standardDocRef: 'AGMARK-POTATO-SPEC-2023',
    grades: {
      'Grade A': {
        title: 'Grade A (Table Special & Processing Chips Grade)',
        grade: 'Grade A',
        criteria: 'Smooth clean skin, shallow eyes, uniform oblong shape, 50-80mm size, zero greening (solanine), zero cuts, zero dry rot.',
        toleranceLimit: 'Max 1% surface dirt/scab, 0% green skin, 0% mechanical cuts.',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Google Ag-Vision / AGMARK Benchmark: Grade A Kufri Chipsona',
        typicalPriceMultiplier: 1.20,
        marketDestination: 'Potato Chip Processors (PepsiCo/Lay’s, Balaji, Haldiram’s), Premium Cold Storage',
        keyVisualMarkers: [
          'Smooth unblemished periderm',
          'Zero chlorophyll greening',
          'Shallow eye depth (easy peel)',
          'High specific gravity (>1.080)'
        ]
      },
      'Grade B': {
        title: 'Grade B (Standard APMC Table Potato)',
        grade: 'Grade B',
        criteria: 'Sound culinary tubers, slight surface scab (<5% area), minor soil adhering, medium size 40-55mm, no soft rot.',
        toleranceLimit: 'Max 5% superficial scabs, no deep internal bruising.',
        imageUrl: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'APMC Mandi Standard Yard Sample: Grade B Kufri Jyoti',
        typicalPriceMultiplier: 1.0,
        marketDestination: 'Regional APMC Mandis, Urban Wholesale Potato Markets, Food Service',
        keyVisualMarkers: [
          'Sound table cooking quality',
          'Minor surface net-scab (<5%)',
          'Clean, firm flesh',
          'Standard domestic grade'
        ]
      },
      'Grade C': {
        title: 'Grade C (Substandard / Greened, Cut or Sprouted)',
        grade: 'Grade C',
        criteria: 'Presence of greening (>5% surface solanine), deep mechanical harvest cuts, sprouting eyes, or uneven knobby shape.',
        toleranceLimit: 'Cut tubers or greening present, discounted for starch processing or cattle feed.',
        imageUrl: 'https://images.unsplash.com/photo-1508313880080-c4bef0730395?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Industrial Starch Factory Reference: Grade C Spec',
        typicalPriceMultiplier: 0.55,
        marketDestination: 'Starch Manufacturing Units, Distilleries, Discount Clearance',
        keyVisualMarkers: [
          'Greening (toxic solanine development)',
          'Harvester blade slice marks',
          'Eye sprout elongation',
          'High rejection rate for table use'
        ]
      }
    },
    sampleTestImages: [
      {
        id: 'potato-grade-a-sample',
        label: 'Real Grade A Sample (Clean Smooth Periderm)',
        expectedGrade: 'Grade A',
        description: 'Large, clean, uniform Kufri Chipsona potatoes with shallow eyes and zero cuts.',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'potato-grade-b-sample',
        label: 'Real Grade B Sample (Mandi Table Grade)',
        expectedGrade: 'Grade B',
        description: 'Sound domestic table potatoes with typical field skin texture.',
        imageUrl: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'potato-grade-c-sample',
        label: 'Real Grade C Sample (Industrial / Starch)',
        expectedGrade: 'Grade C',
        description: 'Potatoes with cuts, scabs, or irregularities suitable for starch processing.',
        imageUrl: 'https://images.unsplash.com/photo-1508313880080-c4bef0730395?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  Chilli: {
    crop: 'Chilli',
    hindiName: 'हरी / लाल मिर्च',
    standardAuthority: 'Spices Board of India & AGMARK Red/Green Chilli Specifications',
    standardDocRef: 'AGMARK-CHILLI-EXPORT-SPEC-2023',
    grades: {
      'Grade A': {
        title: 'Grade A (Special Export & Oleoresin Grade)',
        grade: 'Grade A',
        criteria: 'Vibrant glossy green or intense uniform deep red, intact green stalk (pedicel), unwrinkled taut skin, zero pod borer holes, 0% fungal mould.',
        toleranceLimit: 'Max 1% broken stalks, zero pod borer damage, zero aflatoxin risk.',
        imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Google Ag-Vision / Spices Board Grade A Guntur Sannam',
        typicalPriceMultiplier: 1.25,
        marketDestination: 'Spice Exporters (Guntur APMC), Oleoresin Extractors (Synthite, Kancor), Premium Retail',
        keyVisualMarkers: [
          'High capsaicin color luster',
          'Firm pedicel attachment',
          'Crisp, unpunctured pod wall',
          'Zero discoloration or anthracnose'
        ]
      },
      'Grade B': {
        title: 'Grade B (Standard APMC Whole Spice Grade)',
        grade: 'Grade B',
        criteria: 'Commercial sound pods, slight curvature allowed, minor dry spots (<5% pod area), intact seeds, sound pungency.',
        toleranceLimit: 'Max 5% discolored pods, no internal seed discoloration.',
        imageUrl: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'APMC Mandi Standard Yard Sample: Grade B Commercial Pods',
        typicalPriceMultiplier: 1.0,
        marketDestination: 'Spice Grinding Mills (MDH, Everest, Catch), Domestic APMC Mandis',
        keyVisualMarkers: [
          'Sound whole pod condition',
          'Minor surface discoloration (<5%)',
          'Standard aroma and pungency',
          'Clean commercial grade'
        ]
      },
      'Grade C': {
        title: 'Grade C (Substandard / Extract & Powder Blending)',
        grade: 'Grade C',
        criteria: 'Broken pods, loose seeds, fungal discoloration, anthracnose spots, or bleached sun-damaged pod walls.',
        toleranceLimit: 'High broken pod percentage (>15%), must be sterilized and ground.',
        imageUrl: 'https://images.unsplash.com/photo-1526344966-89049886b28d?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Spice Mill Grinding Ref: Grade C Broken Pods',
        typicalPriceMultiplier: 0.60,
        marketDestination: 'Low-cost Curry Powder Blends, Feed Additives, Discount Clearance',
        keyVisualMarkers: [
          'Broken pod walls and seed fallout',
          'Anthracnose necrotic spots',
          'Bleached, brittle pod texture',
          'Sterilization required before use'
        ]
      }
    },
    sampleTestImages: [
      {
        id: 'chilli-grade-a-sample',
        label: 'Real Grade A Sample (Vibrant Intact Pods)',
        expectedGrade: 'Grade A',
        description: 'Vibrant glossy pods with intact stems and zero blemishes.',
        imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'chilli-grade-b-sample',
        label: 'Real Grade B Sample (Mandi Commercial)',
        expectedGrade: 'Grade B',
        description: 'Standard market chilli with sound pods and minor curve variations.',
        imageUrl: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'chilli-grade-c-sample',
        label: 'Real Grade C Sample (Broken / Discolored)',
        expectedGrade: 'Grade C',
        description: 'Broken or discolored pods suitable for industrial grinding.',
        imageUrl: 'https://images.unsplash.com/photo-1526344966-89049886b28d?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  Wheat: {
    crop: 'Wheat',
    hindiName: 'गेहूं',
    standardAuthority: 'Food Corporation of India (FCI) & AGMARK Grain Grading Standards',
    standardDocRef: 'FCI-UNIFORM-SPEC-WHEAT-2024 / AGMARK-GRAIN-RULES',
    grades: {
      'Grade A': {
        title: 'Grade A (Sharbati Extra Premium / Mill Special)',
        grade: 'Grade A',
        criteria: 'Plump, amber, lustrous whole kernels, hectolitre weight >78 kg/hl, moisture <= 11.5%, foreign matter <= 0.5%, zero weevilled grains.',
        toleranceLimit: 'Foreign matter <=0.5%, broken grains <=2%, 0% insect-damaged.',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Google Ag-Vision / AGMARK Benchmark: Grade A Sharbati Amber',
        typicalPriceMultiplier: 1.18,
        marketDestination: 'Premium Atta Millers (Aashirvaad Select, Fortune Sharbati), Private Warehouse Storage',
        keyVisualMarkers: [
          'High vitreous amber grain luster',
          'Heavy kernel density and plumpness',
          'Zero chalkiness or black point',
          'Exceptional gluten strength (>28%)'
        ]
      },
      'Grade B': {
        title: 'Grade B (Standard APMC & FCI Fair Average Quality)',
        grade: 'Grade B',
        criteria: 'Clean sound kernels, moisture <= 12%, broken grains <= 4%, foreign matter <= 1%, standard domestic baking quality.',
        toleranceLimit: 'Foreign matter <=1.0%, slightly damaged grains <=2%.',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'FCI Fair Average Quality (FAQ) Standard Mandi Yard Sample',
        typicalPriceMultiplier: 1.0,
        marketDestination: 'FCI Public Procurement, Standard Commercial Flour Mills, APMC Mandi Grain Yards',
        keyVisualMarkers: [
          'Sound kernel integrity',
          'Normal wheat aroma (no sour odor)',
          'Low foreign seed presence',
          'Full MSP procurement eligibility'
        ]
      },
      'Grade C': {
        title: 'Grade C (Substandard / Feed & Distilleries)',
        grade: 'Grade C',
        criteria: 'Shriveled grains (>8%), discolored germ (black point), rain-damaged luster, broken grains (>6%), or moisture >13%.',
        toleranceLimit: 'High shriveled or broken ratio, subject to mandi penalty cuts.',
        imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Industrial Grain Feed Spec: Grade C Sample',
        typicalPriceMultiplier: 0.72,
        marketDestination: 'Poultry & Cattle Feed Mills, Industrial Starch, Ethanol Distilleries',
        keyVisualMarkers: [
          'Lusterless, dull or sprouted grains',
          'High shriveled grain percentage',
          'Discolored kernel tips (black point)',
          'MSP rejection risk if uncleaned'
        ]
      }
    },
    sampleTestImages: [
      {
        id: 'wheat-grade-a-sample',
        label: 'Real Grade A Sample (Plump Amber Kernels)',
        expectedGrade: 'Grade A',
        description: 'Lustrous, dense Sharbati wheat grains with zero insect holes or dirt.',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'wheat-grade-b-sample',
        label: 'Real Grade B Sample (FCI FAQ Standard)',
        expectedGrade: 'Grade B',
        description: 'Standard commercial wheat kernels meeting FCI Fair Average Quality criteria.',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'wheat-grade-c-sample',
        label: 'Real Grade C Sample (Shriveled Feed Grade)',
        expectedGrade: 'Grade C',
        description: 'Wheat lot with shriveled or broken grains suitable for cattle feed.',
        imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  Apple: {
    crop: 'Apple',
    hindiName: 'सेब',
    standardAuthority: 'Directorate of Marketing & Inspection - Apple Grading Rules',
    standardDocRef: 'AGMARK-APPLE-HORT-2023 / DMI J&K & HP Spec',
    grades: {
      'Grade A': {
        title: 'Grade A (Royal Extra Fancy / Export Class)',
        grade: 'Grade A',
        criteria: '75%+ characteristic deep red color blush, perfectly symmetrical, crisp turgid flesh, intact pedicel, zero bruising, zero scab, diameter 70-85mm.',
        toleranceLimit: 'Max 1% minor cosmetic russeting, 0% skin punctures, 0% bitter pit.',
        imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'Google Ag-Vision / AGMARK Benchmark: Grade A Royal Delicious',
        typicalPriceMultiplier: 1.30,
        marketDestination: 'Premium Metropolitan Fruit Markets (Delhi Azadpur, Mumbai Vashi), Modern Retail',
        keyVisualMarkers: [
          'High red color coverage (>75%)',
          'Flawless wax-coated cuticle',
          'Firm pressure rating (>16 lbs)',
          'Full calyx eye closure'
        ]
      },
      'Grade B': {
        title: 'Grade B (Fancy APMC Mandi Commercial)',
        grade: 'Grade B',
        criteria: 'Good commercial color (50-70% blush), slight russeting allowed (<10%), firm flesh, minor healed limb-rub scars, diameter 60-70mm.',
        toleranceLimit: 'Max 8% superficial russeting, no flesh breakdown.',
        imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'APMC Mandi Standard Yard Sample: Grade B Commercial Pack',
        typicalPriceMultiplier: 1.0,
        marketDestination: 'Wholesale Fruit Markets, Tier-2 City Fruit Retailers, Standard Boxes',
        keyVisualMarkers: [
          'Satisfactory color blush (50-70%)',
          'Minor healed surface scars (<8%)',
          'Crisp edible texture',
          'Standard corrugated box packing'
        ]
      },
      'Grade C': {
        title: 'Grade C (Culinary & Juice Processing Grade)',
        grade: 'Grade C',
        criteria: 'Hail peck scars, limb bruises, under-colored (<40%), misshapen, or small diameter (<55mm). Suitable for juice and cider extraction.',
        toleranceLimit: 'Surface blemishes >10%, hail damage allowed, sound juice yield.',
        imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop',
        sourceLabel: 'HPMC Apple Juice Concentrate Factory Spec: Grade C',
        typicalPriceMultiplier: 0.50,
        marketDestination: 'Apple Juice Concentrate (HPMC, Tropicana, Real), Cider & Vinegar Plants',
        keyVisualMarkers: [
          'Hailstorm indentations and scars',
          'Pale, green-undercolored skin',
          'Irregular asymmetric shape',
          'Sold in bulk open bags for processing'
        ]
      }
    },
    sampleTestImages: [
      {
        id: 'apple-grade-a-sample',
        label: 'Real Grade A Sample (Royal Delicious Extra Fancy)',
        expectedGrade: 'Grade A',
        description: 'Pristine red blush, symmetrical fruit with intact stem and crisp skin.',
        imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'apple-grade-b-sample',
        label: 'Real Grade B Sample (Mandi Commercial Pack)',
        expectedGrade: 'Grade B',
        description: 'Standard retail apples with sound flesh and minor cosmetic russeting.',
        imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'apple-grade-c-sample',
        label: 'Real Grade C Sample (Juice & Processing)',
        expectedGrade: 'Grade C',
        description: 'Culinary apples with hail marks or color variations suitable for juice.',
        imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop'
      }
    ]
  }
};
