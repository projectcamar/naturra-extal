<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Naturra Extal - XML Sitemap</title>
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
            max-width: 1400px;
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
          
          .url-list {
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
          }
          
          td {
            padding: 16px 20px;
            vertical-align: top;
          }
          
          .url-link {
            color: #2c2c2c;
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            display: block;
            transition: all 0.3s ease;
            word-break: break-all;
          }
          
          .url-link:hover {
            color: #004D2C;
            padding-left: 10px;
          }
          
          .priority {
            background: #004D2C;
            color: #fff;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
          }
          
          .priority-high {
            background: #28a745;
          }
          
          .priority-medium {
            background: #ffc107;
            color: #333;
          }
          
          .priority-low {
            background: #6c757d;
          }
          
          .changefreq {
            color: #666;
            font-size: 0.9rem;
            text-transform: capitalize;
            background: #f8f9fa;
            padding: 4px 10px;
            border-radius: 6px;
            display: inline-block;
          }
          
          .lastmod {
            color: #666;
            font-size: 0.9rem;
            font-family: 'Courier New', monospace;
            background: #f8f9fa;
            padding: 6px 12px;
            border-radius: 6px;
            display: inline-block;
          }
          
          .image-indicator {
            background: #e3f2fd;
            color: #1976d2;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 0.85rem;
            display: inline-block;
            font-weight: 600;
          }
          
          .lang-indicator {
            background: #fff3cd;
            color: #856404;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            display: inline-block;
            margin-top: 4px;
            margin-right: 4px;
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
          
          .table-wrapper {
            overflow-x: auto;
          }
          
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
            
            header, .info-box, .url-list, footer {
              padding: 20px;
            }
            
            h1 {
              font-size: 1.75rem;
            }
            
            .subtitle {
              font-size: 0.95rem;
            }
            
            table {
              font-size: 0.85rem;
            }
            
            th, td {
              padding: 10px 8px;
            }
            
            .url-link {
              font-size: 0.9rem;
            }
            
            th:nth-child(3),
            th:nth-child(4),
            td:nth-child(3),
            td:nth-child(4) {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1><span class="brand">NATURRA EXTAL</span> XML Sitemap</h1>
            <p class="subtitle">Premium Indonesian Agricultural Commodities - Bekasi, Indonesia</p>
          </header>
          
          <div class="info-box">
            <p><strong>📋 What is this?</strong> This is an XML Sitemap for search engines like Google, Bing, and others.</p>
            <p><strong>🔍 Purpose:</strong> It helps search engines discover and index our website content more efficiently.</p>
            <p><strong>📊 Total URLs:</strong> <span class="count-badge"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span></p>
          </div>
          
          <div class="url-list">
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th style="width: 50%;">URL</th>
                    <th style="width: 15%;">Priority</th>
                    <th style="width: 15%;">Change Freq</th>
                    <th style="width: 20%;">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <a href="{sitemap:loc}" class="url-link" target="_blank">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                        <xsl:if test="count(image:image) &gt; 0">
                          <div style="margin-top: 6px;">
                            <span class="image-indicator">
                              📷 <xsl:value-of select="count(image:image)"/> image<xsl:if test="count(image:image) &gt; 1">s</xsl:if>
                            </span>
                          </div>
                        </xsl:if>
                        <xsl:if test="count(xhtml:link) &gt; 0">
                          <div style="margin-top: 6px;">
                            <xsl:for-each select="xhtml:link">
                              <span class="lang-indicator">
                                🌐 <xsl:value-of select="@hreflang"/>
                              </span>
                            </xsl:for-each>
                          </div>
                        </xsl:if>
                      </td>
                      <td>
                        <xsl:variable name="priority" select="sitemap:priority"/>
                        <span>
                          <xsl:attribute name="class">
                            <xsl:text>priority</xsl:text>
                            <xsl:choose>
                              <xsl:when test="$priority &gt;= 0.8"> priority-high</xsl:when>
                              <xsl:when test="$priority &gt;= 0.5"> priority-medium</xsl:when>
                              <xsl:otherwise> priority-low</xsl:otherwise>
                            </xsl:choose>
                          </xsl:attribute>
                          <xsl:value-of select="format-number($priority * 100, '0')"/>%
                        </span>
                      </td>
                      <td>
                        <span class="changefreq">
                          <xsl:value-of select="sitemap:changefreq"/>
                        </span>
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
          </div>
          
          <footer>
            <p>Generated by Naturra Extal Sitemap Generator</p>
            <p style="margin-top: 10px;">
              <a href="https://naturraextal.com" target="_blank">← Back to Naturra Extal</a> | 
              <a href="/sitemap.xml">View Sitemap Index</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
