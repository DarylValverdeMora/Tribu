import { useState, type FC } from 'react'
import { formatearColones, MENU, type Categoria, type Preparacion, type Producto, type Tamano } from '../data/menu'
import { PLACEHOLDER } from '../data/negocio'
import { cn } from '../lib/cn'
import { IconoMas } from './Iconos'
import { usePedido } from './pedido/PedidoContext'

const FONDO_CATEGORIA: Record<Categoria['color'], string> = {
  lima: 'bg-lima',
  naranja: 'bg-naranja',
  rojo: 'bg-rojo text-white',
  amarillo: 'bg-amarillo',
  morada: 'bg-morada',
  sandia: 'bg-sandia',
}

type Opcion = { id: string; nombre: string; detalle?: string }

type SelectorProps = {
  leyenda: string
  nombre: string
  opciones: readonly Opcion[]
  seleccion: string
  alCambiar: (id: string) => void
}

const Selector: FC<SelectorProps> = ({ leyenda, nombre, opciones, seleccion, alCambiar }) => (
  <fieldset className="flex flex-wrap items-center gap-2">
    <legend className="sr-only">{leyenda}</legend>
    {opciones.map((opcion) => (
      <label
        key={opcion.id}
        className={cn(
          'cursor-pointer rounded-full border-2 border-tinta px-4 py-2 font-semibold transition-colors duration-150 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-tinta',
          seleccion === opcion.id ? 'bg-tinta text-white' : 'bg-white hover:bg-tinta/5',
        )}
      >
        <input type="radio" name={nombre} value={opcion.id} checked={seleccion === opcion.id} onChange={() => alCambiar(opcion.id)} className="sr-only" />
        {opcion.nombre}
        {opcion.detalle ? <span className="ml-1.5 tabular-nums opacity-75">{opcion.detalle}</span> : null}
      </label>
    ))}
  </fieldset>
)

const precioVisible = (tamano: Tamano): string => (tamano.colones === null ? PLACEHOLDER : formatearColones(tamano.colones))

const describirLinea = (categoria: Categoria, preparacion: Preparacion, tamano: Tamano, producto: Producto): string => {
  const partes = [categoria.nombreEnPedido]
  if (categoria.preparaciones.length > 1) partes.push(preparacion.nombre.toLowerCase())
  if (preparacion.tamanos.length > 1) partes.push(tamano.nombre.toLowerCase())
  const encabezado = partes.join(' ')
  return producto.nombre === categoria.nombreEnPedido ? encabezado : `${encabezado}: ${producto.nombre}`
}

type FilaProductoProps = {
  producto: Producto
  precio: string
  cantidad: number
  alAgregar: () => void
}

const FilaProducto: FC<FilaProductoProps> = ({ producto, precio, cantidad, alAgregar }) => (
  <li className="flex items-center justify-between gap-3 py-3">
    <div className="min-w-0">
      <p className="text-lg leading-tight font-semibold">{producto.nombre}</p>
      {producto.detalle ? <p className="leading-snug text-tinta/70">{producto.detalle}</p> : null}
    </div>
    <div className="flex shrink-0 items-center gap-3">
      <span className="font-display tabular-nums">{precio}</span>
      <button
        type="button"
        onClick={alAgregar}
        aria-label={`Agregar ${producto.nombre} al pedido`}
        className="relative grid size-11 place-items-center rounded-full bg-tinta text-white transition-transform duration-150 ease-out active:scale-90"
      >
        <IconoMas className="size-5" />
        {cantidad > 0 ? (
          <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-amarillo text-xs font-bold text-tinta tabular-nums">
            {cantidad}
          </span>
        ) : null}
      </button>
    </div>
  </li>
)

const PanelCategoria: FC<{ categoria: Categoria }> = ({ categoria }) => {
  const { estado, acciones } = usePedido()
  const [idPreparacion, setIdPreparacion] = useState(categoria.preparaciones[0]?.id ?? '')
  const preparacion = categoria.preparaciones.find((opcion) => opcion.id === idPreparacion) ?? categoria.preparaciones[0]
  const [idTamano, setIdTamano] = useState(preparacion?.tamanos[0]?.id ?? '')
  const tamano = preparacion?.tamanos.find((opcion) => opcion.id === idTamano) ?? preparacion?.tamanos[0]
  if (!preparacion || !tamano) return null

  const claveDe = (producto: Producto) => `${categoria.id}|${preparacion.id}|${tamano.id}|${producto.id}`
  const cantidadDe = (producto: Producto) => estado.lineas.find((linea) => linea.clave === claveDe(producto))?.cantidad ?? 0

  return (
    <div className="flex flex-col gap-4">
      {categoria.preparaciones.length > 1 ? (
        <Selector
          leyenda="Preparación"
          nombre={`preparacion-${categoria.id}`}
          opciones={categoria.preparaciones.map((opcion) => ({ id: opcion.id, nombre: opcion.nombre, detalle: opcion.tamanos.length === 1 ? precioVisible(opcion.tamanos[0] ?? tamano) : undefined }))}
          seleccion={preparacion.id}
          alCambiar={setIdPreparacion}
        />
      ) : null}
      {preparacion.tamanos.length > 1 ? (
        <Selector
          leyenda="Tamaño"
          nombre={`tamano-${categoria.id}`}
          opciones={preparacion.tamanos.map((opcion) => ({ id: opcion.id, nombre: opcion.nombre, detalle: precioVisible(opcion) }))}
          seleccion={tamano.id}
          alCambiar={setIdTamano}
        />
      ) : null}
      {categoria.nota ? <p className="text-tinta/80">{categoria.nota}</p> : null}
      <ul className="grid divide-y divide-tinta/10 md:grid-cols-2 md:gap-x-10 md:divide-y-0">
        {categoria.productos.map((producto) => (
          <FilaProducto
            key={producto.id}
            producto={producto}
            precio={precioVisible(tamano)}
            cantidad={cantidadDe(producto)}
            alAgregar={() =>
              acciones.agregar({
                clave: claveDe(producto),
                descripcion: describirLinea(categoria, preparacion, tamano, producto),
                colones: tamano.colones,
              })
            }
          />
        ))}
      </ul>
    </div>
  )
}

export const Menu: FC = () => {
  const [idActiva, setIdActiva] = useState(MENU[0]?.id ?? '')
  const activa = MENU.find((categoria) => categoria.id === idActiva) ?? MENU[0]
  if (!activa) return null

  return (
    <section id="menu" aria-labelledby="titulo-menu" className="scroll-mt-20 bg-hielo px-4 pt-10 pb-24 md:pt-14 md:pb-32">
      <div className="mx-auto max-w-5xl">
        <h2 id="titulo-menu" className="font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-none">
          El menú
        </h2>
        <p className="mt-3 max-w-xl text-lg text-tinta/80">
          Escogé el tamaño, tocá el + en lo que querás y al final mandás el pedido por WhatsApp al local que te quede más cerca.
        </p>

        <div role="tablist" aria-label="Categorías del menú" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
          {MENU.map((categoria) => (
            <button
              key={categoria.id}
              type="button"
              role="tab"
              id={`tab-${categoria.id}`}
              aria-selected={categoria.id === activa.id}
              aria-controls={`panel-${categoria.id}`}
              onClick={() => setIdActiva(categoria.id)}
              className={cn(
                'shrink-0 rounded-full px-5 py-2.5 font-display text-lg transition-[transform,background-color] duration-150 active:scale-96',
                categoria.id === activa.id ? FONDO_CATEGORIA[categoria.color] : 'bg-nube text-tinta hover:bg-tinta/10',
              )}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activa.id}`}
          aria-labelledby={`tab-${activa.id}`}
          className="mt-6 rounded-[2rem] border-2 border-tinta bg-white p-5 shadow-[0_8px_0_var(--tribu-tinta)] md:p-8"
        >
          <PanelCategoria key={activa.id} categoria={activa} />
        </div>
      </div>
    </section>
  )
}
