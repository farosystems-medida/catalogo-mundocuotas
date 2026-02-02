import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')

    console.log('🔍 Image Proxy - Request URL completa:', request.url)
    console.log('🔍 Image Proxy - URL solicitada:', imageUrl)
    console.log('🔍 Image Proxy - Headers:', Object.fromEntries(request.headers.entries()))

    if (!imageUrl) {
      console.log('❌ Image Proxy - No URL parameter')
      return new NextResponse('Missing url parameter', { status: 400 })
    }

    // Decodificar la URL si está codificada
    let decodedUrl = imageUrl
    try {
      decodedUrl = decodeURIComponent(imageUrl)
      console.log('🔍 Image Proxy - URL decodificada:', decodedUrl)
    } catch (e) {
      console.log('⚠️ Image Proxy - No se pudo decodificar URL, usando original')
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
      'delos.com.ar',
      'fornax.com.ar',
      'atma.com.ar'
    ]

    // Validación: Solo verificar que sea una URL válida con http/https
    // Permitir TODOS los dominios externos ya que las URLs vienen de nuestra base de datos controlada
    let isAllowed = false
    let hostname = ''
    let urlToFetch = decodedUrl

    try {
      const urlObj = new URL(decodedUrl)
      hostname = urlObj.hostname.toLowerCase()

      // Permitir cualquier URL que sea http o https
      isAllowed = urlObj.protocol === 'http:' || urlObj.protocol === 'https:'

      if (isAllowed) {
        console.log('✅ Image Proxy - URL válida permitida:', hostname)
        console.log('✅ Image Proxy - Protocol:', urlObj.protocol)
      } else {
        console.log('❌ Image Proxy - Protocol no permitido:', urlObj.protocol)
      }
    } catch (error) {
      console.log('⚠️ Image Proxy - Error al parsear URL:', error)
      console.log('⚠️ Image Proxy - URL que falló:', decodedUrl)

      // Intentar con la URL original sin decodificar
      try {
        const urlObj = new URL(imageUrl)
        hostname = urlObj.hostname.toLowerCase()
        isAllowed = urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
        urlToFetch = imageUrl
        console.log('✅ Image Proxy - Usando URL original sin decodificar:', imageUrl)
      } catch (error2) {
        console.log('❌ Image Proxy - Fallo también con URL original:', error2)
        isAllowed = false
      }
    }

    if (!isAllowed) {
      console.log('❌ Image Proxy - Invalid URL:', imageUrl)
      console.log('❌ Image Proxy - Decoded URL:', decodedUrl)
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
    if (urlToFetch.includes('postimg')) {
      headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      headers['Referer'] = 'https://postimages.org/'
      headers['Sec-Fetch-Dest'] = 'image'
      headers['Sec-Fetch-Mode'] = 'no-cors'
      headers['Sec-Fetch-Site'] = 'cross-site'
    } else if (urlToFetch.includes('musimundo.com') || urlToFetch.includes('medias.musimundo.com')) {
      // Para Musimundo, headers muy específicos para evitar bloqueos
      headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      headers['Accept'] = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      headers['Accept-Encoding'] = 'gzip, deflate, br, zstd'
      headers['Accept-Language'] = 'es-419,es;q=0.9'
      headers['Referer'] = 'https://www.musimundo.com/'
      headers['Sec-Ch-Ua'] = '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"'
      headers['Sec-Ch-Ua-Mobile'] = '?0'
      headers['Sec-Ch-Ua-Platform'] = '"Windows"'
      headers['Sec-Fetch-Dest'] = 'image'
      headers['Sec-Fetch-Mode'] = 'no-cors'
      headers['Sec-Fetch-Site'] = 'same-site'
      headers['Priority'] = 'i'
      delete headers['Cache-Control'] // Eliminar el no-cache
    } else if (urlToFetch.includes('store.midea.com.ar') || urlToFetch.includes('daewooherramientas.com.ar') || urlToFetch.includes('escorial.com.ar') || urlToFetch.includes('nataliahogar.com.ar') || urlToFetch.includes('megatone.net') || urlToFetch.includes('philco.com.ar') || urlToFetch.includes('ken-brown.com.ar') || urlToFetch.includes('laanonima.com.ar') || urlToFetch.includes('madeiramadeira.com.br') || urlToFetch.includes('cloudinary.com') || urlToFetch.includes('piletin.com.ar') || urlToFetch.includes('dibra.com.ar') || urlToFetch.includes('samsungar.vtexassets.com') || urlToFetch.includes('tcl.com') || urlToFetch.includes('delos.com.ar') || urlToFetch.includes('fornax.com.ar') || urlToFetch.includes('atma.com.ar')) {
      // Para sitios de tiendas, usar headers de navegador para evitar bloqueos
      headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      headers['Accept-Encoding'] = 'gzip, deflate, br'
      headers['Accept-Language'] = 'es-ES,es;q=0.9,en;q=0.8'
      headers['Sec-Fetch-Dest'] = 'image'
      headers['Sec-Fetch-Mode'] = 'no-cors'
      headers['Sec-Fetch-Site'] = 'cross-site'

      // Para ATMA específicamente, agregar referer
      if (urlToFetch.includes('atma.com.ar')) {
        headers['Referer'] = 'https://atma.com.ar/'
      }
    } else {
      // Para otros (Facebook, Supabase), usar headers de bot de Facebook
      headers['User-Agent'] = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
      headers['Referer'] = 'https://www.facebook.com/'
    }

    console.log('📤 Image Proxy - Haciendo fetch a:', urlToFetch)
    console.log('📤 Image Proxy - Con headers:', headers)

    const response = await fetch(urlToFetch, { headers })

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