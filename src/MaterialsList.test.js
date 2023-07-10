import { render, screen } from '@testing-library/react';
import MaterialsList from './MaterialsList';

const mockData = [
  {
    "id": "m057jc03z8",
    "name": "Sand",
    "volume": 102234,
    "cost": 0.1,
    "deliveryDate": "2023-12-10",
    "color": "#f7b500"
  },
  {
    "id": "ne3ifbjugc8",
    "name": "Gravel",
    "volume": 10000,
    "cost": 0.5,
    "deliveryDate": "2023-12-10",
    "color": "#00d7b7"
  }
];


test('renders the expected line items', () => {
  render(<MaterialsList materials={mockData} onClick={() => {}} selectedId={null} />);
  mockData.forEach((item) => {
    const row = screen.getByText(`${item.volume} m³`);
    expect(row).toBeInTheDocument();
  });
});

test('renders a defualt message if no items', () => {
  render(<MaterialsList materials={[]} onClick={() => {}} selectedId={null} />);
  const row = screen.getByText(`No materials`);
  expect(row).toBeInTheDocument();
});


test('calls a function when an item is clicked', () => {
  const clickSpy = jest.fn();
  render(<MaterialsList materials={mockData} onClick={clickSpy} selectedId={null} />);
  screen.getByText('Gravel').click();
  expect(clickSpy).toHaveBeenCalled();
});