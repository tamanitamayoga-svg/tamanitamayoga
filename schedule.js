// Schedule settings and top-left brand icon.
const publishedSchedules = [
  {
    year: 2026,
    month: 6,
    monthName: "\u6c34\u7121\u6708",
    openHours: "OPEN\u6642\u9593 08:00-20:00\uff08\u6c34\u306e\u307f 08:00-18:00\uff09",
    openDays: [1, 3, 4, 5, 9, 10, 11, 17, 21, 22, 24, 26, 27, 28, 30],
  },
  {
    year: 2026,
    month: 7,
    monthName: "\u6587\u6708",
    openHours: "OPEN\u6642\u9593 08:00-20:00\uff08\u6c34\u306e\u307f 08:00-18:00\uff09",
    // Edit July open days here when changes are needed.
    openDays: [1, 3, 4, 8, 10, 12, 13, 15, 16, 18, 19, 20, 22, 27, 28, 29, 30],
  },
];

const monthNames = [
  "",
  "\u7766\u6708",
  "\u5982\u6708",
  "\u5f25\u751f",
  "\u536f\u6708",
  "\u7690\u6708",
  "\u6c34\u7121\u6708",
  "\u6587\u6708",
  "\u8449\u6708",
  "\u9577\u6708",
  "\u795e\u7121\u6708",
  "\u971c\u6708",
  "\u5e2b\u8d70",
];

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function addMonths(year, month, offset) {
  const date = new Date(year, month - 1 + offset, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

function scheduleFor(year, month, status) {
  const schedule = publishedSchedules.find((item) => item.year === year && item.month === month);
  if (schedule) return schedule;

  return {
    year,
    month,
    monthName: monthNames[month] || "",
    openHours: "",
    openDays: [],
    status: status || "",
  };
}

function visibleSchedules(today) {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const isLastDay = today.getDate() === daysInMonth(year, month);
  const startOffset = isLastDay ? 1 : 0;
  const first = addMonths(year, month, startOffset);
  const second = addMonths(year, month, startOffset + 1);

  return [
    scheduleFor(first.year, first.month),
    scheduleFor(second.year, second.month, "\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u8abf\u6574\u4e2d"),
  ];
}

const schedules = visibleSchedules(new Date());

window.TAMANITAMA_SCHEDULES = schedules;
window.TAMANITAMA_SCHEDULE = schedules[0];

(function () {
  const iconSrc = "brand-icon-98.jpg?v=20260609-5";

  function addBrandIcon() {
    const brand = document.querySelector(".brand");
    if (!brand || brand.querySelector(".brand-icon")) return;

    const icon = document.createElement("img");
    icon.className = "brand-icon";
    icon.src = iconSrc;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    brand.prepend(icon);
  }

  function addBrandIconStyle() {
    if (document.getElementById("brand-icon-style")) return;

    const style = document.createElement("style");
    style.id = "brand-icon-style";
    style.textContent = `
      .brand { gap: 10px; }
      .brand-icon {
        width: 44px;
        height: 44px;
        flex: 0 0 auto;
        border: 2px solid rgba(255, 250, 242, 0.78);
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 4px 16px rgba(47, 28, 16, 0.22);
      }
      .calendar-card {
        box-sizing: border-box;
      }
      .calendar-card + .calendar-card {
        margin-top: 24px;
      }
      .calendar-grid {
        grid-template-columns: repeat(7, minmax(0, 1fr));
        width: 100%;
      }
      .calendar-grid span {
        min-width: 0;
      }
      .calendar-status {
        margin: -6px 0 22px;
        color: #bd2d2d;
        font-weight: 900;
        text-align: center;
      }
      @media (max-width: 430px) {
        .brand-icon {
          width: 38px;
          height: 38px;
        }
        .calendar-card {
          overflow: hidden;
        }
        .calendar-card + .calendar-card {
          margin-top: 16px;
        }
        .calendar-grid {
          gap: 4px;
        }
        .calendar-grid span {
          font-size: 19px;
        }
        .calendar-grid .day-name {
          font-size: 13px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function updateSectionCopy() {
    const title = document.getElementById("calendar-title");
    const hours = document.getElementById("calendar-hours");

    if (title) title.textContent = "OPEN\u65e5";
    if (hours) hours.textContent = "OPEN\u6642\u9593 08:00-20:00\uff08\u6c34\u306e\u307f 08:00-18:00\uff09";
  }

  function renderCalendar(grid, schedule) {
    const year = Number(schedule.year);
    const month = Number(schedule.month);
    const openDays = new Set((schedule.openDays || []).map(Number));
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();

    grid.setAttribute("aria-label", `${year}\u5e74${month}\u6708\u306eOPEN\u65e5\u30ab\u30ec\u30f3\u30c0\u30fc`);
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
  }

  function createCalendarCard(schedule) {
    const card = document.createElement("div");
    card.className = "calendar-card";

    const head = document.createElement("div");
    head.className = "calendar-head";

    const yearEl = document.createElement("span");
    yearEl.textContent = schedule.year;
    const monthEl = document.createElement("strong");
    monthEl.textContent = schedule.month;
    const monthNameEl = document.createElement("span");
    monthNameEl.textContent = schedule.monthName || "";

    head.append(yearEl, monthEl, monthNameEl);
    card.appendChild(head);

    if (schedule.status) {
      const status = document.createElement("p");
      status.className = "calendar-status";
      status.textContent = schedule.status;
      card.appendChild(status);
    }

    const grid = document.createElement("div");
    grid.className = "calendar-grid";
    card.appendChild(grid);

    renderCalendar(grid, schedule);
    return card;
  }

  function syncBaseCalendar() {
    const baseCard = document.querySelector("#open-days .calendar-card");
    const baseGrid = document.getElementById("calendar-grid");
    const baseSchedule = schedules[0];
    if (!baseCard || !baseGrid || !baseSchedule) return;

    const yearEl = document.getElementById("calendar-year");
    const monthEl = document.getElementById("calendar-month");
    const monthNameEl = document.getElementById("calendar-month-name");

    if (yearEl) yearEl.textContent = baseSchedule.year;
    if (monthEl) monthEl.textContent = baseSchedule.month;
    if (monthNameEl) monthNameEl.textContent = baseSchedule.monthName || "";
    baseCard.querySelector(".calendar-status")?.remove();

    if (baseSchedule.status) {
      const status = document.createElement("p");
      status.className = "calendar-status";
      status.textContent = baseSchedule.status;
      baseGrid.before(status);
    }

    renderCalendar(baseGrid, baseSchedule);
  }

  function addAdditionalCalendars() {
    const baseCard = document.querySelector("#open-days .calendar-card");
    if (!baseCard || document.querySelector("#open-days .calendar-card[data-extra-calendar]")) return;

    schedules.slice(1).forEach((schedule) => {
      const card = createCalendarCard(schedule);
      card.dataset.extraCalendar = String(schedule.month);
      baseCard.parentNode.insertBefore(card, baseCard.nextSibling);
    });
  }

  addBrandIconStyle();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      addBrandIcon();
      updateSectionCopy();
      syncBaseCalendar();
      addAdditionalCalendars();
    }, { once: true });
  } else {
    addBrandIcon();
    updateSectionCopy();
    syncBaseCalendar();
    addAdditionalCalendars();
  }
})();
