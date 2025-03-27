import MortgageResults from "@/features/MortgageCalculator/components/MortgageResults";
import MortgageForm from "@/features/MortgageCalculator/components/MortgageForm";
import "./MortgageCalculator.scss";

export default function MortgageCalculator() {
    return (
        <main className="mortgage-repayment-calculator grid-bleed">
            <div className="mortgage-repayment-calculator__content">
                <MortgageForm/>

                <MortgageResults/>
            </div>
        </main>
    );
}