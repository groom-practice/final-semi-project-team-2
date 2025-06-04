"use client";

import { useState } from "react";

type ToggleButtonProps = {
  value?: boolean; // 외부에서 토글 상태 제어
  onToggle?: (newValue: boolean) => void; // 상태 변경시 호출되는 함수
};

function ToggleButton({ value, onToggle }: ToggleButtonProps) {
  const [internalValue, setInternalValue] = useState(false);

  const isControlled = value !== undefined; // 외부에서 넘거줬는지 판단
  const enabled = isControlled ? value : internalValue; // 현재 토글 상태(value 없으면 내부값 사용)

  const toggle = () => {
    const newValue = !enabled;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onToggle?.(newValue);
  };

  return (
    <div
      onClick={toggle}
      className={`relative w-[60px] h-[32px] rounded-full transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden
        ${enabled ? "bg-blue-500" : "bg-slate-300"}
      `}
    >
      <div
        className={`
          absolute top-1 left-1 w-[24px] h-[24px] rounded-full transition-transform duration-500 ease-in-out cursor-pointer
          ${enabled ? "bg-white" : "bg-slate-500"}
        `}
        style={{
          transform: `translateX(${enabled ? "28px" : "0px"})`,
        }}
      />
    </div>
  );
}

export default ToggleButton;
