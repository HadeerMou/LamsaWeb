import React from "react";
import { useTranslation } from "../TranslationContext";

export default function HomeGrid() {
  const { translations } = useTranslation();
  return (
    <div class="lg:pb-20! lg:mt-15! bg-red ">
      <div className="relative flex items-center justify-center">
        <div className="img w-full">
          <img
            className="w-full h-auto object-cover"
            src="assets/Group 5.jpg"
            alt=""
          />
        </div>
        <div className=" absolute top-1/4 sm:top-1/3 text-center w-full px-4 mt-3! sm:mt-7!">
          <h3 className="text-2xl! sm:text-3xl! md:text-5xl! lg:text-6xl! font-bold text-black/70 !mt-4">
            {translations.lamsa}
          </h3>
          <p className="text-[7px] sm:text-sm md:text-base lg:text-base max-w-[215px] mt-4! sm:mt-15! lg:mt-8! sm:max-w-[400px] md:max-w-[510px] !mx-auto">
            {translations.brief}
          </p>
        </div>
      </div>
    </div>
  );
}
