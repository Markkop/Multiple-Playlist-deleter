import { useEffect, useState } from "react";
import Selecto from "react-selecto";

export default function SelectoWrapper({
  selectoRef,
  handleSelect,
  selectableTargets,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  return (
    <>
      {!isMobile && (
        <Selecto
          ref={selectoRef}
          selectableTargets={selectableTargets}
          hitRate={0}
          selectByClick={true}
          selectFromInside={true}
          continueSelect={true}
          onSelect={handleSelect}
          toggleContinueSelect={"shift"}
        />
      )}
    </>
  );
}
