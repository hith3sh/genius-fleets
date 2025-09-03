import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  { code: '+971', country: 'AE' }, { code: '+966', country: 'SA' }, { code: '+965', country: 'KW' },
  { code: '+974', country: 'QA' }, { code: '+973', country: 'BH' }, { code: '+968', country: 'OM' },
  { code: '+91', country: 'IN' }, { code: '+44', country: 'GB' }, { code: '+1', country: 'US' },
  { code: '+7', country: 'RU' }
];

export default function PhoneNumberInput({ value, onChange }) {
  const [countryCode, setCountryCode] = useState('+971');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (value) {
      const foundCode = countryCodes.find(c => value.startsWith(c.code));
      if (foundCode) {
        setCountryCode(foundCode.code);
        setNumber(value.substring(foundCode.code.length));
      } else {
        // Fallback for values that don't match a known code
        setNumber(value);
      }
    } else {
        setCountryCode('+971');
        setNumber('');
    }
  }, [value]);

  const handleCountryChange = (newCode) => {
    setCountryCode(newCode);
    onChange(`${newCode}${number}`);
  };

  const handleNumberChange = (e) => {
    // Allow only digits and limit to 9
    const newNumber = e.target.value.replace(/\D/g, '').slice(0, 9);
    setNumber(newNumber);
    onChange(`${countryCode}${newNumber}`);
  };

  return (
    <div className="flex gap-2">
      <Select value={countryCode} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Code" />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map(c => (
            <SelectItem key={c.country} value={c.code}>
              {c.code} ({c.country})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={number}
        onChange={handleNumberChange}
        placeholder="501234567"
        maxLength="9"
        pattern="\d{9}"
        required
      />
    </div>
  );
}