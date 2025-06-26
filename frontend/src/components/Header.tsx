import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const UserInfo = styled.div`
  margin-left: 1.5rem;
  font-weight: 500;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.75rem;
  background: #fff;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 2rem;
  background: white;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  min-width: 180px;
  z-index: 100;
  padding: 0.5rem 0;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #f5f5f5;
  }
`;

const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Header: React.FC = () => {
  const { user, logout } = useAuth() || {};
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSettings = () => {
    setOpen(false);
    navigate('/settings');
  };

  const handleLogout = () => {
    setOpen(false);
    if (logout) logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Menu>
        <UserMenuContainer ref={menuRef} onClick={() => setOpen((v) => !v)}>
          <Avatar src={user?.icon || 'https://ui-avatars.com/api/?name=' + (user?.username || 'U')} alt="avatar" />
          <UserInfo>
            {user ? user.username || user.email : 'Not logged in'}
          </UserInfo>
          {open && (
            <Dropdown>
              <DropdownItem onClick={handleSettings}>Settings</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          )}
        </UserMenuContainer>
      </Menu>
    </HeaderContainer>
  );
};

export default Header;
