import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarSlider } from '../src/VarSlider';
import { VarUI } from '../src/VarUI';

describe('VarSlider', () => {
  it('should render without crashing', () => {
    render(<VarSlider min={0} max={1} step={0.1} />);
  });

  it('should display value', async () => {
    render(<VarSlider min={0} max={2} step={0.1} value={2} />);
    const value = await screen.findAllByText('2');
    expect(value.length).toBeGreaterThan(0);
  });

  it('should update value on drag', async () => {
    const fn = vi.fn();
    render(<VarSlider min={0} max={2} step={0.1} value={2} onChange={fn} />);
    const slider = await screen.findByTitle('Slider');
    fireEvent.pointerDown(slider);
    fireEvent.pointerMove(slider, { clientX: 0, clientY: 0 });
    fireEvent.pointerMove(slider, { clientX: 0, clientY: 0 });
    fireEvent.pointerUp(slider, { clientX: 0, clientY: 0 });
    expect(fn).toBeCalledWith(0);
  });

  it('should reset value on double click', async () => {
    const fn = vi.fn();
    render(
      <VarSlider
        min={0}
        max={2}
        step={0.1}
        value={0}
        defaultValue={1}
        onChange={fn}
      />
    );
    const slider = await screen.findByTitle('Slider');
    fireEvent.doubleClick(slider);
    expect(fn).toBeCalledWith(1);
  });

  it('should update value on increase button click', async () => {
    const fn = vi.fn();
    render(
      <VarSlider
        min={0}
        max={2}
        step={0.1}
        value={1}
        onChange={fn}
        showButtons
      />
    );
    const button = await screen.findByTitle('Increase');
    button.click();
    expect(fn).toBeCalledWith(1.1);
  });

  it('should update value on decrease button click', async () => {
    const fn = vi.fn();
    render(
      <VarSlider
        min={0}
        max={2}
        step={0.1}
        value={1}
        onChange={fn}
        showButtons
      />
    );
    const button = await screen.findByTitle('Decrease');
    button.click();
    expect(fn).toBeCalledWith(0.9);
  });

  it('should update value on input change', async () => {
    const fn = vi.fn();
    render(
      <VarSlider min={0} max={2} step={0.1} value={1} onChange={fn} showInput />
    );
    const input = await screen.findByDisplayValue(1);
    fireEvent.change(input, {
      target: {
        value: 2,
      },
    });
    fireEvent.blur(input);
    expect(fn).toBeCalledWith(2);
  });

  it('should update value to 0 on invalid input change', async () => {
    const fn = vi.fn();
    render(
      <VarSlider min={0} max={2} step={0.1} value={1} onChange={fn} showInput />
    );
    const input = await screen.findByDisplayValue(1);
    fireEvent.change(input, {
      target: {
        value: 'a',
      },
    });
    fireEvent.blur(input);
    expect(fn).toBeCalledWith(0);
  });

  it('should update value in context', async () => {
    const fn = vi.fn();
    const init = {
      value: 1,
    };
    render(
      <VarUI values={init} onChange={fn}>
        <VarSlider path="value" showButtons={true} min={0} max={2} step={1} />
      </VarUI>
    );
    const button = await screen.findByTitle('Increase');
    button.click();
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 2 }));
  });

  it('should display unit', async () => {
    render(
      <VarSlider min={0} max={2} step={0.1} value={1} showInput unit="mm" />
    );
    expect(screen.getByText('mm')).toBeInTheDocument();
  });

  it('should render error from property', async () => {
    render(
      <VarSlider
        path="value"
        showButtons={true}
        min={0}
        max={2}
        step={1}
        error="example error"
      />
    );
    expect(screen.getByText('example error')).toBeInTheDocument();
  });

  it('should render error from context', async () => {
    render(
      <VarUI
        values={{
          value: false,
        }}
        errors={{ value: 'example error' }}
      >
        <VarSlider path="value" showButtons={true} min={0} max={2} step={1} />
      </VarUI>
    );
    expect(screen.getByText('example error')).toBeInTheDocument();
  });

  it('should update value on input change if inputMin/inputMax/inputStep are defined', async () => {
    const fn = vi.fn();
    render(
      <VarSlider
        min={0}
        max={2}
        step={0.1}
        inputMin={0}
        inputMax={4}
        inputStep={1}
        value={1}
        onChange={fn}
        showInput
      />
    );
    const input = await screen.findByDisplayValue(1);
    fireEvent.change(input, {
      target: {
        value: 3,
      },
    });
    fireEvent.blur(input);
    expect(fn).toBeCalledWith(3);
  });
});
