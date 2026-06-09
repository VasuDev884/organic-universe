import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import Particles from '../components/Particles';
import { STATS, SERVICES, INDUSTRIES, CLIENTS, STEPS } from '../data';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
});

const stagger = (i) => reveal(i * 0.08);

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#040D05' }}>
        {/* Parallax BG */}
        <motion.div style={{ position: 'absolute', inset: '-20%', y: imgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </motion.div>

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.92) 0%, rgba(27,94,32,0.75) 50%, rgba(15,44,18,0.85) 100%)' }} />

        {/* Particles */}
        <Particles count={40} color="rgba(139,195,74,0.45)" />

        {/* Radial glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,125,50,0.25) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 2 }} />

        <motion.div className="container" style={{ position: 'relative', zIndex: 3, paddingTop: 140, paddingBottom: 100, y: textY, opacity }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#E8C96A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 32 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8C96A', boxShadow: '0 0 8px #E8C96A', display: 'inline-block' }} />
            India's Trusted Organic Consultancy
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(52px, 8vw, 110px)', color: 'white', lineHeight: 0.95, fontWeight: 600, letterSpacing: '-2px' }}
            >
              Certify.
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(52px, 8vw, 110px)', color: 'transparent', lineHeight: 0.95, fontWeight: 600, letterSpacing: '-2px', WebkitTextStroke: '1.5px rgba(139,195,74,0.8)', background: 'linear-gradient(135deg, #8BC34A, #C5E1A5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Comply.
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 40 }}>
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(52px, 8vw, 110px)', color: 'white', lineHeight: 0.95, fontWeight: 600, letterSpacing: '-2px' }}
            >
              Grow Organic.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, maxWidth: 520, lineHeight: 1.8, marginBottom: 44, fontWeight: 300 }}
          >
            Helping growers, processors & manufacturers achieve NPOP · USDA NOP · EU Organic and 9+ global standards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <Link to="/contact" className="btn-gold">Book Free Consultation →</Link>
            <Link to="/services" className="btn-ghost">Explore Services</Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{ position: 'absolute', bottom: -60, left: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}
            />
          </motion.div>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          style={{ position: 'absolute', bottom: 40, right: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, zIndex: 3 }}
          className="hero-stats"
        >
          {STATS.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '20px 24px', textAlign: 'center', minWidth: 130 }}>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 36, fontWeight: 700, color: '#8BC34A', lineHeight: 1 }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4, letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        <style>{`@media(max-width:768px){.hero-stats{display:none!important}}`}</style>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(90deg, #1B5E20, #2E7D32, #1B5E20)', padding: '14px 0', overflow: 'hidden', position: 'relative', zIndex: 5 }}>
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 40, width: 'max-content', alignItems: 'center' }}
        >
          {['NPOP', 'USDA NOP', 'EU Organic', 'KOR', 'PGS', 'Fairtrade', 'Rainforest Alliance', 'Demeter', 'Naturland', 'BioSuisse', 'KRAV', 'JAS', 'NPOP', 'USDA NOP', 'EU Organic', 'KOR', 'PGS', 'Fairtrade', 'Rainforest Alliance', 'Demeter'].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A84C', display: 'inline-block', flexShrink: 0 }} />
              {c}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── ABOUT PREVIEW ────────────────────────────────────── */}
      <section style={{ padding: '120px 40px', background: 'white', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 80, alignItems: 'center' }} className="grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          <motion.div {...reveal()} style={{ position: 'relative' }}>
            {/* Main image */}
            <div style={{ borderRadius: 32, overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=700&q=85"
                alt="Organic farming" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,28,16,0.4) 0%, transparent 50%)' }} />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ position: 'absolute', bottom: -28, right: -28, background: 'white', borderRadius: 24, padding: '24px 28px', boxShadow: '0 20px 60px rgba(46,125,50,0.18)', border: '1px solid rgba(212,232,212,0.6)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 4 }}>🏆</div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 36, fontWeight: 700, color: '#2E7D32', lineHeight: 1 }}>2019</div>
              <div style={{ fontSize: 12, color: '#516752', fontWeight: 500, marginTop: 4 }}>Est. Founded</div>
            </motion.div>
            {/* Second floating card */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ position: 'absolute', top: 40, right: -40, background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', borderRadius: 20, padding: '16px 20px', boxShadow: '0 12px 40px rgba(27,94,32,0.4)' }}
            >
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Certifications</div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 28, fontWeight: 700, color: '#8BC34A', lineHeight: 1 }}>12+</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Global Standards</div>
            </motion.div>
          </motion.div>

          <motion.div {...reveal(0.2)}>
            <div className="section-label">About Us</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 4vw, 58px)', color: '#0F1C10', lineHeight: 1.05, marginBottom: 24 }}>
              Guided by<br /><em>Experience,</em><br />Driven by Purpose
            </h2>
            <p style={{ color: '#516752', fontSize: 16, lineHeight: 1.9, marginBottom: 16 }}>
              Founded in 2019 by <strong style={{ color: '#2E7D32' }}>Gaurav Singh Chaudhary</strong>, Organic Universe brings decades of hands-on expertise in organic certification, compliance, and food processing consultancy.
            </p>
            <p style={{ color: '#516752', fontSize: 16, lineHeight: 1.9, marginBottom: 36 }}>
              From small-scale growers to multinational corporations, our tailored services empower clients across India to obtain and maintain organic certification with confidence.
            </p>
            {['NPOP, NOP, EU Organic & 9 more standards', 'Crop, livestock, processing & cosmetics expertise', 'End-to-end support from evaluation to certificate'].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#E8F5E9', border: '2px solid #8BC34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2E7D32' }} />
                </div>
                <span style={{ fontSize: 15, color: '#0F1C10' }}>{t}</span>
              </motion.div>
            ))}
            <motion.div whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link to="/about" className="btn-primary" style={{ marginTop: 36 }}>
                Our Story <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────── */}
      <section style={{ padding: '80px 40px', background: 'linear-gradient(135deg, #040D05 0%, #0A2E0C 50%, #040D05 100%)', position: 'relative', overflow: 'hidden' }}>
        <Particles count={20} color="rgba(201,168,76,0.3)" />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {STATS.map((s, i) => (
              <motion.div key={i} {...stagger(i)}
                style={{ textAlign: 'center', padding: '32px 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none', position: 'relative' }}
              >
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(52px, 6vw, 76px)', fontWeight: 700, lineHeight: 1, background: 'linear-gradient(135deg, #8BC34A, #C5E1A5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── METHODOLOGY ──────────────────────────────────────── */}
      <section style={{ padding: '120px 40px', background: 'var(--bg)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 80 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Process</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: '#0F1C10' }}>
              Four Steps to <em>Certification</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative' }}>
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', top: 52, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg, #8BC34A, #C9A84C, #8BC34A)', transformOrigin: 'left', zIndex: 0 }}
            />
            {STEPS.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div style={{ background: 'white', borderRadius: 28, padding: '36px 28px', boxShadow: 'var(--shadow)', textAlign: 'center', transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                >
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #1B5E20, #8BC34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(46,125,50,0.3)' }}>
                    <span style={{ color: 'white', fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: 18 }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 24, color: '#0F1C10', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: '#516752', fontSize: 13, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section style={{ padding: '120px 40px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...reveal()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="section-label">What We Do</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: '#0F1C10' }}>
                Our Core <em>Services</em>
              </h2>
            </div>
            <Link to="/services" style={{ color: '#2E7D32', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
              View All Services →
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                style={{ borderRadius: 28, overflow: 'hidden', background: 'white', boxShadow: 'var(--shadow)', transition: 'box-shadow 0.4s', cursor: 'default', border: s.featured ? '2px solid rgba(201,168,76,0.4)' : 'none', position: 'relative' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
              >
                {s.featured && (
                  <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: 'white', padding: '4px 14px', borderRadius: 100, fontSize: 10, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>★ Flagship</div>
                )}
                <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    src={s.image} alt={s.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,28,16,0.5) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 20, fontSize: 28 }}>{s.icon}</div>
                </div>
                <div style={{ padding: '28px 32px 32px' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, color: '#0F1C10', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: '#516752', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {s.features.slice(0, 3).map(f => (
                      <span key={f} style={{ background: '#F0F7EE', color: '#2E7D32', padding: '4px 14px', borderRadius: 100, fontSize: 12, fontWeight: 500 }}>{f}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES DARK ──────────────────────────────────── */}
      <section style={{ padding: '120px 40px', background: '#040D05', position: 'relative', overflow: 'hidden' }}>
        <Particles count={25} color="rgba(139,195,74,0.35)" />
        {/* Big ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,125,50,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-label" style={{ justifyContent: 'center', color: '#8BC34A' }}>Industries</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: 'white' }}>
              Who We <em style={{ color: '#8BC34A' }}>Work With</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                whileHover={{ y: -6, background: 'rgba(139,195,74,0.12)', borderColor: 'rgba(139,195,74,0.3)' }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '32px 20px', textAlign: 'center', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)', cursor: 'default' }}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}
                  style={{ fontSize: 40, marginBottom: 14, display: 'inline-block' }}>{ind.icon}</motion.div>
                <h4 style={{ color: 'white', fontSize: 15, fontWeight: 600, marginBottom: 6, fontFamily: 'Outfit' }}>{ind.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLIENTS MARQUEE ──────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'white', overflow: 'hidden' }}>
        <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 48, padding: '0 40px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Clients</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px, 4vw, 48px)', color: '#0F1C10' }}>
            Trusted by 50+ Businesses
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Fade masks */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, white, transparent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, white, transparent)', zIndex: 2 }} />

          <motion.div animate={{ x: [0, -2200] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: 20, width: 'max-content', padding: '8px 0' }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} style={{ background: '#F7FAF5', border: '1px solid #D4E8D4', borderRadius: 16, padding: '14px 24px', whiteSpace: 'nowrap', fontSize: 13, fontWeight: 500, color: '#516752', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span style={{ color: '#8BC34A' }}>🌿</span> {c}
              </div>
            ))}
          </motion.div>
          {/* Second row reverse */}
          <motion.div animate={{ x: [-2200, 0] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: 20, width: 'max-content', padding: '8px 0', marginTop: 8 }}>
            {[...CLIENTS, ...CLIENTS].reverse().map((c, i) => (
              <div key={i} style={{ background: '#F0F7EE', border: '1px solid #C5E1A5', borderRadius: 16, padding: '14px 24px', whiteSpace: 'nowrap', fontSize: 13, fontWeight: 500, color: '#516752', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span style={{ color: '#C9A84C' }}>★</span> {c}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: '120px 40px', background: 'linear-gradient(135deg, #0A2E0C 0%, #1B5E20 50%, #0A2E0C 100%)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <Particles count={30} color="rgba(201,168,76,0.25)" />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', color: '#E8C96A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 32 }}>
              ✦ Free Consultation
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(40px, 6vw, 80px)', color: 'white', lineHeight: 1, marginBottom: 24 }}>
              Ready to Go<br /><em style={{ color: '#8BC34A' }}>Organic?</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 500, margin: '0 auto 48px', lineHeight: 1.8 }}>
              Let us simplify your certification journey. Book a free consultation with our experts today.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-gold">Book Free Consultation →</Link>
              <a href="tel:+919736419705" className="btn-ghost">📞 +91 9736419705</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
