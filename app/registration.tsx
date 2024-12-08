"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const RegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    league: "",
    season: "",
    division: "",
    team: "",
  });

  const data = {
    leagues: ["Premier League", "Championship League", "Regional League"],
    seasons: ["2024 Spring", "2024 Summer", "2024 Fall"],
    divisions: ["Division A", "Division B", "Division C"],
    teams: ["Red Dragons", "Blue Eagles", "Green Lions", "Yellow Tigers"],
  };

  const handleInput = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = [
    // Name Block
    {
      title: "What's your name?",
      content: (
        <div className="space-y-8">
          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInput("firstName", e.target.value)}
              className="w-full text-xl p-4 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInput("lastName", e.target.value)}
              className="w-full text-xl p-4 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
            />
          </div>
        </div>
      ),
    },
    // Date of Birth Block
    {
      title: "When were you born?",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-2">
              <label className="text-blue-600 text-xl font-medium">Month</label>
            </div>
            <div className="col-span-2">
              <label className="text-blue-600 text-xl font-medium">Day</label>
            </div>
            <div className="col-span-3">
              <label className="text-blue-600 text-xl font-medium">Year</label>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 items-center">
            <div className="col-span-2">
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
                className="w-full text-3xl p-4 border-b-2 border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
              />
            </div>

            <div className="col-span-1 text-center">
              <span className="text-3xl text-gray-400">/</span>
            </div>

            <div className="col-span-1">
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
                className="w-full text-3xl p-4 border-b-2 border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
              />
            </div>

            <div className="col-span-1 text-center">
              <span className="text-3xl text-gray-400">/</span>
            </div>

            <div className="col-span-2">
              <input
                type="text"
                placeholder="YYYY"
                value={formData.birthYear}
                onChange={(e) =>
                  handleInput(
                    "birthYear",
                    e.target.value.replace(/\D/g, "").slice(0, 4)
                  )
                }
                className="w-full text-3xl p-4 border-b-2 border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
              />
            </div>
          </div>
        </div>
      ),
    },
    // Address Block
    {
      title: "What's your address?",
      content: (
        <div className="space-y-8">
          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              Address
            </label>
            <input
              type="text"
              placeholder="65 Hansen Way"
              value={formData.streetAddress}
              onChange={(e) => handleInput("streetAddress", e.target.value)}
              className="w-full text-xl p-4 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              Address line 2
            </label>
            <input
              type="text"
              placeholder="Apartment 4"
              value={formData.addressLine2}
              onChange={(e) => handleInput("addressLine2", e.target.value)}
              className="w-full text-xl p-4 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              City/Town
            </label>
            <input
              type="text"
              placeholder="Palo Alto"
              value={formData.city}
              onChange={(e) => handleInput("city", e.target.value)}
              className="w-full text-xl p-4 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
            />
          </div>

          <div>
            <label className="text-black text-xl font-medium mb-2 block">
              State/Region/Province
            </label>
            <input
              type="text"
              placeholder="California"
              value={formData.state}
              onChange={(e) => handleInput("state", e.target.value)}
              className="w-full text-xl p-4 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none bg-transparent placeholder-gray-300"
            />
          </div>
        </div>
      ),
    },
    // League Selection
    {
      title: "Which league do you play in?",
      content: (
        <div className="space-y-4">
          {data.leagues.map((league) => (
            <button
              key={league}
              onClick={() => {
                handleInput("league", league);
                handleNext();
              }}
              className={`w-full p-6 text-xl text-left rounded-xl border transition-all duration-200 flex justify-between items-center ${
                formData.league === league
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              }`}
            >
              <span>{league}</span>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          ))}
        </div>
      ),
    },
    // Season Selection
    {
      title: "Which season are you registering for?",
      content: (
        <div className="space-y-4">
          {data.seasons.map((season) => (
            <button
              key={season}
              onClick={() => {
                handleInput("season", season);
                handleNext();
              }}
              className={`w-full p-6 text-xl text-left rounded-xl border transition-all duration-200 flex justify-between items-center ${
                formData.season === season
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              }`}
            >
              <span>{season}</span>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          ))}
        </div>
      ),
    },
    // Division Selection
    {
      title: "Which division do you play in?",
      content: (
        <div className="space-y-4">
          {data.divisions.map((division) => (
            <button
              key={division}
              onClick={() => {
                handleInput("division", division);
                handleNext();
              }}
              className={`w-full p-6 text-xl text-left rounded-xl border transition-all duration-200 flex justify-between items-center ${
                formData.division === division
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              }`}
            >
              <span>{division}</span>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          ))}
        </div>
      ),
    },
    // Team Selection
    {
      title: "Select your team",
      content: (
        <div className="space-y-4">
          {data.teams.map((team) => (
            <button
              key={team}
              onClick={() => handleInput("team", team)}
              className={`w-full p-6 text-xl text-left rounded-xl border transition-all duration-200 flex justify-between items-center ${
                formData.team === team
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              }`}
            >
              <span>{team}</span>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 rounded-full mb-8">
        <div
          className="bg-blue-500 h-1 rounded-full transition-all duration-500"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <h2 className="text-3xl font-semibold mb-12 text-gray-800">
        {steps[step].title}
      </h2>

      {steps[step].content}

      <div className="flex justify-between pt-8">
        <button
          onClick={handleBack}
          className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={step === 0}
        >
          <ChevronLeft className="w-8 h-8 text-gray-600" />
        </button>
        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
          disabled={step === steps.length - 1}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
