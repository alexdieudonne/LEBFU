import { cn } from "@/lib/utils";
import { FC, useState } from "react";

type ToogleBtnProps = {
  title: string;
  id: string;
  isActive?: boolean;
  onToggle: (currentState: boolean, id: string) => void;
};
const ToogleBtn: FC<ToogleBtnProps> = ({
  title,
  onToggle,
  id,
  isActive = false,
}) => {
  const [active, setActive] = useState(false);
  return (
    <button
      className={cn(
        "bg-gray-200 px-4 py-2 rounded-lg flex items-center justify-center",
        isActive ?? active ? "bg-black text-white" : ""
      )}
      onClick={() => {
        setActive(!active);
        onToggle(!active, id);
      }}
    >
      <span className="text-sm">{title}</span>
    </button>
  );
};

export default ToogleBtn;
