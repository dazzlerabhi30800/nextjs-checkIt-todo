"use client";
import React, { FormEvent, KeyboardEvent, useRef, useState } from "react";

const Otp = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting");
  };

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    // remove the last value
    const slicedValue = value.substring(value.length - 1);

    const newOpt = [...otp];
    newOpt[index] = slicedValue;
    inputRefs.current[index].value = slicedValue;
    if (value && index < otp.length - 1) {
      inputRefs?.current[index + 1]?.focus();
    }
    setOtp(newOpt);
  };

  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      inputRefs?.current[index].value === "" &&
      index > 0 &&
      e.key === "Backspace"
    ) {
      inputRefs?.current[index - 1].focus();
    }
  };

  const inputRefs = useRef<HTMLInputElement[]>([]);

  return (
    <form onSubmit={handleSubmit} className="flex gap-5">
      {...Array(4)
        .fill(0)
        .map((_, index: number) => (
          <input
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            key={index}
            ref={(el: HTMLInputElement) => {
              inputRefs.current[index] = el;
            }}
            className="py-1 px-3 rounded-md focus:outline-none border border-gray-500 focus:border-white text-2xl w-20 h-20 text-center"
            type="text"
          />
        ))}
    </form>
  );
};

export default Otp;
