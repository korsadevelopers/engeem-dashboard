"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MetricCards from "./MetricCards";
import Charts from "./Charts";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Status");
  const [activeTimeFilter, setActiveTimeFilter] = useState("1m");
  const [activeContentTab, setActiveContentTab] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const timeFilters = ["1s", "1m", "5m", "15m", "1h", "4h", "D"];
  const contentTabs = ["Overview", "Agentic Operation", "Service Processes"];

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-sm overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <Header
          isMobile={isMobile}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <div className={`flex-1 overflow-y-auto ${isMobile ? "p-3" : "p-5"}`}>
          {/* Data Stream Status Card */}
          <div className={`bg-white border border-gray-100 rounded-xl ${isMobile ? "p-3.5" : "p-5"} mb-5`}>
            {/* Card Header */}
            <div className={`flex ${isMobile ? "flex-col gap-3" : "flex-row justify-between items-start"} mb-4`}>
              <div>
                <h2 className={`${isMobile ? "text-[15px]" : "text-base"} font-bold text-gray-900`}>
                  Data Stream Status
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Real-Time, contextual insights for virtual data runtime stream monitoring and management.
                </p>
              </div>
              <div className="flex gap-1 overflow-x-auto hide-scrollbar">
                {contentTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveContentTab(tab)}
                    className={`px-3.5 py-[7px] rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors
                      ${activeContentTab === tab
                        ? "bg-teal-600 text-white border-transparent"
                        : "text-gray-500 border border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters Row */}
            <div className={`flex ${isMobile ? "flex-col gap-2.5" : "flex-row justify-between items-center"} mb-5`}>
              <div className="flex gap-0.5 bg-gray-50 rounded-lg p-1 overflow-x-auto hide-scrollbar">
                {timeFilters.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setActiveTimeFilter(tf)}
                    className={`px-2.5 py-[5px] rounded-md text-[11px] font-medium shrink-0 transition-colors
                      ${activeTimeFilter === tf
                        ? "bg-teal-600 text-white"
                        : "text-gray-500 hover:bg-gray-200"
                      }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs overflow-x-auto hide-scrollbar">
                {!isMobile && (
                  <span className="flex items-center gap-1.5 text-gray-500 shrink-0">
                    <SlidersHorizontal size={13} /> Filter on Stream, Products, and Centers
                  </span>
                )}
                {isMobile && <SlidersHorizontal size={13} className="text-gray-500 shrink-0" />}
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0">
                  VDR-Prod01 <X size={11} className="cursor-pointer" />
                </span>
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0">
                  AI-Analytics <X size={11} className="cursor-pointer" />
                </span>
              </div>
            </div>

            {/* Metric Cards */}
            <MetricCards isMobile={isMobile} />
          </div>

          {/* Charts */}
          <Charts isMobile={isMobile} isTablet={isTablet} />
        </div>
      </main>
    </div>
  );
}
