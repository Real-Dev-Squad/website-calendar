import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../navbar';

describe('Testing working of the slider component', () => {
  it('Opens and closes the slider', () => {
    render(<Navbar />);

    const sliderComponent = screen.getByTestId('slider');

    // opens the slider
    // const slider_button = screen.getByTitle('slider');
    // fireEvent.click(slider_button);
    // expect(slider_component).toHaveClass('right-0');

    // closes the slider
    const sliderCloseButton = screen.getByTestId('slider-close-button');
    fireEvent.click(sliderCloseButton);
    expect(sliderComponent).toHaveClass('right-[-20rem]');
  });
});
