import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

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
        );
        const totalTasks = project.tasks.length;

        const accumulatedWorkingHours = project.tasks.reduce(
          (total, task) => total + task.working_hours,
          0
        );

        const latestProgress = project.taskprogress[0];

        if (latestProgress) {
          const millisecondsPerDay = 24 * 60 * 60 * 1000;
          const startedAt = new Date(project.started_at).getTime();
          const latestProgressDate = new Date(
            latestProgress.start_date
          ).getTime();
          const daySpent = Math.ceil(
            (latestProgressDate - startedAt) / millisecondsPerDay
          );

          const progress = totalTasks
            ? Math.floor((completedTasks.length / totalTasks) * 100)
            : 0;

          return {
            id: project.id,
            title: project.title,
            working_hours: accumulatedWorkingHours,
            started_at: project.started_at,
            daySpent: daySpent,
            progress: progress,
            numberOfTasks: project.tasks.length,
            lastProgress:
              latestProgress.progress === "DONE"
                ? latestProgress.start_date
                : null,
          };
        } else {
          const progress = totalTasks
            ? Math.floor((completedTasks.length / totalTasks) * 100)
            : 0;

          return {
            id: project.id,
            title: project.title,
            working_hours: accumulatedWorkingHours,
            started_at: project.started_at,
            daySpent: 0,
            progress: progress,
            numberOfTasks: project.tasks.length,
            lastProgress: null,
          };
        }
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
