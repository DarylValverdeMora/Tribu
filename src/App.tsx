import type { FC } from 'react'
import { Bandeja } from './components/pedido/Bandeja'
import { PedidoProvider } from './components/pedido/PedidoContext'
import { Cierre } from './components/Cierre'
import { Express } from './components/Express'
import { Favoritos } from './components/Favoritos'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Historias } from './components/Historias'
import { LaTribu } from './components/LaTribu'
import { Locales } from './components/Locales'
import { Menu } from './components/Menu'
import { Promos } from './components/Promos'
import { WhatsAppFlotante } from './components/WhatsAppFlotante'
import { useMovimientoReducido } from './hooks/useMovimientoReducido'
import { useScrollSuave } from './hooks/useScrollSuave'

export const App: FC = () => {
  const movimientoReducido = useMovimientoReducido()
  useScrollSuave(!movimientoReducido)

  return (
    <PedidoProvider>
      <a href="#menu" className="sr-only z-[60] rounded-full bg-tinta px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Saltar al menú
      </a>
      <Header />
      <main>
        <Hero movimientoReducido={movimientoReducido} />
        <Menu />
        <Favoritos movimientoReducido={movimientoReducido} />
        <Promos />
        <Express />
        <Locales />
        <LaTribu />
        <Historias />
      </main>
      <Cierre />
      <WhatsAppFlotante />
      <Bandeja />
    </PedidoProvider>
  )
}
