/**
 * mockData.js
 * Datos estáticos del CMS (simulan la respuesta de una API interna).
 * En producción, estos datos se cargarían desde el backend.
 */

/** @type {Service[]} */
export const SERVICES = [
  {
    id: 1,
    title: 'Diagnóstico Empresarial',
    description:
      'Evaluamos el estado actual de tu negocio para identificar fortalezas, oportunidades y áreas de mejora mediante metodologías probadas.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format',
    icon: '📊',
    slug: 'diagnostico-empresarial',
  },
  {
    id: 2,
    title: 'Asesoría Financiera',
    description:
      'Te acompañamos en la gestión de finanzas, flujo de caja, acceso a financiamiento y planificación económica para el crecimiento sostenible.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format',
    icon: '💰',
    slug: 'asesoria-financiera',
  },
  {
    id: 3,
    title: 'Marketing Digital',
    description:
      'Desarrollamos estrategias digitales personalizadas: redes sociales, SEO, publicidad online y presencia web para que tu empresa llegue a más clientes.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format',
    icon: '📱',
    slug: 'marketing-digital',
  },
  {
    id: 4,
    title: 'Innovación y Procesos',
    description:
      'Implementamos herramientas digitales y metodologías ágiles para optimizar tus procesos operativos y potenciar la innovación en tu empresa.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format',
    icon: '⚙️',
    slug: 'innovacion-procesos',
  },
  {
    id: 5,
    title: 'Vinculación Empresarial',
    description:
      'Conectamos tu empresa con redes de apoyo, instituciones públicas y privadas, y programas de financiamiento para potenciar tu crecimiento.',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&auto=format',
    icon: '🤝',
    slug: 'vinculacion-empresarial',
  },
  {
    id: 6,
    title: 'Talleres Especializados',
    description:
      'Capacitaciones prácticas en administración, ventas, liderazgo y tecnología, dictadas por expertos con amplia experiencia en el mundo PyME.',
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&auto=format',
    icon: '🎓',
    slug: 'talleres-especializados',
  },
];

/** @type {Testimonial[]} */
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'María González',
    company: 'Pastelería Dulce Hogar',
    role: 'Fundadora',
    content:
      'Gracias al Centro de Negocios logré formalizar mi emprendimiento y acceder a un crédito SERCOTEC. El acompañamiento fue clave para mi crecimiento.',
    avatar: 'MG',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Ramírez',
    company: 'TecnoServicio SpA',
    role: 'Gerente General',
    content:
      'Los talleres de marketing digital transformaron la forma en que llegamos a nuestros clientes. Triplicamos nuestras ventas en 6 meses.',
    avatar: 'CR',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Morales',
    company: 'Boutique Luna',
    role: 'Propietaria',
    content:
      'El diagnóstico empresarial me ayudó a ver problemas que no veía. Con el plan de mejora, pude reducir costos y mejorar la rentabilidad significativamente.',
    avatar: 'AM',
    rating: 5,
  },
  {
    id: 4,
    name: 'Pedro Fuentes',
    company: 'Construcciones Fuentes',
    role: 'Director',
    content:
      'La vinculación con instituciones fue invaluable. Gracias al Centro conocí programas de financiamiento que desconocía y pude expandir mi empresa.',
    avatar: 'PF',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lucía Torres',
    company: 'Estudio LT Diseño',
    role: 'Diseñadora y Socia',
    content:
      'El apoyo en gestión financiera cambió completamente mi visión del negocio. Aprendí a leer mis flujos y planificar a largo plazo.',
    avatar: 'LT',
    rating: 5,
  },
];

/** @type {AboutStat[]} */
export const ABOUT_STATS = [
  { value: '2.500+', label: 'Empresas atendidas', icon: '🏢' },
  { value: '15',     label: 'Años de experiencia', icon: '📅' },
  { value: '98%',    label: 'Satisfacción clientes', icon: '⭐' },
  { value: '450+',   label: 'Talleres realizados', icon: '🎓' },
];

/** @type {TeamMember[]} */
export const TEAM = [
  {
    id: 1,
    name: 'Javiera Soto',
    role: 'Directora del Centro',
    description: 'Especialista en gestión empresarial con 12 años de experiencia en apoyo a PYMEs.',
  },
  {
    id: 2,
    name: 'Roberto Muñoz',
    role: 'Asesor Financiero Senior',
    description: 'MBA y contador auditor con enfoque en finanzas para micro y pequeñas empresas.',
  },
  {
    id: 3,
    name: 'Valentina Pérez',
    role: 'Especialista en Marketing Digital',
    description: 'Experta en estrategias digitales y transformación tecnológica de negocios.',
  },
];