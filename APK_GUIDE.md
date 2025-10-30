# 📲 Guía Completa para Convertir a APK

Esta guía te muestra **todas las formas** de convertir el juego web a una aplicación APK para Android.

## 📋 Tabla de Contenidos

1. [Comparación de Métodos](#comparación-de-métodos)
2. [Método 1: Capacitor (Recomendado)](#método-1-capacitor-recomendado)
3. [Método 2: Cordova](#método-2-cordova)
4. [Método 3: Expo (React Native)](#método-3-expo-react-native)
5. [Método 4: WebView Nativo](#método-4-webview-nativo-android-studio)
6. [Configuración Avanzada](#configuración-avanzada)
7. [Publicar en Play Store](#publicar-en-play-store)

---

## 🔍 Comparación de Métodos

| Método | Dificultad | Tiempo | Pros | Contras |
|--------|-----------|--------|------|---------|
| **Capacitor** | ⭐⭐ Fácil | 30 min | Moderno, bien mantenido, plugins nativos | Requiere Node.js |
| **Cordova** | ⭐⭐⭐ Media | 45 min | Maduro, muchos plugins | Menos moderno |
| **Expo** | ⭐⭐⭐⭐ Alta | 2-3 hrs | Build en la nube | Requiere reescribir en React Native |
| **WebView Nativo** | ⭐⭐⭐⭐⭐ Muy Alta | 1-2 hrs | Control total | Requiere conocimiento de Android |

**Recomendación**: Usa **Capacitor** si eres nuevo. Es el más moderno y fácil.

---

## 🚀 Método 1: Capacitor (Recomendado)

Capacitor es la forma moderna de convertir aplicaciones web a móvil. Es mantenido por el equipo de Ionic.

### Requisitos

- **Node.js** (v18 o superior): [Descargar aquí](https://nodejs.org/)
- **Android Studio**: [Descargar aquí](https://developer.android.com/studio)
- **JDK 17**: [Descargar aquí](https://adoptium.net/)

### Paso 1: Verificar Requisitos

```bash
# Verificar Node.js
node --version  # Debe ser v18+

# Verificar npm
npm --version

# Verificar Java (después de instalar)
java --version  # Debe ser 17+
```

### Paso 2: Instalar Capacitor

```bash
# Navega al directorio del proyecto
cd acrobatic_gamelp

# Inicializar package.json si no existe
npm init -y

# Instalar Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Paso 3: Configurar Capacitor

```bash
# Inicializar Capacitor
npx cap init

# Responde las preguntas:
# App name: Acrobatic Game
# App ID: com.tudominio.acrobatic (reemplaza "tudominio")
# Web dir: . (punto, significa raíz del proyecto)
```

### Paso 4: Crear Configuración

El comando anterior crea `capacitor.config.json`. Edítalo:

```json
{
  "appId": "com.tudominio.acrobatic",
  "appName": "Acrobatic Game",
  "webDir": ".",
  "bundledWebRuntime": false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#87CEEB"
    }
  },
  "android": {
    "allowMixedContent": true
  }
}
```

### Paso 5: Agregar Plataforma Android

```bash
# Agregar Android
npx cap add android

# Esto creará una carpeta "android/" con el proyecto nativo
```

### Paso 6: Copiar Archivos Web

```bash
# Copia los archivos web al proyecto Android
npx cap copy android

# O sincroniza (copy + update)
npx cap sync android
```

### Paso 7: Abrir en Android Studio

```bash
# Abre el proyecto en Android Studio
npx cap open android
```

### Paso 8: Generar APK en Android Studio

1. **Espera a que Android Studio sincronice** (primera vez tarda 5-10 min)
2. En el menú: **Build → Generate Signed Bundle / APK**
3. Selecciona **APK**
4. **Crea un nuevo keystore**:
   - Key store path: Elige ubicación (ej: `acrobatic-key.jks`)
   - Password: Elige una contraseña segura
   - Alias: `acrobatic`
   - Validity: 25 años (9125 días)
   - Llena los campos del certificado

5. **Selecciona variante**: `release`
6. **Firma**: V1 y V2
7. Click en **Finish**

8. **APK generado**: Lo encontrarás en `android/app/release/app-release.apk`

### Paso 9: Instalar APK en tu Celular

**Opción A: USB**
```bash
# Habilita "Depuración USB" en tu celular
# Conecta el celular por USB

adb install android/app/release/app-release.apk
```

**Opción B: Transferir Archivo**
1. Copia `app-release.apk` a tu celular (email, Dropbox, USB, etc.)
2. Abre el archivo en tu celular
3. Permite "Instalar desde orígenes desconocidos"
4. Instala la app

---

## 📦 Método 2: Cordova

Cordova es el método clásico, maduro pero menos moderno que Capacitor.

### Requisitos

- Node.js
- Android Studio
- JDK

### Instalación

```bash
# Instalar Cordova globalmente
npm install -g cordova

# Crear proyecto Cordova
cordova create AcrobaticGame com.tudominio.acrobatic "Acrobatic Game"

cd AcrobaticGame

# Copiar archivos del juego a www/
rm -rf www/*
cp ../index.html ../game.js ../styles.css www/

# Agregar plataforma Android
cordova platform add android

# Construir APK
cordova build android --release
```

### Firmar APK

```bash
# Generar keystore
keytool -genkey -v -keystore acrobatic.keystore -alias acrobatic -keyalg RSA -keysize 2048 -validity 10000

# Crear archivo build.json
cat > build.json << EOF
{
  "android": {
    "release": {
      "keystore": "./acrobatic.keystore",
      "alias": "acrobatic",
      "storePassword": "TU_PASSWORD",
      "password": "TU_PASSWORD"
    }
  }
}
EOF

# Build con firma
cordova build android --release --buildConfig=build.json
```

APK estará en: `platforms/android/app/build/outputs/apk/release/`

---

## 📱 Método 3: Expo (React Native)

**Nota**: Este método requiere reescribir el juego en React Native. Es más complejo pero da mejor rendimiento nativo.

### Cuando Usar

- Quieres rendimiento nativo máximo
- Necesitas acceso a APIs nativas (cámara, GPS, etc.)
- Estás dispuesto a reescribir el código

### Pasos Rápidos

```bash
# Instalar Expo CLI
npm install -g expo-cli

# Crear proyecto
expo init AcrobaticGameNative
cd AcrobaticGameNative

# Desarrollo con Expo Go
expo start

# Build APK con EAS
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

**Nota**: Puedes ver el juego tower que exploramos antes como ejemplo de un juego completo en React Native/Expo.

---

## 🔧 Método 4: WebView Nativo (Android Studio)

Crea una app Android nativa con WebView que carga tu juego.

### Paso 1: Crear Proyecto en Android Studio

1. Abre Android Studio
2. New Project → Empty Activity
3. Name: Acrobatic Game
4. Package: com.tudominio.acrobatic
5. Language: Java o Kotlin
6. Minimum SDK: API 24 (Android 7.0)

### Paso 2: Configurar WebView

**archivo: `app/src/main/java/.../MainActivity.java`**

```java
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = findViewById(R.id.webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);

        webView.setWebViewClient(new WebViewClient());

        // Opción 1: Cargar desde assets
        webView.loadUrl("file:///android_asset/index.html");

        // Opción 2: Cargar desde URL
        // webView.loadUrl("https://19maxi92.github.io/acrobatic_gamelp/");
    }
}
```

**archivo: `app/src/main/res/layout/activity_main.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>
```

### Paso 3: Copiar Archivos

1. Crea carpeta: `app/src/main/assets/`
2. Copia `index.html`, `game.js`, `styles.css` ahí

### Paso 4: Configurar Permisos

**archivo: `app/src/main/AndroidManifest.xml`**

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application
    android:usesCleartextTraffic="true"
    ... >
```

### Paso 5: Build APK

1. Build → Generate Signed Bundle / APK
2. Sigue los pasos de firma
3. APK estará en `app/release/`

---

## ⚙️ Configuración Avanzada

### Icono de la App

Genera iconos en todos los tamaños necesarios:

**Herramienta Online**: https://icon.kitchen/

1. Sube tu icono (recomendado: 1024x1024 PNG)
2. Descarga el paquete de iconos
3. **Capacitor**: Reemplaza en `android/app/src/main/res/mipmap-*/`
4. **Cordova**: Copia a `platforms/android/app/src/main/res/mipmap-*/`

### Splash Screen

**Capacitor**: Usa `@capacitor/splash-screen`

```bash
npm install @capacitor/splash-screen
```

**capacitor.config.json**:
```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#87CEEB",
      "showSpinner": false,
      "androidSpinnerStyle": "small",
      "splashFullScreen": true,
      "splashImmersive": true
    }
  }
}
```

### Orientación de Pantalla

**Capacitor**: En `android/app/src/main/AndroidManifest.xml`

```xml
<activity
    android:screenOrientation="landscape"
    <!-- o "portrait" para vertical -->
    ... >
```

### Permisos Adicionales

Si necesitas acceso a hardware:

```xml
<!-- Vibración -->
<uses-permission android:name="android.permission.VIBRATE" />

<!-- Almacenamiento -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<!-- Mantener pantalla encendida -->
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

### Optimizaciones de Rendimiento

**En `capacitor.config.json`**:

```json
{
  "android": {
    "allowMixedContent": true,
    "captureInput": true,
    "webContentsDebuggingEnabled": false,
    "hideLogs": true
  }
}
```

**En el código del juego (game.js)**:

```javascript
// Agregar al config de Phaser
const config = {
    // ... otras opciones
    render: {
        powerPreference: 'high-performance',
        antialias: false,
        pixelArt: true
    }
};
```

---

## 🏪 Publicar en Play Store

### Requisitos

- Cuenta de Google Play Developer ($25 USD única vez)
- APK firmado con keystore (no pierdas el keystore!)
- Imágenes promocionales
- Descripción de la app

### Paso 1: Preparar Assets

Necesitas:
- **Icono**: 512x512 PNG
- **Feature Graphic**: 1024x500 PNG
- **Screenshots**: Al menos 2 (16:9 ratio)
- **Descripción**: Corta y larga
- **Categoría**: Juegos → Arcade

### Paso 2: Crear App Bundle (AAB)

Google Play ahora prefiere AAB en lugar de APK:

**Capacitor**:
```bash
# En Android Studio
Build → Generate Signed Bundle / APK → Android App Bundle
```

**Cordova**:
```bash
cordova build android --release -- --packageType=bundle
```

### Paso 3: Subir a Play Console

1. Ve a https://play.google.com/console
2. Create App
3. Llena la información
4. Production → Create Release
5. Sube el AAB
6. Llena los formularios de contenido
7. Submit for review

**Tiempo de revisión**: 1-3 días

### Paso 4: Actualizaciones

Para actualizar:

1. Incrementa `versionCode` y `versionName` en `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 2        // Incrementar
    versionName "1.1.0"  // Actualizar
    ...
}
```

2. Build nuevo AAB
3. Sube a Play Console → Production → New Release

---

## 🐛 Solución de Problemas

### Error: "SDK location not found"

**Solución**:
```bash
# Crear archivo local.properties
echo "sdk.dir=/Users/TU_USUARIO/Library/Android/sdk" > android/local.properties

# Windows:
echo sdk.dir=C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk > android/local.properties

# Linux:
echo "sdk.dir=/home/TU_USUARIO/Android/Sdk" > android/local.properties
```

### Error: "Build failed - Unable to locate Java"

**Solución**:
```bash
# Instalar JDK 17
# Mac:
brew install openjdk@17

# Windows/Linux: Descargar desde
# https://adoptium.net/

# Configurar JAVA_HOME
export JAVA_HOME=/ruta/a/jdk-17
```

### APK muy grande (>50MB)

**Soluciones**:
1. Habilita ProGuard (minifica código)
2. Usa App Bundle en lugar de APK
3. Optimiza imágenes con herramientas como TinyPNG
4. Elimina logs de debug

```gradle
// android/app/build.gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        ...
    }
}
```

### El juego no funciona en el APK pero sí en web

**Posibles causas**:
1. **CORS**: No aplica en APK, pero verifica rutas de recursos
2. **Recursos no copiados**: Ejecuta `npx cap copy android`
3. **JavaScript deshabilitado**: Verifica WebView settings
4. **Phaser CDN bloqueado**: Descarga Phaser localmente

**Solución - Usar Phaser local**:
1. Descarga `phaser.min.js` desde https://phaser.io/download/stable
2. Ponlo en el proyecto
3. Cambia en `index.html`:
```html
<!-- Antes -->
<script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>

<!-- Después -->
<script src="phaser.min.js"></script>
```

### Los controles táctiles no responden en APK

**Solución**:

Agrega en `game.js`:
```javascript
// Agregar al config de Phaser
const config = {
    // ... otras opciones
    input: {
        touch: {
            capture: true
        }
    }
};
```

---

## 📊 Comparación Final

| Característica | Capacitor | Cordova | Expo | WebView |
|---------------|-----------|---------|------|---------|
| Facilidad | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Rendimiento | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Mantenimiento | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Plugins | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Tamaño APK | ~10MB | ~8MB | ~30MB | ~5MB |

**Recomendación Final**:
- **Principiantes**: Capacitor
- **Experiencia**: Cordova o WebView
- **Rendimiento máximo**: Expo (pero requiere reescribir)

---

## 🎯 Próximos Pasos

1. ✅ Generar tu primer APK con Capacitor
2. ✅ Probarlo en tu celular
3. ✅ Optimizar rendimiento
4. ✅ Agregar icono y splash screen
5. ✅ Publicar en Play Store (opcional)

---

## 📚 Recursos Adicionales

- **Capacitor**: https://capacitorjs.com/docs
- **Cordova**: https://cordova.apache.org/docs
- **Android Studio**: https://developer.android.com/studio/intro
- **Play Store**: https://support.google.com/googleplay/android-developer

---

**¿Preguntas?** Abre un issue en el repositorio con:
- Método que estás usando
- Sistema operativo
- Error completo
- Pasos que seguiste

¡Suerte con tu APK! 🚀📱
