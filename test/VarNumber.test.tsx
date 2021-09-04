import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarNumber } from '../src/VarNumber';

describe('VarNumber', () => {
  it('renders without crashing', () => {
    render(<VarNumber />);
  });

  it('value: displayed', async () => {
    render(<VarNumber value={1337} />);
    const value = await screen.findByDisplayValue('1337');
    expect(value).toBeTruthy();
  });

  it('value: updated', async () => {
    const fn = jest.fn();
    render(<VarNumber value={1337} onChange={fn} />);
    const value = await screen.findByDisplayValue('1337');
    fireEvent.change(value, {
      target: {
        value: 2222
      }
    });
    expect(fn).toBeCalledWith(2222);
  });

  it('value: updated (increase button)', async () => {
    const fn = jest.fn();
    render(<VarNumber value={1337} onChange={fn} step={1} showButtons />);
    const button = await screen.findByTitle('Increase');
    button.click();
    expect(fn).toBeCalledWith(1338);
  });

  it('value: updated (decrease button)', async () => {
    const fn = jest.fn();
    render(<VarNumber value={1337} onChange={fn} step={1} showButtons />);
    const button = await screen.findByTitle('Decrease');
    button.click();
    expect(fn).toBeCalledWith(1336);
  });
});
