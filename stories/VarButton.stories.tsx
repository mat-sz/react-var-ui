import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { VarButton, IVarButtonProps } from '../src';

export default {
  title: 'VarButton',
  component: VarButton,
  argTypes: {
    label: { control: 'text' },
    buttonLabel: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    min: 0,
    max: 10,
    step: 1,
    label: 'VarButton',
    buttonLabel: 'VarButton',
    disabled: false,
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: StoryFn<IVarButtonProps> = args => <VarButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.storyName = 'disabled: true';

export const NoLabel = Template.bind({});
NoLabel.args = {
  label: undefined,
};
NoLabel.storyName = 'no label';
