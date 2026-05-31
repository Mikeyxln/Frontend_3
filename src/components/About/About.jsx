import React, { useEffect, useState } from 'react';
import { getAboutData } from '../../api.js';
import styles from './About.module.css';

export default function About() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAboutData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="nosotros" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>

        {/* Texto */}
        <div className={styles.textCol}>
          <span className={styles.badge}>Sobre nosotros</span>
          <h2 id="about-heading" className={styles.title}>
            Comprometidos con el éxito de tu empresa
          </h2>
          <p className={styles.lead}>
            El <strong>Centro de Negocios Santiago de SERCOTEC</strong> es una institución
            dedicada a ofrecer servicios integrales de apoyo y acompañamiento a las
            micro, pequeñas y medianas empresas.
          </p>
          <p className={styles.body}>
            Nuestro enfoque abarca la gestión empresarial, la innovación, el fortalecimiento
            de capacidades y la vinculación con programas de financiamiento. Trabajamos
            para garantizar el correcto funcionamiento, sostenibilidad y eficiencia de
            los negocios de nuestros clientes.
          </p>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon} aria-hidden="true">📍</span>
              <span>Manuel Rodríguez Sur 749, Santiago (Metro Toesca)</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon} aria-hidden="true">✉️</span>
              <a href="mailto:centro.santiago@centrossercotec.cl">
                centro.santiago@centrossercotec.cl
              </a>
            </div>
          </div>
        </div>

        {/* Stats & equipo */}
        <div className={styles.statsCol}>
          {loading ? (
            <div className={styles.loading} role="status" aria-live="polite">Cargando…</div>
          ) : (
            <>
              <ul className={styles.statsGrid} role="list" aria-label="Estadísticas del centro">
                {data?.stats.map(({ value, label, icon }) => (
                  <li key={label} className={styles.statCard}>
                    <span className={styles.statIcon} aria-hidden="true">{icon}</span>
                    <strong className={styles.statValue}>{value}</strong>
                    <span className={styles.statLabel}>{label}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.teamSection}>
                <h3 className={styles.teamTitle}>Nuestro equipo</h3>
                <ul className={styles.teamList} role="list">
                  {data?.team.map(member => (
                    <li key={member.id} className={styles.teamMember}>
                      <div className={styles.teamAvatar} aria-hidden="true">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <strong className={styles.teamName}>{member.name}</strong>
                        <span className={styles.teamRole}>{member.role}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
