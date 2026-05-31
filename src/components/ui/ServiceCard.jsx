import React from 'react';
import styles from './ServiceCard.module.css';

/**
 * ServiceCard – Componente reutilizable de tarjeta de servicio.
 * Tarea 1 de la evaluación: incluye imagen, título, descripción
 * y botón "Contáctanos" que rellena el campo "servicio" en el formulario.
 *
 * @param {{ service: Service, onContact: (title: string) => void }} props
 */
export default function ServiceCard({ service, onContact }) {
  const handleContact = () => {
    if (onContact) {
      onContact(service.title);
    }
    // Navegar al formulario y rellenar el campo servicio
    const contactSection = document.getElementById('contacto');
    const serviceSelect  = document.getElementById('service-select');

    if (serviceSelect) {
      serviceSelect.value = service.title;
      serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article className={styles.card} aria-label={`Servicio: ${service.title}`}>
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <img
          src={service.image}
          alt={service.title}
          className={styles.image}
          loading="lazy"
          width="600"
          height="320"
        />
        <span className={styles.icon} aria-hidden="true">{service.icon}</span>
      </div>

      {/* Contenido */}
      <div className={styles.body}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.description}>{service.description}</p>

        <button
          className={styles.btn}
          onClick={handleContact}
          aria-label={`Contáctanos sobre ${service.title}`}
        >
          Contáctanos
          <svg
            aria-hidden="true"
            width="16" height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </article>
  );
}
