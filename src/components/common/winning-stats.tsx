import { cn } from "@/lib/utils";
import React from "react";

interface ProgressSegmentProps {
  percentage: number;
  color: string;
  label: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const ProgressSegment: React.FC<ProgressSegmentProps> = ({
  percentage,
  color,
  label,
  isFirst = false,
  isLast = false,
}) => {
  return (
    <div
      className={cn(
        "h-10 flex justify-center items-center",
        `bg-${color}`,
        isFirst ? "rounded-l-xl" : isLast ? "rounded-r-xl" : `bg-${color}`
      )}
      style={{
        width: `${percentage}%`,
      }}
    ></div>
  );
};

export default ProgressSegment;

interface ProgressBarProps {
  segments: {
    percentage: number;
    color: string;
    label: string;
  }[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ segments }) => {
  return (
    <div className="flex mt-10">
      {segments.map((segment, index) => (
        <ProgressSegment
          key={index}
          percentage={segment.percentage}
          color={segment.color}
          label={segment.label}
          isFirst={index === 0}
          isLast={index === segments.length - 1}
        />
      ))}
    </div>
  );
};
