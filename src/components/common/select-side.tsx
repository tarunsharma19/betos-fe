"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const SelectSideRadioButtons = ({
  selectedValue,
  onChange,
}: {
  selectedValue: string;
  onChange: (value: string) => void;
}) => {
  const [selected, setSelected] = useState("");

  return (
    <ul className="flex gap-4 mt-8 justify-center">
      <RadioItem
        id="radio-home"
        name="side"
        label="Home"
        value="home"
        selectedValue={selected}
        onChange={onChange}
        odds="1.5"
      />
      <RadioItem
        id="radio-draw"
        name="side"
        label="Draw"
        value="draw"
        selectedValue={selected}
        onChange={setSelected}
        odds="2.5"
      />
      <RadioItem
        id="radio-away"
        name="side"
        label="Away"
        value="away"
        selectedValue={selected}
        onChange={setSelected}
        odds="3.5"
      />
    </ul>
  );
};

const RadioItem = ({
  id,
  name,
  label,
  value,
  selectedValue,
  onChange,
  odds,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  odds: string;
}) => {
  // Determine the color based on selection
  const isSelected = selectedValue === value;
  const bgColor = isSelected
    ? value === "home"
      ? "bg-[#0fc777]"
      : value === "draw"
      ? "bg-[#eab308]"
      : "bg-[#2a61db]"
    : "bg-zinc-200";

  const buttonColors =
    value === "home"
      ? "bg-[#0fc777]"
      : value === "draw"
      ? "bg-[#eab308]"
      : "bg-[#2a61db]";

  return (
    <div className="w-full">
      <div
        className={cn(
          `h-12 w-full  -mb-5 rounded-xl text-center pt-1  ${buttonColors}`
        )}
      >
        <span className={cn("font-semibold text-gray-600", "text-white")}>
          {odds}
        </span>
      </div>
      <button
        className={cn(
          `rounded-xl w-full py-3 text-white `,

          isSelected ? "bg-zinc-800" : "bg-zinc-100"
        )}
        onClick={() => onChange(value)}
      >
        <input
          id={id}
          name={name}
          type="radio"
          className="absolute w-0 h-0 opacity-0"
          checked={isSelected}
          onChange={() => onChange(value)}
        />
        <label
          htmlFor={id}
          className={cn(
            "block w-full text-sm text-white-600 text-center font-semibold",
            isSelected ? "text-white" : "text-gray-600"
          )}
        >
          {label}
        </label>
      </button>
    </div>
  );
};
