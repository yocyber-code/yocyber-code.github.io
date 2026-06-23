import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Watchara Sueasakul — Full Stack Developer & Tech Lead',
  description:
    "Watchara Sueasakul (Yoshi) — Full Stack Developer & Technical Lead. Enterprise web architecture across frontend, backend, and cloud.",
  icons: { icon: '/assets/img/favicon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Apply persisted theme before paint to avoid a light/dark flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light')document.body.classList.add('light-theme')}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  )
}
