import { fireEvent, render } from '@testing-library/react';

import { Button, LinkButton } from '../Button';

describe('Button', () => {
  const btnText = 'Click me';
  it('renders', () => {
    const { getByText } = render(
      <Button size="small" label="Click me" varient="primary" disabled={false} />
    );
    expect(getByText(btnText)).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { getByText } = render(
      <Button size="small" label="Click me" varient="primary" disabled={false} />
    );
    expect(getByText(btnText)).toHaveClass('py-1 px-2 text-sm gap-1');
    expect(getByText(btnText).classList.contains('border-transparent')).toBeTruthy();
    expect(getByText(btnText)).not.toBeDisabled();
  });

  it('renders with different varients', () => {
    const handleClick = jest.fn(() => null);
    const { getByText } = render(
      <Button
        size="medium"
        label="Click me"
        varient="primary"
        disabled={false}
        handleClick={handleClick}
      />
    );
    const btnElement = getByText(btnText);
    expect(getByText(btnText)).toHaveClass('bg-blue-600 text-white');
    fireEvent.click(btnElement);
    expect(handleClick).toHaveBeenCalled();

    expect(getByText(btnText).classList.contains('border-transparent')).toBeTruthy();

    render(
      <Button
        size="large"
        label="Click me"
        varient="secondary"
        disabled={false}
        handleClick={handleClick}
      />
    );
  });
});

describe('LinkButton', () => {
  const btnText = 'Click me';
  it('renders', () => {
    const { getByText } = render(
      <LinkButton href="/" title="Click me" icon={() => <div>Icon</div>} />
    );
    expect(getByText(btnText)).toBeInTheDocument();
  });
});
