import type { FC, ReactNode } from 'react'
import type { TipoFruta } from '../data/favoritos'

const Fresa = (
  <>
    <path d="M50 92C30 86 14 64 16 44c1-12 12-18 34-18s33 6 34 18c2 20-14 42-34 48Z" fill="#e2231a" />
    <path d="M50 92C40 88 26 74 22 56c12 10 26 12 28 36Z" fill="#b5141a" opacity="0.5" />
    {[
      [32, 44],
      [46, 40],
      [60, 44],
      [70, 54],
      [38, 58],
      [54, 56],
      [44, 72],
      [60, 70],
      [28, 60],
      [50, 84],
    ].map(([cx, cy]) => (
      <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="1.8" ry="2.6" fill="#ffd84a" />
    ))}
    <path d="M50 30c-6-10-20-12-28-6 8 0 14 4 16 8-8-2-16 2-18 8 8-4 18-4 30-2 12-2 22-2 30 2-2-6-10-10-18-8 2-4 8-8 16-8-8-6-22-4-28 6Z" fill="#3f9b2f" />
    <path d="M48 30c0-10 2-18 6-24" stroke="#2f7a22" strokeWidth="4" strokeLinecap="round" fill="none" />
    <ellipse cx="34" cy="46" rx="6" ry="10" fill="#fff" opacity="0.25" transform="rotate(-25 34 46)" />
  </>
)

const Mora = (
  <>
    {[
      [38, 40],
      [52, 36],
      [64, 44],
      [34, 54],
      [48, 52],
      [62, 58],
      [40, 68],
      [54, 68],
      [47, 82],
    ].map(([cx, cy]) => (
      <g key={`${cx}-${cy}`}>
        <circle cx={cx} cy={cy} r="10" fill="#1f1530" />
        <circle cx={(cx ?? 0) - 3} cy={(cy ?? 0) - 3} r="3" fill="#6e5a8c" opacity="0.8" />
      </g>
    ))}
    <path d="M50 28c-8-6-18-4-22 2 8-1 14 2 16 6 2-4 4-6 6-8Zm0 0c8-6 18-4 22 2-8-1-14 2-16 6-2-4-4-6-6-8Z" fill="#4b9a35" />
  </>
)

const Arandano = (
  <>
    <circle cx="50" cy="52" r="40" fill="#2c3f7a" />
    <circle cx="50" cy="52" r="40" fill="url(#brillo-arandano)" />
    <path d="M42 22l8 8 8-8-2 10h-12Z" fill="#1a2550" />
    <defs>
      <radialGradient id="brillo-arandano" cx="0.35" cy="0.3" r="0.7">
        <stop offset="0" stopColor="#8ea4e0" stopOpacity="0.8" />
        <stop offset="0.6" stopColor="#2c3f7a" stopOpacity="0" />
      </radialGradient>
    </defs>
  </>
)

const Banano = (
  <>
    <path d="M14 30c10 30 34 50 74 46 4 0 6 4 2 7C56 96 18 76 8 34c-1-6 4-8 6-4Z" fill="#ffd23a" />
    <path d="M14 30c10 30 34 50 74 46-30 10-58-8-70-40Z" fill="#f2b705" />
    <path d="M10 28c-2-6 0-12 4-14l4 8Z" fill="#6b4a1c" />
    <circle cx="90" cy="80" r="3" fill="#5a3a14" />
  </>
)

const Papaya = (
  <>
    <path d="M50 6c26 0 40 24 40 50S72 94 50 94 10 82 10 56 24 6 50 6Z" fill="#8ab83a" />
    <path d="M50 12c22 0 34 22 34 44S70 88 50 88 16 78 16 56 28 12 50 12Z" fill="#ff7a2f" />
    <path d="M50 34c10 0 14 10 14 22s-6 22-14 22-14-10-14-22 4-22 14-22Z" fill="#ffb37a" />
    {[
      [46, 44],
      [54, 46],
      [48, 54],
      [56, 56],
      [46, 64],
      [54, 66],
      [50, 72],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.6" fill="#1b1410" />
    ))}
  </>
)

const Sandia = (
  <>
    <path d="M6 30h88c0 34-20 58-44 58S6 64 6 30Z" fill="#2f8f3a" />
    <path d="M12 30h76c0 28-17 50-38 50S12 58 12 30Z" fill="#e9f5c9" />
    <path d="M16 30h68c0 24-15 44-34 44S16 54 16 30Z" fill="#f2384a" />
    {[
      [32, 40],
      [50, 44],
      [68, 40],
      [42, 56],
      [58, 56],
    ].map(([cx, cy]) => (
      <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="2.4" ry="4" fill="#2a1a14" />
    ))}
  </>
)

const Limon = (
  <>
    <circle cx="50" cy="50" r="42" fill="#5fae2e" />
    <circle cx="50" cy="50" r="37" fill="#e9f7b6" />
    <circle cx="50" cy="50" r="33" fill="#a8d94a" />
    {Array.from({ length: 8 }, (_, indice) => (
      <path
        key={indice}
        d="M50 50 L50 20"
        stroke="#e9f7b6"
        strokeWidth="3"
        transform={`rotate(${indice * 45} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="5" fill="#e9f7b6" />
  </>
)

const Hoja = (
  <>
    <path d="M10 86C14 40 44 12 92 10 88 56 58 86 10 86Z" fill="#3e9b3a" />
    <path d="M10 86C34 60 58 36 92 10" stroke="#2a7428" strokeWidth="3" fill="none" />
    <path d="M10 86C14 40 44 12 92 10 70 30 40 50 10 86Z" fill="#5cb84a" opacity="0.6" />
  </>
)

const Hierbabuena = (
  <>
    <path d="M50 92V40" stroke="#2f7a2a" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 58C30 60 18 46 20 30c16 0 28 10 30 28Z" fill="#4caf50" />
    <path d="M50 50c20 2 32-12 30-28-16 0-28 10-30 28Z" fill="#5cc35e" />
    <path d="M50 40c-8-10-6-24 0-32 6 8 8 22 0 32Z" fill="#6fd46d" />
  </>
)

const Mango = (
  <>
    <path d="M60 8c22 8 34 34 26 58S52 96 32 88 6 58 14 36 38 0 60 8Z" fill="#ffb020" />
    <path d="M60 8c22 8 34 34 26 58-10-20-30-40-60-38C34 12 46 4 60 8Z" fill="#ffd34a" />
    <path d="M32 88c-20-8-26-30-18-52 6 22 20 40 44 50-8 4-18 6-26 2Z" fill="#f2541b" opacity="0.6" />
    <path d="M60 8c2-4 6-6 10-6" stroke="#5a3a14" strokeWidth="3" strokeLinecap="round" />
  </>
)

const Chile = (
  <>
    <path d="M22 20c10 4 14 14 18 30 6 22 22 34 46 36-28 10-56-4-62-36-2-12 0-24-2-30Z" fill="#e0261f" />
    <path d="M26 30c6 10 8 24 18 36" stroke="#ff7a6b" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M22 20c-2-8 2-14 10-16l2 6c-4 2-6 6-4 12Z" fill="#3f8f2a" />
  </>
)

const GranoCafe = (
  <>
    <ellipse cx="50" cy="50" rx="30" ry="42" fill="#5a2f14" transform="rotate(20 50 50)" />
    <path d="M40 14c14 18 6 52 20 72" stroke="#2a140a" strokeWidth="5" strokeLinecap="round" fill="none" />
    <ellipse cx="38" cy="36" rx="6" ry="12" fill="#8a5332" opacity="0.6" transform="rotate(20 38 36)" />
  </>
)

const DIBUJOS: Record<TipoFruta, ReactNode> = {
  fresa: Fresa,
  mora: Mora,
  arandano: Arandano,
  banano: Banano,
  papaya: Papaya,
  sandia: Sandia,
  limon: Limon,
  hierbabuena: Hierbabuena,
  mango: Mango,
  chile: Chile,
  'grano-cafe': GranoCafe,
  hoja: Hoja,
}

type FrutaProps = { tipo: TipoFruta; className?: string }

export const Fruta: FC<FrutaProps> = ({ tipo, className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
    {DIBUJOS[tipo]}
  </svg>
)
