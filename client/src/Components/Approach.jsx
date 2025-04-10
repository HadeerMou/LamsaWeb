import React from "react";
import "./approach.css";
import { useTranslation } from "../TranslationContext";

function Approach() {
  const { translations } = useTranslation();
  return (
    <div className="flex flex-wrap approachContainer px-2! pt-14! lg:p-10! justify-around items-center">
      <div className="left !mb-5">
        <h1 className="lg:mb-[5rem]! mb-4! text-xl! sm:text-2xl! md:text-3xl! lg:text-4xl!">
          {translations.ourapproach}
        </h1>
        <div className="three flex flex-wrap sm:gap-2 lg:gap-3">
          <div className="part bg-black/1 lg:p-[50px]! sm:p-10! p-5! rounded-[5px] !border-l !border-[rgba(0, 0, 0, 0.44)]">
            <i class="fa-solid fa-truck-fast"></i>
            <h5 className="font-bold text-xs sm:text-base lg:text-lg !mb-2">
              {translations.fastship}
            </h5>
            <p className="w-20 sm:w-40 lg:w-50 text-[8px] sm:text-sm lg:text-sm">
              {translations.fastcont}
            </p>
          </div>
          <div className="part bg-black/1 lg:p-[50px]! sm:p-10! p-5! !border-l !border-[rgba(0, 0, 0, 0.44)] rounded-[5px]">
            <i class="fa-solid fa-truck-fast"></i>
            <h5 className="font-bold text-xs sm:text-base lg:text-lg !mb-2">
              {translations.highqua}
            </h5>
            <p className="w-20 sm:w-40 lg:w-50 text-[8px] sm:text-sm lg:text-sm">
              {translations.highcont}
            </p>
          </div>
          <div className="part bg-black/1 lg:p-[50px]! sm:p-10! p-5! !border-l !border-[rgba(0, 0, 0, 0.44)] rounded-[5px]">
            <i class="fa-regular fa-face-grin-stars"></i>
            <h5 className="font-bold text-xs sm:text-base lg:text-lg !mb-2">
              {translations.support}
            </h5>
            <p className="w-20 sm:w-40 lg:w-50 text-[8px] sm:text-sm lg:text-sm">
              {translations.supportcont}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden right lg:flex justify-center w-full !sm:w-3/4 md:w-1/2 lg:w-1/3">
        <div className="w-full sm:w-[350px] md:w-[400px] h-auto rounded-md shadow-xl">
          <img
            className="w-[400px] h-[430px] rounded-[5px] shadow-[ -4px_4px_15px_rgba(0,0,0,0.488)]"
            src="assets\Untitled-1-20.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Approach;
