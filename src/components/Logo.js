import React from "react";
import { ReactComponent as LogoBrain } from "../svgs/logo-brain.svg";
import { ReactComponent as LogoText } from "../svgs/logo-text.svg";
import "../styles/Logo.scss";

export default function Logo({ playerMode }) {
  return (
    <div className="logo">
      <LogoBrain
        className={playerMode !== null ? "logo-brain shrink" : "logo-brain"}
      />
      <LogoText
        className={playerMode !== null ? "logo-text shrink" : "logo-text"}
      />
    </div>
  );
}
