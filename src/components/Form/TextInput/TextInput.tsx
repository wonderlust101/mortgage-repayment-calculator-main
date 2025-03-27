import { ChangeEvent, useRef } from "react";
import "./TextInput.scss";

type TextInputProps = {
    label: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
    name: string;
    unit?: string;
    unitPosition?: string;
    allowDecimal?: boolean;
};

export default function TextInput({label, error, value, onChange, name, unit, unitPosition, allowDecimal}: TextInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const formatNumber = (val: string, allowDecimal: boolean = false) => {
        let clean = val.replace(/,/g, "");

        if (allowDecimal) {
            clean = clean.replace(/[^\d.]/g, "");

            const parts = clean.split(".");
            if (parts.length > 2) {
                clean = parts[0] + "." + parts.slice(1).join("");
            }

            const [intPart, decimalPart] = clean.split(".");
            const formattedInt = parseInt(intPart || "0", 10).toLocaleString();

            return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
        } else {
            clean = clean.replace(/\D/g, "");
            return clean ? parseInt(clean, 10).toLocaleString() : "";
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formatted = formatNumber(rawValue, allowDecimal);
        onChange(formatted);
    };

    return (
        <div className="text-input">
            <label className="text-md medium text-slate-700" htmlFor={name}>{label}</label>
            <div className={`text-input__input-container ${!error || 'text-input__input-container--error'}`}>
                {unit && unitPosition === "left" && (
                    <p className={`text-input__unit ${!error || "text-input__unit--error"}`}>{unit}</p>
                )}

                <input
                    ref={inputRef}
                    className={`text-input__input`}
                    name={name}
                    id={name}
                    type="text"
                    inputMode="numeric"
                    value={value}
                    onChange={handleChange}
                />

                {unit && unitPosition === "right" && (
                    <p className={`text-input__unit ${!error || "text-input__unit--error"}`}>{unit}</p>
                )}
            </div>

            {error && <p className="text-input__error">{error}</p>}
        </div>
    );
}