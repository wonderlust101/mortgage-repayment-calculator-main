import { BrowserRouter, Route, Routes } from "react-router-dom";
import MortgageCalculator from "@/features/MortgageCalculator";
import '@/assets/styles/globals.scss'

const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<MortgageCalculator/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App