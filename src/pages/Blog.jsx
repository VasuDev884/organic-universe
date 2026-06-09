import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from '../components/Particles';

const reveal = (d = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: d },
});

const CATEGORIES = ['All', 'Certification Guides', 'Organic Farming', 'Food Processing', 'Industry News', 'Compliance'];

const POSTS = [
  { id:1, cat:'Certification Guides', title:'Complete Guide to NPOP Certification in India', excerpt:'Everything you need to know about the National Programme for Organic Production — from eligibility to getting your certificate.', author:'Gaurav Singh Chaudhary', date:'Jan 15, 2024', readTime:'8 min read', img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', featured:true },
  { id:2, cat:'Organic Farming',      title:'Top 10 Organic Farming Practices for Higher Yield', excerpt:'Proven agronomic practices that boost yield while maintaining strict organic standards and soil health.', author:'Organic Universe', date:'Jan 10, 2024', readTime:'6 min read', img:'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80', featured:false },
  { id:3, cat:'Food Processing',      title:'Setting Up an Organic-Certified Food Processing Unit', excerpt:'Key requirements, machinery, layout, and documentation needed to get your food processing unit certified organic.', author:'Gaurav Singh Chaudhary', date:'Jan 5, 2024', readTime:'10 min read', img:'https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=600&q=80', featured:false },
  { id:4, cat:'Industry News',        title:'USDA NOP Updates: What Changed in 2024', excerpt:'A breakdown of the latest amendments to the National Organic Program and what they mean for Indian exporters.', author:'Organic Universe', date:'Dec 28, 2023', readTime:'5 min read', img:'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80', featured:false },
  { id:5, cat:'Compliance',           title:'How to Handle an Organic Inspection: Insider Tips', excerpt:'Prepare your team, documentation, and facility for a seamless certification inspection. What inspectors really look for.', author:'Gaurav Singh Chaudhary', date:'Dec 20, 2023', readTime:'7 min read', img:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80', featured:false },
  { id:6, cat:'Certification Guides', title:'EU Organic vs NPOP: Key Differences Explained', excerpt:'Comparing the European Union organic standard with India\'s NPOP — scope, requirements, and mutual recognition.', author:'Organic Universe', date:'Dec 15, 2023', readTime:'9 min read', img:'https://images.unsplash.com/photo-1492496913980-501348b61469?w=600&q=80', featured:false },
];

const catColors = {
  'Certification Guides': { bg: '#E8F5E9', color: '#2E7D32' },
  'Organic Farming':       { bg: '#F0F7EE', color: '#388E3C' },
  'Food Processing':       { bg: '#E3F2FD', color: '#1565C0' },
  'Industry News':         { bg: '#FFF8E1', color: '#F57F17' },
  'Compliance':            { bg: '#F3E5F5', color: '#6A1B9A' },
};

export default function Blog() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const featured = POSTS.find(p => p.featured);
  const filtered = POSTS.filter(p => {
    if (p.featured) return false;
    if (active !== 'All' && p.cat !== active) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden', background: '#040D05' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1492496913980-501348b61469?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.92) 0%, rgba(27,94,32,0.65) 100%)' }} />
        <Particles count={20} color="rgba(139,195,74,0.35)" />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,195,74,0.15)', border: '1px solid rgba(139,195,74,0.35)', color: '#8BC34A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>Blog & Resources</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(44px, 7vw, 96px)', color: 'white', lineHeight: 1, letterSpacing: '-1px', marginBottom: 20 }}>
              Insights & <em style={{ color: '#8BC34A' }}>Guides</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
              Expert articles on organic certification, farming practices, and industry updates.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '80px 40px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* FEATURED POST */}
          {featured && (
            <motion.div {...reveal()} style={{ marginBottom: 72 }}>
              <div className="section-label">Featured Article</div>
              <motion.div
                whileHover={{ y: -6 }}
                style={{ borderRadius: 28, overflow: 'hidden', background: 'white', boxShadow: 'var(--shadow-xl)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', cursor: 'pointer', border: '1px solid #D4E8D4' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 30px 80px rgba(46,125,50,0.18)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-xl)'}
              >
                <div style={{ overflow: 'hidden', position: 'relative', minHeight: 360 }}>
                  <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }}
                    src={featured.img} alt={featured.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,28,16,0.2), transparent)' }} />
                  <div style={{ position: 'absolute', top: 20, left: 20, background: catColors[featured.cat]?.bg, color: catColors[featured.cat]?.color, padding: '5px 14px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{featured.cat}</div>
                </div>
                <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFF8E1', color: '#C9A84C', padding: '5px 14px', borderRadius: 100, fontSize: 11, fontWeight: 700, marginBottom: 20, width: 'fit-content' }}>⭐ Featured</div>
                  <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(24px, 2.5vw, 36px)', color: '#0F1C10', lineHeight: 1.2, marginBottom: 16 }}>{featured.title}</h2>
                  <p style={{ color: '#516752', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{featured.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, color: '#8BA88B' }}>✍️ {featured.author}</span>
                    <span style={{ fontSize: 13, color: '#8BA88B' }}>📅 {featured.date}</span>
                    <span style={{ fontSize: 13, color: '#8BA88B' }}>⏱ {featured.readTime}</span>
                  </div>
                  <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#1B5E20,#2E7D32)', color: 'white', padding: '12px 24px', borderRadius: 100, border: 'none', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, width: 'fit-content' }}>
                    Read Article →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* FILTER + SEARCH */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActive(cat)}
                  style={{ padding: '8px 18px', borderRadius: 100, border: `2px solid ${active === cat ? '#2E7D32' : '#D4E8D4'}`, background: active === cat ? '#2E7D32' : 'white', color: active === cat ? 'white' : '#516752', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit', transition: 'all 0.2s' }}>
                  {cat}
                </button>
              ))}
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search articles..."
              style={{ padding: '9px 16px', border: '2px solid #D4E8D4', borderRadius: 100, fontFamily: 'Outfit', fontSize: 13, outline: 'none', width: 220, color: '#0F1C10' }}
              onFocus={e => e.target.style.borderColor = '#2E7D32'}
              onBlur={e => e.target.style.borderColor = '#D4E8D4'}
            />
          </div>

          {/* POSTS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {filtered.map((post, i) => {
              const cc = catColors[post.cat] || { bg: '#E8F5E9', color: '#2E7D32' };
              return (
                <motion.div key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  whileHover={{ y: -8 }}
                  style={{ borderRadius: 24, overflow: 'hidden', background: 'white', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                >
                  <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                    <motion.img whileHover={{ scale: 1.07 }} transition={{ duration: 0.6 }}
                      src={post.img} alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 14, left: 14, background: cc.bg, color: cc.color, padding: '4px 12px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.5px' }}>{post.cat}</div>
                  </div>
                  <div style={{ padding: '24px 24px 28px' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 21, color: '#0F1C10', lineHeight: 1.25, marginBottom: 10 }}>{post.title}</h3>
                    <p style={{ color: '#516752', fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>{post.excerpt.slice(0, 100)}...</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#8BA88B', borderTop: '1px solid #F0F7EE', paddingTop: 14 }}>
                      <span>{post.date}</span>
                      <span>⏱ {post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
              <p style={{ color: '#8BA88B' }}>No articles found. Try a different category or search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: '80px 40px', background: 'linear-gradient(135deg, #040D05, #0A2E0C)', position: 'relative', overflow: 'hidden' }}>
        <Particles count={15} color="rgba(201,168,76,0.2)" />
        <motion.div {...reveal()} style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px, 4vw, 48px)', color: 'white', marginBottom: 16 }}>
            Stay <em style={{ color: '#8BC34A' }}>Updated</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
            Get the latest organic certification news, regulatory updates, and expert tips delivered to your inbox.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <input placeholder="Enter your email address" style={{ flex: 1, padding: '14px 20px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'white', fontFamily: 'Outfit', fontSize: 14, outline: 'none' }} />
            <button style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: 'white', border: 'none', borderRadius: 100, fontFamily: 'Outfit', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(201,168,76,0.3)' }}>
              Subscribe →
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
