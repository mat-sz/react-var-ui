import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarArray } from '../src/VarArray';
import { VarString } from '../src/VarString';

describe('VarArray', () => {
  it('renders without crashing', () => {
    render(<VarArray />);
  });

  it('value: display (node children)', async () => {
    render(
      <VarArray value={[{ test: 'a' }, { test: 'b' }, { test: 'c' }]}>
        <VarString path="test" />
      </VarArray>
    );
    const value = await screen.findByDisplayValue('b');
    expect(value).toBeInTheDocument();
  });

  it('value: display (function)', async () => {
    render(
      <VarArray value={[{ test: 'a' }, { test: 'b' }, { test: 'c' }]}>
        {() => <VarString path="test" />}
      </VarArray>
    );
    const value = await screen.findByDisplayValue('b');
    expect(value).toBeInTheDocument();
  });

  it('value: changed on input', async () => {
    const fn = vi.fn();
    render(
      <VarArray
        value={[{ test: 'a' }, { test: 'b' }, { test: 'c' }]}
        onChange={fn}
      >
        {() => <VarString path="test" />}
      </VarArray>
    );
    const value = await screen.findByDisplayValue('b');
    fireEvent.change(value, {
      target: {
        value: 'x',
      },
    });
    expect(fn).toBeCalledWith([{ test: 'a' }, { test: 'x' }, { test: 'c' }]);
  });
});
