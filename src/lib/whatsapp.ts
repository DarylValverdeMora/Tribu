import { WHATSAPP_PRINCIPAL } from '../data/negocio'

export const MENSAJE_GENERAL = '¡Hola Tribu! Quiero hacer un pedido.'

export const linkWhatsApp = (mensaje: string = MENSAJE_GENERAL, numero: string = WHATSAPP_PRINCIPAL): string =>
  `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`

export const mensajeDeSabor = (sabor: string): string => `¡Hola Tribu! Quiero pedir un ${sabor}. ¿Lo tienen hoy?`

export const formatearTelefono = (numero: string): string => {
  const local = numero.replace(/^506/, '')
  return `${local.slice(0, 4)}-${local.slice(4)}`
}
