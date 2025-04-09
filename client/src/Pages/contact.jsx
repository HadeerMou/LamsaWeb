import Footer from "../Components/footer";
import Header from "../Components/header";
import { useTranslation } from "../TranslationContext";

export default function Contact({ toggleCartVisibility, cart, totalQuantity }) {
  const { translations } = useTranslation();

  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <div class="">
        <h2 class="text-4xl ">{translations.conthead}</h2>
      </div>
      <div class="contactsection">
        <h3 class="question mb-5">{translations.question}</h3>
        <a href="mailto:info@cultsmma.com">
          <button className="contactemail">{translations.contactemail}</button>
        </a>
      </div>
      <Footer />
    </>
  );
}
