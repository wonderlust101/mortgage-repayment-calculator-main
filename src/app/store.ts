import {configureStore} from "@reduxjs/toolkit";
import mortgageReducer from '@/features/MortgageCalculator/mortgageSlice';

export const store = configureStore({
    reducer: {
        mortgage: mortgageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;