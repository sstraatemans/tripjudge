import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";

export type Props = ButtonProps & {
  handleClick?: (value: number) => void;
  children: string;
  value: number;
  judgeValue?: number;
};

const VoteButton: FC<Props> = ({
  children,
  handleClick = () => {},
  value,
  judgeValue,
  onMouseOver = () => {},
}) => {
  const checkSelected = (): boolean => {
    if (!judgeValue) return false;
    return parseInt("" + judgeValue, 10) === value;
  };

  return (
    <Button
      style={{ fontSize: "50px" }}
      onMouseOver={onMouseOver}
      variant={checkSelected() ? "outlined" : "contained"}
      onClick={() => {
        if (!checkSelected()) handleClick(value);
      }}
    >
      {children}
    </Button>
  );
};

export default VoteButton;
