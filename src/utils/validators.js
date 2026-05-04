import { timeToMinutes, isOverlapping } from './timeUtils';

/**
 * Validates an activity's data.
 * @param {Object} activity - The activity to validate
 * @param {string} activity.name - Activity name
 * @param {string} activity.startTime - Start time in HH:MM
 * @param {string} activity.endTime - End time in HH:MM
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateActivity = (activity) => {
  const errors = [];

  // Validate name
  if (!activity.name || activity.name.trim() === '') {
    errors.push('Nama kegiatan harus diisi');
  } else if (activity.name.trim().length < 2) {
    errors.push('Nama kegiatan minimal 2 karakter');
  } else if (activity.name.trim().length > 100) {
    errors.push('Nama kegiatan maksimal 100 karakter');
  }

  // Validate start time
  if (!activity.startTime) {
    errors.push('Waktu mulai harus diisi');
  }

  // Validate end time
  if (!activity.endTime) {
    errors.push('Waktu selesai harus diisi');
  }

  // Validate time range
  if (activity.startTime && activity.endTime) {
    const startMinutes = timeToMinutes(activity.startTime);
    const endMinutes = timeToMinutes(activity.endTime);

    if (startMinutes >= endMinutes) {
      errors.push('Waktu selesai harus lebih besar dari waktu mulai');
    }

    if (endMinutes - startMinutes < 5) {
      errors.push('Durasi kegiatan minimal 5 menit');
    }

    if (endMinutes - startMinutes > 720) {
      errors.push('Durasi kegiatan maksimal 12 jam');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Checks if a new/updated activity conflicts with existing activities.
 * @param {Object} activity - The activity to check
 * @param {Array} existingActivities - List of existing activities
 * @param {string|null} excludeId - ID to exclude (for editing)
 * @returns {Object} { hasConflict: boolean, conflictingActivity: Object|null }
 */
export const checkConflict = (activity, existingActivities, excludeId = null) => {
  const filtered = existingActivities.filter((a) => a.id !== excludeId);

  for (const existing of filtered) {
    if (isOverlapping(activity.startTime, activity.endTime, existing.startTime, existing.endTime)) {
      return {
        hasConflict: true,
        conflictingActivity: existing,
      };
    }
  }

  return {
    hasConflict: false,
    conflictingActivity: null,
  };
};
