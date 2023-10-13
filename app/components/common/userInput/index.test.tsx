import { fireEvent, render, screen } from '@testing-library/react';
import UserInput from '.';

describe('UserInput', () => {
  it('renders a input field', () => {
    render(
      <UserInput
        label="Username"
        placeholder="enter your name"
        link="rcal/"
        value=""
        setValue={() => {}}
      />,
    );
    const userInput = screen.getByTestId('user-input');
    expect(userInput).toBeInTheDocument();
  });

  it('checks added button in input field wrapper', () => {
    render(
      <UserInput
        label="Username"
        placeholder="enter your name"
        link="rcal/"
        value=""
        setValue={() => {}}
      />,
    );
    const userInputWrapper = screen.getByTestId('user-input-wrapper');
    const button = screen.getByTestId('url-btn');
    expect(userInputWrapper).toContainElement(button);
  });

  it('checks input value to be empty', () => {
    render(
      <UserInput label="Username" placeholder="enter your name" value="" setValue={() => {}} />,
    );
    const inputElement = screen.getByTestId('user-input');
    expect(inputElement).toHaveValue('');
  });

  it('checks show password', () => {
    render(
      <UserInput
        type="password"
        label="New Password"
        description="Password must be 8 characters"
        value=""
        setValue={() => {}}
      />,
    );
    const passwordInput = screen.getByTestId('user-input');
    const eyeIcon = screen.getByTestId('icon');
    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('should render error', () => {
    const { getByText } = render(
      <UserInput
        label="Username"
        placeholder="enter your name"
        value=""
        setValue={() => {}}
        err="error"
        link="random string"
      />,
    );
    const error = getByText('error');
    expect(error).toBeInTheDocument();
    const button = screen.getByTestId('url-btn');
    expect(button).toHaveClass('border-red-600');
  });
});
