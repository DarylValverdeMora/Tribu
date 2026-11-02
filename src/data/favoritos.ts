// Los sabores que Tribu ya presume en sus historias. Cada uno se vuelve una "historia" en la página.

export type TipoFruta =
  | 'fresa'
  | 'mora'
  | 'arandano'
  | 'banano'
  | 'papaya'
  | 'sandia'
  | 'limon'
  | 'hierbabuena'
  | 'mango'
  | 'chile'
  | 'grano-cafe'
  | 'hoja'

export type FrutaEnEscena = {
  tipo: TipoFruta
  // Posición en % del escenario (0-100), tamaño en % del ancho del vaso y giro en grados
  x: number
  y: number
  tamano: number
  giro: number
}

export type Favorito = {
  id: string
  nombre: string
  lineaArriba: string
  lineaGrande: string
  ingredientes: readonly string[]
  colones: number | null
  ingredientesPorConfirmar?: boolean
  fondo: string
  tinta: string
  liquido: { arriba: string; abajo: string }
  vetas?: string
  imagen: string
  frutas: readonly FrutaEnEscena[]
}

export const FAVORITOS: readonly Favorito[] = [
  {
    id: 'tentacion-morada',
    nombre: 'Tentación Morada',
    lineaArriba: 'Tentación',
    lineaGrande: 'Morada',
    ingredientes: ['Mora', 'Arándano', 'Fresa', 'Leche'],
    // [PLACEHOLDER] ingredientes deducidos de la foto de la historia, confirmar con el dueño
    ingredientesPorConfirmar: true,
    colones: null,
    fondo: 'var(--sabor-morada)',
    tinta: '#5b2f94',
    liquido: { arriba: '#9a5fc8', abajo: '#5a2f86' },
    imagen: './assets/tentacion-morada.webp',
    frutas: [
      { tipo: 'mora', x: 8, y: 30, tamano: 30, giro: -20 },
      { tipo: 'mora', x: 16, y: 44, tamano: 22, giro: 15 },
      { tipo: 'arandano', x: 84, y: 64, tamano: 18, giro: 0 },
      { tipo: 'arandano', x: 76, y: 74, tamano: 14, giro: 0 },
      { tipo: 'fresa', x: 86, y: 22, tamano: 30, giro: 25 },
      { tipo: 'fresa', x: 12, y: 80, tamano: 34, giro: -10 },
    ],
  },
  {
    id: 'la-promo',
    nombre: 'La Promo',
    lineaArriba: 'Todos los días',
    lineaGrande: 'La Promo',
    ingredientes: ['Banano', 'Papaya', 'Leche'],
    colones: 1200,
    fondo: 'var(--sabor-promo)',
    tinta: '#8a5a00',
    liquido: { arriba: '#c99a7c', abajo: '#a3735a' },
    imagen: './assets/la-promo.webp',
    frutas: [
      { tipo: 'papaya', x: 10, y: 74, tamano: 46, giro: -12 },
      { tipo: 'banano', x: 86, y: 56, tamano: 40, giro: 30 },
      { tipo: 'hoja', x: 88, y: 20, tamano: 34, giro: 40 },
      { tipo: 'hoja', x: 8, y: 24, tamano: 30, giro: -50 },
      { tipo: 'papaya', x: 82, y: 84, tamano: 28, giro: 20 },
    ],
  },
  {
    id: 'sandia-con-todo',
    nombre: 'Sandía con Todo',
    lineaArriba: 'Sandía',
    lineaGrande: 'Con todo',
    ingredientes: ['Fresa', 'Sandía', 'Limón', 'Hierbabuena'],
    colones: null,
    fondo: 'var(--sabor-sandia)',
    tinta: '#1f5f8f',
    liquido: { arriba: '#e8606a', abajo: '#b8323f' },
    imagen: './assets/sandia-con-todo.webp',
    frutas: [
      { tipo: 'sandia', x: 10, y: 40, tamano: 40, giro: -25 },
      { tipo: 'limon', x: 88, y: 46, tamano: 26, giro: 10 },
      { tipo: 'fresa', x: 14, y: 82, tamano: 36, giro: -8 },
      { tipo: 'hierbabuena', x: 86, y: 18, tamano: 30, giro: 30 },
      { tipo: 'fresa', x: 84, y: 80, tamano: 22, giro: 18 },
      { tipo: 'limon', x: 8, y: 16, tamano: 20, giro: -30 },
    ],
  },
  {
    id: 'mangonada',
    nombre: 'Mango Era Mangonada',
    lineaArriba: 'Mango era',
    lineaGrande: 'Mangonada',
    ingredientes: ['Mango', 'Limón', 'Tajín', 'Chamoy'],
    colones: null,
    fondo: 'var(--sabor-mango)',
    tinta: '#9a4a00',
    liquido: { arriba: '#ffd23f', abajo: '#f7a21b' },
    vetas: '#c8202f',
    imagen: './assets/mangonada.webp',
    frutas: [
      { tipo: 'mango', x: 10, y: 60, tamano: 38, giro: -15 },
      { tipo: 'hoja', x: 86, y: 30, tamano: 30, giro: 60 },
      { tipo: 'limon', x: 88, y: 74, tamano: 26, giro: 15 },
      { tipo: 'chile', x: 12, y: 24, tamano: 26, giro: -35 },
      { tipo: 'mango', x: 84, y: 88, tamano: 24, giro: 25 },
    ],
  },
  {
    id: 'cafe-prote',
    nombre: 'Café Frío con Prote',
    lineaArriba: 'Café frío',
    lineaGrande: 'Con prote',
    ingredientes: ['Café', 'Prote', 'Chocolate'],
    colones: null,
    fondo: 'var(--sabor-cafe)',
    tinta: '#4a2610',
    liquido: { arriba: '#d2ad88', abajo: '#7a4f30' },
    vetas: '#4a2610',
    imagen: './assets/cafe-prote.webp',
    frutas: [
      { tipo: 'grano-cafe', x: 86, y: 34, tamano: 18, giro: 30 },
      { tipo: 'grano-cafe', x: 80, y: 46, tamano: 14, giro: -20 },
      { tipo: 'grano-cafe', x: 12, y: 70, tamano: 20, giro: 60 },
      { tipo: 'grano-cafe', x: 18, y: 26, tamano: 14, giro: -45 },
      { tipo: 'grano-cafe', x: 88, y: 82, tamano: 16, giro: 10 },
    ],
  },
]
