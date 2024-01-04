import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarImage } from '../src/VarImage';
import { VarUI } from '../src/VarUI';

describe('VarImage', () => {
  it('should render without crashing', () => {
    render(<VarImage />);
  });

  it('should display value', async () => {
    render(<VarImage value="blob:http://example.com/test" />);
    const value = await screen.findByTitle('Image preview');
    expect(value.style.backgroundImage).toEqual(
      'url(blob:http://example.com/test)'
    );
    expect(value).toBeInTheDocument();
  });

  it('should update value on change', async () => {
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

  it('should render error from property', async () => {
    render(<VarImage path="value" error="example error" />);
    expect(screen.getByText('example error')).toBeInTheDocument();
  });

  it('should render error from context', async () => {
    render(
      <VarUI
        values={{
          value: false,
        }}
        errors={{ value: 'example error' }}
      >
        <VarImage path="value" />
      </VarUI>
    );
    expect(screen.getByText('example error')).toBeInTheDocument();
  });
});
