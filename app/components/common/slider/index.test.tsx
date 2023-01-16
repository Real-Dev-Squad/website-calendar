import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../navbar';

describe('Testing working of the slider component', () => {
  it('Opens and closes the slider', () => {
    render(<Navbar />);

    const slider_component = screen.getByTestId('slider');

    // opens the slider
    // const slider_button = screen.getByTitle('slider');
    // fireEvent.click(slider_button);
    // expect(slider_component).toHaveStyle('right: 0rem');

    // closes the slider
    const slider_close_button = screen.getByTestId('slider-close-button');
    fireEvent.click(slider_close_button);
    expect(slider_component).toHaveStyle('right: -20rem');
  });
});
