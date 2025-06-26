import styled from 'styled-components';

export const ContentContainer = styled.div`
  width: 100%;
  text-align: center;
  animation: fadeIn 0.5s ease-out forwards;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const Logo = styled.div`
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

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.neutral[600]};
  margin-bottom: ${({ theme }) => theme.space.lg};
  line-height: 1.6;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.lg};
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin: 2rem auto 0 auto;
  width: 80vw;
  max-width: 1200px;
  min-height: 350px;
  height: 80dvh;
`;

export const TopCardsRow = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  justify-content: center;
`;

export const BottomCardRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ProfileCardContent = styled.div`
  text-align: left;
  line-height: 1.8;
`;

export const FriendsCardContent = styled.div`
  text-align: left;
  line-height: 1.8;
  & > div:last-child {
    margin-top: 0.5rem;
  }
`;

export const ChallengesCardContent = styled.div`
  text-align: left;
  line-height: 1.8;
  & > div:last-child {
    margin-top: 0.5rem;
  }
`;
