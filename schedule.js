// Schedule settings and top-left brand icon.
window.TAMANITAMA_SCHEDULE = {
  year: 2026,
  month: 6,
  monthName: "\u6c34\u7121\u6708",
  openHours: "OPEN\u6642\u9593 08:00-20:00\uff08\u6c34\u306e\u307f 08:00-18:00\uff09",
  openDays: [1, 3, 4, 5, 9, 10, 11, 17, 21, 22, 24, 26, 27, 28, 30],
};

(function () {
  const iconSrc = "data:image/jpeg;base64,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";

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
