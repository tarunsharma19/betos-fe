"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const SelectSideRadioButtons = () => {
  const [selected, setSelected] = useState("");

  return (
    <ul className="flex gap-4 mt-8 justify-center">
      <RadioItem
        id="radio-home"
        name="side"
        label="Home"
        value="home"
        selectedValue={selected}
        onChange={setSelected}
      />
      <RadioItem
        id="radio-draw"
        name="side"
        label="Draw"
        value="draw"
        selectedValue={selected}
        onChange={setSelected}
      />
      <RadioItem
        id="radio-away"
        name="side"
        label="Away"
        value="away"
        selectedValue={selected}
        onChange={setSelected}
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
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
}) => {
  // Determine the color based on selection
  const isSelected = selectedValue === value;
  const bgColor = isSelected
    ? value === "home"
      ? "bg-[#0fc777]"
      : value === "draw"
      ? "bg-[#fff600]"
      : "bg-[#ff6262]"
    : "bg-zinc-200";

  return (
    <div className="w-full">
      <div
        className={cn(
          "h-12 w-full bg-gray-100 -mb-5 rounded-xl text-center pt-1 ",
          isSelected ? "bg-zinc-800" : "bg-zinc-100"
        )}
      >
        <span
          className={cn(
            "font-semibold text-gray-600",
            isSelected ? " text-white" : "text-gray-600"
          )}
        >
          1.03
        </span>
      </div>
      <button
        className={cn(`rounded-xl w-full py-3 text-white `, bgColor)}
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
