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

  it('value: changed on drag (mouse)', async () => {
    const fn = jest.fn();
    render(<VarAngle value={Math.PI} onChange={fn} />);
    const angle = await screen.findByTitle('Angle');
    fireEvent.mouseDown(angle);
    fireEvent.mouseMove(angle, { clientX: 0, clientY: 0 });
    fireEvent.mouseUp(angle, { clientX: 0, clientY: 0 });
    expect(fn).toBeCalledWith(Math.PI / 2);
  });

  it('value: changed on drag (touch)', async () => {
    const fn = jest.fn();
    render(<VarAngle value={Math.PI} onChange={fn} />);
    const angle = await screen.findByTitle('Angle');
    fireEvent.touchStart(angle);
    fireEvent.touchMove(angle, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchEnd(angle, { touches: [{ clientX: 0, clientY: 0 }] });
    expect(fn).toBeCalledWith(Math.PI / 2);
  });

  it('value: reset on double click', async () => {
    const fn = jest.fn();
    render(<VarAngle value={Math.PI} onChange={fn} defaultValue={0} />);
    const angle = await screen.findByTitle('Angle');
    fireEvent.doubleClick(angle);
    expect(fn).toBeCalledWith(0);
  });
});
