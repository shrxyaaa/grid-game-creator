import { heebo } from "utils/fonts";

const renderInputBoxes = () => {
  var list = [];

  for (var i = 0; i < 16; i++) list.push(<input className={`${heebo.className} border w-3/4 px-2 py-1 focus:outline-none focus:border-purple-500`} key={i} id={i}></input>);

  return <div className="grid gap-4 grid-rows-8 grid-cols-2">
    {list.map((element) => element)}
  </div>;
};

export default function () {
  return (
    <div className="my-8">
      {renderInputBoxes()}
      <button className={`${heebo.className} text-xl w-fit px-2 py-1 my-4 bg-purple-500 rounded-sm outline-none shadow-md hover:bg-purple-400 text-white transition`}>Create Grid</button>
      {/* DISPLAY LINK WHEN CREATE GRID */}
    </div>
  );
}