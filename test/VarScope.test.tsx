import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarScope } from '../src/VarScope';
import { VarString } from '../src/VarString';
import { VarUI } from '../src/VarUI';

describe('VarScope', () => {
  it('should render without crashing', () => {
    render(<VarScope />);
  });

  it('should display value', async () => {
    render(
      <VarUI values={{ scope: { test: 'abc' } }}>
        <VarScope path="scope">
          <VarString path="test" />
        </VarScope>
      </VarUI>
    );
    const value = await screen.findByDisplayValue('abc');
    expect(value).toBeInTheDocument();
  });

  it('should update value on change', async () => {
    const fn = vi.fn();
    render(
      <VarUI values={{ scope: { test: 'abc' } }} onChange={fn}>
        <VarScope path="scope">
          <VarString path="test" />
        </VarScope>
      </VarUI>
    );
    const value = await screen.findByDisplayValue('abc');
    fireEvent.change(value, {
      target: {
        value: 'x',
      },
    });
    expect(fn).toBeCalledWith({ scope: { test: 'x' } });
  });
});
