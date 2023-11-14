import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useCallback, useState } from '@storybook/preview-api';

import { VarToggle, IVarToggleProps } from '../src';

export default {
  title: 'VarToggle',
  component: VarToggle,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'VarToggle',
    disabled: false,
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: StoryFn<IVarToggleProps> = args => {
  const [value, setValue] = useState(false);
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange?.(value);
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
  disabled: true,
};
Disabled.storyName = 'disabled: true';

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
};
ReadOnly.storyName = 'readOnly: true';
