import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const exists = await prisma.user.findUnique({ where: { email } });

  if (exists) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hash(password, 10),
    },
  });

  return NextResponse.json(user);
}
