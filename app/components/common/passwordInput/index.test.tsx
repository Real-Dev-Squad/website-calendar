import { fireEvent, render, screen } from '@testing-library/react';
import PasswordInput from '.';

it('renders a input field', () => {
  render(<PasswordInput label="New Password" description="Password must be 8 characters" />);
  const passwordInput = screen.getByTestId('password-input');
  expect(passwordInput).toBeInTheDocument();
});
it('checks show password', () => {
  render(<PasswordInput label="New Password" description="Password must be 8 characters" />);
  const passwordInput = screen.getByTestId('password-input');
  const eyeIcon = screen.getByTestId('icon');
  fireEvent.click(eyeIcon);
  expect(passwordInput).toHaveAttribute('type', 'text');
});
