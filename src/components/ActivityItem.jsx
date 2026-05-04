import { useState } from 'react';
import { Pencil, Trash2, Clock, ChevronRight, GripVertical } from 'lucide-react';
import { formatTime12h, calculateDuration, formatDuration, getActivityColor } from '../utils/timeUtils';

const ActivityItem = ({ activity, index, onEdit, onDelete }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const color = getActivityColor(index);
  const duration = calculateDuration(activity.startTime, activity.endTime);

  const handleDelete = () => {
    if (isConfirmingDelete) {
      onDelete(activity.id);
      setIsConfirmingDelete(false);
    } else {
      setIsConfirmingDelete(true);
      setTimeout(() => setIsConfirmingDelete(false), 3000);
    }
  };

  return (
    <div
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsConfirmingDelete(false);
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        style={{
          backgroundColor: color.bg,
          borderTop: `1px solid ${isHovered ? color.border : 'rgba(255,255,255,0.04)'}`,
          borderRight: `1px solid ${isHovered ? color.border : 'rgba(255,255,255,0.04)'}`,
          borderBottom: `1px solid ${isHovered ? color.border : 'rgba(255,255,255,0.04)'}`,
          borderLeft: `3px solid ${color.border}`,
        }}
      >
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            {/* Left content */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="mt-1 hidden md:block">
                <GripVertical className="w-4 h-4 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>

              <div className="flex-1 min-w-0">
                {/* Activity name */}
                <h3 className="font-semibold text-[var(--color-text-primary)] truncate text-base">
                  {activity.name}
                </h3>

                {/* Time info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: color.text }} />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {formatTime12h(activity.startTime)}
                    </span>
                    <ChevronRight className="w-3 h-3 text-[var(--color-text-muted)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {formatTime12h(activity.endTime)}
                    </span>
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                  >
                    {formatDuration(duration)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0">
              <button
                id={`btn-edit-${activity.id}`}
                onClick={() => onEdit(activity)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent-amber)] hover:bg-[var(--color-accent-amber)]/10 transition-all duration-200 cursor-pointer"
                title="Edit kegiatan"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                id={`btn-delete-${activity.id}`}
                onClick={handleDelete}
                className={`h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isConfirmingDelete
                    ? 'bg-[var(--color-danger)] text-white px-3 gap-1'
                    : 'w-8 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10'
                }`}
                title={isConfirmingDelete ? 'Klik lagi untuk hapus' : 'Hapus kegiatan'}
              >
                <Trash2 className="w-4 h-4" />
                {isConfirmingDelete && <span className="text-xs font-medium">Hapus?</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
