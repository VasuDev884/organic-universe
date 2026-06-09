import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';
import { STEPS } from '../data';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
});

const WHY = [
  { icon: '🎓', title: 'Industry Experts', desc: 'Former organic auditors, growers, and processors with deep practical knowledge.' },
  { icon: '🌍', title: 'Global Standards', desc: 'Specialists in NPOP, USDA NOP, EU Organic, PGS and 8+ international standards.' },
  { icon: '🤝', title: 'Personalised Consulting', desc: 'Every client gets a tailored plan — no one-size-fits-all approaches.' },
  { icon: '🔄', title: 'End-to-End Support', desc: 'From initial gap assessment through certification, we stay with you.' },
  { icon: '📚', title: 'Continuous Learning', desc: 'Regular training updates ensure current regulatory guidance.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Streamlined process gets your organic products to market faster.' },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden', background: '#040D05' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1492496913980-501348b61469?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.88) 0%, rgba(27,94,32,0.65) 100%)' }} />
        <Particles count={25} color="rgba(139,195,74,0.4)" />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,195,74,0.15)', border: '1px solid rgba(139,195,74,0.35)', color: '#8BC34A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>
              About Us
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(44px, 7vw, 96px)', color: 'white', lineHeight: 1, marginBottom: 24, letterSpacing: '-1px' }}>
              Helping Businesses<br />Navigate <em style={{ color: '#8BC34A' }}>Organic</em><br />Compliance
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
              Since 2019, the trusted partner for India's leading organic businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section style={{ padding: '120px 40px', background: 'white', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div {...reveal()}>
            <div className="section-label">Our Story</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 4vw, 58px)', color: '#0F1C10', lineHeight: 1.05, marginBottom: 24 }}>
              Born from<br /><em>Frustration,</em><br />Built on Expertise
            </h2>
            <p style={{ color: '#516752', lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>
              In 2019, <strong style={{ color: '#2E7D32' }}>Gaurav Singh Chaudhary</strong> combined his experience as an organic grower, processor, and auditor to form Organic Universe Consultancy.
            </p>
            <p style={{ color: '#516752', lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>
              Having worked within certification agencies, Gaurav witnessed how businesses struggled with complex organic standards yet was prevented from offering guidance. This frustration became the founding purpose of Organic Universe.
            </p>
            <p style={{ color: '#516752', lineHeight: 1.9, marginBottom: 36, fontSize: 15 }}>
              Today, our team's cumulative experience as growers, processors, and inspectors gives us a unique perspective bridging complex standards and real-world implementation.
            </p>
            {['Founded 2019 · Led by Gaurav Singh Chaudhary', '50+ clients from small farms to multinationals', '12+ organic standards supported'].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ color: '#C9A84C', fontSize: 18 }}>✦</span>
                <span style={{ fontSize: 14, color: '#0F1C10', fontWeight: 500 }}>{t}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...reveal(0.2)} style={{ position: 'relative' }}>
            <div style={{ borderRadius: 32, overflow: 'hidden', aspectRatio: '3/4' }}>
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=700&q=85"
                alt="Organic farming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: 'spring' }}
              style={{ position: 'absolute', bottom: -24, left: -24, background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', borderRadius: 24, padding: '24px 28px', boxShadow: '0 16px 48px rgba(27,94,32,0.4)' }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>Happy Clients</div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 44, fontWeight: 700, color: '#8BC34A', lineHeight: 1 }}>50+</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ padding: '80px 40px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div {...reveal()}
            style={{ background: 'white', borderRadius: 36, padding: '56px', boxShadow: 'var(--shadow-xl)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 48, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,195,74,0.1) 0%, transparent 70%)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg, #1B5E20, #8BC34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, margin: '0 auto 14px', boxShadow: '0 12px 40px rgba(46,125,50,0.3)' }}>👨‍💼</div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: 18, color: '#0F1C10' }}>Gaurav Singh Chaudhary</div>
              <div style={{ color: '#2E7D32', fontSize: 12, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: 4 }}>Founder & Principal Consultant</div>
            </div>
            <div>
              <div style={{ fontSize: 64, color: '#D4E8D4', fontFamily: 'Cormorant Garamond', lineHeight: 0.8, marginBottom: 8 }}>"</div>
              <blockquote style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 22, color: '#0F1C10', lineHeight: 1.6, marginBottom: 20 }}>
                We exist to bridge the gap between complex organic standards and real-world implementation — making certification accessible to every grower and processor.
              </blockquote>
              <p style={{ color: '#516752', fontSize: 14, lineHeight: 1.7 }}>
                With 25+ years in the food and beverage industry and deep expertise in organic auditing, Gaurav leads our team with integrity, practicality, and continuous learning.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section style={{ padding: '120px 40px', background: 'white', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 80 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>How We Work</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: '#0F1C10' }}>
              Our Four-Step <em>Process</em>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, position: 'relative' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', top: 52, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg, #C9A84C, #8BC34A, #C9A84C)', transformOrigin: 'left', zIndex: 0 }}
            />
            {STEPS.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div style={{ background: 'linear-gradient(160deg, #F0F7EE, #FAFCF8)', border: '1px solid #D4E8D4', borderRadius: 28, padding: '40px 24px', textAlign: 'center', transition: 'all 0.4s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(160deg, #E8F5E9, #F0F7EE)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(46,125,50,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(160deg, #F0F7EE, #FAFCF8)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #1B5E20, #8BC34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(46,125,50,0.3)' }}>
                    <span style={{ color: 'white', fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: 20 }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 24, color: '#0F1C10', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: '#516752', fontSize: 13, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section style={{ padding: '120px 40px', background: '#040D05', position: 'relative', overflow: 'hidden' }}>
        <Particles count={20} color="rgba(139,195,74,0.3)" />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-label" style={{ justifyContent: 'center', color: '#8BC34A' }}>Why Us</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: 'white' }}>
              The <em style={{ color: '#8BC34A' }}>Organic Universe</em> Advantage
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {WHY.map((w, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                whileHover={{ y: -6, background: 'rgba(139,195,74,0.1)', borderColor: 'rgba(139,195,74,0.25)' }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, padding: '36px 28px', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)' }}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 8 }} transition={{ type: 'spring', stiffness: 400 }}
                  style={{ fontSize: 36, marginBottom: 18, display: 'inline-block' }}>{w.icon}</motion.div>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, color: 'white', marginBottom: 10 }}>{w.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7 }}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 40px', background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?w=1200&q=60)', backgroundSize: 'cover', opacity: 0.08 }} />
        <motion.div {...reveal()} style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: 'white', marginBottom: 24 }}>
            Ready to Start Your<br /><em>Organic Journey?</em>
          </h2>
          <Link to="/contact" className="btn-gold">Book Free Consultation →</Link>
        </motion.div>
      </section>
    </div>
  );
}
