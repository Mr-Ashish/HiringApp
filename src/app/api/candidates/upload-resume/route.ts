import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const candidateId = formData.get("candidateId") as string;

    if (!file || !candidateId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      return new NextResponse(
        "Invalid file type. Please upload a PDF or Word document.",
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return new NextResponse("File size should be less than 5MB", {
        status: 400,
      });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "resumes");
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(
      join(uploadsDir, file.name),
      Buffer.from(await file.arrayBuffer())
    );

    // Update candidate record with resume URL
    const resumeUrl = `/uploads/resumes/${file.name}`;
    const candidate = await prisma.candidate.update({
      where: { id: candidateId },
      data: { resumeUrl },
    });

    return NextResponse.json(candidate);
  } catch (error) {
    console.error("[CANDIDATES_UPLOAD_RESUME]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
