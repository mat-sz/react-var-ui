import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarNumber } from '../src/VarNumber';
import { VarUI } from '../src/VarUI';

describe('VarNumber', () => {
  it('should render without crashing', () => {
    render(<VarNumber />);
  });

  it('should display value', async () => {
    render(<VarNumber value={1337} />);
    const value = await screen.findByDisplayValue('1337');
    expect(value).toBeInTheDocument();
  });

  it('should update value on change', async () => {
    const fn = vi.fn();
    render(<VarNumber value={1337} onChange={fn} />);
    const value = await screen.findByDisplayValue('1337');
    fireEvent.change(value, {
      target: {
        value: 2222,
      },
    });
    fireEvent.blur(value);
    expect(fn).toBeCalledWith(2222);
  });

  it('should update value on change (invalid data)', async () => {
    const fn = vi.fn();
    render(<VarNumber value={1337} onChange={fn} />);
    const value = await screen.findByDisplayValue('1337');
    fireEvent.change(value, {
      target: {
        value: 'a',
      },
    });
    fireEvent.blur(value);
    expect(fn).toBeCalledWith(0);
  });

  it('should update value on increase button click', async () => {
    const fn = vi.fn();
    render(<VarNumber value={1337} onChange={fn} step={1} showButtons />);
    const button = await screen.findByTitle('Increase');
    button.click();
    expect(fn).toBeCalledWith(1338);
  });

  it('should update value on decrease button click', async () => {
    const fn = vi.fn();
    render(<VarNumber value={1337} onChange={fn} step={1} showButtons />);
    const button = await screen.findByTitle('Decrease');
    button.click();
    expect(fn).toBeCalledWith(1336);
  });

  it('should update value in context', async () => {
    const fn = vi.fn();
    const init = {
      value: 1,
    };
    render(
      <VarUI values={init} onChange={fn}>
        <VarNumber path="value" showButtons={true} step={1} />
      </VarUI>
    );
    const button = await screen.findByTitle('Increase');
    button.click();
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 2 }));
  });
});
