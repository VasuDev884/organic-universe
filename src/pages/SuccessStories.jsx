import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';

const reveal = (d = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: d },
});

const STORIES = [
  {
    id: 1,
    client: 'ITC Agribusiness Limited',
    industry: 'Agribusiness',
    icon: '🌾',
    color: '#1B5E20',
    bg: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)',
    challenge: 'ITC needed NPOP certification across multiple states for diverse crops including wheat, pulses, and spices — involving hundreds of farmers in 5 states.',
    solution: 'Organic Universe designed a multi-site Internal Control System (ICS), trained 12 field coordinators, and built a centralised documentation platform tailored to ITC\'s supply chain.',
    result: 'Successfully certified across 5 states. 600+ farmers brought under organic certification. Annual organic produce volume: 2,400 MT.',
    cert: 'NPOP',
    stats: [['600+', 'Farmers Certified'], ['5', 'States Covered'], ['2,400 MT', 'Annual Volume']],
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&q=80',
    year: '2021',
  },
  {
    id: 2,
    client: 'Body Cupid (WOW Skin Science)',
    industry: 'Cosmetics & Personal Care',
    icon: '✨',
    color: '#880E4F',
    bg: 'linear-gradient(135deg, #FCE4EC, #FFF3E0)',
    challenge: 'WOW Skin Science wanted to launch a certified organic skincare range for EU and US markets but had no prior organic certification experience.',
    solution: 'Organic Universe guided formulation reviews, ingredient verification, and simultaneously managed USDA NOP and EU Organic applications with the certifying body.',
    result: 'Dual certification achieved in 9 months. Organic range launched in 3 countries. 40% price premium on certified products.',
    cert: 'USDA NOP + EU Organic',
    stats: [['9 months', 'To Certification'], ['2', 'Standards Achieved'], ['40%', 'Price Premium']],
    img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700&q=80',
    year: '2022',
  },
  {
    id: 3,
    client: 'Planet Ayurveda',
    industry: 'Ayurveda & Herbal',
    icon: '🌿',
    color: '#1565C0',
    bg: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)',
    challenge: 'Planet Ayurveda required organic certification for their herb supply chain spanning 8 states, with complex multi-ingredient formulations needing individual ingredient verification.',
    solution: 'Comprehensive herb-by-herb traceability system, supplier audits across 8 states, and complete formula verification for 140+ SKUs.',
    result: 'All 140+ products certified. Export clearance to 40+ countries. Became one of India\'s first fully certified Ayurvedic brands.',
    cert: 'NPOP + EU Organic',
    stats: [['140+', 'SKUs Certified'], ['40+', 'Export Countries'], ['8', 'States Covered']],
    img: 'https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?w=700&q=80',
    year: '2020',
  },
  {
    id: 4,
    client: 'KRBL Limited',
    industry: 'Rice Processing & Export',
    icon: '🍚',
    color: '#E65100',
    bg: 'linear-gradient(135deg, #FFF8E1, #FFF3E0)',
    challenge: 'KRBL, India\'s largest basmati rice brand, required certification for their organic basmati line targeting premium export markets in Europe and North America.',
    solution: 'End-to-end supply chain mapping, farmer group certification in Punjab & Haryana, milling facility organic certification, and export documentation management.',
    result: 'Certified 1,200+ farmer families. Premium organic basmati now exports to 15 countries. 35% revenue increase on organic line.',
    cert: 'NPOP + USDA NOP',
    stats: [['1,200+', 'Farmer Families'], ['15', 'Export Markets'], ['35%', 'Revenue Increase']],
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=80',
    year: '2022',
  },
  {
    id: 5,
    client: 'Wild Himalayas',
    industry: 'Wild Harvest & Spices',
    icon: '🏔️',
    color: '#4A148C',
    bg: 'linear-gradient(135deg, #F3E5F5, #E8F5E9)',
    challenge: 'Wild Himalayas needed certification for wild-harvested herbs and spices from remote Himalayan regions — unique challenges with traceability and harvester documentation.',
    solution: 'Custom wild-harvest documentation system, GPS-mapped harvest zones, community harvester training, and a streamlined inspection protocol for remote sites.',
    result: 'First wild-harvest organic certification in the region. 300+ harvesters trained and registered. International buyers secured within 6 months.',
    cert: 'NPOP + EU Organic',
    stats: [['300+', 'Harvesters Registered'], ['First', 'Wild-Harvest Cert in Region'], ['6 months', 'To First Export'],],
    img: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=700&q=80',
    year: '2023',
  },
  {
    id: 6,
    client: 'Aimil Pharmaceuticals',
    industry: 'Pharmaceuticals & Nutraceuticals',
    icon: '💊',
    color: '#006064',
    bg: 'linear-gradient(135deg, #E0F7FA, #E8F5E9)',
    challenge: 'Aimil required USDA NOP certification for their nutraceutical range to enter the US health supplements market, with strict FDA compliance requirements alongside organic standards.',
    solution: 'Parallel compliance pathway — simultaneous USDA NOP organic and FDA cGMP alignment. Full ingredient sourcing audit and formula disclosure management.',
    result: 'USDA NOP certification achieved in 11 months. US market entry successful. $2M+ export contract secured in first year.',
    cert: 'USDA NOP',
    stats: [['11 months', 'To Certification'], ['$2M+', 'First Year Exports'], ['100%', 'FDA Compliance']],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80',
    year: '2023',
  },
];

export default function SuccessStories() {
  const [active, setActive] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', paddingTop: 160, paddingBottom: 120, overflow: 'hidden', background: '#040D05' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1560264280-88b68371db39?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,13,5,0.92) 0%, rgba(27,94,32,0.65) 100%)' }} />
        <Particles count={25} color="rgba(201,168,76,0.3)" />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#E8C96A', padding: '8px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8C96A', display: 'inline-block', boxShadow: '0 0 8px #E8C96A' }} />
              Success Stories
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(44px, 7vw, 96px)', color: 'white', lineHeight: 1, letterSpacing: '-1px', marginBottom: 24 }}>
              Real Results for<br /><em style={{ color: '#8BC34A' }}>Real</em> Businesses
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
              How we've helped India's leading brands achieve global organic certification and unlock new markets.
            </p>
          </motion.div>

          {/* Aggregate stats */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', marginTop: 60 }}>
            {[['50+', 'Clients Certified'], ['2,000+', 'Farmers Impacted'], ['15+', 'Export Markets Unlocked'], ['100%', 'Client Satisfaction']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 52, fontWeight: 700, color: '#8BC34A', lineHeight: 1 }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STORIES */}
      <section style={{ padding: '100px 40px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Case Studies</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 64px)', color: '#0F1C10' }}>
              Client <em>Success Stories</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gap: 32 }}>
            {STORIES.map((story, i) => (
              <motion.div key={story.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                style={{ borderRadius: 32, overflow: 'hidden', background: 'white', boxShadow: 'var(--shadow)', border: '1px solid #D4E8D4' }}
              >
                {/* Card header */}
                <div style={{ background: story.bg, padding: '36px 40px 0', display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ paddingBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 16, background: story.color + '20', border: `2px solid ${story.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                        {story.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontWeight: 700, color: '#0F1C10', lineHeight: 1.1 }}>{story.client}</div>
                        <div style={{ fontSize: 12, color: '#8BA88B', fontWeight: 600, marginTop: 3 }}>{story.industry} · {story.year}</div>
                      </div>
                    </div>
                    {/* Cert badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: story.color + '15', border: `1px solid ${story.color}30`, color: story.color, padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                      🏆 {story.cert}
                    </div>
                  </div>
                  {/* Stats */}
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end', paddingBottom: 32 }}>
                    {story.stats.map(([val, lbl]) => (
                      <div key={lbl} style={{ background: 'white', borderRadius: 16, padding: '14px 20px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', minWidth: 100 }}>
                        <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontWeight: 700, color: story.color, lineHeight: 1 }}>{val}</div>
                        <div style={{ fontSize: 11, color: '#8BA88B', marginTop: 4, fontWeight: 500 }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expandable body */}
                <div style={{ padding: '32px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
                  {[
                    { label: '🔴 Challenge', text: story.challenge, labelColor: '#EF4444' },
                    { label: '🟢 Solution',  text: story.solution,  labelColor: '#2E7D32' },
                    { label: '⭐ Result',    text: story.result,    labelColor: '#C9A84C' },
                  ].map(({ label, text, labelColor }) => (
                    <div key={label}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: labelColor, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 10 }}>{label}</div>
                      <p style={{ color: '#516752', fontSize: 14, lineHeight: 1.8 }}>{text}</p>
                    </div>
                  ))}
                </div>

                {/* Image strip */}
                <div style={{ height: 6, background: `linear-gradient(90deg, ${story.color}, ${story.color}60, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 40px', background: 'linear-gradient(135deg, #040D05, #0A2E0C)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <Particles count={25} color="rgba(201,168,76,0.2)" />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,125,50,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div {...reveal()} style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px, 5vw, 72px)', color: 'white', lineHeight: 1, marginBottom: 20 }}>
            Your Success Story<br /><em style={{ color: '#8BC34A' }}>Starts Here</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.8 }}>
            Join 50+ businesses that trusted Organic Universe to achieve global organic certification.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold">Start Your Journey →</Link>
            <a href="tel:+919736419705" className="btn-ghost">📞 +91 9736419705</a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
