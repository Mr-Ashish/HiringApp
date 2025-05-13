import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: List all clients
export async function GET(req: NextRequest) {
  try {
    const clients = await prisma.client.findMany();
    return NextResponse.json(clients);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

// POST: Create a new client
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      contactPerson,
      contactEmail,
      contactPhone,
      industry,
      status,
    } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const client = await prisma.client.create({
      data: {
        name,
        contactPerson,
        contactEmail,
        contactPhone,
        industry,
        status: status || "ACTIVE",
      },
    });
    return NextResponse.json(client);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}

// PUT and DELETE would typically be on /api/clients/[id], not here
