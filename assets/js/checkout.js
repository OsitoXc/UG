const WEBHOOK = 'PEGA_AQUI_TU_WEBHOOK';

function generateOrderID(){
  return 'UG-' + Math.random().toString(36).substring(2,8).toUpperCase();
}

document.getElementById('checkoutForm').addEventListener('submit', e => {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);

  const order = {
    id: generateOrderID(),
    product: 'Minecraft Java & Bedrock (PC)',
    price: '$400 MXN',
    name: name.value,
    email: email.value,
    zip: zip.value,
    time: new Date().toLocaleString('es-MX', {
      timeZone: 'America/Mexico_City',
      hour12: true
    })
  };

  fetch(WEBHOOK,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      embeds:[{
        title:'🛒 Nuevo pedido',
        color:0x22c55e,
        fields:[
          {name:'🆔 Pedido',value:order.id},
          {name:'🎮 Producto',value:order.product},
          {name:'💰 Precio',value:order.price},
          {name:'👤 Cliente',value:order.name},
          {name:'📩 Correo',value:order.email},
          {name:'📍 CP',value:order.zip},
          {name:'🕒 Hora MX',value:order.time}
        ],
        footer:{text:'United Glory | Shop'}
      }]
    })
  });

  setTimeout(()=>{
    window.location.href =
    'https://www.paypal.com/ncp/payment/TTNQX9SGN2EG6';
  }, 600);
});