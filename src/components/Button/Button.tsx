import { HTMLAttributes, ReactNode } from "react";
import './Button.scss'

type ButtonProps = HTMLAttributes<HTMLButtonElement> &{
    children?: ReactNode;
    color: string;
    size: string;
};

export default function Button({children, color, size, ...props}: ButtonProps) {
    return (
        <button className={`button button--${color} button--${size}`} {...props}>
            {children}
        </button>
    );
}