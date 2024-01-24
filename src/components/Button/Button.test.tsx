import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Button from './Button';
import jest from 'jest-mock';

const upgradeName = 'SYNTHESIZE ALGORITHM';
const upgradeCost = '10 Processing Cores';
const onClickMock = jest.fn();

describe('#RenderButton', () => {
  afterEach(() => {
    onClickMock.mockClear();
  });

  it('renders enabled button with proper text', async () => {
    render(
      <Button
        upgradeName={upgradeName}
        upgradeCost={upgradeCost}
        onClick={onClickMock}
        disabled={false}
      />,
    );

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(upgradeName);
    expect(buttonElement).toHaveTextContent(upgradeCost);
    expect(buttonElement).toBeEnabled();

    await userEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('renders disabled button with proper text', async () => {
    render(
      <Button
        upgradeName={upgradeName}
        upgradeCost={upgradeCost}
        onClick={onClickMock}
        disabled={true}
      />,
    );

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(upgradeName);
    expect(buttonElement).toHaveTextContent(upgradeCost);
    expect(buttonElement).toBeDisabled();

    await userEvent.click(buttonElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
