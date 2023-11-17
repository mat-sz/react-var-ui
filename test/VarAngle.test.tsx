import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarAngle } from '../src/VarAngle';
import { VarUI } from '../src/VarUI';

describe('VarAngle', () => {
  it('should render without crashing', () => {
    render(<VarAngle />);
  });

  it('should display value', async () => {
    render(<VarAngle value={Math.PI} />);
    const value = await screen.findByText('180°');
    expect(value).toBeInTheDocument();
  });

  it('should update value on drag', async () => {
    const fn = vi.fn();
    render(<VarAngle value={Math.PI} onChange={fn} />);
    const angle = await screen.findByTitle('Angle');
    fireEvent.pointerDown(angle);
    fireEvent.pointerMove(angle, { clientX: 0, clientY: 0 });
    fireEvent.pointerMove(angle, { clientX: 0, clientY: 0 });
    fireEvent.pointerUp(angle, { clientX: 0, clientY: 0 });
    expect(fn).toBeCalledTimes(1);
  });

  it('should reset value on double click', async () => {
    const fn = vi.fn();
    render(<VarAngle value={Math.PI} onChange={fn} defaultValue={0} />);
    const angle = await screen.findByTitle('Angle');
    fireEvent.doubleClick(angle);
    expect(fn).toBeCalledWith(0);
  });

  it('should update value in context', async () => {
    const fn = vi.fn();
    const init = {
      value: Math.PI,
    };
    render(
      <VarUI values={init} onChange={fn}>
        <VarAngle path="value" defaultValue={0} />
      </VarUI>
    );
    const angle = await screen.findByTitle('Angle');
    fireEvent.doubleClick(angle);
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 0 }));
  });
});
