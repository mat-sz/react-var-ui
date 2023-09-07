import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { VarColor } from '../src/VarColor';

describe('VarColor', () => {
  it('renders without crashing', () => {
    render(<VarColor />);
  });

  it('value: displayed', async () => {
    render(<VarColor value="#FF0000" />);
    const colorPreview = await screen.findByTitle('Color preview');
    expect(colorPreview.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('value: changed', async () => {
    const fn = vi.fn();
    render(<VarColor value="#FF0000" onChange={fn} />);
    const colorPreview = await screen.findByTitle('Color preview');
    act(() => {
      colorPreview.click();
    });
    const colorTile = await screen.findByTitle('#D0021B');
    act(() => {
      colorTile.click();
    });
    expect(fn).toBeCalledWith('#d0021b');
  });

  it('value: changed (alpha)', async () => {
    const fn = vi.fn();
    render(<VarColor value="#FF0000FF" alpha={true} onChange={fn} />);
    const colorPreview = await screen.findByTitle('Color preview');
    act(() => {
      colorPreview.click();
    });
    const colorAlpha = await screen.findByLabelText('a');
    fireEvent.change(colorAlpha, { target: { value: '0' } });
    expect(fn).toBeCalledWith('#ff000000');
  });

  it('value: changed (alpha, transparent00 edge case)', async () => {
    const fn = vi.fn();
    render(<VarColor value="#000000FF" alpha={true} onChange={fn} />);
    const colorPreview = await screen.findByTitle('Color preview');
    act(() => {
      colorPreview.click();
    });
    const colorAlpha = await screen.findByLabelText('a');
    fireEvent.change(colorAlpha, { target: { value: '0' } });
    expect(fn).toBeCalledWith('#00000000');
  });
});
