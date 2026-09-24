export interface StateInfo {
  name: string;
  code: string;
  isUT: boolean;
  districts: {
    name: string;
    majorMandis: string[];
  }[];
}

export const INDIAN_STATES: StateInfo[] = [
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    isUT: false,
    districts: [
      { name: 'Guntur', majorMandis: ['Guntur Chilli Yard', 'Tenali APMC'] },
      { name: 'Kurnool', majorMandis: ['Kurnool Mandi', 'Adoni Cotton Market'] },
      { name: 'Krishna', majorMandis: ['Vijayawada Fruit Market', 'Gudivada Mandi'] },
      { name: 'Chittoor', majorMandis: ['Madanapalle Tomato Yard', 'Chittoor APMC'] },
      { name: 'East Godavari', majorMandis: ['Rajahmundry Mandi', 'Kakinada Grain Market'] },
      { name: 'Anantapur', majorMandis: ['Anantapur Groundnut Yard', 'Hindupur APMC'] }
    ]
  },
  {
    name: 'Arunachal Pradesh',
    code: 'AR',
    isUT: false,
    districts: [
      { name: 'Papum Pare', majorMandis: ['Naharlagun Market', 'Yupia Mandi'] },
      { name: 'West Kameng', majorMandis: ['Bomdila Kiwi & Apple Hub'] }
    ]
  },
  {
    name: 'Assam',
    code: 'AS',
    isUT: false,
    districts: [
      { name: 'Kamrup', majorMandis: ['Guwahati Vegetable Yard', 'Pamohi APMC'] },
      { name: 'Nagaon', majorMandis: ['Dhing Jute & Paddy Market', 'Nagaon Mandi'] },
      { name: 'Cachar', majorMandis: ['Silchar Agro Market'] },
      { name: 'Jorhat', majorMandis: ['Jorhat Tea & Paddy Center'] }
    ]
  },
  {
    name: 'Bihar',
    code: 'BR',
    isUT: false,
    districts: [
      { name: 'Patna', majorMandis: ['Bazar Samiti Patna', 'Bakhtiyarpur Mandi'] },
      { name: 'Muzaffarpur', majorMandis: ['Muzaffarpur Litchi Market', 'Kanti Mandi'] },
      { name: 'Begusarai', majorMandis: ['Barauni Maize Yard', 'Begusarai APMC'] },
      { name: 'Bhagalpur', majorMandis: ['Naugachia Silk & Maize Mandi', 'Bhagalpur Central'] },
      { name: 'Samastipur', majorMandis: ['Pusa Grain Market', 'Dalsinghsarai Potato Yard'] }
    ]
  },
  {
    name: 'Chhattisgarh',
    code: 'CG',
    isUT: false,
    districts: [
      { name: 'Raipur', majorMandis: ['Dumartarai Grain Mandi', 'Tilda Paddy Yard'] },
      { name: 'Durg', majorMandis: ['Durg APMC', 'Bhilai Agro Market'] },
      { name: 'Rajnandgaon', majorMandis: ['Rajnandgaon Paddy Mandi', 'Dongargarh Hub'] }
    ]
  },
  {
    name: 'Goa',
    code: 'GA',
    isUT: false,
    districts: [
      { name: 'North Goa', majorMandis: ['Mapusa APMC Yard', 'Bicholim Cashew Market'] },
      { name: 'South Goa', majorMandis: ['Margao Sub-Yard APMC', 'Ponda Spice Market'] }
    ]
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    isUT: false,
    districts: [
      { name: 'Rajkot', majorMandis: ['Bedi Rajkot APMC', 'Gondal APMC (Chilli/Groundnut)'] },
      { name: 'Surat', majorMandis: ['Sardar Market Surat', 'Bardoli Sugarcane Yard'] },
      { name: 'Mehsana', majorMandis: ['Unjha APMC (Jeera/Cumin Capital)', 'Kadi Cotton Market'] },
      { name: 'Ahmedabad', majorMandis: ['APMC Jamalpur', 'Bavla Rice Mandi'] },
      { name: 'Banaskantha', majorMandis: ['Deesa Potato Mandi', 'Palanpur APMC'] },
      { name: 'Junagadh', majorMandis: ['Junagadh Kesar Mango Yard', 'Keshod Groundnut Market'] }
    ]
  },
  {
    name: 'Haryana',
    code: 'HR',
    isUT: false,
    districts: [
      { name: 'Karnal', majorMandis: ['Karnal Basmati Mandi', 'Taraori Grain Market'] },
      { name: 'Hisar', majorMandis: ['Hisar Cotton Yard', 'Hansi Mustard Market'] },
      { name: 'Sirsa', majorMandis: ['Sirsa Cotton & Wheat Mandi', 'Dabwali Grain Hub'] },
      { name: 'Kurukshetra', majorMandis: ['Pipli Grain Market', 'Shahbad Markanda'] },
      { name: 'Ambala', majorMandis: ['Ambala Cantt Grain Yard', 'Barara Mandi'] }
    ]
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    isUT: false,
    districts: [
      { name: 'Shimla', majorMandis: ['Dhali Apple Mandi', 'Parwanoo Terminal'] },
      { name: 'Kullu', majorMandis: ['Kullu Fruit Market', 'Bhuntar Apple Hub'] },
      { name: 'Kangra', majorMandis: ['Kangra Grain Mandi', 'Dharamshala APMC'] }
    ]
  },
  {
    name: 'Jharkhand',
    code: 'JH',
    isUT: false,
    districts: [
      { name: 'Ranchi', majorMandis: ['Pandra Bazar Samiti', 'Kanke Agro Hub'] },
      { name: 'Hazaribagh', majorMandis: ['Hazaribagh Mandi', 'Barhi Grain Market'] }
    ]
  },
  {
    name: 'Karnataka',
    code: 'KA',
    isUT: false,
    districts: [
      { name: 'Bengaluru Rural', majorMandis: ['Yeshwanthpur APMC', 'Kolar Tomato Market'] },
      { name: 'Hubballi-Dharwad', majorMandis: ['Amargol APMC Hubballi', 'Dharwad Cotton Yard'] },
      { name: 'Shivamogga', majorMandis: ['Shivamogga Arecanut Mandi', 'Bhadravathi Grain Hub'] },
      { name: 'Belagavi', majorMandis: ['Belagavi APMC', 'Nippani Tobacco & Jaggery Market'] },
      { name: 'Vijayapura', majorMandis: ['Bijapur Lime & Onion Yard', 'Indi Pulses Market'] }
    ]
  },
  {
    name: 'Kerala',
    code: 'KL',
    isUT: false,
    districts: [
      { name: 'Ernakulam', majorMandis: ['Kochi Spice Board Market', 'Aluva Vegetable Mandi'] },
      { name: 'Wayanad', majorMandis: ['Kalpetta Pepper & Coffee Yard', 'Sulthan Bathery Hub'] },
      { name: 'Idukki', majorMandis: ['Vandanmedu Cardamom Auction', 'Kumily Spice Hub'] },
      { name: 'Kottayam', majorMandis: ['Kottayam Natural Rubber Market'] }
    ]
  },
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    isUT: false,
    districts: [
      { name: 'Indore', majorMandis: ['Choithram Mandi (Soybean/Wheat)', 'Laxmibai Nagar Mandi'] },
      { name: 'Ujjain', majorMandis: ['Ujjain Krishi Upaj Mandi', 'Mahidpur Pulses Hub'] },
      { name: 'Mandsaur', majorMandis: ['Mandsaur Garlic & Opium Mandi', 'Piplia Mandi'] },
      { name: 'Neemuch', majorMandis: ['Neemuch Coriander & Medicinal Plant Hub'] },
      { name: 'Hoshangabad', majorMandis: ['Itarsi Wheat Terminal', 'Pipariya Moong Mandi'] },
      { name: 'Sehore', majorMandis: ['Sehore Sharbati Wheat Yard', 'Ashta APMC'] }
    ]
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    isUT: false,
    districts: [
      { name: 'Nashik', majorMandis: ['Lasalgaon APMC (Asia Largest Onion Mandi)', 'Pimpalgaon Baswant Tomato Market'] },
      { name: 'Pune', majorMandis: ['Gultekdi Pune APMC', 'Manchar Vegetable Market'] },
      { name: 'Nagpur', majorMandis: ['Nagpur Orange Mandi Kalamna', 'Katol Citrus Yard'] },
      { name: 'Solapur', majorMandis: ['Solapur Pomegranate & Jowar APMC', 'Barshi Pulses Mandi'] },
      { name: 'Ahmednagar', majorMandis: ['Rahuri APMC', 'Shrirampur Sugarcane & Onion Market'] },
      { name: 'Jalgaon', majorMandis: ['Jalgaon Banana Market', 'Chopda Cotton Mandi'] },
      { name: 'Kolhapur', majorMandis: ['Shahu Market Yard Kolhapur (Jaggery)', 'Gadhinglaj Chilli Hub'] }
    ]
  },
  {
    name: 'Manipur',
    code: 'MN',
    isUT: false,
    districts: [
      { name: 'Imphal West', majorMandis: ['Khwairamband Bazar', 'Tera Market'] }
    ]
  },
  {
    name: 'Meghalaya',
    code: 'ML',
    isUT: false,
    districts: [
      { name: 'East Khasi Hills', majorMandis: ['Iewduh Shillong Market', 'Mawlong Ginger Yard'] }
    ]
  },
  {
    name: 'Mizoram',
    code: 'MZ',
    isUT: false,
    districts: [
      { name: 'Aizawl', majorMandis: ['Bara Bazar Aizawl', 'Khatla Ginger Depot'] }
    ]
  },
  {
    name: 'Nagaland',
    code: 'NL',
    isUT: false,
    districts: [
      { name: 'Dimapur', majorMandis: ['Supermarket Dimapur', 'Medziphema Organic Yard'] }
    ]
  },
  {
    name: 'Odisha',
    code: 'OD',
    isUT: false,
    districts: [
      { name: 'Cuttack', majorMandis: ['Chhatrabazar Cuttack', 'Banki Mandi'] },
      { name: 'Sambalpur', majorMandis: ['Sambalpur Rice Market', 'Bargarh Paddy Yard'] },
      { name: 'Ganjam', majorMandis: ['Berhampur Grain Mandi', 'Aska Sugarcane Hub'] }
    ]
  },
  {
    name: 'Punjab',
    code: 'PB',
    isUT: false,
    districts: [
      { name: 'Ludhiana', majorMandis: ['New Grain Market Gill Road', 'Khanna Grain Market (Asia Largest Grain Yard)'] },
      { name: 'Amritsar', majorMandis: ['Bhagtanwala Grain Market', 'Rayya Basmati Yard'] },
      { name: 'Bathinda', majorMandis: ['Bathinda Cotton Yard', 'Rampura Phul Mandi'] },
      { name: 'Patiala', majorMandis: ['Patiala Grain Market', 'Nabha Paddy Yard'] },
      { name: 'Jalandhar', majorMandis: ['Maqsudan Sabzi Mandi', 'Phillaur Grain Hub'] }
    ]
  },
  {
    name: 'Rajasthan',
    code: 'RJ',
    isUT: false,
    districts: [
      { name: 'Kota', majorMandis: ['Bhamashah Mandi Kota (Soybean/Mustard)', 'Ramganjmandi (Coriander Capital)'] },
      { name: 'Sri Ganganagar', majorMandis: ['Sri Ganganagar Kinnow & Wheat Yard', 'Suratgarh Grain Market'] },
      { name: 'Jaipur', majorMandis: ['Muhana Mandi Jaipur', 'Surajpole Grain Mandi'] },
      { name: 'Bikaner', majorMandis: ['Bikaner Moth & Groundnut Mandi', 'Nokha Guar Gum Yard'] },
      { name: 'Jodhpur', majorMandis: ['Mandore Mandi (Jeera/Cumin & Spices)', 'Bhopalgarh Onion Hub'] }
    ]
  },
  {
    name: 'Sikkim',
    code: 'SK',
    isUT: false,
    districts: [
      { name: 'East Sikkim', majorMandis: ['Lall Bazar Gangtok (Large Cardamom Hub)'] }
    ]
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    isUT: false,
    districts: [
      { name: 'Coimbatore', majorMandis: ['MGR Market Coimbatore', 'Pollachi Coconut Yard'] },
      { name: 'Madurai', majorMandis: ['Paravai Tomato Yard', 'Mattuthavani Flower & Veg Market'] },
      { name: 'Erode', majorMandis: ['Perundurai Turmeric Terminal', 'Erode Turmeric Market'] },
      { name: 'Dharmapuri', majorMandis: ['Dharmapuri Mango & Tomato Yard', 'Palacode Market'] },
      { name: 'Thanjavur', majorMandis: ['Thanjavur Paddy Regulated Market', 'Kumbakonam Grain Hub'] }
    ]
  },
  {
    name: 'Telangana',
    code: 'TS',
    isUT: false,
    districts: [
      { name: 'Warangal', majorMandis: ['Enumamula Agriculture Market (Asia 2nd Largest)', 'Narsampet Yard'] },
      { name: 'Nizamabad', majorMandis: ['Nizamabad Turmeric & Soybean APMC', 'Bodhan Grain Market'] },
      { name: 'Khammam', majorMandis: ['Khammam Chilli Yard', 'Madhira Cotton Market'] },
      { name: 'Rangareddy', majorMandis: ['Bowenpally Market Yard', 'Gudur Cold Storage Zone'] }
    ]
  },
  {
    name: 'Tripura',
    code: 'TR',
    isUT: false,
    districts: [
      { name: 'West Tripura', majorMandis: ['Battala Market Agartala', 'Golbazar Agro Hub'] }
    ]
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    isUT: false,
    districts: [
      { name: 'Agra', majorMandis: ['Khandauli Potato Mandi', 'Fatehabad Grain Yard'] },
      { name: 'Varanasi', majorMandis: ['Panchkoshi Vegetable Mandi', 'Chandpur Agro Terminal'] },
      { name: 'Bareilly', majorMandis: ['Delapeer Sabzi Mandi', 'Aonla Grain Yard'] },
      { name: 'Kanpur Nagar', majorMandis: ['Chakeri Grain Mandi', 'Collectorganj Pulses Hub'] },
      { name: 'Muzaffarnagar', majorMandis: ['Muzaffarnagar Jaggery (Gur) Market', 'Khatauli Sugarcane Yard'] },
      { name: 'Barabanki', majorMandis: ['Barabanki Mentha Oil & Potato Yard', 'Haidergarh Grain Market'] }
    ]
  },
  {
    name: 'Uttarakhand',
    code: 'UK',
    isUT: false,
    districts: [
      { name: 'Udham Singh Nagar', majorMandis: ['Rudrapur Grain Mandi', 'Kashipur Basmati Market'] },
      { name: 'Dehradun', majorMandis: ['Niranjanpur Mandi Dehradun', 'Rishikesh Agro Yard'] }
    ]
  },
  {
    name: 'West Bengal',
    code: 'WB',
    isUT: false,
    districts: [
      { name: 'Hooghly', majorMandis: ['Sheoraphuli Potato & Veg Market', 'Tarakeswar Cold Storage Hub'] },
      { name: 'Burdwan (Purba Bardhaman)', majorMandis: ['Memari Paddy Hub', 'Kalna Grain Market'] },
      { name: 'Murshidabad', majorMandis: ['Baharampur Jute Market', 'Kandi Paddy Depot'] },
      { name: 'North 24 Parganas', majorMandis: ['Barasat Agro Mandi', 'Bongaon Export Hub'] }
    ]
  },
  // UNION TERRITORIES
  {
    name: 'Jammu & Kashmir',
    code: 'JK',
    isUT: true,
    districts: [
      { name: 'Sopore (Baramulla)', majorMandis: ['Sopore Fruit Mandi (Asia 2nd Largest Apple Mandi)'] },
      { name: 'Shopian', majorMandis: ['Shopian Apple & Walnut Terminal'] },
      { name: 'Jammu', majorMandis: ['Narwal Fruit & Grain Mandi Jammu'] }
    ]
  },
  {
    name: 'Ladakh',
    code: 'LA',
    isUT: true,
    districts: [
      { name: 'Leh', majorMandis: ['Leh Apricot & Seabuckthorn Hub'] }
    ]
  },
  {
    name: 'Delhi',
    code: 'DL',
    isUT: true,
    districts: [
      { name: 'North Delhi', majorMandis: ['Azadpur Mandi (Asia Largest Fruit & Veg Terminal)', 'Narela Grain Mandi'] },
      { name: 'East Delhi', majorMandis: ['Ghazipur Flower & Fruit Terminal'] }
    ]
  },
  {
    name: 'Chandigarh',
    code: 'CH',
    isUT: true,
    districts: [
      { name: 'Chandigarh', majorMandis: ['Sector 26 Grain Market', 'Sector 26 Fruits & Veg Mandi'] }
    ]
  },
  {
    name: 'Puducherry',
    code: 'PY',
    isUT: true,
    districts: [
      { name: 'Puducherry', majorMandis: ['Goubert Market', 'Thattanchavady Regulated Market'] }
    ]
  },
  {
    name: 'Andaman and Nicobar Islands',
    code: 'AN',
    isUT: true,
    districts: [
      { name: 'South Andaman', majorMandis: ['Port Blair Coconut & Arecanut Depot'] }
    ]
  },
  {
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    code: 'DNHDD',
    isUT: true,
    districts: [
      { name: 'Daman', majorMandis: ['Daman Coastal Produce Depot'] }
    ]
  },
  {
    name: 'Lakshadweep',
    code: 'LD',
    isUT: true,
    districts: [
      { name: 'Kavaratti', majorMandis: ['Kavaratti Island Copra & Coconut Center'] }
    ]
  }
];
