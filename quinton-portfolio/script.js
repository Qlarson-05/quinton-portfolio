const header = document.querySelector("[data-header]");
const copyEmailButtons = document.querySelectorAll("[data-copy-email]");
const copyFeedback = document.querySelector("[data-copy-feedback]");
const workTabs = document.querySelectorAll("[data-work-tab]");
const workPanels = document.querySelectorAll("[data-work-panel]");

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

const setWorkTab = (target) => {
  workTabs.forEach((tab) => {
    const isActive = tab.dataset.workTab === target;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  workPanels.forEach((panel) => {
    const isActive = panel.dataset.workPanel === target;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

workTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setWorkTab(tab.dataset.workTab);
  });

  tab.addEventListener("keydown", (event) => {
    const currentIndex = Array.from(workTabs).indexOf(tab);
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

    if (!direction) {
      return;
    }

    event.preventDefault();
    const nextIndex = (currentIndex + direction + workTabs.length) % workTabs.length;
    const nextTab = workTabs[nextIndex];

    nextTab.focus();
    setWorkTab(nextTab.dataset.workTab);
  });
});

copyEmailButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail;

    try {
      await navigator.clipboard.writeText(email);
      if (copyFeedback) {
        copyFeedback.textContent = "Email copied.";
      }
    } catch {
      if (copyFeedback) {
        copyFeedback.textContent = email;
      }
    }
  });
});

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });
