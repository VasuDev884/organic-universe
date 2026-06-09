import { useEffect, useRef } from 'react';

export default function Particles({ count = 30, color = 'rgba(139,195,74,0.5)' }) {
  const canvas = useRef(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W = c.offsetWidth, H = c.offsetHeight;
    c.width = W; c.height = H;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      shape: Math.random() > 0.5 ? 'leaf' : 'circle',
    }));

    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = color;
        if (p.shape === 'leaf') {
          ctx.translate(p.x, p.y);
          ctx.rotate(Date.now() * 0.0005 + p.x);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 2, p.r, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
      });
      id = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      W = c.offsetWidth; H = c.offsetHeight;
      c.width = W; c.height = H;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, [count, color]);

  return <canvas ref={canvas} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
}
