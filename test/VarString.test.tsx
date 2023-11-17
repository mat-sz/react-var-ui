import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarString } from '../src/VarString';
import { VarUI } from '../src/VarUI';

describe('VarString', () => {
  it('should render without crashing', () => {
    render(<VarString />);
  });

  it('should display value', async () => {
    render(<VarString value="Test" />);
    const value = await screen.findByDisplayValue('Test');
    expect(value).toBeInTheDocument();
  });

  it('should update value on change', async () => {
    const fn = vi.fn();
    render(<VarString value="Value" onChange={fn} />);
    const value = await screen.findByDisplayValue('Value');
    fireEvent.change(value, {
      target: {
        value: 'Updated',
      },
    });
    expect(fn).toBeCalledWith('Updated');
  });

  it('should update value in context', async () => {
    const fn = vi.fn();
    const init = {
      value: 'Value',
    };
    render(
      <VarUI values={init} onChange={fn}>
        <VarString path="value" />
      </VarUI>
    );
    const value = await screen.findByDisplayValue('Value');
    fireEvent.change(value, {
      target: {
        value: 'Updated',
      },
    });
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 'Updated' }));
  });
});
