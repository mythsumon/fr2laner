"use client";

import { useState } from "react";
import {
  Users,
  UserCheck,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
  BarChart3,
  Plus,
  Eye,
} from "lucide-react";
import { Button } from "@/components/shared/common";
import { BackToHomeButton } from "@/components/page/admin/shared/BackToHomeButton";
import Link from "next/link";

const statsCards = [
  {
    title: "Total Users",
    value: "15,705",
    change: "+10.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
    href: "/admin/users",
  },
  {
    title: "Total Services",
    value: "8,234",
    change: "+12.3%",
    trend: "up",
    icon: Package,
    color: "bg-green-500",
    href: "/admin/services",
  },
  {
    title: "Total Orders",
    value: "45,892",
    change: "+15.3%",
    trend: "up",
    icon: ShoppingBag,
    color: "bg-purple-500",
    href: "/admin/orders",
  },
  {
    title: "Total Revenue",
    value: "₩2,458,900,000",
    change: "+22.1%",
    trend: "up",
    icon: DollarSign,
    color: "bg-orange-500",
    href: "/admin/finance",
  },
  {
    title: "Reports",
    value: "47",
    change: "+5 items",
    trend: "up",
    icon: AlertCircle,
    color: "bg-red-500",
    href: "/admin/reports",
  },
  {
    title: "Pending Withdrawals",
    value: "₩125,400,000",
    change: "5 items",
    trend: "neutral",
    icon: Clock,
    color: "bg-yellow-500",
    href: "/admin/payouts",
  },
];

const quickActions = [
  { label: "Approve Sellers", icon: CheckCircle2, href: "/admin/users?type=seller&status=pending", color: "bg-green-500" },
  { label: "Approve Services", icon: Package, href: "/admin/services?status=pending", color: "bg-blue-500" },
  { label: "View Reports", icon: BarChart3, href: "/admin/analytics", color: "bg-purple-500" },
  { label: "Create Coupon", icon: Plus, href: "/admin/marketing/coupons", color: "bg-orange-500" },
];

export default function AdminDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [hoveredRevenueIndex, setHoveredRevenueIndex] = useState<number | null>(null);
  const [hoveredUsersIndex, setHoveredUsersIndex] = useState<number | null>(null);
  
  const revenueData = [65, 80, 45, 90, 75, 95];
  const usersData = [50, 70, 55, 85, 60, 90];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard Overview</h1>
            <BackToHomeButton />
          </div>
          <p className="text-sm text-[#64748B] mt-1">View system-wide status at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:border-[#2E5E99] focus:outline-none"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : stat.trend === "down" ? ArrowDownRight : TrendingUp;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`size-6 ${stat.color.replace("bg-", "text-")}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                      ? "text-red-600"
                      : "text-[#64748B]"
                  }`}
                >
                  <TrendIcon className="size-4" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-sm text-[#64748B] mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Monthly Revenue</h3>
              <p className="text-sm text-[#64748B] mt-1">Last 6 months</p>
            </div>
            <Button type="ghost" size="sm">
              <Eye className="size-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="relative h-64 flex items-end justify-between gap-2">
            {revenueData.map((height, index) => {
              const revenueValue = Math.round(height * 50000000); // Convert to actual revenue
              return (
                <div key={index} className="relative flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-[#2E5E99] to-[#4A90E2] rounded-t-lg mb-2 transition-all hover:from-[#1d4673] hover:to-[#2E5E99] cursor-pointer"
                    style={{ height: `${height}%` }}
                    onMouseEnter={() => setHoveredRevenueIndex(index)}
                    onMouseLeave={() => setHoveredRevenueIndex(null)}
                  >
                    {hoveredRevenueIndex === index && (
                      <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0F172A] px-3 py-2 text-xs font-semibold text-white shadow-lg z-10 before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#0F172A]">
                        Month {index + 1}: ₩{revenueValue.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-[#64748B]">Month {index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Users Chart */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">New Users</h3>
              <p className="text-sm text-[#64748B] mt-1">Last 6 months</p>
            </div>
            <Button type="ghost" size="sm">
              <Eye className="size-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="relative h-64 flex items-end justify-between gap-2">
            {usersData.map((height, index) => {
              const usersValue = Math.round(height * 200);
              return (
                <div key={index} className="relative flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg mb-2 transition-all hover:from-green-600 hover:to-emerald-500 cursor-pointer"
                    style={{ height: `${height}%` }}
                    onMouseEnter={() => setHoveredUsersIndex(index)}
                    onMouseLeave={() => setHoveredUsersIndex(null)}
                  >
                    {hoveredUsersIndex === index && (
                      <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0F172A] px-3 py-2 text-xs font-semibold text-white shadow-lg z-10 before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#0F172A]">
                        Month {index + 1}: {usersValue} new users
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-[#64748B]">Month {index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Selling Categories */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">Popular Categories</h3>
            <p className="text-sm text-[#64748B] mt-1">Top 5 by sales volume</p>
          </div>
          <Link href="/admin/analytics">
            <Button type="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {[
            { name: "Logo Design", sales: 12450, revenue: "₩312,450,000", percentage: 85 },
            { name: "Web Development", sales: 8920, revenue: "₩445,600,000", percentage: 70 },
            { name: "Translation", sales: 6780, revenue: "₩135,600,000", percentage: 55 },
            { name: "Marketing", sales: 5430, revenue: "₩271,500,000", percentage: 45 },
            { name: "Video Editing", sales: 4320, revenue: "₩216,000,000", percentage: 35 },
          ].map((category, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#0F172A]">{category.name}</span>
                  <span className="text-sm text-[#64748B]">{category.sales.toLocaleString()} orders</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                  <div
                    className="bg-[#2E5E99] h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-[#64748B] mt-1">{category.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-3 p-4 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#2E5E99] transition-colors"
              >
                <div className={`p-3 rounded-lg ${action.color} bg-opacity-10`}>
                  <Icon className={`size-6 ${action.color.replace("bg-", "text-")}`} />
                </div>
                <span className="text-sm font-medium text-[#0F172A] text-center">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

