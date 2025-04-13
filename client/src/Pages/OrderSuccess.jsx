import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../TranslationContext";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { translations } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-4! rounded-lg shadow-lg text-center">
        <i className="fa fa-check-circle text-success display-2 fs-2"></i>
        <h2 className="mt-4! text-2xl font-semibold text-gray-800">
          {translations.orderplaces}
        </h2>
        <p className="text-gray-600 mt-2!">
          {translations.thankyou} <br />
        </p>
        <button
          className="mt-4! px-6! py-2! bg-green-500! text-white rounded-lg hover:bg-green-600! transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          {translations.gohome}
        </button>
      </div>
    </div>
  );
}
