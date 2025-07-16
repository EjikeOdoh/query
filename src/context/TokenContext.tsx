import type { TokenAction, TokenState } from '@/utils/types';
import { createContext, useReducer, type ReactNode, type Dispatch } from 'react';

export const TokenContext = createContext<string | null>(null);
export const TokenReducerContext = createContext<Dispatch<TokenAction>>(() => {});

function tokenReducer(state: TokenState, action: TokenAction): TokenState {
  switch (action.type) {
    case 'login':
      return { ...state, token: action.value };
    case 'logout':
      return { ...state, token: null };
    default:
      return state;
  }
}

export default function TokenProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tokenReducer, { token: null });

  return (
    <TokenContext value={state.token}>
      <TokenReducerContext value={dispatch}>
        {children}
      </TokenReducerContext>
    </TokenContext>
  );
}