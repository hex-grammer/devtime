import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method not allowed
  }

  const { projectId } = req.query as {
    projectId: string;
  };

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        tasks: {
          include: {
            subtasks: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Calculate the project's progress and other data here if needed

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
