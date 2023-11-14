import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useCallback, useState } from '@storybook/client-api';

import { VarString, IVarStringProps } from '../src';

export default {
  title: 'VarString',
  component: VarString,
  argTypes: {
    maxlength: { control: { type: 'range', min: 0, max: 500, step: 1 } },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    multiline: { control: 'boolean' },
    autoexpand: { control: 'boolean' },
  },
  args: {
    label: 'VarString',
    disabled: false,
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: Story<IVarStringProps> = args => {
  const [value, setValue] = useState('value');
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange(value);
    },
    [setValue, args]
  );
  return <VarString {...args} value={value} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.storyName = 'disabled: true';

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
};
ReadOnly.storyName = 'readOnly: true';

export const Multiline = Template.bind({});
Multiline.args = {
  multiline: true,
};
Multiline.storyName = 'multiline: true';

export const Autoexpand = Template.bind({});
Autoexpand.args = {
  multiline: true,
  autoexpand: true,
};
Autoexpand.storyName = 'multiline: true, autoexpand: true';
