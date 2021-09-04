import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useCallback, useState } from '@storybook/client-api';

import { VarAngle, IVarAngleProps } from '../src';

export default {
  title: 'VarAngle',
  component: VarAngle,
  argTypes: {
    defaultValue: {
      control: { type: 'range', min: 0, max: Math.PI * 2, step: 0.1 }
    },
    label: { control: { type: 'text' } },
    disabled: { control: 'boolean' }
  },
  args: {
    defaultValue: 0,
    label: 'VarAngle',
    disabled: false
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' }
  }
} as Meta;

const Template: Story<IVarAngleProps> = args => {
  const [value, setValue] = useState(0);
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange(value);
    },
    [setValue, args]
  );
  return <VarAngle {...args} value={value} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};
Disabled.storyName = 'disabled: true';
