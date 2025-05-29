import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const IconContainer = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) =>
    $position === 'left'
      ? css`
          left: ${({ theme }) => theme.space.sm};
        `
      : css`
          right: ${({ theme }) => theme.space.sm};
        `}
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const StyledInput = styled.input<{
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
  $hasError: boolean;
}>`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ $hasError, theme }) => 
    $hasError ? theme.colors.error : theme.colors.neutral[300]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.neutral[900]};
  background-color: white;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  ${({ $hasLeftIcon, theme }) =>
    $hasLeftIcon &&
    css`
      padding-left: ${theme.space.xl};
    `}
  
  ${({ $hasRightIcon, theme }) =>
    $hasRightIcon &&
    css`
      padding-right: ${theme.space.xl};
    `}
  
  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ $hasError, theme }) =>
      $hasError ? `${theme.colors.error}20` : `${theme.colors.primary.main}20`};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[500]};
    cursor: not-allowed;
  }
`;

const HelperText = styled.p<{ $isError: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.space.xs};
  color: ${({ $isError, theme }) =>
    $isError ? theme.colors.error : theme.colors.neutral[500]};
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    helperText,
    error,
    fullWidth = true,
    leftIcon,
    rightIcon,
    id,
    className,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <InputWrapper $fullWidth={fullWidth} className={className}>
        {label && <Label htmlFor={inputId}>{label}</Label>}

        <InputContainer>
          {leftIcon && (
            <IconContainer $position="left">
              {leftIcon}
            </IconContainer>
          )}

          <StyledInput
            ref={ref}
            id={inputId}
            $hasLeftIcon={!!leftIcon}
            $hasRightIcon={!!rightIcon}
            $hasError={!!error}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <IconContainer $position="right">
              {rightIcon}
            </IconContainer>
          )}
        </InputContainer>

        {(helperText || error) && (
          <HelperText
            $isError={!!error}
            id={error ? `${inputId}-error` : `${inputId}-helper`}
          >
            {error || helperText}
          </HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;
