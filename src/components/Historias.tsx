import type { FC } from 'react'
import { REDES } from '../data/negocio'
import { EnlaceBoton } from './Boton'
import { IconoInstagram } from './Iconos'

export const Historias: FC = () => (
  <section aria-labelledby="titulo-historias" className="bg-nube py-16 md:py-20">
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
  </section>
)
