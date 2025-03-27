import { InputHTMLAttributes, ReactNode } from "react";
import "./Radio.scss";

type RadioType = {
    children: ReactNode;
    label: string;
    error?: string;
    required?: boolean;
}

type RadioItemType = InputHTMLAttributes<HTMLInputElement>&{
    children?: ReactNode;
    value: string;
    index: number;
    props?: InputHTMLAttributes<HTMLInputElement>
}

export default function Radio({children, label, error}: RadioType) {
    return (
        <div className="radio">
            <p className='text-md medium text-slate-700'>{label}</p>
            <div className="radio__group">{children}</div>
            {error && <p className="text-input__error">{error}</p>}
        </div>
    );
}

Radio.Item = function Radio({children, value, index, ...props}: RadioItemType) {
    return (
        <label id={props?.name ? props.name + index : index.toString()} className="radio__label">
            {children}
            <input
                className="radio__input"
                type="radio"
                value={value}
                {...props}
            />
        </label>
    );
};