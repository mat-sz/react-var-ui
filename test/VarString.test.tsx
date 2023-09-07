import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarString } from '../src/VarString';

describe('VarString', () => {
  it('renders without crashing', () => {
    render(<VarString />);
  });

  it('value: displayed', async () => {
    render(<VarString value="Test" />);
    const value = await screen.findByDisplayValue('Test');
    expect(value).toBeTruthy();
  });

  it('value: updated', async () => {
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
});
