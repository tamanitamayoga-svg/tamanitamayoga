(function () {
  const schedule = window.TAMANITAMA_SCHEDULE;
  const grid = document.getElementById("calendar-grid");
  if (!schedule || !grid) return;

  const year = Number(schedule.year);
  const month = Number(schedule.month);
  const openDays = new Set((schedule.openDays || []).map(Number));
  const monthName = schedule.monthName || "";
  const openHours = schedule.openHours || "";
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  const title = document.getElementById("calendar-title");
  const hours = document.getElementById("calendar-hours");
  const yearEl = document.getElementById("calendar-year");
  const monthEl = document.getElementById("calendar-month");
  const monthNameEl = document.getElementById("calendar-month-name");

  if (title) title.textContent = `${month}月のOPEN日`;
  if (hours) hours.textContent = openHours;
  if (yearEl) yearEl.textContent = year;
  if (monthEl) monthEl.textContent = month;
  if (monthNameEl) monthNameEl.textContent = monthName;

  grid.setAttribute("aria-label", `${year}年${month}月のOPEN日カレンダー`);
  grid.innerHTML = "";

  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day, index) => {
    const el = document.createElement("span");
    el.className = index === 0 ? "day-name sun" : "day-name";
    el.textContent = day;
    grid.appendChild(el);
  });

  for (let i = 0; i < firstDay; i += 1) {
    grid.appendChild(document.createElement("span"));
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const el = document.createElement("span");
    const weekday = new Date(year, month - 1, day).getDay();
    const classes = [];
    if (openDays.has(day)) classes.push("open");
    if (weekday === 0) classes.push("sun");
    if (classes.length) el.className = classes.join(" ");
    el.textContent = day;
    grid.appendChild(el);
  }
})();
