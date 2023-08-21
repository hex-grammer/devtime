import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getDaySpent, getWorkingHours } from "~/utils/utils";
import { type TaskProgress } from "~/utils/types";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Get the user ID from the request query parameters
      const { userId } = req.query;

      // Query the database to get projects data for the given user ID
      const projects = await prisma.project.findMany({
        where: {
          user_id: userId as string,
        },
        select: {
          id: true,
          title: true,
          started_at: true,
          tasks: {
            select: {
              working_hours: true,
              step: true,
            },
          },
          taskprogress: {
            orderBy: {
              start_date: "desc",
            },
            // take: 1,
          },
        },
        orderBy: {
          started_at: "desc",
        },
      });

      // Calculate accumulated working_hours from related tasks for each project
      const projectsWithAccumulatedWorkingHours = projects.map((project) => {
        const completedTasks = project.tasks.filter(
          (task) => task.step === "DONE"
        ).length;
        const progress = project.tasks.length
          ? Math.floor((completedTasks / project.tasks.length) * 100)
          : 0;

        return {
          id: project.id,
          title: project.title,
          working_hours: getWorkingHours(
            project.taskprogress as TaskProgress[]
          ),
          started_at: project.started_at.toISOString(),
          daySpent: getDaySpent(project.taskprogress as TaskProgress[]),
          progress: progress,
          numberOfTasks: project.tasks.length,
          lastProgress:
            project.taskprogress[0]?.start_date?.toISOString() ??
            project.started_at.toISOString(),
        };
      });

      // Return the projects data with accumulated working_hours as the response
      res.status(200).json(projectsWithAccumulatedWorkingHours);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Return an error response for other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
