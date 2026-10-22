import { useEffect, useRef, useState, type ComponentType } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'motion/react';
import styles from './DiloMascot.module.css';

export type MascotState = 'idle' | 'tracking' | 'passwordHidden' | 'passwordVisible' | 'success' | 'error';
export type MascotRendererProps = {
  state: MascotState;
  /** Normalized, spring-smoothed coordinates. Use directly in motion styles. */
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  reducedMotion: boolean;
};

/** Static fallback preserves the original artwork. Facial animation requires a layered renderer. */
export function DiloMascot({ state = 'idle', renderer: Renderer }: { state?: MascotState; renderer?: ComponentType<MascotRendererProps> }) {
  const reducedMotion = !!useReducedMotion();
  const element = useRef<HTMLDivElement>(null);
  const [tracking, setTracking] = useState(false);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 90, damping: 24, restDelta: .001 });
  const y = useSpring(targetY, { stiffness: 90, damping: 24, restDelta: .001 });
  const mayTrack = state === 'idle' || state === 'tracking';

  useEffect(() => {
    const reset = () => { targetX.set(0); targetY.set(0); setTracking(false); };
    if (reducedMotion || !mayTrack) {
      reset();
      if (reducedMotion) { x.jump(0); y.jump(0); }
      return;
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !element.current) return;
      const rect = element.current.getBoundingClientRect();
      const clamp = (value: number) => Math.max(-1, Math.min(1, value));
      targetX.set(clamp((event.clientX - rect.left - rect.width / 2) / Math.max(window.innerWidth / 2, 1)));
      targetY.set(clamp((event.clientY - rect.top - rect.height / 2) / Math.max(window.innerHeight / 2, 1)));
      setTracking(true);
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };
    const visibility = () => { if (document.hidden) reset(); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', reset);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [mayTrack, reducedMotion, targetX, targetY, x, y]);

  const effectiveState = mayTrack && tracking ? 'tracking' : state;
  return <motion.div ref={element} className={styles.mascot} data-mascot-state={effectiveState}
    initial={reducedMotion ? false : { opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0, rotate: reducedMotion || Renderer ? 0 : state === 'error' ? 1.5 : 0 }}
    transition={{ duration: .3 }}>
    {Renderer ? <Renderer state={effectiveState} pointer={{ x, y }} reducedMotion={reducedMotion} /> :
      <img src="/assets/dilo-mascote-original.png" alt="Dilo, um jacaré verde com um sorriso amigável" width="210" height="194" draggable={false} />}
  </motion.div>;
}
