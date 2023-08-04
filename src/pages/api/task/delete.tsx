import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { taskId } = req.query as { taskId: string };

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    });

    res
      .status(200)
      .json({ message: "Task deleted successfully", data: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
