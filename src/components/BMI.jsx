import { useState } from "react";
// import {BMIGauge} from "./BMIGauge";

export default function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) return;
    const value = (weight / ((height / 100) ** 2)).toFixed(1);
    setBmi(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      
      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 space-y-5">
        
        {/* Title */}
        <h1 className="text-xl font-semibold text-center">
          BMI Calculator
        </h1>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={calculateBMI}
          className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-medium active:scale-95 transition"
        >
          Calculate BMI
        </button>

        {/* Result */}
        {bmi && (
          <div className="pt-4">
            {/* <BMIGauge bmi={parseFloat(bmi)} /> */}
          </div>
        )}
      </div>
    </div>
  );
}