import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>CN</span>
          <div>
            <strong>Centro de Negocios Santiago</strong>
            <span>SERCOTEC</span>
          </div>
        </div>

        <nav className={styles.links} aria-label="Navegación pie de página">
          {[
            ['#nosotros',    'Nosotros'],
            ['#servicios',   'Servicios'],
            ['#testimonios', 'Testimonios'],
            ['#faq',         'Preguntas'],
            ['#contacto',    'Contacto'],
          ].map(([href, label]) => (
            <a key={href} href={href} className={styles.link}>{label}</a>
          ))}
        </nav>

        <p className={styles.copy}>
          © {new Date().getFullYear()} Centro de Negocios Santiago · SERCOTEC.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
