import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
// legacy mangala image import removed
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './Contact.css'

type ContactTranslation = {
  meta: {
    title: string
    description: string
    keywords: string
  }
  heroTitle: string
  introTitle: string
  form: {
    title: string
    subtitle: string
    fields: {
      name: string
      email: string
      phone: string
      subject: string
      message: string
    }
    submit: string
  }
  findUs: {
    heading: string
    workshopLabel: string
  }
  whatsapp: {
    greeting: string
    nameLabel: string
    emailLabel: string
    phoneLabel: string
    subjectLabel: string
    messageLabel: string
    closing: string
  }
}

const CONTACT_TRANSLATIONS: Record<LanguageCode, ContactTranslation> = {
  en: {
    meta: {
      title: 'Contact Furniture Workshop Bekasi: WhatsApp, Location, Operating Hours - Mangala Living',
      description:
        'How to contact Mangala Living? WhatsApp: +6288801146881 (1-3 hour response), Email: lifewithmangala@gmail.com, Workshop address: Jl. Raya Setu Cibitung Bekasi (10 minutes from Cibitung toll gate, 25 minutes from East Jakarta). Operating hours: Monday-Saturday 08.00-17.00 WIB. Service area: FREE survey for Bekasi, East Jakarta, Cikarang. Free industrial furniture consultation via WhatsApp.',
      keywords:
        'contact mangala living, whatsapp furniture bekasi, furniture workshop bekasi contact, mangala living location, workshop address bekasi, operating hours furniture bekasi, free furniture consultation'
    },
    heroTitle: 'Contact Us',
    introTitle:
      "We're happy to discuss your custom furniture needs or answer any questions. Get in touch with our welding workshop team below.",
    form: {
      title: 'Enquiry Form',
      subtitle:
        'Contact our Customer Services team by completing the form. We will endeavour to respond within 24 hours.',
      fields: {
        name: 'Your name',
        email: 'Email',
        phone: 'Phone number',
        subject: 'Subject',
        message: 'Write your message here'
      },
      submit: 'SEND ENQUIRY'
    },
    findUs: {
      heading: 'Find Us',
      workshopLabel: 'Workshop Bekasi:'
    },
    whatsapp: {
      greeting: 'Hello Mangala Living,',
      nameLabel: 'Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      subjectLabel: 'Subject',
      messageLabel: 'Message',
      closing: 'Thank you!'
    }
  },
  id: {
    meta: {
      title: 'Hubungi Workshop Furniture Bekasi: WhatsApp, Lokasi, Jam Operasional - Mangala Living',
      description:
        'Bagaimana cara menghubungi Mangala Living? WhatsApp: +6288801146881 (response 1-3 jam), Email: lifewithmangala@gmail.com, Alamat workshop: Jl. Raya Setu Cibitung Bekasi (10 menit dari tol Cibitung, 25 menit dari Jakarta Timur). Jam buka: Senin-Sabtu 08.00-17.00 WIB. Area melayani: FREE survey Bekasi, Jakarta Timur, Cikarang. Konsultasi furniture industrial gratis via WhatsApp.',
      keywords:
        'hubungi mangala living, whatsapp furniture bekasi, nomor workshop furniture bekasi, lokasi workshop furniture bekasi, alamat mangala living bekasi, jam buka furniture bekasi, cara menghubungi workshop furniture, konsultasi furniture industrial gratis, kontak furniture besi bekasi, email mangala living, survey furniture gratis bekasi'
    },
    heroTitle: 'Hubungi Kami',
    introTitle:
      'Kami senang mendiskusikan kebutuhan custom furniture Anda atau menjawab pertanyaan. Hubungi tim workshop kami di bawah ini.',
    form: {
      title: 'Formulir Pertanyaan',
      subtitle:
        'Hubungi tim Customer Service kami dengan mengisi formulir di bawah ini. Kami akan berusaha merespons dalam 24 jam.',
      fields: {
        name: 'Nama Anda',
        email: 'Email',
        phone: 'Nomor telepon',
        subject: 'Subjek',
        message: 'Tulis pesan Anda di sini'
      },
      submit: 'KIRIM PERTANYAAN'
    },
    findUs: {
      heading: 'Temukan Kami',
      workshopLabel: 'Workshop Bekasi:'
    },
    whatsapp: {
      greeting: 'Halo Mangala Living,',
      nameLabel: 'Nama',
      emailLabel: 'Email',
      phoneLabel: 'Telepon',
      subjectLabel: 'Subjek',
      messageLabel: 'Pesan',
      closing: 'Terima kasih!'
    }
  },
  ar: {
    meta: {
      title: 'تواصل مع ورشة الأثاث في بيكاسي: واتساب، الموقع، ساعات العمل - Mangala Living',
      description:
        'كيف تتواصل مع Mangala Living؟ واتساب: +6288801146881 (استجابة خلال 1-3 ساعات)، البريد الإلكتروني: lifewithmangala@gmail.com، عنوان الورشة: Jl. Raya Setu Cibitung Bekasi (10 دقائق من مخرج تول تشيبيتونغ، 25 دقيقة من شرق جاكرتا). ساعات العمل: الاثنين إلى السبت 08:00-17:00 بتوقيت جاكرتا. نطاق الخدمة: زيارة مجانية لبيكاسي، شرق جاكرتا، تشيكارانغ. استشارة مجانية للأثاث الصناعي عبر واتساب.',
      keywords:
        'اتصال Mangala Living، ورشة أثاث بيكاسي، واتساب أثاث بيكاسي، عنوان ورشة Mangala Living، ساعات عمل الأثاث في بيكاسي، استشارة أثاث صناعي مجانية'
    },
    heroTitle: 'اتصل بنا',
    introTitle:
      'يسعدنا مناقشة احتياجات الأثاث المخصص لديك أو الإجابة عن أي أسئلة. تواصل مع فريق ورشة اللحام الخاص بنا أدناه.',
    form: {
      title: 'نموذج الاستفسار',
      subtitle:
        'تواصل مع فريق خدمة العملاء لدينا من خلال تعبئة النموذج. سنبذل جهدنا للرد خلال 24 ساعة.',
      fields: {
        name: 'اسمك',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        subject: 'الموضوع',
        message: 'اكتب رسالتك هنا'
      },
      submit: 'إرسال الاستفسار'
    },
    findUs: {
      heading: 'اعثر علينا',
      workshopLabel: 'ورشة بيكاسي:'
    },
    whatsapp: {
      greeting: 'مرحباً Mangala Living،',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      subjectLabel: 'الموضوع',
      messageLabel: 'الرسالة',
      closing: 'شكراً لك!'
    }
  },
  zh: {
    meta: {
      title: '联系贝卡西家具工坊：WhatsApp、地址、营业时间 - Mangala Living',
      description:
        '如何联系 Mangala Living？WhatsApp：+6288801146881（1-3 小时内回复），邮箱：lifewithmangala@gmail.com，工坊地址：Jl. Raya Setu Cibitung Bekasi（距 Cibitung 收费站 10 分钟，距雅加达东区 25 分钟）。营业时间：周一至周六 08:00-17:00 WIB。服务范围：贝卡西、雅加达东区、芝卡朗提供免费勘察。通过 WhatsApp 免费咨询工业风家具。',
      keywords:
        '联系 Mangala Living, 贝卡西家具 WhatsApp, 家具工坊联系方式, Mangala Living 地址, 贝卡西家具营业时间, 免费工业家具咨询'
    },
    heroTitle: '联系我们',
    introTitle: '我们乐意与您讨论定制家具需求或解答任何疑问。欢迎联系下方的工坊团队。',
    form: {
      title: '咨询表单',
      subtitle: '填写下方表单即可与我们的客服团队联系，我们会在24小时内回复。',
      fields: {
        name: '您的姓名',
        email: '邮箱',
        phone: '电话号码',
        subject: '主题',
        message: '在此填写您的留言'
      },
      submit: '发送咨询'
    },
    findUs: {
      heading: '找到我们',
      workshopLabel: '贝卡西工坊：'
    },
    whatsapp: {
      greeting: '您好 Mangala Living，',
      nameLabel: '姓名',
      emailLabel: '邮箱',
      phoneLabel: '电话',
      subjectLabel: '主题',
      messageLabel: '留言',
      closing: '谢谢！'
    }
  },
  ja: {
    meta: {
      title: 'ベカシ家具工房へのお問い合わせ：WhatsApp・所在地・営業時間 - Mangala Living',
      description:
        'Mangala Living への連絡方法: WhatsApp: +6288801146881（1〜3 時間以内に返信）、メール: lifewithmangala@gmail.com、工房住所: Jl. Raya Setu Cibitung Bekasi（チビトゥン料金所から 10 分、東ジャカルタから 25 分）。営業時間: 月曜日〜土曜日 08:00-17:00 WIB。対応エリア: ベカシ、東ジャカルタ、チカランで無料現地調査。WhatsApp で工業家具の無料相談が可能です。',
      keywords:
        'Mangala Living 問い合わせ, ベカシ 家具 WhatsApp, 家具工房 連絡先, Mangala Living 住所, 家具 営業時間, 工業系家具 無料相談'
    },
    heroTitle: 'お問い合わせ',
    introTitle:
      'カスタム家具に関するご相談やご質問があれば、お気軽に下記の工房チームまでご連絡ください。',
    form: {
      title: 'お問い合わせフォーム',
      subtitle:
        'フォームにご入力いただければ、カスタマーサービスチームが24時間以内の返信に努めます。',
      fields: {
        name: 'お名前',
        email: 'メールアドレス',
        phone: '電話番号',
        subject: '件名',
        message: 'ここにメッセージをご記入ください'
      },
      submit: '送信する'
    },
    findUs: {
      heading: 'アクセス',
      workshopLabel: 'ベカシ工房：'
    },
    whatsapp: {
      greeting: 'Mangala Living 様、',
      nameLabel: 'お名前',
      emailLabel: 'メール',
      phoneLabel: '電話',
      subjectLabel: '件名',
      messageLabel: 'メッセージ',
      closing: 'ありがとうございます！'
    }
  },
  es: {
    meta: {
      title: 'Contactar Taller de Muebles en Bekasi: WhatsApp, Ubicación y Horario - Mangala Living',
      description:
        '¿Cómo contactar a Mangala Living? WhatsApp: +6288801146881 (respuesta en 1-3 horas), correo: lifewithmangala@gmail.com, dirección del taller: Jl. Raya Setu Cibitung Bekasi (a 10 minutos del peaje de Cibitung, 25 minutos del Este de Yakarta). Horario: lunes a sábado 08:00-17:00 WIB. Área de servicio: encuesta gratuita para Bekasi, Yakarta Este y Cikarang. Consulta gratuita sobre muebles industriales por WhatsApp.',
      keywords:
        'contactar Mangala Living, WhatsApp muebles Bekasi, taller muebles Bekasi, dirección Mangala Living, horario taller Bekasi, consulta muebles industriales gratis'
    },
    heroTitle: 'Contáctenos',
    introTitle:
      'Estamos encantados de conversar sobre tus necesidades de mobiliario a medida o responder cualquier pregunta. Ponte en contacto con nuestro equipo de taller a continuación.',
    form: {
      title: 'Formulario de consulta',
      subtitle:
        'Contacta con nuestro equipo de atención al cliente completando el formulario. Intentaremos responder en un plazo de 24 horas.',
      fields: {
        name: 'Tu nombre',
        email: 'Correo electrónico',
        phone: 'Número de teléfono',
        subject: 'Asunto',
        message: 'Escribe tu mensaje aquí'
      },
      submit: 'ENVIAR CONSULTA'
    },
    findUs: {
      heading: 'Encuéntranos',
      workshopLabel: 'Taller de Bekasi:'
    },
    whatsapp: {
      greeting: 'Hola Mangala Living,',
      nameLabel: 'Nombre',
      emailLabel: 'Correo electrónico',
      phoneLabel: 'Teléfono',
      subjectLabel: 'Asunto',
      messageLabel: 'Mensaje',
      closing: '¡Gracias!'
    }
  },
  fr: {
    meta: {
      title: 'Contact Atelier de Mobilier à Bekasi : WhatsApp, Adresse, Horaires - Mangala Living',
      description:
        "Comment contacter Mangala Living ? WhatsApp : +6288801146881 (réponse en 1 à 3 heures), email : lifewithmangala@gmail.com, adresse de l'atelier : Jl. Raya Setu Cibitung Bekasi (10 minutes du péage de Cibitung, 25 minutes de Jakarta Est). Horaires : lundi-samedi 08h00-17h00 WIB. Zone desservie : visite gratuite pour Bekasi, Jakarta Est, Cikarang. Consultation gratuite sur les meubles industriels via WhatsApp.",
      keywords:
        'contacter Mangala Living, WhatsApp mobilier Bekasi, atelier mobilier Bekasi, adresse Mangala Living, horaires atelier Bekasi, consultation mobilier industriel gratuite'
    },
    heroTitle: 'Contactez-nous',
    introTitle:
      'Nous sommes ravis de discuter de vos besoins en mobilier sur mesure ou de répondre à vos questions. Contactez notre équipe d’atelier ci-dessous.',
    form: {
      title: 'Formulaire de demande',
      subtitle:
        'Contactez notre équipe Service Client en remplissant le formulaire. Nous nous efforcerons de répondre sous 24 heures.',
      fields: {
        name: 'Votre nom',
        email: 'Email',
        phone: 'Numéro de téléphone',
        subject: 'Objet',
        message: 'Écrivez votre message ici'
      },
      submit: 'ENVOYER LA DEMANDE'
    },
    findUs: {
      heading: 'Nous trouver',
      workshopLabel: 'Atelier de Bekasi :'
    },
    whatsapp: {
      greeting: 'Bonjour Mangala Living,',
      nameLabel: 'Nom',
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      subjectLabel: 'Objet',
      messageLabel: 'Message',
      closing: 'Merci !'
    }
  },
  ko: {
    meta: {
      title: '베카시 가구 공방 문의: WhatsApp, 위치, 운영 시간 - Mangala Living',
      description:
        'Mangala Living에 연락하는 방법은? WhatsApp: +6288801146881 (1-3시간 내 응답), 이메일: lifewithmangala@gmail.com, 공방 주소: Jl. Raya Setu Cibitung Bekasi (치비툰 톨게이트에서 10분, 동자카르타에서 25분). 운영 시간: 월~토 08:00-17:00 WIB. 서비스 지역: 베카시, 동자카르타, 치카랑 무료 방문. WhatsApp으로 산업용 가구 무료 상담.',
      keywords:
        'Mangala Living 문의, 베카시 가구 WhatsApp, 가구 공방 연락처, Mangala Living 주소, 베카시 가구 운영 시간, 산업용 가구 무료 상담'
    },
    heroTitle: '문의하기',
    introTitle: '맞춤 가구가 필요하시거나 궁금한 점이 있다면 아래 작업실 팀에 연락해주세요.',
    form: {
      title: '문의 양식',
      subtitle:
        '양식을 작성해 주시면 고객지원팀이 24시간 이내에 답변드릴 수 있도록 하겠습니다.',
      fields: {
        name: '성함',
        email: '이메일',
        phone: '전화번호',
        subject: '주제',
        message: '메시지를 입력해주세요'
      },
      submit: '문의 보내기'
    },
    findUs: {
      heading: '찾아오시는 길',
      workshopLabel: '베카시 공방:'
    },
    whatsapp: {
      greeting: '안녕하세요 Mangala Living,',
      nameLabel: '이름',
      emailLabel: '이메일',
      phoneLabel: '전화번호',
      subjectLabel: '주제',
      messageLabel: '메시지',
      closing: '감사합니다!'
    }
  }
}

const Contact: React.FC = () => {
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
  const t = CONTACT_TRANSLATIONS[language] ?? CONTACT_TRANSLATIONS.en

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    trackWhatsAppClick('contact_form_submit', {
      name: formData.name,
      subject: formData.subject
    })

    const messageLines = [
      t.whatsapp.greeting,
      '',
      `${t.whatsapp.nameLabel}: ${formData.name}`,
      `${t.whatsapp.emailLabel}: ${formData.email}`,
      `${t.whatsapp.phoneLabel}: ${formData.phone}`,
      `${t.whatsapp.subjectLabel}: ${formData.subject}`,
      '',
      `${t.whatsapp.messageLabel}:`,
      formData.message,
      '',
      t.whatsapp.closing
    ]

    const whatsappUrl = `https://wa.me/+6288801146881?text=${encodeURIComponent(messageLines.join('\n'))}`
    window.open(whatsappUrl, '_blank')

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  return (
    <div className="contact-page">
      <Helmet
        htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': language }}
      >
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link
            key={`contact-hreflang-${alternate.hrefLang}`}
            rel="alternate"
            hrefLang={alternate.hrefLang}
            href={alternate.href}
          />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
      </Helmet>

      <Header isIndonesian={isIndonesian} language={language} />

      <section className="contact-hero">
        <div className="contact-hero-image">
          <img
            src={heroImage}
            alt="Contact Mangala Living - Hubungi Workshop Furniture Industrial Bekasi - WhatsApp +6288801146881"
            title="Contact Mangala Living - Get in Touch with Industrial Furniture Manufacturer"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="contact-hero"
            data-category="contact"
          />
          <div className="contact-hero-overlay"></div>
        </div>
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">{t.heroTitle}</h1>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-container">
          <div className="contact-intro">
            <h2 className="contact-main-title">{t.introTitle}</h2>
          </div>

          <div className="enquiry-form-wrapper">
            <h3 className="enquiry-form-title">{t.form.title}</h3>
            <p className="enquiry-form-subtitle">{t.form.subtitle}</p>

            <form className="enquiry-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">{t.form.fields.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">{t.form.fields.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone">{t.form.fields.phone}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">{t.form.fields.subject}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-field-full">
                <label htmlFor="message">{t.form.fields.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                ></textarea>
              </div>

              <div className="form-submit-wrapper">
                <button type="submit" className="send-enquiry-btn">
                  {t.form.submit}
                </button>
              </div>
            </form>
          </div>

          <div style={{ textAlign: 'center', margin: '40px auto 32px' }}>
            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: '1.1rem', color: '#2c2c2c' }}>
              {t.findUs.heading}
            </div>
            <div style={{ fontWeight: 600, marginBottom: 8, color: '#8B7355' }}>
              {t.findUs.workshopLabel}
            </div>
            <div style={{ marginBottom: 8, lineHeight: '1.6' }}>
              <a
                href="https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2c2c2c', textDecoration: 'underline' }}
              >
                Jl. Raya Setu Cibitung - Bekasi, Telajung, Kec. Cikarang Bar., Kabupaten Bekasi, Jawa Barat
                17320
              </a>
            </div>
            <div>
              <a
                href="https://wa.me/+6288801146881"
                style={{ color: '#8B7355', textDecoration: 'underline', fontWeight: '500' }}
                onClick={() => trackWhatsAppClick('contact_page_workshop_address')}
                target="_blank"
                rel="noopener noreferrer"
              >
                +6288801146881
              </a>
            </div>
          </div>

          <div style={{ margin: '0 auto 40px', maxWidth: 900 }}>
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: 8
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4698705313735!2d107.04449967316903!3d-6.3331217619628015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699155096769b1%3A0x32e8009b574bfb5e!2sMangala%20Living%20(Workshop)!5e0!3m2!1sen!2sid!4v1761932272164!5m2!1sen!2sid"
                width="600"
                height="450"
                style={{
                  border: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mangala Living Workshop Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default Contact