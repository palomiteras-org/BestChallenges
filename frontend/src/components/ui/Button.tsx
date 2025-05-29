import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  as?: React.ElementType;
  to?: string;
  disabled?: boolean;
  rounded?: boolean;
  gradient?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const getVariantStyles = (variant: ButtonVariant, gradient: boolean, theme: any) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${gradient ? theme.colors.primary.gradient : theme.colors.primary.main};
        color: ${theme.colors.primary.contrastText};
        &:hover:not(:disabled) {
          background: ${gradient 
            ? `linear-gradient(135deg, ${theme.colors.primary.dark} 0%, ${theme.colors.primary.main} 100%)`
            : theme.colors.primary.dark};
          transform: translateY(-2px);
          box-shadow: 0 6px 10px rgba(242, 115, 21, 0.3);
        }
        &:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: none;
        }
        &:disabled {
          background: ${theme.colors.neutral[300]};
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      `;
    case 'secondary':
      return css`
        background: ${gradient ? theme.colors.secondary.gradient : theme.colors.secondary.main};
        color: ${theme.colors.secondary.contrastText};
        &:hover:not(:disabled) {
          background: ${gradient 
            ? `linear-gradient(135deg, ${theme.colors.secondary.dark} 0%, ${theme.colors.secondary.main} 100%)`
            : theme.colors.secondary.dark};
          transform: translateY(-2px);
          box-shadow: 0 6px 10px rgba(14, 165, 233, 0.3);
        }
        &:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: none;
        }
        &:disabled {
          background: ${theme.colors.neutral[300]};
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      `;
    case 'accent':
      return css`
        background: ${gradient ? theme.colors.accent.gradient : theme.colors.accent.main};
        color: ${theme.colors.accent.contrastText};
        &:hover:not(:disabled) {
          background: ${gradient 
            ? `linear-gradient(135deg, ${theme.colors.accent.dark} 0%, ${theme.colors.accent.main} 100%)`
            : theme.colors.accent.dark};
          transform: translateY(-2px);
          box-shadow: 0 6px 10px rgba(139, 92, 246, 0.3);
        }
        &:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: none;
        }
        &:disabled {
          background: ${theme.colors.neutral[300]};
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.neutral[800]};
        border: 2px solid ${theme.colors.neutral[300]};
        &:hover:not(:disabled) {
          border-color: ${theme.colors.primary.main};
          color: ${theme.colors.primary.main};
          background-color: rgba(249, 115, 22, 0.05);
          transform: translateY(-2px);
        }
        &:active:not(:disabled) {
          transform: translateY(1px);
        }
        &:disabled {
          color: ${theme.colors.neutral[400]};
          border-color: ${theme.colors.neutral[200]};
          cursor: not-allowed;
          transform: none;
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${theme.colors.neutral[800]};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.neutral[100]};
          color: ${theme.colors.primary.main};
          transform: translateY(-2px);
        }
        &:active:not(:disabled) {
          transform: translateY(1px);
        }
        &:disabled {
          color: ${theme.colors.neutral[400]};
          cursor: not-allowed;
          transform: none;
        }
      `;
    default:
      return css``;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      `;
    case 'lg':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      `;
    case 'md':
    default:
      return css`
        padding: 0.5rem 1.25rem;
        font-size: 1rem;
      `;
  }
};

// Base button styles
const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
  $rounded: boolean;
  $gradient: boolean;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ $rounded, theme }) => $rounded ? theme.radii.full : theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border: none;
  cursor: pointer;
  outline: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  
  ${({ $variant, $gradient, theme }) => getVariantStyles($variant, $gradient, theme)}
  ${({ $size }) => getSizeStyles($size)}

  /* Additional padding adjustments for icons */
  padding-left: ${({ $hasLeftIcon, $size }) => $hasLeftIcon ? ($size === 'lg' ? '1.25rem' : $size === 'sm' ? '0.625rem' : '1rem') : undefined};
  padding-right: ${({ $hasRightIcon, $size }) => $hasRightIcon ? ($size === 'lg' ? '1.25rem' : $size === 'sm' ? '0.625rem' : '1rem') : undefined};
  
  /* Optional ripple effect */
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: ${({ theme }) => theme.radii.full};
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme, $variant }) => 
      $variant === 'primary' 
        ? `${theme.colors.primary.main}40` 
        : $variant === 'secondary' 
          ? `${theme.colors.secondary.main}40` 
          : $variant === 'accent' 
            ? `${theme.colors.accent.main}40` 
            : `${theme.colors.neutral[300]}40`};
  }
  
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: wait;
      opacity: 0.8;
    `}
    
  /* For accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

// Link styled as a button
const StyledLink = styled(Link)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $rounded: boolean;
  $gradient: boolean;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ $rounded, theme }) => $rounded ? theme.radii.full : theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  
  ${({ $variant, $gradient, theme }) => getVariantStyles($variant, $gradient, theme)}
  ${({ $size }) => getSizeStyles($size)}
  
  /* Additional padding adjustments for icons */
  padding-left: ${({ $hasLeftIcon, $size }) => $hasLeftIcon ? ($size === 'lg' ? '1.25rem' : $size === 'sm' ? '0.625rem' : '1rem') : null};
  padding-right: ${({ $hasRightIcon, $size }) => $hasRightIcon ? ($size === 'lg' ? '1.25rem' : $size === 'sm' ? '0.625rem' : '1rem') : null};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme, $variant }) => 
      $variant === 'primary' 
        ? `${theme.colors.primary.main}40` 
        : $variant === 'secondary' 
          ? `${theme.colors.secondary.main}40` 
          : $variant === 'accent' 
            ? `${theme.colors.accent.main}40` 
            : `${theme.colors.neutral[300]}40`};
  }
  
  /* For accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  as,
  to,
  disabled,
  rounded = false,
  gradient = false,
  iconLeft,
  iconRight,
  onClick,
  type = 'button',
  ...props
}) => {
  if (as === Link && to) {
    return (
      <StyledLink
        to={to}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $rounded={rounded}
        $gradient={gradient}
        $hasLeftIcon={!!iconLeft}
        $hasRightIcon={!!iconRight}
        {...props}
      >
        {iconLeft && <span className="button-icon-left">{iconLeft}</span>}
        {children}
        {iconRight && <span className="button-icon-right">{iconRight}</span>}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      $rounded={rounded}
      $gradient={gradient}
      $hasLeftIcon={!!iconLeft || isLoading}
      $hasRightIcon={!!iconRight}
      {...props}
    >
      {isLoading ? <Spinner /> : iconLeft && <span className="button-icon-left">{iconLeft}</span>}
      {children}
      {iconRight && <span className="button-icon-right">{iconRight}</span>}
    </StyledButton>
  );
};

export default Button;
