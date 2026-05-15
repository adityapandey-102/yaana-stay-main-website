import { WHATSAPP_NUMBER } from "./data";

const KITCHEN_ENQUIRY_TEXT =
  "Namaskara, I would like to enquire about YAANA Outhana kitchen facilities, menu packages, catering, and event services. Please share more details.";

export function buildKitchenEnquiryWhatsAppLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(KITCHEN_ENQUIRY_TEXT)}`;
}

export function buildWhatsAppLink(item: string, category: string) {
  return buildKitchenEnquiryWhatsAppLink();
}

export function buildCategoryWhatsAppLink(category: string) {
  return buildKitchenEnquiryWhatsAppLink();
}

export function buildPricingWhatsAppLink() {
  return buildKitchenEnquiryWhatsAppLink();
}
