import React from 'react';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

interface SchedulePickerProps {
  currentConfig: any;
  onChange: (newConfig: any) => void;
}

const SchedulePicker: React.FC<SchedulePickerProps> = ({ currentConfig, onChange }) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 items-end">
       <div className="space-y-1.5 flex-1 min-w-[140px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
             <CalendarIcon size={12} /> Launch Day
          </label>
          <select 
            value={currentConfig?.day_of_week || 'monday'}
            onChange={(e) => onChange({ ...currentConfig, day_of_week: e.target.value })}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-500/20 outline-none"
          >
             {days.map(d => (
                <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
             ))}
          </select>
       </div>

       <div className="space-y-1.5 flex-1 min-w-[140px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
             <Clock size={12} /> Launch Time (UTC)
          </label>
          <select 
            value={currentConfig?.hour || 9}
            onChange={(e) => onChange({ ...currentConfig, hour: parseInt(e.target.value) })}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-500/20 outline-none"
          >
             {hours.map(h => (
                <option key={h} value={h}>{h}:00</option>
             ))}
          </select>
       </div>
    </div>
  );
};

export default SchedulePicker;
