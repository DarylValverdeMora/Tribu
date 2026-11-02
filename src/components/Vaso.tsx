import type { FC } from 'react'
import type { Favorito } from '../data/favoritos'
import { cn } from '../lib/cn'

const CONTORNO_VASO = 'M20 40 L180 40 L160 270 Q159 278 151 278 L49 278 Q41 278 40 270 Z'
const ALTO_LIQUIDO = 236
const BORDE_LIQUIDO = 46
const ESTRIAS = Array.from({ length: 31 }, (_, indice) => 52 + indice * 7.2)

const VetasDeSabor: FC<{ color: string }> = ({ color }) => (
  <g fill={color} opacity="0.6">
    <path d="M30 90c14 20 2 40 16 62s-4 48 10 70 4 40 8 60H40Z" />
    <path d="M150 70c-10 24 6 44-6 66s8 40-2 64 6 40 4 80h22V70Z" opacity="0.8" />
    <path d="M86 150c8 16-6 30 4 46s-4 30 6 46 0 24 2 36H78c6-20-6-40 2-60s-4-44 6-68Z" opacity="0.55" />
  </g>
)

const LiquidoDeSabor: FC<{ favorito: Favorito }> = ({ favorito }) => {
  const idGradiente = `liquido-${favorito.id}`
  return (
    <g className="liquido" data-sabor={favorito.id}>
      <defs>
        <linearGradient id={idGradiente} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={favorito.liquido.arriba} />
          <stop offset="1" stopColor={favorito.liquido.abajo} />
        </linearGradient>
      </defs>
      <rect x="0" y={BORDE_LIQUIDO} width="200" height={ALTO_LIQUIDO + 10} fill={`url(#${idGradiente})`} />
      {favorito.vetas ? <VetasDeSabor color={favorito.vetas} /> : null}
      <ellipse cx="100" cy={BORDE_LIQUIDO + 2} rx="92" ry="7" fill={favorito.liquido.arriba} />
      <ellipse cx="100" cy={BORDE_LIQUIDO} rx="84" ry="4" fill="#fff" opacity="0.28" />
    </g>
  )
}

type VasoProps = { favoritos: readonly Favorito[]; className?: string }

export const Vaso: FC<VasoProps> = ({ favoritos, className }) => (
  <svg viewBox="-10 -70 220 360" className={cn('overflow-visible', className)} aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="clip-vaso">
        <path d={CONTORNO_VASO} />
      </clipPath>
      <linearGradient id="brillo-vaso" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
        <stop offset="0.16" stopColor="#fff" stopOpacity="0.08" />
        <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.92" stopColor="#fff" stopOpacity="0.22" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>

    <ellipse cx="100" cy="282" rx="70" ry="9" fill="#000" opacity="0.14" />

    <g className="pajilla">
      <rect x="112" y="-64" width="13" height="170" rx="6" fill="#43b02a" transform="rotate(10 118 20)" />
      <rect x="114" y="-64" width="4" height="170" rx="2" fill="#9be07f" opacity="0.7" transform="rotate(10 118 20)" />
    </g>

    <g clipPath="url(#clip-vaso)">
      <rect x="0" y="0" width="200" height="290" fill="#ffffff" opacity="0.28" />
      {favoritos.map((favorito) => (
        <LiquidoDeSabor key={favorito.id} favorito={favorito} />
      ))}
      {ESTRIAS.map((y) => (
        <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#fff" strokeOpacity="0.13" strokeWidth="1.6" />
      ))}
      <path d={CONTORNO_VASO} fill="url(#brillo-vaso)" />
    </g>

    <path d={CONTORNO_VASO} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
    <rect x="10" y="30" width="180" height="16" rx="8" fill="#fff" opacity="0.92" />
    <rect x="16" y="33" width="168" height="4" rx="2" fill="#fff" />
  </svg>
)
