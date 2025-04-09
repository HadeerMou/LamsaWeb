import React from "react";
import { useTranslation } from "../TranslationContext";

export default function HomeGrid() {
  const { translations } = useTranslation();
  return (
    <div class="!pb-20  bg-red ">
      <div className="relative flex items-center justify-center">
        <div className="img w-full">
          <img
            className="w-full h-auto object-cover"
            src="assets/Group 5.jpg"
            alt=""
          />
        </div>
        <div className=" absolute top-1/4 sm:top-1/3 text-center w-full px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black/70 !mt-4">
            {translations.lamsa}
          </h1>
          <p className="text-[8px] sm:text-sm md:text-base lg:text-lg max-w-[215px] !mt-6 sm:max-w-[400px] md:max-w-[510px] !mx-auto">
            {translations.brief}
          </p>
        </div>
      </div>
    </div>
  );
}
