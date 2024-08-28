"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const SelectSideRadioButtons = ({
  odds,
  selectedValue,
  onChange,
}: {
  odds: any;
  selectedValue: string;
  onChange: (value: string) => void;
}) => {
  const [selected, setSelected] = useState(selectedValue);

  const handleSelection = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <ul className="flex gap-4 mt-1 justify-center">
      <RadioItem
        id="radio-home"
        name="side"
        label="Home"
        value="home"
        selectedValue={selected}
        onChange={handleSelection}
        odds={odds.home}
      />
      <RadioItem
        id="radio-draw"
        name="side"
        label="Draw"
        value="draw"
        selectedValue={selected}
        onChange={handleSelection}
        odds={odds.draw}
      />
      <RadioItem
        id="radio-away"
        name="side"
        label="Away"
        value="away"
        selectedValue={selected}
        onChange={handleSelection}
        odds={odds.away}
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
          `h-12 w-full  -mb-6 rounded-xl text-center   ${buttonColors}`
        )}
      >
        <span
          className={cn("font-semibold text-xs text-gray-600", "text-white")}
        >
          {label}
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
            "block w-full text-xs text-white-600 text-center font-semibold",
            isSelected ? "text-white" : "text-gray-600"
          )}
        >
          {odds}
        </label>
      </button>
    </div>
  );
};
