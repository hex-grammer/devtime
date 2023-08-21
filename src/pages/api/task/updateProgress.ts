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

  const { taskId, progress, order } = req.body as {
    taskId: string;
    progress: "TODO" | "IN_PROGRESS" | "DONE";
    order: number;
  };

  try {
    let task;

    if (progress === "IN_PROGRESS") {
      // Update the task's progress and order based on the lowest order number
      task = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          step: progress,
          order: order,
        },
      });

      // Create a new task progress entry
      await prisma.taskprogress.create({
        data: {
          // date: new Date(), // Set the date to the current date
          project_id: task.project_id,
          task_id: taskId,
          progress: progress,
        },
      });
    } else {
      // If progress is not "IN_PROGRESS," simply update the task
      task = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          step: progress,
          order: order,
        },
      });

      // update the last task progress stop date to current date
      await prisma.taskprogress.updateMany({
        where: {
          task_id: taskId,
          progress: "IN_PROGRESS",
        },
        data: {
          stop_date: new Date(),
          progress: progress,
        },
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task progress:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
