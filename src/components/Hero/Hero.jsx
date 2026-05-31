import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-label="Sección principal">
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.badge}>SERCOTEC · Santiago</span>

        <h1 className={styles.title}>
          Impulsamos el crecimiento<br />
          <em>de tu empresa</em>
        </h1>

        <p className={styles.subtitle}>
          Somos el Centro de Negocios Santiago: acompañamiento integral,
          asesoría especializada y acceso a financiamiento para micro, pequeñas
          y medianas empresas.
        </p>

        <div className={styles.actions}>
          <a href="#servicios" className={styles.btnPrimary}>
            Ver servicios
          </a>
          <a href="#contacto" className={styles.btnSecondary}>
            Habla con un asesor
          </a>
        </div>

        <div className={styles.stats} aria-label="Estadísticas destacadas">
          {[
            { value: '2.500+', label: 'Empresas atendidas' },
            { value: '15 años', label: 'De experiencia' },
            { value: '98%',    label: 'Satisfacción' },
          ].map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#nosotros" className={styles.scrollDown} aria-label="Ir a la siguiente sección">
        <span className={styles.scrollArrow} />
      </a>
    </section>
  );
}
