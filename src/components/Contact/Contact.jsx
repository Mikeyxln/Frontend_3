import React, { useState } from 'react';
import { submitContactForm } from '../../api.js';
import styles from './Contact.module.css';

const SERVICES_LIST = [
  'Diagnóstico Empresarial',
  'Asesoría Financiera',
  'Marketing Digital',
  'Innovación y Procesos',
  'Vinculación Empresarial',
  'Talleres Especializados',
  'Otro',
];

const INITIAL = { name: '', email: '', phone: '', service: '', message: '' };

/* Validación del lado del cliente */
function validate(fields) {
  const errors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Ingresa un correo electrónico válido.';
  if (fields.phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(fields.phone))
    errors.phone = 'Teléfono no válido (solo números, espacios y +).';
  if (!fields.service)
    errors.service = 'Selecciona un servicio.';
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  return errors;
}

export default function Contact() {
  const [fields,   setFields]   = useState(INITIAL);
  const [errors,   setErrors]   = useState({});
  const [status,   setStatus]   = useState('idle'); // idle | loading | success | error
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    // Limpiar error al corregir
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      // Foco al primer campo con error (accesibilidad)
      const first = Object.keys(validationErrors)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    setStatus('loading');
    try {
      const result = await submitContactForm(fields);
      setStatus('success');
      setFeedback(result.message);
      setFields(INITIAL);
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Ocurrió un error. Por favor intenta de nuevo.');
    }
  };

  return (
    <section id="contacto" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>

        {/* Info lateral */}
        <div className={styles.infoCol}>
          <span className={styles.badge}>Contacto</span>
          <h2 id="contact-heading" className={styles.title}>
            ¿Listo para hacer crecer tu empresa?
          </h2>
          <p className={styles.subtitle}>
            Completa el formulario y un asesor se pondrá en contacto contigo
            en menos de 24 horas hábiles.
          </p>

          <ul className={styles.contactList} role="list">
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">📍</span>
              <span>Manuel Rodríguez Sur 749, Santiago<br /><small>Metro Toesca</small></span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">✉️</span>
              <a href="mailto:centro.santiago@centrossercotec.cl">
                centro.santiago@centrossercotec.cl
              </a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">🌐</span>
              <a href="https://sitios.sercotec.cl/centros-de-negocios/centro-de-desarrollo-de-negocios-santiago/" target="_blank" rel="noopener noreferrer">
                sitios.sercotec.cl
              </a>
            </li>
          </ul>
        </div>

        {/* Formulario */}
        <div className={styles.formCol}>
          {status === 'success' ? (
            <div className={styles.successMsg} role="alert">
              <span className={styles.successIcon}>✅</span>
              <h3>¡Mensaje enviado!</h3>
              <p>{feedback}</p>
              <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulario de contacto"
            >
              {/* Nombre */}
              <div className={styles.field}>
                <label htmlFor="field-name" className={styles.label}>
                  Nombre completo <span aria-hidden="true" className={styles.required}>*</span>
                </label>
                <input
                  id="field-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  value={fields.name}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span id="err-name" className={styles.error} role="alert">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label htmlFor="field-email" className={styles.label}>
                  Correo electrónico <span aria-hidden="true" className={styles.required}>*</span>
                </label>
                <input
                  id="field-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  value={fields.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span id="err-email" className={styles.error} role="alert">{errors.email}</span>}
              </div>

              {/* Teléfono */}
              <div className={styles.field}>
                <label htmlFor="field-phone" className={styles.label}>
                  Teléfono <span className={styles.optional}>(opcional)</span>
                </label>
                <input
                  id="field-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  value={fields.phone}
                  onChange={handleChange}
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <span id="err-phone" className={styles.error} role="alert">{errors.phone}</span>}
              </div>

              {/* Servicio (pre-rellenable desde ServiceCard) */}
              <div className={styles.field}>
                <label htmlFor="service-select" className={styles.label}>
                  Servicio de interés <span aria-hidden="true" className={styles.required}>*</span>
                </label>
                <select
                  id="service-select"
                  name="service"
                  className={`${styles.input} ${errors.service ? styles.inputError : ''}`}
                  value={fields.service}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.service ? 'err-service' : undefined}
                  aria-invalid={!!errors.service}
                >
                  <option value="">Selecciona un servicio…</option>
                  {SERVICES_LIST.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <span id="err-service" className={styles.error} role="alert">{errors.service}</span>}
              </div>

              {/* Mensaje */}
              <div className={styles.field}>
                <label htmlFor="field-message" className={styles.label}>
                  Mensaje <span aria-hidden="true" className={styles.required}>*</span>
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={4}
                  className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  value={fields.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <span id="err-message" className={styles.error} role="alert">{errors.message}</span>}
              </div>

              {/* Protección anti-bot (honeypot) */}
              <input
                type="text"
                name="_bot_field"
                tabIndex={-1}
                aria-hidden="true"
                style={{ display: 'none' }}
                autoComplete="off"
              />

              {status === 'error' && (
                <p className={styles.formError} role="alert">{feedback}</p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <><span className={styles.btnSpinner} aria-hidden="true" /> Enviando…</>
                ) : (
                  'Enviar mensaje'
                )}
              </button>

              <p className={styles.privacy}>
                <small>🔒 Tus datos están protegidos y no serán compartidos con terceros.</small>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
