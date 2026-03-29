"use client";

import { Star, Zap, Settings2, TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

interface Metric {
  value: string;
  label: string;
  icon: ReactNode;
  change: string;
  positive: boolean;
}

const metrics: Metric[] = [
  { value: "140893", label: "Total Stats", icon: <Star size={16} className="text-gray-300" />, change: "10%", positive: true },
  { value: "7,777", label: "Avg Rows/Sec", icon: <Zap size={16} className="text-gray-300" />, change: "5%", positive: false },
  { value: "533.74", label: "Peak Mbps", icon: null, change: "4%", positive: true },
  { value: "0,9%", label: "Avg CPU Usage", icon: <Settings2 size={16} className="text-gray-300" />, change: "2%", positive: true },
];

interface MetricCardsProps {
  isMobile: boolean;
}

export default function MetricCards({ isMobile }: MetricCardsProps) {
  return (
    <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-5 pt-3.5 border-t border-gray-100`}>
      {metrics.map((m, i) => (
        <div key={i}>
          <div className="flex justify-between items-center">
            <span className={`${isMobile ? "text-[22px]" : "text-[26px]"} font-bold text-gray-900`}>
              {m.value}
            </span>
            {m.icon}
          </div>
          <div className="text-xs text-gray-500 mt-1">{m.label}</div>
          <div className="flex items-center gap-1 mt-1">
            {m.positive
              ? <TrendingUp size={13} className="text-green-500" />
              : <TrendingDown size={13} className="text-red-500" />
            }
            <span className={`text-[11px] font-medium ${m.positive ? "text-green-500" : "text-red-500"}`}>
              {m.change}
            </span>
            <span className="text-[11px] text-gray-400">this week</span>
          </div>
        </div>
      ))}
    </div>
  );
}
