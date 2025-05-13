import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: Get a single requirement by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { id } = params;
    const requirement = await prisma.mandate.findUnique({
      where: { id },
      include: { client: true, recruiter: true },
    });
    if (!requirement) {
      return new NextResponse("Requirement not found", { status: 404 });
    }
    return NextResponse.json(requirement);
  } catch (error) {
    console.error("Error fetching requirement:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PUT: Update a requirement by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { id } = params;
    const body = await request.json();
    // TODO: Validate all required fields from PRD
    const requirement = await prisma.mandate.update({
      where: { id },
      data: {
        ...body,
      },
    });
    return NextResponse.json(requirement);
  } catch (error) {
    console.error("Error updating requirement:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE: Delete a requirement by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { id } = params;
    await prisma.mandate.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting requirement:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
