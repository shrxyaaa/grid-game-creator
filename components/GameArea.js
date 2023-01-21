import { useEffect, useState } from "react";
import { heebo } from "utils/fonts";

function GameArea({ cardsData }) {
  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(-1);

  const cardClickHandler = e => {
	let cardId = e.target.getAttribute("cardId");
	let elem = e.target;
	let text = elem.firstChild;
	text.classList.toggle("hidden")
	if (selectedCard === -1) {
		setSelectedCard(cardId)
	}
  }

  const createCardList = () => {
    const list = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 2; j++) {
        let element = (
          <div
            cardId={i}
            onClick={cardClickHandler}
            className={` ${heebo.className} p-8 w-36 grid place-items-center h-36 text-2xl border-4 bg-purple-100 border-purple-800 rounded-xl transition cursor-pointer hover:bg-purple-300`}
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

  useEffect(() => {
    createCardList();
  }, []);

  return (
    <div className="grid grid-rows-4 grid-cols-4 gap-8 place-items-center text-center">
      {cardList.map((card) => card)}
    </div>
	
  );
}

export default GameArea;
