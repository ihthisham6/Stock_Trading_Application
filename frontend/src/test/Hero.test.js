import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../landing_page/home/Hero.jsx';
import '@testing-library/jest-dom';


//Test Suite

describe('Hero Component', () => {
  test('Renders Hero Image', () => {
    render(<Hero />);
    const heroImage = screen.getByAltText('Hero Image');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', 'media/images/homeHero.png');
  });


 test('Renders Signup Button', () => {
    render(<Hero />);
    const signupButton = screen.getByRole('button', { name: /signup now/i });
    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toHaveClass('btn btn-primary');
  });
});