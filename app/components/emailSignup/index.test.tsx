import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailSignup from '.';

it('renders the signup with email form', () => {
  render(<EmailSignup />);
  const emailSignup = screen.getByTestId('email-signup');
  expect(emailSignup).toBeInTheDocument();
});

it('updates the fullName property of state when fullName input field is updated and passes that value back to the controlled input', async () => {
  render(<EmailSignup />);
  const fullName = screen.getByTestId('email-signup-name');
  await userEvent.type(fullName, 'John Doe');
  expect(fullName).toHaveValue('John Doe');
});

it('updates the email property of state when email input field is updated and passes that value back to the controlled input', async () => {
  render(<EmailSignup />);
  const email = screen.getByTestId('email-signup-email');
  await userEvent.type(email, 'JohnDoe@gmail.com');
  expect(email).toHaveValue('JohnDoe@gmail.com');
});

it('updates the password property of state when password input field is updated and passes that value back to the controlled input', async () => {
  render(<EmailSignup />);
  const password = screen.getByTestId('email-signup-password');
  await userEvent.type(password, 'John@Doe');
  expect(password).toHaveValue('John@Doe');
});
