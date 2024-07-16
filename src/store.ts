import { createContextProvider } from '@solid-primitives/context';
import { createStore } from 'solid-js/store';

export interface AppState {
    show: boolean;
}

export const INITIAL_STATE: AppState = {
    show: false,
};

const devData: Partial<AppState> = {
    show: true,
};

export const [ContextProvider, useState] = createContextProvider(
    () => {
        const inital = import.meta.env.MODE === 'development' ? { ...INITIAL_STATE, ...devData } : INITIAL_STATE;
        const [state, setState] = createStore<AppState>(inital);
        return {
            state,
            setState,
        };
    },
    {
        state: INITIAL_STATE,
        setState: () => {},
    },
);
