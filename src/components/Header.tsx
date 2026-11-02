import { useEffect, useState, type FC } from 'react'
import { cn } from '../lib/cn'
import { linkWhatsApp } from '../lib/whatsapp'
import { IconoWhatsApp } from './Iconos'

const ENLACES = [
  { href: '#menu', texto: 'Menú' },
  { href: '#express', texto: 'Express' },
  { href: '#locales', texto: 'Locales' },
] as const

const useBajoDelHero = (): boolean => {
  const [bajo, setBajo] = useState(false)
  useEffect(() => {
    const revisar = () => setBajo(window.scrollY > 24)
    revisar()
    window.addEventListener('scroll', revisar, { passive: true })
    return () => window.removeEventListener('scroll', revisar)
  }, [])
  return bajo
}

export const Header: FC = () => {
  const bajo = useBajoDelHero()
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        aria-label="Principal"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 pl-3 transition-[background-color,box-shadow] duration-200',
          bajo ? 'bg-white/95 shadow-[0_6px_24px_rgb(0_0_0/0.12)] backdrop-blur' : 'bg-transparent',
        )}
      >
        <a href="#inicio" className="shrink-0" aria-label="Tribu, ir al inicio">
          <img src="./assets/logo.webp" alt="" width={564} height={592} className="h-11 w-auto" />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {ENLACES.map((enlace) => (
            <li key={enlace.href}>
              <a href={enlace.href} className="rounded-full px-4 py-2 font-semibold transition-colors hover:bg-tinta/5">
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-4 font-display text-white transition-transform duration-150 ease-out active:scale-96"
        >
          <IconoWhatsApp className="size-5" />
          Pedir
        </a>
      </nav>
    </header>
  )
}
