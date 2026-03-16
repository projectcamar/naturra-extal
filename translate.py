import json
import time
from typing import Dict, Any
from googletrans import Translator

translator = Translator()

LANGUAGES = ['id', 'ar', 'zh-cn', 'ja', 'es', 'fr', 'ko']
LANG_KEYS = ['id', 'ar', 'zh', 'ja', 'es', 'fr', 'ko']

# English source object for Home
en_home = {
    "heroEyebrow": "CV Naturra Extal International",
    "heroTitle": "Leaders in soft commodity services",
    "heroDesc": "Connecting Indonesia's finest agricultural commodities with global markets. Specializing in premium cocoa, cloves, and cocopeat.",
    "btnProducts": "Our Products",
    "btnLearn": "Learn More",
    "stat1": "Core Products",
    "stat2": "Indonesian Sourced",
    "stat3": "Global Market Reach",
    "stat4": "Premium Quality Grade",
    "heritageEyebrow": "Our Heritage",
    "heritageTitle": "Carrying on our market experience and family business heritage.",
    "heritageDesc": "CV Naturra Extal International is an Indonesian-based agricultural commodity trading company. We specialize in sourcing, processing, and exporting premium Indonesian commodities including cocoa powder, cloves (cengkeh), and cocopeat to international markets.",
    "feat1": "Quality Certified",
    "feat2": "Global Distribution",
    "feat3": "Farmer Partnerships",
    "whoWeAre": "Who we are",
    "whoEyebrow": "Our Products",
    "cocoaCategory": "HS 1805 & 1806",
    "cocoaTitle": "Cocoa Products",
    "cocoaDesc": "Premium cocoa powder — both pure (HS 1805.00.0) and sweetened (HS 1806.00.0). Sourced from Indonesia's finest cocoa-producing regions.",
    "clovesCategory": "Premium Grade",
    "clovesTitle": "Cengkeh (Cloves)",
    "clovesDesc": "Hand-picked Indonesian cloves known worldwide for their rich aroma and superior quality. Ideal for spice trade, cigarettes, and culinary use.",
    "cocopeatCategory": "Eco-Friendly",
    "cocopeatTitle": "Cocopeat",
    "cocopeatDesc": "High-quality cocopeat from Indonesian coconut husks. Perfect for horticulture, agriculture, and sustainable growing media applications.",
    "sustainBadge": "Sustainability",
    "sustainTitle": "Committed to a smarter future",
    "sustainDesc": "At Naturra Extal, sustainability isn't just a word — it's how we do business. We partner directly with Indonesian farmers, ensuring fair trade practices and environmental stewardship throughout our supply chain.",
    "sustainList1": "Direct farmer partnerships across Indonesia",
    "sustainList2": "Sustainable sourcing and processing methods",
    "sustainList3": "Fair pricing and transparent supply chain",
    "sustainList4": "Quality-controlled from farm to export",
    "ctaEyebrow": "Get in Touch",
    "ctaTitle": "Contact Naturra Extal to discuss your commodity needs",
    "ctaDesc": "Whether you're looking for premium cocoa powder, Indonesian cloves, or cocopeat, our team is ready to help you find the perfect solution for your business.",
    "ctaBtn1": "WhatsApp Us",
    "ctaBtn2": "Email Us",
    "emailTitle": "Email",
    "waTitle": "WhatsApp",
    "globalTitle": "Global Trade",
    "globalDesc": "Worldwide shipping available",
    "corpTitle": "Corporate"
}

# English source object for Partnership
en_partnership = {
    "pageTitle": "Global Partnership Details - Naturra Extal",
    "metaDescription": "Learn how to partner with Naturra Extal for bulk commodity sourcing.",
    "metaKeywords": "commodity partnership, cocoa supplier, clove partnership",
    "heroTitle": "Global Partnership",
    "mainTitle": "A Reliable Sourcing Partner",
    "mainParagraphs": [
        "Whether you are a food manufacturer, international wholesaler, or distributor, you need a trusted partner in origin. Naturra Extal is here to ensure your supply chain remains uninterrupted and high-quality.",
        "We understand that international trade involves strict compliance, precise specifications, and timely deliveries. We are dedicated to accommodating these needs seamlessly."
    ],
    "experienceTitle": "Export Expertise",
    "experienceParagraphs": [
        "Our team has extensive experience managing exports across different continents. We know how to handle the documentation, quality control, and logistics required to successfully land products at your destination port.",
        "From sample evaluation to bulk container loading, we maintain complete transparency. We know how to organize efficient, reliable workflows for you."
    ],
    "collaborationTitle": "Direct from the Source",
    "collaborationSubtitle": "B2B Commodity Supplier",
    "collaborationParagraphs": [
        "We believe success comes from securing the best raw materials directly from the source. By partnering with us, you cut out unnecessary middlemen and work directly with a company rooted in Indonesia's finest farming regions.",
        "Our team is ready to discuss your volume requirements, target specifications, and preferred shipping incoterms (FOB, CIF, etc.).",
        "We provide clear, measurable solutions. You'll receive accurate quotes, genuine product specs, and consistent quality."
    ],
    "flexibilityTitle": "Flexible Contracts",
    "flexibilityParagraphs": [
        "We offer flexible MOQs depending on the product, from partial container shipments to regular multi-container monthly contracts.",
        "You can choose the packaging method that best fits your warehouse and production lines. We are here to help make it happen."
    ],
    "scaleTitle": "Commitment to Your Scale",
    "scaleDescription": "We scale with your business. As your volume requirements grow, our farmer networks and processing capabilities will rise to meet your demand.",
    "scaleQuestion": "Ready to secure your supply chain?",
    "ctaTitle": "Discuss Your Next Contract",
    "ctaDescription": "Tell us about your commodity needs. Send us your specifications to start a long-term partnership.",
    "ctaButton": "Contact Our Trade Team",
    "contactTitle": "Trade Office"
}

# English source object for Custom Order
en_custom_order = {
    "meta": { "title": "Custom Specifications - Naturra Extal", "description": "Request custom specifications for cocoa, cloves, and cocopeat." },
    "hero": { "title": "Custom Specifications", "imageAlt": "Naturra Extal Custom Processing", "imageTitle": "Custom Commodity Processing" },
    "message": { 
        "title": "Tailored to Your Requirements", 
        "paragraphs": [ 
            "Different markets require different grades, processing methods, and packaging. We open our doors to buyers who need specific adjustments to standard commodity offerings.", 
            "We don't just supply raw materials. We understand your end-product goals and shape our processing to ensure the ingredients meet your exact factory specifications." 
        ],
        "imageAlt": "Custom Commodity Specifications"
    },
    "ideas": { 
        "title": "From Raw to Ready", 
        "intro": "Need a specific mesh size or fat content for cocoa powder? Specific moisture limits for cloves or tailored block weights for cocopeat? Tell us your targets.", 
        "description": "We believe every manufacturer has unique processing parameters. At Naturra Extal, custom sizing, sorting, and packaging are our expertise. Our team routinely handles strict international grading requests." 
    },
    "process": { 
        "title": "Our Quality Assurance Process", 
        "steps": [ 
            { "title": "Requirement Gathering", "description": "You provide exact specifications (moisture, mesh, grade, packaging)." }, 
            { "title": "Sourcing & Sorting", "description": "We select the raw materials matching the target grade." }, 
            { "title": "Lab & Processing", "description": "Items are processed and undergo parameter verification." }, 
            { "title": "Export Delivery", "description": "Safe loading and complete export documentation to your final port." } 
        ] 
    },
    "cta": { 
        "title": "Request a Custom Quote", 
        "intro": "If you require specific grades or packaging, it's time to talk. Contact our export team for a consultation:", 
        "workshopHeading": "Processing Facility", 
        "workshopLabel": "Facility Info:", 
        "workshopParagraph": "Our facility in Indonesia handles custom processing, sorting, and specialized packaging for bulk commodity orders.", 
        "button": "Request Quote" 
    }
}

def translate_obj(obj):
    if isinstance(obj, str):
        return obj
    if isinstance(obj, list):
        return [translate_obj(item) for item in obj]
    if isinstance(obj, dict):
        res = {}
        for k, v in obj.items():
            res[k] = translate_obj(v)
        return res
    return obj

def translate_to_lang(obj, dest_lang):
    if isinstance(obj, str):
        for _ in range(3):
            try:
                res = translator.translate(obj, dest=dest_lang).text
                return res
            except Exception as e:
                time.sleep(1)
        return obj
    if isinstance(obj, list):
        return [translate_to_lang(item, dest_lang) for item in obj]
    if isinstance(obj, dict):
        res = {}
        for k, v in obj.items():
            res[k] = translate_to_lang(v, dest_lang)
        return res
    return obj

print("Translating Home...")
home_all = {"en": en_home}
partner_all = {"en": en_partnership}
custom_all = {"en": en_custom_order}

for idx, lang in enumerate(LANGUAGES):
    key = LANG_KEYS[idx]
    print(f"Translating to {key} ({lang})...")
    home_all[key] = translate_to_lang(en_home, lang)
    partner_all[key] = translate_to_lang(en_partnership, lang)
    custom_all[key] = translate_to_lang(en_custom_order, lang)

with open("c:\\extal naturra\\naturra-extal\\src\\utils\\NaturraTranslations.ts", "w", encoding="utf-8") as f:
    f.write("import { LanguageCode } from './languageManager';\n\n")
    f.write(f"export const NATURRA_HOME_TRANSLATIONS = {json.dumps(home_all, ensure_ascii=False, indent=2)};\n\n")
    f.write(f"export const NATURRA_PARTNERSHIP_TRANSLATIONS = {json.dumps(partner_all, ensure_ascii=False, indent=2)};\n\n")
    f.write(f"export const NATURRA_CUSTOM_ORDER_TRANSLATIONS = {json.dumps(custom_all, ensure_ascii=False, indent=2)};\n")

print("Finished writing translations!")
