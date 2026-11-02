import type { FC } from 'react'
import { PLACEHOLDER } from '../data/negocio'
import { cn } from '../lib/cn'

type Foto = { src: string; alt: string; ancho: number; alto: number }

const RUTA = './assets/fotos/'

const FOTOS_LOCAL = {
  fachada: { src: `${RUTA}local-fachada.webp`, alt: 'Fachada de Tribu con el logo y la terraza techada', ancho: 456, alto: 478 },
  terraza: { src: `${RUTA}local-terraza.webp`, alt: 'Terraza de Tribu con sombrilla roja y la pizarra del día', ancho: 527, alto: 670 },
} as const satisfies Record<string, Foto>

type Integrante = Foto & { nombre: string }

// Nombres tomados de las publicaciones de @mitribu2 que presentan a cada uno
const EQUIPO: readonly Integrante[] = [
  { nombre: 'Nacho', src: `${RUTA}equipo-nacho.webp`, alt: 'Nacho, del equipo de Tribu, con la camiseta de la marca', ancho: 498, alto: 656 },
  { nombre: 'Vale', src: `${RUTA}equipo-vale.webp`, alt: 'Vale, del equipo de Tribu, con la camiseta de la marca', ancho: 498, alto: 628 },
  { nombre: 'Tiffany', src: `${RUTA}equipo-tiffany.webp`, alt: 'Tiffany, del equipo de Tribu, con la camiseta de la marca', ancho: 498, alto: 629 },
]

const CLIENTES: readonly Foto[] = [
  { src: `${RUTA}cliente-galleta.webp`, alt: 'Clienta sonriendo con un milkshake y una galleta', ancho: 490, alto: 605 },
  { src: `${RUTA}cliente-jardin.webp`, alt: 'Clienta con un jugo tropical en el jardín', ancho: 475, alto: 643 },
  { src: `${RUTA}cliente-cafe.webp`, alt: 'Cliente con un café frío en la barra', ancho: 498, alto: 611 },
  { src: `${RUTA}cliente-luces.webp`, alt: 'Clienta tomando un batido morado bajo las luces de la terraza', ancho: 479, alto: 648 },
  { src: `${RUTA}cliente-tomando.webp`, alt: 'Cliente tomando un batido', ancho: 504, alto: 634 },
  { src: `${RUTA}cliente-de-pie.webp`, alt: 'Clienta con un batido morado frente al local', ancho: 505, alto: 677 },
]

const GIROS = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1'] as const

const Imagen: FC<{ foto: Foto; className?: string }> = ({ foto, className }) => (
  <img src={foto.src} alt={foto.alt} width={foto.ancho} height={foto.alto} loading="lazy" decoding="async" className={cn('object-cover', className)} />
)

const Intro: FC = () => (
  <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
    <div>
      <h2 id="titulo-tribu" className="font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-none text-amarillo">
        En la tribu cabe todo mundo
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-white/85">
        El que viene del entreno por un Proteínico. La familia que pide milkshakes de Oreo para los chiquitos. El que
        arranca el día con un jugo de naranja a las 8 de la mañana.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-white/85">Tropical, deportivo y familiar: así se siente Tribu.</p>
      <p className="mt-6 rounded-2xl border-2 border-dashed border-white/30 p-4 text-sm text-white/70">
        {PLACEHOLDER} Historia de por qué se llama Tribu y slogan, si el dueño lo quiere contar.
      </p>
    </div>
    <div className="grid grid-cols-5 gap-3">
      <Imagen foto={FOTOS_LOCAL.fachada} className="col-span-3 aspect-[4/5] w-full rounded-3xl" />
      <Imagen foto={FOTOS_LOCAL.terraza} className="col-span-2 mt-10 aspect-[3/5] w-full rounded-3xl" />
    </div>
  </div>
)

const Equipo: FC = () => (
  <div className="mx-auto mt-20 max-w-5xl">
    <h3 className="font-display text-3xl text-lima md:text-4xl">Los que te hacen el batido</h3>
    <ul className="mt-6 grid max-w-3xl grid-cols-3 gap-3 md:gap-5">
      {EQUIPO.map((persona) => (
        <li key={persona.nombre} className="overflow-hidden rounded-3xl bg-white text-tinta">
          <Imagen foto={persona} className="aspect-[4/5] w-full object-top" />
          <p className="px-3 py-2 text-center font-display text-lg md:text-2xl">{persona.nombre}</p>
        </li>
      ))}
    </ul>
  </div>
)

const Clientes: FC = () => (
  <div className="mt-20">
    <h3 className="mx-auto max-w-5xl font-display text-3xl text-naranja md:text-4xl">Y la gente que llega por uno</h3>
    <ul
      aria-label="Clientes de Tribu"
      className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-3 pb-6 [scrollbar-width:none] md:mx-auto md:max-w-6xl md:justify-center md:overflow-visible"
    >
      {CLIENTES.map((foto, indice) => (
        <li key={foto.src} className={cn('w-44 shrink-0 snap-center rounded-2xl bg-white p-2 pb-6 shadow-[0_10px_24px_rgb(0_0_0/0.35)] md:w-40 lg:w-44', GIROS[indice % GIROS.length])}>
          <Imagen foto={foto} className="aspect-[4/5] w-full rounded-xl" />
        </li>
      ))}
    </ul>
  </div>
)

export const LaTribu: FC = () => (
  <section aria-labelledby="titulo-tribu" className="overflow-hidden bg-tinta px-4 py-20 text-white md:py-28">
    <Intro />
    <Equipo />
    <Clientes />
  </section>
)
