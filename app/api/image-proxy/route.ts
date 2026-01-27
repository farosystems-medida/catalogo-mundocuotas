import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')

    console.log('🔍 Image Proxy - URL solicitada:', imageUrl)

    if (!imageUrl) {
      console.log('❌ Image Proxy - No URL parameter')
      return new NextResponse('Missing url parameter', { status: 400 })
    }

    // Permitir URLs de dominios confiables
    const allowedDomains = [
      'supabase.co',
      'rckwahufvqehuwjwaomq.supabase.co',
      'postimages.org',
      'postimg.cc',
      'i.postimg.cc',
      'store.midea.com.ar',
      'daewooherramientas.com.ar',
      'escorial.com.ar',
      'mlstatic.com',
      'http2.mlstatic.com',
      'nataliahogar.com.ar',
      'megatone.net',
      'philco.com.ar',
      'indelplas.com',
      'arcencohogar.vtexassets.com',
      'arbghprod.vtexassets.com',
      'ken-brown.com.ar',
      'laanonima.com.ar',
      'madeiramadeira.com.br',
      'musimundo.com',
      'medias.musimundo.com',
      'cloudinary.com',
      'piletin.com.ar',
      'dibra.com.ar',
      'samsungar.vtexassets.com',
      'tcl.com',
      'delos.com.ar'
    ]

    // Validación más robusta: extraer el hostname de la URL y comparar
    let isAllowed = false
    try {
      const urlObj = new URL(imageUrl)
      const hostname = urlObj.hostname.toLowerCase()
      console.log('🔍 Image Proxy - Hostname extraído:', hostname)
      isAllowed = allowedDomains.some(domain => {
        const matches = hostname === domain.toLowerCase() || hostname.endsWith('.' + domain.toLowerCase())
        if (matches) {
          console.log('✅ Image Proxy - Dominio permitido:', domain)
        }
        return matches
      })
    } catch (error) {
      console.log('⚠️ Image Proxy - Error parsing URL, usando método alternativo:', error)
      // Si falla el parsing de URL, usar el método anterior
      isAllowed = allowedDomains.some(domain => imageUrl.toLowerCase().includes(domain.toLowerCase()))
    }

    if (!isAllowed) {
      console.log('❌ Image Proxy - Invalid URL (not from allowed domains):', imageUrl)
      console.log('❌ Image Proxy - Dominios permitidos:', allowedDomains)
      return new NextResponse('Invalid URL', { status: 400 })
    }

    console.log('📥 Image Proxy - Fetching image...')

    // Headers especiales según el dominio
    const headers: HeadersInit = {
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
    }

    // Para PostImages, usar headers de navegador normal
    if (imageUrl.includes('postimg')) {
      headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      headers['Referer'] = 'https://postimages.org/'
      headers['Sec-Fetch-Dest'] = 'image'
      headers['Sec-Fetch-Mode'] = 'no-cors'
      headers['Sec-Fetch-Site'] = 'cross-site'
    } else if (imageUrl.includes('store.midea.com.ar') || imageUrl.includes('daewooherramientas.com.ar') || imageUrl.includes('escorial.com.ar') || imageUrl.includes('nataliahogar.com.ar') || imageUrl.includes('megatone.net') || imageUrl.includes('philco.com.ar') || imageUrl.includes('ken-brown.com.ar') || imageUrl.includes('laanonima.com.ar') || imageUrl.includes('madeiramadeira.com.br') || imageUrl.includes('musimundo.com') || imageUrl.includes('cloudinary.com') || imageUrl.includes('piletin.com.ar') || imageUrl.includes('dibra.com.ar') || imageUrl.includes('samsungar.vtexassets.com') || imageUrl.includes('tcl.com') || imageUrl.includes('delos.com.ar')) {
      // Para sitios de tiendas, usar headers de navegador para evitar bloqueos
      headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      headers['Sec-Fetch-Dest'] = 'image'
      headers['Sec-Fetch-Mode'] = 'no-cors'
      headers['Sec-Fetch-Site'] = 'cross-site'
    } else {
      // Para otros (Facebook, Supabase), usar headers de bot de Facebook
      headers['User-Agent'] = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
      headers['Referer'] = 'https://www.facebook.com/'
    }

    const response = await fetch(imageUrl, { headers })

    console.log('📤 Image Proxy - Response status:', response.status)

    if (!response.ok) {
      console.log('❌ Image Proxy - Error:', response.statusText)
      return new NextResponse('Image not found', { status: 404 })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const imageBuffer = await response.arrayBuffer()

    console.log('✅ Image Proxy - Success, content type:', contentType, 'size:', imageBuffer.byteLength)

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('💥 Image Proxy - Error:', error)
    return new NextResponse('Error fetching image', { status: 500 })
  }
}