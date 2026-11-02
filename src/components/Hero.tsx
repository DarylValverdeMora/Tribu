import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, type FC } from 'react'
import { linkWhatsApp } from '../lib/whatsapp'
import { EnlaceBoton } from './Boton'
import { EstadoAhora } from './EstadoAhora'
import { Fruta } from './Fruta'
import { IconoWhatsApp } from './Iconos'

gsap.registerPlugin(useGSAP)

type FotoHero = { src: string; alt: string; ancho: number; alto: number; clase: string }

// Fotos de la sesión de Tribu (las mismas de sus historias), sin texto encima
const FOTOS_HERO: readonly FotoHero[] = [
  { src: './assets/hero-morado.webp', alt: 'Batido morado de Tribu con moras, arándanos y fresas', ancho: 372, alto: 426, clase: 'right-0 top-0 rotate-6' },
  { src: './assets/hero-naranja.webp', alt: 'Mano sosteniendo un jugo de naranja de Tribu', ancho: 383, alto: 402, clase: 'left-0 bottom-0 -rotate-5' },
]

// Las cuatro franjas del logo, convertidas en la ola que baja hacia el menú
const OlaDelLogo: FC = () => (
  <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="block h-24 w-full md:h-40" aria-hidden="true" focusable="false">
    <path d="M0 40C240 110 520 130 760 90S1220 0 1440 50V220H0Z" fill="var(--tribu-rojo)" />
    <path d="M0 80C260 140 540 150 780 116S1230 40 1440 84V220H0Z" fill="var(--tribu-naranja)" />
    <path d="M0 116C280 170 560 176 800 146S1240 80 1440 118V220H0Z" fill="var(--tribu-amarillo)" />
    <path d="M0 152C300 196 580 200 820 176S1250 120 1440 152V220H0Z" fill="var(--tribu-lima)" />
    <path d="M0 190C320 214 600 218 840 204S1260 170 1440 188V220H0Z" fill="var(--tribu-hielo)" />
  </svg>
)

type HeroProps = { movimientoReducido: boolean }

export const Hero: FC<HeroProps> = ({ movimientoReducido }) => {
  const contenedor = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (movimientoReducido) return
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } })
      tl.from('.foto-hero', { y: 60, scale: 0.9, autoAlpha: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' })
        .from('.logo-hero', { scale: 0, rotation: -20, autoAlpha: 0, duration: 0.5 }, '-=0.3')
        .from('.fruta-hero', { scale: 0, autoAlpha: 0, stagger: 0.07, duration: 0.45 }, '-=0.3')
        .from('.texto-hero > *', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, 0.2)
    },
    { scope: contenedor, dependencies: [movimientoReducido] },
  )

  return (
    <section id="inicio" ref={contenedor} className="relative overflow-hidden bg-hielo pt-24 md:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-16">
        <div className="relative order-first mx-auto aspect-[10/8] w-[min(88vw,28rem)] md:order-last md:aspect-[1/1] md:w-full md:max-w-md">
          {FOTOS_HERO.map((foto) => (
            <img
              key={foto.src}
              src={foto.src}
              alt={foto.alt}
              width={foto.ancho}
              height={foto.alto}
              className={`foto-hero absolute aspect-square w-[58%] rounded-[1.75rem] border-4 border-white object-cover shadow-[0_18px_40px_rgb(0_0_0/0.22)] ${foto.clase}`}
            />
          ))}
          <img
            src="./assets/logo.webp"
            alt="Logo de Tribu"
            width={564}
            height={592}
            className="logo-hero absolute right-[4%] bottom-[2%] z-10 w-[30%] drop-shadow-[0_6px_10px_rgb(0_0_0/0.2)]"
          />
          <Fruta tipo="fresa" className="fruta-hero absolute top-[2%] left-[6%] z-10 w-[16%] -rotate-12 drop-shadow-[0_8px_10px_rgb(0_0_0/0.18)]" />
          <Fruta tipo="limon" className="fruta-hero absolute top-[4%] left-[24%] md:top-[26%] z-10 w-[14%] rotate-12 drop-shadow-[0_8px_10px_rgb(0_0_0/0.18)]" />
        </div>

        <div className="texto-hero flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <EstadoAhora className="text-sm" />
          <h1 className="font-display text-[clamp(2.6rem,11vw,5.25rem)] leading-[0.95] text-tinta">
            Batidos de buenas vibras en Turrialba
          </h1>
          <p className="max-w-md text-lg leading-snug text-tinta/80 md:text-xl">
            En agua, en leche o con prote. Armá tu pedido aquí mismo y escogé si lo recogés en Plaza Rojitas o Plaza Nuri, o si te lo llevamos con Express.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <EnlaceBoton href="#menu" intencion="tinta">
              Hacer mi pedido
            </EnlaceBoton>
            <EnlaceBoton href={linkWhatsApp()} externo intencion="whatsapp">
              <IconoWhatsApp className="size-6" />
              WhatsApp
            </EnlaceBoton>
          </div>
        </div>
      </div>
      <OlaDelLogo />
    </section>
  )
}
