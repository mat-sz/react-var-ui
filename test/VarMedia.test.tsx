import React from 'react';
import { render } from '@testing-library/react';

import { VarMedia } from '../src/VarMedia';

describe('VarMedia', () => {
  it('renders without crashing', () => {
    render(<VarMedia />);
  });
});
