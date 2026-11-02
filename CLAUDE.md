# CLAUDE.md — Proyecto limboh

> Plantilla base. Copiar a la raíz de cada proyecto y llenar las secciones 1 y 2.
> Todo lo que diga `[PLACEHOLDER]` se llena antes de entregar. Nunca se inventa.

## 1. Proyecto

- **Cliente / negocio:** Tribu
- **Rubro y ubicación:** Negocio de batidos, Costa Rica, Cartago, Turrialba. Dos ubicaciones. Plaza Nuri y Plaza Rojitas
- **A quién le habla la página:** A los clientes del local
- **Objetivo principal (CTA):**  Contactar por whatsapp, mostrar local y batidos.
- **Repo:** https://github.com/DarylValverdeMora/Tribu.git
- **Vista previa (Vercel):** https://tribu-pi.vercel.app
- **Estado:** prototipo frontend 

## 2. Marca

- **Colores (hex):** Tomar referencia cuando veasos del local
- **Tipografías:** Tomar rererencia cuando veas fotos del local
- **Logo y assets:** Crea tu la carpeta, te envío otos por chat
- **Tratamiento en los textos:**r; por defecto español de Costa Rica)
- **Precios visibles:** sí
- **Detalle "wow" acordado:** (una animación o interacción que distinga la página)

## 3. Flujo de trabajo (en este orden)

Antes de escribir código, carga la skill de la etapa. Si una skill aparece con prefijo
(ej. `hzblj-skills:polish`), úsala con el prefijo.

1. **Planificar** → `landing-limboh` (pasos 1 y 2). Recoge datos, presenta un plan corto
   (stack, carpetas, secciones, dirección visual, placeholders) y espera confirmación.
2. **Diseñar** → `frontend-design`. Dirección visual propia del rubro, sin aspecto de plantilla genérica.
3. **Construir la interfaz** → `tailwind` (si el stack lo usa), `ui-typography`, `ui-surfaces`,
   `ui-interactions`.
4. **Animar** (solo lo acordado) → `ui-motion` y `css-animations` para movimiento simple.
   Para scroll, pins o texto animado: `gsap-timelines`, `gsap-scroll-trigger`, `gsap-text`;
   con React: `gsap-react`; antes de cerrar: `gsap-performance`.
5. **Textos** → `unslop` en todo el copy visible, para que no suene a IA.
6. **Pulir y optimizar** → `polish` y `performance`.
7. **Revisar el código** → `clean-review` sobre el diff antes de cada entrega.
8. **Seguridad** → subagente `revisor-seguridad` sobre el proyecto completo.
9. **Entregar** → `entrega-cliente` (datos reales, revisión final, deploy, dominio, documento de entrega).

Si el proyecto usa Next.js: `nextjs-routing`. Si usa TypeScript: `type-safety`.

## 4. Reglas del proyecto

- **Sin backend en el prototipo.** Arquitectura lista para conectarlo después (reservas, inscripciones).
- **Datos faltantes:** solo como `[PLACEHOLDER]` visible y listado. Nunca inventar
  testimonios, nombres, cifras, precios ni citas presentadas como reales.
- **Mobile first.** Probar a 375 px antes que en escritorio.
- **WhatsApp siempre visible** (botón fijo o en el header) con mensaje prellenado.
- **Rendimiento:** imágenes optimizadas y con dimensiones, animar solo `transform` y `opacity`,
  respetar `prefers-reduced-motion`.
- **Accesibilidad:** contraste suficiente, `alt` en imágenes, foco visible, un solo `h1`.
- **Privacidad:** si aparecen menores en fotos, confirmar autorización de los padres. Confirmar
  permiso para usar fotos tomadas de redes del cliente. Formularios con aviso de privacidad.
- **Seguridad:** sin claves ni tokens en el frontend, ni en el repo. Validar todo formulario.
- **Código:** `const` con flechas, exports con nombre, `type` en lugar de `interface`, sin `any`,
  nombres que revelen intención, componentes pequeños.
- **Textos y commits en español**, claros y cortos.

## 5. Skills que NO se cargan en landings

Son para apps móviles y monorepos grandes y solo agregan ruido aquí:
`reanimated-*`, `skia`, `native-feel`, `lists`, `react-navigation`, `project`, `audit-imports`,
`new-feature`, `orchestrate`, `orchestration`, `atomic-design`, `compound-components`.
Se activan solo si el proyecto es una app móvil o un monorepo y el usuario lo pide.

## 6. Al terminar cada tarea

Entregar, sin recapitular los pasos:

1. Resumen corto de lo que cambió.
2. Lista actualizada de `[PLACEHOLDER]` pendientes.
3. Preguntas concretas para el dueño del negocio.
4. Cómo correrlo localmente y cómo generar la build.

## 7. Registro de decisiones

Anotar aquí, con fecha, cada decisión que no se debe volver a discutir (estilo, secciones
aprobadas, qué se descartó y por qué).

- [FECHA] — [DECISIÓN]
