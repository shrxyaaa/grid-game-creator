import { heebo } from "utils/fonts";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useState } from "react";
import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  const [inputBoxValues, setInputBoxValues] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [gridUrl, setGridUrl] = useState("");

  const updateState = (value, i, j) => {
    let newList = inputBoxValues.map((pair, row) => {
      if (row == i) {
        return pair.map((str, col) => {
          if (col == j) return value;
          else return str;
        });
      } else {
        return pair;
      }
    });
    setInputBoxValues(newList);
  };

  const renderInputBoxes = () => {
    var inputBoxList = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 2; j++) {
        inputBoxList.push(
          <input
            value={inputBoxValues[i][j]}
            onChange={(e) => updateState(e.target.value, i, j)}
            className={`${heebo.className} border w-3/4 px-2 py-1 focus:outline-none focus:border-purple-500`}
            key={`${i},${j}`}
            id={`${i},${j}`}
          ></input>
        );
      }
    }

    return (
      <div className="grid gap-4 grid-rows-8 grid-cols-2">
        {inputBoxList.map((element) => element)}
      </div>
    );
  };
  const addData = () => {
    let uniqueID = createRandom(6);
    //const dbRef= doc(db,'CRUD',uniqueID);
    console.log(uniqueID);

    let dataMap = {};
    for (let i = 0; i < 8; i++) {

      // error status code

      let q = inputBoxValues[i][0];
      let a = inputBoxValues[i][1];
      dataMap[q] = a;
      // Object.assign(dataMap, inputBoxValues[i][0], inputBoxValues[i][1]);
    }
    console.log(dataMap);
    setDoc(doc(db, "GRIDS", uniqueID), dataMap);

    setGridUrl(`${router.basePath}/play/${uniqueID}`);
  };

  const createRandom = (stringLenght) => {
    let randomString = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < stringLenght; i++)
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );

    return randomString;
  };

  return (
    <div className="my-8">
      {renderInputBoxes()}
      {gridUrl == "" && (
        <button
          className={`${heebo.className} text-xl w-fit px-2 py-1 my-4 bg-purple-500 rounded-sm outline-none shadow-md hover:bg-purple-400 text-white transition`}
          onClick={() => {
            addData();
          }}
        >
          Create Grid
        </button>
      )}
      {gridUrl != "" && (
        <a className="text-2xl text-pink-500 font-bold underline hover:text-pink-600" href={gridUrl} target="_blank">{gridUrl}</a>
      )}
    </div>
  );
}
