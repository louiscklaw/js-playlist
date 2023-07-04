import { useContext } from 'react';
import { UserContext } from '../contexts/user-context';
// import { AuthContext } from '../contexts/auth-context';

export const useUser = () => useContext(UserContext);
