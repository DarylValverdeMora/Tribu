import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useScrollSuave = (activo: boolean): void => {
  useEffect(() => {
    if (!activo) return
    const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -80 } })
    const avanzar = (segundos: number) => lenis.raf(segundos * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(avanzar)
    gsap.ticker.lagSmoothing(0)
    void document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => {
      gsap.ticker.remove(avanzar)
      lenis.destroy()
    }
  }, [activo])
}
