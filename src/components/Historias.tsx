import type { FC } from 'react'
import { PLACEHOLDER, REDES } from '../data/negocio'
import { EnlaceBoton } from './Boton'
import { IconoInstagram } from './Iconos'

const HISTORIAS = [
  { imagen: './assets/drink-vitamins.webp', alt: 'Vaso de batido amarillo contra el cielo: Drink your vitamins' },
  { imagen: './assets/good-morning-orange.webp', alt: 'Jugo de naranja con hojas: Good morning, orange' },
  { imagen: './assets/tentacion-morada.webp', alt: 'Batido morado con moras y fresas: Tentación Morada' },
  { imagen: './assets/sandia-con-todo.webp', alt: 'Batido rojo de sandía, fresa, limón y hierbabuena' },
  { imagen: './assets/mangonada.webp', alt: 'Mangonada con mango, limón, tajín y chamoy' },
  { imagen: './assets/cafe-prote.webp', alt: 'Café frío con proteína y chocolate' },
] as const

export const Historias: FC = () => (
  <section aria-labelledby="titulo-historias" className="overflow-hidden bg-nube py-20 md:py-28">
    <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-4">
      <div>
        <h2 id="titulo-historias" className="font-display text-[clamp(2.25rem,9vw,4rem)] leading-none">
          Lo nuevo sale primero en Instagram
        </h2>
        <p className="mt-3 text-lg text-tinta/80">Sabores nuevos, la promo del día y los apellidos del jueves.</p>
      </div>
      <EnlaceBoton href={REDES.instagram.url} externo intencion="tinta">
        <IconoInstagram className="size-5" />@{REDES.instagram.usuario}
      </EnlaceBoton>
    </div>
    <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:px-[max(1rem,calc((100vw-64rem)/2))]" data-lenis-prevent>
      {HISTORIAS.map((historia) => (
        <li key={historia.imagen} className="w-56 shrink-0 snap-start md:w-64">
          <img
            src={historia.imagen}
            alt={historia.alt}
            width={720}
            height={1284}
            loading="lazy"
            decoding="async"
            className="aspect-9/16 w-full rounded-3xl object-cover outline-1 -outline-offset-1 outline-black/10"
          />
        </li>
      ))}
    </ul>
    <p className="mx-auto mt-2 max-w-5xl px-4 text-sm text-tinta/60">{PLACEHOLDER} Confirmar permiso para usar estas fotos de las historias.</p>
  </section>
)
