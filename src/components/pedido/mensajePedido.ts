import { formatearColones } from '../../data/menu'
import type { LineaPedido } from './PedidoContext'

const precioDeLinea = (linea: LineaPedido): string =>
  linea.colones === null ? 'precio por confirmar' : formatearColones(linea.colones * linea.cantidad)

export const armarMensajeDePedido = (
  lineas: readonly LineaPedido[],
  total: number,
  totalCompleto: boolean,
  local: string,
): string => {
  const detalle = lineas.map((linea) => `• ${linea.cantidad} × ${linea.descripcion} (${precioDeLinea(linea)})`)
  const lineaTotal = totalCompleto ? `Total: ${formatearColones(total)}` : `Total aproximado: ${formatearColones(total)} + lo que falta confirmar`
  return [
    `¡Hola Tribu! Quiero hacer este pedido en ${local}:`,
    '',
    ...detalle,
    '',
    lineaTotal,
    '',
    'Es para (recoger o Express a esta dirección): ',
  ].join('\n')
}
