import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarButton } from '../src/VarButton';

describe('VarButton', () => {
  it('renders without crashing', () => {
    render(<VarButton buttonLabel="Test" />);
  });

  it('onClick: called on click', async () => {
    const fn = vi.fn();
    render(<VarButton buttonLabel="Test" onClick={fn} />);
    const button = await screen.findByText('Test');
    button.click();
    expect(fn).toBeCalled();
  });
});
