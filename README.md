Datos

Nombre: Pablo Domínguez Romero
Fecha: 23/10/2025
Opción práctica elegida: A

1. Respuestas cortas

Pregunta seleccionada 1: ¿Qué aporta TypeScript en frontend? Da 2 ventajas y 1 limitación real; incluye ejemplo breve.
Respuesta (5 u 8 lí­neas):
Ventajas: Mejor código y mantenibilidad y detección temprana de errores.
Desventajas: Dependencia del ecosistema de tipos.
Ejemplo: por ejemplo con una de las desventajas, si necesitamos usar librerías que no están escritas en typescript es necesario instalar su definición de tipos, pudiendo esta estar incompleta o desactualizada

Pregunta seleccionada 2: SSR vs CSR en Next.js para una lista filtrable: ¿qué elegirías y por qué? Considera SEO, latencia y coste.
Respuesta (5 u 8 lí­neas):
A mi parecer elegiría la mezcla de las dos, primero hacer una carga inicial de los datos y una estructura inicial en el servidor para después ser consumida en el lado del cliente. A la hora del filtrado, lo haría en el lado del cliente los que fueran filtros sencillos como una ordenación o búsqueda de texto, si fueran filtros más complejos o existiera una paginación, se podría hacer una nueva llamada al servidor mandando esos filtros por la url por ejemplo, para recibir los nuevos datos en el lado del cliente. Con esto tenemos una mejor experiencia de usuario, un SEO con contenido dinámico o siempre los datos más reciente en la carga inicial.

2. Ejercicio práctico
   2.1. Contexto rápido
   Opción elegida: A.

   Alcance: consumo de API Route con datos mockeados desde un RCS y muestra de lista y filtrado en un CSR, estilos básicos para una mínima experiencia de usuario, filtrado de búsqueda, por categorías y orden por importe y fecha de movimiento. También hay una sección específica para cuando el movimiento está pendiente, saliendo en la sección de movimientos retenidos. Testing unitario de los filtrados por búsqueda, categorías y ordenamiento.

   Stack: Next.js 16.0.0, TypeScript, Tailwind, Jest/Vitest + RTL.

   2.2. Cómo ejecutar

   ```bash

   npm i

   npm dev    # arranca en http://localhost:3000

   ```

   2.3. Cómo testear

   ```bash

   npm test       # unitario

   ```

   2.4. Decisiones clave

   - **SSR/RSC/CSR**: He elegido una RSC para hacer una primera carga rápida de los datos en el servidor para luego poder consumirlos del lado del cliente, de esta manera
     mejoramos el SEO y el tiempo de carga de los datos.
   - **Estado**: Local, no es necesario usar un estado global al ser estados simples y que no son necesario guardar en un store pues si salimos de la página se reinician los estados sin comprometer el comportamiento.
   - **Datos**: Hacemos un API Route para poder consumir los datos.
   - **Estilos**: Tailwind, estoy acostumbrado a usar tailwind, me parece un framework muy completo, fácil de usar y muy rápido de implementar, además te da la opción de modificar sus clases de forma rápida y sencilla, que viene muy bien cuando hay que especificar una paleta de colores concreta por ejemplo.

     2.5. Accesibilidad (A11y)

   Checklist mínimo:

   - Se utilizan labels para los inputs, selects y botones.
   - Se utiliza aria-live para mensajes dinámicos al no haber coincidencias en los filtros o si hay carga de datos.
   - Se utiliza scope en la tabla para detectar a que columna pertenece cada celda.

     2.6. Seguridad

   - No se usa `dangerouslySetInnerHTML` para no manipular el HTML directamente.
   - Se controla la entrada de datos en el buscador para no permitir espacios en blanco.

     2.7. Performance

   - Se usa cache: no-store, porque no nos es necesario guardar los datos en caché, ya que siempre queremos tener los datos lo más actualizados posible.

     2.8. Testing (TDD breve)

   - Casos cubiertos: filtro por categoría, búsqueda y ordenamiento.

     2.9. Trade‑offs y alternativas

   - Qué simplifiqué por tiempo y cómo lo haría “bien” con más tiempo.
   - Alternativas consideradas (p. ej., TanStack Query vs fetch RSC).

     2.10. Supuestos

   - Ej.: formato de fechas, zona horaria, categories conocidas.

     2.11. Próximos pasos (si tuviera 1–2 h más)

   - Añadir i18n (es/en) con `Intl`.
   - Se mejoraría y completaría la página(se mostraría datos de la cuenta, datos del saldo actual, botones con opciones para cada movimiento...), mejores estilos para una buena experiencia de usuario. Distintos iconos para las categorías.
   - Se implementarían pruebas de integración.

     2.13. Notas para la revisión

   - Enlaces rápidos: ruta principal `/`, API `/api/movements`, test files en `utils/__tests__/`.

3. Tiempo invertido (aprox.)

- Implementación: ~45 min · Tests: ~20 min · README: ~15 min.
