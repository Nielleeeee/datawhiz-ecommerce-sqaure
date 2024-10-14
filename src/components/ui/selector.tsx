"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { SubscriptionCheckoutFormProps } from "../../../type";
import { UseFormSetValue } from "react-hook-form";

interface Selection {
  name: string;
  isoCode?: string;
  countryCode?: string;
}

interface SelectorProps {
  data: Selection[];
  setValue: UseFormSetValue<SubscriptionCheckoutFormProps>;
  setSelectedCode?: (code: string) => void;
  name: keyof SubscriptionCheckoutFormProps;
}

export default function Selector({
  data,
  name,
  setValue,
  setSelectedCode = () => {},
}: SelectorProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selection | null>(data[0]);

  useEffect(() => {
    if (!data.find((item) => item.name === selected?.name)) {
      setSelected(null);
      setValue(name, "");
    }
  }, [data, selected, setValue, name]);

  const filteredData =
    query === ""
      ? data
      : data.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (value: Selection | null) => {
    if (value) {
      setSelected(value);
      setValue(name, value.name);
      setSelectedCode(value.isoCode ?? "");
    } else {
      setSelected(null);
      setValue(name, "");
      setSelectedCode("");
    }
  };

  return (
    <Combobox
      value={selected}
      onChange={handleChange}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          disabled={data.length === 0}
          className={clsx(
            "w-full rounded-lg border border-gray-400 py-2 pr-8 pl-3 text-black",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          displayValue={(item: Selection | null) => item?.name ?? ""}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "shadow-md w-[var(--input-width)] rounded-xl border bg-white border-gray-400 p-1 h-80 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {filteredData.map((data, index) => (
          <ComboboxOption
            key={index}
            value={data}
            className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200"
          >
            <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
            <div className=" text-black">{data.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
