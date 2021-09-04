import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useCallback, useState } from '@storybook/client-api';

import { VarToggle, IVarToggleProps } from '../src';

export default {
  title: 'VarToggle',
  component: VarToggle,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'VarToggle',
    disabled: false
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' }
  }
} as Meta;

const Template: Story<IVarToggleProps> = args => {
  const [value, setValue] = useState(false);
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange(value);
    },
    [setValue, args]
  );
  return <VarToggle {...args} value={value} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};
Disabled.storyName = 'disabled: true';
