import Image from "next/image";

import headerGraphic from 'public/headerGraphic.svg'
import { heebo, montserrat } from "utils/fonts";

const HomeHeader = () => {
  return (
    <div>
      <div className="grid grid-cols-2 mt-36 items-center">
        <div className={`${montserrat.className} text-5xl`}>
          <p className="font-bold tracking-wider">Grid Game</p>
          <p className="text-5xl">Creator ⚒️</p>
          <p className="text-2xl mt-8">Create a <span className="text-[#6C63FF]">Memory Game</span> for students 🧑‍🎓</p>
        </div>
        <Image className="select-none" draggable={false} src={headerGraphic}></Image>
      </div>

    </div>
  );
};

export default HomeHeader;
