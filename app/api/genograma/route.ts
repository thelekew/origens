import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const membros = await prisma.familyMember.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(membros);
}

export async function POST(request: Request) {
  const body = await request.json();

  const membro = await prisma.familyMember.create({
    data: {
      clientId: Number(body.clientId),
      name: body.name,
      relation: body.relation,
    },
  });

  return NextResponse.json(membro);
}