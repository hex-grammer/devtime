import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { projectId, taskTitle } = req.body as {
    projectId: string;
    taskTitle: string;
  };

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const newTask = await prisma.task.create({
      data: {
        project: { connect: { id: projectId } },
        title: taskTitle,
        step: "TODO", // Set the initial step for the task
        working_hours: 0, // Initialize working hours for the task
      },
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
