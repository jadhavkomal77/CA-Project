
import { useState } from "react";

export default function FormattedNumberInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  const [display, setDisplay] = useState(value || "");

  const formatIndian = (num) =>
    Number(num).toLocaleString("en-IN");

  const handle = (e) => {
    const raw = e.target.value.replace(/,/g, "");
    if (!/^\d*$/.test(raw)) return;

    setDisplay(raw ? formatIndian(raw) : "");

    onChange({
      target: {
        name,
        value: raw,
      },
    });
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <input
        value={display}
        onChange={handle}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
