import { AuthStatus } from '@/types';
import { atom } from 'jotai';

const AuthAtom = atom<AuthStatus>({ isLoggedIn: false });

export default AuthAtom;
