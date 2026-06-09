import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from '../components/Particles';
import { CERTIFICATIONS } from '../data';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
});

const STEPS_CERT = [
  { step: '01', title: 'Initial Inquiry', icon: '📞', desc: 'Free consultation to understand your operation.' },
  { step: '02', title: 'Site Evaluation', icon: '🔍', desc: 'Onsite gap assessment of your current practices.' },
  { step: '03', title: 'System Planning', icon: '📝', desc: 'Develop a comprehensive Organic System Plan.' },
  { step: '04', title: 'Application', icon: '📋', desc: 'Prepare & submit documentation to certifier.' },
  { step: '05', title: 'Inspection', icon: '✅', desc: 'Expert support throughout the inspection process.' },
  { step: '06', title: 'Certificate', icon: '🏆', desc: 'Receive your organic certificate and celebrate!' },
];

export default function Certifications() {
  const [hovered, setHovered] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden', background: '#040D05' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.92) 0%, rgba(27,94,32,0.65) 100%)' }} />
        <Particles count={30} color="rgba(201,168,76,0.3)" />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', color: '#E8C96A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8C96A', boxShadow: '0 0 8px #E8C96A', display: 'inline-block' }} />
              12+ Global Standards
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(44px, 7vw, 96px)', color: 'white', lineHeight: 1, marginBottom: 24, letterSpacing: '-1px' }}>
              Certification<br /><em style={{ color: '#8BC34A' }}>Standards</em><br />We Support
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
              One consultancy for all your organic certification needs — global reach, local expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STANDARDS GRID */}
      <section style={{ padding: '120px 40px', background: 'var(--bg)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Expertise</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: '#0F1C10' }}>
              Standards <em>Portfolio</em>
            </h2>
            <p style={{ color: '#516752', maxWidth: 540, margin: '20px auto 0', lineHeight: 1.8, fontSize: 16 }}>
              We hold deep expertise across all major organic certification standards globally, allowing clients to access multiple markets through a single consultancy.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 60, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                style={{ background: 'white', borderRadius: 24, padding: '32px 24px', boxShadow: hovered === i ? 'var(--shadow-lg)' : 'var(--shadow)', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)', borderTop: `3px solid ${cert.color}`, cursor: 'default', position: 'relative', overflow: 'hidden' }}
              >
                {/* Glow */}
                <div style={{ position: 'absolute', top: -40, right: -40, width: 100, height: 100, borderRadius: '50%', background: cert.color + '18', transition: 'all 0.4s', opacity: hovered === i ? 1 : 0 }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{ background: cert.color + '18', border: `1px solid ${cert.color}40`, color: cert.color, padding: '6px 16px', borderRadius: 100, fontSize: 14, fontWeight: 800, fontFamily: 'Cormorant Garamond' }}>
                    {cert.name}
                  </div>
                  <span style={{ background: '#F0F7EE', color: '#516752', padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 600 }}>
                    {cert.country}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, color: '#0F1C10', marginBottom: 16, lineHeight: 1.3 }}>{cert.full}</h3>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Evaluation', 'Documentation', 'Submission'].map(tag => (
                    <span key={tag} style={{ background: '#F0F7EE', color: '#2E7D32', padding: '3px 10px', borderRadius: 100, fontSize: 11 }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '100px 40px', background: '#040D05', position: 'relative', overflow: 'hidden' }}>
        <Particles count={20} color="rgba(139,195,74,0.3)" />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-label" style={{ justifyContent: 'center', color: '#8BC34A' }}>Process</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: 'white' }}>
              Certification <em style={{ color: '#8BC34A' }}>Timeline</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {STEPS_CERT.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '32px 24px', transition: 'all 0.4s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,195,74,0.1)'; e.currentTarget.style.borderColor = 'rgba(139,195,74,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, #1B5E20, #8BC34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <span style={{ color: '#8BC34A', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px' }}>STEP {s.step}</span>
                </div>
                <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, color: 'white', marginBottom: 8 }}>{s.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
