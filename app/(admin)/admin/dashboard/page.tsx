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
    title: "Total Buyers",
    value: "12,458",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
    href: "/admin/users?type=buyer",
  },
  {
    title: "Total Sellers",
    value: "3,247",
    change: "+8.2%",
    trend: "up",
    icon: UserCheck,
    color: "bg-green-500",
    href: "/admin/users?type=seller",
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
    title: "Pending Withdrawals",
    value: "₩125,400,000",
    change: "5 items",
    trend: "neutral",
    icon: Clock,
    color: "bg-yellow-500",
    href: "/admin/finance/withdrawals",
  },
  {
    title: "Open Disputes",
    value: "23",
    change: "-3 items",
    trend: "down",
    icon: AlertCircle,
    color: "bg-red-500",
    href: "/admin/disputes",
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
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 80, 45, 90, 75, 95].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-[#2E5E99] to-[#4A90E2] rounded-t-lg mb-2"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-[#64748B]">Month {index + 1}</span>
              </div>
            ))}
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
          <div className="h-64 flex items-end justify-between gap-2">
            {[50, 70, 55, 85, 60, 90].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg mb-2"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-[#64748B]">Month {index + 1}</span>
              </div>
            ))}
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

