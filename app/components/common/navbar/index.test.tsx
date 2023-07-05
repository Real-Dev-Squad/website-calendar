import React from 'react';
import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';
import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Slider from '../slider/index';
import Navbar, { DynamicHeroIcon } from './index';

describe.only('Navbar', () => {
  // Make the stub
  const RemixStub = createRemixStub([
    {
      path: '/',
      element: <Navbar />,
    },
  ]);

  it('renders', () => {
    const { container } = render(<RemixStub />);
    expect(container).toBeInTheDocument();
  });

  it('renders the slider', () => {
    const props = {
      showSlider: true,
      setShowSlider: jest.fn(),
    };
    const { container } = render(<Slider isOpen={props.showSlider} toggle={props.setShowSlider} />);
    expect(container).toBeInTheDocument();
  });

  it('renders the dynamic hero icon', () => {
    const props = {
      name: 'random',
      className: 'random',
    };
    const { container } = render(<DynamicHeroIcon name={props.name} className={props.className} />);

    expect(container).toBeInTheDocument();
  });

  // simulate click on li
  // it('should simulate click on li', async () => {
  //   const navbarElements = {
  //     navbarPages: [
  //       {
  //         icon: 'Home',
  //         text: 'Home',
  //         href: '/',
  //         id: 0,
  //         visibleOnDesktop: true,
  //       },
  //       {
  //         icon: 'Calendar',
  //         text: 'Events',
  //         href: '/events',
  //         id: 1,
  //         visibleOnDesktop: true,
  //       },
  //     ],
  //     navbarSettings: [
  //       {
  //         icon: 'Cog6Tooth',
  //         text: 'Settings',
  //         href: '/',
  //         id: 3,
  //         visibleOnDesktop: true,
  //       },
  //     ],
  //   };

  //   const user = userEvent.setup();
  //   const { getByText } = render(<RemixStub initialEntries={['/']} />);

  //   const li = getByText(navbarElements.navbarPages[0].text);
  //   expect(li).toBeInTheDocument();
  //   console.log({ li }, 'text:', li.textContent);

  //   // act(() => {
  //   //   fireEvent.click(li);
  //   // });

  //   await user.click(li);

  //   const listItems = document.querySelectorAll('li');
  //   expect(listItems.length).toBe(6);
  //   console.log({ listItems });
  //   expect(listItems[1].classList.contains('md:hidden')).toBeFalsy();
  //   expect(listItems[3].classList.contains('md:hidden')).toBeTruthy();
  //   expect(listItems[0].classList.contains('md:flex-row')).toBeTruthy();
  //   // act(() => {
  //   //   fireEvent.click(listItems[5]);
  //   // });
  // });

  it('should render list elements', () => {
    const navbarElements = {
      navbarSettings: [
        {
          icon: 'QuestionMarkCircle',
          text: 'Help',
          href: '/',
          id: 4,
          visibleOnDesktop: false,
        },
      ],
    };
    const { getByText } = render(<RemixStub initialEntries={['/']} />);
    // found last text
    const li = getByText(navbarElements.navbarSettings[0].text);
    expect(li).toBeInTheDocument();
  });
});
