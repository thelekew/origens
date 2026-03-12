import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clientes = await prisma.client.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(clientes);
}

export async function POST(request: Request) {
  const body = await request.json();

  const cliente = await prisma.client.create({
    data: {
      name: body.name,
      theme: body.theme,
    },
  });

  return NextResponse.json(cliente);
}