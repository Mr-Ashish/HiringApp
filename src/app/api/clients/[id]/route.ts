import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: Get a single client by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const client = await prisma.client.findUnique({
      where: { id: params.id },
    });
    if (!client) {
      return new NextResponse("Client not found", { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PUT: Update a client by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      contactPerson,
      contactEmail,
      contactPhone,
      industry,
      status,
    } = body;
    if (
      !name ||
      !contactPerson ||
      !contactEmail ||
      !contactPhone ||
      !industry
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const client = await prisma.client.update({
      where: { id: params.id },
      data: {
        name,
        contactPerson,
        contactEmail,
        contactPhone,
        industry,
        status,
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error updating client:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE: Delete a client by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.client.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting client:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
