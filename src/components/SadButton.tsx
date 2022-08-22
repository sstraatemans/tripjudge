import { ButtonProps } from "@mui/material";
import { FC } from "react";
import VoteButton from "./VoteButton";

type SadButtonProps = ButtonProps & {
  children: string;
  value: number;
  judgeValue?: number;
};

const SadButton: FC<SadButtonProps> = ({
  children,
  value,
  judgeValue,
  onMouseOver,
}) => {
  return (
    <VoteButton
      onClick={() => {}}
      value={value}
      judgeValue={judgeValue}
      onMouseOver={onMouseOver}
    >
      {children}
    </VoteButton>
  );
};

export default SadButton;
