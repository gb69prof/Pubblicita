// Freda Karol — tiny interactions (no frameworks)
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Modal
  const openBtn = document.getElementById("openNotes");
  const modal = document.getElementById("notesModal");
  const closeEls = modal ? modal.querySelectorAll("[data-close]") : [];

  function openModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // focus close button
    const closeBtn = modal.querySelector("[data-close].iconBtn") || modal.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (openBtn) openBtn.focus();
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  closeEls.forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  // Palette copy
  const swatches = document.querySelectorAll(".swatch[data-hex]");
  const hint = document.getElementById("copyHint");

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // fallback
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); } catch(_) {}
      t.remove();
      return true;
    }
  }

  swatches.forEach(btn => {
    btn.addEventListener("click", async () => {
      const hex = btn.getAttribute("data-hex");
      if (!hex) return;
      await copy(hex);
      if (hint) hint.textContent = `Copiato: ${hex}`;
      btn.animate([{ transform: "translateY(-1px)" }, { transform: "translateY(0px)" }], { duration: 180, easing: "ease-out" });
    });
  });
})();
