"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import LanguageSelector from "./languageSelector";

type TeamsType = {
  [key: string]: string[];
};

const RegistrationForm = () => {
  type FormData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    birthMonth: string;
    birthDay: string;
    birthYear: string;
    streetAddress: string;
    addressLine2: string;
    city: string;
    state: string;
    league: string;
    division: string;
    team: string;
  };
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    league: "",
    division: "",
    team: "",
  });

  const data = {
    leagues: ["USL W League"],
    divisions: ["Central Division", "South Division"],
    teams: {
      "Central Division": [
        "Chicago Dutch Lions",
        "Detroit City FC",
        "Green Bay Glory",
        "Illinois FC",
        "Kings Hammer FC",
        "Minneapolis City SC",
        "Music City SC",
        "Racing Louisville FC II",
        "St. Charles FC",
        "St. Louis Lions",
        "TCO Minnesota",
        "Thunder Bay Chill",
        "FREE AGENT",
      ],
      "South Division": [
        "Atlanta Panthers",
        "Birmingham Legion FC",
        "Capital City Cougars",
        "FC Miami City",
        "Florida Elite Soccer",
        "Florida Krush",
        "Miami AC",
        "Orlando Kicks",
        "South Carolina United",
        "Southern Soccer Academy",
        "Tampa Bay United",
        "United Soccer Alliance",
        "FREE AGENT",
      ],
    } as TeamsType,
  };

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "es">("en");

  const [submittedLanguage, setSubmittedLanguage] = useState<"en" | "es">("en");

  const handleLanguageChange = (language: "en" | "es") => {
    setSelectedLanguage(language);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setSubmittedLanguage(selectedLanguage);
  };

  interface ThankYouScreenProps {
    formData: FormData;
  }

  const ThankYouScreen: React.FC<
    ThankYouScreenProps & {
      submittedLanguage: "en" | "es";
    }
  > = ({ formData, submittedLanguage }) => (
    <div className="min-h-screen bg-white p-6 sm:p-8 flex flex-col items-center justify-center text-center">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          {submittedLanguage === "en"
            ? "Thank you for registering!"
            : "¡Gracias por registrarte!"}
        </h1>
        <p className="text-xl text-gray-600">
          {submittedLanguage === "en"
            ? `We have received your application for ${formData.team}.`
            : `Hemos recibido tu solicitud para ${formData.team}.`}
        </p>
        <p className="text-gray-500">
          {submittedLanguage === "en"
            ? "You will receive a confirmation email shortly."
            : "Recibirás un correo de confirmación en breve."}
        </p>
      </div>
    </div>
  );

  const handleInput = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Clear dependent fields when parent selection changes
      ...(field === "league" && { division: "", team: "" }),
      ...(field === "division" && { team: "" }),
    }));

    // Auto-advance to next step after selection
    if (field === "league" || field === "division") {
      handleNext();
    }
  };

  const handleNext = () => {
    if (step === 4 && !formData.league) {
      return; // Don't proceed if no league selected
    }
    if (step === 5 && !formData.division) {
      return; // Don't proceed if no division selected
    }

    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const isNextDisabled = () => {
    if (step === 4) return !formData.league; // League step
    if (step === 5) return !formData.division; // Division step
    if (step === 6) return step === steps.length - 1; // Team step (last step)
    return false; // All other steps are freely navigable
  };

  const inputClasses =
    "w-full text-xl p-4 border-b border-gray-200 focus:border-b-2 focus:border-[#170CB4] focus:outline-none bg-transparent placeholder-gray-400 text-[#1E1E1E] font-medium";

  const steps = [
    // Name Block
    {
      title:
        selectedLanguage === "en" ? "What's your name?" : "¿Cuál es tu nombre?",
      content: (
        <div className="space-y-8">
          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              {selectedLanguage === "en" ? "First Name" : "Nombre"}
            </label>
            <input
              type="text"
              placeholder={
                selectedLanguage === "en"
                  ? "Enter your first name"
                  : "Ingresa tu nombre"
              }
              value={formData.firstName}
              onChange={(e) => handleInput("firstName", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              {selectedLanguage === "en" ? "Last Name" : "Apellido"}
            </label>
            <input
              type="text"
              placeholder={
                selectedLanguage === "en"
                  ? "Enter your last name"
                  : "Ingresa tu apellido"
              }
              value={formData.lastName}
              onChange={(e) => handleInput("lastName", e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>
      ),
    },
    // contact info block
    {
      title:
        selectedLanguage === "en" ? "Contact Info" : "Información de Contacto",
      content: (
        <div className="space-y-8">
          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              {selectedLanguage === "en"
                ? "Phone number"
                : "Numero de Telefono"}
            </label>
            <input
              type="text"
              placeholder="831-123-4567"
              value={formData.phoneNumber}
              onChange={(e) => handleInput("phoneNumber", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              {selectedLanguage === "en" ? "Email" : "Correo Electronico"}
            </label>
            <input
              type="text"
              placeholder="hello@example.com"
              value={formData.email}
              onChange={(e) => handleInput("email", e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>
      ),
    },
    {
      title:
        selectedLanguage === "en" ? "Date of Birth" : "Fecha de Nacimiento",
      content: (
        <div className="space-y-8">
          <div className="flex gap-4">
            <div style={{ width: "80px" }}>
              <label className="text-black text-xl font-medium">
                {" "}
                {selectedLanguage === "en" ? "Month" : "Mes"}
              </label>
            </div>
            <div style={{ width: "80px" }}>
              <label className="text-black text-xl font-medium">
                {selectedLanguage === "en" ? "Day" : "Día"}
              </label>
            </div>
            <div style={{ width: "120px" }}>
              <label className="text-black text-xl font-medium">
                {selectedLanguage === "en" ? "Year" : "Año"}
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="MM"
              value={formData.birthMonth}
              onChange={(e) =>
                handleInput(
                  "birthMonth",
                  e.target.value.replace(/\D/g, "").slice(0, 2)
                )
              }
              className="w-[80px] text-3xl p-4 border-b border-gray-200 focus:border-b-2 focus:border-[#170CB4] focus:outline-none bg-transparent placeholder-gray-400 text-[#1E1E1E] font-medium"
            />

            <span className="text-3xl text-[#4238D5]">/</span>

            <input
              type="text"
              placeholder="DD"
              value={formData.birthDay}
              onChange={(e) =>
                handleInput(
                  "birthDay",
                  e.target.value.replace(/\D/g, "").slice(0, 2)
                )
              }
              className="w-[80px] text-3xl p-4 border-b border-gray-200 focus:border-b-2 focus:border-[#170CB4] focus:outline-none bg-transparent placeholder-gray-400 text-[#1E1E1E] font-medium"
            />

            <span className="text-3xl text-[#4238D5]">/</span>

            <input
              type="text"
              placeholder={selectedLanguage === "en" ? "YYYY" : "AAAA"}
              value={formData.birthYear}
              onChange={(e) =>
                handleInput(
                  "birthYear",
                  e.target.value.replace(/\D/g, "").slice(0, 4)
                )
              }
              className="w-[120px] text-3xl p-4 border-b border-gray-200 focus:border-b-2 focus:border-[#170CB4] focus:outline-none bg-transparent placeholder-gray-400 text-[#1E1E1E] font-medium"
            />
          </div>
        </div>
      ),
    },
    // Address Block
    {
      title:
        selectedLanguage === "en"
          ? "What's your address?"
          : "¿Cuál es tu Dirección?",
      content: (
        <div className="space-y-8">
          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              {selectedLanguage === "en" ? "Address" : "Dirección"}
            </label>
            <input
              type="text"
              placeholder="123 Soccer Way"
              value={formData.streetAddress}
              onChange={(e) => handleInput("streetAddress", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              {selectedLanguage === "en"
                ? "Address Line 2"
                : "Línea de Dirección 2"}
            </label>
            <input
              type="text"
              placeholder="Apartment 4"
              value={formData.addressLine2}
              onChange={(e) => handleInput("addressLine2", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              {selectedLanguage === "en" ? "City" : "Ciudad"}
            </label>
            <input
              type="text"
              placeholder="Watsonville"
              value={formData.city}
              onChange={(e) => handleInput("city", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              {selectedLanguage === "en" ? "State" : "Estado"}
            </label>
            <input
              type="text"
              placeholder="California"
              value={formData.state}
              onChange={(e) => handleInput("state", e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>
      ),
    },
    {
      title:
        selectedLanguage === "en" ? "Select a League" : "Selecciona una Liga",
      content: (
        <div className="space-y-4">
          {data.leagues.map((league) => (
            <button
              key={league}
              onClick={() => {
                handleInput("league", league);
              }}
              className={`w-full p-6 text-xl text-left rounded-xl border transition-all duration-200 flex justify-between items-center ${
                formData.league === league
                  ? "border-[#170CB4] bg-[#F2E6F7] text-[#170CB4]" // Selected state
                  : "border-[#1E1E1E]/20 hover:border-[#4238D5] hover:bg-[#F1F1F1] text-[#1E1E1E]"
              }`}
            >
              <span>{league}</span>
              <ChevronRight className={"w-6 h-6 text-[#4238D5]"} />
            </button>
          ))}
        </div>
      ),
    },
    {
      title:
        selectedLanguage === "en"
          ? "Select a Division"
          : "Selecciona una División",
      content: (
        <div className="space-y-4">
          {data.divisions.map((division) => (
            <button
              key={division}
              onClick={() => {
                handleInput("division", division);
              }}
              className={`w-full p-6 text-xl text-left rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${
                formData.division === division
                  ? "border-[#170CB4] bg-[#F2E6F7] text-[#170CB4]" // Selected state
                  : "border-[#1E1E1E]/20 hover:border-[#4238D5] hover:bg-[#F1F1F1] text-[#1E1E1E]" // Default & hover state
              }`}
            >
              <span className="font-medium">{division}</span>
              <ChevronRight className={"w-6 h-6 text-[#4238D5]"} />
            </button>
          ))}
        </div>
      ),
    },
    {
      title:
        selectedLanguage === "en" ? "Select a team" : "Selecciona un Equipo",
      content: (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
          {formData.division &&
            data.teams[formData.division].map((team) => (
              <button
                key={team}
                onClick={() => handleInput("team", team)}
                className={`w-full p-6 text-xl text-left rounded-xl border transition-all duration-200 flex justify-between items-center ${
                  formData.team === team
                    ? "border-[#170CB4] bg-[#F2E6F7] text-[#170CB4]" // Selected state
                    : "border-[#1E1E1E]/20 hover:border-[#4238D5] hover:bg-[#F1F1F1] text-[#1E1E1E]"
                }`}
              >
                <span>{team}</span>
              </button>
            ))}
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      {isSubmitted ? (
        <ThankYouScreen
          formData={formData}
          submittedLanguage={submittedLanguage}
        />
      ) : (
        // Registration Form
        <>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-1 rounded-full mb-8">
            <div
              className="bg-[#170CB4] h-1 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <h2 className="text-3xl font-semibold mb-12 text-gray-800">
            {steps[step].title}
          </h2>

          {steps[step].content}

          <div className="flex justify-end mt-8">
            <LanguageSelector onLanguageChange={handleLanguageChange} />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-gray-100 p-4">
            <div className="max-w-md mx-auto flex justify-between items-center">
              <button
                onClick={handleBack}
                className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                disabled={step === 0}
              >
                <ChevronLeft className="w-8 h-8 text-gray-600" />
              </button>

              {/* Forward/Submit button */}
              {step === steps.length - 1 ? (
                // Submit button with special styling
                <button
                  onClick={handleSubmit}
                  disabled={!formData.team}
                  className={`h-20 flex-1 flex items-center justify-center rounded-full px-6 transition-colors
                    ${
                      formData.team
                        ? "bg-[#170CB4] hover:bg-[#830AAF] text-white"
                        : "bg-[#4238D5]/50 text-white cursor-not-allowed"
                    }`}
                >
                  <span className="text-base font-medium">
                    {selectedLanguage === "en" ? "Submit" : "Completar"}
                  </span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`w-20 h-20 flex items-center justify-center rounded-full transition-colors
                    ${
                      isNextDisabled()
                        ? "bg-[#4238D5]/50 cursor-not-allowed"
                        : "bg-[#170CB4] hover:bg-[#830AAF]"
                    }`}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrationForm;
