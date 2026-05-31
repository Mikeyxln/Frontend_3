/**
 * api.js – Capa de servicios para consumo de endpoints.
 *
 * Centraliza todas las llamadas HTTP siguiendo el principio de
 * separación de responsabilidades (SRP).
 *
 * Endopoints usados:
 *  - API interna (mockData.js) → servicios, testimonios, equipo
 *  - API externa (Open Trivia DB) → preguntas frecuentes dinámicas
 *  - API externa (JSONPlaceholder) → sección "nosotros" de ejemplo
 */

import { SERVICES, TESTIMONIALS, ABOUT_STATS, TEAM } from './data/mockData.js';

/* ── Configuración base ── */
const BASE_URLS = {
  trivia: 'https://opentdb.com/api.php',
  placeholder: 'https://jsonplaceholder.typicode.com',
};

/** Tiempo máximo de espera para cada petición (ms) */
const REQUEST_TIMEOUT = 8000;

/**
 * Wrapper fetch con timeout y manejo de errores centralizado.
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
async function apiFetch(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('La solicitud tardó demasiado. Intenta de nuevo.');
    }
    throw error;
  }
}

/* ── Servicios del Centro ── */

/**
 * Obtiene la lista de servicios desde el CMS interno.
 * En producción: GET /api/services
 * @returns {Promise<Service[]>}
 */
export async function getServices() {
  // Simula latencia de red
  await delay(600);
  return SERVICES;
}

/**
 * Obtiene un servicio por su ID.
 * @param {number} id
 * @returns {Promise<Service|null>}
 */
export async function getServiceById(id) {
  await delay(300);
  return SERVICES.find((s) => s.id === id) || null;
}

/* ── Testimonios ── */

/**
 * Obtiene los testimonios de clientes.
 * En producción: GET /api/testimonials
 * @returns {Promise<Testimonial[]>}
 */
export async function getTestimonials() {
  await delay(400);
  return TESTIMONIALS;
}

/* ── Sección Nosotros ── */

/**
 * Obtiene datos del equipo y estadísticas.
 * En producción: GET /api/about
 * @returns {Promise<{stats: AboutStat[], team: TeamMember[]}>}
 */
export async function getAboutData() {
  await delay(500);
  return { stats: ABOUT_STATS, team: TEAM };
}

/* ── FAQ – API externa Open Trivia DB ── */

/**
 * Obtiene preguntas frecuentes desde la API externa Open Trivia.
 * Mapea la respuesta a un formato de FAQ contextualizado.
 *
 * NOTA: Se usa para demostrar consumo de endpoint externo.
 * En producción real, usar una API de FAQ interna.
 *
 * @returns {Promise<FAQItem[]>}
 */
export async function getFAQ() {
  try {
    // Petición a API externa: categoría Business & Economics
    const data = await apiFetch(
      `${BASE_URLS.trivia}?amount=6&category=22&difficulty=easy&type=boolean`
    );

    if (data.response_code !== 0) {
      throw new Error('API externa no disponible');
    }

    // Mapeo de la respuesta externa al formato interno de FAQ
    return data.results.map((item, index) => ({
      id: index + 1,
      question: decodeHtmlEntities(item.question),
      answer: buildFAQAnswer(item.correct_answer, index),
    }));
  } catch {
    // Fallback con preguntas predefinidas si la API falla
    return getFAQFallback();
  }
}

/**
 * FAQ de respaldo cuando la API externa no está disponible.
 * @returns {FAQItem[]}
 */
function getFAQFallback() {
  return [
    {
      id: 1,
      question: '¿A qué tipo de empresas atiende el Centro de Negocios?',
      answer:
        'Atendemos micro, pequeñas y medianas empresas (MiPyMEs) de todos los rubros, tanto formales como en proceso de formalización, ubicadas en la Región Metropolitana.',
    },
    {
      id: 2,
      question: '¿Los servicios del Centro tienen algún costo?',
      answer:
        'La mayoría de nuestros servicios de acompañamiento, asesoría y talleres son gratuitos o de bajo costo, financiados por SERCOTEC. Consulta la disponibilidad con nuestro equipo.',
    },
    {
      id: 3,
      question: '¿Cómo puedo acceder a un programa de financiamiento?',
      answer:
        'Puedes solicitar orientación en nuestras oficinas o a través del formulario de contacto. Nuestros asesores te guiarán en el proceso de postulación a los instrumentos disponibles.',
    },
    {
      id: 4,
      question: '¿Cuánto tiempo dura el acompañamiento empresarial?',
      answer:
        'Los programas de acompañamiento tienen duraciones variables: desde sesiones puntuales (1-2 horas) hasta procesos continuos de 6 a 12 meses, según las necesidades de tu empresa.',
    },
    {
      id: 5,
      question: '¿Necesito tener mi empresa formalizada para recibir ayuda?',
      answer:
        'No necesariamente. También acompañamos a emprendedores en proceso de formalización, orientándolos en los trámites necesarios para constituir legalmente su negocio.',
    },
    {
      id: 6,
      question: '¿Cómo puedo agendar una asesoría?',
      answer:
        'Puedes agendar a través del formulario de contacto en esta página, llamando a nuestro número de atención o visitando directamente nuestras oficinas en Manuel Rodríguez Sur 749, Santiago.',
    },
  ];
}

/* ── Formulario de contacto ── */

/**
 * Envía el formulario de contacto al backend.
 * En producción: POST /api/contact
 *
 * Incluye validación del lado del cliente y del servidor (simulada).
 * @param {ContactFormData} formData
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitContactForm(formData) {
  // Validación del lado del servidor (simulada)
  validateContactData(formData);

  // Sanitización de entradas
  const sanitizedData = sanitizeFormData(formData);

  // Simulación de envío al servidor
  await delay(1500);

  // En producción:
  // return apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(sanitizedData) });

  // Simulación exitosa
  console.info('Formulario enviado:', sanitizedData);
  return {
    success: true,
    message: 'Tu mensaje fue enviado exitosamente. Te contactaremos pronto.',
  };
}

/* ── Helpers internos ── */

/**
 * Simula latencia de red para desarrollo.
 * @param {number} ms
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Decodifica entidades HTML de la API externa.
 * @param {string} text
 */
function decodeHtmlEntities(text) {
  const el = document.createElement('textarea');
  el.innerHTML = text;
  return el.value;
}

/**
 * Genera respuestas contextualizadas para el FAQ mapeado desde Trivia API.
 */
function buildFAQAnswer(correctAnswer, index) {
  const answers = [
    'Sí, ofrecemos este servicio de forma gratuita para todas las MiPyMEs registradas en nuestra plataforma.',
    'No, nuestros servicios están disponibles sin restricciones previas de tamaño o facturación.',
    'Sí, contamos con profesionales certificados en cada área de consultoría empresarial.',
    'No, aunque es recomendable, no es un requisito para acceder a la mayoría de nuestros servicios.',
    'Sí, ofrecemos acompañamiento tanto presencial como online para mayor comodidad.',
    'No necesariamente, adaptamos los programas según el sector y la etapa del negocio.',
  ];
  return answers[index] || `${correctAnswer === 'True' ? 'Sí' : 'No'}, confírmalo con nuestro equipo para más detalles.`;
}

/**
 * Valida datos del formulario en el servidor (simulado).
 */
function validateContactData(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.name?.trim() || data.name.length < 2) {
    throw new Error('El nombre debe tener al menos 2 caracteres.');
  }
  if (!emailRegex.test(data.email)) {
    throw new Error('El correo electrónico no es válido.');
  }
  if (!data.message?.trim() || data.message.length < 10) {
    throw new Error('El mensaje debe tener al menos 10 caracteres.');
  }
}

/**
 * Sanitiza datos del formulario eliminando caracteres peligrosos.
 */
function sanitizeFormData(data) {
  const sanitize = (str) => str?.replace(/[<>]/g, '').trim() || '';
  return {
    name:    sanitize(data.name),
    email:   sanitize(data.email),
    phone:   sanitize(data.phone),
    service: sanitize(data.service),
    message: sanitize(data.message),
  };
}