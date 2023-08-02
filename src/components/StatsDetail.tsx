import { formatAverage } from "~/utils/formatAverage";
import { formatDate } from "~/utils/formatDate";
import { formatWorkingHours } from "~/utils/formatWorkingHours";
import type { Project } from "~/utils/types";

interface StatsDetailProps {
  projectData: Project;
}

const StatsDetail: React.FC<StatsDetailProps> = ({ projectData }) => {
  return (
    <div className="rounded-lg bg-gray-900 p-4">
      <div className="text-gray-400">
        Progress: <span className="text-gray-300">{projectData.progress}%</span>
      </div>
      <p className="text-gray-400">
        Working hours:{" "}
        <span className="text-gray-300">
          {formatWorkingHours(projectData.working_hours)}
        </span>
      </p>
      <p className="text-gray-400">
        Days spent:{" "}
        <span className="text-gray-300">{projectData.daySpent} days</span>
      </p>
      <p className="text-gray-400">
        Avg. (per day):{" "}
        <span className="text-gray-300">
          {formatAverage(
            Math.ceil(projectData.working_hours / (projectData.daySpent || 1))
          )}
        </span>
      </p>
      {/* last progress */}
      {projectData.lastProgress && (
        <p className="text-gray-400">
          Last progress:{" "}
          <span className="text-gray-300">
            {new Date(projectData.lastProgress).toLocaleString()}
          </span>
        </p>
      )}
      {/* started_at */}
      {projectData.started_at && (
        <p className="text-gray-400">
          Started at:{" "}
          <span className="text-gray-300">
            {formatDate(projectData.started_at)}
          </span>
        </p>
      )}
    </div>
  );
};

export default StatsDetail;
