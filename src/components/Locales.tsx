import type { FC } from 'react'
import { LOCALES, NOMBRE_DIAS, type DiaSemana, type Local } from '../data/negocio'
import { cn } from '../lib/cn'
import { diaDeHoy, estadoDelLocal, formatearFranja, type EstadoLocal } from '../lib/horario'
import { formatearTelefono, linkWhatsApp } from '../lib/whatsapp'
import { EnlaceBoton } from './Boton'
import { IconoMapa, IconoWhatsApp } from './Iconos'

const ORDEN_SEMANA: readonly DiaSemana[] = [1, 2, 3, 4, 5, 6, 0]

const textoEstado = (estado: EstadoLocal): string => {
  if (estado.tipo === 'abierto') return `Abierto, cierra a las ${estado.cierra}`
  if (!estado.proximaApertura) return 'Cerrado'
  return `Cerrado, abre ${estado.proximaApertura.dia} a las ${estado.proximaApertura.hora}`
}

const TarjetaLocal: FC<{ local: Local; colorTarjeta: string }> = ({ local, colorTarjeta }) => {
  const estado = estadoDelLocal(local)
  const hoy = diaDeHoy()
  return (
    <article className={cn('flex flex-col rounded-[2rem] p-6 md:p-8', colorTarjeta)}>
      <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold">
        <span className={cn('size-2.5 rounded-full', estado.tipo === 'abierto' ? 'bg-whatsapp' : 'bg-rojo')} aria-hidden="true" />
        {textoEstado(estado)}
      </p>
      <h3 className="mt-4 font-display text-4xl leading-none">{local.nombre}</h3>
      <p className="mt-1 text-lg">{local.zona}</p>

      <table className="mt-6 w-full text-left">
        <caption className="sr-only">Horario de {local.nombre}</caption>
        <tbody>
          {ORDEN_SEMANA.map((dia) => (
            <tr key={dia} className={cn('border-b border-tinta/10 last:border-0', dia === hoy && 'font-bold')}>
              <th scope="row" className="py-1.5 pr-4 font-semibold">
                {NOMBRE_DIAS[dia]}
                {dia === hoy ? <span className="sr-only"> (hoy)</span> : null}
              </th>
              <td className="py-1.5 text-right tabular-nums">{formatearFranja(local.horario[dia])}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex flex-wrap gap-3">
        <EnlaceBoton href={linkWhatsApp(`¡Hola Tribu ${local.nombre}! Quiero hacer un pedido.`, local.whatsapp)} externo intencion="whatsapp" className="text-base">
          <IconoWhatsApp className="size-5" />
          {formatearTelefono(local.whatsapp)}
        </EnlaceBoton>
        <EnlaceBoton href={local.mapa} externo intencion="blanco" className="text-base">
          <IconoMapa className="size-5" />
          Cómo llegar
        </EnlaceBoton>
      </div>
    </article>
  )
}

const COLORES_TARJETA = ['bg-amarillo', 'bg-naranja'] as const

export const Locales: FC = () => (
  <section id="locales" aria-labelledby="titulo-locales" className="scroll-mt-20 bg-hielo px-4 py-20 md:py-28">
    <div className="mx-auto max-w-5xl">
      <h2 id="titulo-locales" className="font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-none">
        Dos locales en Turrialba
      </h2>
      <p className="mt-3 max-w-xl text-lg text-tinta/80">Los horarios cambian entre locales. Fijate cuál te queda abierto.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {LOCALES.map((local, indice) => (
          <TarjetaLocal key={local.id} local={local} colorTarjeta={COLORES_TARJETA[indice % COLORES_TARJETA.length] ?? 'bg-amarillo'} />
        ))}
      </div>
    </div>
  </section>
)
