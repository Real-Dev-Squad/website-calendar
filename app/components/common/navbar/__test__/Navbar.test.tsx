import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Slider from '../../slider';

import Navbar, { DynamicHeroIcon } from '../index';

// test cases failing in certain conditions

describe('Navbar', () => {
  it('renders', () => {
    const { container } = render(<Navbar />);
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

  it('should render list elements', () => {
    const navbarElements = {
      navbarPages: [
        {
          icon: 'Home',
          text: 'Home',
          href: '/',
          id: 0,
          visibleOnDesktop: true,
        },
      ],
      navbarSettings: [
        {
          icon: 'Cog6Tooth',
          text: 'Settings',
          href: '/',
          id: 3,
          visibleOnDesktop: true,
        },
      ],
    };
    const { getByText } = render(<Navbar />);

    const li = getByText(navbarElements.navbarPages[0].text);
    expect(li).toBeInTheDocument();
    act(() => {
      fireEvent.click(li);
    });

    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(6);

    expect(listItems[1].classList.contains('md:hidden')).toBeFalsy();
    expect(listItems[3].classList.contains('md:hidden')).toBeTruthy();

    expect(listItems[0].classList.contains('md:flex-row')).toBeTruthy();
    act(() => {
      fireEvent.click(listItems[5]);
    });
  });

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
    const { getByText } = render(<Navbar />);
    // found last text
    const li = getByText(navbarElements.navbarSettings[0].text);
    expect(li).toBeInTheDocument();
  });
});
