export type NavLink = {
  href: string;
  label: string;
};

export type MenuSection = {
  title: string;
  subtitle: string;
  items: string[];
};

export type PricingPackage = {
  title: string;
  price: string;
  includes: string;
};

export type AddOn = {
  item: string;
  price: string;
};

const RUPEE = "\u20B9";

export const WHATSAPP_NUMBER = "919844749685";
export const PHONE_NUMBER = "9844749685";
export const LOGO_SRC = "/assets/logos/yaana-outhana.jpeg";
export const PAMPHLET_SRC = "/assets/yaana-outhana-pamphlet.jpeg";

export const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#pricing", label: "Pricing" },
  { href: "#speciality", label: "Speciality" },
  { href: "#contact", label: "Contact" },
];

export const MENU_SECTIONS: MenuSection[] = [
  {
    title: "Tiffin Items",
    subtitle: "Breakfast classics prepared in a traditional South Indian style.",
    items: [
      "Rava Idly with Bombay Saagu & Chutney",
      "Idly, Vada with Sambar & Chutney",
      "Set Dosa with Saagu & Chutney",
      "Masala Dosa with Aloo Palya & Chutney",
      "Davangere Benne Dose with Aloo Palya & Chutney",
      "Poori with Saagu & Chutney",
      "Button Idly and Sambar Dip",
      "Thatte Idly with Sambar & Chutney",
    ],
  },
  {
    title: "Breakfast Menu",
    subtitle: "Morning selections for wholesome event catering and group orders.",
    items: [
      "Chow Chow Bath (Khara Bath + Kesari Bath) with Chutney",
      "Shavige Bath with Chutney",
      "Pongal with Raita and Chutney",
      "Sweet Pongal",
      "Avalakki (Poha) with Chutney",
      "Vangi Upma with Chutney",
    ],
  },
  {
    title: "Welcome Drinks / Juices",
    subtitle: "Refreshing starters for festive arrivals and function service.",
    items: [
      "Watermelon Juice",
      "Musk Melon Juice",
      "Pineapple Juice",
      "Orange Juice",
      "Masala Soda",
      "Raw Mango Shots",
      "Fruit Punch",
      "Lemon Pudina Refresher",
      "Lassi / Buttermilk",
    ],
  },
  {
    title: "Soups",
    subtitle: "Light and comforting bowls to begin the meal service.",
    items: [
      "Tomato Soup",
      "Sweet Corn Soup",
      "Hot & Sour Soup",
      "Vegetable Clear Soup",
      "Manchow Soup",
    ],
  },
  {
    title: "Appetizers",
    subtitle: "Crisp, festive starters for celebrations and family occasions.",
    items: [
      "Aloo Bonda",
      "Mirchi Bajji",
      "Mangalore Bajji",
      "Baby Corn Fry",
      "Lemon Paneer",
      "Veg Cutlet",
      "Gobi 65",
      "Dahi Vada",
      "Jackfruit Kebab",
      "Veg / Onion Pakoda",
    ],
  },
  {
    title: "Chats",
    subtitle: "Street-style favorites brought into a curated kitchen menu.",
    items: [
      "Masala Puri",
      "Papdi Chaat",
      "Sev / Aloo Puri",
      "Bhel Puri",
      "Bombay Pani Puri",
      "Aloo Tikki Chole",
    ],
  },
  {
    title: "Salads",
    subtitle: "Fresh accompaniments that balance the richness of the feast.",
    items: [
      "Kosambari",
      "Cucumber Pomegranate Salad",
      "Sprouts Salad",
      "Fresh Vegetable Salad",
      "Corn & Capsicum Salad",
      "Peanut Masala Salad",
    ],
  },
  {
    title: "Rice Varieties",
    subtitle: "Comforting staples and festive rice dishes for full-service menus.",
    items: [
      "Vangi Bath",
      "Bisibele Bath",
      "Puliyogare",
      "Vegetable Pulav",
      "Green Peas Pulav",
      "Vegetable Biryani",
      "Mushroom Biryani",
      "Jackfruit Biryani",
      "Ghee Rice",
      "Jeera Rice",
      "Lemon Rice",
      "Coconut Rice",
      "Tomato Bath",
      "Steamed Rice",
    ],
  },
  {
    title: "Palya (Dry Vegetable Dishes)",
    subtitle: "Traditional dry sides with homestyle seasoning and texture.",
    items: [
      "Beans Palya",
      "Beetroot Palya",
      "Cabbage Carrot Palya",
      "Mixed Vegetable Palya",
      "Aloo and Peas Palya",
      "Pulses Palya",
      "Bindi Sukka",
      "Brinjal Sukka",
      "Tondekaayi Sukka / Kabul",
      "Aloo Kaju Matar Palya",
      "Thondekayi Kaju Palya",
      "Channa Palya",
    ],
  },
  {
    title: "Curries (Gravies)",
    subtitle: "Signature gravies suited for weddings, poojas, and celebrations.",
    items: [
      "Vegetable Kurma",
      "Bombay Saagu",
      "Yennegai (Stuffed Brinjal Curry)",
      "Paneer Butter Masala",
      "Mixed Vegetable Curry",
      "Chole Masala",
    ],
  },
  {
    title: "Dals",
    subtitle: "Soulful lentil-based dishes rooted in regional tradition.",
    items: [
      "Dal Fry",
      "Tadka Dal",
      "Tomato Dal",
      "Moong Dal",
      "Palak Pappu",
      "Malenadu Huralikattu",
    ],
  },
  {
    title: "Sambar Varieties",
    subtitle: "Classic sambar selections served across traditional feasts and meals.",
    items: [
      "Sambar",
      "Vegetable Sambar",
      "Drumstick Sambar",
      "Ladies Finger / Radish Sambar",
      "Mixed Dal Sambar",
    ],
  },
  {
    title: "Rasam",
    subtitle: "Aromatic, comforting pours that complete a proper feast.",
    items: [
      "Pepper Rasam",
      "Lemon Rasam",
      "Tomato Rasam",
      "Mysore Rasam",
      "Mango Rasam",
    ],
  },
  {
    title: "Chutneys",
    subtitle: "Classic accompaniments made to complement breakfast and snacks.",
    items: [
      "Coconut Chutney",
      "Tomato Chutney",
      "Mint Chutney",
      "Onion Chutney",
      "Shenga (Peanut) Chutney",
    ],
  },
  {
    title: "Gojju (Traditional Specialty)",
    subtitle: "Sweet-tangy regional specialties for elevated traditional menus.",
    items: [
      "Pineapple Gojju",
      "Dry Grapes (Kismis) Gojju",
    ],
  },
  {
    title: "Accompaniments",
    subtitle: "Table essentials and finishing sides that complete the meal.",
    items: [
      "Curd",
      "Spiced Buttermilk",
      "Ghee",
      "Pickle (Mango / Mix Veg / Lemon / Herelikaayi)",
      "Salt",
      "Papad",
    ],
  },
  {
    title: "Roti & Dosa Counter",
    subtitle: "Live-counter favorites for larger gatherings and custom events.",
    items: [
      "Methi Chapati",
      "Masala Rotti",
      "Jowar Rotti",
      "Palak Pulka / Butter Pulka",
      "Bhatura / Poori",
      "Set Dosa with Chutney",
      "Masala Dosa with Chutney",
      "Davangere Benne Dose with Chutney",
      "Bili Holige",
      "Pudi Masala Dosa",
    ],
  },
  {
    title: "Sweets & Desserts",
    subtitle: "Celebration sweets that carry warmth, memory, and hospitality.",
    items: [
      "Gulab Jamun",
      "Kesaribath",
      "Laddoo",
      "Hesaru Bele Payasa",
      "Sabakki Shavige Payasa",
      "Kayi / Bele Holige",
      "Mysore Pak",
      "Carrot Halwa",
      "Badam Kheer",
      "Gasagase Payasa",
      "Chiroti",
      "Hot Badam Milk with Laddoo",
    ],
  },
];

export const SERVICE_HIGHLIGHTS = [
  "Authentic South Indian cuisine",
  "Customized menus for every occasion",
  "Fresh ingredients, traditional recipes",
  "Weddings, festivals, & family celebrations",
  "Made with love, served with warmth",
];

export const DINING_ESSENTIALS = [
  "Drinking Water",
  "Tissue Paper",
  "Finger Bowl",
  "Tamboola",
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    title: "Breakfast Package",
    price: `${RUPEE}150 per plate`,
    includes:
      "1 Spoon Item + 1 Tiffin Item + Chutney & Sambar + 1 Welcome Drink",
  },
  {
    title: "Lunch / Dinner Package",
    price: `${RUPEE}350 per plate`,
    includes:
      "1 Appetizer + 1 Chat + 1 Salad + 1 Palya + 1 Roti + 1 Curry + 1 Rice Item (with raita) + 1 Gojju + 1 Chutney + 2 Sweets + 1 Dal + 1 Sambar + 1 Rasam",
  },
];

export const CUSTOMIZATION_ADD_ONS: AddOn[] = [
  { item: "Appetizer / Chat", price: `${RUPEE}20` },
  { item: "Bread", price: `${RUPEE}15` },
  { item: "Curry", price: `${RUPEE}25` },
  { item: "Rice", price: `${RUPEE}20` },
  { item: "Dal / Sambar / Rasam", price: `${RUPEE}15` },
  { item: "Sweet", price: `${RUPEE}25` },
  { item: "Icecream", price: `${RUPEE}25` },
];

export const DEFAULT_OPEN_MENU_SECTIONS = [
  "Tiffin Items",
  "Rice Varieties",
  "Sweets & Desserts",
  "Accompaniments",
];
