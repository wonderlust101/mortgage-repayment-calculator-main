import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateMortgageResults, setMortgageValues, toggleFormFilledOff } from "@/features/MortgageCalculator/mortgageSlice";
import { z } from "zod";

export const mortgageTypes: string[] = ["Repayment", "Interest Only"];

const MortgageFormSchema = z.object({
    mortgageAmount: z.string()
    .nonempty("Amount is required")
    .refine((val) => /^\d{1,3}(,\d{3})*$|^\d+$/.test(val), {
        message: "Amount must be a valid number"
    })
    .refine((val) => {
        const num = Number(val.replace(/,/g, ""));
        return num >= 1;
    }, {
        message: "Amount must be a positive number"
    }),

    mortgageTerm: z.string()
    .nonempty("Term is required")
    .refine((val) => /^\d{1,3}(,\d{3})*$|^\d+$/.test(val), {
        message: "Term must be a valid number"
    })
    .refine((val) => {
        const num = Number(val.replace(/,/g, ""));
        return num >= 1 && num <= 50;
    }, {
        message: "Term must be between 1 and 50 years"
    }),

    mortgageInterest: z.string()
    .nonempty("Interest rate is required")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.replace(/,/g, "")), {
        message: "Interest rate can have at most two decimal places"
    })
    .refine((val) => {
        const num = Number(val.replace(/,/g, ""));
        return num >= 0.01 && num <= 25;
    }, {
        message: "Interest rate must be between 0.01% and 25%"
    }),

    mortgageType: z.preprocess(
        (val) => typeof val === 'string' ? val : '',
        z.string().min(1, "Please select a mortgage type")
    )
});

export type MortgageFormType = z.infer<typeof MortgageFormSchema>;

export default function useMortgageForm() {
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<MortgageFormType>({
        resolver     : zodResolver(MortgageFormSchema),
        defaultValues: {
            mortgageAmount  : "",
            mortgageTerm    : "",
            mortgageInterest: "",
            mortgageType    : ""
        }
    });

    function onSubmit(data: MortgageFormType) {
        const parsedData = {
            mortgageAmount: Number(data.mortgageAmount.replace(/,/g, "")),
            mortgageTerm: Number(data.mortgageTerm.replace(/,/g, "")),
            mortgageInterest: Number(data.mortgageInterest.replace(/,/g, "")),
            mortgageType: data.mortgageType
        };

        dispatch(setMortgageValues(parsedData));
        dispatch(calculateMortgageResults());
    }

    function handleClearAll() {
        dispatch(toggleFormFilledOff());
        reset();
    }

    return {
        control,
        errors,
        handleSubmit,
        onSubmit,
        handleClearAll
    };
}