import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2rem;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  background: #eee;
`;

const Info = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Value = styled.div`
  margin-bottom: 0.75rem;
`;

const ChangePasswordButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
`;

const Settings: React.FC = () => {
  const { user } = useAuth() || {};
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChangePassword = () => {
    alert('Change password functionality coming soon!');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Implement avatar upload logic here
      alert('Avatar change functionality coming soon!');
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={user?.avatar || user?.icon || 'https://ui-avatars.com/api/?name=' + (user?.username || 'U')}
          alt="avatar"
          style={{ cursor: 'pointer' }}
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
      </div>
      <Info>
        <Label>Name</Label>
        <Value>{user?.username || '-'}</Value>
        <Label>Email</Label>
        <Value>{user?.email || '-'}</Value>
      </Info>
      <ChangePasswordButton onClick={handleChangePassword}>
        Change Password
      </ChangePasswordButton>
    </Container>
  );
};

export default Settings;
