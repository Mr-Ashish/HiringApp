import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CandidateStatus } from "@prisma/client";

// GET: Get a single candidate by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const candidate = await prisma.candidate.findUnique({
      where: { id: params.id },
    });
    if (!candidate) {
      return new NextResponse("Candidate not found", { status: 404 });
    }
    return NextResponse.json(candidate);
  } catch (error) {
    console.error("[CANDIDATE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PUT: Update a candidate by ID
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
      fullName,
      email,
      phone,
      linkedinUrl,
      currentRole,
      currentCompany,
      location,
      keySkills,
      yearsOfExperience,
      source,
      status,
      notes,
    } = body;
    const candidate = await prisma.candidate.update({
      where: { id: params.id },
      data: {
        fullName,
        email,
        phone,
        linkedinUrl,
        currentRole,
        currentCompany,
        location,
        keySkills,
        yearsOfExperience,
        source,
        status: status as CandidateStatus,
        notes,
      },
    });
    return NextResponse.json(candidate);
  } catch (error) {
    console.error("[CANDIDATE_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE: Delete a candidate by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO: Implement delete candidate
  return NextResponse.json({
    message: `Delete candidate ${params.id} - not implemented`,
  });
}
