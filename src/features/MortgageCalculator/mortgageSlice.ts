import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mortgageAmount  : 0,
    mortgageTerm    : 0,
    mortgageInterest: 0,
    mortgageType    : "",
    formFilled      : false,
    monthlyRepayment: 0,
    totalRepayment: 0,
};

export const mortgageSlice = createSlice({
    name: "mortgage",
    initialState,
    reducers: {
        toggleFormFilledOn: (state) => {
            state.formFilled = true;
        },
        toggleFormFilledOff: (state) => {
            state.formFilled = false;
        },
        setMortgageValues: (state, action) => {
            Object.assign(state, action.payload);
        },
        calculateMortgageResults: (state) => {
            const { mortgageAmount, mortgageTerm, mortgageInterest, mortgageType } = state;

            const monthlyRate = mortgageInterest / 100 / 12;
            const numberOfPayments = mortgageTerm * 12;

            let calculatedMonthlyRepayment = 0;

            switch (mortgageType) {
                case "Repayment":
                    calculatedMonthlyRepayment =
                        mortgageAmount *
                        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                    break;
                case "Interest Only":
                    calculatedMonthlyRepayment = mortgageAmount * monthlyRate;
                    break;
                default:
                    return;
            }

            state.monthlyRepayment = parseFloat(calculatedMonthlyRepayment.toFixed(2));
            state.totalRepayment = parseFloat((calculatedMonthlyRepayment * numberOfPayments).toFixed(2));
            state.formFilled = true;
        },
    },
});

export const {toggleFormFilledOn, toggleFormFilledOff, setMortgageValues, calculateMortgageResults} = mortgageSlice.actions;
export default mortgageSlice.reducer;