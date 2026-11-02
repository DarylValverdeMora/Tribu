import type { FC } from 'react'
import { formatearColones } from '../data/menu'
import { JUEVES_DE_APELLIDOS, REDES } from '../data/negocio'
import { linkWhatsApp, mensajeDeSabor } from '../lib/whatsapp'
import { EnlaceBoton } from './Boton'
import { Fruta } from './Fruta'
import { IconoInstagram, IconoWhatsApp } from './Iconos'

const PRECIO_PROMO = 1200

const TarjetaPromo: FC = () => (
  <article className="gotas relative overflow-hidden rounded-[2rem] bg-promo p-6 md:p-8" style={{ ['--tinta-sabor' as string]: '#8a5a00' }}>
    <Fruta tipo="papaya" className="absolute -right-6 -bottom-8 w-40 rotate-12 md:w-48" />
    <Fruta tipo="banano" className="absolute top-4 -right-4 w-28 -rotate-12" />
    <p className="font-semibold text-[#6b4500]">Todos los días</p>
    <h3 className="titulo-poster mt-1 text-[clamp(3rem,13vw,5rem)] uppercase">La Promo</h3>
    <p className="relative mt-3 max-w-[14rem] text-lg font-semibold text-[#4a3000]">Banano, papaya y leche.</p>
    <p className="relative mt-4 inline-block -rotate-3 rounded-full border-4 border-white bg-white/30 px-5 py-2 font-display text-4xl text-white [text-shadow:0_3px_0_#8a5a00]">
      {formatearColones(PRECIO_PROMO)}
    </p>
    <div className="relative mt-6">
      <EnlaceBoton href={linkWhatsApp(mensajeDeSabor('batido de La Promo'))} externo intencion="blanco">
        <IconoWhatsApp className="size-5 text-whatsapp" />
        Pedí La Promo
      </EnlaceBoton>
    </div>
  </article>
)

const TarjetaJueves: FC = () => {
  const apellidos = JUEVES_DE_APELLIDOS.apellidosDeLaSemana
  return (
    <article className="relative overflow-hidden rounded-[2rem] bg-sandia p-6 md:p-8">
      <div className="mx-auto max-w-sm -rotate-1 overflow-hidden rounded-3xl bg-white shadow-[0_8px_0_rgb(0_0_0/0.12)]">
        <div className="bg-amarillo px-5 py-4 text-center">
          <p className="font-semibold">Cada jueves</p>
          <p className="font-display text-4xl leading-none">{JUEVES_DE_APELLIDOS.descuento}% de descuento</p>
        </div>
        <div className="px-5 py-6 text-center">
          {apellidos.length > 0 ? (
            <ul className="font-display text-2xl leading-tight">
              {apellidos.map((apellido) => (
                <li key={apellido}>{apellido}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg leading-snug">
              Si tu apellido sale en las historias del jueves, tenés {JUEVES_DE_APELLIDOS.descuento}% menos en tu pedido.
            </p>
          )}
          <p className="mt-3 text-sm text-tinta/60">Aplican restricciones.</p>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <EnlaceBoton href={REDES.instagram.url} externo intencion="tinta">
          <IconoInstagram className="size-5" />
          Ver las historias
        </EnlaceBoton>
      </div>
    </article>
  )
}

export const Promos: FC = () => (
  <section aria-labelledby="titulo-promos" className="bg-hielo px-4 py-20 md:py-24">
    <div className="mx-auto max-w-5xl">
      <h2 id="titulo-promos" className="font-display text-[clamp(2.25rem,9vw,4rem)] leading-none">
        Para ahorrarse unos cincos
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <TarjetaPromo />
        <TarjetaJueves />
      </div>
    </div>
  </section>
)
