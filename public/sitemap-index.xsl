<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Naturra Extal - XML Sitemap Index</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          
          header {
            background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
            color: #fff;
            padding: 40px;
            border-bottom: 4px solid #004D2C;
            position: relative;
            overflow: hidden;
          }
          
          header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004D2C' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            opacity: 0.3;
          }
          
          h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
          }
          
          .brand {
            color: #004D2C;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            font-weight: 400;
            position: relative;
            z-index: 1;
          }
          
          .info-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border-left: 4px solid #004D2C;
            padding: 20px 30px;
            margin: 30px 40px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          
          .info-box p {
            margin: 8px 0;
            color: #666;
          }
          
          .info-box strong {
            color: #2c2c2c;
            font-weight: 600;
          }
          
          .sitemap-list {
            padding: 40px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
          }
          
          thead {
            background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
            color: #fff;
          }
          
          th {
            padding: 18px 20px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
            border-bottom: 3px solid #004D2C;
          }
          
          tbody tr {
            border-bottom: 1px solid #e9ecef;
            transition: all 0.3s ease;
          }
          
          tbody tr:hover {
            background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            transform: translateX(5px);
          }
          
          td {
            padding: 20px;
          }
          
          .sitemap-url {
            color: #2c2c2c;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.05rem;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .sitemap-url::before {
            content: '📄';
            font-size: 1.2rem;
          }
          
          .sitemap-url:hover {
            color: #004D2C;
            transform: translateX(5px);
          }
          
          .sitemap-url::after {
            content: '→';
            opacity: 0;
            transition: opacity 0.3s ease;
            margin-left: -5px;
          }
          
          .sitemap-url:hover::after {
            opacity: 1;
          }
          
          .lastmod {
            color: #666;
            font-size: 0.95rem;
            font-family: 'Courier New', monospace;
            background: #f8f9fa;
            padding: 6px 12px;
            border-radius: 6px;
            display: inline-block;
          }
          
          footer {
            background: #f8f9fa;
            padding: 30px 40px;
            text-align: center;
            color: #666;
            border-top: 1px solid #dee2e6;
          }
          
          footer a {
            color: #004D2C;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }
          
          footer a:hover {
            color: #2c2c2c;
            text-decoration: underline;
          }
          
          .count-badge {
            background: #004D2C;
            color: #fff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
            margin-left: 10px;
          }
          
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
            
            header, .info-box, .sitemap-list, footer {
              padding: 20px;
            }
            
            h1 {
              font-size: 1.75rem;
            }
            
            .subtitle {
              font-size: 0.95rem;
            }
            
            table {
              font-size: 0.9rem;
            }
            
            th, td {
              padding: 12px 10px;
            }
            
            .sitemap-url {
              font-size: 0.95rem;
            }
            
            .lastmod {
              font-size: 0.85rem;
              padding: 4px 8px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1><span class="brand">NATURRA EXTAL</span> XML Sitemap Index</h1>
            <p class="subtitle">Premium Indonesian Agricultural Commodities - Bekasi, Indonesia</p>
          </header>
          
          <div class="info-box">
            <p><strong>📋 What is this?</strong> This is an XML Sitemap Index, designed for search engines like Google, Bing, and others.</p>
            <p><strong>🔍 Purpose:</strong> It helps search engines discover and index all pages on our website more efficiently.</p>
            <p><strong>📊 Total Sitemaps:</strong> <span class="count-badge"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></span></p>
          </div>
          
          <div class="sitemap-list">
            <table>
              <thead>
                <tr>
                  <th>Sitemap URL</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}" class="sitemap-url">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="lastmod">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          
          <footer>
            <p>Generated by Naturra Extal Sitemap Generator</p>
            <p style="margin-top: 10px;">
              <a href="https://naturraextal.com" target="_blank">← Back to Naturra Extal</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
