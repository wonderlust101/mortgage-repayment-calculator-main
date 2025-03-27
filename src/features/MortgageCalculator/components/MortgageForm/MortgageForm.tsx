import { Controller } from "react-hook-form";
import Form from "@/components/Form";
import Button from "@/components/Button";
import TextInput from "@/components/Form/TextInput";
import Radio from "@/components/Form/Radio";
import "./MortgageForm.scss";
import useMortgageForm, { mortgageTypes } from "@/features/MortgageCalculator/components/MortgageForm/useMortgageForm";
import CalculatorIcon from "@/components/Icon/CalculatorIcon";

export default function MortgageForm() {
    const {
        control,
        errors,
        handleSubmit,
        onSubmit,
        handleClearAll
    } = useMortgageForm();

    return (
        <section className="mortgage-form">
            <div className="mortgage-form__header">
                <h1 className="heading-md">Mortgage Calculator</h1>
                <p className="mortgage-form__clear-all" onClick={handleClearAll}>Clear All</p>
            </div>

            <Form className="mortgage-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="mortgageAmount"
                    control={control}
                    render={({field}) => (
                        <TextInput
                            label="Mortgage Amount"
                            error={errors.mortgageAmount?.message}
                            value={field.value}
                            onChange={field.onChange}
                            name="mortgageAmount"
                            unit="£"
                            unitPosition="left"
                            allowDecimal
                        />
                    )}
                />

                <div className="mortgage-form__form-row">
                    <Controller
                        name="mortgageTerm"
                        control={control}
                        render={({field}) => (
                            <TextInput
                                label="Mortgage Terms"
                                error={errors.mortgageTerm?.message}
                                value={field.value}
                                onChange={field.onChange}
                                name="mortgageTerm"
                                unit="years"
                                unitPosition="right"
                            />
                        )}
                    />

                    <Controller
                        name="mortgageInterest"
                        control={control}
                        render={({field}) => (
                            <TextInput
                                label="Interest Rate"
                                error={errors.mortgageInterest?.message}
                                value={field.value}
                                onChange={field.onChange}
                                name="mortgageInterest"
                                unit="%"
                                unitPosition="right"
                                allowDecimal
                            />
                        )}
                    />
                </div>

                <Controller
                    name="mortgageType"
                    control={control}
                    render={({field}) => (
                        <Radio label="Mortgage Type" error={errors.mortgageType?.message} required>
                            {mortgageTypes.map((item, index) => (
                                <Radio.Item
                                    key={index}
                                    index={index}
                                    name={field.name}
                                    value={item}
                                    checked={field.value === item}
                                    onChange={() => field.onChange(item)}
                                >
                                    {item}
                                </Radio.Item>
                            ))}
                        </Radio>
                    )}
                />

                <Button color="lime" size="med">
                    <CalculatorIcon/>
                    Calculate Repayments
                </Button>
            </Form>
        </section>
    );
}