import { HTMLAttributes, ReactNode } from "react";
import "./Form.scss";

type FormProps = HTMLAttributes<HTMLFormElement>&{
    children: ReactNode;
    legend?: string;
    showLegend?: boolean;
}

export default function Form({children, legend, showLegend = false, ...props}: FormProps) {
    return (
        <form className="form" {...props}>
            <fieldset className="form__field-set">
                {legend &&
                    <legend className={showLegend ? "" : "sr-only"}>{legend}</legend>
                }

                {children}
            </fieldset>
        </form>
    );
}