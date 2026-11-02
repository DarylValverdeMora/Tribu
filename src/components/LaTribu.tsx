import type { FC } from 'react'
import { PLACEHOLDER } from '../data/negocio'

const ESPACIOS_DE_FOTO = [
  { id: 'local-rojitas', texto: 'Foto del local en Plaza Rojitas' },
  { id: 'local-nuri', texto: 'Foto del local en Plaza Nuri' },
  { id: 'equipo', texto: 'Foto del equipo o de clientes (con permiso)' },
] as const

export const LaTribu: FC = () => (
  <section aria-labelledby="titulo-tribu" className="bg-tinta px-4 py-20 text-white md:py-28">
    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
      <div>
        <h2 id="titulo-tribu" className="font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-none text-amarillo">
          En la tribu cabe todo mundo
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-white/85">
          El que viene del entreno por un Proteínico. La familia que pide milkshakes de Oreo para los chiquitos. El que
          arranca el día con un jugo de naranja a las 8 de la mañana.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-white/85">Tropical, deportivo y familiar: así se siente Tribu.</p>
        <p className="mt-6 rounded-2xl border-2 border-dashed border-white/30 p-4 text-sm text-white/70">
          {PLACEHOLDER} Historia de por qué se llama Tribu y slogan, si el dueño lo quiere contar.
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {ESPACIOS_DE_FOTO.map((foto, indice) => (
          <li
            key={foto.id}
            className={
              indice === 0
                ? 'col-span-2 grid aspect-video place-items-center rounded-3xl border-2 border-dashed border-white/30 p-4 text-center text-sm text-white/60'
                : 'grid aspect-square place-items-center rounded-3xl border-2 border-dashed border-white/30 p-4 text-center text-sm text-white/60'
            }
          >
            {PLACEHOLDER} {foto.texto}
          </li>
        ))}
      </ul>
    </div>
  </section>
)
