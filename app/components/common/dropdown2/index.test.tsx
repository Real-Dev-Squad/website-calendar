// import { render, screen, fireEvent } from '@testing-library/react';
// import DropdownTwo from '.';

// it('renders a dropwdown element', () => {
//   const { container } = render(<DropdownTwo />);

//   expect(container.querySelector('select')).toBeInTheDocument();
// });

// it('checks if dropdown elements are rendered on click', () => {
//   render(<DropdownTwo />);
//   const option1 = screen.getByTestId('option-1');
//   const option2 = screen.getByTestId('option-2');
//   const option3 = screen.getByTestId('option-3');

//   expect(option1).toBeInTheDocument();
//   expect(option2).toBeInTheDocument();
//   expect(option3).toBeInTheDocument();
// });

// it('checks if the click on any option changes the value of dropdown', async () => {
//   const { container } = render(<DropdownTwo />);
//   const select = container.querySelector('select') as HTMLSelectElement;
//   const option1 = screen.getByTestId('option-1') as HTMLOptionElement;
//   expect(select.value).not.toBe(option1.value);
//   fireEvent.change(select, { target: { value: option1.value } });
//   expect(select.value).toBe(option1.value);
// });
