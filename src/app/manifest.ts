import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nooro Todo App',
    short_name: 'NooroTodo',
    description: 'A simple todo application',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0D0D',
    theme_color: '#0D0D0D',
    icons: [
      {
        src: '/vercel.svg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/vercel.svg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
