export interface StudyRoutine {
  id: string;
  title: string;
  durationMinutes: number;
}

export interface StudySchedule {
  startTime: string;
  dailyTargetMinutes: number;
  remindersEnabled: boolean;
  reminderTime: string;
  routines: StudyRoutine[];
}

export const DEFAULT_STUDY_SCHEDULE: StudySchedule = {
  startTime: '19:30',
  dailyTargetMinutes: 120,
  remindersEnabled: false,
  reminderTime: '19:30',
  routines: [
    { id: 'vocabulary', title: 'Vocabulary review', durationMinutes: 20 },
    { id: 'grammar', title: 'Grammar study', durationMinutes: 25 },
    { id: 'kanji', title: 'Kanji practice', durationMinutes: 20 },
    { id: 'listening', title: 'Listening practice', durationMinutes: 20 },
    { id: 'speaking', title: 'Speaking practice', durationMinutes: 15 },
    { id: 'revision', title: 'Daily revision', durationMinutes: 20 },
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isTime(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{2}:\d{2}$/.test(value)) return false;
  const [hours, minutes] = value.split(':').map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function normalizeStudySchedule(value: unknown): StudySchedule | null {
  if (!isRecord(value) || !Array.isArray(value.routines)) return null;
  if (
    !isTime(value.startTime) ||
    !isTime(value.reminderTime) ||
    typeof value.dailyTargetMinutes !== 'number' ||
    !Number.isInteger(value.dailyTargetMinutes) ||
    value.dailyTargetMinutes < 15 ||
    value.dailyTargetMinutes > 240 ||
    typeof value.remindersEnabled !== 'boolean' ||
    value.routines.length > 12
  ) {
    return null;
  }

  const routines: StudyRoutine[] = [];
  for (const candidate of value.routines) {
    if (
      !isRecord(candidate) ||
      typeof candidate.id !== 'string' ||
      typeof candidate.title !== 'string' ||
      candidate.title.trim().length === 0 ||
      candidate.title.length > 60 ||
      typeof candidate.durationMinutes !== 'number' ||
      !Number.isInteger(candidate.durationMinutes) ||
      candidate.durationMinutes < 5 ||
      candidate.durationMinutes > 120
    ) {
      return null;
    }
    routines.push({
      id: candidate.id,
      title: candidate.title,
      durationMinutes: candidate.durationMinutes,
    });
  }

  return {
    startTime: value.startTime,
    dailyTargetMinutes: value.dailyTargetMinutes,
    remindersEnabled: value.remindersEnabled,
    reminderTime: value.reminderTime,
    routines,
  };
}
