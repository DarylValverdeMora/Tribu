// Todo el contenido editable del negocio vive aquí.
// Buscá "[PLACEHOLDER]" para ver lo que falta confirmar con el dueño.

export type DiaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type Franja = { abre: string; cierra: string }

export type Local = {
  id: 'rojitas' | 'nuri'
  nombre: string
  zona: string
  whatsapp: string
  mapa: string
  // Lo que se busca en el mapa embebido. Si el pin no cae en el local, cambiá esto por la dirección o coordenadas.
  busquedaMapa: string
  horario: Record<DiaSemana, Franja | null>
}

export const ZONA_HORARIA = 'America/Costa_Rica'

export const NOMBRE_DIAS: Record<DiaSemana, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
}

const ROJITAS_ABIERTO: Franja = { abre: '08:00', cierra: '17:45' }
const NURI_SEMANA: Franja = { abre: '09:00', cierra: '19:00' }
const NURI_DOMINGO: Franja = { abre: '09:00', cierra: '18:00' }

export const LOCALES: readonly Local[] = [
  {
    id: 'rojitas',
    nombre: 'Plaza Rojitas',
    zona: 'Turrialba, Cartago',
    whatsapp: '50688544807',
    mapa: 'https://maps.app.goo.gl/CdXzSFFSRT2QdSFTA',
    busquedaMapa: 'Tribu Batidos, Plaza Rojitas, Turrialba, Cartago',
    horario: {
      0: null,
      1: ROJITAS_ABIERTO,
      2: ROJITAS_ABIERTO,
      3: ROJITAS_ABIERTO,
      4: ROJITAS_ABIERTO,
      5: ROJITAS_ABIERTO,
      6: ROJITAS_ABIERTO,
    },
  },
  {
    id: 'nuri',
    nombre: 'Plaza Nuri',
    zona: 'Turrialba, Cartago',
    whatsapp: '50689385342',
    mapa: 'https://maps.app.goo.gl/kfXFmfsVeyvVh1NK6',
    busquedaMapa: 'Tribu Batidos, Plaza Nuri, Turrialba, Cartago',
    horario: {
      0: NURI_DOMINGO,
      1: NURI_SEMANA,
      2: null,
      3: NURI_SEMANA,
      4: NURI_SEMANA,
      5: NURI_SEMANA,
      6: NURI_SEMANA,
    },
  },
]

export const WHATSAPP_PRINCIPAL = '50688544807'

export const REDES = {
  instagram: { usuario: 'mitribu2', url: 'https://www.instagram.com/mitribu2/' },
  facebook: { nombre: 'Tribu', url: '[PLACEHOLDER] link de Facebook' },
} as const

export const EXPRESS = {
  zonas: '[PLACEHOLDER] zonas de entrega',
  costo: '[PLACEHOLDER] costo del envío',
} as const

export const JUEVES_DE_APELLIDOS = {
  descuento: 15,
  // Se cambian cada semana. Vacío = se muestra la invitación a ver las historias.
  apellidosDeLaSemana: [] as readonly string[],
} as const

export const PLACEHOLDER = '[PLACEHOLDER]'

export const esPlaceholder = (valor: string): boolean => valor.startsWith(PLACEHOLDER)
