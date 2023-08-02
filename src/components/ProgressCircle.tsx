import { Circle } from "rc-progress";

interface ProgressCircleProps {
  progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  return (
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[10px] font-semibold text-gray-400">
          {progress}%
        </div>
      </div>
      <Circle
        percent={progress}
        strokeWidth={10}
        trailWidth={4}
        trailColor="#D3D3D388"
        strokeColor="#2383E2"
      />
    </div>
  );
};

export default ProgressCircle;
