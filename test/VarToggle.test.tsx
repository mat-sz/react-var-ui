import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarToggle } from '../src/VarToggle';

describe('VarToggle', () => {
  it('renders without crashing', () => {
    render(<VarToggle />);
  });

  it('value: displayed (false)', async () => {
    render(<VarToggle value={false} />);
    const toggle = await screen.findByTitle('Toggle');
    const input = toggle.firstChild as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  it('value: displayed (true)', async () => {
    render(<VarToggle value={true} />);
    const toggle = await screen.findByTitle('Toggle');
    const input = toggle.firstChild as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('value: toggled (false -> true)', async () => {
    const fn = jest.fn();
    render(<VarToggle value={false} onChange={fn} />);
    const toggle = await screen.findByTitle('Toggle');
    toggle.click();
    expect(fn).toBeCalledWith(true);
  });

  it('value: toggled (true -> false)', async () => {
    const fn = jest.fn();
    render(<VarToggle value={true} onChange={fn} />);
    const toggle = await screen.findByTitle('Toggle');
    toggle.click();
    expect(fn).toBeCalledWith(false);
  });
});
