import React from 'react'

interface MessageRendererProps {
  text: string
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ text }) => {
  const renderText = (text: string) => {
    // Split text by markdown-style links and buttons
    const parts = text.split(/(\[.*?\]\(.*?\))/g)
    
    return parts.map((part, index) => {
      // Check if this part is a markdown link
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
      
      if (linkMatch) {
        const [, linkText, url] = linkMatch
        
        // Check if it's a WhatsApp link
        if (url.includes('wa.me')) {
          return (
            <button
              key={index}
              className="whatsapp-link-button"
              onClick={() => window.open(url, '_blank')}
            >
              {linkText}
            </button>
          )
        }
        
        // Check if it's a product link
        if (url.includes('naturraextal.com/product')) {
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="product-link"
            >
              {linkText}
            </a>
          )
        }
        
        // Regular link
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="regular-link"
          >
            {linkText}
          </a>
        )
      }
      
      // Regular text
      return <span key={index}>{part}</span>
    })
  }

  return <div className="message-content-rendered">{renderText(text)}</div>
}

export default MessageRenderer

