import { ComponentMeta, ComponentStory } from '@storybook/react';

import Calendar from '../components/Calendar';

type CalendarType = typeof Calendar;

export default {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<CalendarType>;

const Template: ComponentStory<typeof Calendar> = () => <Calendar />;

export const Primary = Template.bind({});
Primary.args = {};
