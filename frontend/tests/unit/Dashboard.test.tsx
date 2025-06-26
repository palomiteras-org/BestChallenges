import { render, screen } from '@testing-library/react';
import Dashboard from '../../src/pages/Dashboard';
import { vi } from 'vitest';

// Mock dependencies
vi.mock('../../src/components/Header', () => ({ default: () => <div data-testid="header" /> }));
vi.mock('../../src/components/ui', () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  Button: ({ children }: any) => <button>{children}</button>,
}));
vi.mock('../../src/pages/Dashboard.logic', () => ({
  profileData: {
    points: 1200,
    perseverance: 8,
    level: 5,
    resistance_points: 300,
    mind_points: 250,
    force_points: 350,
    flexibility_points: 300,
  },
  friendsData: { count: 12 },
  challengesData: { count: 4 },
}));


describe('Dashboard', () => {
  it('renders the dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the Profile card with correct fields', () => {
    render(<Dashboard />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText(/Points:/)).toBeInTheDocument();
    expect(screen.getByText(/Perseverance:/)).toBeInTheDocument();
    expect(screen.getByText(/Level:/)).toBeInTheDocument();
    expect(screen.getByText(/Resistance Points:/)).toBeInTheDocument();
    expect(screen.getByText(/Mind Points:/)).toBeInTheDocument();
    expect(screen.getByText(/Force Points:/)).toBeInTheDocument();
    expect(screen.getByText(/Flexibility Points:/)).toBeInTheDocument();
  });

  it('renders the Friends card', () => {
    render(<Dashboard />);
    expect(screen.getByText('Friends')).toBeInTheDocument();
    expect(screen.getByText(/You have/)).toBeInTheDocument();
  });

  it('renders the Challenges card', () => {
    render(<Dashboard />);
    expect(screen.getByText('Challenges')).toBeInTheDocument();
    expect(screen.getByText(/You are in/)).toBeInTheDocument();
  });
});

