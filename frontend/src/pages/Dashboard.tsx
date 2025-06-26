import React from 'react';
import Header from '../components/Header';
import { Button, Card } from '../components/ui';
import { ContentContainer, Logo, CardsWrapper, TopCardsRow, ProfileCardContent, FriendsCardContent, ChallengesCardContent } from './Dashboard.styles';
import { profileData, friendsData, challengesData } from './Dashboard.logic';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <ContentContainer>
          <Logo>Dashboard</Logo>
          <CardsWrapper>
            <TopCardsRow>
              {/* Profile Card */}
              <Card hoverEffect shadow="lg" padding="lg">
                <h3>Profile</h3>
                <ProfileCardContent>
                  <div><strong>Points:</strong> {profileData.points}</div>
                  <div><strong>Perseverance:</strong> {profileData.perseverance}</div>
                  <div><strong>Level:</strong> {profileData.level}</div>
                  <div><strong>Resistance Points:</strong> {profileData.resistance_points}</div>
                  <div><strong>Mind Points:</strong> {profileData.mind_points}</div>
                  <div><strong>Force Points:</strong> {profileData.force_points}</div>
                  <div><strong>Flexibility Points:</strong> {profileData.flexibility_points}</div>
                </ProfileCardContent>
              </Card>
              {/* Friends Card */}
              <Card hoverEffect shadow="lg" padding="lg">
                <h3>Friends</h3>
                <FriendsCardContent>
                  <div>You have <strong>{friendsData.count}</strong> friends</div>
                  <div>
                    <Button variant="primary" size="sm">View Friends</Button>
                  </div>
                </FriendsCardContent>
              </Card>
            </TopCardsRow>
            <div>
              {/* Challenges Card */}
              <Card hoverEffect shadow="lg" padding="lg">
                <h3>Challenges</h3>
                <ChallengesCardContent>
                  <div>You are in <strong>{challengesData.count}</strong> challenges</div>
                  <div>
                    <Button variant="accent" size="sm">View Challenges</Button>
                  </div>
                </ChallengesCardContent>
              </Card>
            </div>
          </CardsWrapper>
        </ContentContainer>
      </div>
    </>
  );
};

export default Dashboard;
