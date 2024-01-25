import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import jest from 'jest-mock';
import GameOverModal from './GameOverModal';

describe('#GameOverModal', () => {
  it('renders the game over modal', async () => {
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

    const playAgainButton = screen.getByRole('button', { name: 'PLAY AGAIN' });

    const thanksForPlayingElement = screen.getByText(
      'Thanks for playing re:member.',
    );

    expect(headerElement).toBeInTheDocument();
    expect(congratsElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(hearFromYouElement).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'LEAVE FEEDBACK' }),
    ).toHaveAttribute('href', 'https://forms.gle/eesju1KKNqSLET1c7');
    expect(
      screen.getByRole('link', { name: 'GITHUB REPOSITORY' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/itsdavehimself/incremental-game',
    );
    expect(playAgainButton).toBeInTheDocument();
    expect(thanksForPlayingElement).toBeInTheDocument;
  });

  it('clicks the play again button and calls setter prop function', async () => {
    const mockSetGameState = jest.fn();
    render(<GameOverModal setGameState={mockSetGameState} />);

    const playAgainButton = screen.getByRole('button', {
      name: 'PLAY AGAIN',
    });
    expect(playAgainButton).toBeInTheDocument();
    await userEvent.click(playAgainButton);
    expect(mockSetGameState).toHaveBeenCalled();
  });
});
