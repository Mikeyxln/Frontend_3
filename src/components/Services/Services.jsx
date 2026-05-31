import React, { useEffect, useState } from 'react';
import ServiceCard from '../ui/ServiceCard.jsx';
import { getServices } from '../../api.js';
import styles from './Services.module.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(() => setError('No se pudieron cargar los servicios.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="servicios" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Nuestros servicios</span>
          <h2 id="services-heading" className={styles.title}>
            Todo lo que necesita tu empresa
          </h2>
          <p className={styles.subtitle}>
            Ofrecemos soluciones integrales de acompañamiento y gestión para
            impulsar el crecimiento de tu negocio.
          </p>
        </div>

        {loading && (
          <div className={styles.loading} role="status" aria-live="polite">
            <div className={styles.spinner} aria-hidden="true" />
            Cargando servicios…
          </div>
        )}

        {error && (
          <p className={styles.error} role="alert">{error}</p>
        )}

        {!loading && !error && (
          <ul className={styles.grid} role="list">
            {services.map(service => (
              <li key={service.id}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
