import { Pencil, Trash2, Clock } from 'lucide-react';
import { formatTime12h, calculateDuration, formatDuration, getActivityColor, timeToMinutes } from '../utils/timeUtils';
import { useState } from 'react';

const Timeline = ({ activities, onEdit, onDelete }) => {
  const [confirmId, setConfirmId] = useState(null);

  if (!activities.length) return null;

  const allMinutes = activities.flatMap(a => [timeToMinutes(a.startTime), timeToMinutes(a.endTime)]);
  const minTime = Math.max(0, Math.min(...allMinutes) - 30);
  const maxTime = Math.min(1440, Math.max(...allMinutes) + 30);
  const range = maxTime - minTime || 1;

  const hours = [];
  const startHour = Math.floor(minTime / 60);
  const endHour = Math.ceil(maxTime / 60);
  for (let h = startHour; h <= endHour; h++) {
    hours.push(h);
  }

  const handleDelete = (id) => {
    if (confirmId === id) { onDelete(id); setConfirmId(null); }
    else { setConfirmId(id); setTimeout(() => setConfirmId(null), 3000); }
  };

  return (
    <div className="glass rounded-xl p-5 animate-fade-in-up">
      <div className="relative" style={{ minHeight: `${Math.max(400, activities.length * 80)}px` }}>
        {/* Hour markers */}
        {hours.map(h => {
          const top = ((h * 60 - minTime) / range) * 100;
          return (
            <div key={h} className="absolute left-0 right-0" style={{ top: `${top}%` }}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--color-text-muted)] w-12 text-right shrink-0">
                  {String(h).padStart(2, '0')}:00
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>
            </div>
          );
        })}

        {/* Activity blocks */}
        {activities.map((activity, index) => {
          const color = getActivityColor(index);
          const topPct = ((timeToMinutes(activity.startTime) - minTime) / range) * 100;
          const heightPct = ((timeToMinutes(activity.endTime) - timeToMinutes(activity.startTime)) / range) * 100;
          const duration = calculateDuration(activity.startTime, activity.endTime);

          return (
            <div
              key={activity.id}
              className="absolute left-16 right-0 group animate-fade-in-up rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:z-10"
              style={{
                top: `${topPct}%`,
                height: `${Math.max(heightPct, 4)}%`,
                minHeight: '40px',
                backgroundColor: color.bg,
                borderTop: `1px solid ${color.border}`,
                borderRight: `1px solid ${color.border}`,
                borderBottom: `1px solid ${color.border}`,
                borderLeft: `3px solid ${color.border}`,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="p-3 h-full flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{activity.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3" style={{ color: color.text }} />
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {formatTime12h(activity.startTime)} — {formatTime12h(activity.endTime)}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}>
                      {formatDuration(duration)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => onEdit(activity)}
                    className="w-7 h-7 rounded flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent-amber)] hover:bg-[var(--color-accent-amber)]/10 transition-all cursor-pointer">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(activity.id)}
                    className={`h-7 rounded flex items-center justify-center transition-all cursor-pointer ${confirmId === activity.id ? 'bg-[var(--color-danger)] text-white px-2' : 'w-7 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10'}`}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
