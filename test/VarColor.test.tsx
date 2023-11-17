import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { VarColor } from '../src/VarColor';
import { VarUI } from '../src/VarUI';

describe('VarColor', () => {
  it('should render without crashing', () => {
    render(<VarColor />);
  });

  it('should display value', async () => {
    render(<VarColor value="#FF0000" />);
    const colorPreview = await screen.findByTitle('Color preview');
    expect(colorPreview.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should update value on change', async () => {
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

  it('should update value on change (alpha)', async () => {
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

  it('should update value on change (alpha, transparent00 edge case)', async () => {
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

  it('should update value in context', async () => {
    const fn = vi.fn();
    const init = {
      value: '#ff0000',
    };
    render(
      <VarUI values={init} onChange={fn}>
        <VarColor path="value" />
      </VarUI>
    );

    const colorPreview = await screen.findByTitle('Color preview');
    act(() => {
      colorPreview.click();
    });
    const colorTile = await screen.findByTitle('#D0021B');
    act(() => {
      colorTile.click();
    });
    expect(fn).toBeCalledWith(expect.objectContaining({ value: '#d0021b' }));
  });
});
