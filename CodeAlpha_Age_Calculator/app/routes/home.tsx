import { useEffect, useRef, useState, type JSX, type RefObject } from "react";
import useCalcTime, { type date } from "~/Components/Hooks/useCalculator";
import InputElement from "~/Components/Input/inputElement";
import ShowElement from "~/Components/showContainer/showContainer";

export default function Home() {
  const types = ["Day", "Month", "Year"];
  let getCalculatedDate: date;
  const days: RefObject<() => null> | RefObject<HTMLInputElement> = useRef(
    () => null
  );
  const months: RefObject<() => null> | RefObject<HTMLInputElement> = useRef(
    () => null
  );
  const years: RefObject<() => null> | RefObject<HTMLInputElement> = useRef(
    () => null
  );
  const arr: any[] = [days, months, years];
  const [state, updateState] = useState(() => "");
  const [output, updateOutput] = useState(useCalcTime());
  function vaildation() {
    try {
      const year: number = parseInt((years.current as HTMLInputElement).value);
      const day: number = parseInt((days.current as HTMLInputElement).value);
      const month: number = parseInt(
        (months.current as HTMLInputElement).value
      );
      let setFullYear = `${year}-${month}-${day}`;
      let date = new Date(setFullYear);
      let dateNow = new Date(Date.now());
      let enable = true;
      console.log(month - 1);
      console.log(date.getMonth());

      if (date.getMonth()) {
        if (month - 1 != date.getMonth() && day) {
          updateState("Must be a valid day");
          console.log("day is not vaild");
          enable = false;
        }else if(year== dateNow.getFullYear()&& (month > (dateNow.getMonth() + 1) || month == (dateNow.getMonth() + 1) && day >= dateNow.getDate() )){
          updateState("Must be a valid date in the past");
        }
        else if (day) {
          updateState("");
        }
      }
      if (enable) updateOutput(useCalcTime(year, month, day));
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <>
      <main>
        <div id="container">
          <form action="" onSubmit={() => false}>
            <div>
              {types.map((type, i) => {
                return (
                  <InputElement
                    type={type}
                    validationError={
                      state
                        .toLocaleLowerCase()
                        .includes(type.toLocaleLowerCase())||state.toLocaleLowerCase()
                        .includes("date")
                        ? state
                        : ""
                    }
                    ref={arr[i]}
                  />
                );
              })}
            </div>
            <button
              type="button"
              onClick={vaildation}
              title="calculate"
            ></button>
          </form>
          <hr />

          {(function tt(): JSX.Element[] {
            const arr = [output.days, output.months, output.years];
            return types.map((type, i) => {
              return <ShowElement type={type} anError={state.includes("valid")} value={arr[i]} />;
            });
          })()}
        </div>
      </main>
      <footer>
        &copy;Mohamed Ghonim - @CodeAlpha - #using frontend mentor designs
      </footer>
    </>
  );
}
