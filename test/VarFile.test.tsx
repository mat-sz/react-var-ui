import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarFile } from '../src/VarFile';

describe('VarFile', () => {
  it('should render without crashing', () => {
    render(<VarFile />);
  });

  it('should display value', async () => {
    render(<VarFile value={new File(['test'], 'test.pdf')} />);
    const value = await screen.findByText('test.pdf');
    expect(value).toBeInTheDocument();
  });

  it('should update value on change', async () => {
    global.URL.createObjectURL = vi.fn();
    const fn = vi.fn();
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
