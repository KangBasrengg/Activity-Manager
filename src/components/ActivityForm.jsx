import { useState, useEffect } from 'react';
import { Plus, Save, AlertCircle, Clock, Type } from 'lucide-react';

const ActivityForm = ({ onSubmit, editingActivity, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errors, setErrors] = useState([]);
  const [isShaking, setIsShaking] = useState(false);

  const isEditing = !!editingActivity;

  useEffect(() => {
    if (editingActivity) {
      setName(editingActivity.name);
      setStartTime(editingActivity.startTime);
      setEndTime(editingActivity.endTime);
      setErrors([]);
    }
  }, [editingActivity]);

  const resetForm = () => {
    setName('');
    setStartTime('');
    setEndTime('');
    setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onSubmit({ name, startTime, endTime });

    if (result.success) {
      if (!isEditing) resetForm();
    } else {
      setErrors(result.errors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <form
      id="activity-form"
      onSubmit={handleSubmit}
      className={`glass-strong rounded-2xl p-7 animate-fade-in-up transition-all duration-300`}
      style={isShaking ? { animation: 'shake 0.5s ease-in-out' } : {}}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>

      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        {isEditing ? (
          <>
            <Save className="w-5 h-5 text-[var(--color-accent-amber)]" />
            <span className="bg-gradient-to-r from-[var(--color-accent-amber)] to-[#e8c87a] bg-clip-text text-transparent">
              Edit Kegiatan
            </span>
          </>
        ) : (
          <>
            <Plus className="w-5 h-5 text-[#AABEE8]" />
            <span className="bg-gradient-to-r from-[#AABEE8] to-[#6b9fe8] bg-clip-text text-transparent">
              Tambah Kegiatan
            </span>
          </>
        )}
      </h2>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="mb-5 p-4 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 animate-fade-in-up">
          {errors.map((error, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-[var(--color-danger)]">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-5">
        {/* Activity Name */}
        <div>
          <label htmlFor="input-name" className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] mb-2.5">
            <Type className="w-4 h-4" />
            Nama Kegiatan
          </label>
          <input
            id="input-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors([]); }}
            placeholder="Contoh: Meeting dengan tim..."
            className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-dark-700)] border border-[var(--color-glass-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[#3965A8]/60 focus:ring-2 focus:ring-[#3965A8]/25 transition-all duration-300"
          />
        </div>

        {/* Time inputs */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="input-start-time" className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] mb-2.5">
              <Clock className="w-4 h-4" />
              Waktu Mulai
            </label>
            <input
              id="input-start-time"
              type="time"
              value={startTime}
              onChange={(e) => { setStartTime(e.target.value); setErrors([]); }}
              className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-dark-700)] border border-[var(--color-glass-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[#3965A8]/60 focus:ring-2 focus:ring-[#3965A8]/25 transition-all duration-300 [color-scheme:dark]"
            />
          </div>
          <div>
            <label htmlFor="input-end-time" className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] mb-2.5">
              <Clock className="w-4 h-4" />
              Waktu Selesai
            </label>
            <input
              id="input-end-time"
              type="time"
              value={endTime}
              onChange={(e) => { setEndTime(e.target.value); setErrors([]); }}
              className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-dark-700)] border border-[var(--color-glass-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[#3965A8]/60 focus:ring-2 focus:ring-[#3965A8]/25 transition-all duration-300 [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-3">
          <button
            id="btn-submit"
            type="submit"
            className={`flex-1 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              isEditing
                ? 'bg-gradient-to-b from-[var(--color-accent-amber)] to-[#c8903a] hover:shadow-lg hover:shadow-[var(--color-accent-amber)]/20 hover:-translate-y-0.5'
                : 'bg-gradient-to-b from-[#3965A8] to-[#2a4f8a] hover:shadow-lg hover:shadow-[#3965A8]/30 hover:-translate-y-0.5'
            }`}
          >
            {isEditing ? (
              <><Save className="w-4 h-4" /> Simpan Perubahan</>
            ) : (
              <><Plus className="w-4 h-4" /> Tambah Kegiatan</>
            )}
          </button>

          {isEditing && (
            <button
              id="btn-cancel-edit"
              type="button"
              onClick={handleCancel}
              className="px-6 py-3.5 rounded-xl font-semibold text-[var(--color-text-secondary)] border border-[var(--color-glass-border)] hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ActivityForm;
