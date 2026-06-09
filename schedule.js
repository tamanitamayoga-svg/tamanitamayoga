// Schedule settings and top-left brand icon.
window.TAMANITAMA_SCHEDULE = {
  year: 2026,
  month: 6,
  monthName: "\u6c34\u7121\u6708",
  openHours: "OPEN\u6642\u9593 08:00-20:00\uff08\u6c34\u306e\u307f 08:00-18:00\uff09",
  openDays: [1, 3, 4, 5, 9, 10, 11, 17, 21, 22, 24, 26, 27, 28, 30],
};

(function () {
  const iconSrc = "brand-icon.svg?v=20260609-2";

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
      @media (max-width: 430px) {
        .brand-icon {
          width: 38px;
          height: 38px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  addBrandIconStyle();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addBrandIcon, { once: true });
  } else {
    addBrandIcon();
  }
})();
