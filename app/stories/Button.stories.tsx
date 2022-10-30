import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../components/Button.client';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    label: 'Hello world',
    size: 'medium',
    varient: 'primary',
  },
  argTypes: {
    label: { control: 'text' },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    varient: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (props) => <Button {...props} />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  varient: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Hello',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium Hello',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large Hello',
  size: 'large',
};
