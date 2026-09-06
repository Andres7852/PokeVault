**PokéVault — Tienda de Coleccionables Pokémon**

Plataforma web multipágina llamada PokéVault, una tienda especializada en consolas retro de Nintendo de edición pokemon, cartuchos y juegos originales, cartas graduadas por PSA, accesorios y cajas de sobres TCG.

- **URL de Producción (Vercel):** https://poke-vault-omega-seven.vercel.app/


**Capturas de Pantalla**

**Vista computador**

<img width="921" height="436" alt="image" src="https://github.com/user-attachments/assets/a6e70b3e-44d2-420e-a9f9-f0995936143d" />

<img width="921" height="435" alt="image" src="https://github.com/user-attachments/assets/bca3f5f7-51a8-4b99-9fd5-a4759433c04b" />

<img width="921" height="436" alt="image" src="https://github.com/user-attachments/assets/7b2dc157-bf92-4283-b4d0-cadd3ad10c8a" />

<img width="921" height="440" alt="image" src="https://github.com/user-attachments/assets/04b3b206-725f-4f1d-a0bc-d32c9c0e41eb" />

<img width="921" height="438" alt="image" src="https://github.com/user-attachments/assets/4104cd04-a838-4729-8fc7-bdbf5008730d" />

<img width="921" height="436" alt="image" src="https://github.com/user-attachments/assets/20716125-c914-4ace-901e-829681644c41" />

<img width="921" height="441" alt="image" src="https://github.com/user-attachments/assets/b1862e7f-9cc5-4726-85a8-4d0a97ba47f9" />


**Vista Móvil**

<img width="921" height="419" alt="image" src="https://github.com/user-attachments/assets/374bd97e-71d8-422b-aaf9-03914c7b0d28" />

<img width="921" height="412" alt="image" src="https://github.com/user-attachments/assets/6db41fbc-e3d1-40ac-81be-c8bb2b70d11e" />

<img width="921" height="415" alt="image" src="https://github.com/user-attachments/assets/5c196e6d-58ce-40ad-9e91-0c15efd9b26d" />

<img width="921" height="425" alt="image" src="https://github.com/user-attachments/assets/4fbe06dd-6fc7-412c-b614-22aad5a721de" />

<img width="921" height="425" alt="image" src="https://github.com/user-attachments/assets/925af10c-ab46-47b5-af1b-34b03257cec7" />


**Descripción del Proyecto**

PokéVault resuelve la necesidad de los coleccionistas de Pokémon que buscan una pagina con solo productos de pokemon, reuniendo productos TCG, consolas edición pokemon, juegos y productos de la franquisia.

El sitio permite explorar un catálogo interactivo con 21 productos divididos por categorías, gestionar un carrito de compras dinámico en tiempo real y solicitar cotizaciones personalizadas mediante un formulario de encargos.


**Decisiones Técnicas**

**Layout: Flexbox vs. CSS Grid**

**CSS Grid:** Se utilizó exclusivamente en la cuadrícula del catálogo (`.catalog-grid`) en `catalogo.html`. Se definió mediante `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`. Esto permite que las tarjetas de las consolas y juegos se reorganicen de forma fluida según el ancho de la pantalla (móvil  o escritorio) sin necesidad de reescribir reglas complejas en cada breakpoint.

**Flexbox:** Se implementó en la barra de navegación (`.navbar`), en los controles de cantidad (`.quantity-controls`), en el resumen de orden del carrito (`.cart-item-row`) y dentro de cada tarjeta de producto (`.product-card`). En las tarjetas, Flexbox asegura la distribución vertical para que el precio y el botón de compra queden siempre alineados en la parte inferior, sin importar la longitud de la descripción del artículo.


**Lógica de JavaScript**

**Modo Oscuro con Persistencia:** Alterna el atributo `data-theme` en la etiqueta HTML y guarda la preferencia del usuario en `localStorage` mediante `themeToggle.addEventListener('click', ...)`.

**Navegación Móvil:** El menú hamburguesa alterna la clase CSS `.active` al hacer clic en el botón de tres líneas, desplegando el menú en pantallas pequeñas.

**Catálogo Dinámico e Interactivo:** Los 21 productos no están quemados en el HTML; se renderizan iterando el arreglo `productosPokemon` en `js/data.js`. Al hacer clic en "Agregar al Carrito", el botón cambia dinámicamente en el DOM a un control `[-] cantidad [+]`. Si el usuario reduce la cantidad a 0, el botón vuelve a su estado original de compra.

**Filtros del Catálogo:** Los botones de categorías filtran el arreglo de objetos con `.filter()` y vuelven a renderizar la cuadrícula manteniendo sincronizados los estados de los botones de cantidad con el carrito.

**Validación del Formulario:** Escucha el evento `submit` con `preventDefault()`. Valida que el nombre tenga al menos 3 caracteres, el mensaje mínimo 15 caracteres y el correo electrónico cumpla con el formato mediante una expresión regular. Los mensajes de error se muestran de forma inline junto a cada campo agregando la clase `.visible`, sin usar `alert()`.

**Carrito Persistente:** Modifica las unidades de cada producto en `localStorage`, calcula automáticamente los subtotales por ítem y el total general a pagar, 
eliminando la fila si la cantidad llega a 0.


**Uso de Inteligencia Artificial**

Utilicé la IA para realizar la lógica de verificación de los formularios, para preguntarle como se podía implementar el dark mode y ayudarme a hacer el CSS.


**Mayor Reto y Solución**

El mayor reto fue lograr que al cambiar entre categorías de productos en el catálogo, la pantalla no perdiera el estado de las cantidades de los productos que el usuario ya había seleccionado previa o paralelamente desde el carrito. Lo resolví consultando `localStorage` antes de cada renderizado en `js/catalogo.js` para comprobar si el ID del producto ya existía en la orden y pintar dinámicamente el selector `[-] cantidad [+]` o el botón predeterminado.


**Checklist de Requisitos Cumplidos**

- [x] **HTML Semántico y Válido:** Uso de `<header>`, `<nav>`, `<main>`, `<section>` y `<footer>`. Válido en W3C Validator. 

- [x] **CSS3 Puro:** Archivo externo `styles.css` con variables CSS, Flexbox, CSS Grid y Media Queries.

- [x] **JS Vanilla Multipágina:** Menú hamburguesa, modo oscuro, catálogo dinámico desde objetos, filtros interactivos y gestión de carrito.

- [x] **Formulario Validado:** Validación propia en `contacto.html` con retroalimentación inline en el DOM.

- [x] **Historial de Commits:** Más de 6 commits repartidos progresivamente en español.

- [x] **Despliegue Continuo:** Conectado automáticamente con Vercel desde la rama `main` de GitHub.