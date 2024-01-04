import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarButton } from '../src/VarButton';

describe('VarButton', () => {
  it('should render without crashing', () => {
    render(<VarButton buttonLabel="Test" />);
  });

  it('should call onClick on click', async () => {
    const fn = vi.fn();
    render(<VarButton buttonLabel="Test" onClick={fn} />);
    const button = await screen.findByText('Test');
    button.click();
    expect(fn).toBeCalled();
  });

  it('should render error from property', async () => {
    render(<VarButton buttonLabel="Test" error="example error" />);
    expect(screen.getByText('example error')).toBeInTheDocument();
  });
});
