import { FC, useState } from "react";
import { Judge, ValueType } from "../data/entities/Judge";
import SadButton from "./SadButton";
import VoteButton from "./VoteButton";

type Props = {
  judge?: Judge;
  setJudgeData: (value: number) => void;
};

type VoteValue = {
  value: ValueType;
  label: string;
};
const voteValues: VoteValue[] = [
  {
    value: 1,
    label: "👎",
  },
  {
    value: 2,
    label: "👍",
  },
  {
    value: 3,
    label: "❤️",
  },
  {
    value: 4,
    label: "🤙",
  },
  {
    value: 5,
    label: "🍻🤮",
  },
];

const Vote: FC<Props> = ({ judge, setJudgeData }) => {
  const [over, setOver] = useState<boolean>(false);

  const handleHover = () => {
    setOver(v => !v);
  };

  const sortVotes = (a: VoteValue, b: VoteValue) => {
    if (over && a.value < b.value) return 1;
    if (over && a.value > b.value) return -1;
    if (!over && a.value < b.value) return -1;
    if (!over && a.value > b.value) return 1;
    return 0;
  };

  return (
    <>
      {voteValues.sort(sortVotes).map((vote: VoteValue) => {
        if (vote.value === 1) {
          return (
            <SadButton
              key={vote.value}
              value={vote.value}
              judgeValue={judge?.value}
              onMouseOver={handleHover}
            >
              {vote.label}
            </SadButton>
          );
        }
        return (
          <VoteButton
            key={vote.value}
            value={vote.value}
            judgeValue={judge?.value}
            handleClick={setJudgeData}
          >
            {vote.label}
          </VoteButton>
        );
      })}
    </>
  );
};

export default Vote;
