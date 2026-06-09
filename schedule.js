// Schedule settings and top-left brand icon.
const schedules = [
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
    openHours: "OPEN\u6642\u9593 \u8abf\u6574\u4e2d",
    // Add July open days here when the schedule is ready, for example: [1, 5, 12]
    openDays: [],
  },
];

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
      .calendar-card + .calendar-card {
        margin-top: 24px;
      }
      .calendar-extra-title {
        margin: 0 0 22px;
        color: var(--leaf-dark);
        font-size: clamp(22px, 3vw, 34px);
        font-weight: 900;
        text-align: center;
      }
      @media (max-width: 430px) {
        .brand-icon {
          width: 38px;
          height: 38px;
        }
        .calendar-card + .calendar-card {
          margin-top: 16px;
        }
      }
    `;
    document.head.appendChild(style);
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

    const title = document.createElement("p");
    title.className = "calendar-extra-title";
    title.textContent = `${schedule.month}\u6708\u306eOPEN\u65e5`;
    card.appendChild(title);

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

    const hours = document.createElement("p");
    hours.className = "calendar-note";
    hours.textContent = schedule.openHours || "";
    card.appendChild(hours);

    const grid = document.createElement("div");
    grid.className = "calendar-grid";
    card.appendChild(grid);

    renderCalendar(grid, schedule);
    return card;
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
      addAdditionalCalendars();
    }, { once: true });
  } else {
    addBrandIcon();
    addAdditionalCalendars();
  }
})();
