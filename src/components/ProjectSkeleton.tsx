import React from "react";

const ProjectSkeleton = ({ number }: { number: number }) => {
  const placeholders = Array.from({ length: number }).map((_, index) => (
    <div
      key={index}
      className="animate-pulse cursor-pointer rounded-lg border-gray-500 bg-gray-900 p-4 shadow-md"
    >
      {/* Title and Percentage */}
      <div className="mb-2 flex gap-2">
        <div className="mb-0.5 h-6 w-full animate-pulse rounded-md bg-gray-700"></div>
      </div>
      {/* working hours */}
      <div className="mb-2 flex gap-2">
        <div className="h-12 w-3/4 animate-pulse rounded-md bg-gray-700"></div>
        <div className="h-12 w-1/4 animate-pulse rounded-md bg-gray-700"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-1/3">
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-700"></div>
        </div>
        <div className="w-2/3">
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-700"></div>
        </div>
      </div>
    </div>
  ));

  return <>{placeholders}</>;
};

export default ProjectSkeleton;
