import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Particles from '../components/Particles';
import { submitContact } from '../lib/api';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
});

function FloatField({ label, name, type = 'text', value, onChange, required, placeholder }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || !!value;
  return (
    <div style={{ position: 'relative', marginBottom: 20 }}>
      <motion.label
        animate={{ y: lifted ? -22 : 0, fontSize: lifted ? 10 : 14, color: focused ? '#2E7D32' : '#8BA88B' }}
        transition={{ duration: 0.18 }}
        style={{ position: 'absolute', left: 16, top: 14, fontWeight: 700, letterSpacing: lifted ? '0.8px' : 0, textTransform: lifted ? 'uppercase' : 'none', pointerEvents: 'none', zIndex: 1 }}
      >{label}</motion.label>
      <input
        name={name} type={type} value={value} required={required}
        placeholder={focused ? placeholder : ''}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: '100%', paddingTop: lifted ? 22 : 14, paddingBottom: 10, paddingLeft: 16, paddingRight: 16, border: `2px solid ${focused ? '#2E7D32' : '#D4E8D4'}`, borderRadius: 16, fontSize: 14, fontFamily: 'Outfit', outline: 'none', background: focused ? '#fff' : 'var(--bg)', color: '#0F1C10', transition: 'all 0.25s' }}
      />
    </div>
  );
}

export default function Contact() {
  const empty = { name: '', company: '', phone: '', email: '', service: '', message: '' };
  const [form, setForm] = useState(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitContact(form);
      setSubmitted(true);
      setForm(empty);
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden', background: '#040D05' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.92) 0%, rgba(27,94,32,0.65) 100%)' }} />
        <Particles count={25} color="rgba(139,195,74,0.4)" />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,195,74,0.15)', border: '1px solid rgba(139,195,74,0.35)', color: '#8BC34A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>Contact</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(44px, 7vw, 96px)', color: 'white', lineHeight: 1, marginBottom: 24, letterSpacing: '-1px' }}>
              Let's Start Your<br /><em style={{ color: '#8BC34A' }}>Organic</em> Journey
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
              Get in touch for a free, no-obligation consultation. We respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '100px 40px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }}>

          {/* LEFT */}
          <motion.div {...reveal()}>
            <div className="section-label">Get In Touch</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(32px, 3.5vw, 50px)', color: '#0F1C10', lineHeight: 1.1, marginBottom: 20 }}>
              We're Here<br /><em>to Help</em>
            </h2>
            <p style={{ color: '#516752', lineHeight: 1.9, marginBottom: 44, fontSize: 15 }}>
              Whether you're starting your organic journey or need compliance support, our team is ready to guide you every step of the way.
            </p>

            {[
              { emoji: '📞', label: 'Phone', value: '+91 9736419705', href: 'tel:+919736419705', accent: '#E8F5E9', border: '#C5E1A5' },
              { emoji: '✉️', label: 'Email', value: 'organicuniverse1@gmail.com', href: 'mailto:organicuniverse1@gmail.com', accent: '#E3F2FD', border: '#BBDEFB' },
              { emoji: '📍', label: 'Location', value: 'India — Serving Nationally & Globally', href: '#', accent: '#FFF8E1', border: '#FFE082' },
            ].map(({ emoji, label, value, href, accent, border }, i) => (
              <motion.a key={label} href={href}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                whileHover={{ x: 6, boxShadow: '0 8px 32px rgba(46,125,50,0.1)' }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16, padding: '18px 20px', background: 'white', borderRadius: 20, border: `1px solid ${border}`, boxShadow: 'var(--shadow-sm)', textDecoration: 'none', transition: 'all 0.3s' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{emoji}</div>
                <div>
                  <div style={{ fontSize: 10, color: '#8BC34A', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                  <div style={{ color: '#0F1C10', fontWeight: 500, fontSize: 14 }}>{value}</div>
                </div>
              </motion.a>
            ))}

            <motion.a
              href="https://wa.me/919736419705?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation."
              target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(37,211,102,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: 'white', padding: '14px 28px', borderRadius: 100, fontWeight: 700, fontSize: 15, boxShadow: '0 8px 24px rgba(37,211,102,0.3)', marginTop: 8, textDecoration: 'none' }}
            >💬 Chat on WhatsApp</motion.a>

            <motion.div {...reveal(0.3)} style={{ marginTop: 40, background: 'white', borderRadius: 24, padding: '28px', boxShadow: 'var(--shadow)', border: '1px solid #D4E8D4' }}>
              <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, color: '#0F1C10', marginBottom: 18 }}>Office Hours</h4>
              {[['Monday – Friday', '9:00 AM – 6:00 PM'], ['Saturday', '10:00 AM – 4:00 PM'], ['Sunday', 'Emergency support available']].map(([day, hours], i) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F0F7EE' : 'none', fontSize: 14 }}>
                  <span style={{ color: '#516752' }}>{day}</span>
                  <span style={{ color: '#0F1C10', fontWeight: 600 }}>{hours}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* FORM */}
          <motion.div {...reveal(0.2)}>
            <div style={{ background: 'white', borderRadius: 36, padding: '52px', boxShadow: 'var(--shadow-xl)', border: '1px solid #D4E8D4', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,195,74,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} style={{ fontSize: 72, marginBottom: 20 }}>🎉</motion.div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 36, color: '#0F1C10', marginBottom: 12 }}>Message Sent!</h3>
                    <p style={{ color: '#516752', lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <motion.button onClick={() => setSubmitted(false)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', color: 'white', padding: '13px 32px', borderRadius: 100, border: 'none', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 600, fontSize: 14 }}>
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 34, color: '#0F1C10', marginBottom: 6 }}>Request a Consultation</h3>
                    <p style={{ color: '#516752', fontSize: 14, marginBottom: 36 }}>Free, no-obligation. We respond within 24 hours.</p>

                    {error && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '12px 16px', marginBottom: 20, color: '#DC2626', fontSize: 13 }}>
                        ⚠️ {error}
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                        <FloatField label="Full Name" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
                        <div style={{ width: 16 }} />
                        <FloatField label="Company" name="company" value={form.company} onChange={handleChange} placeholder="Company name" />
                        <div style={{ width: 16 }} />
                        <FloatField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
                        <div style={{ width: 16 }} />
                        <FloatField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#8BC34A', marginBottom: 8, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Service Interested In *</label>
                        <select name="service" value={form.service} onChange={handleChange} required
                          style={{ width: '100%', padding: '14px 16px', border: `2px solid ${form.service ? '#8BC34A' : '#D4E8D4'}`, borderRadius: 16, fontSize: 14, fontFamily: 'Outfit', outline: 'none', background: 'var(--bg)', color: form.service ? '#0F1C10' : '#8BA88B', appearance: 'none', cursor: 'pointer', transition: 'border 0.2s' }}
                          onFocus={e => e.target.style.borderColor = '#2E7D32'}
                          onBlur={e => e.target.style.borderColor = form.service ? '#8BC34A' : '#D4E8D4'}
                        >
                          <option value="">Select a service...</option>
                          {['Organic Certification (Fresh)', 'Compliance Management', 'Food Processing Consultancy', 'Appeals & Legal Support', 'NPOP Certification', 'USDA NOP', 'EU Organic', 'Other'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>

                      <div style={{ marginBottom: 32 }}>
                        <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#8BC34A', marginBottom: 8, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Message *</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={4} required
                          placeholder="Tell us about your operation and certification goals..."
                          style={{ width: '100%', padding: '14px 16px', border: '2px solid #D4E8D4', borderRadius: 16, fontSize: 14, fontFamily: 'Outfit', outline: 'none', resize: 'vertical', background: 'var(--bg)', color: '#0F1C10', transition: 'border 0.2s', minHeight: 120 }}
                          onFocus={e => e.target.style.borderColor = '#2E7D32'}
                          onBlur={e => e.target.style.borderColor = '#D4E8D4'}
                        />
                      </div>

                      <motion.button type="submit" disabled={loading}
                        whileHover={!loading ? { scale: 1.02, boxShadow: '0 16px 48px rgba(46,125,50,0.4)' } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: loading ? '#8BC34A' : 'linear-gradient(135deg, #1B5E20, #2E7D32)', color: 'white', padding: '18px', borderRadius: 100, border: 'none', cursor: loading ? 'wait' : 'pointer', fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, boxShadow: '0 8px 28px rgba(46,125,50,0.3)', transition: 'background 0.3s' }}
                      >
                        {loading
                          ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>⏳</motion.span> Sending...</>
                          : <>✉️ Send Message</>
                        }
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
