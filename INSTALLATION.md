# 📦 Guía Completa de Instalación y Configuración

Esta guía te llevará paso a paso desde cero hasta tener el juego funcionando en web, móvil y APK.

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación Básica](#instalación-básica)
3. [Ejecución en Web](#ejecución-en-web)
4. [Ejecución en Móvil](#ejecución-en-móvil)
5. [Conversión a APK](#conversión-a-apk)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Requisitos Previos

### Mínimos (Solo para Web)
- **Navegador moderno**: Chrome, Firefox, Safari o Edge
- Eso es todo! No necesitas instalar nada más para ejecutar en web

### Para Desarrollo
- **Git**: Para clonar el repositorio
  - Windows: [Descargar Git](https://git-scm.com/download/win)
  - Mac: `brew install git` o viene preinstalado
  - Linux: `sudo apt-get install git`

### Para Servidor Local (Opcional)
- **Python 3** (viene preinstalado en Mac/Linux)
  - Windows: [Descargar Python](https://www.python.org/downloads/)
  - O **Node.js**: [Descargar Node.js](https://nodejs.org/)

### Para APK (Avanzado)
- **Node.js** (v18 o superior)
- **Android Studio** (para compilar APK localmente)
- O cuenta en **Expo/Capacitor** (para compilar en la nube)

---

## 📥 Instalación Básica

### Paso 1: Clonar el Repositorio

```bash
# Opción 1: HTTPS
git clone https://github.com/19maxi92/acrobatic_gamelp.git
cd acrobatic_gamelp

# Opción 2: SSH (si tienes configurado)
git clone git@github.com:19maxi92/acrobatic_gamelp.git
cd acrobatic_gamelp
```

### Paso 2: Verificar Archivos

```bash
# Listar archivos
ls -la

# Deberías ver:
# - index.html
# - game.js
# - styles.css
# - README.md
```

✅ **¡Ya está instalado!** No necesitas npm install ni dependencias adicionales.

---

## 🌐 Ejecución en Web

### Método 1: Abrir Archivo Directamente (Más Simple)

1. **Navega a la carpeta del proyecto**
2. **Doble clic en `index.html`**
3. Se abrirá en tu navegador predeterminado
4. ¡A jugar! 🎮

**Limitaciones**: Algunas características pueden no funcionar por restricciones de CORS.

### Método 2: Servidor Local con Python (Recomendado)

```bash
# Si tienes Python 3
python3 -m http.server 8000

# Si tienes Python 2
python -m SimpleHTTPServer 8000

# Si no sabes cuál tienes
python --version
```

Luego abre en tu navegador: **http://localhost:8000**

### Método 3: Servidor Local con Node.js

```bash
# Instalar http-server (solo la primera vez)
npm install -g http-server

# Ejecutar servidor
http-server -p 8000

# O usar npx (sin instalar)
npx http-server -p 8000
```

Luego abre en tu navegador: **http://localhost:8000**

### Método 4: Servidor Local con PHP

```bash
php -S localhost:8000
```

Luego abre en tu navegador: **http://localhost:8000**

### Método 5: Live Server (VS Code)

1. Instala la extensión **"Live Server"** en VS Code
2. Clic derecho en `index.html`
3. Selecciona **"Open with Live Server"**
4. Se abrirá automáticamente en tu navegador

---

## 📱 Ejecución en Móvil

### Opción 1: Misma Red WiFi (Recomendado)

Esta es la forma más fácil de probar en tu celular:

#### Paso 1: Iniciar Servidor en tu PC

```bash
python3 -m http.server 8000
# o cualquier otro método del paso anterior
```

#### Paso 2: Encontrar tu IP Local

**En Windows:**
```cmd
ipconfig
```
Busca: `IPv4 Address` → Ejemplo: `192.168.1.100`

**En Mac/Linux:**
```bash
ifconfig
# o
ip addr show
```
Busca tu IP en formato `192.168.x.x` o `10.x.x.x`

**Forma fácil (ambos):**
```bash
# Windows PowerShell
(Get-NetIPAddress | Where-Object {$_.AddressFamily -eq "IPv4" -and $_.IPAddress -like "192.168.*"}).IPAddress

# Mac/Linux
ipconfig getifaddr en0  # WiFi
ipconfig getifaddr en1  # Ethernet
```

#### Paso 3: Abrir en tu Celular

1. **Asegúrate** de que tu celular y PC estén en la **misma red WiFi**
2. Abre el navegador en tu celular
3. Escribe: `http://[TU_IP]:8000`
   - Ejemplo: `http://192.168.1.100:8000`
4. ¡El juego debería cargar! 🎮

### Opción 2: Ngrok (Acceso desde cualquier lugar)

Si tu celular no está en la misma red:

#### Paso 1: Instalar Ngrok

```bash
# Mac
brew install ngrok

# Windows/Linux: Descargar desde https://ngrok.com/download
```

#### Paso 2: Iniciar Servidor Local

```bash
python3 -m http.server 8000
```

#### Paso 3: Crear Túnel con Ngrok

```bash
# En otra terminal
ngrok http 8000
```

Verás una URL como: `https://abc123.ngrok.io`

#### Paso 4: Abrir en tu Celular

1. Copia la URL de ngrok
2. Ábrela en el navegador de tu celular
3. ¡Funciona desde cualquier lugar con internet! 🌍

### Opción 3: GitHub Pages (Hosting Gratuito)

Publica el juego en internet gratis:

```bash
# En el repositorio
git checkout -b gh-pages
git push origin gh-pages
```

Luego activa GitHub Pages en:
`Settings → Pages → Source: gh-pages branch`

Tu juego estará en: `https://19maxi92.github.io/acrobatic_gamelp/`

---

## 🤖 Conversión a APK

Ver la guía completa en [APK_GUIDE.md](./APK_GUIDE.md)

### Opción Rápida: Capacitor (Recomendado)

```bash
# 1. Instalar Node.js si no lo tienes
# Descargar desde: https://nodejs.org/

# 2. Instalar Capacitor
npm init -y
npm install @capacitor/core @capacitor/cli

# 3. Inicializar Capacitor
npx cap init "Acrobatic Game" "com.tudominio.acrobatic"

# 4. Agregar plataforma Android
npx cap add android

# 5. Copiar archivos web
npx cap copy

# 6. Abrir en Android Studio
npx cap open android
```

En Android Studio:
1. Espera a que sincronice
2. Build → Generate Signed Bundle / APK
3. Sigue el wizard para generar APK

---

## 🐛 Solución de Problemas

### El juego no carga en web

**Síntoma**: Página en blanco o error de carga

**Soluciones**:
```bash
# 1. Verificar que los archivos existen
ls -la

# 2. Verificar permisos
chmod 644 index.html game.js styles.css

# 3. Limpiar cache del navegador
# Chrome: Ctrl+Shift+Del (Windows) o Cmd+Shift+Del (Mac)
# Firefox: Ctrl+Shift+Del
```

### Error: "Python no reconocido"

**Solución**:
```bash
# Instalar Python
# Windows: https://www.python.org/downloads/
# Marcar la opción "Add Python to PATH"

# Mac:
brew install python3

# Linux:
sudo apt-get install python3
```

### No puedo acceder desde el móvil

**Problema**: `La página no se puede mostrar`

**Soluciones**:

1. **Verifica la red WiFi**:
   - Celular y PC en la misma red
   - Desactiva datos móviles en el celular

2. **Verifica el Firewall**:
   ```bash
   # Windows: Permitir Python/Node en el firewall
   # Mac: System Preferences → Security → Firewall → Allow
   ```

3. **Verifica la IP**:
   ```bash
   # Debe ser 192.168.x.x o 10.x.x.x
   # NO usar 127.0.0.1 (solo funciona en la misma PC)
   ```

4. **Prueba otro puerto**:
   ```bash
   python3 -m http.server 8080
   # Luego: http://TU_IP:8080
   ```

### Los controles táctiles no aparecen en móvil

**Síntoma**: Veo el juego pero no los botones táctiles

**Causa**: El navegador no detecta que es un dispositivo móvil

**Soluciones**:
1. Abre las DevTools del navegador en el celular
2. Verifica que la pantalla sea menor a 768px de ancho
3. Intenta en modo privado/incógnito
4. Recarga la página con fuerza (Shift+F5)

### El juego va lento en móvil

**Soluciones**:
1. Cierra otras apps en el celular
2. Actualiza el navegador
3. Prueba en Chrome Mobile (mejor rendimiento)
4. Baja el brillo (reduce consumo de GPU)

### Error al generar APK

Ver [APK_GUIDE.md](./APK_GUIDE.md) para soluciones específicas.

---

## 📞 Ayuda Adicional

### Recursos Útiles

- **Documentación Phaser**: https://phaser.io/docs
- **Capacitor Docs**: https://capacitorjs.com/docs
- **Cordova Docs**: https://cordova.apache.org/docs

### Comandos Rápidos de Referencia

```bash
# Servidor Python
python3 -m http.server 8000

# Servidor Node
npx http-server -p 8000

# Ver IP (Mac/Linux)
ifconfig | grep "inet " | grep -v 127.0.0.1

# Ver IP (Windows)
ipconfig | findstr IPv4

# Git - Ver estado
git status

# Git - Actualizar
git pull origin main
```

---

## ✅ Checklist de Instalación

- [ ] Repositorio clonado
- [ ] Archivos verificados (index.html, game.js, styles.css)
- [ ] Funciona en navegador web
- [ ] Probado en móvil (misma red WiFi)
- [ ] Controles táctiles funcionan en móvil
- [ ] (Opcional) APK generado

---

## 🎯 Próximos Pasos

Una vez que tengas todo funcionando:

1. **Personaliza el juego**:
   - Modifica colores en `styles.css`
   - Ajusta física en `game.js`
   - Agrega nuevos niveles

2. **Mejora el rendimiento**:
   - Optimiza imágenes
   - Ajusta la física de Phaser

3. **Comparte tu juego**:
   - Publica en GitHub Pages
   - Genera APK para amigos
   - Sube a Play Store (con APK firmado)

---

**¿Problemas no resueltos?** Abre un issue en el repositorio con:
- Sistema operativo y versión
- Navegador y versión
- Mensaje de error completo
- Pasos para reproducir el problema

¡Buena suerte y que disfrutes el juego! 🎮🚀
