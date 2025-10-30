# 🚀 Guía Rápida: Generar APK AHORA

## ⚡ Objetivo
Tener el juego funcionando como APK en tu celular en **30-60 minutos**.

---

## 📋 Requisitos Previos

### ✅ Verificar que tienes instalado:

```bash
# Node.js (debe ser v18+)
node --version

# npm
npm --version
```

Si NO tienes Node.js: [Descargar aquí](https://nodejs.org/)

### 📱 Android Studio

**Opción A: Build en la nube (Más fácil, sin Android Studio)**
- Solo necesitas cuenta Expo (gratis)
- El APK se genera en sus servidores
- Descargas el APK y listo

**Opción B: Build local (Más control, necesitas Android Studio)**
- Descargar: [Android Studio](https://developer.android.com/studio)
- Instalar JDK 17
- Configurar Android SDK

---

## 🎯 OPCIÓN 1: Capacitor (Recomendado para comenzar)

### Paso 1: Inicializar npm en el proyecto

```bash
cd /ruta/a/acrobatic_gamelp

# Crear package.json
npm init -y
```

### Paso 2: Instalar Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Paso 3: Inicializar Capacitor

```bash
npx cap init

# Responde las preguntas:
# App name: Acrobatic Game
# App ID: com.acrobatic.game (o tu dominio)
# Web directory: . (punto)
```

### Paso 4: Agregar plataforma Android

```bash
npx cap add android
```

Esto crea una carpeta `android/` con el proyecto nativo.

### Paso 5: Copiar archivos web al proyecto Android

```bash
npx cap copy android
```

### Paso 6A: Build en Android Studio (Local)

```bash
# Abrir proyecto en Android Studio
npx cap open android
```

En Android Studio:
1. Espera a que sincronice (5-10 min primera vez)
2. Build → Generate Signed Bundle / APK
3. Selecciona APK
4. Crea keystore (solo primera vez):
   - Path: Donde quieras guardarlo
   - Password: Elige uno seguro
   - Alias: acrobatic
   - Validity: 9125 días (25 años)
5. Llenar datos del certificado
6. Click Finish
7. APK estará en: `android/app/release/app-release.apk`

### Paso 6B: Build sin Android Studio (Comando)

Si tienes todo configurado:

```bash
cd android
./gradlew assembleRelease
```

APK estará en: `android/app/build/outputs/apk/release/`

### Paso 7: Instalar en celular

**Método 1: USB**
```bash
# Habilita "Depuración USB" en tu celular
# (Ajustes → Opciones de desarrollador)

# Conecta el celular por USB y ejecuta:
adb install android/app/release/app-release.apk
```

**Método 2: Transferir archivo**
1. Copia el APK a tu celular (email, Dropbox, Google Drive, etc.)
2. Abre el archivo en el celular
3. Permite "Orígenes desconocidos"
4. Instala

---

## 🎯 OPCIÓN 2: Cordova (Alternativa)

### Paso 1: Instalar Cordova

```bash
npm install -g cordova
```

### Paso 2: Crear proyecto Cordova

```bash
cordova create AcrobaticAPK com.acrobatic.game "Acrobatic Game"
cd AcrobaticAPK
```

### Paso 3: Copiar archivos del juego

```bash
# Borra el contenido de www/
rm -rf www/*

# Copia tus archivos
cp /ruta/a/acrobatic_gamelp/index.html www/
cp /ruta/a/acrobatic_gamelp/game.js www/
cp /ruta/a/acrobatic_gamelp/styles.css www/
```

### Paso 4: Agregar plataforma Android

```bash
cordova platform add android
```

### Paso 5: Build

```bash
# Build sin firma (para testing)
cordova build android

# APK estará en:
# platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Paso 6: Instalar

```bash
cordova run android
# O instalar manualmente como en Capacitor
```

---

## 🎯 OPCIÓN 3: EAS Build (Expo - Build en la nube)

**Ventaja**: No necesitas Android Studio
**Desventaja**: Necesitas adaptar el código a React Native/Expo

Esta opción requiere reescribir el juego en React Native. No es recomendable ahora.

---

## 🐛 Problemas Comunes

### Error: "SDK location not found"

```bash
# Crear local.properties en android/
echo "sdk.dir=/Users/TU_USUARIO/Library/Android/sdk" > android/local.properties

# Windows:
echo sdk.dir=C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk > android/local.properties

# Linux:
echo "sdk.dir=/home/TU_USUARIO/Android/Sdk" > android/local.properties
```

### Error: "Java not found"

```bash
# Instalar JDK 17
# Mac:
brew install openjdk@17

# Configurar JAVA_HOME
export JAVA_HOME=/path/to/jdk-17
```

### APK no se instala en celular

1. Habilita "Orígenes desconocidos" en Ajustes
2. Si ya está habilitado, borra versión anterior
3. Verifica que el APK no esté corrupto (re-descarga)

### Controles no funcionan en APK

En `game.js`, verifica que los eventos touch estén bien:

```javascript
btnJump.addEventListener('touchstart', (e) => {
    e.preventDefault();
    mobileControls.jump = true;
}, { passive: false });
```

---

## ✅ Checklist Final

Antes de instalar:
- [ ] APK generado sin errores
- [ ] Tamaño razonable (< 50MB)
- [ ] Permisos configurados (vibración, etc.)
- [ ] Icono de app configurado

Después de instalar:
- [ ] App abre sin crashes
- [ ] Controles táctiles responden
- [ ] Vibración funciona
- [ ] Combos y streak se ven
- [ ] No hay lag excesivo

---

## 📝 Siguiente Paso

Una vez que tengas el APK funcionando:

1. **Probar en el celular** y anotar:
   - ¿Qué funciona bien?
   - ¿Qué hay que mejorar?
   - ¿Controles cómodos?
   - ¿Performance bueno?

2. **Decidir siguiente mejora**:
   - ¿Agregar sprites de personajes?
   - ¿Selección chico/chica?
   - ¿Scroll vertical?
   - ¿Poderes?

3. **Iterar**:
   - Hacer cambios
   - Rebuild APK: `npx cap copy android` + rebuild
   - Reinstalar
   - Probar

---

## 🚀 Comando de Rebuild Rápido

Cuando hagas cambios al código:

```bash
# Copiar cambios
npx cap copy android

# Rebuild (en Android Studio o)
cd android && ./gradlew assembleRelease

# Reinstalar
adb install -r app/release/app-release.apk
```

---

## 💡 Tips

1. **Primera vez tarda más**: La configuración inicial puede tardar
2. **Keystore importante**: ¡No pierdas tu keystore! Lo necesitas para actualizar la app
3. **Testing frecuente**: Prueba en celular seguido, no esperes al final
4. **Backups**: Guarda el keystore en lugar seguro

---

**¿Listo para empezar?**

Dime:
- ¿Tienes Node.js instalado?
- ¿Quieres build local (Android Studio) o prefieres otro método?
- ¿Ya sabes tu "App ID" (com.tudominio.acrobatic)?

¡Vamos a generar ese APK! 📱🚀
