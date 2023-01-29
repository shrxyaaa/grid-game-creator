import { useContext, useEffect, useState } from "react";
import { heebo } from "utils/fonts";
import { FaCheck, FaTimes } from "react-icons/fa";
import AppContext from "./AppContext";


function GameArea({ cardsData }) {
  const context = useContext(AppContext);
  const [cardList, setCardList] = useState([]);
  const [day, setDay] = useState(0);
  const [selectedCardList, setSelectedCardList] = useState([]);
  const [guess, setGuess] = useState("");
  const [numMatchedPairs, setNumMatchedPairs] = useState(1)

  const cardsLayoutStyle = `${heebo.className} p-8 w-24 h-24 xl:w-36 xl:h-36  grid place-items-center text-2xl border-4  rounded-xl transition cursor-pointer`;

  const cardClickHandler = (e) => {
    if (selectedCardList.length < 2 && e.target.getAttribute("cardid") != null) {
      let elem = e.target;
      let text = elem.firstChild;
      if (text.classList.contains("hidden"))
      {
        let newList = selectedCardList;
        newList.push(elem);
        setSelectedCardList(newList);
      }
      else
      {
        selectedCardList.pop();
      }
      text.classList.toggle("hidden");
      setDay(selectedCardList.length);
    }
  };

  const createCardList = () => {
    const list = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 2; j++) {
        let element = (
          <div
            key={`${i}${j}`}
            cardid={i}
            onClick={cardClickHandler}
            className={`${cardsLayoutStyle} bg-purple-100 border-purple-800 hover:bg-purple-300`}
          >
            <span className="hidden">{cardsData[i][j]}</span>
          </div>
        );
        list.push(element);
      }
    }
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }

    setCardList(list);
  };

  const checkCards = (checkCondition) => {
    let cardId1 = selectedCardList[0].getAttribute("cardid");
    let cardId2 = selectedCardList[1].getAttribute("cardid");
    let equalOption = checkCondition == "equal" && cardId1 == cardId2;
    let inequalOption = checkCondition == "inequal" && cardId1 != cardId2;

    if (equalOption) {
      setNumMatchedPairs(numMatchedPairs+1);
      console.log(numMatchedPairs);
      if (numMatchedPairs == cardsData.length) {
        console.log("Game completed, now updating state")
        context.setGameCompleted(true);
      }
    }

    if (equalOption || inequalOption) setGuess("Correct Option!");
    else setGuess("Incorrect Option!");

    if (inequalOption && !equalOption) {
      selectedCardList.forEach((elem) => {
        elem.firstChild.classList.toggle("hidden");
      });
    } else {
      selectedCardList.forEach((elem) => {
        elem.removeAttribute("cardid");
        elem.setAttribute("class", `${cardsLayoutStyle} bg-pink-100 border-pink-500`)
      });
    }

    selectedCardList.pop();
    selectedCardList.pop();
    setDay(selectedCardList.length);
    setTimeout(() => {
      setGuess("");
    }, 2000);
  };

  useEffect(() => {
    console.log(cardsData);
    createCardList();
  }, []);

  return (
    <div>
      <div className="grid grid-rows-4 grid-cols-4 gap-8 place-items-center text-center">
        {cardList.map((card) => card)}
      </div>
      <div className="w-3/5 mx-auto my-8 grid place-items-center">
        {day == 2 && (
          <div>
            <p className={`${heebo.className} my-2 text-lg`}>
              Are the two cards related?
            </p>
            <div className="flex gap-4">
              <div
                onClick={() => checkCards("equal")}
                className="text-xl p-6 border-4 rounded-md w-fit cursor-pointer bg-green-100 border-green-400 hover:text-green-600"
              >
                <FaCheck />
              </div>
              <div
                onClick={() => checkCards("inequal")}
                className="text-xl p-6 border-4 rounded-md w-fit cursor-pointer bg-red-100 border-red-400 hover:text-red-600"
              >
                <FaTimes />
              </div>
            </div>
          </div>
        )}
        {day < 2 && guess != "" && <div className="text-3xl">{guess}</div>}
      </div>
    </div>
  );
}

export default GameArea;
