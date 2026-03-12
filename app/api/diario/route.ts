import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const diarios = await prisma.journal.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(diarios);
}

export async function POST(request: Request) {
  const body = await request.json();

  const diario = await prisma.journal.create({
    data: {
      clientId: Number(body.clientId),
      emotion: body.emotion,
      text: body.text,
    },
  });

  return NextResponse.json(diario);
}