import { List, LayoutGrid } from 'lucide-react';
import ActivityItem from './ActivityItem';
import Timeline from './Timeline';
import EmptyState from './EmptyState';

const ActivityList = ({ activities, onEdit, onDelete, viewMode, onViewModeChange }) => {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[var(--color-accent-primary)] to-[var(--color-accent-cyan)]" />
          Jadwal Hari Ini
          {activities.length > 0 && (
            <span className="text-sm font-normal text-[var(--color-text-muted)] ml-1">({activities.length})</span>
          )}
        </h2>
        {activities.length > 0 && (
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-dark-700)] border border-[var(--color-glass-border)]">
            <button id="btn-view-list" onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${viewMode === 'list' ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-secondary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'}`}>
              <List className="w-4 h-4" />
            </button>
            <button id="btn-view-timeline" onClick={() => onViewModeChange('timeline')}
              className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${viewMode === 'timeline' ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-secondary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      {activities.length === 0 ? (
        <EmptyState />
      ) : viewMode === 'list' ? (
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <Timeline activities={activities} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
};

export default ActivityList;
