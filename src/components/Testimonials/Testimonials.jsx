import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getTestimonials } from '../../api.js';
import styles from './Testimonials.module.css';

const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [current,      setCurrent]      = useState(0);
  const [paused,       setPaused]       = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  const goTo = useCallback((index) => {
    setCurrent((index + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Autoplay
  useEffect(() => {
    if (!testimonials.length || paused) return;
    timerRef.current = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [testimonials.length, current, paused, goTo]);

  if (!testimonials.length) return null;

  return (
    <section id="testimonios" className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Testimonios</span>
          <h2 id="testimonials-heading" className={styles.title}>
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Carrusel */}
        <div
          className={styles.carousel}
          role="region"
          aria-label="Carrusel de testimonios"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <article
                key={t.id}
                className={styles.slide}
                aria-hidden={i !== current}
                aria-label={`Testimonio de ${t.name}`}
              >
                <div className={styles.card}>
                  <div className={styles.stars} aria-label={`${t.rating} de 5 estrellas`}>
                    {'★'.repeat(t.rating)}
                  </div>
                  <blockquote className={styles.quote}>
                    <p>"{t.content}"</p>
                  </blockquote>
                  <footer className={styles.author}>
                    <div className={styles.avatar} aria-hidden="true">
                      {t.avatar}
                    </div>
                    <div>
                      <strong className={styles.name}>{t.name}</strong>
                      <span className={styles.role}>{t.role} · {t.company}</span>
                    </div>
                  </footer>
                </div>
              </article>
            ))}
          </div>

          {/* Flechas */}
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={() => goTo(current - 1)}
            aria-label="Testimonio anterior"
          >
            ‹
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={() => goTo(current + 1)}
            aria-label="Testimonio siguiente"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Seleccionar testimonio">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir al testimonio ${i + 1}`}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
