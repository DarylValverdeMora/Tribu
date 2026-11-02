import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, type CSSProperties, type FC } from 'react'
import { FAVORITOS, type Favorito, type FrutaEnEscena } from '../data/favoritos'
import { formatearColones } from '../data/menu'
import { PLACEHOLDER } from '../data/negocio'
import { cn } from '../lib/cn'
import { linkWhatsApp, mensajeDeSabor } from '../lib/whatsapp'
import { Fruta } from './Fruta'
import { IconoWhatsApp } from './Iconos'
import { Vaso } from './Vaso'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const RECORRIDO_PARALLAX = 140

const estiloTinta = (favorito: Favorito): CSSProperties => ({ ['--tinta-sabor' as string]: favorito.tinta })

// Titan One en mayúscula mide cerca de 0.78em por letra; con cqi la palabra larga nunca se sale de su columna
const tamanoTituloGrande = (texto: string): string => `min(8rem, ${(92 / (texto.length * 0.78)).toFixed(2)}cqi)`

const posicionFruta = (fruta: FrutaEnEscena): CSSProperties => ({
  left: `${fruta.x}%`,
  top: `${fruta.y}%`,
  width: `calc(var(--vaso) * ${(fruta.tamano * 1.35) / 100})`,
  rotate: `${fruta.giro}deg`,
})

// Cada fruta se mueve a su propia velocidad para dar profundidad
const profundidad = (posicion: number): number => [0.6, 1.2, 0.9, 1.5, 0.75, 1.1][posicion % 6] ?? 1

const Etiqueta: FC<{ children: string }> = ({ children }) => (
  <span className="rounded-full border-2 border-dashed border-white/80 px-3 py-1 text-sm font-semibold text-white">
    {children}
  </span>
)

const AccionDeSabor: FC<{ favorito: Favorito }> = ({ favorito }) => (
  <div className="accion flex flex-col items-center gap-3 md:items-start">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {favorito.colones === null ? (
        <Etiqueta>{`${PLACEHOLDER} precio`}</Etiqueta>
      ) : (
        <span className="rounded-full bg-white px-4 py-1 font-display text-lg" style={{ color: favorito.tinta }}>
          {formatearColones(favorito.colones)}
        </span>
      )}
      {favorito.ingredientesPorConfirmar ? <Etiqueta>{`${PLACEHOLDER} ingredientes`}</Etiqueta> : null}
    </div>
    <a
      href={linkWhatsApp(mensajeDeSabor(favorito.nombre))}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-lg shadow-[0_6px_0_rgb(0_0_0/0.18)] transition-transform duration-150 ease-out active:scale-96"
      style={{ color: favorito.tinta }}
    >
      <IconoWhatsApp className="size-6" />
      Pedí {favorito.nombre}
    </a>
  </div>
)

type PosterProps = { favorito: Favorito; indice: number }

const PosterDeSabor: FC<PosterProps> = ({ favorito, indice }) => {
  const poster = useRef<HTMLElement>(null)
  const alDerecha = indice % 2 === 1

  useGSAP(
    () => {
      const nodo = poster.current
      if (!nodo) return
      const entrada = { trigger: nodo, start: 'top 85%', end: 'top 15%', scrub: 0.8 }

      gsap.fromTo('.liquido', { y: 250 }, { y: 0, ease: 'power1.out', scrollTrigger: entrada })
      gsap.fromTo('.vaso', { rotation: alDerecha ? 10 : -10, yPercent: 12 }, { rotation: 0, yPercent: 0, ease: 'power2.out', scrollTrigger: entrada })
      gsap.fromTo('.linea-arriba', { xPercent: alDerecha ? 30 : -30, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: 'power2.out', scrollTrigger: { ...entrada, end: 'top 40%' } })
      gsap.fromTo('.linea-grande', { xPercent: alDerecha ? -24 : 24, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: 'power2.out', scrollTrigger: { ...entrada, end: 'top 35%' } })

      gsap.from('.ingrediente', {
        x: -30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: nodo, start: 'top 45%', end: 'bottom top', toggleActions: 'play none none reverse' },
      })

      gsap.utils.toArray<HTMLElement>('.fruta', nodo).forEach((fruta, posicion) => {
        const velocidad = profundidad(posicion)
        gsap.fromTo(
          fruta,
          { y: RECORRIDO_PARALLAX * velocidad, rotation: -25 * velocidad },
          { y: -RECORRIDO_PARALLAX * velocidad, rotation: 25 * velocidad, ease: 'none', scrollTrigger: { trigger: nodo, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    },
    { scope: poster },
  )

  return (
    <article
      ref={poster}
      aria-labelledby={`sabor-${favorito.id}`}
      className={cn(
        'gotas relative isolate overflow-hidden px-4 pt-16 pb-20 [--vaso:min(62vw,19rem)] md:px-8 md:py-24 md:[--vaso:min(28vw,22rem)]',
        indice > 0 && '-mt-10 rounded-t-[2.5rem] md:-mt-14 md:rounded-t-[3.5rem]',
      )}
      style={{ background: favorito.fondo, ...estiloTinta(favorito) }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {favorito.frutas.map((fruta, posicion) => (
          <div key={`${fruta.tipo}-${posicion}`} className="fruta absolute -translate-1/2" style={posicionFruta(fruta)}>
            <Fruta tipo={fruta.tipo} className="w-full drop-shadow-[0_10px_12px_rgb(0_0_0/0.22)]" />
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-12">
        <div className={cn('flex flex-col items-center gap-6 text-center md:items-start md:text-left', alDerecha && 'md:order-last')}>
          <h3 id={`sabor-${favorito.id}`} className="w-full [container-type:inline-size]">
            <span className="linea-arriba titulo-poster block text-[clamp(1.75rem,8vw,3.5rem)]">{favorito.lineaArriba}</span>
            <span className="linea-grande titulo-poster block uppercase" style={{ fontSize: tamanoTituloGrande(favorito.lineaGrande) }}>
              {favorito.lineaGrande}
            </span>
          </h3>
          <div className="hidden md:block">
            <AccionDeSabor favorito={favorito} />
          </div>
        </div>

        <div className="relative mx-auto w-(--vaso)">
          <div className="vaso relative">
            <Vaso favoritos={[favorito]} className="w-full drop-shadow-[0_24px_30px_rgb(0_0_0/0.25)]" />
            <ul className="absolute inset-x-0 top-[38%] flex flex-col items-center gap-1" aria-label={`Ingredientes de ${favorito.nombre}`}>
              {favorito.ingredientes.map((ingrediente) => (
                <li key={ingrediente} className="ingrediente titulo-poster text-[calc(var(--vaso)*0.135)] uppercase">
                  {ingrediente}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:hidden">
          <AccionDeSabor favorito={favorito} />
        </div>
      </div>
    </article>
  )
}

const EscenaQuieta: FC = () => (
  <div className="gotas bg-mango px-4 py-20">
    <ul className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {FAVORITOS.map((favorito) => (
        <li key={favorito.id} className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <img src={favorito.imagen} alt={`Historia de Tribu: ${favorito.nombre}`} width={720} height={1284} loading="lazy" className="aspect-9/16 w-full object-cover" />
          <div className="flex items-center justify-between gap-3 p-4">
            <h3 className="font-display text-xl">{favorito.nombre}</h3>
            <a href={linkWhatsApp(mensajeDeSabor(favorito.nombre))} target="_blank" rel="noopener noreferrer" className="rounded-full bg-whatsapp px-4 py-2 font-semibold text-white">
              Pedilo
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

type FavoritosProps = { movimientoReducido: boolean }

export const Favoritos: FC<FavoritosProps> = ({ movimientoReducido }) => (
  <section id="favoritos" aria-labelledby="titulo-favoritos" className="relative">
    <h2 id="titulo-favoritos" className="sr-only">
      Los favoritos de Tribu
    </h2>
    {movimientoReducido ? (
      <EscenaQuieta />
    ) : (
      FAVORITOS.map((favorito, indice) => <PosterDeSabor key={favorito.id} favorito={favorito} indice={indice} />)
    )}
  </section>
)
