import { useId, useState, type FC } from 'react'
import { formatearColones } from '../../data/menu'
import { LOCALES } from '../../data/negocio'
import { cn } from '../../lib/cn'
import { linkWhatsApp } from '../../lib/whatsapp'
import { IconoMas, IconoMenos, IconoWhatsApp } from '../Iconos'
import { armarMensajeDePedido, type Entrega } from './mensajePedido'
import { usePedido } from './PedidoContext'

const OPCIONES_ENTREGA: readonly { tipo: Entrega['tipo']; titulo: string; detalle: string }[] = [
  { tipo: 'retiro', titulo: 'Retiro en el local', detalle: 'Pasás a recogerlo' },
  { tipo: 'express', titulo: 'Express', detalle: 'Te lo llevamos' },
]

export const Bandeja: FC = () => {
  const { estado, acciones } = usePedido()
  const [abierta, setAbierta] = useState(false)
  const [tipoEntrega, setTipoEntrega] = useState<Entrega['tipo']>('retiro')
  const [direccion, setDireccion] = useState('')
  const idPanel = useId()
  const idDireccion = useId()

  if (estado.unidades === 0) return null

  const faltaDireccion = tipoEntrega === 'express' && direccion.trim().length < 8
  const entrega: Entrega = tipoEntrega === 'express' ? { tipo: 'express', direccion } : { tipo: 'retiro' }

  const resumenTotal = estado.totalCompleto ? formatearColones(estado.total) : `${formatearColones(estado.total)} + por confirmar`

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-lg">
      <div
        id={idPanel}
        className={cn(
          'mb-2 origin-bottom overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_rgb(0_0_0/0.25)] transition-[opacity,transform] duration-200 ease-(--ease-salpicada)',
          abierta ? 'scale-100 opacity-100' : 'pointer-events-none invisible scale-95 opacity-0',
        )}
      >
        <div className="max-h-[38svh] overflow-y-auto p-4" data-lenis-prevent>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-2xl">Tu pedido</h2>
            <button type="button" onClick={acciones.vaciar} className="rounded-full px-3 py-2 text-sm font-semibold underline underline-offset-2">
              Vaciar
            </button>
          </div>
          <ul className="flex flex-col divide-y divide-tinta/10">
            {estado.lineas.map((linea) => (
              <li key={linea.clave} className="flex items-center justify-between gap-3 py-2">
                <div className="min-w-0">
                  <p className="leading-tight font-semibold">{linea.descripcion}</p>
                  <p className="text-sm text-tinta/70 tabular-nums">
                    {linea.colones === null ? 'Precio por confirmar' : formatearColones(linea.colones * linea.cantidad)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" onClick={() => acciones.quitar(linea.clave)} aria-label={`Quitar uno: ${linea.descripcion}`} className="grid size-10 place-items-center rounded-full bg-nube active:scale-96">
                    <IconoMenos className="size-4" />
                  </button>
                  <span className="w-6 text-center font-display tabular-nums">{linea.cantidad}</span>
                  <button
                    type="button"
                    onClick={() => acciones.agregar({ clave: linea.clave, descripcion: linea.descripcion, colones: linea.colones })}
                    aria-label={`Agregar otro: ${linea.descripcion}`}
                    className="grid size-10 place-items-center rounded-full bg-nube active:scale-96"
                  >
                    <IconoMas className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 border-t border-tinta/10 bg-nube p-4">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">¿Cómo lo querés?</legend>
            <div className="grid grid-cols-2 gap-2">
              {OPCIONES_ENTREGA.map((opcion) => (
                <label
                  key={opcion.tipo}
                  className={cn(
                    'flex min-h-12 cursor-pointer flex-col justify-center rounded-2xl border-2 px-3 py-2 leading-tight transition-colors duration-150 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-tinta',
                    tipoEntrega === opcion.tipo ? 'border-tinta bg-white' : 'border-transparent bg-white/60',
                  )}
                >
                  <input
                    type="radio"
                    name="tipo-entrega"
                    value={opcion.tipo}
                    checked={tipoEntrega === opcion.tipo}
                    onChange={() => setTipoEntrega(opcion.tipo)}
                    className="sr-only"
                  />
                  <span className="font-display">{opcion.titulo}</span>
                  <span className="text-xs text-tinta/70">{opcion.detalle}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {tipoEntrega === 'express' ? (
            <div className="flex flex-col gap-1">
              <label htmlFor={idDireccion} className="text-sm font-semibold">
                Dirección de entrega
              </label>
              <textarea
                id={idDireccion}
                value={direccion}
                onChange={(evento) => setDireccion(evento.target.value)}
                rows={2}
                maxLength={300}
                autoComplete="street-address"
                placeholder="Barrio, señas y número de casa"
                className="w-full resize-none rounded-2xl border-2 border-tinta/20 bg-white px-3 py-2 focus:border-tinta focus:outline-none"
              />
              {faltaDireccion ? <p className="text-xs text-tinta/70">Escribí la dirección para poder mandar el pedido.</p> : null}
            </div>
          ) : null}

          <div>
            <p className="mb-2 text-sm font-semibold">{tipoEntrega === 'retiro' ? '¿En qué local lo recogés?' : '¿Qué local te lo manda?'}</p>
            <div className="grid grid-cols-2 gap-2">
              {LOCALES.map((local) =>
                faltaDireccion ? (
                  <span
                    key={local.id}
                    aria-disabled="true"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-tinta/15 px-3 text-center font-display leading-tight text-tinta/50"
                  >
                    {local.nombre}
                  </span>
                ) : (
                  <a
                    key={local.id}
                    href={linkWhatsApp(
                      armarMensajeDePedido({ lineas: estado.lineas, total: estado.total, totalCompleto: estado.totalCompleto, local: local.nombre, entrega }),
                      local.whatsapp,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-whatsapp px-3 text-center font-display leading-tight text-white active:scale-96"
                  >
                    <IconoWhatsApp className="size-5 shrink-0" />
                    {local.nombre}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setAbierta((valor) => !valor)}
        aria-expanded={abierta}
        aria-controls={idPanel}
        className="flex min-h-14 w-full items-center justify-between gap-3 rounded-full bg-tinta py-2 pr-2 pl-5 text-white shadow-[0_10px_30px_rgb(0_0_0/0.3)] active:scale-[0.98]"
      >
        <span className="font-semibold">
          {estado.unidades} {estado.unidades === 1 ? 'producto' : 'productos'} · <span className="tabular-nums">{resumenTotal}</span>
        </span>
        <span className="rounded-full bg-amarillo px-4 py-2.5 font-display text-tinta">{abierta ? 'Cerrar' : 'Ver pedido'}</span>
      </button>
    </div>
  )
}
