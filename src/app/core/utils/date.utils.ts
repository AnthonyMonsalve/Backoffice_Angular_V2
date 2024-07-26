export function getYesterday(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

export function getYearlyRange(): { startDate: string; endDate: string } {
  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear}-01-01`;
  const endDate = getYesterday();
  return { startDate, endDate };
}

export function getMonthlyRange(): { startDate: string; endDate: string } {
  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const startDate = `${currentYear}-${currentMonth}-01`;
  const endDate = getYesterday();
  return { startDate, endDate };
}

export function getWeeklyRange(): { startDate: string; endDate: string } {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const distanceToMonday = (dayOfWeek + 6) % 7; // Calculate the distance to Monday (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
  const monday = new Date(today);
  monday.setDate(today.getDate() - distanceToMonday); // Set the date to the previous Monday

  const startDate = monday.toISOString().split('T')[0];
  const endDate = getYesterday();
  return { startDate, endDate };
}

export function getSemesterRange(): { startDate: string; endDate: string } {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // January is 0 in JavaScript, so add 1

  let startDate: string;
  let endDate: string;

  if (currentMonth <= 6) {
    // First semester: January 1st to June 30th
    startDate = `${currentYear}-01-01`;
    endDate = `${currentYear}-06-30`;
  } else {
    // Second semester: July 1st to December 31st
    startDate = `${currentYear}-07-01`;
    endDate = `${currentYear}-12-31`;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  endDate =
    endDate > yesterday.toISOString().split('T')[0]
      ? yesterday.toISOString().split('T')[0]
      : endDate;

  return { startDate, endDate };
}
