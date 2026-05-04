import { useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import { validateActivity, checkConflict } from '../utils/validators';
import { sortByStartTime } from '../utils/timeUtils';

/**
 * Custom hook for managing activities state and operations.
 * Handles CRUD operations with validation and conflict detection.
 */
const useActivities = () => {
  const [activities, setActivities] = useLocalStorage('daily-manager-activities', []);

  const sortedActivities = useMemo(() => sortByStartTime(activities), [activities]);

  const addActivity = useCallback(
    (activityData) => {
      const validation = validateActivity(activityData);
      if (!validation.isValid) {
        return { success: false, errors: validation.errors };
      }

      const conflict = checkConflict(activityData, activities);
      if (conflict.hasConflict) {
        return {
          success: false,
          errors: [
            `Jadwal bentrok dengan "${conflict.conflictingActivity.name}" (${conflict.conflictingActivity.startTime} - ${conflict.conflictingActivity.endTime})`,
          ],
        };
      }

      const newActivity = {
        ...activityData,
        id: crypto.randomUUID(),
        name: activityData.name.trim(),
        createdAt: new Date().toISOString(),
      };

      setActivities((prev) => [...prev, newActivity]);
      return { success: true, activity: newActivity };
    },
    [activities, setActivities]
  );

  const updateActivity = useCallback(
    (id, activityData) => {
      const validation = validateActivity(activityData);
      if (!validation.isValid) {
        return { success: false, errors: validation.errors };
      }

      const conflict = checkConflict(activityData, activities, id);
      if (conflict.hasConflict) {
        return {
          success: false,
          errors: [
            `Jadwal bentrok dengan "${conflict.conflictingActivity.name}" (${conflict.conflictingActivity.startTime} - ${conflict.conflictingActivity.endTime})`,
          ],
        };
      }

      setActivities((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, ...activityData, name: activityData.name.trim(), updatedAt: new Date().toISOString() }
            : a
        )
      );
      return { success: true };
    },
    [activities, setActivities]
  );

  const deleteActivity = useCallback(
    (id) => {
      setActivities((prev) => prev.filter((a) => a.id !== id));
    },
    [setActivities]
  );

  const clearAll = useCallback(() => {
    setActivities([]);
  }, [setActivities]);

  const stats = useMemo(() => {
    const totalActivities = activities.length;
    const totalMinutes = activities.reduce((acc, a) => {
      const [sh, sm] = a.startTime.split(':').map(Number);
      const [eh, em] = a.endTime.split(':').map(Number);
      return acc + (eh * 60 + em) - (sh * 60 + sm);
    }, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return { totalActivities, totalMinutes, totalHours, remainingMinutes };
  }, [activities]);

  return {
    activities: sortedActivities,
    addActivity,
    updateActivity,
    deleteActivity,
    clearAll,
    stats,
  };
};

export default useActivities;
