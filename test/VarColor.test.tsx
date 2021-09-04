import React from 'react';
import { render, screen } from '@testing-library/react';

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
    const fn = jest.fn();
    render(<VarColor value="#FF0000" onChange={fn} />);
    const colorPreview = await screen.findByTitle('Color preview');
    colorPreview.click();
    const colorTile = await screen.findByTitle('#D0021B');
    colorTile.click();
    expect(fn).toBeCalledWith('#d0021b');
  });
});
