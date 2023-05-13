import { useEffect, useState } from "react";
import Selecto from "react-selecto";

export default function SelectoWrapper({
  selectoRef,
  handleSelect,
  selectableTargets,
  isMobile,
}) {
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
