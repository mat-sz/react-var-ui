import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarToggle } from '../src/VarToggle';
import { VarUI } from '../src/VarUI';

describe('VarToggle', () => {
  it('should render without crashing', () => {
    render(<VarToggle />);
  });

  it('should display value (false)', async () => {
    render(<VarToggle value={false} />);
    const toggle = await screen.findByTitle('Toggle');
    const input = toggle.firstChild as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  it('should display value (true)', async () => {
    render(<VarToggle value={true} />);
    const toggle = await screen.findByTitle('Toggle');
    const input = toggle.firstChild as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('should toggle value on click (false -> true)', async () => {
    const fn = vi.fn();
    render(<VarToggle value={false} onChange={fn} />);
    const toggle = await screen.findByTitle('Toggle');
    toggle.click();
    expect(fn).toBeCalledWith(true);
  });

  it('should toggle value on click (true -> false)', async () => {
    const fn = vi.fn();
    render(<VarToggle value={true} onChange={fn} />);
    const toggle = await screen.findByTitle('Toggle');
    toggle.click();
    expect(fn).toBeCalledWith(false);
  });

  it('should update value in context', async () => {
    const fn = vi.fn();
    const init = {
      value: false,
    };
    render(
      <VarUI values={init} onChange={fn}>
        <VarToggle path="value" />
      </VarUI>
    );
    const toggle = await screen.findByTitle('Toggle');
    toggle.click();
    expect(fn).toBeCalledWith(expect.objectContaining({ value: true }));
  });
});
