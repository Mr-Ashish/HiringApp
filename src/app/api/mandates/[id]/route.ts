import { NextRequest, NextResponse } from "next/server";

// GET: Get a single mandate by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO: Implement get mandate by ID
  return NextResponse.json({
    message: `Get mandate ${params.id} - not implemented`,
  });
}

// PUT: Update a mandate by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO: Implement update mandate
  return NextResponse.json({
    message: `Update mandate ${params.id} - not implemented`,
  });
}

// DELETE: Delete a mandate by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO: Implement delete mandate
  return NextResponse.json({
    message: `Delete mandate ${params.id} - not implemented`,
  });
}
