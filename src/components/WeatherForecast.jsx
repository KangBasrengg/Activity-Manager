import { Cloud, Droplets, Wind, Sun, Sunrise, Sunset, Thermometer, MapPin, RefreshCw, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { useState } from 'react';

const UVLevel = ({ value }) => {
  let color, label;
  if (value <= 2) { color = 'var(--color-accent-emerald)'; label = 'Rendah'; }
  else if (value <= 5) { color = 'var(--color-accent-amber)'; label = 'Sedang'; }
  else if (value <= 7) { color = '#e87c3a'; label = 'Tinggi'; }
  else { color = 'var(--color-danger)'; label = 'Sangat Tinggi'; }

  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}30` }}>
      UV {Math.round(value)} · {label}
    </span>
  );
};

const WeatherForecast = ({ weather, loading, error, location }) => {
  const [showAllDaily, setShowAllDaily] = useState(false);

  if (loading) {
    return (
      <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Cloud className="w-5 h-5 text-[var(--color-accent-cyan)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Ramalan Cuaca</h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 rounded-xl bg-white/5 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cloud className="w-5 h-5 text-[var(--color-accent-cyan)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Ramalan Cuaca</h3>
          </div>
          <div className="text-center py-8">
            <p className="text-[var(--color-text-muted)] text-sm mb-3">Gagal memuat data cuaca</p>
            <p className="text-xs text-[var(--color-text-muted)]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const { current, hourly, daily } = weather;
  const displayDaily = showAllDaily ? daily : daily.slice(0, 4);

  return (
    <div className="animate-fade-in-up space-y-4 overflow-hidden" style={{ animationDelay: '300ms' }}>
      {/* Current Weather Card */}
      <div className="glass-strong rounded-2xl p-5 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--color-accent-primary)]/5 blur-2xl" />

        {/* Location header */}
        <div className="flex items-center justify-between gap-2 mb-5 relative flex-wrap">
          <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] min-w-0">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="text-xs font-medium truncate">{location.name}</span>
          </div>
          <UVLevel value={current.uvIndex} />
        </div>

        {/* Main temp display */}
        <div className="flex items-center gap-3 mb-5 relative">
          <span className="text-4xl" style={{ lineHeight: 1 }}>{current.icon}</span>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold bg-gradient-to-b from-white to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                {current.temp}°
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">C</span>
            </div>
            <p className="text-sm text-[var(--color-accent-secondary)] font-medium mt-0.5">{current.label}</p>
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-3 gap-2 relative">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <Thermometer className="w-3.5 h-3.5 text-[var(--color-accent-amber)] mx-auto mb-1" />
            <p className="text-[10px] text-[var(--color-text-muted)]">Terasa</p>
            <p className="text-xs font-semibold text-[var(--color-text-primary)]">{current.feelsLike}°C</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <Droplets className="w-3.5 h-3.5 text-[var(--color-accent-cyan)] mx-auto mb-1" />
            <p className="text-[10px] text-[var(--color-text-muted)]">Lembap</p>
            <p className="text-xs font-semibold text-[var(--color-text-primary)]">{current.humidity}%</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <Wind className="w-3.5 h-3.5 text-[var(--color-accent-secondary)] mx-auto mb-1" />
            <p className="text-[10px] text-[var(--color-text-muted)]">Angin</p>
            <p className="text-xs font-semibold text-[var(--color-text-primary)]">{current.windSpeed} km/j</p>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="glass rounded-2xl p-5">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[var(--color-accent-cyan)] to-[var(--color-accent-primary)]" />
          Per Jam
        </h4>
        <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
          {hourly.slice(0, 8).map((h, i) => (
            <div
              key={i}
              className={`flex-shrink-0 flex flex-col items-center gap-1 py-2 px-2.5 rounded-xl transition-all duration-200 ${
                i === 0 ? 'bg-[var(--color-accent-primary)]/15 border border-[var(--color-accent-primary)]/20' : 'hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] font-medium text-[var(--color-text-muted)]">
                {i === 0 ? 'Skrg' : h.time}
              </span>
              <span className="text-lg">{h.icon}</span>
              <span className="text-xs font-bold text-[var(--color-text-primary)]">{h.temp}°</span>
              {h.precipProb > 0 && (
                <span className="text-[10px] text-[var(--color-accent-cyan)] flex items-center gap-0.5">
                  <Droplets className="w-2.5 h-2.5" />
                  {h.precipProb}%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Forecast */}
      <div className="glass rounded-2xl p-5">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[var(--color-accent-amber)] to-[var(--color-accent-rose)]" />
          7 Hari Kedepan
        </h4>
        <div className="space-y-1.5">
          {displayDaily.map((d, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 py-2 px-2.5 rounded-xl transition-all duration-200 ${
                d.isToday ? 'bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/15' : 'hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] font-medium w-10 text-[var(--color-text-muted)]">
                {d.isToday ? 'Hari ini' : d.dayName}
              </span>
              <span className="text-base">{d.icon}</span>
              <div className="flex-1 flex items-center gap-2 min-w-0">
                {/* Temperature bar visualization */}
                <span className="text-[10px] font-semibold text-[var(--color-accent-cyan)] w-7 text-right">{d.tempMin}°</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-[var(--color-accent-cyan)] via-[var(--color-accent-primary)] to-[var(--color-accent-amber)]"
                    style={{
                      left: `${((d.tempMin - 15) / 30) * 100}%`,
                      right: `${100 - ((d.tempMax - 15) / 30) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[var(--color-accent-amber)] w-7">{d.tempMax}°</span>
              </div>
              {d.precipProb > 20 && (
                <span className="text-[10px] text-[var(--color-accent-cyan)] flex items-center gap-0.5">
                  <Droplets className="w-2.5 h-2.5" />
                  {d.precipProb}%
                </span>
              )}
            </div>
          ))}
        </div>

        {daily.length > 4 && (
          <button
            onClick={() => setShowAllDaily(!showAllDaily)}
            className="w-full flex items-center justify-center gap-1.5 mt-3 py-2 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent-secondary)] transition-colors cursor-pointer"
          >
            {showAllDaily ? (
              <>Sembunyikan <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>Lihat Semua <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        )}
      </div>

      {/* Sunrise/Sunset */}
      {daily[0] && (
        <div className="glass rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-amber)]/10 flex items-center justify-center shrink-0">
                <Sunrise className="w-4 h-4 text-[var(--color-accent-amber)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider">Terbit</p>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{daily[0].sunrise}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-rose)]/10 flex items-center justify-center shrink-0">
                <Sunset className="w-4 h-4 text-[var(--color-accent-rose)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider">Terbenam</p>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{daily[0].sunset}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
