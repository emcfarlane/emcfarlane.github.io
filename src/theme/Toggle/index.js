import React, { useState } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import clsx from "clsx";

export default function (props) {
  const { onChange, className, checked } = props;
  const [open, setOpen] = useState(!checked);
  const { isClient } = useDocusaurusContext();
  if (!isClient) {
    return <span {...props} />;
  }

  return (
    <div
      onClick={(e) => {
        setOpen(!open);
        onChange(e);
      }}
      className={clsx(
        className,
        "navbar__item",
        "header-sunmoon",
        "header-logo"
      )}
      aria-label="Dark mode toggle"
      checked={open}
    ></div>
  );
}
