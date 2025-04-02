export const generateMockAttendance = (
  userId: string,
  subjectId: string,
  startDate: string,
  days: number,
) => {
  const attendance = [];
  const currentDate = new Date(startDate);
  let addedDays = 0;

  while (addedDays < days) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sundays (0) and Saturdays (6)
      if (Math.random() > 0.2) {
        // 20% chance of leave
        // @ts-expect-error Nan
        attendance.push({
          userId,
          subjectId,
          date: new Date(currentDate),
        });
      }
      addedDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return attendance;
};

