"use client";
import { BarChart, ChartArea, Compass, GitGraph, Group, GroupIcon, Home, Layout, List, Plus, Settings } from "lucide-react";
import React from "react";
import SideNavBarItems from "./sideNavBarItems";

const guestRoutes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: BarChart,
    label: "Board",
    href: "/board",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: Group,
    label: "Teams",
    href: "/teams",
  },
  {
    icon: ChartArea,
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: Plus,
    label: "Create New Task",
    href: "/new-task",
  },
];

export default function SidebarRoutes() {
  
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((item) => (
        <SideNavBarItems
          key={item.href}
          icon={item.icon}
          href={item.href}
          label={item.label}
        />
      ))}
    </div>
  );
}
