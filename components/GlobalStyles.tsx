'use client'

import { useConfiguracionWebContext } from '@/contexts/ConfiguracionWebContext'
import { useEffect } from 'react'

// Carga (o reemplaza) el <link> de Google Fonts para la tipografía elegida en el admin
const loadGoogleFont = (fontFamily: string, linkId: string) => {
  const fontName = fontFamily.split(',')[0].trim().replace(/['"]/g, '')
  const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;500;600;700&display=swap`

  const existing = document.getElementById(linkId) as HTMLLinkElement | null
  if (existing) {
    if (existing.href !== href) existing.href = href
    return
  }

  const link = document.createElement('link')
  link.id = linkId
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

export default function GlobalStyles() {
  const { configuracion } = useConfiguracionWebContext()

  useEffect(() => {
    if (!configuracion) return

    // Cargar dinámicamente la fuente de Google elegida para los títulos de sección
    loadGoogleFont(configuracion.font_family_primary, 'google-font-primary')

    // Aplicar variables CSS personalizadas al documento
    const root = document.documentElement

    // Colores
    root.style.setProperty('--primary-color', configuracion.primary_color)
    root.style.setProperty('--secondary-color', configuracion.secondary_color)
    root.style.setProperty('--accent-color', configuracion.accent_color)

    // Tipografías
    root.style.setProperty('--font-family-primary', configuracion.font_family_primary)
    root.style.setProperty('--font-family-secondary', configuracion.font_family_secondary)
    
    // Tamaños de texto (desktop)
    root.style.setProperty('--section-title-size', `${configuracion.section_title_size}px`)
    root.style.setProperty('--section-subtitle-size', `${configuracion.section_subtitle_size}px`)
    root.style.setProperty('--section-text-size', `${configuracion.section_text_size}px`)
    
    // Tamaños de texto (mobile)
    root.style.setProperty('--mobile-section-title-size', `${configuracion.mobile_section_title_size}px`)
    root.style.setProperty('--mobile-section-subtitle-size', `${configuracion.mobile_section_subtitle_size}px`)
    root.style.setProperty('--mobile-section-text-size', `${configuracion.mobile_section_text_size}px`)
    
    // Dimensiones de elementos
    root.style.setProperty('--search-box-width', `${configuracion.search_box_width}px`)
    root.style.setProperty('--search-box-height', `${configuracion.search_box_height}px`)
    root.style.setProperty('--mobile-search-box-width', `${configuracion.mobile_search_box_width}px`)
    root.style.setProperty('--mobile-search-box-height', `${configuracion.mobile_search_box_height}px`)
    
    // Alturas de secciones
    root.style.setProperty('--home-section-height', `${configuracion.home_section_height}px`)
    root.style.setProperty('--mobile-home-section-height', `${configuracion.mobile_home_section_height}px`)

    // Aplicar font-family al body
    document.body.style.fontFamily = configuracion.font_family_primary

  }, [configuracion])

  if (!configuracion) return null

  return (
    <style jsx global>{`
      :root {
        --primary-color: ${configuracion.primary_color};
        --secondary-color: ${configuracion.secondary_color};
        --accent-color: ${configuracion.accent_color};
        --font-family-primary: ${configuracion.font_family_primary};
        --font-family-secondary: ${configuracion.font_family_secondary};
        --section-title-size: ${configuracion.section_title_size}px;
        --section-subtitle-size: ${configuracion.section_subtitle_size}px;
        --section-text-size: ${configuracion.section_text_size}px;
        --mobile-section-title-size: ${configuracion.mobile_section_title_size}px;
        --mobile-section-subtitle-size: ${configuracion.mobile_section_subtitle_size}px;
        --mobile-section-text-size: ${configuracion.mobile_section_text_size}px;
        --search-box-width: ${configuracion.search_box_width}px;
        --search-box-height: ${configuracion.search_box_height}px;
        --mobile-search-box-width: ${configuracion.mobile_search_box_width}px;
        --mobile-search-box-height: ${configuracion.mobile_search_box_height}px;
        --home-section-height: ${configuracion.home_section_height}px;
        --mobile-home-section-height: ${configuracion.mobile_home_section_height}px;
      }

      body {
        font-family: var(--font-family-primary);
      }

      .primary-color {
        color: var(--primary-color);
      }

      .bg-primary-color {
        background-color: var(--primary-color);
      }

      .secondary-color {
        color: var(--secondary-color);
      }

      .bg-secondary-color {
        background-color: var(--secondary-color);
      }

      .accent-color {
        color: var(--accent-color);
      }

      .bg-accent-color {
        background-color: var(--accent-color);
      }

      .section-title {
        font-size: var(--section-title-size);
        font-family: var(--font-family-primary);
      }

      .section-subtitle {
        font-size: var(--section-subtitle-size);
        font-family: var(--font-family-secondary);
      }

      .section-text {
        font-size: var(--section-text-size);
        font-family: var(--font-family-secondary);
      }

      .search-box {
        width: var(--search-box-width);
        height: var(--search-box-height);
      }

      .home-section {
        min-height: var(--home-section-height);
      }

      @media (max-width: 768px) {
        .section-title {
          font-size: var(--mobile-section-title-size);
        }

        .section-subtitle {
          font-size: var(--mobile-section-subtitle-size);
        }

        .section-text {
          font-size: var(--mobile-section-text-size);
        }

        .search-box {
          width: var(--mobile-search-box-width);
          height: var(--mobile-search-box-height);
        }

        .home-section {
          min-height: var(--mobile-home-section-height);
        }
      }

      /* Aplicar colores primarios a botones y elementos principales */
      .btn-primary {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
      }

      .btn-primary:hover {
        background-color: var(--accent-color);
        border-color: var(--accent-color);
      }

      .btn-secondary {
        background-color: var(--secondary-color);
        border-color: var(--secondary-color);
      }

      .btn-accent {
        background-color: var(--accent-color);
        border-color: var(--accent-color);
      }

      /* Links con color primario */
      a.link-primary {
        color: var(--primary-color);
      }

      a.link-primary:hover {
        color: var(--accent-color);
      }
    `}</style>
  )
}