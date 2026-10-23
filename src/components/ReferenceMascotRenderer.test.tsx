import { render, screen } from '@testing-library/react';
import { motionValue } from 'motion/react';
import { expect, it } from 'vitest';
import { pupilTravelPixels, ReferenceMascotRenderer } from './ReferenceMascotRenderer';

const pointer = { x: motionValue(0), y: motionValue(0) };

it('keeps every approved pose mounted while changing the visible state', () => {
  const { rerender, container } = render(<ReferenceMascotRenderer state="idle" pointer={pointer} reducedMotion />);
  expect(container.querySelector('[data-pose-layer="default"] img')).toHaveAttribute('src', '/assets/mascot/v2/head-base.png');
  expect(container.querySelectorAll('[data-pose-layer]')).toHaveLength(3);
  expect(container.querySelector('[data-pose-layer="default"]')).toHaveAttribute('data-active', 'true');
  expect(container.querySelectorAll('[data-eye-layer]')).toHaveLength(2);
  expect(container.querySelector('[data-brow-layer="left"]')).toHaveAttribute('src', '/assets/mascot/v2/experimental/brow-left.png');
  expect(container.querySelector('img[src="/assets/mascot/v2/experimental/brow-right.png"]')).not.toBeInTheDocument();

  rerender(<ReferenceMascotRenderer state="tracking" pointer={pointer} reducedMotion />);
  expect(container.firstElementChild).toHaveAttribute('data-reference-pose', 'default');

  rerender(<ReferenceMascotRenderer state="passwordHidden" pointer={pointer} reducedMotion />);
  expect(container.firstElementChild).toHaveAttribute('data-reference-pose', 'password-hidden');
  expect(container.querySelector('[data-pose-layer="password-hidden"]')).toHaveAttribute('data-active', 'true');
  expect(container.querySelector('[data-pose-layer="password-hidden"] img')).toHaveAttribute('src', '/assets/mascot/reference/dilo-senha-oculta.png');
  expect(container.querySelector('[data-pose-layer="default"]')).toBeInTheDocument();

  rerender(<ReferenceMascotRenderer state="passwordVisible" pointer={pointer} reducedMotion />);
  expect(container.firstElementChild).toHaveAttribute('data-reference-pose', 'password-visible');
  expect(container.querySelector('[data-pose-layer="password-visible"]')).toHaveAttribute('data-active', 'true');
  expect(container.querySelector('[data-pose-layer="password-visible"] img')).toHaveAttribute('src', '/assets/mascot/reference/dilo-senha-visivel.png');
});

it('uses measured asymmetric pupil travel limits for the V2 eye masks', () => {
  expect(pupilTravelPixels).toEqual({
    left: { x: { min: -16, max: 4 }, y: { min: -12, max: 5 } },
    right: { x: { min: -15, max: 15 }, y: { min: -10, max: 3 } },
  });
});
