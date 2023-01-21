import GameArea from "components/GameArea";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function GameplayPage() {
  const router = useRouter();
  const gameId = router.query.gameId;

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

  useEffect(() => {
    console.log("Hello");
  }, []);

  return (
    <div>
      {/* Timer at the top */}
      <div className="w-1/2 mx-auto my-8">
        <GameArea cardsData={cardsData} />
      </div>

      <div className="w-3/5 mx-auto my-8 flex gap-4 justify-center">
        Display these buttons when 2 cards are selected
        <div className="text-xl p-6 border-4 rounded-md w-fit cursor-pointer bg-green-100 border-green-400 hover:text-green-600">
          <FaCheck />
        </div>
        <div className="text-xl p-6 border-4 rounded-md w-fit cursor-pointer bg-red-100 border-red-400 hover:text-red-600">
          <FaTimes />
        </div>
      </div>
    </div>
  );
}

export default GameplayPage;
