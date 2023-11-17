import React from 'react';
import { render } from '@testing-library/react';

import { VarUI } from '../src/VarUI';

describe('VarUI', () => {
  it('should render without crashing', () => {
    render(<VarUI values={{}} />);
  });
});
