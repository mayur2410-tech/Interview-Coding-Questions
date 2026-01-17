// import React from 'react'

// const VerifyOtp = () => {
//   return (
//     <div>
//       <h1>Verify otp</h1>
//     </div>
//   )
// }

// export default VerifyOtp


import { useState, useRef } from "react";

export default function VerifyOtp({ length = 6, onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only numbers
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    // Focus next input if not last
    if (index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // prevent default backspace behavior

      const newOtp = [...otp];

      if (newOtp[index]) {
        // If current box has value, clear it
        newOtp[index] = "";
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
      } else if (index > 0) {
        // If current box empty, move to previous and clear it
        inputs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          value={digit}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          maxLength={1}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "24px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
}
