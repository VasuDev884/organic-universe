import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FbIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const LiIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
const IgIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;

export default function Footer() {
  return (
    <footer style={{ background: '#040D05', color: 'rgba(255,255,255,0.7)', padding: '80px 40px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position:'absolute', top:-100, left:'20%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(46,125,50,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:-60, right:'10%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative' }}>

        {/* Main grid */}
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'1.4fr repeat(3,1fr)', gap:48, marginBottom:64 }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <img src="/logo.png" alt="Organic Universe" style={{ height:52, width:'auto', filter:'brightness(1.1)' }} />
              <div>
                <div style={{ fontFamily:'Cormorant Garamond', fontWeight:700, fontSize:18, color:'white' }}>Organic Universe</div>
                <div style={{ fontSize:9, color:'#8BC34A', letterSpacing:'2px', textTransform:'uppercase', fontWeight:700 }}>Consultancy</div>
              </div>
            </Link>
            <p style={{ fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,0.45)', marginBottom:24 }}>
              India's trusted organic certification consultancy since 2019. Helping businesses achieve global organic compliance with expertise and care.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              {[IgIcon, FbIcon, LiIcon].map((Icon,i) => (
                <motion.a key={i} href="#" whileHover={{ y:-3, background:'rgba(139,195,74,0.2)' }}
                  style={{ width:38, height:38, borderRadius:12, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.6)', transition:'all .3s' }}>
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <div style={{ color:'white', fontFamily:'Cormorant Garamond', fontSize:18, fontWeight:600, marginBottom:20 }}>Pages</div>
            {[['Home','/'],['About','/about'],['Services','/services'],['Certifications','/certifications'],['Gallery','/gallery'],['Blog','/blog'],['Success Stories','/success-stories'],['Contact','/contact']].map(([label,path]) => (
              <motion.div key={path} whileHover={{ x:4 }} transition={{ type:'spring', stiffness:400 }}>
                <Link to={path} style={{ display:'block', color:'rgba(255,255,255,0.4)', fontSize:13, marginBottom:8, transition:'color .2s' }}
                  onMouseEnter={e => e.target.style.color='#8BC34A'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.4)'}>
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Services */}
          <div>
            <div style={{ color:'white', fontFamily:'Cormorant Garamond', fontSize:18, fontWeight:600, marginBottom:20 }}>Services</div>
            {[['Organic Certification','#'],['Compliance Management','#'],['Food Processing','#'],['Legal Support','#'],['NPOP Certification','#'],['USDA NOP','#'],['EU Organic','#'],['PGS Certification','#']].map(([label,href]) => (
              <motion.div key={label} whileHover={{ x:4 }} transition={{ type:'spring', stiffness:400 }}>
                <a href={href} style={{ display:'block', color:'rgba(255,255,255,0.4)', fontSize:13, marginBottom:8, transition:'color .2s' }}
                  onMouseEnter={e => e.target.style.color='#8BC34A'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.4)'}>
                  {label}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ color:'white', fontFamily:'Cormorant Garamond', fontSize:18, fontWeight:600, marginBottom:20 }}>Contact</div>
            {[
              { icon:'📞', label:'+91 9736419705', href:'tel:+919736419705' },
              { icon:'✉️', label:'organicuniverse1@gmail.com', href:'mailto:organicuniverse1@gmail.com' },
              { icon:'📍', label:'India — Serving Nationally & Globally', href:'#' },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href}
                style={{ display:'flex', alignItems:'flex-start', gap:10, color:'rgba(255,255,255,0.45)', fontSize:13, marginBottom:14, lineHeight:1.5 }}
                onMouseEnter={e => e.currentTarget.style.color='#8BC34A'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.45)'}>
                <span style={{ flexShrink:0, marginTop:1 }}>{icon}</span>
                {label}
              </a>
            ))}
            <motion.a href="https://wa.me/919736419705" target="_blank" rel="noreferrer"
              whileHover={{ scale:1.04, boxShadow:'0 8px 28px rgba(37,211,102,0.35)' }}
              style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#25D366', color:'white', padding:'10px 20px', borderRadius:100, fontWeight:700, fontSize:13, marginTop:6, boxShadow:'0 4px 16px rgba(37,211,102,0.25)' }}>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={16}
                height={16}
              >
                <path
                  d="M20.52 3.48A11.949 11.949 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.005.524 3.945 1.52 5.64L0 24l6.36-1.52A11.949 11.949 0 0 0 12 24c6.627 0 12-5.373 12-12a11.949 11.949 0 0 0-3.48-8.52zM12 22c-2.005 0-3.945-.524-5.64-1.52L2 22l1.52-4.36A11.949 11.949 0 0 1 2 12c0-6.627 5 .373-12 12-12s12 5.373 12 12-5.373 12-12 12zm6.36-7.64c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16s-.82 1.02-1 1.23c-.18.21-.36.24-.67.08s-1.25-.46-2.38-1.47c-.88-.78-1.48-1.74-1.65-1.95s-.14-.32 0-.47c.14-.14.32-.36.48-.54s.21-.28.32-.46c.11-.18.05-.34 0-.48s-.71-1.7-1-2.33c-.26-.61-.52-.53-.71-.54l-.6-.01c-.18 0-.47.07-.72.34s-1 1-1 2.44 1.03 2.83 1.17 3c.14.18 2 .31 2.72.37s2 .06 2.74 0c.74-.06 1.88-.77 2.14-1.51s0-1.35-.21-1.51z"
                />
              </motion.svg> WhatsApp Us
            </motion.a>
          </div>
        </div>

        {/* Certifications strip */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'20px 0', marginBottom:28, display:'flex', gap:20, flexWrap:'wrap', justifyContent:'center' }}>
          {['NPOP','USDA NOP','EU Organic','KOR','PGS','Fairtrade','Demeter','Naturland','BioSuisse','KRAV','JAS'].map(c => (
            <span key={c} style={{ color:'rgba(255,255,255,0.3)', fontSize:11, fontWeight:700, letterSpacing:'1px' }}>{c}</span>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <p style={{ color:'rgba(255,255,255,0.2)', fontSize:12 }}>© 2024 Organic Universe Consultancy. All rights reserved.</p>
          <p style={{ color:'rgba(255,255,255,0.2)', fontSize:12 }}>Founded by <span style={{ color:'rgba(139,195,74,0.5)' }}>Gaurav Singh Chaudhary</span> · Est. 2019</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
