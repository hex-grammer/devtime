import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { taskId, workingHours } = req.body as {
    taskId: string;
    workingHours: number;
  };

  console.log(taskId, workingHours);

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { working_hours: workingHours },
    });

    // console.log("updatedTask:", updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task" });
  }
}
