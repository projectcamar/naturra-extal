import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
// legacy mangala image import removed
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { DEFAULT_IMAGE_RIGHTS_METADATA } from '../utils/structuredData'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './ImageLicense.css'

type ImageLicenseTranslation = {
  meta: {
    title: string
    description: string
  }
  hero: {
    title: string
    subtitle: string
    imageAlt: string
    imageTitle: string
    caption: string
  }
  sections: {
    usageHeading: string
    usageIntro: string
    usageItems: string[]
    permittedHeading: string
    permittedItems: string[]
    copyrightHeading: string
    copyrightParagraph: string
    requestHeading: string
    requestIntro: string
    requestSteps: string[]
  }
  cta: {
    heading: string
    description: string
    button: string
  }
}

const IMAGE_LICENSE_TRANSLATIONS: Record<LanguageCode, ImageLicenseTranslation> = {
  en: {
    meta: {
      title: 'Image Usage & Licensing - Mangala Living',
      description:
        'Mangala Living image licensing policy, copyright details, and how to obtain permission for commercial image usage.'
    },
    hero: {
      title: 'Image Usage & Licensing',
      subtitle:
        'Official guidance on copyright, licensing policies, and how to request permission to use Mangala Living imagery.',
      imageAlt: 'Mangala Living Image Usage & Licensing',
      imageTitle: 'Mangala Living Image License Policy',
      caption: 'Mangala Living Image Licensing & Usage - Bekasi Industrial Furniture Workshop'
    },
    sections: {
      usageHeading: 'Image Usage Terms',
      usageIntro:
        "We are committed to protecting Mangala Living's brand identity. Please review the following requirements before using our visual assets:",
      usageItems: [
        'All photos and visuals are the property of Mangala Living and protected by copyright law.',
        'Using our images without written permission is prohibited, including for commercial, marketplace, and promotional purposes.',
        'Watermarks and credits must remain intact. Attribution usage must include "Mangala Living" and a link to the official website.',
        'Licenses are granted on a non-exclusive basis, limited to the agreed usage context and duration.'
      ],
      permittedHeading: 'Examples of Permitted Usage',
      permittedItems: [
        'Editorial coverage and press features with clear attribution.',
        'Project proposals, catalogues, and pitch materials after receiving written approval.',
        'Digital or printed marketing assets that promote an official collaboration with Mangala Living.'
      ],
      copyrightHeading: 'Copyright & Attribution',
      copyrightParagraph:
        'Each image contains digital watermarking and metadata trails to safeguard copyright. Attribution usage must include "Mangala Living" and a link to https://mangala-living.com.',
      requestHeading: 'How to Request Image Licensing',
      requestIntro: 'Follow these steps to request official licensing approval:',
      requestSteps: [
        'Submit the license request form or reach out via WhatsApp/Email.',
        'Describe the intended use, publication channels, and campaign duration.',
        'Our team will send the licensing package, fees, and usage terms.',
        'The license becomes effective once payment (if applicable) and the agreement signature are completed.'
      ]
    },
    cta: {
      heading: 'Need Official Licensing?',
      description:
        'Contact our team to receive a tailored commercial or editorial licensing package for your upcoming project.',
      button: 'Contact Mangala Living'
    }
  },
  id: {
    meta: {
      title: 'Lisensi & Penggunaan Gambar - Mangala Living',
      description:
        'Kebijakan lisensi gambar Mangala Living, hak cipta, dan cara memperoleh izin penggunaan gambar untuk keperluan komersial.'
    },
    hero: {
      title: 'Lisensi & Penggunaan Gambar',
      subtitle:
        'Panduan resmi mengenai hak cipta, kebijakan lisensi, dan cara mengajukan izin penggunaan gambar Mangala Living.',
      imageAlt: 'Lisensi & Penggunaan Gambar Mangala Living',
      imageTitle: 'Kebijakan Lisensi Gambar Mangala Living',
      caption: 'Lisensi & Penggunaan Gambar Mangala Living - Workshop Furniture Industrial Bekasi'
    },
    sections: {
      usageHeading: 'Ketentuan Penggunaan Gambar',
      usageIntro:
        'Kami berkomitmen menjaga kualitas citra brand Mangala Living. Mohon ikuti ketentuan berikut sebelum menggunakan aset visual kami:',
      usageItems: [
        'Semua foto dan visual merupakan properti Mangala Living dan dilindungi oleh undang-undang hak cipta.',
        'Penggunaan gambar tanpa izin tertulis tidak diperbolehkan, termasuk untuk keperluan komersial, marketplace, dan promosi.',
        'Kredensial dan watermark tidak boleh dihapus. Penggunaan dengan atribusi harus mencantumkan "Mangala Living" dan tautan ke situs resmi.',
        'Lisensi berlaku non-eksklusif, dengan batasan pada konteks penggunaan dan periode yang disepakati.'
      ],
      permittedHeading: 'Contoh Penggunaan yang Diizinkan',
      permittedItems: [
        'Media publikasi dan editorial dengan atribusi yang jelas.',
        'Proposal proyek, katalog presentasi, dan materi pitching setelah mendapatkan izin tertulis.',
        'Materi pemasaran digital atau cetak yang mempromosikan kerjasama resmi dengan Mangala Living.'
      ],
      copyrightHeading: 'Hak Cipta & Atribusi',
      copyrightParagraph:
        'Setiap gambar memiliki watermark digital dan catatan metadata untuk memastikan perlindungan hak cipta. Penggunaan dengan atribusi harus mencantumkan "Mangala Living" dan tautan ke https://mangala-living.com.',
      requestHeading: 'Cara Mengajukan Lisensi Penggunaan',
      requestIntro: 'Ikuti langkah berikut untuk mengajukan permohonan lisensi resmi:',
      requestSteps: [
        'Isi formulir permintaan lisensi atau hubungi tim kami melalui WhatsApp/Email.',
        'Cantumkan tujuan penggunaan, media publikasi, dan durasi kampanye.',
        'Tim kami akan mengirimkan paket lisensi, tarif, dan syarat penggunaan.',
        'Lisensi berlaku setelah pembayaran (jika ada) dan penandatanganan perjanjian lisensi.'
      ]
    },
    cta: {
      heading: 'Butuh Lisensi Resmi?',
      description:
        'Hubungi tim kami untuk mendapatkan paket lisensi komersial atau penggunaan editorial yang sesuai kebutuhan Anda.',
      button: 'Hubungi Tim Mangala Living'
    }
  },
  ar: {
    meta: {
      title: 'ترخيص واستخدام الصور - Mangala Living',
      description: 'سياسة ترخيص الصور لدى Mangala Living، تفاصيل حقوق النشر، وكيفية الحصول على إذن للاستخدام التجاري.'
    },
    hero: {
      title: 'ترخيص واستخدام الصور',
      subtitle:
        'إرشادات رسمية حول حقوق النشر وسياسات الترخيص وكيفية طلب إذن لاستخدام صور Mangala Living.',
      imageAlt: 'ترخيص واستخدام صور Mangala Living',
      imageTitle: 'سياسة ترخيص الصور لدى Mangala Living',
      caption: 'ترخيص واستخدام صور Mangala Living - ورشة الأثاث الصناعي في بيكاسي'
    },
    sections: {
      usageHeading: 'شروط استخدام الصور',
      usageIntro:
        'نلتزم بحماية هوية علامة Mangala Living. الرجاء الاطلاع على المتطلبات التالية قبل استخدام أصولنا المرئية:',
      usageItems: [
        'جميع الصور والمواد المرئية ملك لـ Mangala Living ومحمية بقوانين حقوق النشر.',
        'يحظر استخدام الصور بدون إذن خطي، بما في ذلك الأغراض التجارية، والأسواق الإلكترونية، والحملات الترويجية.',
        'يجب الحفاظ على العلامة المائية والاعتمادات. في حالة الإسناد، يجب ذكر "Mangala Living" مع رابط إلى الموقع الرسمي.',
        'يتم منح التراخيص بصفة غير حصرية، ومحددة بسياق الاستخدام والمدة المتفق عليها.'
      ],
      permittedHeading: 'أمثلة على الاستخدام المسموح',
      permittedItems: [
        'التغطية الإعلامية والمقالات التحريرية مع إسناد واضح.',
        'عروض المشاريع، والكتالوجات، ومواد العروض التقديمية بعد الحصول على موافقة خطية.',
        'مواد التسويق الرقمية أو المطبوعة التي تروّج لتعاون رسمي مع Mangala Living.'
      ],
      copyrightHeading: 'حقوق النشر والإسناد',
      copyrightParagraph:
        'تحتوي كل صورة على علامة مائية رقمية وبيانات وصفية لحماية حقوق النشر. يجب أن يتضمن الاستخدام مع الإسناد اسم "Mangala Living" ورابطًا إلى https://mangala-living.com.',
      requestHeading: 'كيفية طلب ترخيص استخدام الصور',
      requestIntro: 'اتبع الخطوات التالية للحصول على موافقة ترخيص رسمية:',
      requestSteps: [
        'أرسل نموذج طلب الترخيص أو تواصل معنا عبر WhatsApp/البريد الإلكتروني.',
        'اذكر غرض الاستخدام، وقنوات النشر، ومدة الحملة.',
        'سيقوم فريقنا بإرسال حزمة الترخيص، والأسعار، وشروط الاستخدام.',
        'يصبح الترخيص ساريًا بعد الدفع (إن وجد) وتوقيع اتفاقية الترخيص.'
      ]
    },
    cta: {
      heading: 'هل تحتاج إلى ترخيص رسمي؟',
      description:
        'تواصل مع فريقنا للحصول على حزمة ترخيص تجارية أو تحريرية مخصّصة لمشروعك القادم.',
      button: 'تواصل مع Mangala Living'
    }
  },
  zh: {
    meta: {
      title: '图片使用与授权政策 - Mangala Living',
      description: 'Mangala Living 图片授权政策、版权说明，以及如何获取商业使用许可。'
    },
    hero: {
      title: '图片使用与授权',
      subtitle: '关于版权、授权政策以及如何申请使用 Mangala Living 图像的官方指南。',
      imageAlt: 'Mangala Living 图片使用与授权',
      imageTitle: 'Mangala Living 图片授权政策',
      caption: 'Mangala Living 图片授权与使用 - 贝卡西工业家具工坊'
    },
    sections: {
      usageHeading: '图片使用条款',
      usageIntro: '我们致力于维护 Mangala Living 的品牌形象。使用我们的视觉素材前，请遵循以下要求：',
      usageItems: [
        '所有照片和视觉素材均为 Mangala Living 的财产，并受版权法保护。',
        '未经书面许可，不得使用我们的图片，包括商业、商城或推广用途。',
        '不得移除水印或署名。使用时须注明 “Mangala Living” 并附上官方网站链接。',
        '授权为非独占性质，仅限于约定的使用场景和期限。'
      ],
      permittedHeading: '允许使用的示例',
      permittedItems: [
        '带有明确署名的媒体报道和编辑内容。',
        '在获得书面许可后用于项目方案、目录或提案资料。',
        '用于宣传与 Mangala Living 官方合作的数字或印刷营销材料。'
      ],
      copyrightHeading: '版权与署名',
      copyrightParagraph:
        '每张图片都包含数字水印和元数据以保护版权。署名使用时必须注明 “Mangala Living” 并附上 https://mangala-living.com 链接。',
      requestHeading: '如何申请图片使用授权',
      requestIntro: '请按照以下步骤申请官方授权：',
      requestSteps: [
        '提交授权申请表或通过 WhatsApp/电子邮件与我们联系。',
        '说明使用目的、发布渠道及活动周期。',
        '我们的团队将发送授权方案、费用及使用条款。',
        '在付款（如适用）并签署授权协议后，授权即生效。'
      ]
    },
    cta: {
      heading: '需要官方授权？',
      description: '联系我们，为您的项目提供定制的商业或编辑使用授权方案。',
      button: '联系 Mangala Living'
    }
  },
  ja: {
    meta: {
      title: '画像使用およびライセンスについて - Mangala Living',
      description:
        'Mangala Living の画像ライセンス方針、著作権の詳細、および商用利用の許可取得方法。'
    },
    hero: {
      title: '画像使用とライセンス',
      subtitle:
        '著作権、ライセンス方針、Mangala Living の画像使用許可の申請方法に関する公式ガイド。',
      imageAlt: 'Mangala Living 画像使用とライセンス',
      imageTitle: 'Mangala Living 画像ライセンス規約',
      caption: 'Mangala Living 画像ライセンスと使用 - ベカシ工業家具ワークショップ'
    },
    sections: {
      usageHeading: '画像使用に関する規定',
      usageIntro: 'Mangala Living のブランド価値を守るため、以下の条件を必ずご確認ください。',
      usageItems: [
        'すべての写真・ビジュアルは Mangala Living の所有物であり、著作権法によって保護されています。',
        '書面による許可なく画像を使用することは禁止されています（商用利用、マーケットプレイス、プロモーション等を含む）。',
        'ウォーターマークやクレジット表記を削除しないでください。クレジット表記を行う場合は「Mangala Living」と公式サイトへのリンクを必ず記載してください。',
        'ライセンスは非独占的であり、合意した使用範囲と期間内に限定されます。'
      ],
      permittedHeading: '使用が許可される例',
      permittedItems: [
        '明確なクレジット表記を伴うメディア掲載や編集記事。',
        '書面による承認を得た後のプロジェクト提案書、カタログ、プレゼン資料。',
        'Mangala Living と公式に協業していることを示すデジタルまたは印刷のマーケティング素材。'
      ],
      copyrightHeading: '著作権とクレジット',
      copyrightParagraph:
        '各画像には著作権保護のためのデジタル透かしとメタデータが含まれています。クレジット表記を行う場合は「Mangala Living」と https://mangala-living.com へのリンクを必ず記載してください。',
      requestHeading: 'ライセンス申請の手順',
      requestIntro: '公式な使用許可を取得するには、以下の手順に従ってください。',
      requestSteps: [
        'ライセンス申請フォームを送信するか、WhatsApp／メールでご連絡ください。',
        '使用目的、掲載媒体、キャンペーン期間を明記してください。',
        '当社よりライセンスパッケージ、料金、利用条件をお送りします。',
        '必要な支払い（該当する場合）とライセンス契約への署名完了後、ライセンスが有効になります。'
      ]
    },
    cta: {
      heading: '公式ライセンスが必要ですか？',
      description:
        '商用または編集用途に合わせたライセンスパッケージについては、お気軽に Mangala Living までお問い合わせください。',
      button: 'Mangala Living に問い合わせる'
    }
  },
  es: {
    meta: {
      title: 'Uso y Licencia de Imágenes - Mangala Living',
      description:
        'Política de licencias de imágenes de Mangala Living, detalles de copyright y cómo obtener permiso para uso comercial.'
    },
    hero: {
      title: 'Uso y Licencia de Imágenes',
      subtitle:
        'Guía oficial sobre derechos de autor, políticas de licencia y cómo solicitar permiso para utilizar las imágenes de Mangala Living.',
      imageAlt: 'Uso y licencia de imágenes de Mangala Living',
      imageTitle: 'Política de licencia de imágenes de Mangala Living',
      caption: 'Uso y licencia de imágenes de Mangala Living - Taller de muebles industriales en Bekasi'
    },
    sections: {
      usageHeading: 'Términos de uso de las imágenes',
      usageIntro:
        'Nos comprometemos a proteger la identidad de la marca Mangala Living. Revisa los siguientes requisitos antes de utilizar nuestros recursos visuales:',
      usageItems: [
        'Todas las fotos y recursos visuales son propiedad de Mangala Living y están protegidos por leyes de derechos de autor.',
        'Está prohibido utilizar las imágenes sin permiso escrito, incluidos fines comerciales, marketplaces y campañas promocionales.',
        'No se debe eliminar el crédito ni la marca de agua. En caso de atribución, debe mencionarse “Mangala Living” con un enlace al sitio oficial.',
        'Las licencias se conceden de manera no exclusiva y se limitan al contexto y periodo acordados.'
      ],
      permittedHeading: 'Ejemplos de uso permitido',
      permittedItems: [
        'Cobertura editorial y notas de prensa con atribución clara.',
        'Propuestas de proyectos, catálogos o presentaciones una vez obtenida la autorización por escrito.',
        'Materiales de marketing digitales o impresos que promocionen una colaboración oficial con Mangala Living.'
      ],
      copyrightHeading: 'Derechos de autor y atribución',
      copyrightParagraph:
        'Cada imagen contiene marcas de agua digitales y metadatos para proteger los derechos de autor. La atribución debe incluir “Mangala Living” y un enlace a https://mangala-living.com.',
      requestHeading: 'Cómo solicitar una licencia de uso',
      requestIntro: 'Sigue estos pasos para solicitar la aprobación oficial:',
      requestSteps: [
        'Envía el formulario de solicitud de licencia o contáctanos por WhatsApp/Correo electrónico.',
        'Describe el propósito de uso, los canales de publicación y la duración de la campaña.',
        'Nuestro equipo enviará el paquete de licencia, tarifas y términos de uso.',
        'La licencia entra en vigor una vez realizado el pago (si aplica) y firmado el acuerdo de licencia.'
      ]
    },
    cta: {
      heading: '¿Necesitas una licencia oficial?',
      description:
        'Contacta a nuestro equipo para recibir un paquete de licencia comercial o editorial adaptado a tu proyecto.',
      button: 'Contactar a Mangala Living'
    }
  },
  fr: {
    meta: {
      title: 'Utilisation et Licence des Images - Mangala Living',
      description:
        'Politique de licence des images Mangala Living, détails sur le droit d’auteur et procédures pour obtenir une autorisation d’usage commercial.'
    },
    hero: {
      title: 'Utilisation & Licence des Images',
      subtitle:
        'Guide officiel sur le droit d’auteur, les politiques de licence et la manière de demander l’autorisation d’utiliser les visuels Mangala Living.',
      imageAlt: 'Utilisation et licence des images Mangala Living',
      imageTitle: 'Politique de licence des images Mangala Living',
      caption: 'Utilisation et licence des images Mangala Living - Atelier de mobilier industriel de Bekasi'
    },
    sections: {
      usageHeading: 'Conditions d’utilisation des images',
      usageIntro:
        'Nous nous engageons à protéger l’identité de marque de Mangala Living. Merci de respecter les règles suivantes avant d’utiliser nos contenus visuels :',
      usageItems: [
        'Toutes les photos et visuels sont la propriété de Mangala Living et protégés par le droit d’auteur.',
        'L’utilisation des images sans autorisation écrite est interdite, y compris pour des usages commerciaux, marketplaces ou promotionnels.',
        'Les crédits et filigranes ne doivent pas être supprimés. En cas d’attribution, mentionnez “Mangala Living” avec un lien vers le site officiel.',
        'Les licences sont accordées de manière non exclusive et limitées au contexte et à la durée convenus.'
      ],
      permittedHeading: 'Exemples d’utilisation autorisée',
      permittedItems: [
        'Articles éditoriaux et couvertures médiatiques avec attribution claire.',
        'Propositions de projets, catalogues ou documents de présentation après accord écrit.',
        'Supports marketing imprimés ou digitaux promouvant une collaboration officielle avec Mangala Living.'
      ],
      copyrightHeading: 'Droit d’auteur & attribution',
      copyrightParagraph:
        'Chaque image comporte un filigrane numérique et des métadonnées pour assurer la protection du droit d’auteur. Toute attribution doit mentionner “Mangala Living” et inclure le lien https://mangala-living.com.',
      requestHeading: 'Comment demander une licence d’utilisation',
      requestIntro: 'Suivez les étapes ci-dessous pour obtenir une autorisation officielle :',
      requestSteps: [
        'Remplissez le formulaire de demande de licence ou contactez-nous via WhatsApp/Email.',
        'Précisez l’objectif d’utilisation, les supports de diffusion et la durée de la campagne.',
        'Notre équipe vous enverra le pack de licence, les tarifs et les conditions d’utilisation.',
        'La licence devient effective après paiement (le cas échéant) et signature de l’accord de licence.'
      ]
    },
    cta: {
      heading: 'Besoin d’une licence officielle ?',
      description:
        'Contactez notre équipe pour obtenir un pack de licence commerciale ou éditoriale adapté à votre projet.',
      button: 'Contacter Mangala Living'
    }
  },
  ko: {
    meta: {
      title: '이미지 사용 및 라이선스 정책 - Mangala Living',
      description: 'Mangala Living 이미지 라이선스 정책, 저작권 안내, 그리고 상업적 사용 허가를 받는 방법.'
    },
    hero: {
      title: '이미지 사용 및 라이선스',
      subtitle:
        'Mangala Living 이미지의 저작권과 라이선스 정책, 사용 허가 신청 방법에 대한 공식 가이드입니다.',
      imageAlt: 'Mangala Living 이미지 사용 및 라이선스',
      imageTitle: 'Mangala Living 이미지 라이선스 정책',
      caption: 'Mangala Living 이미지 사용 및 라이선스 - 베카시 산업용 가구 공방'
    },
    sections: {
      usageHeading: '이미지 사용 조건',
      usageIntro: 'Mangala Living 브랜드 아이덴티티 보호를 위해 다음 사항을 반드시 준수해 주세요.',
      usageItems: [
        '모든 사진과 비주얼 자료는 Mangala Living의 자산이며 저작권법의 보호를 받습니다.',
        '서면 허가 없이 이미지를 사용하는 것은 금지됩니다. (상업적, 마켓플레이스, 프로모션 목적 포함)',
        '워터마크와 출처 표기를 삭제할 수 없습니다. 출처 표기를 할 경우 “Mangala Living”과 공식 웹사이트 링크를 반드시 기재해야 합니다.',
        '라이선스는 비독점적이며 합의된 사용 범위와 기간에 한해 유효합니다.'
      ],
      permittedHeading: '허용되는 사용 예시',
      permittedItems: [
        '명확한 출처 표기가 있는 보도자료 및 편집용 기사.',
        '서면 승인을 받은 이후의 프로젝트 제안서, 카탈로그, 프레젠테이션 자료.',
        'Mangala Living과의 공식 협업을 홍보하는 디지털 또는 인쇄 마케팅 자료.'
      ],
      copyrightHeading: '저작권 및 출처 표기',
      copyrightParagraph:
        '각 이미지는 저작권 보호를 위한 디지털 워터마크와 메타데이터를 포함하고 있습니다. 출처 표기 시 “Mangala Living”과 https://mangala-living.com 링크를 반드시 포함해 주세요.',
      requestHeading: '이미지 라이선스 신청 방법',
      requestIntro: '공식 라이선스를 신청하려면 다음 단계를 따라 주세요.',
      requestSteps: [
        '라이선스 신청서를 제출하거나 WhatsApp/이메일로 연락해 주세요.',
        '사용 목적, 게시 채널, 캠페인 기간을 명시해 주세요.',
        '당사 팀이 라이선스 패키지, 비용, 사용 조건을 안내해 드립니다.',
        '비용 결제(해당되는 경우)와 라이선스 계약서 서명 완료 후 라이선스가 효력이 발생합니다.'
      ]
    },
    cta: {
      heading: '공식 라이선스가 필요하신가요?',
      description:
        '다가오는 프로젝트에 맞는 맞춤형 상업/편집 용 라이선스 패키지를 받으려면 팀에 문의해 주세요.',
      button: 'Mangala Living 문의하기'
    }
  }
}

const HERO_IMAGE_URL =
  'https://mangala-living.com/assets/pngtree-a-welder-works-with-metal-in-a-factory-shop.webp'

const ImageLicense: React.FC = () => {
  const location = useLocation()
  const [language, setLanguage] = useState<LanguageCode>(() => {
    return getCurrentLanguage(location.pathname, location.search)
  })

  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [location.pathname, location.search, language])

  // IP detection for first visit (only if no stored preference)
  useEffect(() => {
    const stored = getStoredLanguage()
    const urlLang = getCurrentLanguage(location.pathname, location.search)

    if (stored || urlLang !== 'en') {
      return
    }

    const detectIP = async () => {
      const ipLang = await detectLanguageFromIP()
      if (ipLang && !stored) {
        setLanguage(ipLang)
      }
    }

    detectIP()
  }, [])
  const isIndonesian = language === 'id'
  const t = IMAGE_LICENSE_TRANSLATIONS[language] ?? IMAGE_LICENSE_TRANSLATIONS.en

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  const imageObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: HERO_IMAGE_URL,
    contentUrl: HERO_IMAGE_URL,
    caption: t.hero.caption,
    description: t.meta.description,
    creditText: 'Mangala Living',
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Mangala Living',
      url: 'https://mangala-living.com'
    },
    ...DEFAULT_IMAGE_RIGHTS_METADATA
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t.meta.title,
    description: t.meta.description,
    url: localizedUrls.canonical,
    inLanguage: localeMeta.lang,
    mainEntity: {
      '@type': 'Organization',
      name: 'Mangala Living',
      url: 'https://mangala-living.com'
    },
    primaryImageOfPage: {
      ...imageObjectSchema
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mangala Living',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mangala-living.com/logo.png',
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      }
    }
  }

  return (
    <div className="image-license-page">
      <Helmet
        htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': language }}
      >
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link
            key={`image-license-hreflang-${alternate.hrefLang}`}
            rel="alternate"
            hrefLang={alternate.hrefLang}
            href={alternate.href}
          />
        ))}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:image" content={HERO_IMAGE_URL} />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(imageObjectSchema)}</script>
      </Helmet>

      <Header isIndonesian={isIndonesian} language={language} />

      <section className="image-license-hero">
        <div className="image-license-hero-media">
          <img
            src={heroImage}
            alt={t.hero.imageAlt}
            title={t.hero.imageTitle}
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="image-license-hero"
          />
          <div className="image-license-hero-overlay" />
        </div>
        <div className="image-license-hero-content">
          <h1 className="image-license-hero-title">{t.hero.title}</h1>
          <p className="image-license-hero-subtitle">{t.hero.subtitle}</p>
        </div>
      </section>

      <main className="image-license-main">
        <section className="image-license-section" id="usage-terms">
          <h2>{t.sections.usageHeading}</h2>
          <p>{t.sections.usageIntro}</p>
          <ul className="image-license-list">
            {t.sections.usageItems.map((item, index) => (
              <li key={`usage-item-${index}`}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="image-license-section" id="permitted-uses">
          <h2>{t.sections.permittedHeading}</h2>
          <ul className="image-license-list">
            {t.sections.permittedItems.map((item, index) => (
              <li key={`permitted-item-${index}`}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="image-license-section" id="copyright">
          <h2>{t.sections.copyrightHeading}</h2>
          <p>{t.sections.copyrightParagraph}</p>
        </section>

        <section className="image-license-section" id="request-license">
          <h2>{t.sections.requestHeading}</h2>
          <p>{t.sections.requestIntro}</p>
          <ul className="image-license-list">
            {t.sections.requestSteps.map((item, index) => (
              <li key={`request-step-${index}`}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="image-license-cta" aria-labelledby="image-license-cta-title">
          <div className="image-license-cta-content">
            <h2 id="image-license-cta-title">{t.cta.heading}</h2>
            <p>{t.cta.description}</p>
            <a
              className="image-license-button"
              href="https://mangala-living.com/contact-us"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.cta.button}
            </a>
          </div>
        </section>
      </main>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default ImageLicense
