import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

test('renders the game board', () => {
    const { getByTestId } = render(<Game />);
    const gameBoard = getByTestId('game-board');
    expect(gameBoard).toBeInTheDocument();
});

test('renders the correct initial message', () => {
    const { getByText } = render(<Game />);
    const initialMessage = getByText(/Next Player is X/i);
    expect(initialMessage).toBeInTheDocument();
});

test('updates the game status when a square is clicked', () => {
    const { getByText } = render(<Game />);
    const square = getByText(/ /i); // assuming the squares are initially empty
    fireEvent.click(square);
    const newMessage = getByText(/Next Player is O/i);
    expect(newMessage).toBeInTheDocument();
});

test('allows the user to jump to a specific move', () => {
    const { getByText } = render(<Game />);
    const square = getByText(/ /i); // assuming the squares are initially empty
    fireEvent.click(square);
    const jumpButton = getByText(/Go to move # 1/i);
    fireEvent.click(jumpButton);
    const initialMessage = getByText(/Next Player is X/i);
    expect(initialMessage).toBeInTheDocument();
});

test('renders a list of moves', () => {
    const { getAllByRole } = render(<Game />);
    const listItems = getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
});
