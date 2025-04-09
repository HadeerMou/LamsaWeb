import Cart from "../Components/cart";
import Footer from "../Components/footer";
import Header from "../Components/header";
import { useTranslation } from "../TranslationContext";
import { useEffect, useState } from "react";
import { GiStarShuriken } from "react-icons/gi";

export default function About({ toggleCartVisibility, cart, totalQuantity }) {
  const { translations } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <section
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/9008 mockup.jpg')" }}
      >
        <div className="!pt-100 !p-20">
          <h1 className="!text-5xl text-white lg:text-gray-800">
            {translations.abtit}
          </h1>
          <p className="!mt-14 text-lg max-w-3xl">{translations.intro}</p>
        </div>
      </section>
      <div className="scroll overflow-hidden flex">
        <ul className="flex gap-6 sm:gap-10 items-center !py-4 animate-[infinite-scroll_60s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <>
              <li className="text-xl sm:text-2xl font-bold">
                <GiStarShuriken />
              </li>

              <li className="text-lg sm:text-2xl font-bold">
                {translations.lamsa}
              </li>
            </>
          ))}
        </ul>
      </div>

      <div className="!p-6 !sm:p-10 !mt-5 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {translations.aboutlamsa}
        </h2>
        <p className="!py-3 !mt-6 text-base sm:text-lg md:text-xl max-w-7xl">
          {translations.aboutcontent}
        </p>
        <hr className="bg-black/50 rounded h-0.5 w-full !mt-20" />
      </div>
      <div className="flex">
        <div className="!p-6 !sm:p-10 !m-5 bg-red-50 rounded-2xl shadow-lg w-full sm:w-3/4 lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {translations.vision}
          </h2>
          <p className="!py-3 !mt-6 text-base sm:text-lg md:text-xl">
            {translations.visioncont}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        {" "}
        <div className="!p-6 !sm:p-10 !m-5 bg-red-50 rounded-2xl shadow-lg shadow-red-100/60 hover:shadow-red-200/50 w-full sm:w-3/4 lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {translations.mission}
          </h2>
          <p className="!py-3 !mt-6 text-base sm:text-lg md:text-xl">
            {translations.aim}
            <ul className="list-disc list-inside">
              <li>{translations.mission1}</li>
              <li>{translations.mission2}</li>
              <li>{translations.mission3}</li>
              <li>{translations.mission4}</li>
            </ul>
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="!p-6 !sm:p-10 !m-5 bg-red-50 rounded-2xl shadow-lg w-full sm:w-3/4 lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {translations.values}
          </h2>
          <p className="!py-3 !mt-6 text-base sm:text-lg md:text-xl">
            <ul className="list-disc list-inside">
              <li>{translations.value1}</li>
              <li>{translations.value2}</li>
              <li>{translations.value3}</li>
              <li>{translations.value4}</li>
              <li>{translations.value5}</li>
            </ul>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
