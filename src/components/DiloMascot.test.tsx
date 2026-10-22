import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { DiloMascot, type MascotRendererProps } from './DiloMascot';

function Renderer({ state }: MascotRendererProps) { return <output data-testid="renderer">{state}</output>; }
function move(pointerType: string) {
  const event = new Event('pointermove');
  Object.assign(event, { pointerType, clientX: 900, clientY: 120 });
  fireEvent(window, event);
}

it('encaminha tracking global ao renderer, ignora toque e prioriza proteção de senha', () => {
  const { rerender } = render(<DiloMascot renderer={Renderer} />);
  move('touch');
  expect(screen.getByTestId('renderer')).toHaveTextContent('idle');
  move('mouse');
  expect(screen.getByTestId('renderer')).toHaveTextContent('tracking');
  rerender(<DiloMascot state="passwordHidden" renderer={Renderer} />);
  move('mouse');
  expect(screen.getByTestId('renderer')).toHaveTextContent('passwordHidden');
  rerender(<DiloMascot state="idle" renderer={Renderer} />);
  move('mouse');
  fireEvent(window, new Event('blur'));
  expect(screen.getByTestId('renderer')).toHaveTextContent('idle');
});
