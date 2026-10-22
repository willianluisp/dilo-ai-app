import { expect, it } from 'vitest';
import { layeredStateRequirements } from './LayeredMascotRenderer';

it('keeps the future layered renderer aligned with every mascot state', () => {
  expect(Object.keys(layeredStateRequirements).sort()).toEqual([
    'error',
    'idle',
    'passwordHidden',
    'passwordVisible',
    'success',
    'tracking',
  ]);
  expect(layeredStateRequirements.passwordHidden).toEqual([
    'head-base',
    'hand-shadow',
    'hand-left',
    'hand-right',
  ]);
});
