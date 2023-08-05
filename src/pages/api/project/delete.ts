import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id: projectId } = req.query as { id: string };

  // Validate projectId
  if (!projectId) {
    return res
      .status(400)
      .json({ error: "projectId is a required query parameter" });
  }

  try {
    // Delete the project and its associated tasks using Prisma client
    await prisma.project.delete({
      where: { id: projectId },
    });

    // Return success message in the response
    return res
      .status(200)
      .json({ message: "Project and associated tasks deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete project and associated tasks" });
  }
}
