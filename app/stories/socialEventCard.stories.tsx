import { Story, Meta } from '@storybook/react';
import SocialEventCard from '~/components/common/socialEventCard';
import { CalEvent } from '~/utils/interfaces';

export default {
  title: 'Components/SocialEvent',
  component: SocialEventCard,
  argTypes: {
    title: { control: 'text' },
  },
} as Meta;

const Template: Story<CalEvent> = (args: CalEvent) => <SocialEventCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Example Event',
  attendees: [],
};
