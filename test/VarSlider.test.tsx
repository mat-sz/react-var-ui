import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarSlider } from '../src/VarSlider';

describe('VarSlider', () => {
  it('renders without crashing', () => {
    render(<VarSlider min={0} max={1} step={0.1} />);
  });

  it('value: displayed', async () => {
    render(<VarSlider min={0} max={2} step={0.1} value={2} />);
    const value = await screen.findAllByText('2');
    expect(value).toBeTruthy();
  });

  it('value: changed on drag (mouse)', async () => {
    const fn = jest.fn();
    render(<VarSlider min={0} max={2} step={0.1} value={0} onChange={fn} />);
    const slider = await screen.findByTitle('Slider');
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: 1, clientY: 5 });
    fireEvent.mouseUp(slider, { clientX: 1, clientY: 5 });
    expect(fn).toBeCalledWith(2);
  });

  it('value: changed on drag (touch)', async () => {
    const fn = jest.fn();
    render(<VarSlider min={0} max={2} step={0.1} value={0} onChange={fn} />);
    const slider = await screen.findByTitle('Slider');
    fireEvent.touchStart(slider);
    fireEvent.touchMove(slider, { touches: [{ clientX: 500, clientY: 5 }] });
    fireEvent.touchEnd(slider, { touches: [{ clientX: 500, clientY: 5 }] });
    expect(fn).toBeCalledWith(2);
  });

  it('value: reset on double click', async () => {
    const fn = jest.fn();
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

  it('value: updated (increase button)', async () => {
    const fn = jest.fn();
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

  it('value: updated (decrease button)', async () => {
    const fn = jest.fn();
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
});
