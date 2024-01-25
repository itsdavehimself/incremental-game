import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('#RenderButton', () => {
  it('renders the initial state of the app', () => {
    render(<App />);

    const integrateButton = screen.getByRole('button');

    expect(integrateButton).toBeInTheDocument();
    expect(integrateButton).toHaveTextContent('INTEGRATE');
  });

  it('reveals the first two letters of the resource dislay items after clicking button', async () => {
    render(<App />);
    const integrateButton = screen.getByRole('button');
    await userEvent.click(integrateButton);

    await waitFor(() => {
      const scrambledDataTitle = screen.getByRole('heading', {
        name: /DA/i,
      });
      const dataTextContent = scrambledDataTitle?.textContent ?? '';
      expect(dataTextContent).toMatch(/^DA/);

      const scrambledSpeedTitle = screen.getByRole('heading', {
        name: /SP/i,
      });
      const speedTextContent = scrambledSpeedTitle?.textContent ?? '';
      expect(speedTextContent).toMatch(/^SP/);

      const scrambledBandwidthTitle = screen.getByRole('heading', {
        name: /BA/i,
      });
      const bandwidthTextContent = scrambledBandwidthTitle?.textContent ?? '';
      expect(bandwidthTextContent).toMatch(/^BA/);

      const scrambledProcessingTitle = screen.getByRole('heading', {
        name: /PR/i,
      });
      const processorTextContent = scrambledProcessingTitle?.textContent ?? '';
      expect(processorTextContent).toMatch(/^PR/);
    });
  });

  it('reveals the first four letters of the resource dislay items after clicking button twice', async () => {
    render(<App />);
    const integrateButton = screen.getByRole('button');
    for (let i = 0; i < 2; i++) {
      await userEvent.click(integrateButton);
    }

    await waitFor(() => {
      const scrambledDataTitle = screen.getByRole('heading', {
        name: /DATA/i,
      });
      const dataTextContent = scrambledDataTitle?.textContent ?? '';
      expect(dataTextContent).toMatch(/^DATA/);

      const scrambledSpeedTitle = screen.getByRole('heading', {
        name: /SPEE/i,
      });
      const speedTextContent = scrambledSpeedTitle?.textContent ?? '';
      expect(speedTextContent).toMatch(/^SPEE/);

      const scrambledBandwidthTitle = screen.getByRole('heading', {
        name: /BAND/i,
      });
      const bandwidthTextContent = scrambledBandwidthTitle?.textContent ?? '';
      expect(bandwidthTextContent).toMatch(/^BAND/);

      const scrambledProcessingTitle = screen.getByRole('heading', {
        name: /PROC/i,
      });
      const processorTextContent = scrambledProcessingTitle?.textContent ?? '';
      expect(processorTextContent).toMatch(/^PROC/);
    });
  });

  it('reveals console message after 7 integrate button clicks', async () => {
    render(<App />);
    const integrateButton = screen.getByRole('button');
    for (let i = 0; i < 7; i++) {
      await userEvent.click(integrateButton);
    }

    await waitFor(() => {
      const consoleMessage = screen.getByText(
        'In this ocean of data, reflecting back is genesis...',
      );
      expect(consoleMessage).toBeInTheDocument();
    });
  });

  it('integrate button changes to say synthesize algorithm after 10 clicks', async () => {
    render(<App />);
    const integrateButton = screen.getByRole('button');

    for (let i = 0; i < 10; i++) {
      await userEvent.click(integrateButton);
    }

    await waitFor(() => {
      expect(integrateButton).toHaveTextContent('SYNTHESIZE ALGORITHM');
    });
  });

  it('reveal navbar and main game buttons after 11 clicks', async () => {
    render(<App />);
    const integrateButton = screen.getByRole('button');

    for (let i = 0; i < 11; i++) {
      await userEvent.click(integrateButton);
    }

    await waitFor(() => {
      expect(integrateButton).toHaveTextContent(
        'SYNTHESIZE ALGORITHM(6 Processing Cores)',
      );

      const replenishButton = screen.getByRole('button', {
        name: /REPLENISH BANDWIDTH/i,
      });

      const exeButton = screen.getByRole('button', {
        name: /CREATE .EXE BINARY/i,
      });

      const navbar = screen.getByRole('navigation');

      expect(replenishButton).toBeInTheDocument();
      expect(exeButton).toBeInTheDocument();
      expect(navbar).toBeInTheDocument();
    });
  });
});
