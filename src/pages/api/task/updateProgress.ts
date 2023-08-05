import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { taskId, progress } = req.body as {
    taskId: string;
    progress: "TODO" | "IN_PROGRESS" | "DONE";
  };

  // get the lowest order number for the task with the given progress
  const lowestOrderNumber = await prisma.task.findFirst({
    where: {
      step: progress,
    },
    orderBy: {
      order: "asc",
    },
    select: {
      order: true,
    },
  });

  try {
    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        step: progress,
        order: lowestOrderNumber ? lowestOrderNumber.order - 1 : 0,
      },
    });

    return res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task progress:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
