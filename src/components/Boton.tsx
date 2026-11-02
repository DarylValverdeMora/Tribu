import type { FC, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const boton = tv({
  base: 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-lg leading-none transition-[transform,background-color] duration-150 ease-out select-none active:scale-96',
  variants: {
    intencion: {
      whatsapp: 'bg-whatsapp text-white shadow-[0_5px_0_#137a3e] hover:bg-[#1c9e52]',
      tinta: 'bg-tinta text-white shadow-[0_5px_0_#000] hover:bg-black',
      blanco: 'bg-white text-tinta shadow-[0_5px_0_rgb(0_0_0/0.15)] hover:bg-nube',
      contorno: 'border-2 border-tinta bg-transparent text-tinta hover:bg-tinta/5',
    },
  },
  defaultVariants: { intencion: 'tinta' },
})

type EnlaceBotonProps = VariantProps<typeof boton> & {
  href: string
  children: ReactNode
  className?: string
  externo?: boolean
}

export const EnlaceBoton: FC<EnlaceBotonProps> = ({ href, children, className, externo = false, intencion }) => (
  <a
    href={href}
    className={boton({ intencion, class: className })}
    {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
  >
    {children}
  </a>
)
