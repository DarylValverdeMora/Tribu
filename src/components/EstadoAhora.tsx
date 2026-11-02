import type { FC } from 'react'
import { LOCALES } from '../data/negocio'
import { estadoDelLocal } from '../lib/horario'
import { cn } from '../lib/cn'

const textoDeEstado = (): { abierto: boolean; texto: string } => {
  const abiertos = LOCALES.filter((local) => estadoDelLocal(local).tipo === 'abierto')
  if (abiertos.length === LOCALES.length) return { abierto: true, texto: 'Los dos locales están abiertos ahorita' }
  const [primero] = abiertos
  if (primero) return { abierto: true, texto: `Abierto ahorita en ${primero.nombre}` }
  return { abierto: false, texto: 'Ahorita los dos locales están cerrados' }
}

export const EstadoAhora: FC<{ className?: string }> = ({ className }) => {
  const estado = textoDeEstado()
  return (
    <p className={cn('inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-semibold shadow-sm', className)}>
      <span className={cn('size-2.5 rounded-full', estado.abierto ? 'bg-whatsapp' : 'bg-rojo')} aria-hidden="true" />
      {estado.texto}
    </p>
  )
}
