import React, { useEffect, useState } from 'react';
import { getFAQ } from '../../api.js';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [faqs,    setFaqs]    = useState([]);
  const [open,    setOpen]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFAQ()
      .then(setFaqs)
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) => setOpen(prev => prev === id ? null : id);

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>FAQ</span>
          <h2 id="faq-heading" className={styles.title}>Preguntas frecuentes</h2>
          <p className={styles.subtitle}>
            Resolvemos las dudas más comunes sobre nuestros servicios.
          </p>
        </div>

        {loading && (
          <div className={styles.loading} role="status" aria-live="polite">Cargando preguntas…</div>
        )}

        {!loading && (
          <dl className={styles.list}>
            {faqs.map(({ id, question, answer }) => (
              <div key={id} className={`${styles.item} ${open === id ? styles.itemOpen : ''}`}>
                <dt>
                  <button
                    className={styles.question}
                    onClick={() => toggle(id)}
                    aria-expanded={open === id}
                    aria-controls={`faq-answer-${id}`}
                  >
                    <span>{question}</span>
                    <span className={styles.icon} aria-hidden="true">
                      {open === id ? '−' : '+'}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${id}`}
                  className={styles.answer}
                  hidden={open !== id}
                >
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
