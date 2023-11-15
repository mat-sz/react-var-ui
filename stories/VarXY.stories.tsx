import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useCallback, useState } from '@storybook/preview-api';

import { VarXY, IVarXYProps } from '../src';

export default {
  title: 'VarXY',
  component: VarXY,
  argTypes: {
    label: { control: { type: 'text' } },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'VarXY',
    disabled: false,
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: StoryFn<IVarXYProps> = args => {
  const [value, setValue] = useState<[number, number]>([0, 0]);
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange?.(value);
    },
    [setValue, args]
  );
  return <VarXY {...args} value={value} onChange={onChange} />;
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
