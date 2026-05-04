import { useState } from 'react';
import Header from './components/Header';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import WeatherForecast from './components/WeatherForecast';
import Modal from './components/Modal';
import useActivities from './hooks/useActivities';
import useWeather from './hooks/useWeather';

function App() {
  const { activities, addActivity, updateActivity, deleteActivity, clearAll, stats } = useActivities();
  const { weather, loading: weatherLoading, error: weatherError, location } = useWeather();
  const [editingActivity, setEditingActivity] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [showClearModal, setShowClearModal] = useState(false);

  const handleSubmit = (data) => {
    if (editingActivity) {
      const result = updateActivity(editingActivity.id, data);
      if (result.success) setEditingActivity(null);
      return result;
    }
    return addActivity(data);
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => setEditingActivity(null);

  const handleClearAll = () => {
    clearAll();
    setShowClearModal(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Main content */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <Header stats={stats} onClearAll={() => setShowClearModal(true)} activityCount={activities.length} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
          {/* Left column - Form */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-8">
              <ActivityForm onSubmit={handleSubmit} editingActivity={editingActivity} onCancelEdit={handleCancelEdit} />
            </div>
          </div>

          {/* Center column - Activity List */}
          <div className="lg:col-span-5 xl:col-span-6">
            <ActivityList
              activities={activities}
              onEdit={handleEdit}
              onDelete={deleteActivity}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Right column - Weather Forecast */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-8">
              <WeatherForecast
                weather={weather}
                loading={weatherLoading}
                error={weatherError}
                location={location}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Clear All Confirmation Modal */}
      <Modal isOpen={showClearModal} onClose={() => setShowClearModal(false)} title="Hapus Semua Kegiatan?">
        <p className="text-[var(--color-text-secondary)] mb-6">
          Semua kegiatan akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan.
        </p>
        <div className="flex gap-4">
          <button id="btn-confirm-clear" onClick={handleClearAll}
            className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-b from-[var(--color-danger)] to-[#b8556a] hover:shadow-lg hover:shadow-[var(--color-danger)]/20 transition-all duration-300 cursor-pointer">
            Ya, Hapus Semua
          </button>
          <button id="btn-cancel-clear" onClick={() => setShowClearModal(false)}
            className="flex-1 py-3 rounded-xl font-semibold text-[var(--color-text-secondary)] border border-[var(--color-glass-border)] hover:bg-white/5 transition-all duration-300 cursor-pointer">
            Batal
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
