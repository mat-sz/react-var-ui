import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarImage } from '../src/VarImage';

describe('VarImage', () => {
  it('renders without crashing', () => {
    render(<VarImage />);
  });

  it('value: displayed', async () => {
    render(<VarImage value="blob:http://example.com/test" />);
    const value = await screen.findByTitle('Image preview');
    expect(value.style.backgroundImage).toEqual(
      'url(blob:http://example.com/test)'
    );
    expect(value).toBeTruthy();
  });

  it('value: updated', async () => {
    global.URL.createObjectURL = vi.fn();
    const fn = vi.fn();
    render(<VarImage value="blob:http://example.com/test" onChange={fn} />);
    const value = await screen.findByTitle('Image upload');
    fireEvent.change(value, {
      target: {
        files: [new File(['test'], 'test.png')],
      },
    });
    expect(fn).toBeCalled();
  });
});
