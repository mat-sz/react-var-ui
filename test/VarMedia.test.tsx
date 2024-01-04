import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarMedia } from '../src/VarMedia';
import { VarUI } from '../src/VarUI';

describe('VarMedia', () => {
  it('should render without crashing', () => {
    render(<VarMedia />);
  });

  it('should render error from property', async () => {
    render(<VarMedia path="value" error="example error" />);
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
        <VarMedia path="value" />
      </VarUI>
    );
    expect(screen.getByText('example error')).toBeInTheDocument();
  });
});
