import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Particles from '../components/Particles';

const reveal = (d = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: d },
});

const CATEGORIES = ['All', 'Farms', 'Processing Units', 'Certifications', 'Team', 'Client Visits'];

const IMAGES = [
  { id:1, cat:'Farms',           src:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', title:'Organic Wheat Fields',       loc:'Himachal Pradesh', span:'wide' },
  { id:2, cat:'Processing Units',src:'https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=800&q=80', title:'Food Processing Facility',   loc:'Punjab', span:'tall' },
  { id:3, cat:'Certifications',  src:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', title:'NPOP Certification Audit',   loc:'Delhi', span:'' },
  { id:4, cat:'Farms',           src:'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80', title:'Vegetable Farm',             loc:'Uttarakhand', span:'' },
  { id:5, cat:'Team',            src:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', title:'Consultant Training Session', loc:'Chandigarh', span:'' },
  { id:6, cat:'Client Visits',   src:'https://images.unsplash.com/photo-1560264280-88b68371db39?w=800&q=80', title:'Client Site Inspection',     loc:'Shimla', span:'' },
  { id:7, cat:'Farms',           src:'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80', title:'Herb Cultivation',           loc:'Kullu', span:'wide' },
  { id:8, cat:'Processing Units',src:'https://images.unsplash.com/photo-1595074475099-8f0b6a08eb7c?w=800&q=80', title:'Cold Storage Unit',          loc:'Ludhiana', span:'' },
  { id:9, cat:'Certifications',  src:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', title:'EU Organic Audit',           loc:'Mumbai', span:'tall' },
  { id:10,cat:'Team',            src:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', title:'Team Workshop',             loc:'Chandigarh', span:'' },
  { id:11,cat:'Client Visits',   src:'https://images.unsplash.com/photo-1492496913980-501348b61469?w=800&q=80', title:'Farm Walk-Through',          loc:'Haryana', span:'' },
  { id:12,cat:'Farms',           src:'https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?w=800&q=80', title:'Spice Plantation',           loc:'Kerala', span:'' },
];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const filtered = active === 'All' ? IMAGES : IMAGES.filter(i => i.cat === active);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden', background: '#040D05' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.92) 0%, rgba(27,94,32,0.65) 100%)' }} />
        <Particles count={20} color="rgba(139,195,74,0.35)" />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,195,74,0.15)', border: '1px solid rgba(139,195,74,0.35)', color: '#8BC34A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>Gallery</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(44px, 7vw, 96px)', color: 'white', lineHeight: 1, letterSpacing: '-1px', marginBottom: 20 }}>
              Our Work in <em style={{ color: '#8BC34A' }}>Pictures</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
              Farms, processing units, audits, and team activities across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ padding: '80px 40px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Filter tabs */}
          <motion.div {...reveal()} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
            {CATEGORIES.map(cat => (
              <motion.button key={cat} onClick={() => setActive(cat)}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '10px 22px', borderRadius: 100, border: `2px solid ${active === cat ? '#2E7D32' : '#D4E8D4'}`, background: active === cat ? '#2E7D32' : 'white', color: active === cat ? 'white' : '#516752', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit', transition: 'all 0.25s', boxShadow: active === cat ? '0 4px 16px rgba(46,125,50,0.25)' : 'none' }}>
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div layout style={{ columns: 3, columnGap: 16 }}>
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id} layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setLightbox(img)}
                  style={{ breakInside: 'avoid', marginBottom: 16, borderRadius: 20, overflow: 'hidden', cursor: 'pointer', position: 'relative', display: 'block', boxShadow: 'var(--shadow)' }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <motion.img
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      src={img.src} alt={img.title}
                      style={{ width: '100%', display: 'block', objectFit: 'cover', minHeight: img.span === 'tall' ? 340 : img.span === 'wide' ? 220 : 200 }}
                    />
                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                      style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,13,5,0.85) 0%, rgba(4,13,5,0.3) 50%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 20 }}
                    >
                      <div style={{ background: 'rgba(139,195,74,0.2)', border: '1px solid rgba(139,195,74,0.4)', color: '#8BC34A', padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: 8, width: 'fit-content' }}>{img.cat}</div>
                      <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, color: 'white', marginBottom: 4 }}>{img.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>📍 {img.loc}</p>
                      <div style={{ marginTop: 10, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🔍</div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
              <p style={{ color: '#8BA88B' }}>No images in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(4,13,5,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 900, width: '100%', borderRadius: 24, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
            >
              <img src={lightbox.src} alt={lightbox.title} style={{ width: '100%', maxHeight: '75vh', objectFit: 'cover', display: 'block' }} />
              <div style={{ background: '#040D05', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, color: 'white', marginBottom: 4 }}>{lightbox.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>📍 {lightbox.loc} · {lightbox.cat}</div>
                </div>
                <button onClick={() => setLightbox(null)}
                  style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
