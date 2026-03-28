import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import './WhatsAppButton.css'
import { trackEvent } from '../utils/analytics'
import MessageRenderer from './MessageRenderer'
import { detectLanguage, type LanguageCode } from '../utils/languageManager'
import { trackWhatsAppClick } from '../utils/whatsappTracking'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface UserInfo {
  name: string
  email: string
  isCompleted: boolean
}

// Comprehensive translations for 8 languages
const CHAT_TRANSLATIONS: Record<LanguageCode, {
  subtitle: string
  initialMessage: string
  continueWhatsApp: string
  typeMessage: string
  contactUs: string
  formIntro: string
  nameLabel: string
  namePlaceholder: string
  submit: string
  thankYouMessage: (name: string) => string
  whatsappRedirectMessage: string
  simpleResponses: string[]
}> = {
  id: {
    subtitle: "Kami akan membalas secepat mungkin",
    initialMessage: "Hai ??! Selamat datang di Naturra Extal. Beri tahu saya jika Anda memiliki pertanyaan.\n\nJangan ragu untuk whatsapp di [+628951395752](https://wa.me/+628951395752)",
    continueWhatsApp: "Lanjutkan di WhatsApp",
    typeMessage: "Ketik pesan Anda...",
    contactUs: "Hubungi Kami",
    formIntro: "Hei, silakan tinggalkan detail Anda agar kami dapat menghubungi Anda bahkan jika Anda sudah tidak berada di situs ini.",
    nameLabel: "Nama",
    namePlaceholder: "Pastikan untuk menambahkan nama Anda",
    submit: "Kirim",
    thankYouMessage: (name: string) => `Terima kasih, ${name}! Saya di sini untuk membantu Anda dengan informasi terkait produk Naturra Extal. Bagaimana saya bisa membantu Anda hari ini?`,
    whatsappRedirectMessage: "Halo, saya tertarik dengan produk komoditas pertanian Naturra Extal. Bisakah saya mendapatkan informasi lebih lanjut?",
    simpleResponses: [
      "Terima kasih atas pertanyaan Anda! Untuk informasi lebih lanjut tentang komoditas pertanian kami (Cocoa, Cengkeh, Cocopeat), silakan hubungi kami langsung di WhatsApp.",
      "Saya senang membantu Anda! Untuk konsultasi produk ekspor dan spesifikasi, silakan hubungi tim kami di WhatsApp.",
      "Pertanyaan yang bagus! Tim kami akan dengan senang hati membantu Anda. Silakan hubungi kami di WhatsApp untuk informasi lengkap mengenai suplai komoditas kami."
    ]
  },
  en: {
    subtitle: "We'll reply as soon as we can",
    initialMessage: "Hi there ??! Welcome to the Naturra Extal. Let me know if you have any questions.\n\nFeel free to whatsapp on [+628951395752](https://wa.me/+628951395752)",
    continueWhatsApp: "Continue on WhatsApp",
    typeMessage: "Type your message...",
    contactUs: "Contact Us",
    formIntro: "Hey there, please leave your details so we can contact you even if you are no longer on the site.",
    nameLabel: "Name",
    namePlaceholder: "Make sure to add your name",
    submit: "Submit",
    thankYouMessage: (name: string) => `Thank you, ${name}! I am here to assist you with information related to Naturra Extal commodities. How may I help you today?`,
    whatsappRedirectMessage: "Hello, I'm interested in Naturra Extal agricultural commodities. Can I get more information?",
    simpleResponses: [
      "Thank you for your question! For more information about our agricultural commodities (Cocoa, Cloves, Cocopeat), please contact us directly on WhatsApp.",
      "I'm happy to help! For export product consultation and specifications, please contact our team on WhatsApp.",
      "Great question! Our team will be happy to assist you. Please contact us on WhatsApp for complete information about our commodity supply."
    ]
  },
  ar: {
    subtitle: "سوف نرد في أقرب وقت ممكن",
    initialMessage: "مرحباً ??! مرحباً بك في Naturra Extal. أخبرني إذا كان لديك أي أسئلة.\n\nلا تتردد في التواصل عبر الواتساب على [+628951395752](https://wa.me/+628951395752)",
    continueWhatsApp: "المتابعة على واتساب",
    typeMessage: "اكتب رسالتك...",
    contactUs: "اتصل بنا",
    formIntro: "مرحباً، يرجى ترك تفاصيلك حتى نتمكن من الاتصال بك حتى لو لم تعد على الموقع.",
    nameLabel: "الاسم",
    namePlaceholder: "تأكد من إضافة اسمك",
    submit: "إرسال",
    thankYouMessage: (name: string) => `شكراً لك، ${name}! أنا هنا لمساعدتك بمعلومات حول سلع Naturra Extal. كيف يمكنني مساعدتك اليوم؟`,
    whatsappRedirectMessage: "مرحباً، أنا مهتم بالسلع الزراعية من Naturra Extal. هل يمكنني الحصول على مزيد من المعلومات؟",
    simpleResponses: [
      "شكراً لسؤالك! للحصول على مزيد من المعلومات حول سلعنا الزراعية (الكاكاو، القرنفل، جوز الهند)، يرجى الاتصال بنا مباشرة على الواتساب.",
      "أنا سعيد لمساعدتك! للاستشارة حول منتجات التصدير والمواصفات، يرجى الاتصال بفريقنا على الواتساب.",
      "سؤال رائع! فريقنا سيكون سعيداً لمساعدتك. يرجى الاتصال بنا على الواتساب للحصول على معلومات كاملة حول توريدنا للسلع."
    ]
  },
  zh: {
    subtitle: "我们会尽快回复",
    initialMessage: "你好 ??! 欢迎来到 Naturra Extal。如果您有任何问题，请告诉我。\n\n欢迎通过 WhatsApp 联系我们： [+628951395752](https://wa.me/+628951395752)",
    continueWhatsApp: "在 WhatsApp 上继续",
    typeMessage: "输入您的消息...",
    contactUs: "联系我们",
    formIntro: "您好，请留下您的详细信息，以便即使您离开网站，我们也能联系到您。",
    nameLabel: "姓名",
    namePlaceholder: "请确保添加您的姓名",
    submit: "提交",
    thankYouMessage: (name: string) => `谢谢，${name}！我在这里协助您了解 Naturra Extal 农产品的相关信息。我今天能如何帮助您？`,
    whatsappRedirectMessage: "您好，我对 Naturra Extal 农产品感兴趣。能否获得更多信息？",
    simpleResponses: [
      "感谢您的提问！有关我们农产品（可可、丁香、椰糠）的更多信息，请直接在 WhatsApp 上联系我们。",
      "我很乐意帮助您！如需出口产品咨询和规格，请联系我们的 WhatsApp 团队。",
      "很好的问题！我们的团队会很乐意帮助您。请通过 WhatsApp 联系我们以获取有关我们产品供应的完整信息。"
    ]
  },
  ja: {
    subtitle: "できるだけ早く返信いたします",
    initialMessage: "こんにちは ??! Naturra Extal へようこそ。ご質問がございましたら、お知らせください。\n\nWhatsApp でお気軽にご連絡ください： [+628951395752](https://wa.me/+628951395752)",
    continueWhatsApp: "WhatsApp で続ける",
    typeMessage: "メッセージを入力...",
    contactUs: "お問い合わせ",
    formIntro: "こんにちは。サイトを離れた後でも連絡が取れるよう、詳細情報を残してください。",
    nameLabel: "お名前",
    namePlaceholder: "お名前を必ず追加してください",
    submit: "送信",
    thankYouMessage: (name: string) => `${name} さん、ありがとうございます！Naturra Extal の農産物に関する情報をお手伝いするためにここにいます。今日はどのようにお手伝いできますか？`,
    whatsappRedirectMessage: "こんにちは、Naturra Extal の農産物に興味があります。詳しい情報をいただけますか？",
    simpleResponses: [
      "ご質問ありがとうございます！当社の農産物（ココア、クローブ、ココピート）の詳細については、WhatsApp で直接お問い合わせください。",
      "お手伝いできて光栄です！輸出製品の相談や仕様については、WhatsApp でチームにご連絡ください。",
      "素晴らしい質問です！チームが喜んでサポートいたします。当社の製品供給に関する詳細情報については、WhatsApp でお問い合わせください。"
    ]
  },
  es: {
    subtitle: "Responderemos lo antes posible",
    initialMessage: "¡Hola ??! Bienvenido a Naturra Extal. Avísame si tienes alguna pregunta.\n\nNo dudes en contactarnos por WhatsApp en [+628951395752](https://wa.me/+628951395752)",
    continueWhatsApp: "Continuar en WhatsApp",
    typeMessage: "Escribe tu mensaje...",
    contactUs: "Contáctanos",
    formIntro: "Hola, por favor deja tus datos para que podamos contactarte incluso si ya no estás en el sitio.",
    nameLabel: "Nombre",
    namePlaceholder: "Asegúrate de agregar tu nombre",
    submit: "Enviar",
    thankYouMessage: (name: string) => `¡Gracias, ${name}! Estoy aquí para ayudarte con información sobre los productos agrícolas de Naturra Extal. ¿Cómo puedo ayudarte hoy?`,
    whatsappRedirectMessage: "Hola, estoy interesado en los productos agrícolas de Naturra Extal. ¿Puedo obtener más información?",
    simpleResponses: [
      "¡Gracias por tu pregunta! Para más información sobre nuestros productos agrícolas (Cacao, Clavo, Cocopeat), contáctanos directamente por WhatsApp.",
      "¡Estoy feliz de ayudar! Para consultas y especificaciones de productos de exportación, contacta a nuestro equipo por WhatsApp.",
      "¡Excelente pregunta! Nuestro equipo estará encantado de ayudarte. Por favor contáctanos por WhatsApp para obtener información completa sobre nuestro suministro de productos."
    ]
  },
  fr: {
    subtitle: "Nous répondrons dès que possible",
    initialMessage: "Salut ??! Bienvenue chez Naturra Extal. Faites-moi savoir si vous avez des questions.\n\nN'hésitez pas à nous contacter sur WhatsApp au [+628951395752](https://wa.me/+628951395752)",
    continueWhatsApp: "Continuer sur WhatsApp",
    typeMessage: "Tapez votre message...",
    contactUs: "Nous contacter",
    formIntro: "Salut, veuillez laisser vos coordonnées pour que nous puissions vous contacter même si vous n'êtes plus sur le site.",
    nameLabel: "Nom",
    namePlaceholder: "Assurez-vous d'ajouter votre nom",
    submit: "Envoyer",
    thankYouMessage: (name: string) => `Merci, ${name} ! Je suis là pour vous aider avec des informations sur les produits agricoles Naturra Extal. Comment puis-je vous aider aujourd'hui ?`,
    whatsappRedirectMessage: "Bonjour, je suis intéressé par les produits agricoles Naturra Extal. Puis-je obtenir plus d'informations ?",
    simpleResponses: [
      "Merci pour votre question ! Pour plus d'informations sur nos produits agricoles (Cacao, Clous de girofle, Cocopeat), contactez-nous directement sur WhatsApp.",
      "Je suis ravi de vous aider ! Pour les consultations et spécifications de produits d'exportation, contactez notre équipe sur WhatsApp.",
      "Excellente question ! Notre équipe sera ravie de vous aider. Veuillez nous contacter sur WhatsApp pour obtenir des informations complètes sur notre approvisionnement en produits."
    ]
  },
  ko: {
    subtitle: "최대한 빨리 답변드리겠습니다",
    initialMessage: "안녕하세요 ??! Naturra Extal에 오신 것을 환영합니다. 궁금한 점이 있으시면 알려주세요.\n\nWhatsApp으로 연락주세요: [+628951395752](https://wa.me/+628951395752)",
    continueWhatsApp: "WhatsApp에서 계속하기",
    typeMessage: "메시지를 입력하세요...",
    contactUs: "문의하기",
    formIntro: "안녕하세요. 사이트를 떠나더라도 연락할 수 있도록 세부 정보를 남겨주세요.",
    nameLabel: "이름",
    namePlaceholder: "이름을 반드시 추가하세요",
    submit: "제출",
    thankYouMessage: (name: string) => `${name}님, 감사합니다! Naturra Extal 농산물에 대한 정보를 도와드리기 위해 여기 있습니다. 오늘 어떻게 도와드릴까요?`,
    whatsappRedirectMessage: "안녕하세요, Naturra Extal 농산물에 관심이 있습니다. 더 많은 정보를 받을 수 있을까요?",
    simpleResponses: [
      "질문해 주셔서 감사합니다! 저희 농산물(코코아, 정향, 코코피트)에 대한 자세한 내용은 WhatsApp으로 직접 문의해 주세요.",
      "도와드릴 수 있어 기쁩니다! 수출 제품 상담 및 사양은 WhatsApp으로 팀에 연락해 주세요.",
      "좋은 질문입니다! 저희 팀이 기꺼이 도와드리겠습니다. 제품 공급에 대한 완전한 정보는 WhatsApp으로 문의해 주세요."
    ]
  }
}


const WhatsAppButton: React.FC = () => {
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)
  const [language, setLanguage] = useState<LanguageCode>('en')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How may I help you with your agricultural commodity needs at Naturra Extal?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    isCompleted: false
  })
  const [firstMessage, setFirstMessage] = useState('')
  const [conversationStage, setConversationStage] = useState<'greeting' | 'collecting_info' | 'assisting'>('collecting_info')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get translations for current language
  const t = CHAT_TRANSLATIONS[language] ?? CHAT_TRANSLATIONS.en

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Language detection effect - respects user's language choice from Header
  useEffect(() => {
    const initLanguage = async () => {
      try {
        const lang = await detectLanguage(location.pathname, location.search)
        setLanguage(lang)

        // Update initial message based on detected language
        const translations = CHAT_TRANSLATIONS[lang] ?? CHAT_TRANSLATIONS.en
        setMessages([{
          id: '1',
          text: translations.initialMessage,
          isUser: false,
          timestamp: new Date()
        }])
      } catch (error) {
        console.log('Language detection failed, using default')
      }
    }

    initLanguage()
  }, [location.pathname, location.search])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      trackEvent.whatsappClick('expand_chat')
    }
  }

  const handleWhatsAppRedirect = () => {
    trackEvent.whatsappClick('redirect_to_whatsapp')
    trackWhatsAppClick('chatbot_continue_to_whatsapp', {
      userInfo: userInfo.isCompleted ? { name: userInfo.name, email: userInfo.email } : null
    })
    const whatsappMessage = t.whatsappRedirectMessage
    const whatsappUrl = `https://wa.me/+628951395752?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }



  const generateSmartResponse = async (): Promise<string> => {
    // Simple response without AI - always redirect to WhatsApp
    return getSimpleResponse()
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (userInfo.name && userInfo.email) {
      setUserInfo(prev => ({ ...prev, isCompleted: true }))
      setConversationStage('assisting')

      // Send lead data to API
      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: userInfo.name,
            email: userInfo.email,
            firstMessage: firstMessage,
            language: language,
            notificationType: 'chatbot_lead'
          }),
        })
      } catch (error) {
        console.error('Failed to send lead data:', error)
      }

      const formMessage: Message = {
        id: Date.now().toString(),
        text: t.thankYouMessage(userInfo.name),
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, formMessage])
    }
  }



  const getSimpleResponse = (): string => {
    // Simple fallback responses without API key
    const responses = t.simpleResponses
    return responses[Math.floor(Math.random() * responses.length)]
  }


  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    // If user hasn't completed info, store the first message and show form
    if (!userInfo.isCompleted) {
      setFirstMessage(inputText)
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, userMessage])
      setInputText('')
      // Form will show automatically since conversationStage is 'collecting_info'
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputText
    setInputText('')
    setIsLoading(true)

    try {
      const aiResponse = await generateSmartResponse()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      // Send email notification with the chat message
      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: userInfo.name,
            email: userInfo.email,
            chatMessage: currentMessage,
            language: language,
            notificationType: 'chatbot_message'
          }),
        })
      } catch (emailError) {
        console.error('Failed to send chat message notification:', emailError)
      }
    } catch (error) {
      console.error('Error generating response:', error)
      // Use simple response for error
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getSimpleResponse(),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="whatsapp-container">
      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div className="whatsapp-chat">
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-title">
                <Bot size={16} />
                <span>Naturra Extal</span>
              </div>
              <div className="chat-subtitle">
                {t.subtitle}
              </div>
            </div>
            <button className="close-chat" onClick={handleExpand} aria-label="Close chat">
              <X size={14} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}>
                <div className="message-avatar">
                  {message.isUser ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className="message-content">
                  <MessageRenderer text={message.text} />
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Form UI for collecting info */}
            {conversationStage === 'collecting_info' && !userInfo.isCompleted && firstMessage && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <Bot size={14} />
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {t.formIntro}
                  </div>
                  <form onSubmit={handleFormSubmit} className="info-form">
                    <div className="form-group">
                      <label>{t.nameLabel}</label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t.namePlaceholder}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <button type="submit" className="submit-form-btn">
                      {t.submit}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <Bot size={14} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.typeMessage}
              disabled={isLoading || Boolean(conversationStage === 'collecting_info' && firstMessage && !userInfo.isCompleted)}
            />
            <button
              className="send-button"
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading || Boolean(conversationStage === 'collecting_info' && firstMessage && !userInfo.isCompleted)}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>

          <div className="chat-footer">
            <button className="whatsapp-redirect" onClick={handleWhatsAppRedirect} aria-label={t.continueWhatsApp}>
              <MessageCircle size={14} />
              <span>{t.continueWhatsApp}</span>
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button className="whatsapp-button" onClick={handleExpand} aria-label={t.contactUs}>
        <MessageCircle size={18} />
        <span>{t.contactUs}</span>
      </button>
    </div>
  )
}

export default WhatsAppButton
