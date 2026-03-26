import React, { useState } from 'react';
import { Clock } from 'lucide-react';

interface ScheduleConfig {
  hour: number;
  day_of_week: string;
}

interface SchedulePickerProps {
  currentConfig: ScheduleConfig;
  onChange: (val: ScheduleConfig) => void;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const SchedulePicker: React.FC<SchedulePickerProps> = ({ currentConfig, onChange }) => {
  const [config, setConfig] = useState<ScheduleConfig>(currentConfig);

  const handleChange = (field: keyof ScheduleConfig, value: string | number) => {
    const updated = { ...config, [field]: value };
    setConfig(updated);
    onChange(updated);
  };

  return (
    <div className="flex items-center gap-2">
      <Clock size={14} className="text-slate-400 shrink-0" />
      <select
        value={config.day_of_week}
        onChange={(e) => handleChange('day_of_week', e.target.value)}
        className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 capitalize cursor-pointer hover:bg-slate-200 transition focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {DAYS.map((d) => (
          <option key={d} value={d} className="capitalize">{d.charAt(0).toUpperCase() + d.slice(1)}</option>
        ))}
      </select>
      <select
        value={config.hour}
        onChange={(e) => handleChange('hour', parseInt(e.target.value))}
        className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 cursor-pointer hover:bg-slate-200 transition focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={i}>
            {String(i).padStart(2, '0')}:00 UTC
          </option>
        ))}
      </select>
    </div>
  );
};

export default SchedulePicker;
