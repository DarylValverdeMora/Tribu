import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, type FC } from 'react'
import type { TipoFruta } from '../data/favoritos'
import { linkWhatsApp } from '../lib/whatsapp'
import { EnlaceBoton } from './Boton'
import { EstadoAhora } from './EstadoAhora'
import { Fruta } from './Fruta'
import { IconoWhatsApp } from './Iconos'

gsap.registerPlugin(useGSAP)

type FrutaDelLogo = { tipo: TipoFruta; clase: string }

// Fruta que rodea el logo, como en el arte de las historias
const FRUTAS_DEL_LOGO: readonly FrutaDelLogo[] = [
  { tipo: 'fresa', clase: 'left-[-2%] top-[34%] w-[20%] -rotate-12' },
  { tipo: 'limon', clase: 'right-[0%] top-[4%] w-[20%] rotate-12' },
  { tipo: 'mango', clase: 'right-[-4%] bottom-[18%] w-[24%] rotate-6' },
  { tipo: 'sandia', clase: 'left-[4%] bottom-[0%] w-[26%] -rotate-20' },
  { tipo: 'hierbabuena', clase: 'right-[26%] -top-[6%] w-[16%] rotate-12' },
]

// Las cuatro franjas del logo, convertidas en la ola que baja hacia los favoritos
const OlaDelLogo: FC = () => (
  <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="block h-24 w-full md:h-40" aria-hidden="true" focusable="false">
    <path d="M0 40C240 110 520 130 760 90S1220 0 1440 50V220H0Z" fill="var(--tribu-rojo)" />
    <path d="M0 80C260 140 540 150 780 116S1230 40 1440 84V220H0Z" fill="var(--tribu-naranja)" />
    <path d="M0 116C280 170 560 176 800 146S1240 80 1440 118V220H0Z" fill="var(--tribu-amarillo)" />
    <path d="M0 152C300 196 580 200 820 176S1250 120 1440 152V220H0Z" fill="var(--tribu-lima)" />
    <path d="M0 190C320 214 600 218 840 204S1260 170 1440 188V220H0Z" fill="var(--sabor-morada)" />
  </svg>
)

type HeroProps = { movimientoReducido: boolean }

export const Hero: FC<HeroProps> = ({ movimientoReducido }) => {
  const contenedor = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (movimientoReducido) return
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } })
      tl.from('.logo-hero', { scale: 0.6, rotation: -8, autoAlpha: 0, duration: 0.7 })
        .from('.fruta-hero', { scale: 0, autoAlpha: 0, stagger: 0.07, duration: 0.5 }, '-=0.35')
        .from('.texto-hero > *', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, 0.2)
    },
    { scope: contenedor, dependencies: [movimientoReducido] },
  )

  return (
    <section id="inicio" ref={contenedor} className="relative overflow-hidden bg-hielo pt-24 md:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-16">
        <div className="relative order-first mx-auto w-[min(78vw,26rem)] md:order-last md:w-full md:max-w-md">
          <img
            src="./assets/logo.webp"
            alt="Logo de Tribu"
            width={564}
            height={592}
            className="logo-hero relative z-10 mx-auto w-[74%] drop-shadow-[0_2px_0_#fff]"
          />
          {FRUTAS_DEL_LOGO.map((fruta) => (
            <Fruta key={fruta.clase} tipo={fruta.tipo} className={`fruta-hero absolute ${fruta.clase} drop-shadow-[0_8px_10px_rgb(0_0_0/0.18)]`} />
          ))}
        </div>

        <div className="texto-hero flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <EstadoAhora className="text-sm" />
          <h1 className="font-display text-[clamp(2.6rem,11vw,5.25rem)] leading-[0.95] text-tinta">
            Batidos de fruta de verdad en Turrialba
          </h1>
          <p className="max-w-md text-lg leading-snug text-tinta/80 md:text-xl">
            En agua, en leche o con prote. Pasá por Plaza Rojitas o Plaza Nuri, o pedilo por WhatsApp y te lo llevamos con Express.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <EnlaceBoton href={linkWhatsApp()} externo intencion="whatsapp">
              <IconoWhatsApp className="size-6" />
              Pedir por WhatsApp
            </EnlaceBoton>
            <EnlaceBoton href="#menu" intencion="contorno">
              Ver el menú
            </EnlaceBoton>
          </div>
        </div>
      </div>
      <OlaDelLogo />
    </section>
  )
}
