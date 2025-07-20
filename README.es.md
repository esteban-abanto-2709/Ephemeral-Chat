# Ephemeral Chat

Un sistema de mensajería en tiempo real construido completamente en memoria, donde la efimeridad es una característica de diseño, no una limitación.

## 🎯 Propósito del proyecto

Proyecto desarrollado para demostrar competencias en tecnologías de comunicación en tiempo real y manejo avanzado de estados efímeros. El desafío técnico principal es gestionar múltiples salas de chat sin persistencia de datos, manteniendo sincronización perfecta entre usuarios.

## 🏗️ Arquitectura técnica

### Backend

- **Node.js + Express** - Servidor HTTP y API REST
- **Socket.IO** - Comunicación bidireccional en tiempo real
- **Gestión de memoria** - Todos los datos se mantienen en RAM
- **Sistema de rooms dinámicos** - Creación y destrucción automática de salas

### Frontend

- **React + TypeScript** - Interfaz de usuario reactiva
- **Socket.IO Client** - Conexión WebSocket al servidor
- **TailwindCSS** - Diseño responsivo y moderno
- **Gestión de estado local** - Sin persistencia del lado cliente

## 🚀 Funcionalidades principales

### 1. Chat Global

- Sala pública única donde todos los usuarios conectados pueden participar
- Visibilidad completa de la conversación para todos los miembros

### 2. Chat Privado (por enlace)

- Generación de enlaces únicos para crear salas privadas
- Cualquier persona con el enlace puede unirse directamente
- Notificaciones del sistema cuando usuarios se conectan/desconectan
- Soporte para múltiples participantes simultáneos

### 3. Chat Aleatorio

- Sistema de matchmaking automático entre usuarios (inicialmente 2 personas)
- Posibilidad de compartir la URL de la sala para invitar a más participantes
- Funciona idénticamente al chat privado una vez establecida la conexión
- Notificaciones automáticas de entrada y salida de usuarios

## 🧠 Desafíos técnicos resueltos

- **Sincronización de estados efímeros** entre múltiples clientes
- **Gestión dinámica de rooms** con creación y limpieza automática
- **Matchmaking en tiempo real** para emparejamiento aleatorio
- **Manejo de desconexiones** y limpieza de memoria
- **Notificaciones del sistema** para conexiones y desconexiones de usuarios

## 🔒 Características de diseño

- **Anonimato total** - Sin registro ni identificación de usuarios
- **Efimeridad por diseño** - Los mensajes existen solo mientras hay conexión activa
- **Limpieza automática** - Destrucción de salas cuando todos los usuarios se desconectan
- **Sin rastros** - Cero persistencia de conversaciones o datos personales

## 🛠️ Stack tecnológico

``` cmd
Frontend:  React + TypeScript + TailwindCSS + Socket.IO Client
Backend:   Node.js + Express + Socket.IO
Base de datos: Ninguna (todo en memoria)
```

## 📋 Instalación y uso

*[Esta sección se completará al finalizar el desarrollo]*

## 🎨 Capturas de pantalla

*[Esta sección se completará al finalizar el desarrollo]*

## 🚧 Estado del proyecto

Este proyecto está actualmente en desarrollo como parte de un portafolio profesional para demostrar competencias en desarrollo fullstack y manejo de comunicación en tiempo real.

---

*Desarrollado por Esteban Abanto - Demostrando habilidades en React, Node.js, WebSockets y arquitecturas de tiempo real.*
