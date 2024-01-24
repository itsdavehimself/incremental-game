import { render, screen, fireEvent } from '@testing-library/react';
import jest from 'jest-mock';
import GameOverModal from './GameOverModal';

describe('#GameOverModal', () => {
  it('renders game over modal', () => {
    render(<GameOverModal setGameState={() => {}} />);

    const headerElement = screen.getByText('DATA INTEGRATED: 1TB');
    const congratsElement = screen.getByText(
      `Congratulations! You've reached the end of the game (for now).`,
    );
    const descriptionElement = screen.getByText(
      `This project was developed as an experiment in TypeScript and Sass and I've had a blast creating it.`,
    );
    const hearFromYouElement = screen.getByText(
      `I plan to expand the game and the lore over time and would love to hear from you!`,
    );

    expect(headerElement).toBeInTheDocument();
    expect(congratsElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(hearFromYouElement).toBeInTheDocument();
  });

  it('calls resetGame when play again button is clicked', () => {
    render(<GameOverModal setGameState={() => {}} />);
    const setResetGameMock = jest.fn();

    const playAgainButton = screen.getByText('PLAY AGAIN');
    fireEvent.click(playAgainButton);
    expect(setResetGameMock).toHaveBeenCalled();
  });
});
