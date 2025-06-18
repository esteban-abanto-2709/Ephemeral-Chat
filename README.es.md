# 💬 Ephemeral Chat — Mensajería efímera, anónima y en tiempo real

## 🧠 Concepto general

Ephemeral Chat es una plataforma de mensajería instantánea que prioriza la efimeridad, el anonimato y la privacidad. Está diseñada para facilitar conversaciones sin compromisos ni rastros: los mensajes se borran tan pronto como uno de los participantes se desconecta o recarga la página, y no se almacena ningún tipo de información personal.

La aplicación tiene dos modos principales:

## 🔀 1. Modo Aleatorio — Conversaciones anónimas al azar

- El usuario es emparejado con otra persona conectada al sistema.
- Ambos conversan de manera anónima, sin necesidad de nombres ni registros.
- Cuando uno de los dos se desconecta o recarga la página, todo el chat desaparece automáticamente.
- Luego de cierta cantidad de mensajes intercambiados (ej. 10), se muestra un mensaje especial:
  > “¿Se están cayendo bien? ¡Pasen su contacto antes de que sea tarde! Este sistema fue creado como parte de un portafolio. Apenas se recargue la página o pierdan conexión, no podrán volver a contactarse.”

## 🔗 2. Modo Enlace Privado — Sala efímera compartida

- El usuario genera un enlace único para compartir con otra persona.
- Ambos acceden al enlace para entrar a un chat privado efímero.
- El sistema muestra una pantalla de espera hasta que el segundo usuario se conecte:
  > “Esperando a que la otra persona se una al chat…”
- Al establecerse la conexión, el funcionamiento es idéntico al modo aleatorio: conversación en tiempo real, sin nombres ni historial, que desaparece si uno se desconecta.

## 🧩 Lógica común entre ambos modos

- No se almacenan mensajes, nombres ni IDs persistentes.
- Si cualquiera de los dos usuarios se desconecta, cierra el navegador o pierde conexión:
  - El contenido del chat se elimina.
  - Se muestra un mensaje de cierre como:
    > “Esta conversación ya no es válida. El otro usuario se ha retirado.”
- Ambos modos usan la misma interfaz de chat y lógica general de comunicación, con pequeñas diferencias en el flujo de entrada.

## 🛠️ Tecnología utilizada

Frontend

- React + TypeScript
- TailwindCSS
- Socket.IO Client

Backend

- Node.js + Express
- Socket.IO
- No base de datos (todo en memoria)

## 🎯 Objetivo del proyecto

Este proyecto está diseñado como parte de un portafolio profesional. Su enfoque está en demostrar habilidades en:

- Comunicación en tiempo real con WebSockets
- Manejo de estados efímeros y sincronización
- Diseño UI simple, claro y moderno
- Pensamiento de producto con enfoque en privacidad y experiencia de usuario

## ✍️ Consideraciones éticas y de diseño

- El sistema no permite envío de imágenes, archivos ni enlaces.
- No se pide correo, nombre de usuario ni ningún dato identificable.
- La finalidad es demostrar creatividad técnica y pensar en experiencias sociales controladas.

## 🔜 Funcionalidades futuras (no incluidas en MVP)

- 🔁 Reconexión automática: Reintentos de conexión si se pierde por accidente.
- 🎭 Avatares anónimos temporales: Cada usuario recibe un nombre o ícono aleatorio (ej. “Gato Azul” y “Zorro Rojo”) solo durante esa sesión.
- 🧪 Mensajes “autodestructivos” por tiempo: Opción para enviar un mensaje que desaparezca después de 5, 10 o 30 segundos.
