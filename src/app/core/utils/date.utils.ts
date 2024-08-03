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

export function getLastMonthRange(): { startDate: string; endDate: string } {
  const today = new Date();
  const currentMonth = today.getMonth(); // 0 is January, 11 is December
  const currentYear = today.getFullYear();

  const startDate = new Date(currentYear, currentMonth - 1, 1); // First day of last month
  const endDate = new Date(currentYear, currentMonth, 0); // Last day of last month

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
}

export function formatSpanishDateRange(
  startDate: string,
  endDate: string
): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const start = new Date(
    Number(startDate.split('-')[0]),
    Number(startDate.split('-')[1]) - 1,
    Number(startDate.split('-')[2])
  );
  const end = new Date(
    Number(endDate.split('-')[0]),
    Number(endDate.split('-')[1]) - 1,
    Number(endDate.split('-')[2])
  );

  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    const dayStart = start.getDate();
    const dayEnd = end.getDate();
    const monthYear = start.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric',
    });
    return `Del ${dayStart} al ${dayEnd} de ${monthYear}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    const dayStart = start.getDate();
    const monthStart = start.toLocaleDateString('es-ES', { month: 'long' });
    const dayEnd = end.getDate();
    const monthEnd = end.toLocaleDateString('es-ES', { month: 'long' });
    const year = start.getFullYear();
    return `Del ${dayStart} de ${monthStart} al ${dayEnd} de ${monthEnd} de ${year}`;
  }

  const startFormatted = start.toLocaleDateString('es-ES', options);
  const endFormatted = end.toLocaleDateString('es-ES', options);

  return `Del ${startFormatted} al ${endFormatted}`;
}
