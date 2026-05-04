import { CalendarDays, Sparkles, Trash2 } from 'lucide-react';

const Header = ({ stats, onClearAll, activityCount }) => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="animate-fade-in-down">
      <div className="glass-strong rounded-2xl p-8 mb-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#3965A8] to-[#AABEE8] flex items-center justify-center shadow-lg shadow-[#3965A8]/30">
                <CalendarDays className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-accent-emerald)] flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-[var(--color-dark-900)]" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-[#AABEE8] to-[#6b9fe8] bg-clip-text text-transparent">
                Daily Manager
              </h1>
              <p className="text-[var(--color-text-secondary)] text-sm mt-1">{dateStr}</p>
            </div>
          </div>

          {activityCount > 0 && (
            <button
              id="btn-clear-all"
              onClick={onClearAll}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[var(--color-danger)] border border-[var(--color-danger)]/20 hover:bg-[var(--color-danger)]/10 transition-all duration-300 text-sm font-medium cursor-pointer self-start md:self-auto"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Semua
            </button>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
          <div className="bg-gradient-to-b from-[#3965A8]/15 to-transparent rounded-xl p-5 border border-[#3965A8]/15">
            <p className="text-[var(--color-text-muted)] text-xs font-medium uppercase tracking-wider">Kegiatan</p>
            <p className="text-3xl font-bold text-[#AABEE8] mt-2">{stats.totalActivities}</p>
          </div>
          <div className="bg-gradient-to-b from-[#6b9fe8]/15 to-transparent rounded-xl p-5 border border-[#6b9fe8]/15">
            <p className="text-[var(--color-text-muted)] text-xs font-medium uppercase tracking-wider">Total Waktu</p>
            <p className="text-3xl font-bold text-[#6b9fe8] mt-2">
              {stats.totalHours > 0 ? `${stats.totalHours}j ` : ''}
              {stats.remainingMinutes}m
            </p>
          </div>
          <div className="hidden md:block bg-gradient-to-b from-[var(--color-accent-emerald)]/15 to-transparent rounded-xl p-5 border border-[var(--color-accent-emerald)]/15">
            <p className="text-[var(--color-text-muted)] text-xs font-medium uppercase tracking-wider">Sisa Hari</p>
            <p className="text-3xl font-bold text-[var(--color-accent-emerald)] mt-2">
              {Math.max(0, 24 - stats.totalHours)}j {stats.remainingMinutes > 0 ? `${60 - stats.remainingMinutes}m` : ''}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
