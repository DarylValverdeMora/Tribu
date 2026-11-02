import { useSyncExternalStore } from 'react'

const CONSULTA = '(prefers-reduced-motion: reduce)'

const suscribir = (avisar: () => void) => {
  const media = window.matchMedia(CONSULTA)
  media.addEventListener('change', avisar)
  return () => media.removeEventListener('change', avisar)
}

export const useMovimientoReducido = (): boolean =>
  useSyncExternalStore(suscribir, () => window.matchMedia(CONSULTA).matches, () => false)
