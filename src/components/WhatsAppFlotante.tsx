import type { FC } from 'react'
import { linkWhatsApp } from '../lib/whatsapp'
import { IconoWhatsApp } from './Iconos'
import { usePedido } from './pedido/PedidoContext'

export const WhatsAppFlotante: FC = () => {
  const { estado } = usePedido()
  if (estado.unidades > 0) return null
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      className="fixed right-4 bottom-4 z-50 grid size-16 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgb(0_0_0/0.3)] transition-transform duration-150 ease-out active:scale-90"
    >
      <IconoWhatsApp className="size-8" />
    </a>
  )
}
