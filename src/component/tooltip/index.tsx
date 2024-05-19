import { TooltipProps } from "@/types";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
const TooltipComponent: React.FC<TooltipProps> = ({ content, name }) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger
          className="tooltip-trigger"
          name={name}
          title={name}
          aria-label={name}
        >
          <AiOutlineInfoCircle className="text-nasa-gray-light" />
        </Tooltip.Trigger>
        <Tooltip.Content className="bg-gray-200 text-11 p-2 w-[400px] flex flex-col justify-center items-center text-center z-50">
          <AiOutlineInfoCircle className="text-nasa-gray-light" />
          {content}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
