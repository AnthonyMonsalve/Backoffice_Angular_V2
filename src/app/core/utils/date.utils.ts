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

export function getLastWeekRange(): { startDate: string; endDate: string } {
  const today = new Date();
  const currentDay = today.getDay();

  // Ajuste de días para que la semana empiece el lunes (0 = domingo, 1 = lunes, ..., 6 = sábado)
  const daysToMonday = (currentDay + 6) % 7;
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setDate(today.getDate() - daysToMonday);

  // Rango de la semana pasada
  const startOfLastWeek = new Date(startOfCurrentWeek);
  startOfLastWeek.setDate(startOfCurrentWeek.getDate() - 7);

  const endOfLastWeek = new Date(startOfLastWeek);
  endOfLastWeek.setDate(startOfLastWeek.getDate() + 6); // Hasta el domingo

  // Convertir a formato YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(startOfLastWeek),
    endDate: formatDate(endOfLastWeek),
  };
}

export function getLastNDaysRange(days: number): {
  startDate: string;
  endDate: string;
} {
  const today = new Date();

  // Fecha de inicio: hace 'days' días
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  // Fecha de fin: hoy
  const endDate = today;

  // Convertir a formato YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

export function getDateRangeForMonths(monthsAgo: number): {
  startDate: string;
  endDate: string;
} {
  const today = new Date();

  // Calcular la fecha de inicio restando los meses especificados
  const startDate = new Date(today);
  startDate.setMonth(today.getMonth() - monthsAgo);

  // Ajustar la fecha de inicio para que no caiga en un mes inválido
  const endDate = new Date(today);

  // Ajustar el día de la fecha de inicio para evitar días inválidos
  // Obtener el último día del mes de inicio para ajustar el día
  const lastDayOfMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  ).getDate();
  if (startDate.getDate() > lastDayOfMonth) {
    startDate.setDate(lastDayOfMonth);
  }

  // Convertir a formato YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
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
