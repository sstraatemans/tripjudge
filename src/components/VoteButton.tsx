import { Button } from "@mui/material";
import { FC } from "react";

type ButtonProps = {
  onClick: () => void;
  children: string;
};

const VoteButton: FC<ButtonProps> = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default VoteButton;
