import type { ComponentType } from 'react';
import type { MascotRendererProps, MascotState } from './DiloMascot';

export const mascotLayerIds = [
  'arm-left',
  'arm-right',
  'head-base',
  'eye-left',
  'eye-right',
  'pupil-left',
  'pupil-right',
  'eyelid-left',
  'eyelid-right',
  'hand-shadow',
  'hand-left',
  'hand-right',
] as const;

export type MascotLayerId = (typeof mascotLayerIds)[number];
export type LayeredMascotStateRequirements = Record<MascotState, readonly MascotLayerId[]>;

/** Keeps future artwork requirements aligned with the states DiloMascot already emits. */
export const layeredStateRequirements: LayeredMascotStateRequirements = {
  idle: ['head-base', 'eye-left', 'eye-right', 'pupil-left', 'pupil-right'],
  tracking: ['head-base', 'eye-left', 'eye-right', 'pupil-left', 'pupil-right'],
  passwordHidden: ['head-base', 'hand-shadow', 'hand-left', 'hand-right'],
  passwordVisible: ['head-base', 'eye-left', 'pupil-left', 'hand-shadow', 'hand-left', 'hand-right'],
  success: ['head-base', 'eye-left', 'eye-right', 'pupil-left', 'pupil-right'],
  error: ['head-base', 'eye-left', 'eye-right', 'pupil-left', 'pupil-right'],
};

export type LayeredMascotRendererOptions = {
  assetBaseUrl: string;
  manifestUrl: string;
};

/**
 * A future factory returns a component assignable to DiloMascot's existing
 * `renderer` prop. It must honor MotionValues and reduced-motion itself.
 */
export type LayeredMascotRendererFactory = (
  options: LayeredMascotRendererOptions,
) => ComponentType<MascotRendererProps>;
