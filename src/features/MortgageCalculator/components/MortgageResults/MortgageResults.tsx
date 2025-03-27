import emptyImage from "@/assets/images/illustration-empty.svg";
import "./MortgageResults.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function MortgageResults() {
    const formFilled = useSelector((state: RootState) => state.mortgage.formFilled);

    return (
        <section className="mortgage-results">
            {formFilled ? (
                <MortgageResultsFilled/>
            ) : (
                <MortgageResultsEmpty/>
            )}
        </section>
    );
}

function MortgageResultsEmpty() {
    return (
        <div className="mortgage-results__empty">
            <img src={emptyImage} alt="" role="presentation"/>

            <h2 className="heading-md text-white">
                Results shown here
            </h2>

            <p className="text-md text-slate-300 text-center">
                Complete the form and click “calculate repayments” to see what your monthly repayments would be.
            </p>
        </div>
    );
}

function MortgageResultsFilled() {
    const monthlyRepayment = useSelector((state: RootState) => state.mortgage.monthlyRepayment);
    const totalRepayment = useSelector((state: RootState) => state.mortgage.totalRepayment);

    return (
        <div className="mortgage-results__filled">
            <div className="mortgage-results__header">
                <h2 className="heading-md text-white">
                    Your results
                </h2>

                <p className="text-md text-slate-300">
                    Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments”
                    again.
                </p>
            </div>

            <div className="mortgage-results__results-containter">
                <div className="mortgage-results__text normal">
                    <h2 className="text-md text-slate-300 medium">Your monthly repayments</h2>
                    <p className="heading-lg text-lime bold">£{monthlyRepayment.toLocaleString()}</p>
                </div>

                <hr className="mortgage-results__divider"/>

                <div className="mortgage-results__text">
                    <h2 className="text-md text-slate-300 medium">Total you'll repay over the term</h2>
                    <p className="heading-md text-white bold">£{totalRepayment.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}