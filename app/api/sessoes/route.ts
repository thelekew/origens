import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sessoes = await prisma.session.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(sessoes);
}

export async function POST(request: Request) {
  const body = await request.json();

  const sessao = await prisma.session.create({
    data: {
      clientId: Number(body.clientId),
      date: new Date(body.date),
      summary: body.summary,
    },
  });

  return NextResponse.json(sessao);
}