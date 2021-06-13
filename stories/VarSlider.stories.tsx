import React from 'react';
import { Meta, Story } from '@storybook/react';
import { VarSlider, IVarSliderProps } from '../src';

const meta: Meta = {
  title: 'VarSlider',
  component: VarSlider,
  argTypes: {
    min: { action: 'range', min: 0, max: 10, step: 0.1 },
    max: { action: 'range', min: 0, max: 10, step: 0.1 },
    step: { action: 'range', min: 0, max: 10, step: 0.1 },
    onClick: { action: 'clicked' }
  },
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;

const Template: Story<IVarSliderProps> = args => <VarSlider {...args} />;

export const Default = Template.bind({
  min: 0.1,
  max: 0.8,
  step: 0.1,
  value: 0.3
});

Default.args = {};
