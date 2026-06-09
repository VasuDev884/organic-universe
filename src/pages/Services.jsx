import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';
import { SERVICES, INDUSTRIES } from '../data';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
});

const CORE = [
  {
    title: 'Fresh Certification',
    icon: '🌱',
    desc: 'Starting from scratch? We handle every step from gap assessment through your first certificate.',
    items: ['Gap Assessment', 'Organic System Plan Development', 'Application Preparation & Submission', 'Formula & Label Reviews', 'Procedure Updates', 'Control System Design', 'Staff Training', 'Certifier Correspondence'],
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=85',
  },
  {
    title: 'Existing Certified Businesses',
    icon: '🔄',
    desc: 'Already certified? We help you stay compliant and quickly process new products.',
    items: ['Compliance Monitoring', 'Organic Plan Review & Revision', 'Ingredient Verification', 'Third-Party Internal Audits', 'Annual Inspection Attendance', 'Regulatory Notifications', 'Employee Training'],
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=85',
  },
  {
    title: 'Appeals & Crisis Support',
    icon: '⚖️',
    desc: 'Non-compliance situations handled with expertise and care.',
    items: ['Non-compliance Resolution', 'Appeals Filing', 'Mediation', 'Suspension Management', 'Reinstatement', 'Legal Hearing Preparation'],
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=85',
  },
];

export default function Services() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden', background: '#040D05' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1595074475099-8f0b6a08eb7c?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.9) 0%, rgba(27,94,32,0.7) 100%)' }} />
        <Particles count={25} color="rgba(139,195,74,0.4)" />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,195,74,0.15)', border: '1px solid rgba(139,195,74,0.35)', color: '#8BC34A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>Services</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(44px, 7vw, 96px)', color: 'white', lineHeight: 1, marginBottom: 24, letterSpacing: '-1px' }}>
              Comprehensive<br /><em style={{ color: '#8BC34A' }}>Organic</em> Consultancy
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
              From first certification to long-term compliance — we're with you every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: '48px 40px 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Core Services</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: '#0F1C10' }}>
              What We <em>Offer</em>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 24 }}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                style={{ borderRadius: 28, overflow: 'hidden', background: 'white', boxShadow: 'var(--shadow)', cursor: 'default', border: s.featured ? '2px solid rgba(201,168,76,0.5)' : 'none', position: 'relative', transition: 'box-shadow 0.4s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
              >
                {s.featured && <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: 'white', padding: '4px 14px', borderRadius: 100, fontSize: 10, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>★ Flagship</div>}
                <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.8 }} src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,28,16,0.5) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 20, fontSize: 28 }}>{s.icon}</div>
                </div>
                <div style={{ padding: '28px 32px 32px' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, color: '#0F1C10', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: '#516752', fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {s.features.map(f => <span key={f} style={{ background: '#F0F7EE', color: '#2E7D32', padding: '4px 14px', borderRadius: 100, fontSize: 12, fontWeight: 500 }}>{f}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES DETAIL */}
      <section style={{ padding: '80px 40px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {CORE.map((s, i) => (
            <motion.div key={i} {...reveal(0.1)}
              style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.1fr' : '1.1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 100 }}>
              {i % 2 !== 0 && (
                <div style={{ borderRadius: 28, overflow: 'hidden', aspectRatio: '4/3' }}>
                  <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 44, color: '#0F1C10', marginBottom: 16, lineHeight: 1.1 }}>{s.title}</h3>
                <p style={{ color: '#516752', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>{s.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {s.items.map((item, j) => (
                    <motion.div key={item} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.06 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#C9A84C', fontSize: 14 }}>✦</span>
                      <span style={{ fontSize: 14, color: '#0F1C10' }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              {i % 2 === 0 && (
                <div style={{ borderRadius: 28, overflow: 'hidden', aspectRatio: '4/3' }}>
                  <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOD PROCESSING FLAGSHIP */}
      <section style={{ padding: '100px 40px', background: 'linear-gradient(135deg, #040D05, #0A2E0C)', position: 'relative', overflow: 'hidden' }}>
        <Particles count={20} color="rgba(201,168,76,0.25)" />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div {...reveal()} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: 'white', padding: '6px 18px', borderRadius: 100, fontSize: 11, fontWeight: 800, display: 'inline-block', marginBottom: 24, letterSpacing: '1px' }}>⭐ FLAGSHIP SERVICE</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 4vw, 60px)', color: 'white', marginBottom: 20, lineHeight: 1.05 }}>
                Food Processing<br /><em style={{ color: '#8BC34A' }}>Consultancy</em>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.9, marginBottom: 32 }}>
                With 25+ years of experience in the food and beverage industry, we offer end-to-end consulting for food processing ventures — from concept to commissioning.
              </p>
              {['Plant Setup & Design', 'New Product Development', 'Machinery Selection & Consultation', 'Independent Third-Party Audits'].map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(139,195,74,0.2)', border: '1px solid rgba(139,195,74,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8BC34A' }} />
                  </div>
                  <span style={{ color: 'white', fontSize: 15, fontWeight: 500 }}>{f}</span>
                </motion.div>
              ))}
              <Link to="/contact" className="btn-gold" style={{ marginTop: 32 }}>Inquire Now →</Link>
            </div>
            <motion.div {...reveal(0.2)} style={{ borderRadius: 28, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4)', aspectRatio: '4/3' }}>
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} src="https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=700&q=85" alt="Food processing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{ padding: '100px 40px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Industries</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: '#0F1C10' }}>
              Industries We <em>Work With</em>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
                style={{ background: 'white', borderRadius: 22, padding: '30px 18px', textAlign: 'center', boxShadow: 'var(--shadow)', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)', cursor: 'default' }}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}
                  style={{ fontSize: 36, marginBottom: 12, display: 'inline-block' }}>{ind.icon}</motion.div>
                <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 17, color: '#0F1C10', marginBottom: 6 }}>{ind.name}</h4>
                <p style={{ color: '#516752', fontSize: 12 }}>{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
