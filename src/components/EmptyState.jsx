import { CalendarOff } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--color-dark-600)] to-[var(--color-dark-700)] flex items-center justify-center animate-float">
          <CalendarOff className="w-10 h-10 text-[var(--color-text-muted)]" />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 bg-[var(--color-dark-800)] rounded-full blur-sm" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-secondary)] mb-2">Belum ada kegiatan</h3>
      <p className="text-sm text-[var(--color-text-muted)] text-center max-w-xs">
        Mulai tambahkan kegiatan harian kamu menggunakan form di atas untuk mengatur jadwal hari ini
      </p>
    </div>
  );
};

export default EmptyState;
