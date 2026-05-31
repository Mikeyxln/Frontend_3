import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#nosotros',   label: 'Nosotros'  },
  { href: '#servicios',  label: 'Servicios' },
  { href: '#testimonios',label: 'Testimonios'},
  { href: '#faq',        label: 'Preguntas' },
  { href: '#contacto',   label: 'Contacto'  },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = () => setOpen(false);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <nav className={styles.nav} aria-label="Navegación principal">
        {/* Logo */}
        <a href="#inicio" className={styles.logo} aria-label="Inicio - Centro de Negocios Santiago">
          <span className={styles.logoIcon}>CN</span>
          <span className={styles.logoText}>
            Centro de Negocios<strong> Santiago</strong>
          </span>
        </a>

        {/* Links desktop */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={styles.link} onClick={handleLink}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contacto" className={styles.cta} onClick={handleLink}>
          Contáctanos
        </a>

        {/* Hamburger */}
        <button
          className={styles.burger}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ''}`} />
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ''}`} />
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`} aria-hidden={!open}>
        <ul role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={styles.mobileLink} onClick={handleLink}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contacto" className={styles.mobileCta} onClick={handleLink}>
              Contáctanos
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
