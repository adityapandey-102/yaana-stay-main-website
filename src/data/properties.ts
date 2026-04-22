export type PropertyType = "hostel" | "pg" | "flat";

export type PropertyPricing = {
  label: string;
  amountPerMonth: string;
};

export type PropertyFaq = {
  id: number;
  question: string;
  answer: string;
};



export type RentalProperty = {
  id: number;
  slug: string;
  name: string;
  loc: string;
  room: string;
  price: string;
  priceLabel?: string;
  href: string;
  tags: string[];
  rating: string | null;
  type: PropertyType;
  img: string[];
  tagline: string;
  positioning: string;
  highlights?: string[];
  facilities: string[];
  pricing: PropertyPricing[];
  deposit: string;
  maintenance: string;
  food: string;
  utilitiesIncluded: string[];
  audience: string;
  faqs: PropertyFaq[];
  map_url: string;
};

export const RENTAL_PROPERTIES: RentalProperty[] = [
  {
    id: 1,
    slug: "YAANA-SIGNATURE",
    name: "YAANA SIGNATURE ",
    // loc: "New Number 2, PID No. 40162-2, Jaladarshini Layout, Near Ramaiah College Gate 4, Bengaluru - 560065",
    loc: "New Number 2, PID Number 40162-2, Jaladarshini Layout, Near Ramaiah College Gate 4, Bengaluru, Karnataka 560065",
    room: "Single, Double, Triple",
    price: "₹ 12,000",
    priceLabel: "Starts from",
    href: "/property-details/YAANA-SIGNATURE",
    tags: [
      "Shared",
      "AC",
      "Furnished",
      "Food",
      "Single",
      "Twin Sharing",
      "Triple Sharing",
    ],
    rating: "4.5",
    type: "flat",
    img: [
      "/assets/gallery/yaana-signature/yaana-signature-03.jpeg",
      "/assets/gallery/yaana-signature/yaana-signature-06.jpeg",
      "/assets/gallery/yaana-signature/yaana-signature-14.jpeg",
    ],
    tagline: "Premium Living for Independent Women",
    positioning:
      "A premium, community-driven residence designed for independent women seeking comfort, safety, modern amenities, and a balanced lifestyle.",
    highlights: [
      // "Signature single room at INR 27,000",
      // "Paid guest house for parents visits and cafeteria access at YAANA Signature",
    ],
    facilities: [
      "Female-only property",
      "Premium rooms with modern interiors",
      "Community-focused living",
      "Cot with spring mattress",
      "Blackout curtains",
      "Cupboards and dressing table",
      "Study table and chair",
      "Attached western bathrooms",
      "Cooking facility",
      "Iron board",
      "Gym",
      "Lift",
      "Washing machine",
      "Power backup",
      "Personal TV",
      "Personal fridge",
      "Biometric entry",
      "24-hour security",
      "CCTV surveillance",
      "High-speed WiFi",
      "Hot water",
      "Drinking water",
      "Cleaning and maintenance",
      "Lounge and chilling area",
      "Guest stay",
      "Cafeteria",
    ],
    pricing: [
      { label: "Single Room", amountPerMonth: "₹ 27,000" },
      { label: "Two Sharing", amountPerMonth: "₹ 16,000" },
      { label: "Three Sharing", amountPerMonth: "₹ 12,000" },
    ],
    deposit: "2 months rent as deposit",
    maintenance: "₹ 2,000 annual maintenance",
    food: "Optional: 3 meals for ₹ 4,000 per month (extra)",
    utilitiesIncluded: ["Rent includes all utilities"],
    audience: "Working women professionals and female students.",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31096.69375255088!2d77.5184896142318!3d13.030149436581027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae175bee41f961%3A0xea29650daddf8073!2sM%20S%20Ramaiah%20College%20of%20Education!5e0!3m2!1sen!2sin!4v1773478228694!5m2!1sen!2sin",
    faqs: [
      {
        id: 1,
        question: "Who is YAANA Signature designed for?",
        answer:
          "YAANA Signature is a premium, female-only residence designed for independent women, working professionals, and executives who seek a comfortable, safe, and community-driven living environment.",
      },
      {
        id: 2,
        question: "What amenities are included in the rent?",
        answer:
          "The rent at YAANA Signature is all-inclusive, covering utilities such as high-speed WiFi, power backup, hot water, drinking water, housekeeping support, and access to common facilities like the gym and lounge area.",
      },
      {
        id: 3,
        question: "What safety features does YAANA Signature provide?",
        answer:
          "Safety is a top priority at YAANA Signature. The property features biometric entry, 24/7 security, and CCTV surveillance to ensure a secure and comfortable stay for all residents.",
      },
      {
        id: 4,
        question: "What room facilities can residents expect?",
        answer:
          "Rooms are thoughtfully designed with modern interiors and include a cot with spring mattress, blackout curtains, cupboards, dressing table, study table and chair, attached western bathrooms, air conditioning, TV, and a refrigerator for complete comfort and convenience.",
      },
    ],
  },
  {
    id: 2,
    slug: "YAANA-LIVING",
    name: "YAANA LIVING",
    // loc: " YAANA Living - Paying Guest Accommodation for women, 18, 1st Main Road, Chikkamaranahalli, M S R Nagar, Mathikere, Bengaluru, Karnataka 560054",
    loc: "YAANA Living – PG Accommodation for Women, 18, 1st Main Road, Chikkamaranahalli, M.S.R. Nagar, Mathikere, Bengaluru, Karnataka 560054",
    room: "Single, Double, Triple and More",
    price: "₹ 7,000",
    priceLabel: "Starts from",
    href: "/property-details/YAANA-LIVING",
    tags: [
      "Shared",
      "Furnished",
      "Private",
      "Double Sharing",
      "Triple Sharing",
      "Four Sharing",
      "Five Sharing",
    ],
    rating: "4.0",
    type: "hostel",
    img: [
      "/assets/gallery/yaana-livings/yaana-livings-05.jpeg",
      "/assets/gallery/yaana-livings/yaana-livings-07.jpeg",
      "/assets/gallery/yaana-livings/yaana-livings-10.jpeg",
    ],
    tagline: "Smart Living with Maximum Value",
    positioning:
      "A well-balanced accommodation offering spacious options, flexible sharing choices, and comprehensive facilities. Best suited for ladies and working women looking for affordability without compromising on safety and convenience.",
    facilities: [
      "Cots with spring mattress",
      "Curtains and cupboards",
      "Study tables and chairs",
      "Iron boards",
      "Cooking facility",
      "Two dining areas and self-cooking kitchens on every floor",
      "Lift",
      "Personal TV",
      "Personal fridge",
      "Washing machine",
      "Power backup",
      "Cleaning and maintenance",
      "High-speed WiFi",
      "CCTV cameras",
      "Biometric entry",
      "24-hour security",
      "Hot water",
      "Drinking water",
      "Gym",
    ],
    pricing: [
      { label: "Single Room", amountPerMonth: "₹ 24,000" },
      { label: "Two Sharing", amountPerMonth: "₹ 14,000" },
      { label: "Two Sharing (Portion)", amountPerMonth: "₹ 16,000" },
      { label: "Three Sharing", amountPerMonth: "₹ 10,000" },
      { label: "Four Sharing", amountPerMonth: "₹ 9,000" },
      { label: "Five Sharing", amountPerMonth: "₹ 7,000" },
    ],
    deposit: "2 months rent as deposit",
    maintenance: "₹ 2,000 one-time annual maintenance",
    food: "Optional: 3 meals for ₹ 4,000 per month",
    utilitiesIncluded: [
      "Electricity",
      "WiFi",
      "Cleaning",
      "Self-cooking facility",
    ],
    audience: "Working women professionals and female students.",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9623255492393!2d77.561872275124!3d13.038070087283407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d2f6c244763%3A0xb8070768cca76071!2sYaana%20Living%20-%20paying%20guest%20accommodation%20for%20women!5e0!3m2!1sen!2sin!4v1773478060640!5m2!1sen!2sin",
    faqs: [
      {
        id: 1,
        question: "Who is YAANA Living suitable for?",
        answer:
          "YAANA Living is ideal for ladies and working women who are looking for a spacious, affordable accommodation with essential facilities, safety, and a comfortable living environment.",
      },
      {
        id: 2,
        question: "What room facilities are provided at YAANA Living?",
        answer:
          "Rooms are equipped with cots with spring mattresses, curtains, cupboards, study tables and chairs, shoe racks, and access to iron boards for everyday convenience.",
      },
      {
        id: 3,
        question: "Are cooking facilities available for residents?",
        answer:
          "Yes, YAANA Living offers self-cooking facilities with kitchens available on every floor along with two dedicated dining areas, allowing residents the flexibility to cook and dine comfortably.",
      },
      {
        id: 4,
        question: "Does the rent include utilities?",
        answer:
          "Yes, the rent at YAANA Living is all-inclusive and covers electricity, WiFi, cleaning services, and access to shared facilities such as the gym, lift, hot water, and power backup, ensuring a hassle-free stay.",
      },
    ],
  },
  {
    id: 3,
    slug: "YAANA-COMFORTS",
    name: "YAANA COMFORTS",
    // loc: " YAANA Comforts - Paying Guest accommodation for women-41, 5th Main Rd, off New BEL Road, behind Malabar gold and diamonds, Chikkamaranahalli, Amarjyothi Layout, Raj Mahal Vilas 2nd Stage, R.M.V. 2nd Stage, Bengaluru, Karnataka 560094",
    loc: "YAANA Comforts – PG Accommodation for Women, 41, 5th Main Road, Off New BEL Road, Behind Malabar Gold and Diamonds, Chikkamaranahalli, Amarjyothi Layout, Raj Mahal Vilas 2nd Stage, Bengaluru, Karnataka 560094",
    room: "Single, Double",
    price: "₹ 11,000",
    priceLabel: "Starts from",
    href: "/property-details/YAANA-COMFORTS",
    tags: ["Shared", "Furnished", "Food"],
    rating: "4.5",
    type: "pg",
    img: [
      "/assets/gallery/yaana-comforts/yaana-comforts-06.jpeg",
      "/assets/gallery/yaana-comforts/yaana-comforts-03.jpeg",
      "/assets/gallery/yaana-comforts/yaana-comforts-07.jpeg",
    ],
    tagline: "Comfortable, Secure and Hassle-Free Living",
    positioning:
      "A mid-range women's accommodation focused on comfort, security, and essential amenities. Ideal for working professionals who prefer a calm, secure environment with self-cooking flexibility and transparent pricing.",
    facilities: [
      "Cots with spring mattress",
      "Curtains and cupboards",
      "Study tables and chairs",
      "Shoe racks",
      "Iron boards",
      "Self-cooking facility",
      "Gym",
      "Lift",
      "Washing machine",
      "Power backup",
      "Personal TV",
      "Personal fridge",
      "High-speed WiFi",
      "CCTV cameras",
      "Biometric entry",
      "24-hour security",
      "Hot water",
      "Drinking water",
    ],
    pricing: [
      { label: "Single Room", amountPerMonth: "₹ 22,000" },
      { label: "Two Sharing", amountPerMonth: "₹ 11,000" },
    ],
    deposit: "2 months rent as deposit",
    maintenance: "₹ 2,000 annual maintenance",
    food: "Optional: 3 meals for ₹ 4,000 per month (extra)",
    utilitiesIncluded: [
      "Electricity",
      "WiFi",
      "Cleaning",
      "Self-cooking facility",
    ],
    audience: "Working women professionals and female students.",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.015020054087!2d77.56591552512388!3d13.034715387286534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b4bdb65b87%3A0xd21708a5d6f4e668!2sYaana%20comforts%20-%20Paying%20guest%20accommodation%20for%20women!5e0!3m2!1sen!2sin!4v1773477783230!5m2!1sen!2sin",
    faqs: [
      {
        id: 1,
        question: "Who is YAANA Comforts best suited for?",
        answer:
          "YAANA Comforts is ideal for working women who prefer a calm, secure, and affordable living space with essential amenities and the flexibility to cook their own meals.",
      },
      {
        id: 2,
        question:
          "What facilities are available in the rooms at YAANA Comforts?",
        answer:
          "Rooms are equipped with comfortable cots with spring mattresses, curtains, cupboards, study tables with chairs, shoe racks, and access to iron boards to support everyday convenience.",
      },
      {
        id: 3,
        question: "What safety features are available at YAANA Comforts?",
        answer:
          "The property is secured with biometric entry, CCTV surveillance, and 24-hour security to ensure a safe and peaceful environment for all residents.",
      },
      {
        id: 4,
        question: "What is included in the rent at YAANA Comforts?",
        answer:
          "The rent includes all utility bills such as electricity, WiFi, cleaning services, and access to the self-cooking facility, ensuring transparent and hassle-free living.",
      },
    ],
  },
  {
    id: 4,
    slug: "YAANA-HOMES",
    name: "YAANA HOMES",
    // loc: " YAANA Homes, 21, MSR Nagar road extension, 11th cross, Pipeline Rd, Mathikere, Bengaluru, Karnataka 560054",
    loc: "YAANA Homes, 21, MSR Nagar Road Extension, 11th Cross, Pipeline Road, Mathikere, Bengaluru, Karnataka 560054",
    room: "Single, Double",
    price: "₹ 8,000",
    priceLabel: "Starts from",
    href: "/property-details/YAANA-HOMES",
    tags: ["Shared", "Furnished", "Food", "Single", "Twin Sharing"],
    rating: "4.9",
    type: "hostel",
    img: [
      "/assets/gallery/yaana-homes/yaana-homes-01.jpeg",
      "/assets/gallery/yaana-homes/yaana-homes-03.jpeg",
      "/assets/gallery/yaana-homes/yaana-homes-04.jpeg",
    ],
    tagline: "Affordable Living with Personal Comfort",
    positioning:
      "A budget-friendly women's accommodation offering private-room comforts like personal TV and refrigerator. Best suited for ladies, interns, and early-career professionals seeking affordability with essential conveniences.",
    facilities: [
      "Cots with foam beds",
      "Curtains and cupboards",
      "Personal TV",
      "Personal fridge",
      "Self-cooking facility",
      "Washing machine",
      "Cleaning and maintenance",
      "Power backup",
      "High-speed WiFi",
      "CCTV cameras",
      "24-hour security",
      "Hot water",
      "Drinking water",
    ],
    pricing: [
      { label: "Single Room", amountPerMonth: "₹ 15,000 - ₹ 18,000" },
      { label: "Two Sharing", amountPerMonth: "₹ 8,000" },
    ],
    deposit: "1 month rent as deposit",
    maintenance: "₹ 2,000 one-time annual maintenance",
    food: "Optional: 3 meals for ₹ 4,000 per month",
    utilitiesIncluded: [
      "Electricity",
      "WiFi",
      "Cleaning",
      "Self-cooking facility",
    ],
    audience: "Working women professionals and female students.",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.4921631952!2d77.56264993861754!3d13.036669546821177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae170034f35f3f%3A0xe82a76045fe9278e!2sYaana%20Homes%20ladies%20PG!5e0!3m2!1sen!2sin!4v1773477365249!5m2!1sen!2sin",
    faqs: [
      {
        id: 1,
        question: "Who is YAANA Homes best suited for?",
        answer:
          "YAANA Homes is ideal for ladies, interns, and early-career professionals looking for an affordable women's accommodation with essential amenities and comfortable private-room features.",
      },
      {
        id: 2,
        question: "What facilities are available in the rooms at YAANA Homes?",
        answer:
          "Rooms come with cots with foam beds, curtains, cupboards, and personal amenities like a TV and refrigerator to make everyday living more convenient.",
      },
      {
        id: 3,
        question: "What amenities are provided at YAANA Homes?",
        answer:
          "Residents have access to WiFi, power backup, hot water, drinking water, CCTV surveillance, and a self-cooking facility for added comfort and flexibility.",
      },
      {
        id: 4,
        question: "What is included in the rent at YAANA Homes?",
        answer:
          "The rent is all-inclusive, covering electricity, WiFi, cleaning services, and access to the self-cooking facility, making it a hassle-free and budget-friendly living option.",
      },
    ],
  },
];

export const FILTER_TABS = ["All", "Hostel", "PG", "Flat", "New"] as const;

export const PROPERTY_BY_SLUG = Object.fromEntries(
  RENTAL_PROPERTIES.map((property) => [property.slug, property]),
) as Record<string, RentalProperty>;

export function getPropertyBySlug(slug: string) {
  return PROPERTY_BY_SLUG[slug] ?? null;
}
