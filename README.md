# Tribu Batidos · landing

En vivo: https://tribu-pi.vercel.app

Prototipo de frontend para Tribu, batidos naturales en Turrialba (Plaza Rojitas y Plaza Nuri). Sin backend: los pedidos salen por WhatsApp con el mensaje ya armado.

## Correrlo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/ (base './', sirve desde cualquier ruta)
npm run preview   # revisa la build
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Locales, horarios, WhatsApp, redes, Express, apellidos del jueves | `src/data/negocio.ts` |
| Menú y precios | `src/data/menu.ts` |
| Sabores de la sección de favoritos (colores, frutas, ingredientes) | `src/data/favoritos.ts` |
| Colores y letras de la marca | `src/index.css` (`:root` y `@theme`) |
| Logo e imágenes | `public/assets/` |

Buscá `[PLACEHOLDER]` en el proyecto para ver lo que falta.

## Secciones

1. **Hero**: fotos de la sesión de Tribu con el logo, estado "abierto ahorita" según la hora de Costa Rica, botón "Hacer mi pedido" (lleva al menú) y botón de WhatsApp.
2. **Menú**: pestañas por categoría, tamaño y preparación con precio. El + arma un pedido; se escoge retiro en el local o Express (con dirección) y se manda por WhatsApp al local que se escoja.
3. **Favoritos**: un póster por sabor al estilo de sus historias de Instagram, con un vaso dibujado. Al bajar, el vaso se llena y se endereza y la fruta se mueve a distintas velocidades, sin detener el scroll. Cada sabor tiene su botón de pedido. Con "reducir movimiento" activado se muestran las historias reales en una cuadrícula.
4. **Promos**: La Promo de ₡1200 y el 15% de los jueves por apellido.
5. **Express**: cómo pedir a domicilio.
6. **Locales**: horario por día, estado abierto/cerrado, WhatsApp y mapa de cada local.
7. **La tribu**: el ambiente del local, con espacios para fotos reales.
8. **Instagram**: carrusel con sus historias e invitación a seguir a @mitribu2.
9. **Cierre**: CTA final y datos de contacto.

## Pendientes ([PLACEHOLDER])

- Precio de Tentación Morada, Sandía con Todo, Mangonada y Café Frío con Prote.
- Precio de los choco shakes.
- Ingredientes de Tentación Morada (se dedujeron de la foto).
- Zonas y costo del Express.
- Fotos reales de los dos locales y del equipo.
- Historia del nombre "Tribu" y slogan.
- Permiso para usar las fotos de las historias (y de los papás si salen menores).
- Link de Facebook.
- Si se compra dominio propio, cambiar la URL de `og:url`, `og:image` y `canonical` en `index.html`.

## Stack

Vite + React + TypeScript + Tailwind v4, GSAP + ScrollTrigger para la sección de favoritos y Lenis para el scroll suave. Animaciones solo con `transform` y `opacity`, y respeta `prefers-reduced-motion`.
