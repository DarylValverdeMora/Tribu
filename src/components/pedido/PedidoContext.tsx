import { createContext, useContext, useMemo, useReducer, type FC, type ReactNode } from 'react'

export type LineaPedido = {
  clave: string
  descripcion: string
  colones: number | null
  cantidad: number
}

type NuevaLinea = Omit<LineaPedido, 'cantidad'>

type Accion =
  | { tipo: 'agregar'; linea: NuevaLinea }
  | { tipo: 'quitar'; clave: string }
  | { tipo: 'vaciar' }

const reducirPedido = (lineas: readonly LineaPedido[], accion: Accion): readonly LineaPedido[] => {
  switch (accion.tipo) {
    case 'agregar': {
      const existe = lineas.some((linea) => linea.clave === accion.linea.clave)
      if (!existe) return [...lineas, { ...accion.linea, cantidad: 1 }]
      return lineas.map((linea) => (linea.clave === accion.linea.clave ? { ...linea, cantidad: linea.cantidad + 1 } : linea))
    }
    case 'quitar':
      return lineas
        .map((linea) => (linea.clave === accion.clave ? { ...linea, cantidad: linea.cantidad - 1 } : linea))
        .filter((linea) => linea.cantidad > 0)
    case 'vaciar':
      return []
    default: {
      const imposible: never = accion
      return imposible
    }
  }
}

type ValorPedido = {
  estado: { lineas: readonly LineaPedido[]; unidades: number; total: number; totalCompleto: boolean }
  acciones: { agregar: (linea: NuevaLinea) => void; quitar: (clave: string) => void; vaciar: () => void }
}

const PedidoContext = createContext<ValorPedido | null>(null)

export const PedidoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [lineas, despachar] = useReducer(reducirPedido, [])

  const valor = useMemo<ValorPedido>(
    () => ({
      estado: {
        lineas,
        unidades: lineas.reduce((suma, linea) => suma + linea.cantidad, 0),
        total: lineas.reduce((suma, linea) => suma + (linea.colones ?? 0) * linea.cantidad, 0),
        totalCompleto: lineas.every((linea) => linea.colones !== null),
      },
      acciones: {
        agregar: (linea) => despachar({ tipo: 'agregar', linea }),
        quitar: (clave) => despachar({ tipo: 'quitar', clave }),
        vaciar: () => despachar({ tipo: 'vaciar' }),
      },
    }),
    [lineas],
  )

  return <PedidoContext.Provider value={valor}>{children}</PedidoContext.Provider>
}

export const usePedido = (): ValorPedido => {
  const valor = useContext(PedidoContext)
  if (!valor) throw new Error('usePedido se usa dentro de <PedidoProvider>')
  return valor
}
