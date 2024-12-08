// LanguageSelector.tsx
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const LanguageSelector: React.FC<{
  onLanguageChange: (language: "en" | "es") => void;
}> = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "es">("en");

  const languageOptions: Record<
    "en" | "es",
    { label: string; value: "en" | "es" }
  > = {
    en: { label: "English", value: "en" },
    es: { label: "Español", value: "es" },
  };

  return (
    <Select.Root
      value={selectedLanguage}
      onValueChange={(value) => {
        setSelectedLanguage(value as "en" | "es");
        onLanguageChange(value as "en" | "es");
      }}
    >
      <Select.Trigger
        className={classnames(
          "inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-[#170CB4] px-[15px] text-[13px] leading-none text-white shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-[#830AAF] focus:shadow-[0_0_0_2px] focus:shadow-black",
          selectedLanguage === "en" ? "bg-[#170CB4]" : "bg-[#830AAF]"
        )}
        aria-label="Language"
      >
        <Select.Value placeholder={languageOptions[selectedLanguage].label} />
        <Select.Icon className="text-white">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-[#170CB4]">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            {Object.values(languageOptions).map((option) => (
              <Select.Item
                key={option.value}
                className={classnames(
                  "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-[#830AAF] data-[disabled]:text-[#4238D5] data-[highlighted]:text-white data-[highlighted]:outline-none",
                  option.value === selectedLanguage
                    ? "text-[#170CB4]"
                    : "text-[#4238D5]"
                )}
                value={option.value}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                  {option.value === selectedLanguage && (
                    <CheckIcon className="text-[#170CB4]" />
                  )}
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-[#170CB4]">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default LanguageSelector;
