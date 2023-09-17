import React from 'react';
import { render, screen } from '@testing-library/react';
import {Lot} from '../../Lot';

test('renders learn react link', () => {
  render(<Lot />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
