import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: List all clients
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST: Create a new client
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, industry, location, website } = body;

    if (!name || !industry || !location || !website) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        name,
        industry,
        location,
        website,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PUT and DELETE would typically be on /api/clients/[id], not here
