import type { FC } from 'react'
import { LOCALES, REDES } from '../data/negocio'
import { formatearTelefono, linkWhatsApp } from '../lib/whatsapp'
import { EnlaceBoton } from './Boton'
import { IconoInstagram, IconoWhatsApp } from './Iconos'

export const Cierre: FC = () => (
  <footer className="gotas bg-rojo px-4 pt-20 pb-28 text-white md:pt-28">
    <div className="mx-auto max-w-5xl text-center">
      <p className="titulo-poster text-[clamp(3rem,14vw,7rem)] uppercase [--tinta-sabor:#8f0f14]">¿Qué se te antoja?</p>
      <div className="mt-8 flex justify-center">
        <EnlaceBoton href={linkWhatsApp()} externo intencion="blanco" className="text-xl">
          <IconoWhatsApp className="size-6 text-whatsapp" />
          Pedir por WhatsApp
        </EnlaceBoton>
      </div>
      <div className="mt-16 grid gap-8 border-t border-white/25 pt-10 text-left sm:grid-cols-3">
        <img src="./assets/logo.webp" alt="Tribu" width={564} height={592} loading="lazy" className="w-28 drop-shadow-[0_0_2px_#fff]" />
        <ul className="flex flex-col gap-2">
          {LOCALES.map((local) => (
            <li key={local.id}>
              <a href={local.mapa} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:underline">
                {local.nombre}
              </a>
              <span className="block text-white/80 tabular-nums">WhatsApp {formatearTelefono(local.whatsapp)}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <a href={REDES.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
            <IconoInstagram className="size-5" />@{REDES.instagram.usuario}
          </a>
          <p className="text-sm text-white/70">Tribu Batidos · Turrialba, Cartago, Costa Rica</p>
        </div>
      </div>
    </div>
  </footer>
)
