import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: List all requirements
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const requirements = await prisma.mandate.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true, recruiter: true },
    });
    return NextResponse.json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST: Create a new requirement
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    // TODO: Validate all required fields from PRD
    const requirement = await prisma.mandate.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(requirement);
  } catch (error) {
    console.error("Error creating requirement:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
