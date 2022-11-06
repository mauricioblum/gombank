import React from 'react';

import {
  Select as AriaSelect,
  SelectItem,
  SelectLabel,
  SelectPopover,
  useSelectState,
} from 'ariakit/select';

interface SelectItemValue {
  id: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  items: SelectItemValue[];
  defaultValue?: SelectItemValue;
  label?: string;
  name?: string;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ items, defaultValue, label, name, onChange }) => {
  const select = useSelectState({
    defaultValue: defaultValue?.value,
    sameWidth: true,
    gutter: 4,
    setValue: (value) => {
      onChange?.(value);
    },
  });

  return (
    <div className="flex flex-col">
      {label && <SelectLabel state={select}>{label}</SelectLabel>}
      <AriaSelect
        state={select}
        name={name}
        className="flex h-10 w-full min-w-[60px] cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200"
      />
      <SelectPopover
        state={select}
        className="z-50 flex flex-col overflow-y-auto overflow-x-hidden min-w-[60px] max-h-[300px] rounded-lg border border-solid p-2 shadow-md bg-white"
      >
        {items.map((item) => (
          <SelectItem
            key={item.id}
            className="flex cursor-default items-center gap-2 rounded p-2 outline-none hover:bg-neutral-200"
            value={item.value}
            disabled={item.disabled}
          />
        ))}
      </SelectPopover>
    </div>
  );
};
