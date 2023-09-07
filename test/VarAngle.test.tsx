import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarAngle } from '../src/VarAngle';

describe('VarAngle', () => {
  it('renders without crashing', () => {
    render(<VarAngle />);
  });

  it('value: display', async () => {
    render(<VarAngle value={Math.PI} />);
    const value = await screen.findByText('180°');
    expect(value).toBeTruthy();
  });

  it('value: changed on drag', async () => {
    const fn = vi.fn();
    render(<VarAngle value={Math.PI} onChange={fn} />);
    const angle = await screen.findByTitle('Angle');
    fireEvent.pointerDown(angle);
    fireEvent.pointerMove(angle, { clientX: 0, clientY: 0 });
    fireEvent.pointerMove(angle, { clientX: 0, clientY: 0 });
    fireEvent.pointerUp(angle, { clientX: 0, clientY: 0 });
    expect(fn).toBeCalledTimes(1);
  });

  it('value: reset on double click', async () => {
    const fn = vi.fn();
    render(<VarAngle value={Math.PI} onChange={fn} defaultValue={0} />);
    const angle = await screen.findByTitle('Angle');
    fireEvent.doubleClick(angle);
    expect(fn).toBeCalledWith(0);
  });
});
