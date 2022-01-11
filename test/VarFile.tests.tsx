import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarFile } from '../src/VarFile';

describe('VarFile', () => {
  it('renders without crashing', () => {
    render(<VarFile />);
  });

  it('value: displayed', async () => {
    render(<VarFile value={new File(['test'], 'test.pdf')} />);
    const value = await screen.findByText('test.pdf');
    expect(value).toBeTruthy();
  });

  it('value: updated', async () => {
    global.URL.createObjectURL = jest.fn();
    const fn = jest.fn();
    render(<VarFile onChange={fn} />);
    const value = await screen.findByTitle('File upload');
    fireEvent.change(value, {
      target: {
        files: [new File(['test'], 'test.png')],
      },
    });
    expect(fn).toBeCalled();
  });
});
