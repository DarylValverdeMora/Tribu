import { NOMBRE_DIAS, ZONA_HORARIA, type DiaSemana, type Franja, type Local } from '../data/negocio'

export type EstadoLocal =
  | { tipo: 'abierto'; cierra: string }
  | { tipo: 'cerrado'; proximaApertura: { dia: string; hora: string } | null }

const DIAS_EN_INGLES: Record<string, DiaSemana> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

const aMinutos = (hora: string): number => {
  const [horas = 0, minutos = 0] = hora.split(':').map(Number)
  return horas * 60 + minutos
}

export const formatearHora = (hora: string): string => {
  const minutosTotales = aMinutos(hora)
  const horas = Math.floor(minutosTotales / 60)
  const minutos = minutosTotales % 60
  const sufijo = horas >= 12 ? 'p. m.' : 'a. m.'
  const horas12 = horas % 12 === 0 ? 12 : horas % 12
  return minutos === 0 ? `${horas12} ${sufijo}` : `${horas12}:${String(minutos).padStart(2, '0')} ${sufijo}`
}

export const formatearFranja = (franja: Franja | null): string =>
  franja ? `${formatearHora(franja.abre)} a ${formatearHora(franja.cierra)}` : 'Cerrado'

const ahoraEnCostaRica = (fecha: Date): { dia: DiaSemana; minutos: number } => {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONA_HORARIA,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(fecha)
  const valor = (tipo: string): string => partes.find((parte) => parte.type === tipo)?.value ?? '0'
  return { dia: DIAS_EN_INGLES[valor('weekday')] ?? 0, minutos: Number(valor('hour')) * 60 + Number(valor('minute')) }
}

const ORDEN_DIAS: readonly DiaSemana[] = [0, 1, 2, 3, 4, 5, 6]

const siguienteDia = (dia: DiaSemana, salto: number): DiaSemana => ORDEN_DIAS[(dia + salto) % 7] ?? 0

const buscarProximaApertura = (local: Local, hoy: DiaSemana, minutos: number): EstadoLocal => {
  const franjaHoy = local.horario[hoy]
  if (franjaHoy && minutos < aMinutos(franjaHoy.abre)) {
    return { tipo: 'cerrado', proximaApertura: { dia: 'hoy', hora: formatearHora(franjaHoy.abre) } }
  }
  for (let salto = 1; salto <= 7; salto += 1) {
    const dia = siguienteDia(hoy, salto)
    const franja = local.horario[dia]
    if (franja) {
      const nombre = salto === 1 ? 'mañana' : `el ${NOMBRE_DIAS[dia].toLowerCase()}`
      return { tipo: 'cerrado', proximaApertura: { dia: nombre, hora: formatearHora(franja.abre) } }
    }
  }
  return { tipo: 'cerrado', proximaApertura: null }
}

export const estadoDelLocal = (local: Local, fecha: Date = new Date()): EstadoLocal => {
  const { dia, minutos } = ahoraEnCostaRica(fecha)
  const franja = local.horario[dia]
  const estaAbierto = franja !== null && minutos >= aMinutos(franja.abre) && minutos < aMinutos(franja.cierra)
  if (estaAbierto) return { tipo: 'abierto', cierra: formatearHora(franja.cierra) }
  return buscarProximaApertura(local, dia, minutos)
}

export const diaDeHoy = (fecha: Date = new Date()): DiaSemana => ahoraEnCostaRica(fecha).dia
