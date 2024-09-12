import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Update user data by ID
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Delete user by ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ success: "User deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
