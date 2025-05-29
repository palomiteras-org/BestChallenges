import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Button, Card } from './components/ui';
import styled from 'styled-components';

// Modern page layout components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.neutral[50]} 0%, ${({ theme }) => theme.colors.neutral[100]} 100%);
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 36rem;
  text-align: center;
  animation: fadeIn 0.5s ease-out forwards;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.space.md};
  text-transform: uppercase;
  letter-spacing: -1px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 30%;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary.gradient};
    bottom: -8px;
    left: 35%;
    border-radius: ${({ theme }) => theme.radii.full};
  }
`;

const HeadingText = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.neutral[600]};
  margin-bottom: ${({ theme }) => theme.space.lg};
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.lg};
`;

// Home component with authentication status
const Home = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <Card hoverEffect glass padding="lg">
          <Logo>BestChallenges</Logo>
          <HeadingText>Cycling Challenges Platform</HeadingText>
          <Text>
            Welcome to BestChallenges, a platform for creating and tracking cycling challenges.
            Join our community of cycling enthusiasts and push your limits.
          </Text>
          <ButtonContainer>
            <Button
              as={Link}
              to="/login"
              variant="primary"
              gradient
              size="lg"
              iconRight={<span>→</span>}
            >
              Sign In
            </Button>
          </ButtonContainer>
        </Card>
      </ContentContainer>
    </PageContainer>
  );
};

// Dashboard component (protected)
const Dashboard = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <Card hoverEffect shadow="lg" padding="lg">
          <Logo>Dashboard</Logo>
          <Text>
            Welcome to your dashboard! Track your cycling challenges, view statistics,
            and connect with other cyclists. This page is protected and only accessible when you're logged in.
          </Text>
          <ButtonContainer>
            <Button
              as={Link}
              to="/"
              variant="secondary"
              gradient
              iconLeft={<span>←</span>}
            >
              Back to Home
            </Button>
            <Button variant="accent" gradient>
              View Challenges
            </Button>
          </ButtonContainer>
        </Card>
      </ContentContainer>
    </PageContainer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
