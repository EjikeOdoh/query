import type { ProfileState, ProfileAction } from '@/utils/types';
import { createContext, useReducer, type ReactNode, type Dispatch } from 'react';

export const ProfileContext = createContext<string | null>(null);
export const ProfileReducerContext = createContext<Dispatch<ProfileAction>>(() => {});

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'loggedIn':
      return { ...state, ...action.value };
    case 'loggedOut':
      return { ...state, role: null };
    default:
      return state;
  }
}

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tokenReducer, { token: null });

  return (
    <TokenContext value={state.token}>
      <TokenReducerContext value={dispatch}>
        {children}
      </TokenReducerContext>
    </TokenContext>
  );
}