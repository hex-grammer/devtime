import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient, type Project } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId, title } = req.body as { userId: string; title: string };

  // Validate request body (you can add more validation if needed)
  if (!userId || !title) {
    return res
      .status(400)
      .json({ error: "userId and title are required fields" });
  }

  try {
    // Create a new project in the database using Prisma client
    const newProject = await prisma.project.create({
      data: {
        user_id: userId,
        title,
      },
    });

    // Return the created project in the response
    return res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create project" });
  }
}
