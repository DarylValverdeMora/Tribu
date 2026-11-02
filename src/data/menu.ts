// Menú tomado de las historias de @mitribu2. Precios confirmados por el dueño (nov. 2026).
// Un precio en null se muestra como [PLACEHOLDER] hasta que el dueño lo confirme.

export type Tamano = { id: string; nombre: string; colones: number | null }

export type Preparacion = { id: string; nombre: string; tamanos: readonly Tamano[] }

export type Producto = { id: string; nombre: string; detalle?: string }

export type Categoria = {
  id: string
  nombre: string
  nombreEnPedido: string
  color: 'lima' | 'naranja' | 'rojo' | 'amarillo' | 'morada' | 'sandia'
  nota?: string
  preparaciones: readonly Preparacion[]
  productos: readonly Producto[]
}

const granYMediano = (grande: number | null, mediano: number | null): readonly Tamano[] => [
  { id: 'grande', nombre: 'Grande', colones: grande },
  { id: 'mediano', nombre: 'Mediano', colones: mediano },
]

const unico = (colones: number | null): readonly Tamano[] => [{ id: 'unico', nombre: 'Único', colones }]

const sabores = (lista: readonly string[]): readonly Producto[] =>
  lista.map((nombre) => ({ id: nombre.toLowerCase().replaceAll(' ', '-'), nombre }))

export const MENU: readonly Categoria[] = [
  {
    id: 'agua',
    nombre: 'En agua',
    nombreEnPedido: 'Batido en agua',
    color: 'sandia',
    preparaciones: [{ id: 'agua', nombre: 'En agua', tamanos: granYMediano(1700, 1600) }],
    productos: sabores([
      'Sandía, fresa, limón y hierbabuena',
      'Naranja, fresa y maracuyá',
      'Mango, fresa y piña',
      'Banano, papaya y naranja',
      'Limón, naranja y piña',
      'Limonada con hierbabuena',
      'Manzana, banano y naranja',
      'Piña y albahaca',
      'Banano y fresa',
      'Fresa y guanábana',
      'Fresa y hierbabuena',
      'Mango, banano y papaya',
      'Mora, fresa y naranja',
      'Piña, naranja y papaya',
    ]),
  },
  {
    id: 'milkshake',
    nombre: 'Milkshakes',
    nombreEnPedido: 'Milkshake',
    color: 'morada',
    preparaciones: [
      { id: 'helado-yogurt', nombre: 'Con helado y yogurt', tamanos: granYMediano(3400, 3100) },
      { id: 'leche', nombre: 'Solo en leche', tamanos: granYMediano(2600, 2100) },
    ],
    productos: sabores([
      'Oreo',
      'Churchill',
      'Chocomenta',
      'Mantequilla de maní',
      'Sandía, banano y crema de coco',
      'Mango, banano y papaya',
      'Fresa y guanábana',
      'Sandía y maracuyá',
      'Piña y crema de coco',
    ]).map((producto) =>
      producto.id === 'mantequilla-de-maní' ? { ...producto, detalle: 'Con banano y leche' } : producto,
    ),
  },
  {
    id: 'choco',
    nombre: 'Choco shakes',
    nombreEnPedido: 'Choco shake',
    color: 'naranja',
    preparaciones: [{ id: 'choco', nombre: 'Choco shake', tamanos: granYMediano(null, null) }],
    productos: sabores(['Chocolate y café', 'Chocolate y banano']),
  },
  {
    id: 'funcionales',
    nombre: 'Funcionales',
    nombreEnPedido: 'Funcional',
    color: 'lima',
    nota: 'Para antes o después del entreno.',
    preparaciones: [{ id: 'funcional', nombre: 'Funcional', tamanos: granYMediano(2300, 1700) }],
    productos: [
      { id: 'proteinico', nombre: 'Proteínico', detalle: 'Naranja, banano y proteína de soya' },
      { id: 'pura-energia', nombre: 'Pura energía', detalle: 'Espinaca, remolacha, piña y banano' },
      { id: 'control-de-peso', nombre: 'Control de peso', detalle: 'Piña, apio, pepino y perejil' },
      { id: 'ansiedad', nombre: 'Control de ansiedad y energético', detalle: 'Kale, piña y naranja' },
      { id: 'colesterol', nombre: 'Menos colesterol', detalle: 'Apio, piña, zanahoria y jengibre' },
      { id: 'limonada-especial', nombre: 'Limonada especial', detalle: 'Bomba de vitamina C' },
      { id: 'cardio-frutas', nombre: 'Cardio frutas', detalle: 'Banano, piña, mango y aguacate' },
    ],
  },
  {
    id: 'ensalada',
    nombre: 'Ensalada de frutas',
    nombreEnPedido: 'Ensalada de frutas',
    color: 'rojo',
    nota: 'Extras a ₡500.',
    preparaciones: [
      { id: 'sola', nombre: 'Sola', tamanos: unico(1700) },
      { id: 'granola', nombre: 'Con granola', tamanos: unico(2100) },
      { id: 'yogurt', nombre: 'Con yogurt', tamanos: unico(2100) },
      { id: 'yogurt-granola', nombre: 'Con yogurt y granola', tamanos: unico(2600) },
    ],
    productos: [{ id: 'ensalada', nombre: 'Ensalada de frutas'}],
  },
  {
    id: 'jugo',
    nombre: 'Jugo de naranja',
    nombreEnPedido: 'Jugo de naranja',
    color: 'amarillo',
    preparaciones: [
      {
        id: 'natural',
        nombre: 'Natural',
        tamanos: [
          { id: 'pequeno', nombre: 'Pequeño', colones: 950 },
          { id: 'mediano', nombre: 'Mediano', colones: 1700 },
          { id: 'grande', nombre: 'Grande', colones: 2400 },
        ],
      },
    ],
    productos: [{ id: 'jugo-naranja', nombre: 'Jugo de naranja'}],
  },
]

export const formatearColones = (colones: number): string =>
  `₡${colones.toLocaleString('es-CR', { maximumFractionDigits: 0 })}`
