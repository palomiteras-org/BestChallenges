import React from 'react';
import styled from 'styled-components';

type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type PaddingSize = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: ShadowSize;
  padding?: PaddingSize;
  hoverEffect?: boolean;
  bordered?: boolean;
  glass?: boolean;
}

const getShadow = (shadowSize: ShadowSize, theme: any) => {
  switch (shadowSize) {
    case 'none':
      return theme.shadows.none;
    case 'sm':
      return theme.shadows.sm;
    case 'lg':
      return theme.shadows.lg;
    case 'xl':
      return theme.shadows.xl;
    case 'md':
    default:
      return theme.shadows.md;
  }
};

const getPadding = (paddingSize: PaddingSize, theme: any) => {
  switch (paddingSize) {
    case 'none':
      return '0';
    case 'sm':
      return theme.space.sm;
    case 'lg':
      return theme.space.lg;
    case 'md':
    default:
      return theme.space.md;
  }
};

const StyledCard = styled.div<{
  $shadow: ShadowSize;
  $padding: PaddingSize;
  $hoverEffect: boolean;
  $bordered: boolean;
  $glass: boolean;
}>`
  position: relative;
  background-color: ${({ $glass, theme }) => $glass ? theme.colors.glass : 'white'};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ $shadow, theme }) => getShadow($shadow, theme)};
  padding: ${({ $padding, theme }) => getPadding($padding, theme)};
  border: ${({ $bordered, theme }) => $bordered ? `1px solid ${theme.colors.neutral[200]}` : 'none'};
  transition: ${({ theme }) => theme.transitions.default};
  overflow: hidden;
  
  ${({ $glass }) => $glass && `
    backdrop-filter: blur(10px);
  `}

  ${({ $hoverEffect, theme }) => $hoverEffect && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${theme.shadows.xl};
    }
  `}
  
  /* Add subtle decorative element to some cards */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary.gradient};
    border-radius: ${({ theme }) => theme.radii.none} ${({ theme }) => theme.radii.none} 0 0;
    opacity: 0.8;
  }
`;

const Card: React.FC<CardProps> = ({
  children,
  className,
  shadow = 'md',
  padding = 'md',
  hoverEffect = false,
  bordered = true,
  glass = false,
  ...props
}) => {
  return (
    <StyledCard
      className={className}
      $shadow={shadow}
      $padding={padding}
      $hoverEffect={hoverEffect}
      $bordered={bordered}
      $glass={glass}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
