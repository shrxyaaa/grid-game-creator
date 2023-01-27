import GameArea from "components/GameArea";
import AppContext from "components/AppContext";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { montserrat, heebo } from "utils/fonts";

function GameplayPage() {
  const router = useRouter();
  const context = useContext(AppContext);
  const gameId = router.query.gameId;
  const [timer, setTimer] = useState(0);

  const cardsData = [
    ["1+1", "2"],
    ["2+2", "4"],
    ["3+3", "6"],
    ["4+4", "8"],
    ["5+5", "10"],
    ["6+6", "12"],
    ["7+7", "14"],
    ["8+8", "16"],
  ];

  const getTime = () => {
    return `${Math.trunc(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${
      timer % 60
    }`;
  };

  useEffect(() => {
    console.log(context.gameCompleted);
    setTimeout(() => {
      if (!context.gameCompleted) setTimer(timer + 1);
    }, 1000);
  }, [timer]);

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] w-11/12 mx-auto my-4">
      <div className="flex-col flex">
        <p
          className={`${montserrat.className} text-2xl text-pink-500 font-bold`}
        >
          Timer
        </p>
        <div className={`${heebo.className} text-4xl font-bold`}>
          {getTime()}
        </div>
        {context.gameCompleted && (
          <div className="my-auto ">
            <p className={`${montserrat.className} text-3xl my-4`}>
              Congratulations 🏆
            </p>
            <p className={`${heebo.className} text-xl`}>
              You completed the game with{" "}
              <span className="font-bold text-pink-500">{context.lives}</span>{" "}
              lives left in just{" "}
              <span className="font-bold text-pink-500">{getTime()}</span> time
            </p>
          </div>
        )}
      </div>
      <div className="mx-auto">
        <GameArea cardsData={cardsData} />
      </div>
      <div className="flex-col flex items-end">
        <p
          className={`${montserrat.className} text-right text-2xl text-pink-500 font-bold`}
        >
          Lives Left
        </p>
        <div className={`${heebo.className} text-4xl font-bold`}>
          {context.lives}
        </div>
      </div>
    </div>
  );
}

export default GameplayPage;
