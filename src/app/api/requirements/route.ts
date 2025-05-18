import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET: List all requirements
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;
    const priority = searchParams.get("priority") || undefined;

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { client: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const requirements = await prisma.mandate.findMany({
      where,
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
    console.log("session", session);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!session.user || !("id" in session.user)) {
      return new NextResponse("Unauthorized: recruiter id missing in session", {
        status: 401,
      });
    }
    const body = await request.json();
    console.log("Request body:", body);
    console.log("Employment Type:", body.employmentType);

    // TODO: Validate all required fields from PRD
    if (!body.clientId) {
      return NextResponse.json(
        { message: "Client is required." },
        { status: 400 }
      );
    }

    // Validate employmentType if provided
    if (
      body.employmentType &&
      !["FULL_TIME", "PART_TIME", "CONTRACT"].includes(body.employmentType)
    ) {
      console.log("Invalid employment type received:", body.employmentType);
      return NextResponse.json(
        {
          message:
            "Invalid employment type. Must be either 'FULL_TIME', 'PART_TIME', or 'CONTRACT'.",
          received: body.employmentType,
        },
        { status: 400 }
      );
    }

    const { clientId, employmentType, internalDecision, ...rest } = body;

    // Validate internalDecision if provided
    if (
      internalDecision &&
      !["PENDING", "APPROVED", "REJECTED"].includes(internalDecision)
    ) {
      console.log("Invalid internal decision received:", internalDecision);
      return NextResponse.json(
        {
          message:
            "Invalid internal decision. Must be either 'PENDING', 'APPROVED', or 'REJECTED'.",
          received: internalDecision,
        },
        { status: 400 }
      );
    }

    // Convert numeric fields
    const salaryMin = body.salaryMin ? parseFloat(body.salaryMin) : null;
    const salaryMax = body.salaryMax ? parseFloat(body.salaryMax) : null;
    const feePercentage = body.feePercentage
      ? parseFloat(body.feePercentage)
      : null;
    const experienceMin = body.experienceMin
      ? parseInt(body.experienceMin)
      : null;
    const experienceMax = body.experienceMax
      ? parseInt(body.experienceMax)
      : null;
    const clientEngagementScore = body.clientEngagementScore
      ? parseInt(body.clientEngagementScore)
      : null;
    const roleComplexityScore = body.roleComplexityScore
      ? parseInt(body.roleComplexityScore)
      : null;

    console.log("Creating mandate with data:", {
      ...rest,
      status: "NEW",
      dateOpened: new Date().toISOString(),
      employmentType: employmentType || null,
      internalDecision: internalDecision || null,
      salaryMin,
      salaryMax,
      feePercentage,
      experienceMin,
      experienceMax,
      clientEngagementScore,
      roleComplexityScore,
    });

    const requirement = await prisma.mandate.create({
      data: {
        ...rest,
        status: "NEW",
        dateOpened: new Date().toISOString(),
        targetSourcingSLA: body.targetSourcingSLA
          ? new Date(body.targetSourcingSLA).toISOString()
          : null,
        targetOfferDate: body.targetOfferDate
          ? new Date(body.targetOfferDate).toISOString()
          : null,
        targetCloseDate: body.targetCloseDate
          ? new Date(body.targetCloseDate).toISOString()
          : null,
        employmentType: employmentType || null,
        internalDecision: internalDecision || null,
        salaryMin,
        salaryMax,
        feePercentage,
        experienceMin,
        experienceMax,
        clientEngagementScore,
        roleComplexityScore,
        client: { connect: { id: clientId } },
        recruiter: { connect: { id: session.user.id } },
      },
    });
    return NextResponse.json(requirement);
  } catch (error) {
    console.error("Error creating requirement:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
