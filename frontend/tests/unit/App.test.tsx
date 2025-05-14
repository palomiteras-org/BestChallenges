import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../src/App';

describe('App component', () => {
  test('renders the welcome message', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check if the title is rendered
    expect(screen.getByText('BestChallenges')).toBeInTheDocument();
    
    // Check if the welcome message is rendered
    expect(
      screen.getByText('Welcome to BestChallenges, a platform for creating and tracking cycling challenges.')
    ).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(
      screen.getByText('This is a demo application built with React, TypeScript, and FastAPI.')
    ).toBeInTheDocument();
  });
});