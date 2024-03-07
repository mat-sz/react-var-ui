import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarArray } from '../src/VarArray';
import { VarString } from '../src/VarString';
import { VarUI } from '../src/VarUI';

describe('VarArray', () => {
  it('should render without crashing', () => {
    render(<VarArray />);
  });

  it('should display value (node children)', async () => {
    render(
      <VarArray value={[{ test: 'a' }, { test: 'b' }, { test: 'c' }]}>
        <VarString path="test" />
      </VarArray>
    );
    const value = await screen.findByDisplayValue('b');
    expect(value).toBeInTheDocument();
  });

  it('should display value (function)', async () => {
    render(
      <VarArray value={[{ test: 'a' }, { test: 'b' }, { test: 'c' }]}>
        {() => <VarString path="test" />}
      </VarArray>
    );
    const value = await screen.findByDisplayValue('b');
    expect(value).toBeInTheDocument();
  });

  it('should update value on change', async () => {
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

  it('should render errors from context', async () => {
    render(
      <VarUI
        values={{ array: [{ test: 'a' }, { test: 'b' }, { test: 'c' }] }}
        errors={{ array: [undefined, { test: 'example error' }] }}
      >
        <VarArray path="array">{() => <VarString path="test" />}</VarArray>
      </VarUI>
    );
    expect(screen.getByText('example error')).toBeInTheDocument();
  });

  it('should display value (empty path)', async () => {
    render(
      <VarArray value={['a', 'b', 'c']}>
        <VarString path="" />
      </VarArray>
    );
    const value = await screen.findByDisplayValue('b');
    expect(value).toBeInTheDocument();
  });

  it('should update value on change (empty path)', async () => {
    const fn = vi.fn();
    render(
      <VarArray value={['a', 'b', 'c']} onChange={fn}>
        {() => <VarString path="" />}
      </VarArray>
    );
    const value = await screen.findByDisplayValue('b');
    fireEvent.change(value, {
      target: {
        value: 'x',
      },
    });
    expect(fn).toBeCalledWith(['a', 'x', 'c']);
  });
});
