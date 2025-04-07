import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LoanCalculator = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState(36);
  const [price, setPrice] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [results, setResults] = useState(null);
  const [calculated, setCalculated] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [incomeError, setIncomeError] = useState(false);
  const [incomeBasedResults, setIncomeBasedResults] = useState(null);
  const [showIncomeBasedTable, setShowIncomeBasedTable] = useState(false);

  const [priceEntered, setpriceentered] = useState(false);
  const [incomeEntered, setincomeentered] = useState(false);

  const getInterestRate = (term) => {
    if (term === 60) return 9.00;
    if (term === 48) return 8.75;
    return 8.50;
  };

  const getActualInterestRate = (term) => {
    if (term === 60) return 9.42794;
    if (term === 48) return 9.27238;
    return 9.1795;
  };

  const calculateFromIncome2 = (income) => {
    const interestRate = getActualInterestRate(term);
    const ratePerMonth = (interestRate / 100) / 12;
    const monthlyAmortization = income * 0.5;
    const loanAmount = (monthlyAmortization * (1 - Math.pow(1 + ratePerMonth, -term))) / ratePerMonth;
    const downPaymentOptions = [20, 30, 40];

    const resultData = downPaymentOptions.map((dp) => {
      const downPaymentAmount = Math.round((dp / 100) * loanAmount / (1 - dp / 100));
      const vehiclePrice = downPaymentAmount + loanAmount;
      const totalAmortization = Math.round(monthlyAmortization * term);

      return {
        dp,
        vehiclePrice: Math.round(vehiclePrice),
        downPaymentAmount,
        loanAmount: Math.round(loanAmount),
        monthlyAmortization: Math.round(monthlyAmortization),
        totalAmortization
      };
    });
    setPriceError(false);
    setIncomeError(false);
    setincomeentered(true);
    setMonthlyPayment(Math.round(monthlyAmortization));
    setPrice(Math.round(resultData[0].vehiclePrice));
  };

  const calculateMonthlyFields = (price) => {
    const interestRate = getActualInterestRate(term);
    const ratePerMonth = (interestRate / 100) / 12;
    const downPaymentOptions = [20, 30, 40];

    const resultData = downPaymentOptions.map((dp) => {
      const loanAmount = price - (price * (dp / 100));
      const monthlyAmortization = (loanAmount * ratePerMonth) / (1 - Math.pow(1 + ratePerMonth, -term));
      const updatedMonthlyIncome = Math.ceil((monthlyAmortization / 0.4) / 1000) * 1000;

      return {
        dp,
        loanAmount: Math.round(loanAmount),
        monthlyAmortization: Math.round(monthlyAmortization),
        updatedMonthlyIncome
      };
    });

    // Assuming we want to display the first downpayment option's values in the left fields
    setPriceError(false);
    setIncomeError(false);
    setpriceentered(true);
    setMonthlyIncome(resultData[0].updatedMonthlyIncome);
    setMonthlyPayment(resultData[0].monthlyAmortization);
  };

  const calculateLoan = () => {
    if (priceEntered) {
      const interestRate = getActualInterestRate(term);
      const ratePerMonth = (interestRate / 100) / 12;

      const calculateMonthlyPayment = (loanAmount) => {
        const totalMonths = term;
        return (loanAmount * ratePerMonth) / (1 - Math.pow(1 + ratePerMonth, -totalMonths));
      };

      const downPaymentOptions = [20, 30, 40];

      const resultData = downPaymentOptions.map((dp) => {
        const downPaymentAmount = Math.round((dp / 100) * price);
        const loanAmount = price - downPaymentAmount;
        const monthlyAmortization = calculateMonthlyPayment(loanAmount);
        const totalAmortization = Math.round(monthlyAmortization * term);
        const updatedMonthlyIncome = Math.ceil(monthlyAmortization / 0.4 / 1000) * 1000;

        return {
          dp,
          downPaymentAmount,
          loanAmount: Math.round(loanAmount),
          monthlyAmortization: Math.round(monthlyAmortization),
          totalAmortization,
          updatedMonthlyIncome
        };
      });
      setPriceError(false);
    setIncomeError(false);
      setResults(resultData);
      setCalculated(true);
      setShowIncomeBasedTable(false);
    } else if (monthlyIncome) {
      calculateFromIncome(Number(monthlyIncome));
    }
  };

  const calculateFromIncome = (income) => {
    const interestRate = getActualInterestRate(term);
    const ratePerMonth = (interestRate / 100) / 12;
    const monthlyAmortization = income * 0.5;
    const loanAmount = (monthlyAmortization * (1 - Math.pow(1 + ratePerMonth, -term))) / ratePerMonth;
    const downPaymentOptions = [20, 30, 40];

    const resultData = downPaymentOptions.map((dp) => {
      const downPaymentAmount = Math.round((dp / 100) * loanAmount / (1 - dp / 100));
      const vehiclePrice = downPaymentAmount + loanAmount;
      const totalAmortization = Math.round(monthlyAmortization * term);

      return {
        dp,
        vehiclePrice: Math.round(vehiclePrice),
        downPaymentAmount,
        loanAmount: Math.round(loanAmount),
        monthlyAmortization: Math.round(monthlyAmortization),
        totalAmortization
      };
    });
    setCalculated(true);
    setPriceError(false);
    setIncomeError(false);
    setIncomeBasedResults(resultData);
    setShowIncomeBasedTable(true);
    setMonthlyPayment(Math.round(monthlyAmortization));
    setPrice(Math.round(resultData[0].vehiclePrice));
  };

  const resetFields = () => {
    setpriceentered(false);
    setincomeentered(false);
    setTerm(36);
    setPrice('');
    setMonthlyIncome('');
    setMonthlyPayment(0);
    setResults(null);
    setIncomeBasedResults(null);
    setCalculated(false);
    setPriceError(false);
    setIncomeError(false);
    setShowIncomeBasedTable(false);
  };

  const handleMoneyInput = (e, setter) => {
    let value = e.target.value.replace(/,/g, '').replace(/PHP\s/g, '');
    // Allow empty value (for backspace) and valid numbers
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setter(value);
      if (setter === setPrice) {
        if (Number(value) < 300000) {
          setPriceError(true);
        } else {
          setPriceError(false);
          calculateMonthlyFields(Number(value));
        }
      }
    }
  };

  const handleIncomeInput = (e) => {
    let value = e.target.value.replace(/,/g, '').replace(/PHP\s/g, '');
    // Allow empty value (for backspace) and valid numbers
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMonthlyIncome(value);
      if (Number(value) < 50000) {
        setIncomeError(true);
      } else {
        setIncomeError(false);
        calculateFromIncome2(Number(value));
      }
    }
  };

  const handlePickCarClick = () => {
    const formattedCarPrice = parseFloat(price.toString().replace(/,/g, ""));
    if (formattedCarPrice > 0) {
      navigate("/car-catalog", { state: { price: formattedCarPrice } });
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-8 2xl:px-0 flex flex-col lg:flex-row gap-[20px] md:gap-[70px] mt-[15px]">
      <div className="w-full lg:w-1/3 p-6 border shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4">Fill in with preferred details</h2>
        <div className="mb-4">
          <label className="block mb-2">Loan Term</label>
          <select
  value={term}
  onChange={(e) => setTerm(Number(e.target.value))}
  className="w-full p-2 border rounded"
  disabled={calculated}
  style={{
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    paddingRight: '2rem', // Add space for the arrow
    background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>') no-repeat right 10px center`,
    backgroundSize: '16px', // Adjust the size of the arrow
    backgroundColor: 'white', // Ensure background color is white
  }}
>
  <option value={36}>36 months</option>
  <option value={48}>48 months</option>
  <option value={60}>60 months</option>
</select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Vehicle Price</label>
          <input
            type="text"
            value={price ? `PHP ${Number(price).toLocaleString()}` : ''}
            onChange={(e) => handleMoneyInput(e, setPrice)}
            className={`w-full p-2 border rounded ${priceError ? 'border-red-500' : ''}`}
            disabled={calculated || incomeEntered}
          />
          {priceError && (
            <p className="text-red-500 text-sm mt-1">Please enter a higher value to meet the minimum amount.</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Monthly Income</label>
          <input
            type="text"
            value={monthlyIncome ? `PHP ${Number(monthlyIncome).toLocaleString()}` : ''}
            onChange={handleIncomeInput}
            className={`w-full p-2 border rounded ${incomeError ? 'border-red-500' : ''}`}
            disabled={calculated || priceEntered}
          />
{incomeError && (
            <p className="text-red-500 text-sm mt-1">Please enter a higher value to meet the minimum amount.</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Monthly Payment</label>
          <input
            type="text"
            value={`PHP ${monthlyPayment.toLocaleString()}`}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="flex gap-4">
          <button onClick={calculateLoan} className="w-full p-3 bg-[#2A7EF5] text-white rounded font-semibold" disabled={calculated || (price < 300000 && !monthlyIncome)}>Compute</button>
          <button onClick={resetFields} className="w-full p-3 bg-gray-600 text-white rounded font-semibold">Reset</button>
        </div>
      </div>

      <div className="w-full lg:w-2/3 p-6 border shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4">Results</h2>
        {!showIncomeBasedTable && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 mb-6">
              <div>
                <span className="font-semibold text-[14px]">Vehicle Price</span>
                <p className="text-lg mb-4">{calculated ? `PHP ${Number(price).toLocaleString()}` : '-'}</p>
              </div>
              <div>
                <span className="font-semibold text-[14px]">Loan Term</span>
                <p className="text-lg mb-4">{calculated ? `${term} months` : '-'}</p>
              </div>
              <div className="flex items-center">
                <div>
                  <span className="font-semibold text-[14px]">Annual Effective Interest Rate</span>
                  <p className="text-lg mb-4">{calculated ? `${getInterestRate(term)}%` : '-'}</p>
                </div>
              </div>
              {calculated && (
  <button
    onClick={handlePickCarClick}
    className="ml-4 p-2 bg-[#2A7EF5] text-white rounded font-semibold"
  >
    PICK A CAR NOW
  </button>
)}
            </div>

            <div className="overflow-x-auto">
  <table className="w-full min-w-[600px] bg-white rounded-lg border border-gray-300">
    <tbody className="border border-gray-300">
      <tr>
        <td className="p-4 font-semibold border border-gray-300">Downpayment Percentage</td>
        {results
          ? results.map((res, index) => (
              <td key={index} className="p-4 font-semibold border border-gray-300">
                {res.dp}%
              </td>
            ))
          : [20, 30, 40].map((dp, index) => (
              <td key={index} className="p-4 font-semibold border border-gray-300">
                {dp}%
              </td>
            ))}
      </tr>

      {[
        "Downpayment Amount",
        "Loan Amount",
        "Monthly Amortization",
        "Monthly Income",
        "Total Amortization for the loan term",
      ].map((label, rowIndex) => (
        <tr key={rowIndex}>
          <td className="p-4 font-semibold border border-gray-300">{label}</td>
          {results
            ? results.map((res, colIndex) => (
                <td key={colIndex} className="p-4 border border-gray-300">
                  {label === "Downpayment Amount" && `PHP ${res.downPaymentAmount.toLocaleString()}`}
                  {label === "Loan Amount" && `PHP ${res.loanAmount.toLocaleString()}`}
                  {label === "Monthly Amortization" && `PHP ${res.monthlyAmortization.toLocaleString()}`}
                  {label === "Monthly Income" && `PHP ${res.updatedMonthlyIncome.toLocaleString()}`}
                  {label === "Total Amortization for the loan term" && `PHP ${res.totalAmortization.toLocaleString()}`}
                </td>
              ))
            : [20, 30, 40].map((_, colIndex) => (
                <td key={colIndex} className="p-4 border border-gray-300">PHP 0</td>
              ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>
        )}

        {showIncomeBasedTable && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 mb-6">
              <div>
                <span className="font-semibold text-[14px]">Monthly Income</span>
                <p className="text-lg mb-4">{`PHP ${Number(monthlyIncome).toLocaleString()}`}</p>
              </div>
              <div>
                <span className="font-semibold text-[14px]">Loan Term</span>
                <p className="text-lg mb-4">{`${term} months`}</p>
              </div>
              <div className="flex items-center">
                <div>
                  <span className="font-semibold text-[14px]">Annual Effective Interest Rate</span>
                  <p className="text-lg mb-4">{`${getInterestRate(term)}%`}</p>
                </div>
              </div>
              {calculated && (
  <button
    onClick={handlePickCarClick}
    className="ml-4 p-2 bg-[#2A7EF5] text-white rounded font-semibold"
  >
    PICK A CAR NOW
  </button>
)}
            </div>

            <div className="overflow-x-auto">
  <table className="w-full min-w-[600px] bg-white rounded-lg border border-gray-300">
    <tbody className="border border-gray-300">
      <tr>
        <td className="p-4 font-semibold border border-gray-300">Vehicle Price</td>
        {incomeBasedResults
          ? incomeBasedResults.map((res, index) => (
              <td key={index} className="p-4 border border-gray-300">
                {`PHP ${res.vehiclePrice.toLocaleString()}`}
              </td>
            ))
          : [20, 30, 40].map((_, index) => (
              <td key={index} className="p-4 border border-gray-300">PHP 0</td>
            ))}
      </tr>

      <tr>
        <td className="p-4 font-semibold border border-gray-300">Downpayment Percentage</td>
        {incomeBasedResults
          ? incomeBasedResults.map((res, index) => (
              <td key={index} className="p-4 border border-gray-300">{res.dp}%</td>
            ))
          : [20, 30, 40].map((dp, index) => (
              <td key={index} className="p-4 border border-gray-300">{dp}%</td>
            ))}
      </tr>

      <tr>
        <td className="p-4 font-semibold border border-gray-300">Downpayment Amount</td>
        {incomeBasedResults
          ? incomeBasedResults.map((res, index) => (
              <td key={index} className="p-4 border border-gray-300">
                {`PHP ${res.downPaymentAmount.toLocaleString()}`}
              </td>
            ))
          : [20, 30, 40].map((_, index) => (
              <td key={index} className="p-4 border border-gray-300">PHP 0</td>
            ))}
      </tr>

      <tr>
        <td className="p-4 font-semibold border border-gray-300">Loan Amount</td>
        <td className="p-4 border border-gray-300 text-center" colSpan={3}>
          {incomeBasedResults ? `PHP ${incomeBasedResults[0].loanAmount.toLocaleString()}` : 'PHP 0'}
        </td>
      </tr>

      <tr>
        <td className="p-4 font-semibold border border-gray-300">Monthly Amortization</td>
        <td className="p-4 border border-gray-300 text-center" colSpan={3}>
          {incomeBasedResults ? `PHP ${monthlyPayment.toLocaleString()}` : 'PHP 0'}
        </td>
      </tr>

      <tr>
        <td className="p-4 font-semibold border border-gray-300">Total Amortization for the loan term</td>
        <td className="p-4 border border-gray-300 text-center" colSpan={3}>
          {incomeBasedResults ? `PHP ${incomeBasedResults[0].totalAmortization.toLocaleString()}` : 'PHP 0'}
        </td>
      </tr>
    </tbody>
  </table>
</div>

          </div>
        )}
      </div>
        

    </div>
  );
};

export default LoanCalculator;