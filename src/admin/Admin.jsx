import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  login as apiLogin, verifyToken,
  getContacts, getContactStats, updateContact, deleteContact,
  getServices, createService, updateService, deleteService,
  getAdminClients, createClient, updateClient, deleteClient,
} from '../lib/api';

/* ── SVG icon helper ──────────────────────────────────────────────────────── */
const Ic = ({ d, size = 18, fill = 'none', sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const D = {
  dash:    'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  leads:   'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  svc:     'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6',
  clients: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  logout:  'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  eye:     'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  trash:   'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  edit:    'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  plus:    'M12 5v14 M5 12h14',
  menu:    'M3 12h18 M3 6h18 M3 18h18',
  x:       'M18 6L6 18 M6 6l12 12',
  phone:   'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13 19.79 19.79 0 0 1 1.08 4.18 2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17l.92-.08z',
  mail:    'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  refresh: 'M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
};

const STATUS = {
  new:       { label:'New',       bg:'#EFF6FF', color:'#2563EB' },
  contacted: { label:'Contacted', bg:'#FFFBEB', color:'#D97706' },
  converted: { label:'Converted', bg:'#ECFDF5', color:'#059669' },
  closed:    { label:'Closed',    bg:'#F1F5F9', color:'#64748B' },
};

/* ── Shared small components ─────────────────────────────────────────────── */
const Pill = ({ status }) => {
  const s = STATUS[status] || STATUS.new;
  return <span style={{ background:s.bg, color:s.color, padding:'4px 12px', borderRadius:100, fontSize:11, fontWeight:700, textTransform:'capitalize', whiteSpace:'nowrap' }}>{s.label}</span>;
};

const StatCard = ({ icon, label, value, sub, color }) => (
  <div style={{ background:'white', borderRadius:20, padding:'24px 28px', boxShadow:'0 2px 12px rgba(0,0,0,0.05)', borderLeft:`4px solid ${color}`, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
    <div>
      <div style={{ fontSize:12, color:'#64748B', fontWeight:600, marginBottom:6, textTransform:'uppercase', letterSpacing:'0.5px' }}>{label}</div>
      <div style={{ fontFamily:'Cormorant Garamond', fontSize:40, fontWeight:700, color:'#0F1C10', lineHeight:1 }}>{value ?? '—'}</div>
      {sub && <div style={{ fontSize:12, color:'#10B981', marginTop:4, fontWeight:600 }}>{sub}</div>}
    </div>
    <div style={{ width:48, height:48, borderRadius:14, background:color+'1A', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{icon}</div>
  </div>
);

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale:0.88, opacity:0, y:30 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0.92, opacity:0 }}
        transition={{ type:'spring', stiffness:280, damping:25 }}
        style={{ background:'white', borderRadius:28, padding:'36px', width:'100%', maxWidth:wide?700:520, maxHeight:'90vh', overflow:'auto', boxShadow:'0 40px 100px rgba(0,0,0,0.25)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:26, color:'#0F1C10' }}>{title}</h3>
          <button onClick={onClose} style={{ width:36, height:36, borderRadius:10, background:'#F1F5F9', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#64748B' }}>
            <Ic d={D.x} size={16} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

function FInput({ label, value, onChange, type='text', required, placeholder, as, options }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#2E7D32', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.5px' }}>{label}{required && ' *'}</label>
      {as === 'textarea'
        ? <textarea value={value} onChange={onChange} rows={4} placeholder={placeholder}
            style={{ width:'100%', padding:'12px 14px', border:'2px solid #D4E8D4', borderRadius:12, fontFamily:'Outfit', fontSize:14, outline:'none', resize:'vertical', color:'#0F1C10', background:'#fff' }}
            onFocus={e=>e.target.style.borderColor='#2E7D32'} onBlur={e=>e.target.style.borderColor='#D4E8D4'} />
        : as === 'select'
        ? <select value={value} onChange={onChange}
            style={{ width:'100%', padding:'12px 14px', border:'2px solid #D4E8D4', borderRadius:12, fontFamily:'Outfit', fontSize:14, outline:'none', background:'white', color:'#0F1C10', cursor:'pointer' }}
            onFocus={e=>e.target.style.borderColor='#2E7D32'} onBlur={e=>e.target.style.borderColor='#D4E8D4'}>
            {(options||[]).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        : <input type={type} value={value} onChange={onChange} required={required} placeholder={placeholder}
            style={{ width:'100%', padding:'12px 14px', border:'2px solid #D4E8D4', borderRadius:12, fontFamily:'Outfit', fontSize:14, outline:'none', color:'#0F1C10', background:'#fff' }}
            onFocus={e=>e.target.style.borderColor='#2E7D32'} onBlur={e=>e.target.style.borderColor='#D4E8D4'} />
      }
    </div>
  );
}

/* ── LOGIN ───────────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault(); setLoading(true); setErr('');
    try {
      const data = await apiLogin(u, p);
      localStorage.setItem('ou_admin_token', data.token);
      onLogin(data.admin);
    } catch(er) { setErr(er.message || 'Invalid credentials. Try again'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#040D05 0%,#0A2E0C 50%,#040D05 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'Outfit', cursor:'auto' }}>
      <motion.div initial={{ scale:0.9, opacity:0, y:30 }} animate={{ scale:1, opacity:1, y:0 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
        style={{ background:'white', borderRadius:32, padding:'52px 44px', width:'100%', maxWidth:420, boxShadow:'0 40px 100px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <img src="/logo.png" alt="Organic Universe" style={{ height:72, width:'auto', margin:'0 auto 16px' }} />
          <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:28, color:'#0F1C10', marginBottom:4 }}>Admin Panel</h2>
          <p style={{ color:'#8BA88B', fontSize:13 }}>Organic Universe Consultancy</p>
        </div>
        <form onSubmit={handle}>
          <FInput label="Username" value={u} onChange={e=>setU(e.target.value)} required placeholder="admin" />
          <FInput label="Password" type="password" value={p} onChange={e=>setP(e.target.value)} required placeholder="••••••••" />
          {err && <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
            style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:10, padding:'10px 14px', marginBottom:16, color:'#DC2626', fontSize:13 }}>
            ⚠️ {err}</motion.div>}
          <motion.button type="submit" disabled={loading} whileHover={!loading?{scale:1.02}:{}} whileTap={!loading?{scale:0.98}:{}}
            style={{ width:'100%', padding:'16px', background:loading?'#8BC34A':'linear-gradient(135deg,#1B5E20,#2E7D32)', color:'white', border:'none', borderRadius:100, fontFamily:'Outfit', fontWeight:700, fontSize:15, cursor:loading?'wait':'pointer', boxShadow:'0 8px 24px rgba(46,125,50,0.3)' }}>
            {loading ? '⏳ Logging in...' : '🔐 Login to Dashboard'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

/* ── DASHBOARD ───────────────────────────────────────────────────────────── */
function Dashboard({ stats, leads }) {
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:28 }}>
        <StatCard icon="📩" label="Total Leads"  value={stats?.total}     sub={`${stats?.todayCount||0} today`}     color="#3B82F6" />
        <StatCard icon="🆕" label="New Leads"    value={stats?.newLeads}  sub="Awaiting contact"                     color="#F59E0B" />
        <StatCard icon="✅" label="Converted"    value={stats?.converted} sub="Successful clients"                   color="#10B981" />
        <StatCard icon="📞" label="Contacted"    value={stats?.contacted} sub="In progress"                          color="#8B5CF6" />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:20 }}>
        <div style={{ background:'white', borderRadius:20, padding:'28px', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:22, color:'#0F1C10', marginBottom:20 }}>Recent Leads</h3>
          {leads.length === 0 && <p style={{ color:'#8BA88B', fontSize:14, padding:'20px 0', textAlign:'center' }}>No leads yet. They'll appear when someone submits the contact form.</p>}
          {leads.slice(0,6).map(lead => (
            <div key={lead._id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid #F0F7EE' }}>
              <div style={{ width:38, height:38, borderRadius:11, background:'#E8F5E9', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Cormorant Garamond', fontWeight:700, color:'#2E7D32', fontSize:15, flexShrink:0 }}>
                {lead.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:600, fontSize:14, color:'#0F1C10', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{lead.name}</div>
                <div style={{ fontSize:12, color:'#8BA88B', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{lead.service}</div>
              </div>
              <Pill status={lead.status} />
            </div>
          ))}
        </div>
        <div style={{ background:'white', borderRadius:20, padding:'28px', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:22, color:'#0F1C10', marginBottom:20 }}>By Service</h3>
          {(stats?.byService||[]).slice(0,6).map(({ _id, count }) => (
            <div key={_id} style={{ marginBottom:18 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5, fontSize:13 }}>
                <span style={{ color:'#0F1C10', fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'80%' }}>{_id}</span>
                <span style={{ color:'#2E7D32', fontWeight:700, flexShrink:0 }}>{count}</span>
              </div>
              <div style={{ height:6, background:'#F0F7EE', borderRadius:3 }}>
                <motion.div initial={{ width:0 }} animate={{ width:`${Math.min((count/(stats.total||1))*100,100)}%` }} transition={{ duration:1, ease:[0.22,1,0.36,1] }}
                  style={{ height:'100%', background:'linear-gradient(90deg,#2E7D32,#8BC34A)', borderRadius:3 }} />
              </div>
            </div>
          ))}
          {(stats?.byService||[]).length===0 && <p style={{ color:'#8BA88B', fontSize:14 }}>Submit inquiries to see stats.</p>}
        </div>
      </div>
    </div>
  );
}

/* ── LEADS ───────────────────────────────────────────────────────────────── */
function LeadsPage({ leads, onRefresh, loading }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [viewLead, setViewLead] = useState(null);
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(null);

  const filtered = leads.filter(l => {
    if (filter !== 'all' && l.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return l.name?.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.service?.toLowerCase().includes(q);
    }
    return true;
  });

  const handleStatus = async (id, status) => {
    setUpdating(id);
    try { await updateContact(id, { status }); onRefresh(); }
    catch(e) { alert('Update failed: ' + e.message); }
    finally { setUpdating(null); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this lead permanently?')) return;
    try { await deleteContact(id); onRefresh(); }
    catch(e) { alert('Delete failed: ' + e.message); }
  };

  const saveNotes = async () => {
    if (!viewLead) return;
    try { await updateContact(viewLead._id, { notes }); onRefresh(); setViewLead(prev=>({...prev,notes})); }
    catch(e) { alert(e.message); }
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
        {['all','new','contacted','converted','closed'].map(s => (
          <button key={s} onClick={()=>setFilter(s)}
            style={{ padding:'8px 16px', borderRadius:100, border:`2px solid ${filter===s?'#2E7D32':'#D4E8D4'}`, background:filter===s?'#2E7D32':'white', color:filter===s?'white':'#516752', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'Outfit', transition:'all .2s', textTransform:'capitalize' }}>
            {s==='all'?`All (${leads.length})`:`${STATUS[s]?.label} (${leads.filter(l=>l.status===s).length})`}
          </button>
        ))}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search..."
          style={{ marginLeft:'auto', padding:'9px 14px', border:'2px solid #D4E8D4', borderRadius:100, fontFamily:'Outfit', fontSize:13, outline:'none', width:200, color:'#0F1C10' }}
          onFocus={e=>e.target.style.borderColor='#2E7D32'} onBlur={e=>e.target.style.borderColor='#D4E8D4'} />
        <button onClick={onRefresh} style={{ padding:'9px 14px', borderRadius:100, border:'2px solid #D4E8D4', background:'white', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#516752', fontFamily:'Outfit' }}>
          <Ic d={D.refresh} size={13} /> Refresh
        </button>
      </div>

      {loading && <div style={{ textAlign:'center', padding:60, color:'#8BA88B' }}>Loading leads...</div>}

      {!loading && filtered.length===0 && (
        <div style={{ textAlign:'center', padding:'60px 20px', background:'white', borderRadius:20 }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
          <p style={{ color:'#8BA88B', fontSize:15 }}>No leads found. {search ? 'Try different search.' : 'Leads appear when someone submits the contact form.'}</p>
        </div>
      )}

      <div style={{ display:'grid', gap:10 }}>
        {filtered.map(lead => (
          <motion.div key={lead._id} layout initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            style={{ background:'white', borderRadius:18, padding:'18px 22px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:14, flexWrap:'wrap', borderLeft:`3px solid ${STATUS[lead.status]?.color||'#D4E8D4'}` }}>
            <div style={{ width:44, height:44, borderRadius:12, background:'#E8F5E9', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Cormorant Garamond', fontWeight:700, color:'#2E7D32', fontSize:18, flexShrink:0 }}>
              {lead.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ flex:1, minWidth:160 }}>
              <div style={{ fontWeight:600, fontSize:15, color:'#0F1C10' }}>{lead.name}</div>
              <div style={{ fontSize:12, color:'#8BA88B' }}>{lead.company ? `${lead.company} · ` : ''}{lead.service}</div>
              <div style={{ fontSize:11, color:'#B0C4B0', marginTop:2 }}>{new Date(lead.createdAt).toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
            </div>
            <Pill status={lead.status} />
            <select value={lead.status} onChange={e=>handleStatus(lead._id,e.target.value)} disabled={updating===lead._id}
              style={{ border:'2px solid #D4E8D4', borderRadius:10, padding:'7px 10px', fontSize:12, fontFamily:'Outfit', cursor:'pointer', background:'white', color:'#0F1C10', outline:'none' }}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
            <div style={{ display:'flex', gap:6 }}>
              <button onClick={()=>{ setViewLead(lead); setNotes(lead.notes||''); }} style={{ width:34, height:34, borderRadius:9, background:'#E8F5E9', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#2E7D32' }}><Ic d={D.eye} size={15} /></button>
              <a href={`tel:${lead.phone}`} style={{ width:34, height:34, borderRadius:9, background:'#E3F2FD', display:'flex', alignItems:'center', justifyContent:'center', color:'#1976D2' }}><Ic d={D.phone} size={15} /></a>
              <a href={`mailto:${lead.email}`} style={{ width:34, height:34, borderRadius:9, background:'#F3E5F5', display:'flex', alignItems:'center', justifyContent:'center', color:'#7B1FA2' }}><Ic d={D.mail} size={15} /></a>
              <button onClick={()=>handleDelete(lead._id)} style={{ width:34, height:34, borderRadius:9, background:'#FEF2F2', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#EF4444' }}><Ic d={D.trash} size={15} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {viewLead && (
          <Modal title="Lead Details" onClose={()=>setViewLead(null)} wide>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px 24px', marginBottom:20 }}>
              {[['Name',viewLead.name],['Company',viewLead.company||'—'],['Phone',viewLead.phone],['Email',viewLead.email],['Service',viewLead.service],['Submitted',new Date(viewLead.createdAt).toLocaleString('en-IN')]].map(([k,v])=>(
                <div key={k} style={{ paddingBottom:12 }}>
                  <div style={{ fontSize:10, color:'#8BC34A', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:4 }}>{k}</div>
                  <div style={{ fontSize:14, color:'#0F1C10', fontWeight:500, wordBreak:'break-word' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:10, color:'#8BC34A', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8 }}>Message</div>
              <div style={{ background:'#F7FAF5', borderRadius:14, padding:'14px 16px', fontSize:14, color:'#0F1C10', lineHeight:1.7, border:'1px solid #D4E8D4' }}>{viewLead.message}</div>
            </div>
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:10, color:'#8BC34A', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8 }}>Admin Notes</div>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Add private notes..."
                style={{ width:'100%', padding:'12px 14px', border:'2px solid #D4E8D4', borderRadius:12, fontFamily:'Outfit', fontSize:14, outline:'none', resize:'vertical', color:'#0F1C10' }}
                onFocus={e=>e.target.style.borderColor='#2E7D32'} onBlur={e=>e.target.style.borderColor='#D4E8D4'} />
              <button onClick={saveNotes} style={{ marginTop:8, padding:'8px 18px', background:'#E8F5E9', border:'none', borderRadius:8, color:'#2E7D32', fontFamily:'Outfit', fontWeight:600, fontSize:13, cursor:'pointer' }}>Save Notes</button>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <a href={`tel:${viewLead.phone}`} style={{ flex:1, textAlign:'center', background:'linear-gradient(135deg,#1B5E20,#2E7D32)', color:'white', padding:'13px', borderRadius:14, fontWeight:600, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}><Ic d={D.phone} size={15}/> Call</a>
              <a href={`mailto:${viewLead.email}`} style={{ flex:1, textAlign:'center', background:'#E8F5E9', color:'#2E7D32', padding:'13px', borderRadius:14, fontWeight:600, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}><Ic d={D.mail} size={15}/> Email</a>
              <a href={`https://wa.me/91${viewLead.phone}`} target="_blank" rel="noreferrer" style={{ flex:1, textAlign:'center', background:'#25D366', color:'white', padding:'13px', borderRadius:14, fontWeight:600, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>💬 WhatsApp</a>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── SERVICES ────────────────────────────────────────────────────────────── */
function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title:'', desc:'', status:'active' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try { setServices((await getServices())||[]); }
    catch { setServices([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(()=>{ load(); },[load]);

  const openAdd = () => { setEditing(null); setForm({title:'',desc:'',status:'active'}); setErr(''); setShowModal(true); };
  const openEdit = s => { setEditing(s); setForm({title:s.title,desc:s.desc,status:s.status}); setErr(''); setShowModal(true); };

  const handleSave = async () => {
    if (!form.title.trim()) { setErr('Title is required'); return; }
    setSaving(true); setErr('');
    try {
      if (editing) await updateService(editing._id, form);
      else await createService(form);
      await load(); setShowModal(false);
    } catch(e) { setErr(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this service?')) return;
    try { await deleteService(id); await load(); }
    catch(e) { alert(e.message); }
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
        <button onClick={openAdd} style={{ display:'flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#1B5E20,#2E7D32)', color:'white', border:'none', borderRadius:100, padding:'11px 22px', cursor:'pointer', fontFamily:'Outfit', fontWeight:600, fontSize:14, boxShadow:'0 4px 16px rgba(46,125,50,0.25)' }}>
          <Ic d={D.plus} size={16} /> Add Service
        </button>
      </div>
      {loading && <div style={{ textAlign:'center', padding:40, color:'#8BA88B' }}>Loading...</div>}
      <div style={{ display:'grid', gap:12 }}>
        {services.map(s => (
          <motion.div key={s._id} layout initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
            style={{ background:'white', borderRadius:18, padding:'20px 24px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
            <div style={{ width:48, height:48, borderRadius:14, background:'#E8F5E9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>🌿</div>
            <div style={{ flex:1, minWidth:160 }}>
              <div style={{ fontWeight:700, fontSize:16, color:'#0F1C10' }}>{s.title}</div>
              <div style={{ fontSize:13, color:'#8BA88B', marginTop:2 }}>{s.desc}</div>
            </div>
            <div style={{ textAlign:'center', padding:'0 16px' }}>
              <div style={{ fontFamily:'Cormorant Garamond', fontSize:32, fontWeight:700, color:'#2E7D32', lineHeight:1 }}>{s.inquiries}</div>
              <div style={{ fontSize:10, color:'#8BA88B', textTransform:'uppercase', letterSpacing:'0.5px' }}>Inquiries</div>
            </div>
            <span style={{ background:s.status==='active'?'#ECFDF5':'#F1F5F9', color:s.status==='active'?'#059669':'#64748B', padding:'4px 14px', borderRadius:100, fontSize:11, fontWeight:700 }}>{s.status}</span>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={()=>openEdit(s)} style={{ width:34, height:34, borderRadius:10, background:'#E8F5E9', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#2E7D32' }}><Ic d={D.edit} size={15} /></button>
              <button onClick={()=>handleDelete(s._id)} style={{ width:34, height:34, borderRadius:10, background:'#FEF2F2', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#EF4444' }}><Ic d={D.trash} size={15} /></button>
            </div>
          </motion.div>
        ))}
        {!loading && services.length===0 && (
          <div style={{ textAlign:'center', padding:'50px 20px', background:'white', borderRadius:20 }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📋</div>
            <p style={{ color:'#8BA88B' }}>No services yet. Add your first service.</p>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showModal && (
          <Modal title={editing?'Edit Service':'Add Service'} onClose={()=>setShowModal(false)}>
            <FInput label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required placeholder="e.g. Organic Certification" />
            <FInput label="Description" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Brief description..." as="textarea" />
            <FInput label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})} as="select" options={['active','inactive']} />
            {err && <p style={{ color:'#DC2626', fontSize:13, marginBottom:12 }}>⚠️ {err}</p>}
            <button onClick={handleSave} disabled={saving}
              style={{ width:'100%', padding:'15px', background:saving?'#8BC34A':'linear-gradient(135deg,#1B5E20,#2E7D32)', color:'white', border:'none', borderRadius:100, fontFamily:'Outfit', fontWeight:700, fontSize:15, cursor:saving?'wait':'pointer' }}>
              {saving ? '⏳ Saving...' : (editing ? '✅ Save Changes' : '✅ Add Service')}
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── CLIENTS ADMIN ───────────────────────────────────────────────────────── */
function ClientsAdmin() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:'', industry:'', since:'', status:'active' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try { setClients((await getAdminClients())||[]); }
    catch { setClients([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(()=>{ load(); },[load]);

  const openAdd = () => { setEditing(null); setForm({name:'',industry:'',since:'',status:'active'}); setErr(''); setShowModal(true); };
  const openEdit = c => { setEditing(c); setForm({name:c.name,industry:c.industry,since:c.since,status:c.status}); setErr(''); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { setErr('Name is required'); return; }
    setSaving(true); setErr('');
    try {
      if (editing) await updateClient(editing._id, form);
      else await createClient(form);
      await load(); setShowModal(false);
    } catch(e) { setErr(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!confirm('Remove this client?')) return;
    try { await deleteClient(id); await load(); }
    catch(e) { alert(e.message); }
  };

  const PALETTE = ['#1B5E20','#1565C0','#6A1B9A','#BF360C','#E65100','#0D47A1','#880E4F','#004D40'];
  const getColor = name => PALETTE[name.charCodeAt(0) % PALETTE.length];
  const getInitials = name => name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div style={{ fontSize:14, color:'#8BA88B' }}>{clients.length} clients in database</div>
        <button onClick={openAdd} style={{ display:'flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#1B5E20,#2E7D32)', color:'white', border:'none', borderRadius:100, padding:'11px 22px', cursor:'pointer', fontFamily:'Outfit', fontWeight:600, fontSize:14, boxShadow:'0 4px 16px rgba(46,125,50,0.25)' }}>
          <Ic d={D.plus} size={16} /> Add Client
        </button>
      </div>

      {loading && <div style={{ textAlign:'center', padding:40, color:'#8BA88B' }}>Loading...</div>}

      <div style={{ background:'white', borderRadius:20, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
        {clients.length > 0 && (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#F8FBF8', borderBottom:'1px solid #E8F5E9' }}>
                {['Client','Industry','Since','Status','Actions'].map(h=>(
                  <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontSize:11, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c._id} style={{ borderBottom:'1px solid #F1F5F9' }}>
                  <td style={{ padding:'14px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:getColor(c.name)+'18', border:`2px solid ${getColor(c.name)}28`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:getColor(c.name), fontSize:12, fontFamily:'Cormorant Garamond', flexShrink:0 }}>
                        {getInitials(c.name)}
                      </div>
                      <span style={{ fontWeight:600, fontSize:14, color:'#0F1C10' }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:'14px 20px', color:'#8BA88B', fontSize:13 }}>{c.industry||'—'}</td>
                  <td style={{ padding:'14px 20px', color:'#8BA88B', fontSize:13 }}>{c.since||'—'}</td>
                  <td style={{ padding:'14px 20px' }}>
                    <span style={{ background:c.status==='active'?'#ECFDF5':'#F1F5F9', color:c.status==='active'?'#059669':'#64748B', padding:'4px 12px', borderRadius:100, fontSize:11, fontWeight:700 }}>{c.status}</span>
                  </td>
                  <td style={{ padding:'14px 20px' }}>
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={()=>openEdit(c)} style={{ width:32, height:32, borderRadius:8, background:'#E8F5E9', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#2E7D32' }}><Ic d={D.edit} size={14} /></button>
                      <button onClick={()=>handleDelete(c._id)} style={{ width:32, height:32, borderRadius:8, background:'#FEF2F2', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#EF4444' }}><Ic d={D.trash} size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && clients.length===0 && (
          <div style={{ textAlign:'center', padding:'50px 20px' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>👥</div>
            <p style={{ color:'#8BA88B', fontSize:15 }}>No clients yet. Add your first client to track your portfolio.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal title={editing?'Edit Client':'Add Client'} onClose={()=>setShowModal(false)}>
            <FInput label="Client Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="e.g. ITC Agribusiness" />
            <FInput label="Industry" value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})} placeholder="e.g. Agribusiness" />
            <FInput label="Client Since (Year)" value={form.since} onChange={e=>setForm({...form,since:e.target.value})} placeholder="e.g. 2021" />
            <FInput label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})} as="select" options={['active','inactive']} />
            {err && <p style={{ color:'#DC2626', fontSize:13, marginBottom:12 }}>⚠️ {err}</p>}
            <button onClick={handleSave} disabled={saving}
              style={{ width:'100%', padding:'15px', background:saving?'#8BC34A':'linear-gradient(135deg,#1B5E20,#2E7D32)', color:'white', border:'none', borderRadius:100, fontFamily:'Outfit', fontWeight:700, fontSize:15, cursor:saving?'wait':'pointer' }}>
              {saving ? '⏳ Saving...' : (editing?'✅ Save Changes':'✅ Add Client')}
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── SETTINGS ────────────────────────────────────────────────────────────── */
function SettingsPage({ admin }) {
  return (
    <div style={{ maxWidth:600 }}>
      <div style={{ background:'white', borderRadius:24, padding:'32px', boxShadow:'0 2px 10px rgba(0,0,0,0.05)', marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28, paddingBottom:24, borderBottom:'1px solid #F0F7EE' }}>
          <div style={{ width:56, height:56, borderRadius:16, background:'linear-gradient(135deg,#1B5E20,#8BC34A)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>👤</div>
          <div>
            <div style={{ fontFamily:'Cormorant Garamond', fontSize:22, fontWeight:700, color:'#0F1C10' }}>{admin?.username||'Admin'}</div>
            <div style={{ fontSize:12, color:'#8BC34A', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px' }}>Administrator</div>
          </div>
        </div>
        <h4 style={{ fontFamily:'Cormorant Garamond', fontSize:20, marginBottom:20, color:'#0F1C10' }}>Company Information</h4>
        {[['Company Name','Organic Universe Consultancy'],['Founder','Gaurav Singh Chaudhary'],['Phone','+91 9736419705'],['Email','organicuniverse1@gmail.com'],['Founded','2019'],['Location','India']].map(([label,val])=>(
          <div key={label} style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#8BC34A', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.5px' }}>{label}</label>
            <input defaultValue={val} style={{ width:'100%', padding:'11px 14px', border:'2px solid #D4E8D4', borderRadius:12, fontFamily:'Outfit', fontSize:14, outline:'none', color:'#0F1C10', background:'#fff' }}
              onFocus={e=>e.target.style.borderColor='#2E7D32'} onBlur={e=>e.target.style.borderColor='#D4E8D4'} />
          </div>
        ))}
        <button style={{ background:'linear-gradient(135deg,#1B5E20,#2E7D32)', color:'white', padding:'12px 28px', border:'none', borderRadius:100, cursor:'pointer', fontFamily:'Outfit', fontWeight:600, marginTop:8, boxShadow:'0 4px 16px rgba(46,125,50,0.25)' }}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

/* ── MAIN ADMIN APP ──────────────────────────────────────────────────────── */
export default function Admin() {
  const [adminUser, setAdminUser] = useState(null);
  const [checking, setChecking]   = useState(true);
  const [page, setPage]           = useState('dashboard');
  const [sidebarOpen, setSidebar] = useState(true);
  const [leads, setLeads]         = useState([]);
  const [stats, setStats]         = useState(null);
  const [leadsLoading, setLLdr]   = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ou_admin_token');
    if (!token) { setChecking(false); return; }
    verifyToken()
      .then(d => { if (d.valid) setAdminUser(d.admin); })
      .catch(() => localStorage.removeItem('ou_admin_token'))
      .finally(() => setChecking(false));
  }, []);

  const loadLeads = useCallback(async () => {
    setLLdr(true);
    try {
      const [ld, st] = await Promise.all([getContacts({ limit:200 }), getContactStats()]);
      setLeads(ld.contacts||[]); setStats(st);
    } catch { setLeads([]); setStats(null); }
    finally { setLLdr(false); }
  }, []);

  useEffect(() => { if (adminUser) loadLeads(); }, [adminUser, loadLeads]);

  const handleLogout = () => {
    localStorage.removeItem('ou_admin_token');
    setAdminUser(null); setLeads([]); setStats(null);
  };

  if (checking) return (
    <div style={{ minHeight:'100vh', background:'#040D05', display:'flex', alignItems:'center', justifyContent:'center', cursor:'auto' }}>
      <motion.img src="/logo.png" alt="Logo" animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.5, repeat:Infinity }} style={{ height:64 }} />
    </div>
  );

  if (!adminUser) return <LoginScreen onLogin={setAdminUser} />;

  const NAV = [
    { id:'dashboard', label:'Dashboard',  icon:D.dash,    badge:0 },
    { id:'leads',     label:'Leads',      icon:D.leads,   badge:stats?.newLeads||0 },
    { id:'clients',   label:'Clients',    icon:D.clients, badge:0 },
    { id:'services',  label:'Services',   icon:D.svc,     badge:0 },
    { id:'settings',  label:'Settings',   icon:D.settings,badge:0 },
  ];

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F7FAF5', fontFamily:'Outfit', cursor:'auto' }}>
      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside initial={{ x:-280 }} animate={{ x:0 }} exit={{ x:-280 }} transition={{ type:'spring', stiffness:300, damping:30 }}
            style={{ width:250, background:'#040D05', position:'fixed', top:0, left:0, bottom:0, zIndex:100, display:'flex', flexDirection:'column', padding:'20px 14px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:36, padding:'0 6px' }}>
              <img src="/logo.png" alt="Logo" style={{ height:42, width:'auto' }} />
              <div>
                <div style={{ fontFamily:'Cormorant Garamond', fontWeight:700, fontSize:14, color:'white', lineHeight:1 }}>Admin Panel</div>
                <div style={{ fontSize:9, color:'#8BC34A', letterSpacing:'1.5px', textTransform:'uppercase' }}>Organic Universe</div>
              </div>
            </div>
            <nav style={{ flex:1 }}>
              {NAV.map(({ id, label, icon, badge }) => (
                <motion.button key={id} onClick={()=>setPage(id)} whileHover={{ x:3 }}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'11px 14px', borderRadius:13, marginBottom:3, border:'none', cursor:'pointer', textAlign:'left', background:page===id?'rgba(139,195,74,0.15)':'transparent', color:page===id?'#8BC34A':'rgba(255,255,255,0.5)', fontFamily:'Outfit', fontSize:14, fontWeight:page===id?600:400, transition:'all .2s' }}>
                  <Ic d={icon} size={17} />
                  {label}
                  {badge>0 && <motion.span initial={{ scale:0 }} animate={{ scale:1 }} style={{ marginLeft:'auto', background:'#EF4444', color:'white', borderRadius:20, padding:'2px 7px', fontSize:10, fontWeight:700 }}>{badge}</motion.span>}
                </motion.button>
              ))}
            </nav>
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:14 }}>
              <div style={{ padding:'8px 14px', marginBottom:8 }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginBottom:1 }}>Logged in as</div>
                <div style={{ fontSize:13, color:'white', fontWeight:600 }}>{adminUser?.username}</div>
              </div>
              <button onClick={handleLogout} style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 14px', border:'none', background:'rgba(239,68,68,0.1)', borderRadius:12, color:'#F87171', cursor:'pointer', fontFamily:'Outfit', fontSize:13 }}>
                <Ic d={D.logout} size={15} /> Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <main style={{ flex:1, marginLeft:sidebarOpen?250:0, transition:'margin .3s', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        {/* TOP BAR */}
        <div style={{ background:'white', padding:'0 28px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #E8F5E9', position:'sticky', top:0, zIndex:50, height:64, boxShadow:'0 2px 8px rgba(46,125,50,0.04)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <button onClick={()=>setSidebar(!sidebarOpen)} style={{ width:36, height:36, borderRadius:10, background:'#F7FAF5', border:'1px solid #D4E8D4', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#516752' }}>
              <Ic d={D.menu} size={17} />
            </button>
            <h1 style={{ fontFamily:'Cormorant Garamond', fontSize:24, color:'#0F1C10', fontWeight:700 }}>
              {NAV.find(n=>n.id===page)?.label}
            </h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button onClick={loadLeads} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', border:'1px solid #D4E8D4', borderRadius:100, background:'white', cursor:'pointer', fontSize:12, color:'#516752', fontFamily:'Outfit' }}>
              <Ic d={D.refresh} size={12} /> Refresh
            </button>
            <div style={{ fontSize:13, color:'#8BA88B', display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#1B5E20,#8BC34A)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:14, fontFamily:'Cormorant Garamond' }}>
                {adminUser?.username?.[0]?.toUpperCase()}
              </div>
              <span className="hide-md">{adminUser?.username}</span>
            </div>
          </div>
        </div>

        {/* PAGE */}
        <div style={{ padding:28, flex:1 }}>
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.22 }}>
              {page==='dashboard' && <Dashboard stats={stats} leads={leads} />}
              {page==='leads'     && <LeadsPage leads={leads} onRefresh={loadLeads} loading={leadsLoading} />}
              {page==='clients'   && <ClientsAdmin />}
              {page==='services'  && <ServicesPage />}
              {page==='settings'  && <SettingsPage admin={adminUser} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style>{`
        /* Admin panel — always use normal system cursor */
        * { cursor: auto !important; }
        button, a, select, input, textarea, [role="button"] { cursor: pointer !important; }
        input[type="text"], input[type="email"], input[type="password"],
        input[type="tel"], textarea { cursor: text !important; }
        input[type="number"] { cursor: auto !important; }
        [disabled], [aria-disabled="true"] { cursor: not-allowed !important; }
        select { cursor: pointer !important; }
        @media (max-width: 640px) {
          main { margin-left: 0 !important; }
          .hide-md { display: none; }
        }
      `}</style>
    </div>
  );
}
