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

const DURACION_CAMBIO = 1
const PAUSA_EN_SABOR = 0.6
const SCROLL_POR_SABOR = 110

const estiloTinta = (favorito: Favorito): CSSProperties => ({ ['--tinta-sabor' as string]: favorito.tinta })

// Titan One en mayúscula mide cerca de 0.78em por letra; así la palabra larga nunca se sale de la pantalla
const tamanoTituloGrande = (texto: string): string => `min(8rem, ${(90 / (texto.length * 0.78)).toFixed(2)}vw, 16vw)`

const posicionFruta = (fruta: FrutaEnEscena): CSSProperties => ({
  left: `${fruta.x}%`,
  top: `${fruta.y}%`,
  width: `calc(var(--vaso) * ${(fruta.tamano * 1.35) / 100})`,
  rotate: `${fruta.giro}deg`,
})

const PrecioDeSabor: FC<{ favorito: Favorito }> = ({ favorito }) =>
  favorito.colones === null ? (
    <span className="rounded-full border-2 border-dashed border-white/80 px-3 py-1 text-sm font-semibold text-white">
      {PLACEHOLDER} precio
    </span>
  ) : (
    <span className="rounded-full bg-white px-4 py-1 font-display text-lg" style={{ color: favorito.tinta }}>
      {formatearColones(favorito.colones)}
    </span>
  )

const AccionDeSabor: FC<{ favorito: Favorito; indice: number }> = ({ favorito, indice }) => (
  <div
    className={cn(
      'accion absolute inset-x-0 bottom-0 flex flex-col items-center gap-3',
      indice > 0 && 'invisible opacity-0',
    )}
  >
    <div className="flex flex-wrap items-center justify-center gap-2">
      <PrecioDeSabor favorito={favorito} />
      {favorito.ingredientesPorConfirmar ? (
        <span className="rounded-full border-2 border-dashed border-white/80 px-3 py-1 text-sm font-semibold text-white">
          {PLACEHOLDER} ingredientes
        </span>
      ) : null}
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

const TituloDeSabor: FC<{ favorito: Favorito; indice: number }> = ({ favorito, indice }) => (
  <h3
    className={cn('titulo absolute inset-x-0 top-0 text-center', indice > 0 && 'invisible opacity-0')}
    style={estiloTinta(favorito)}
  >
    <span className="titulo-poster block text-[clamp(1.75rem,8vw,3.5rem)]">{favorito.lineaArriba}</span>
    <span className="titulo-poster block uppercase" style={{ fontSize: tamanoTituloGrande(favorito.lineaGrande) }}>
      {favorito.lineaGrande}
    </span>
  </h3>
)

const IngredientesDeSabor: FC<{ favorito: Favorito; indice: number }> = ({ favorito, indice }) => (
  <ul
    className={cn(
      'ingredientes absolute inset-x-0 top-[38%] flex flex-col items-center gap-1',
      indice > 0 && 'invisible',
    )}
    style={estiloTinta(favorito)}
    aria-label={`Ingredientes de ${favorito.nombre}`}
  >
    {favorito.ingredientes.map((ingrediente) => (
      <li
        key={ingrediente}
        className={cn(
          'titulo-poster text-[calc(var(--vaso)*0.135)] uppercase',
          indice > 0 && 'opacity-0',
        )}
      >
        {ingrediente}
      </li>
    ))}
  </ul>
)

const FrutasDeSabor: FC<{ favorito: Favorito; indice: number }> = ({ favorito, indice }) => (
  <div className={cn('frutas pointer-events-none absolute inset-0', indice > 0 && 'invisible')}>
    {favorito.frutas.map((fruta, posicion) => (
      <div
        key={`${fruta.tipo}-${posicion}`}
        className={cn('fruta absolute -translate-1/2', indice > 0 && 'opacity-0')}
        data-lado={fruta.x < 50 ? 'izquierda' : 'derecha'}
        style={posicionFruta(fruta)}
      >
        <Fruta tipo={fruta.tipo} className="w-full drop-shadow-[0_10px_12px_rgb(0_0_0/0.22)]" />
      </div>
    ))}
  </div>
)

const BarrasDeHistoria: FC = () => (
  <div className="absolute inset-x-4 top-20 z-30 flex gap-1.5 md:inset-x-auto md:left-1/2 md:w-md md:-translate-x-1/2" aria-hidden="true">
    {FAVORITOS.map((favorito) => (
      <span key={favorito.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/40">
        <span className="barra block h-full origin-left rounded-full bg-white" />
      </span>
    ))}
  </div>
)

const agregarCambioDeSabor = (tl: gsap.core.Timeline, escena: HTMLElement, indice: number): void => {
  const elementos = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, escena)
  const fondos = elementos('.fondo')
  const titulos = elementos('.titulo')
  const listas = elementos('.ingredientes')
  const grupos = elementos('.frutas')
  const acciones = elementos('.accion')
  const barras = elementos('.barra')
  const liquidos = gsap.utils.toArray<SVGGElement>('.liquido', escena)
  const anterior = indice - 1
  const inicio = `sabor-${anterior}+=${PAUSA_EN_SABOR}`
  const mitad = `${inicio}+=${DURACION_CAMBIO * 0.45}`

  tl.to(fondos[indice] ?? null, { scale: 1, duration: DURACION_CAMBIO, ease: 'power2.inOut' }, inicio)
    .to(liquidos[indice] ?? null, { y: 0, duration: DURACION_CAMBIO, ease: 'power1.inOut' }, inicio)
    .to(barras[indice] ?? null, { scaleX: 1, duration: DURACION_CAMBIO, ease: 'none' }, inicio)
    .to('.vaso', { rotation: -6, duration: DURACION_CAMBIO / 2, ease: 'sine.out' }, inicio)
    .to('.vaso', { rotation: 0, duration: DURACION_CAMBIO / 2, ease: 'back.out(3)' }, mitad)
    .to(titulos[anterior] ?? null, { y: -50, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, inicio)
    .to(acciones[anterior] ?? null, { y: 20, autoAlpha: 0, duration: 0.3 }, inicio)
    .to(listas[anterior]?.children ?? [], { x: 40, autoAlpha: 0, stagger: 0.05, duration: 0.3 }, inicio)
    .to(grupos[anterior]?.querySelectorAll('[data-lado="izquierda"]') ?? [], { xPercent: -260, rotation: '-=90', autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, inicio)
    .to(grupos[anterior]?.querySelectorAll('[data-lado="derecha"]') ?? [], { xPercent: 260, rotation: '+=90', autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, inicio)
    .set([listas[indice], grupos[indice]].filter(Boolean), { autoAlpha: 1 }, mitad)
    .fromTo(titulos[indice] ?? null, { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.6)' }, mitad)
    .fromTo(listas[indice]?.children ?? [], { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.07, duration: 0.35, ease: 'power2.out' }, mitad)
    .fromTo(grupos[indice]?.querySelectorAll('[data-lado="izquierda"]') ?? [], { xPercent: -320, scale: 0.4, autoAlpha: 0 }, { xPercent: 0, scale: 1, autoAlpha: 1, stagger: 0.05, duration: 0.55, ease: 'back.out(1.4)' }, mitad)
    .fromTo(grupos[indice]?.querySelectorAll('[data-lado="derecha"]') ?? [], { xPercent: 220, scale: 0.4, autoAlpha: 0 }, { xPercent: 0, scale: 1, autoAlpha: 1, stagger: 0.05, duration: 0.55, ease: 'back.out(1.4)' }, mitad)
    .fromTo(acciones[indice] ?? null, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35 }, `${mitad}+=0.2`)
    .addLabel(`sabor-${indice}`, `${inicio}+=${DURACION_CAMBIO}`)
}

const EscenaAnimada: FC = () => {
  const escena = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const nodo = escena.current
      if (!nodo) return
      gsap.set(gsap.utils.toArray<SVGGElement>('.liquido', nodo).slice(1), { y: 260 })
      gsap.set(gsap.utils.toArray<HTMLElement>('.fondo', nodo).slice(1), { scale: 0 })
      gsap.set(gsap.utils.toArray<HTMLElement>('.barra', nodo).slice(1), { scaleX: 0 })
      gsap.set('.vaso', { transformOrigin: '50% 90%' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: nodo,
          start: 'top top',
          end: `+=${(FAVORITOS.length - 1) * SCROLL_POR_SABOR}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          snap: { snapTo: 'labels', duration: { min: 0.2, max: 0.6 }, delay: 0.1, ease: 'power1.inOut' },
        },
      })
      tl.addLabel('sabor-0', 0)
      FAVORITOS.slice(1).forEach((_, posicion) => agregarCambioDeSabor(tl, nodo, posicion + 1))
      tl.to({}, { duration: PAUSA_EN_SABOR })
    },
    { scope: escena },
  )

  return (
    <div
      ref={escena}
      className="relative h-svh min-h-140 overflow-hidden [--vaso:min(64vw,34svh)] md:[--vaso:min(28vw,40svh)]"
    >
      {FAVORITOS.map((favorito) => (
        <div
          key={favorito.id}
          className="fondo absolute top-[55%] left-1/2 size-[300vmax] -translate-1/2 rounded-full"
          style={{ background: favorito.fondo }}
        />
      ))}
      <div className="gotas absolute inset-0" />
      <BarrasDeHistoria />

      <div className="absolute inset-x-4 top-28 z-30 h-[calc(var(--vaso)*0.9)] md:top-32">
        {FAVORITOS.map((favorito, indice) => (
          <TituloDeSabor key={favorito.id} favorito={favorito} indice={indice} />
        ))}
      </div>

      {FAVORITOS.map((favorito, indice) => (
        <FrutasDeSabor key={favorito.id} favorito={favorito} indice={indice} />
      ))}

      <div className="vaso absolute top-[55%] left-1/2 z-20 w-(--vaso) -translate-1/2">
        <Vaso favoritos={FAVORITOS} className="w-full drop-shadow-[0_24px_30px_rgb(0_0_0/0.25)]" />
        {FAVORITOS.map((favorito, indice) => (
          <IngredientesDeSabor key={favorito.id} favorito={favorito} indice={indice} />
        ))}
      </div>

      <div className="absolute inset-x-4 bottom-24 z-40 h-28 md:bottom-8">
        {FAVORITOS.map((favorito, indice) => (
          <AccionDeSabor key={favorito.id} favorito={favorito} indice={indice} />
        ))}
      </div>
    </div>
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
    {movimientoReducido ? <EscenaQuieta /> : <EscenaAnimada />}
  </section>
)
