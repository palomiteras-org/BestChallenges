import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Alert, Card } from '../components/ui';
import styled from 'styled-components';

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
  max-width: 32rem;
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

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.space.md};
  text-transform: uppercase;
  letter-spacing: -1px;
  display: inline-block;
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutral[800]};
  margin: ${({ theme }) => theme.space.sm} 0;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.lg};
`;

const LoginCard = styled(Card)`
  border-radius: ${({ theme }) => theme.radii['2xl']};
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.secondary.main};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary.dark};
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ usernameOrEmail?: string; password?: string }>({});
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  // Validate form inputs
  const validateForm = (): boolean => {
    const errors: { usernameOrEmail?: string; password?: string } = {};
    let isValid = true;

    if (!usernameOrEmail.trim()) {
      errors.usernameOrEmail = 'Username or email is required';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(usernameOrEmail, password);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      // Error is handled in the AuthContext
      console.error('Login failed:', err);
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Header>
          <Logo to="/">BestChallenges</Logo>
          <Title>Welcome back</Title>
          <Subtitle>Sign in to access your account</Subtitle>
        </Header>

        {error && (
          <Alert variant="error" title="Authentication Error">
            {error}
          </Alert>
        )}

        <LoginCard shadow="lg" hoverEffect>
          <Form onSubmit={handleSubmit}>
            <Input
              id="usernameOrEmail"
              label="Username or Email"
              name="usernameOrEmail"
              type="text"
              autoComplete="username"
              required
              placeholder="Enter your username or email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              error={formErrors.usernameOrEmail}
            />

            <div>
              <Input
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={formErrors.password}
              />
              <ForgotPassword to="#">Forgot password?</ForgotPassword>
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              variant="primary"
              gradient
              size="lg"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Form>
        </LoginCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default Login;

