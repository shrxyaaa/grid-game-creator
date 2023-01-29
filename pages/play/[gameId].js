import GameArea from "components/GameArea";
import AppContext from "components/AppContext";
import { useState, useContext, useEffect } from "react";
import { montserrat, heebo } from "utils/fonts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useRouter } from "next/router";

function GameplayPage() {
  const router = useRouter();
  const context = useContext(AppContext);
  const [cardsData, setCardsData] = useState([]);
  const [timer, setTimer] = useState(0);

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

  useEffect(() => {
    getDoc(doc(db, `GRIDS/${router.query.gameId}`))
      .then((doc) => {
        const cardsDataList = [];
        const data = doc.data()
        console.log(data);
        for (const key in data) {
          let item = [];
          item.push(key);
          item.push(data[key])
          console.log(item);
          cardsDataList.push(item);
        }

        console.log(cardsDataList);
        setCardsData(cardsDataList);
      })
      .catch((error) => {
        console.log(`Error while fetching: ${error}`);
      });
  }, [router.query.gameId]);

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
