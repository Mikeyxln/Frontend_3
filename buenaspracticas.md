# Guía de Buenas Prácticas — Desarrollo Frontend con React

**Proyecto:** Centro de Negocios Santiago — SERCOTEC  
**Framework:** React 18 + Vite  
**Última actualización:** 31 Mayo 2025

---

## Introducción

Este documento recoge las convenciones y prácticas que acordamos como equipo para mantener el código ordenado, legible y fácil de escalar. La idea es que cualquier persona que entre al proyecto pueda entender qué hace cada cosa sin tener que preguntar.

---

## 1. Convenciones de nomenclatura

### Archivos y carpetas

Cada componente vive en su propia carpeta con el mismo nombre, usando **PascalCase**:

```
components/
  ServiceCard/
    ServiceCard.jsx
    ServiceCard.module.css
```

Nunca mezclar el `.jsx` y el `.css` de distintos componentes en una misma carpeta. Si dos componentes comparten estilos, esos estilos van en `global.css` o en `variables.css`.

Los archivos que no son componentes (utilidades, datos, hooks) usan **camelCase**:
```
api.js        ✅
mockData.js   ✅
ApiHelper.js  ❌ (se reserva PascalCase para componentes)
```

### Variables y funciones

```js
const serviceList = [];
const isLoading = true;

function ServiceCard({ service }) { ... }

const MAX_TIMEOUT = 8000;
const BASE_URL = 'https://api.ejemplo.com';

const handleSubmit = (e) => { ... };
const handleChange = (e) => { ... };

const renderErrorMessage = () => <p>{error}</p>;
```

### Clases CSS (CSS Modules)

Usamos **camelCase** porque los módulos de CSS son objetos JavaScript:

```css
.cardWrapper { ... }     ✅
.card-wrapper { ... }    ❌ (no funciona como propiedad JS)
.imageContainer { ... }  ✅
```

---

## 2. Estructura de archivos del proyecto

La estructura sigue el principio de **agrupación por funcionalidad**, no por tipo de archivo. Cada componente tiene todo lo que necesita junto:

```
src/
├── index.jsx          # Solo renderiza App, nada más
├── App.jsx            # Ensambla las secciones, no tiene lógica de negocio
├── api.js             # Único lugar donde se hacen llamadas HTTP
├── global.css         # Reset y estilos que afectan a todo el sitio
├── variables.css      # Tokens de diseño (colores, fuentes, espaciados)
├── data/              # Datos estáticos o mock — no lógica
└── components/        # Un componente = una carpeta
```

**Regla importante:** Si un componente crece demasiado (más de ~150 líneas), es señal de que hay que dividirlo en sub-componentes más pequeños.

---

## 3. Uso de variables CSS (design tokens)

Todos los valores de diseño están definidos en `variables.css` como variables CSS. Nunca escribir colores, tamaños o fuentes directamente en los módulos:

```css
/*  Mal — valores mágicos */
.title {
  color: #0D2B4E;
  font-size: 24px;
  margin-bottom: 16px;
}

/*  Bien — usando tokens */
.title {
  color: var(--color-primary);
  font-size: var(--text-2xl);
  margin-bottom: var(--space-4);
}
```

Esto garantiza que si el cliente pide cambiar el color principal, basta con editar un solo lugar en `variables.css` y todo el sitio se actualiza.

---

## 4. Componentes reutilizables

Un componente es reutilizable cuando recibe sus datos por **props** y no los tiene escritos dentro. El componente `ServiceCard` es un buen ejemplo:

```jsx
//  Mal — datos hardcodeados adentro
function ServiceCard() {
  return (
    <div>
      <h3>Diagnóstico Empresarial</h3>
      <p>Evaluamos tu negocio...</p>
    </div>
  );
}

//  Bien — datos por props, componente flexible
function ServiceCard({ service }) {
  return (
    <div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
}
```

**Regla:** Si copias y pegas un componente cambiando solo el texto, significa que debería recibir esos textos como props.

---

## 5. Manejo de estados de carga y error

Cada sección que consume datos debe manejar tres estados: cargando, error y éxito. Nunca mostrar una pantalla vacía mientras se cargan datos:

```jsx
function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado de carga → mostrar spinner
  if (loading) return <Spinner />;

  // Estado de error → mostrar mensaje amigable
  if (error) return <p role="alert">{error}</p>;

  // Estado exitoso → mostrar contenido
  return <ul>{services.map(s => <ServiceCard key={s.id} service={s} />)}</ul>;
}
```

El `role="alert"` en el mensaje de error es importante para que los lectores de pantalla lo anuncien automáticamente.

---

## 6. Accesibilidad (WCAG 2.1)

La accesibilidad no es opcional, es parte del desarrollo. Estas son las prácticas mínimas que aplicamos:

**Imágenes:** siempre con `alt` descriptivo. Si es decorativa, `alt=""`:
```jsx
<img src={service.image} alt={`Imagen del servicio ${service.title}`} />
<img src={decoracion.svg} alt="" aria-hidden="true" />
```

**Botones e interactivos:** siempre con `aria-label` si el texto no es suficientemente descriptivo:
```jsx
<button aria-label="Cerrar menú de navegación">✕</button>
```

**Formularios:** cada input debe tener su `label` asociado y mensajes de error vinculados con `aria-describedby`:
```jsx
<label htmlFor="campo-email">Correo electrónico</label>
<input
  id="campo-email"
  aria-describedby="error-email"
  aria-invalid={!!error}
/>
{error && <span id="error-email" role="alert">{error}</span>}
```

**Contraste:** usar los colores de `variables.css` garantiza contraste suficiente (ratio mínimo 4.5:1 para texto normal).

**Navegación por teclado:** todos los elementos interactivos deben ser accesibles con Tab y tener estilos `:focus-visible` visibles.

---

## 7. Separación de responsabilidades en la capa de datos

Toda llamada HTTP va en `api.js`, nunca directamente en un componente. Los componentes solo consumen funciones de la API:

```js
//  Mal — fetch dentro del componente
useEffect(() => {
  fetch('https://api.ejemplo.com/services')
    .then(r => r.json())
    .then(setServices);
}, []);

//  Bien — el componente llama una función de api.js
useEffect(() => {
  getServices()
    .then(setServices)
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);
```

Ventaja: si cambia la URL o la estructura de la respuesta, solo se edita `api.js` y no hay que buscar en todos los componentes.

---

## 8. Optimización de imágenes y rendimiento

Para que el sitio cargue rápido, todas las imágenes siguen estas reglas:

```jsx
<img
  src="imagen.jpg"
  alt="descripción"
  loading="lazy"      /* Solo carga cuando el usuario llega hasta ahí */
  width="600"         /* Evita layout shift al reservar el espacio */
  height="320"
/>
```

En `vite.config.js` configuramos **code splitting** para que React y los componentes se carguen en chunks separados:

```js
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom'], // React en un chunk aparte
    }
  }
}
```

Esto mejora el tiempo de carga porque el navegador puede cachear React entre visitas.

---

## 9. Seguridad en formularios

Todo formulario que reciba datos del usuario aplica estas medidas:

**Validación doble:** primero en el cliente (para UX rápida) y luego en el servidor (para seguridad real). No confiar solo en la validación del navegador.

**Sanitización:** eliminar caracteres peligrosos antes de procesar:
```js
const sanitize = (str) => str?.replace(/[<>]/g, '').trim() || '';
```

**Honeypot anti-bots:** campo oculto que los humanos no ven pero los bots rellenan:
```jsx
<input
  type="text"
  name="_bot_field"
  tabIndex={-1}
  aria-hidden="true"
  style={{ display: 'none' }}
  autoComplete="off"
/>
```

Si este campo llega con datos al servidor, se descarta el formulario.

**Links externos:** siempre con `rel="noopener noreferrer"` para evitar que la página externa pueda acceder a `window.opener`:
```jsx
<a href="https://externo.com" target="_blank" rel="noopener noreferrer">
  Ver más
</a>
```

---

## 10. Comentarios en el código

Comentamos el **por qué** de algo, no el **qué**. El código ya dice qué hace; el comentario explica la razón detrás de la decisión:

```js
//  Innecesario — el código ya lo dice
// Incrementa el contador
setCount(count + 1);

//  Útil — explica una decisión no obvia
// Usamos AbortController porque el usuario puede navegar
// a otra sección antes de que termine la petición,
// y no queremos actualizar el estado de un componente desmontado
const controller = new AbortController();
```

**JSDoc** en funciones de la capa API para documentar parámetros y retornos:
```js
/**
 * Obtiene la lista de servicios del CMS.
 * En producción apuntaría a GET /api/services
 * @returns {Promise<Service[]>}
 */
export async function getServices() { ... }
```

---

## Resumen rápido

| Práctica | Herramienta/Convención |
|---|---|
| Estilos encapsulados | CSS Modules |
| Valores de diseño centralizados | variables.css con tokens CSS |
| Llamadas HTTP centralizadas | api.js |
| Nombres de componentes | PascalCase |
| Nombres de variables/funciones | camelCase |
| Imágenes optimizadas | `loading="lazy"` + dimensiones |
| Accesibilidad mínima | aria-label, roles, focus-visible |
| Seguridad en formularios | Validación doble + honeypot + sanitización |
| Comentarios | Solo el "por qué", con JSDoc en API |
| Estructura de carpetas | Una carpeta por componente |

---

Este apartado tuvo el fin de explicar las buenas y malas practicas de todo lo q se uso para crear el frotend, es claro recalcar que nos guiamos con la IA para prueba y errores de lo hecho por cada uno de los estudiantes, se usaron redes como youtube, google academico y otras más para guiarnos en codigos o metodos que no sabiamos pero que fueron mas practicos a la hora de crear la pagina.

*Este documento se actualizo constantemente cada q el equipo tenia una nueva idea o un nuevo metodo para agregar y llegamos como fin a este resultado...*