"use client";

import {
  Home, BarChart3, ArrowLeftRight, FileText, Bell,
  Mail, Puzzle, Phone, Settings, LogOut, Search,
  SlidersHorizontal, X
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: BarChart3, label: "Analytics" },
  { icon: ArrowLeftRight, label: "Transaction" },
  { icon: FileText, label: "Document" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Email" },
  { icon: Puzzle, label: "Integration" },
  { icon: Phone, label: "Contact" },
];

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isMobile, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        />
      )}

      <aside
        className={`
          w-60 bg-white border-r border-gray-100 flex flex-col py-4 px-2.5 shrink-0
          ${isMobile
            ? `fixed top-0 h-screen z-50 transition-all duration-250 ease-in-out
               ${isOpen ? "left-0 shadow-2xl" : "-left-[260px]"}`
            : ""
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-1.5 px-2.5 mb-5">
          <div className="flex gap-0.5 items-end">
            {[14, 14, 14, 20].map((h, i) => (
              <div
                key={i}
                className="bg-[#1a1a2e] rounded-[1px]"
                style={{ width: i === 3 ? 7 : 5, height: h }}
              />
            ))}
          </div>
          <span className="text-[7px] text-gray-400 align-super">TM</span>
          <span className="font-bold text-[15px] text-gray-900 tracking-tight">NGMYIALI</span>
          {isMobile && (
            <button onClick={onClose} className="ml-auto text-gray-400 p-1">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="flex items-center gap-1.5 px-2.5 mb-3.5">
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-[7px] flex-1">
            <Search size={13} className="text-gray-400" />
            <span className="text-xs text-gray-400">Search...</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <SlidersHorizontal size={13} />
            <span className="text-[11px] font-medium">K</span>
          </div>
        </div>

        {/* Menu Label */}
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2.5 mb-1.5">
          Menu
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col gap-0.5">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => isMobile && onClose()}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-gray-500 text-[13px] hover:bg-gray-50 hover:text-gray-900 transition-colors text-left w-full"
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-0.5">
          <button className="flex items-center gap-2.5 px-2.5 py-2 text-gray-500 text-[13px] hover:text-gray-900 transition-colors">
            <Settings size={18} strokeWidth={1.5} /> Settings
          </button>
          <button className="flex items-center gap-2.5 px-2.5 py-2 text-red-500 text-[13px] hover:text-red-600 transition-colors">
            <LogOut size={18} strokeWidth={1.5} /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
