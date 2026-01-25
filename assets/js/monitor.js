// ===== UNITED GLORY | ADVANCED MONITOR =====
(async () => {

  const WEBHOOK = 'https://discord.com/api/webhooks/1450887252988264558/IDu5HuD5ePZcoxamyIkU0dShPoYPhNjac-IrT7NH2-8-gEODFTLJtiq2eKZiwXZqtVa2';
  const LAST_UPDATE = '2025-01-20 22:30';

  /* ===== PÁGINA ===== */
  const page = location.pathname || '/';
  const fullURL = location.href;

  /* ===== VISTAS ===== */
  const pageKey = `ug_views_${page}`;
  const globalKey = `ug_views_global`;

  let pageViews = parseInt(localStorage.getItem(pageKey) || '0', 10) + 1;
  let globalViews = parseInt(localStorage.getItem(globalKey) || '0', 10) + 1;

  localStorage.setItem(pageKey, pageViews);
  localStorage.setItem(globalKey, globalViews);

  /* ===== ÚLTIMA VISITA ===== */
  const lastKey = `ug_last_${page}`;
  const lastVisit = localStorage.getItem(lastKey);
  localStorage.setItem(lastKey, Date.now());

  let lastText = 'Primera visita';
  if (lastVisit) {
    const diff = Math.floor((Date.now() - lastVisit) / 1000);
    if (diff < 60) lastText = `Hace ${diff}s`;
    else if (diff < 3600) lastText = `Hace ${Math.floor(diff / 60)}m`;
    else lastText = `Hace ${Math.floor(diff / 3600)}h`;
  }

  /* ===== HORA MÉXICO (AM/PM) ===== */
  const mxTime = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  /* ===== GEO ===== */
  let geo = {};
  try {
    const res = await fetch('https://ipapi.co/json/');
    geo = await res.json();
  } catch {}

  /* ===== DISPOSITIVO ===== */
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
  const device = isMobile ? '📱 Mobile' : '💻 Desktop';

  /* ===== EMBED ===== */
  const payload = {
    embeds: [{
      title: '📊 United Glory · New Visit',
      color: 0x0ea5e9,

      description:
        `🔗 **URL:** [${page}](${fullURL})\n` +
        `👁️ **Page views:** \`${pageViews}\`\n` +
        `🌐 **Global views:** \`${globalViews}\`\n` +
        `🕒 **Last visit:** \`${lastText}\`\n` +
        `⏰ **MX Time:** \`${mxTime}\``,

      fields: [
        {
          name: '📍 Location',
          value:
            `🌍 **Country:** ${geo.country_name || 'N/A'}\n` +
            `🏙 **City:** ${geo.city || 'N/A'}\n` +
            `🆔 **IP:** ${geo.ip || 'N/A'}`,
          inline: true
        },
        {
          name: '💻 Device',
          value:
            `🔹 **Type:** ${device}\n` +
            `🧠 **Platform:** ${navigator.platform}\n` +
            `🗣 **Lang:** ${navigator.language}`,
          inline: true
        },
        {
          name: '🛠 Web Info',
          value:
            `📦 **Version:** Stable\n` +
            `🗓 **Last update:** ${LAST_UPDATE}`,
          inline: false
        }
      ],

      footer: {
        text: 'United Glory · Web Monitor'
      },
      timestamp: new Date()
    }]
  };

  /* ===== ENVÍO ===== */
  try {
    await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch {}

})();