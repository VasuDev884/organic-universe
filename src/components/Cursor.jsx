import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const rPos = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);

  useEffect(() => {
    // Enable custom cursor only on public site
    document.body.classList.add('custom-cursor-active');

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px';
        dot.current.style.top  = e.clientY + 'px';
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      rPos.current.x = lerp(rPos.current.x, pos.current.x, 0.12);
      rPos.current.y = lerp(rPos.current.y, pos.current.y, 0.12);
      if (ring.current) {
        ring.current.style.left = rPos.current.x + 'px';
        ring.current.style.top  = rPos.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };

    const over = (e) => {
      if (e.target.closest('a,button,[role="button"],.magnetic')) {
        ring.current?.classList.add('hovered');
      }
    };
    const out = () => ring.current?.classList.remove('hovered');

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    raf.current = requestAnimationFrame(animate);

    return () => {
      // Remove custom cursor when leaving public site
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
