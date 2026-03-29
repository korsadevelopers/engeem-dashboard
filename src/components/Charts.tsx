"use client";

import { MoreVertical } from "lucide-react";
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  statsTimelineData, throughputData, resourcesData, topProcesses
} from "@/data/mockData";

// ─── Custom Tooltip ──────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-[11px] shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// ─── Chart Card Wrapper ──────────────────────────────────────
function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex justify-between mb-3">
        <div>
          <div className="text-[13px] font-semibold text-gray-900">{title}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">{subtitle}</div>
        </div>
        <MoreVertical size={15} className="text-gray-400 cursor-pointer shrink-0" />
      </div>
      {children}
    </div>
  );
}

// ─── Charts Component ────────────────────────────────────────
interface ChartsProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Charts({ isMobile, isTablet }: ChartsProps) {
  const tickStyle = { fontSize: isMobile ? 9 : 10, fill: "#9ca3af" };
  const showDots = !isMobile;

  return (
    <>
      {/* Top Row */}
      <div className={`grid ${isMobile || isTablet ? "grid-cols-1" : "grid-cols-[3fr_2fr]"} gap-5 mb-5`}>
        {/* Stats Timeline */}
        <ChartCard title="Stats Timeline" subtitle="Performance metrics evolution over selected period">
          <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
            <AreaChart data={statsTimelineData}>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={tickStyle} axisLine={false} tickLine={false} interval={isMobile ? 2 : 0} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={isMobile ? 35 : 45} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="Total Stats" stroke="#14b8a6" strokeWidth={2} fill="url(#sg)" dot={showDots ? { r: 3, fill: "#14b8a6" } : false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top 10 Processes */}
        <ChartCard title="Top 10 Processes" subtitle="Most active processes by stats count">
          <div className="flex flex-col gap-2">
            {topProcesses.map((p) => (
              <div key={p.name} className="flex items-center gap-2.5">
                <span className={`text-[11px] text-gray-500 ${isMobile ? "w-[70px]" : "w-20"} text-right font-mono shrink-0`}>
                  {p.name}
                </span>
                <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded transition-all duration-500"
                    style={{ width: `${p.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-5`}>
        {/* Throughput Timeline */}
        <ChartCard title="Throughput Timeline" subtitle="Average Row/Sec and Mbps over time">
          <ResponsiveContainer width="100%" height={isMobile ? 160 : 180}>
            <AreaChart data={throughputData}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={tickStyle} axisLine={false} tickLine={false} interval={isMobile ? 1 : 0} />
              <YAxis yAxisId="left" tick={{ ...tickStyle, fill: "#14b8a6" }} axisLine={false} tickLine={false} width={isMobile ? 40 : 50} />
              <YAxis yAxisId="right" orientation="right" tick={{ ...tickStyle, fill: "#f97316" }} axisLine={false} tickLine={false} width={isMobile ? 30 : 40} />
              <Tooltip content={<CustomTooltip />} />
              <Area yAxisId="left" type="monotone" dataKey="rows" name="Avg Rows/Sec" stroke="#14b8a6" strokeWidth={2} fill="url(#rg)" dot={showDots ? { r: 3, fill: "#14b8a6" } : false} />
              <Area yAxisId="right" type="monotone" dataKey="mbps" name="Mbps" stroke="#f97316" strokeWidth={2} fill="url(#mg)" dot={showDots ? { r: 3, fill: "#f97316" } : false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Resources Timeline */}
        <ChartCard title="Resources Timeline" subtitle="CPU and Memory usage over time">
          <ResponsiveContainer width="100%" height={isMobile ? 160 : 180}>
            <LineChart data={resourcesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={tickStyle} axisLine={false} tickLine={false} interval={isMobile ? 1 : 0} />
              <YAxis yAxisId="left" tick={{ ...tickStyle, fill: "#f97316" }} axisLine={false} tickLine={false} width={isMobile ? 30 : 40} />
              <YAxis yAxisId="right" orientation="right" tick={{ ...tickStyle, fill: "#fb923c" }} axisLine={false} tickLine={false} width={isMobile ? 30 : 40} />
              <Tooltip content={<CustomTooltip />} />
              <Line yAxisId="left" type="monotone" dataKey="cpu" name="Avg CPU %" stroke="#f97316" strokeWidth={2} dot={showDots ? { r: 3, fill: "#f97316" } : false} />
              <Line yAxisId="right" type="monotone" dataKey="memory" name="Avg Memory MB" stroke="#fb923c" strokeWidth={2} dot={showDots ? { r: 3, fill: "#fb923c" } : false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  );
}
