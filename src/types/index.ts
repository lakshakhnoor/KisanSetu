export type Role = 'farmer' | 'fpo' | 'trader' | 'admin';

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: Role;
  state: string;
  district: string;
  village?: string;
  fpoName?: string;
  traderLicense?: string;
  createdAt: string;
  avatarUrl?: string;
}

export type ProduceCategory = 'vegetables' | 'cereals' | 'pulses' | 'oilseeds' | 'fruits' | 'spices' | 'commercial';

export interface Commodity {
  id: string;
  name: string;
  hindiName: string;
  category: ProduceCategory;
  standardUnit: 'Quintal' | 'Kg' | 'Ton';
  commonVarieties: string[];
  baseShelfLifeDays: number;
}

export type Grade = 'Grade A' | 'Grade B' | 'Grade C';

export interface DefectAnnotation {
  id: string;
  label: string;
  severity: 'sound' | 'minor' | 'moderate' | 'critical';
  box2d?: [number, number, number, number]; // [ymin, xmin, ymax, xmax] 0-1000 normalized
  description: string;
}

export interface ProduceVerificationStatus {
  isProduce: boolean;
  detectedCrop: string;
  cropMismatch: boolean;
  userSelectedCrop: string;
  verificationNote: string;
  itemCountEstimate?: number;
  sampleType?: 'Single Produce Item' | 'Bulk Crate / Heap' | 'Multi-Item Sample';
  imageClarity?: 'Optimal' | 'Fair' | 'Low Light' | 'Slightly Blurry';
}

export interface QualityAnalysisResult {
  crop: string;
  variety: string;
  grade: Grade;
  gradeTitle?: string;
  qualityScore: number; // 0-100
  confidence: number; // 0-100
  estimatedShelfLife: string;
  modelVersion: string;
  scannedAt: string;
  imageUrl: string;
  verificationStatus?: ProduceVerificationStatus;
  defectAnnotations?: DefectAnnotation[];
  lotBreakdown?: {
    gradeAPercent: number;
    gradeBPercent: number;
    gradeCPercent: number;
  };
  inspectionMode?: 'AGMARK Mandi Codex' | 'Export & Modern Retail' | 'Bulk Lot Aggregation';
  detectedFeatures: {
    colorUniformity: string;
    firmnessIndex: string;
    surfaceDefects: string;
    blemishPercentage: number;
    fungalRisk: 'Low' | 'Moderate' | 'High' | 'None';
    sizeCategory: 'Large' | 'Medium' | 'Small' | 'Uneven';
    shapeSymmetry?: string;
    ripenessStage?: string;
  };
  advisoryNote: string;
  agmarkStandards?: {
    standardCode?: string;
    gradeSpecification: string;
    inspectionVerdict: string;
    marketPricePremium: string;
    recommendations: string[];
  };
  matchedBenchmark?: {
    tier: Grade;
    similarityScore: number;
    reason: string;
    benchmarkImageUrl?: string;
  };
  sourceEngine?: 'Gemini Vision (Multimodal AI)' | 'AgriVision Inspector' | 'AgriVision Inspector (Ground Truth Calibrated)' | 'AgriVision Inspector (Standards Calibrated)';
}

export interface MarketPriceRecord {
  id: string;
  commodity: string;
  variety: string;
  marketName: string;
  district: string;
  state: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  arrivalQuantity: number;
  arrivalUnit: 'Quintal' | 'Tons';
  source: 'AGMARKNET' | 'e-NAM' | 'APMC Direct';
  lastUpdated: string;
  freshnessStatus: 'Live (Today)' | 'Yesterday' | '2 Days Ago';
  priceChangePercent: number;
}

export interface DailyPricePoint {
  dayOffset: number; // -10 to +10 (-10 is 10 days ago, 0 is today, +10 is in 10 days)
  dayLabel: string; // e.g. "-10d", "Today", "+10d"
  date: string; // e.g. "07 Sep", "17 Sep"
  fullDate: string; // e.g. "07 Sep 2026"
  price: number; // actual price if <= 0, predicted price if >= 0
  actualPrice?: number | null; // set only for dayOffset <= 0
  predictedPrice?: number | null; // set only for dayOffset >= 0 (starts at day 0 so line connects smoothly)
  lowerBand?: number | null; // confidence lower bound for future days
  upperBand?: number | null; // confidence upper bound for future days
  isFuture: boolean;
  arrivalVolumeQtl?: number;
  driverNote?: string;
}

export interface PricePrediction {
  commodity: string;
  currentModalPrice: number;
  predictedPrice7Days: number;
  predictedPrice14Days: number;
  expectedRangeLow: number;
  expectedRangeHigh: number;
  confidence: number;
  trend: 'Bullish' | 'Bearish' | 'Stable';
  trendReason: string;
  factors: {
    monsoonImpact: string;
    arrivalVolumeTrend: string;
    demandPressure: string;
    transportCostIndex: string;
  };
  dailyPoints?: DailyPricePoint[];
}

export type BestActionType = 'SELL_NOW' | 'STORE' | 'PROCESS';

export interface BestActionRecommendation {
  action: BestActionType;
  title: string;
  headline: string;
  netEstimatedReturnPerQuintal: number;
  confidenceScore: number;
  reasons: string[];
  storageOption?: {
    facilityName: string;
    costPerMonth: number;
    recommendedDurationDays: number;
    expectedPriceAfterStorage: number;
    netGainAfterStorageCost: number;
  };
  processingOption?: {
    processedProduct: string;
    yieldRatio: string;
    processingCostPerQuintal: number;
    processedValuePerQuintal: number;
    netGain: number;
  };
  immediateSaleOption?: {
    buyerName: string;
    immediatePrice: number;
    paymentWindow: string;
  };
}

export interface StorageFacility {
  id: string;
  name: string;
  type: 'Cold Storage' | 'Warehouse (Dry)' | 'Pack House' | 'CA Controlled Atmosphere';
  state: string;
  district: string;
  distanceKm: number;
  totalCapacityQuintals: number;
  availableCapacityQuintals: number;
  costPerQuintalPerMonth: number;
  supportedCrops: string[];
  temperatureRangeCelsius: string;
  humidityRange: string;
  contactNumber: string;
  verifiedGovtRegistry: boolean;
  address: string;
}

export interface BuyerRequirement {
  id: string;
  buyerName: string;
  buyerType: 'Wholesaler' | 'Processor' | 'Retailer / AgTech' | 'Exporter' | 'Mandi Commission Agent' | 'Institutional';
  verified: boolean;
  state: string;
  district: string;
  distanceKm: number;
  requiredCrop: string;
  requiredGrade: Grade;
  quantityRequiredQuintals: number;
  offeredPricePerQuintal: number;
  paymentTerms: 'Immediate UPI' | '24h Bank Transfer' | 'e-NAM Escrow' | 'On Delivery';
  contactPerson: string;
  phone: string;
  matchScore: number;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  shortCode: string;
  ministry: string;
  category: 'Post-Harvest Infrastructure' | 'Price Support & Insurance' | 'Processing & Value Addition' | 'Credit Subvention';
  eligibility: string[];
  benefits: string;
  subsidyPercentage: string;
  documentsRequired: string[];
  applicationProcess: string;
  officialPortalUrl: string;
  lastVerifiedDate: string;
  applicableStates: string[];
}

export interface TransactionRecord {
  id: string;
  transactionCode: string; // e.g. KS-2026-000841
  date: string;
  sellerName: string;
  sellerMobile: string;
  sellerType: 'Farmer' | 'FPO';
  buyerName: string;
  buyerType: string;
  commodity: string;
  variety: string;
  grade: Grade;
  quantityQuintals: number;
  agreedPricePerQuintal: number;
  totalAmount: number;
  mandiName: string;
  status: 'Completed' | 'Pending Delivery' | 'Escrow Funded' | 'Inspected & Passed';
  paymentMode: string;
  qrPayload: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'price_alert' | 'buyer_match' | 'storage_alert' | 'scheme_update';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Machine Learning Price Prediction & Time-Series Forecasting Types
export interface MlForecastModelMetrics {
  algorithm: string; // e.g. "Ensemble: XGBoost + Holt-Winters + Bayesian Ridge"
  r2Score: number; // e.g. 0.942
  meanAbsoluteError: number; // e.g. 42.5 (₹/Q)
  meanAbsolutePercentageError: number; // e.g. 2.1%
  trainedOnRecordsCount: number; // e.g. 1820 mandi daily records
  validationHorizonDays: number;
}

export interface MlFeatureImportance {
  feature: string;
  weight: number; // 0 to 1
  impact: 'bullish' | 'bearish' | 'neutral';
  description: string;
}

export interface SeasonalityIndex {
  currentCyclePhase: 'Peak Arrival Flush' | 'Moderate Market Flow' | 'Lean Season Arrival' | 'Storage Offloading Season';
  historicalSeasonalityFactor: number; // 0.8 to 1.4 multiplier
  expectedArrivalVolumeTrend: 'Surging Inflow (+30% to +45%)' | 'Steady Normal Inflow' | 'Dropping Inflow (-20% to -35%)';
  arrivalElasticityCoef: number; // e.g. -0.42 (every 10% increase in arrival drops price by 4.2%)
}

export interface PeakSellingWindow {
  optimalDayOffset: number; // e.g. 8
  optimalDate: string; // e.g. "25 Sep 2026"
  targetPrice: number; // e.g. ₹2,680/Q
  estimatedProfitDeltaPerQtl: number; // e.g. +₹380/Q (+16.5%)
  recommendation: 'SELL_NOW' | 'HOLD_AND_SELL' | 'STORE_IN_WDRA';
  actionHeadline: string;
  reasoning: string;
}

export interface MandiHubOption {
  id: string;
  name: string;
  district: string;
  state: string;
  currentModalPrice: number;
  dailyArrivalQtl: number;
  distanceKm?: number;
}

export interface MlPricePredictionResponse extends PricePrediction {
  mandiId: string;
  mandiName: string;
  state: string;
  horizonDays: 7 | 14 | 30;
  modelMetrics: MlForecastModelMetrics;
  featureImportances: MlFeatureImportance[];
  seasonality: SeasonalityIndex;
  peakSellingWindow: PeakSellingWindow;
  scenarioAnalysis: {
    optimisticScenario: number; // +12% festival or export demand surge
    baseScenario: number;
    pessimisticScenario: number; // -15% glut arrival / weather distress
  };
  availableMandis: MandiHubOption[];
  generatedAt: string;
}

