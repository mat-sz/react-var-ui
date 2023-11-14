import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useCallback, useState } from '@storybook/preview-api';

import { VarColor, IVarColorProps } from '../src';

export default {
  title: 'VarColor',
  component: VarColor,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'VarColor',
    disabled: false,
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: StoryFn<IVarColorProps> = args => {
  const [value, setValue] = useState('#ff0000');
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange?.(value);
    },
    [setValue, args]
  );
  return <VarColor {...args} value={value} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.storyName = 'disabled: true';

export const Alpha = Template.bind({});
Alpha.args = {
  alpha: true,
};
Alpha.storyName = 'alpha: true';

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
};
ReadOnly.storyName = 'readOnly: true';
