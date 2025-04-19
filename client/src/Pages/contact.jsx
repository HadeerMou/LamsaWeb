import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/footer";
import Header from "../Components/header";
import { useTranslation } from "../TranslationContext";
import { GiStarShuriken } from "react-icons/gi";

export default function Contact({ toggleCartVisibility, cart, totalQuantity }) {
  const { translations } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header
          toggleCartVisibility={toggleCartVisibility}
          cart={cart}
          totalQuantity={totalQuantity}
        />
        <main className="flex-grow">
          <div class="flex flex-col gap-2 lg:gap-4 !py-10 line-clamp-2 items-center font-bold justify-center text-center">
            <h2 class="flex text-4xl lg:text-6xl!">
              {translations.contactwith}{" "}
              <img
                src="/assets/Untitled-1-20.jpg"
                className="flex !mx-1 !w-12 h-8 lg:h-12 lg:w-22! rounded-full"
              ></img>{" "}
              {translations.us}
            </h2>
            <h2 className="flex text-4xl lg:text-6xl!">
              {" "}
              <img
                src="/assets/Untitled-1-20.jpg"
                className="!mx-2 !w-12 h-8 lg:h-12 lg:w-22! rounded-full"
              ></img>
              {translations.beforeyou}
            </h2>
            <h2 className="flex text-4xl lg:text-6xl!">
              {translations.commit}
            </h2>
          </div>
          <div className="scroll overflow-hidden flex lg:my-20! bg-red-300/50 ">
            <ul className="flex gap-4 sm:gap-10 items-center py-2! lg:py-4! animate-[infinite-scroll_60s_linear_infinite]">
              {[...Array(3)].map((_, i) => (
                <>
                  <li className="text-md sm:text-2xl lg:text-3xl font-bold">
                    <GiStarShuriken />
                  </li>

                  <li
                    onClick={() => navigate("/")}
                    className="text-lg sm:text-2xl lg:text-4xl font-bold cursor-pointer whitespace-nowrap overflow-hidden"
                  >
                    {translations.lamsa}
                  </li>
                  <li className="text-md sm:text-2xl lg:text-3xl font-bold">
                    <GiStarShuriken />
                  </li>

                  <li
                    onClick={() => navigate("/paintings")}
                    className="text-lg sm:text-2xl lg:text-4xl font-bold cursor-pointer whitespace-nowrap overflow-hidden"
                  >
                    {translations.paintings}
                  </li>
                  <li className="text-md sm:text-2xl lg:text-3xl font-bold">
                    <GiStarShuriken />
                  </li>

                  <li
                    onClick={() => navigate("/curtains")}
                    className="text-lg sm:text-2xl lg:text-4xl font-bold cursor-pointer whitespace-nowrap overflow-hidden"
                  >
                    {translations.curtains}
                  </li>
                </>
              ))}
            </ul>
          </div>
          <div class="flex my-12! lg:my-20!">
            <img
              src="assets/Untitled-1-20.jpg"
              className="h-1/4! w-3/6! lg:w-2/7! rounded-2xl lg:rounded-4xl lg:ms-60! ms-2! "
            />
            <div className="w-1/2 pe-1! lg:pe-0! lg:w-1/3 ps-3! lg:ps-20! flex flex-col !mt-5">
              <h3 className="lg:text-5xl!">{translations.getintouch}</h3>
              <div className="flex justify-between mt-5! lg:mt-20! text-xs! lg:text-lg!">
                <p className="text-black/70!">{translations.email}</p>
                <Link to={"mailto:1998.sudik@gmail.com"}>
                  1998.sudik@gmail.com
                </Link>
              </div>
              <hr className="border! border-black/40!" />
              <div className="flex justify-between mt-4! lg:mt-20! text-xs! lg:text-lg!">
                <p className="text-black/70!">{translations.number}</p>
                <Link>+012345678</Link>
              </div>
              <hr className="border! border-black/40!" />
              <div className="flex justify-between mt-5! lg:mt-20! text-xs! lg:text-lg!">
                <p className="text-black/70!">{translations.address}</p>
                <Link>Cairo - Egypt</Link>
              </div>
              <hr className="border! border-black/40!" />
              <div className="flex flex-col py-8! lg:py-20!">
                <h3 className="lg:text-5xl!">{translations.follow}</h3>
                <ul className="mt-4! lg:mt-10! flex justify-end gap-6 md:gap-8">
                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:text-gray-700/75"
                    >
                      <svg
                        className="size-5 lg:size-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:text-gray-700/75"
                    >
                      <svg
                        className="size-5 lg:size-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:text-gray-700/75"
                    >
                      <svg
                        className="size-5 lg:size-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:text-gray-700/75"
                    >
                      <svg
                        className="size-5 lg:size-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
