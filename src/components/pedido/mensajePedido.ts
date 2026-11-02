import { formatearColones } from '../../data/menu'
import type { LineaPedido } from './PedidoContext'

export type Entrega = { tipo: 'retiro' } | { tipo: 'express'; direccion: string }

type DatosMensaje = {
  lineas: readonly LineaPedido[]
  total: number
  totalCompleto: boolean
  local: string
  entrega: Entrega
}

const precioDeLinea = (linea: LineaPedido): string =>
  linea.colones === null ? 'precio por confirmar' : formatearColones(linea.colones * linea.cantidad)

const textoEntrega = (entrega: Entrega, local: string): readonly string[] => {
  switch (entrega.tipo) {
    case 'retiro':
      return [`Lo paso a recoger a ${local}.`]
    case 'express':
      return ['Lo quiero por Express a esta dirección:', entrega.direccion.trim()]
    default: {
      const imposible: never = entrega
      return imposible
    }
  }
}

export const armarMensajeDePedido = ({ lineas, total, totalCompleto, local, entrega }: DatosMensaje): string => {
  const detalle = lineas.map((linea) => `• ${linea.cantidad} × ${linea.descripcion} (${precioDeLinea(linea)})`)
  const lineaTotal = totalCompleto
    ? `Total: ${formatearColones(total)}`
    : `Total aproximado: ${formatearColones(total)} + lo que falta confirmar`
  const nota = entrega.tipo === 'express' ? ['(El costo del Express me lo confirman, por favor.)'] : []
  return [
    `¡Hola Tribu! Quiero hacer este pedido en ${local}:`,
    '',
    ...detalle,
    '',
    lineaTotal,
    '',
    ...textoEntrega(entrega, local),
    ...nota,
  ].join('\n')
}
