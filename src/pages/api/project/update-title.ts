import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { projectId, newTitle } = req.body as {
    projectId: string;
    newTitle: string;
  };

  // Validate request body
  if (!projectId || !newTitle) {
    return res
      .status(400)
      .json({ error: "projectId and newTitle are required fields" });
  }

  try {
    // Update the title of the project using Prisma client
    await prisma.project.update({
      where: { id: projectId },
      data: { title: newTitle },
    });

    // Return success message in the response
    return res
      .status(200)
      .json({ message: "Project title updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update project title" });
  }
}
