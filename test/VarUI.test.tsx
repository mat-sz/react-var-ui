import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VarUI } from '../src/VarUI';
import { VarAngle } from '../src/VarAngle';
import { VarColor } from '../src/VarColor';
import { VarNumber } from '../src/VarNumber';
import { VarSelect } from '../src/VarSelect';
import { VarSlider } from '../src/VarSlider';
import { VarString } from '../src/VarString';
import { VarToggle } from '../src/VarToggle';

describe('VarUI', () => {
  it('renders without crashing', () => {
    render(<VarUI values={{}} updateValues={() => {}} />);
  });

  it('values: updated when VarAngle changes', async () => {
    const fn = jest.fn();
    const init = {
      value: Math.PI
    };
    render(
      <VarUI values={init} updateValues={fn}>
        <VarAngle path="value" defaultValue={0} />
      </VarUI>
    );
    const angle = await screen.findByTitle('Angle');
    fireEvent.doubleClick(angle);
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 0 }));
  });

  it('values: updated when VarColor changes', async () => {
    const fn = jest.fn();
    const init = {
      value: '#ff0000'
    };
    render(
      <VarUI values={init} updateValues={fn}>
        <VarColor path="value" />
      </VarUI>
    );
    const colorPreview = await screen.findByTitle('Color preview');
    colorPreview.click();
    const colorTile = await screen.findByTitle('#D0021B');
    colorTile.click();
    expect(fn).toBeCalledWith(expect.objectContaining({ value: '#d0021b' }));
  });

  it('values: updated when VarNumber changes', async () => {
    const fn = jest.fn();
    const init = {
      value: 1
    };
    render(
      <VarUI values={init} updateValues={fn}>
        <VarNumber path="value" showButtons={true} step={1} />
      </VarUI>
    );
    const button = await screen.findByTitle('Increase');
    button.click();
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 2 }));
  });

  it('values: updated when VarSelect changes', async () => {
    const fn = jest.fn();
    const init = {
      value: 2
    };
    render(
      <VarUI values={init} updateValues={fn}>
        <VarSelect
          path="value"
          options={[
            { key: 1, label: 'Test 1' },
            { key: 2, label: 'Test 2' },
            { key: 3, label: 'Test 3' }
          ]}
        />
      </VarUI>
    );
    const select = await screen.findByTitle('Select options');
    userEvent.selectOptions(select, '1');
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 1 }));
  });

  it('values: updated when VarSlider changes', async () => {
    const fn = jest.fn();
    const init = {
      value: 1
    };
    render(
      <VarUI values={init} updateValues={fn}>
        <VarSlider path="value" showButtons={true} min={0} max={2} step={1} />
      </VarUI>
    );
    const button = await screen.findByTitle('Increase');
    button.click();
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 2 }));
  });

  it('values: updated when VarString changes', async () => {
    const fn = jest.fn();
    const init = {
      value: 'Value'
    };
    render(
      <VarUI values={init} updateValues={fn}>
        <VarString path="value" />
      </VarUI>
    );
    const value = await screen.findByDisplayValue('Value');
    fireEvent.change(value, {
      target: {
        value: 'Updated'
      }
    });
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 'Updated' }));
  });

  it('values: updated when VarToggle changes', async () => {
    const fn = jest.fn();
    const init = {
      value: false
    };
    render(
      <VarUI values={init} updateValues={fn}>
        <VarToggle path="value" />
      </VarUI>
    );
    const toggle = await screen.findByTitle('Toggle');
    toggle.click();
    expect(fn).toBeCalledWith(expect.objectContaining({ value: true }));
  });
});
