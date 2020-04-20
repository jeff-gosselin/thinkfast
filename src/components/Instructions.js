import React from "react";
import { ReactComponent as LogoBrain } from "../svgs/logo-brain.svg";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Logo.scss";

export default function Instructions() {
  return (
    <div className="instructions">
      <LogoBrain />
      <LogoText />
    </div>
  );
}
