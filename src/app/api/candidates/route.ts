import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma, CandidateStatus } from "@prisma/client";

// GET: List all candidates
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as CandidateStatus | null;
    const source = searchParams.get("source");
    const search = searchParams.get("search");

    const where: Prisma.CandidateWhereInput = {
      ...(status && { status }),
      ...(source && { source }),
      ...(search && {
        OR: [
          {
            fullName: { contains: search, mode: Prisma.QueryMode.insensitive },
          },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
          {
            currentRole: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            currentCompany: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }),
    };

    const candidates = await prisma.candidate.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(candidates);
  } catch (error) {
    console.error("[CANDIDATES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// POST: Create a new candidate
export async function POST(req: NextRequest) {
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

    const candidate = await prisma.candidate.create({
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
    console.error("[CANDIDATES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
