(function () {
  "use strict";

  const config = window.PROFILE_CONFIG || {};
  const byId = (id) => document.getElementById(id);

  document.title = `${config.name || "Quaternion"} — Mods, links & support`;
  byId("display-name").textContent = config.name || "Quaternion";
  byId("footer-name").textContent = config.name || "Quaternion";
  byId("eyebrow").textContent = config.eyebrow || "Developer · Mod maker";
  byId("bio").textContent = config.bio || "Free game mods and useful tools.";

  if (config.avatarUrl) {
    const avatar = byId("avatar");
    const image = document.createElement("img");
    image.src = config.avatarUrl;
    image.alt = "";
    avatar.textContent = "";
    avatar.appendChild(image);
  }

  const koFiUrl = config.koFiUrl || "https://ko-fi.com/quaternion7";
  byId("kofi-link").href = koFiUrl;

  const socialStrip = byId("social-strip");
  const visibleLinks = (config.links || []).filter((item) => item.url);

  visibleLinks.forEach((item) => {
    const link = document.createElement("a");
    link.className = "social-link";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.innerHTML = `<span aria-hidden="true">${escapeHtml(item.icon || "↗")}</span><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.description || "")}</small>`;
    socialStrip.appendChild(link);
  });

  const dialog = byId("ach-dialog");
  byId("ach-button").addEventListener("click", () => dialog.showModal());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  async function copyAchRequest() {
    const message = config.achRequestMessage || "Could you send me your USD ACH details?";
    try {
      await navigator.clipboard.writeText(message);
      byId("copied-message").textContent = "Request copied.";
    } catch (_) {
      byId("copied-message").textContent = message;
    }
  }

  byId("copy-request").addEventListener("click", copyAchRequest);
  byId("discord-ach").addEventListener("click", async () => {
    window.open(config.discordUrl || "https://discord.com/channels/@me", "_blank", "noopener,noreferrer");
    await copyAchRequest();
  });

  byId("share-button").addEventListener("click", async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      const button = byId("share-button");
      button.classList.add("success");
      button.title = "Copied";
      window.setTimeout(() => {
        button.classList.remove("success");
        button.title = "Copy this page link";
      }, 1400);
    } catch (_) {
      window.prompt("Copy this page link:", url);
    }
  });

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}());
