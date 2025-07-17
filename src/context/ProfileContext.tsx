import type { ProfileState, ProfileAction } from '@/utils/types';
import { createContext, useReducer, type ReactNode, type Dispatch } from 'react';

export const ProfileContext = createContext<ProfileState>({ role: null });
export const ProfileReducerContext = createContext<Dispatch<ProfileAction>>(() => { });

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'loggedIn':
      return { ...state, ...action.value };
    case 'loggedOut':
      return { role: null };
    default:
      return state;
  }
}

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(profileReducer, { role: null });

  return (
    <ProfileContext value={state}>
      <ProfileReducerContext value={dispatch}>
        {children}
      </ProfileReducerContext>
    </ProfileContext>
  );
}