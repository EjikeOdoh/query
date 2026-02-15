/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, type Dispatch, type ReactNode } from "react";

export const CurrentYearContext = createContext<number>(0);
export const CurrentYearReducerContext = createContext<Dispatch<{ type: string; value?: number }>>(() => { });

function currentYearReducer(state: number, action: { type: string; value?: number }): number {
    switch (action.type) {
        case 'set':
            return action.value ?? state;
        default:
            return state;
    }
}

export default function CurrentYearProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(currentYearReducer, 0);

    return (
        <CurrentYearContext.Provider value={state}>
            <CurrentYearReducerContext.Provider value={dispatch}>
                {children}
            </CurrentYearReducerContext.Provider>
        </CurrentYearContext.Provider>
    );
}