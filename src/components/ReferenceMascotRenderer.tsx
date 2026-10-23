import { motion, useTransform } from 'motion/react';
import { useState, type ReactNode } from 'react';
import type { MascotRendererProps, MascotState } from './DiloMascot';
import styles from './ReferenceMascotRenderer.module.css';

type ReferencePose = 'default' | 'password-hidden' | 'password-visible';

const MASCOT_CANVAS_SIZE = 1254;

/**
 * Safe travel was measured from the actual alpha bounds of each pupil and its
 * matching eye mask. The neutral pupils are intentionally not centered inside
 * both eyes, so the usable range is asymmetric; keeping that asymmetry avoids
 * showing a pupil over the snout or cutting it at an eye edge.
 */
export const pupilTravelPixels = {
  left: { x: { min: -16, max: 4 }, y: { min: -12, max: 5 } },
  right: { x: { min: -15, max: 15 }, y: { min: -10, max: 3 } },
} as const;

const poseForState: Record<MascotState, ReferencePose> = {
  idle: 'default',
  tracking: 'default',
  passwordHidden: 'password-hidden',
  passwordVisible: 'password-visible',
  success: 'default',
  error: 'default',
};

const poseAssets: Record<ReferencePose, { src: string; alt: string }> = {
  default: {
    src: '/assets/mascot/v2/head-base.png',
    alt: 'Dilo, um jacaré verde com um sorriso amigável',
  },
  'password-hidden': {
    src: '/assets/mascot/reference/dilo-senha-oculta.png',
    alt: 'Dilo cobrindo os olhos com as mãos',
  },
  'password-visible': {
    src: '/assets/mascot/reference/dilo-senha-visivel.png',
    alt: 'Dilo espiando discretamente entre os dedos',
  },
};

/**
 * Transitions the approved full-character reference poses. This renderer does
 * not claim independent eye or arm animation: those require the planned layer
 * package and can replace this component through DiloMascot's renderer prop.
 */
function EyeLayer({ side, pointer, reducedMotion, onAssetError }: {
  side: 'left' | 'right'; pointer: MascotRendererProps['pointer']; reducedMotion: boolean; onAssetError: () => void;
}) {
  const travel = pupilTravelPixels[side];
  const toPercent = (pixels: number) => `${(pixels / MASCOT_CANVAS_SIZE) * 100}%`;
  const x = useTransform(pointer.x, [-1, 0, 1], [toPercent(travel.x.min), '0%', toPercent(travel.x.max)]);
  const y = useTransform(pointer.y, [-1, 0, 1], [toPercent(travel.y.min), '0%', toPercent(travel.y.max)]);

  return <div className={side === 'left' ? styles.eyeMaskLeft : styles.eyeMaskRight} data-eye-layer={side}>
    <motion.img
      className={styles.pupil}
      src={`/assets/mascot/v2/pupil-${side}.png`}
      alt=""
      aria-hidden="true"
      draggable={false}
      onError={onAssetError}
      style={reducedMotion ? undefined : { x, y }}
    />
  </div>;
}

function LeftBrowLayer({ reducedMotion }: Pick<MascotRendererProps, 'reducedMotion'>) {
  return <motion.img
    className={styles.browLeft}
    data-brow-layer="left"
    src="/assets/mascot/v2/experimental/brow-left.png"
    alt=""
    aria-hidden="true"
    draggable={false}
    initial={false}
    animate={reducedMotion ? { y: 0 } : { y: [0, -1.2, 0] }}
    transition={reducedMotion ? { duration: 0 } : { duration: 0.7, repeat: Infinity, repeatDelay: 8.5, ease: [0.22, 1, 0.36, 1] }}
  />;
}

function LayeredDefaultPose({ pointer, reducedMotion, onAssetError }: Pick<MascotRendererProps, 'pointer' | 'reducedMotion'> & { onAssetError: () => void }) {
  return <>
    <img className={styles.image} src={poseAssets.default.src} alt={poseAssets.default.alt} draggable={false} loading="eager" onError={onAssetError} />
    <EyeLayer side="left" pointer={pointer} reducedMotion={reducedMotion} onAssetError={onAssetError} />
    <EyeLayer side="right" pointer={pointer} reducedMotion={reducedMotion} onAssetError={onAssetError} />
    <LeftBrowLayer reducedMotion={reducedMotion} />
  </>;
}

function PoseLayer({ pose, active, reducedMotion, children }: {
  pose: ReferencePose; active: boolean; reducedMotion: boolean; children: ReactNode;
}) {
  return <motion.div
    className={styles.poseLayer}
    data-pose-layer={pose}
    data-active={active}
    aria-hidden={!active}
    style={{ zIndex: active ? 2 : 1 }}
    initial={false}
    animate={{ opacity: active ? 1 : 0 }}
    transition={reducedMotion ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>;
}

export function ReferenceMascotRenderer({ state, pointer, reducedMotion }: MascotRendererProps) {
  const pose = poseForState[state];
  const isResting = !reducedMotion && (state === 'idle' || state === 'tracking');
  const [v2Available, setV2Available] = useState(true);
  const fallback = () => setV2Available(false);

  return <div className={styles.stage} data-reference-pose={pose} aria-live="polite">
    <motion.div
      className={styles.restMotion}
      animate={isResting ? { scale: [1, 1.003, 1], rotate: [0, -0.12, 0.08, 0] } : { scale: 1, rotate: 0 }}
      transition={reducedMotion ? { duration: 0 } : isResting
        ? { duration: 6.8, repeat: Infinity, ease: 'easeInOut' }
        : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
      <PoseLayer pose="default" active={pose === 'default'} reducedMotion={reducedMotion}>
        {v2Available
          ? <LayeredDefaultPose pointer={pointer} reducedMotion={reducedMotion} onAssetError={fallback} />
          : <img className={styles.image} src="/assets/mascot/reference/dilo-mascote-master-reference.png" alt={poseAssets.default.alt} draggable={false} loading="eager" />}
      </PoseLayer>
      <PoseLayer pose="password-hidden" active={pose === 'password-hidden'} reducedMotion={reducedMotion}>
        <img className={styles.image} src={poseAssets['password-hidden'].src} alt={poseAssets['password-hidden'].alt} draggable={false} loading="eager" />
      </PoseLayer>
      <PoseLayer pose="password-visible" active={pose === 'password-visible'} reducedMotion={reducedMotion}>
        <img className={styles.image} src={poseAssets['password-visible'].src} alt={poseAssets['password-visible'].alt} draggable={false} loading="eager" />
      </PoseLayer>
    </motion.div>
  </div>;
}
