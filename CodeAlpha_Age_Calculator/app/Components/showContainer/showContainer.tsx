import { useEffect, useRef, useState, type RefObject } from "react";
export default function ShowElement({
  type,
  value,
}: {
  type: string;
  value: number;
}) {
  const ref: RefObject<HTMLSpanElement> | RefObject<() => null> = useRef(
    () => null
  );
  let Interval: NodeJS.Timeout | null = null;
  const formatNumber = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  useEffect(() => {
    console.log("now should works");
    return () => {
      if (Interval != null) clearInterval(Interval);
    };
  }, [value]);
  if (value != -1) {
    if (Interval !== null) clearInterval(Interval);
    let counter = 0;
    Interval = setInterval(() => {
      console.log("something");
      const span: HTMLSpanElement = ref.current as unknown as HTMLSpanElement;
      if (counter <= value) span.innerText = formatNumber(counter++);
      else if (Interval !== null) clearInterval(Interval);
    }, 0);
  }
  return (
    <div className="showContainer">
      <span
        ref={ref as unknown as RefObject<HTMLSpanElement>}
        id={type.toLocaleLowerCase()[0] + "show"}
        className="show"
      >
        --
      </span>
      {type.toLowerCase()}
    </div>
  );
}
