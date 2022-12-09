import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserInput from '../components/common/userInput';

export default {
  title: 'Components/UserInput',
  component: UserInput,
  args: {
    label: 'username',
    placeholder: 'enter your name',
    link: 'hap.day/',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    link: {
      control: 'radio',
      options: ['hap.day/', ''],
    },
  },
} as ComponentMeta<typeof UserInput>;

const Template: ComponentStory<typeof UserInput> = (props) => <UserInput {...props} />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'username',
  placeholder: 'enter your name',
  link: 'hap.day/',
};
