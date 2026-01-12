// ===== UNITED GLORY | MONITOR =====
(async () => {

  const WEBHOOK = 'https://discord.com/api/webhooks/1450887252988264558/IDu5HuD5ePZcoxamyIkU0dShPoYPhNjac-IrT7NH2-8-gEODFTLJtiq2eKZiwXZqtVa2';

  /* ===== PÁGINA ===== */
  const page = location.pathname || '/';

  /* ===== CONTADOR DE VISTAS ===== */
  const viewsKey = `ug_views_${page}`;
  let views = parseInt(localStorage.getItem(viewsKey) || '0', 10) + 1;
  localStorage.setItem(viewsKey, views);

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

  /* ===== GEO + IP ===== */
  let geo = {};
  try {
    const res = await fetch('https://ipapi.co/json/');
    geo = await res.json();
  } catch {}

  /* ===== DISPOSITIVO ===== */
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const device = isMobile ? '📱 Móvil' : '💻 PC';

  /* ===== EMBED PROFESIONAL ===== */
  const payload = {
    embeds: [{
      title: '📊 Nueva visita detectada',
      color: 0x3b82f6,

      description:
        `🌐 **Página:** \`${page}\`\n` +
        `👁️ **Vistas:** \`${views}\`\n` +
        `🕒 **Última visita:** \`${lastText}\``,

      fields: [
        {
          name: '📍 Ubicación',
          value:
            `🆔 **IP:** ${geo.ip || 'N/A'}\n` +
            `🌍 **País:** ${geo.country_name || 'N/A'}\n` +
            `🏙 **Ciudad:** ${geo.city || 'N/A'}`,
          inline: true
        },
        {
          name: '💻 Dispositivo',
          value:
            `📱 **Tipo:** ${device}\n` +
            `🧠 **Plataforma:** ${navigator.platform}\n` +
            `🗣 **Idioma:** ${navigator.language}`,
          inline: true
        }
      ],

      footer: {
        text: 'United Glory | Monitor'
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
