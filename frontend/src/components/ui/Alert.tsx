import React from 'react';
import styled, { css } from 'styled-components';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: AlertVariant;
  className?: string;
}

const getAlertStyles = (variant: AlertVariant, theme: any) => {
  switch (variant) {
    case 'info':
      return css`
        background-color: ${theme.colors.secondary.main}15;
        border-color: ${theme.colors.secondary.main};
        .alert-title {
          color: ${theme.colors.secondary.dark};
        }
        .alert-content {
          color: ${theme.colors.secondary.dark};
        }
        .alert-icon {
          color: ${theme.colors.secondary.main};
        }
      `;
    case 'success':
      return css`
        background-color: ${theme.colors.success}15;
        border-color: ${theme.colors.success};
        .alert-title {
          color: ${theme.colors.success};
        }
        .alert-content {
          color: ${theme.colors.success};
        }
        .alert-icon {
          color: ${theme.colors.success};
        }
      `;
    case 'warning':
      return css`
        background-color: ${theme.colors.warning}15;
        border-color: ${theme.colors.warning};
        .alert-title {
          color: ${theme.colors.warning};
        }
        .alert-content {
          color: ${theme.colors.warning};
        }
        .alert-icon {
          color: ${theme.colors.warning};
        }
      `;
    case 'error':
      return css`
        background-color: ${theme.colors.error}15;
        border-color: ${theme.colors.error};
        .alert-title {
          color: ${theme.colors.error};
        }
        .alert-content {
          color: ${theme.colors.error};
        }
        .alert-icon {
          color: ${theme.colors.error};
        }
      `;
    default:
      return css``;
  }
};

const StyledAlert = styled.div<{ $variant: AlertVariant }>`
  display: flex;
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border-left: 4px solid;
  
  ${({ $variant, theme }) => getAlertStyles($variant, theme)}
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.space.sm};
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.space.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const getAlertIcon = (variant: AlertVariant) => {
  switch (variant) {
    case 'info':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case 'success':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case 'warning':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'error':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    default:
      return null;
  }
};

const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  className,
}) => {
  return (
    <StyledAlert $variant={variant} className={className}>
      <IconContainer>
        {getAlertIcon(variant)}
      </IconContainer>
      <ContentContainer>
        {title && <Title className="alert-title">{title}</Title>}
        <Content className="alert-content">{children}</Content>
      </ContentContainer>
    </StyledAlert>
  );
};

export default Alert;
