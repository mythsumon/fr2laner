import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real app, this would fetch from database
    // For now, we'll return data from a mock source
    // The actual data comes from HomeDataContext which uses localStorage
    return NextResponse.json({
      success: true,
      data: [],
      message: "Use HomeDataContext for featured services",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch featured services" },
      { status: 500 }
    );
  }
}



