/**
 * Converts a time string (HH:MM) to total minutes from midnight.
 * @param {string} time - Time in HH:MM format
 * @returns {number} Total minutes from midnight
 */
export const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Formats a time string to a more readable format.
 * @param {string} time - Time in HH:MM format
 * @returns {string} Formatted time string (e.g., "09:00")
 */
export const formatTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

/**
 * Formats a time string to 12-hour format.
 * @param {string} time - Time in HH:MM format
 * @returns {string} Formatted time string (e.g., "9:00 AM")
 */
export const formatTime12h = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
};

/**
 * Calculates the duration between two times in minutes.
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @returns {number} Duration in minutes
 */
export const calculateDuration = (startTime, endTime) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  return endMinutes - startMinutes;
};

/**
 * Formats duration in minutes to a readable string.
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration (e.g., "1j 30m")
 */
export const formatDuration = (minutes) => {
  if (minutes <= 0) return '0m';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}j`;
  return `${hours}j ${mins}m`;
};

/**
 * Checks if two time ranges overlap.
 * @param {string} start1 - Start time of first range
 * @param {string} end1 - End time of first range
 * @param {string} start2 - Start time of second range
 * @param {string} end2 - End time of second range
 * @returns {boolean} True if ranges overlap
 */
export const isOverlapping = (start1, end1, start2, end2) => {
  const s1 = timeToMinutes(start1);
  const e1 = timeToMinutes(end1);
  const s2 = timeToMinutes(start2);
  const e2 = timeToMinutes(end2);
  return s1 < e2 && s2 < e1;
};

/**
 * Gets the current time as HH:MM string.
 * @returns {string} Current time in HH:MM format
 */
export const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

/**
 * Calculates the percentage position of a time within a day (0-100).
 * @param {string} time - Time in HH:MM format
 * @returns {number} Percentage (0-100)
 */
export const timeToPercentage = (time) => {
  const minutes = timeToMinutes(time);
  return (minutes / 1440) * 100;
};

/**
 * Sorts activities by start time.
 * @param {Array} activities - Array of activity objects
 * @returns {Array} Sorted activities
 */
export const sortByStartTime = (activities) => {
  return [...activities].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
};

/**
 * Generates a color based on index for visual variety.
 * @param {number} index - Index of the activity
 * @returns {string} CSS color class
 */
export const getActivityColor = (index) => {
  const colors = [
    { bg: 'rgba(57, 101, 168, 0.2)', border: 'rgba(57, 101, 168, 0.5)', text: '#AABEE8' }, // primary blue
    { bg: 'rgba(107, 159, 232, 0.2)', border: 'rgba(107, 159, 232, 0.5)', text: '#c8d6f0' }, // cyan
    { bg: 'rgba(92, 184, 156, 0.2)', border: 'rgba(92, 184, 156, 0.5)', text: '#a8ebd5' }, // emerald
    { bg: 'rgba(232, 168, 74, 0.2)', border: 'rgba(232, 168, 74, 0.5)', text: '#fcd390' }, // amber
    { bg: 'rgba(212, 106, 126, 0.2)', border: 'rgba(212, 106, 126, 0.5)', text: '#f5aebc' }, // rose
    { bg: 'rgba(74, 122, 196, 0.2)', border: 'rgba(74, 122, 196, 0.5)', text: '#b5cefa' }, // glow
    { bg: 'rgba(170, 190, 232, 0.2)', border: 'rgba(170, 190, 232, 0.5)', text: '#ffffff' }, // secondary
    { bg: 'rgba(47, 80, 128, 0.3)', border: 'rgba(47, 80, 128, 0.6)', text: '#AABEE8' }, // dark
  ];
  return colors[index % colors.length];
};
