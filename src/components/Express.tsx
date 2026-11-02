import type { FC } from 'react'
import { EXPRESS } from '../data/negocio'
import { linkWhatsApp } from '../lib/whatsapp'
import { EnlaceBoton } from './Boton'
import { IconoMoto, IconoWhatsApp } from './Iconos'

const PASOS = [
  { titulo: 'Armá el pedido', texto: 'En el menú de arriba o escribiendo directo lo que querés.' },
  { titulo: 'Mandalo por WhatsApp', texto: 'Escogé Plaza Rojitas o Plaza Nuri y poné tu dirección en el mensaje.' },
  { titulo: 'Te lo llevamos', texto: 'Lo llevamos a la dirección que pusiste en el mensaje.' },
] as const

export const Express: FC = () => (
  <section id="express" aria-labelledby="titulo-express" className="scroll-mt-20 bg-lima px-4 py-20 md:py-28">
    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
      <div>
        <IconoMoto className="size-14" />
        <h2 id="titulo-express" className="mt-4 font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-none">
          Tenemos Express
        </h2>
        <p className="mt-4 max-w-md text-lg">Si no podés pasar al local, el batido va a donde estés.</p>
        <dl className="mt-6 grid gap-2 rounded-2xl border-2 border-dashed border-tinta/40 p-4 text-sm">
          <div>
            <dt className="inline font-semibold">Zonas: </dt>
            <dd className="inline">{EXPRESS.zonas}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Costo: </dt>
            <dd className="inline">{EXPRESS.costo}</dd>
          </div>
        </dl>
        <div className="mt-6">
          <EnlaceBoton href={linkWhatsApp('¡Hola Tribu! Quiero pedir por Express.')} externo intencion="tinta">
            <IconoWhatsApp className="size-5" />
            Pedir Express
          </EnlaceBoton>
        </div>
      </div>
      <ol className="grid gap-4">
        {PASOS.map((paso, indice) => (
          <li key={paso.titulo} className="flex gap-4 rounded-3xl bg-white p-5 shadow-[0_6px_0_var(--tribu-hoja)]">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-amarillo font-display text-2xl" aria-hidden="true">
              {indice + 1}
            </span>
            <div>
              <h3 className="font-display text-xl">{paso.titulo}</h3>
              <p className="mt-1 leading-snug text-tinta/80">{paso.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
