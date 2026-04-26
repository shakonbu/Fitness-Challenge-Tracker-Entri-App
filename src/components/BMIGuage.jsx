import { useEffect, useState } from "react";

const BMIGauge = ({ bmi = 25.6 }) => {
  const [angle, setAngle] = useState(-90);

  const minBMI = 10;
  const maxBMI = 40;

  const getAngle = (bmi) => {
    const clamped = Math.min(Math.max(bmi, minBMI), maxBMI);
    return ((clamped - minBMI) / (maxBMI - minBMI)) * 180 - 90;
  };

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-red-500" };
    if (bmi < 25) return { label: "Normal", color: "text-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
    return { label: "Obese", color: "text-red-700" };
  };

  useEffect(() => {
    setTimeout(() => setAngle(getAngle(bmi)), 200);
  }, [bmi]);

  const category = getCategory(bmi);

  // Helper for arc
  const arc = (start, end, color) => {
    const startAngle = ((start - minBMI) / (maxBMI - minBMI)) * 180 - 90;
    const endAngle = ((end - minBMI) / (maxBMI - minBMI)) * 180 - 90;

    const rad = (deg) => (deg * Math.PI) / 180;

    const x1 = 100 + 90 * Math.cos(rad(startAngle));
    const y1 = 100 + 90 * Math.sin(rad(startAngle));

    const x2 = 100 + 90 * Math.cos(rad(endAngle));
    const y2 = 100 + 90 * Math.sin(rad(endAngle));

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return (
      <path
        d={`M ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2}`}
        stroke={color}
        strokeWidth="18"
        fill="none"
      />
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative w-full aspect-[2/1]">
        <svg viewBox="0 0 200 120" className="w-full h-full">

          {/* Segments */}
          {arc(10, 18.5, "#ef4444")}
          {arc(18.5, 25, "#22c55e")}
          {arc(25, 30, "#eab308")}
          {arc(30, 40, "#dc2626")}

          {/* Ticks */}
          {[10, 15, 18.5, 20, 25, 30, 35, 40].map((val) => {
            const a = ((val - minBMI) / (maxBMI - minBMI)) * 180 - 90;
            const rad = (a * Math.PI) / 180;

            const x1 = 100 + 70 * Math.cos(rad);
            const y1 = 100 + 70 * Math.sin(rad);

            const x2 = 100 + 85 * Math.cos(rad);
            const y2 = 100 + 85 * Math.sin(rad);

            const tx = 100 + 100 * Math.cos(rad);
            const ty = 100 + 100 * Math.sin(rad);

            return (
              <g key={val}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="1.5" />
                <text x={tx} y={ty} fontSize="6" textAnchor="middle">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Labels */}
          <text x="35" y="95" fontSize="7" fill="#ef4444">Underweight</text>
          <text x="70" y="30" fontSize="7" fill="#22c55e">Normal</text>
          <text x="115" y="30" fontSize="7" fill="#eab308">Overweight</text>
          <text x="150" y="95" fontSize="7" fill="#dc2626">Obese</text>

          {/* Needle */}
          <g
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "100px 100px",
              transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* Shadow */}
            <line
              x1="102"
              y1="102"
              x2="102"
              y2="35"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="4"
            />
            {/* Needle */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke="black"
              strokeWidth="3"
            />
          </g>

          {/* Center */}
          <circle cx="100" cy="100" r="6" fill="black" />
        </svg>

        {/* Value */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl font-bold">
          {bmi}
        </div>

        {/* Category */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 text-lg font-medium ${category.color}`}>
          {category.label}
        </div>
      </div>
    </div>
  );
};

export default BMIGauge;