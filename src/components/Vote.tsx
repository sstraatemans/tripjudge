import { FC, useState } from "react";
import { Judge } from "../data/entities/Judge";
import SadButton from "./SadButton";
import VoteButton from "./VoteButton";

type Props = {
  judge?: Judge;
  setJudgeData: (value: number) => void;
};

const Vote: FC<Props> = ({ judge, setJudgeData }) => {
  const [over, setOver] = useState<boolean>(false);

  const handleHover = () => {
    setOver(v => !v);
  };

  return (
    <>
      {!over && (
        <SadButton
          value={1}
          judgeValue={judge?.value}
          onMouseOver={handleHover}
        >
          Sad
        </SadButton>
      )}

      <VoteButton
        value={2}
        judgeValue={judge?.value}
        handleClick={setJudgeData}
      >
        OK
      </VoteButton>
      <VoteButton
        value={3}
        judgeValue={judge?.value}
        handleClick={setJudgeData}
      >
        Good
      </VoteButton>
      <VoteButton
        value={4}
        judgeValue={judge?.value}
        handleClick={setJudgeData}
      >
        Awesome
      </VoteButton>
      <VoteButton
        value={5}
        judgeValue={judge?.value}
        handleClick={setJudgeData}
      >
        DRINKING COMA
      </VoteButton>
      {over && (
        <SadButton
          value={1}
          judgeValue={judge?.value}
          onMouseOver={handleHover}
        >
          Sad
        </SadButton>
      )}
    </>
  );
};

export default Vote;
