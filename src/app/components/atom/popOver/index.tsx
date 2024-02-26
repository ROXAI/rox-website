"use client";
import * as React from "react";
import { Popper } from "@mui/base/Popper";
import { FiMoreHorizontal } from "react-icons/fi";

interface SimplePopperProps {
  children: React.ReactNode;
}
export const SimplePopper: React.FC<SimplePopperProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <React.Fragment>
      <button
        type="button"
        aria-describedby={id}
        className="Button"
        onClick={handleClick}
      >
        <FiMoreHorizontal size={20} />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div onClick={handleClick}> {children}</div>
      </Popper>
    </React.Fragment>
  );
};
