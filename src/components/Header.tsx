"use client";

import {
  ChevronDown, Share2, RefreshCw, Trash2, Menu as MenuIcon
} from "lucide-react";

interface HeaderProps {
  isMobile: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMenuOpen: () => void;
}

const tabs = ["Status", "Job History", "SLO & Performance", "FinOps", "Execution Control"];

export default function Header({ isMobile, activeTab, onTabChange, onMenuOpen }: HeaderProps) {
  return (
    <>
      {/* Top Header - Breadcrumb */}
      <div className={`bg-white border-b border-gray-100 ${isMobile ? "px-3" : "px-5"} py-2.5 flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-1.5 text-[13px] min-w-0">
          {isMobile && (
            <button onClick={onMenuOpen} className="text-gray-700 p-0.5 shrink-0">
              <MenuIcon size={20} />
            </button>
          )}
          <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="text-gray-400">YIALI Cluster /</span>
            <span className="font-semibold text-gray-900">NSIACluster01</span>
            <ChevronDown size={14} className="text-gray-400" />
            {!isMobile && (
              <>
                <span className="text-gray-400">Data Center /</span>
                <span className="font-semibold text-gray-900">NSIA01Warehouse</span>
              </>
            )}
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] text-gray-500 shrink-0 hover:text-gray-700">
          <Share2 size={14} />
          {!isMobile && <span>Share</span>}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className={`bg-white border-b border-gray-100 ${isMobile ? "px-3 py-2" : "px-5 py-2.5"} flex items-center justify-between gap-2`}>
        <div className="flex gap-1 overflow-x-auto hide-scrollbar flex-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-3.5 py-[7px] rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors
                ${activeTab === tab
                  ? "bg-teal-600 text-white"
                  : "text-gray-500 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {!isMobile && (
          <div className="flex gap-3.5 shrink-0">
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
              <RefreshCw size={13} /> Auto-Refreshed
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
              <Trash2 size={13} /> Clear Cache
            </button>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className={`bg-white border-b border-gray-100 ${isMobile ? "px-3" : "px-5"} py-2 flex items-center gap-2.5 text-[11px] overflow-x-auto hide-scrollbar`}>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 font-medium shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Running
        </span>
        <span className="text-gray-500 shrink-0">
          Hostname: <strong className="text-gray-700">postgresql</strong>
        </span>
        <span className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full border border-teal-200 font-medium shrink-0">
          Data Center : DWR-NSIA-VA01
        </span>
        {!isMobile && (
          <>
            <span className="text-gray-400 ml-auto shrink-0">
              7620587 rows per 5s loaded 458 MB per 5s loaded
            </span>
            <span className="text-gray-400 ml-3 shrink-0">
              Avg Mem: 1524.34 MB, Max Mem: 2527.38 MB
            </span>
          </>
        )}
      </div>
    </>
  );
}
