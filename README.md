# 🎮 Acrobatic Game - Juego de Acrobacias

Un juego de plataformas acrobático desarrollado con Phaser 3, optimizado para funcionar tanto en navegadores web de escritorio como en dispositivos móviles.

## 🌟 Características

- ✅ **Controles Duales**: Funciona con teclado (web) y controles táctiles (móvil)
- ✅ **Diseño Responsive**: Se adapta automáticamente a diferentes tamaños de pantalla
- ✅ **Física Realista**: Sistema de física mejorado con gravedad y colisiones
- ✅ **Sistema de Trucos**: Realiza acrobacias en el aire para ganar puntos extra
- ✅ **Doble Salto**: Salta dos veces en el aire
- ✅ **Sistema de Niveles**: Progresa a través de niveles cada vez más difíciles
- ✅ **Optimizado para Móvil**: Botones grandes y fáciles de usar
- 🆕 **Sistema de Combos**: Multiplica tus puntos con trucos consecutivos (inspirado en Tower Game)
- 🆕 **Perfect Streak**: Racha de trucos perfectos con indicador visual 🔥
- 🆕 **Feedback Háptico**: Vibración en saltos, trucos y caídas (web y móvil)
- 🆕 **Animaciones Mejoradas**: Indicadores visuales de combo con animaciones fluidas

## 🎯 Controles

### 🖥️ Web (Teclado)
- **←/→**: Mover izquierda/derecha
- **↑**: Saltar (presiona dos veces para doble salto)
- **SPACE**: Realizar truco acrobático

### 📱 Móvil (Táctil)
- **Botones ←/→**: Mover izquierda/derecha
- **Botón "Saltar"**: Saltar (presiona dos veces para doble salto)
- **Botón "Truco"**: Realizar truco acrobático

## 🚀 Cómo Jugar

1. **Objetivo**: Muévete por las plataformas, realiza trucos y acumula puntos
2. **Trucos**: Presiona el botón de truco mientras estás en el aire para rotar 360°
3. **Sistema de Puntos**:
   - Salto simple: +5 puntos
   - Doble salto: +10 puntos
   - Truco completado: Base 50 pts × Multiplicador de combo × (1 + streak × 0.1)
   - **Ejemplo**: Con combo 5x y streak 3: 50 × 2.0 × 1.3 = 130 puntos!
4. **Combos**:
   - Cada truco exitoso aumenta tu combo
   - Multiplicador: 1 + (combo × 0.2)
   - El combo se reinicia después de 3 segundos sin trucos
5. **Perfect Streak** 🔥:
   - Contador de trucos consecutivos
   - Bonus adicional en puntos
   - Visible en la esquina superior derecha
6. **Nivel**: Sube de nivel cada 300 puntos
7. **Penalización**: Pierdes 50 puntos y el combo si caes fuera de la pantalla
8. **Vibración**: Siente feedback háptico en cada acción (móvil)

## 📦 Instalación y Ejecución

### Opción 1: Servidor Local Simple

```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js
npx http-server -p 8000
```

Luego abre tu navegador en `http://localhost:8000`

### Opción 2: Abrir Directamente
Simplemente abre el archivo `index.html` en tu navegador.

### Opción 3: Probar en Móvil

1. Asegúrate de que tu computadora y móvil estén en la misma red WiFi
2. Ejecuta un servidor local (ver Opción 1)
3. Encuentra la IP de tu computadora:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` o `ip addr`
4. En tu móvil, abre el navegador y ve a `http://[TU_IP]:8000`
   - Ejemplo: `http://192.168.1.100:8000`

## 🏗️ Estructura del Proyecto

```
acrobatic_gamelp/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos responsive y controles móviles
├── game.js            # Lógica del juego con Phaser 3
└── README.md          # Este archivo
```

## 🔧 Tecnologías Utilizadas

- **Phaser 3.70.0**: Framework de juegos HTML5
- **HTML5 Canvas**: Para renderizado del juego
- **CSS3**: Diseño responsive y controles táctiles
- **Vanilla JavaScript**: Lógica del juego sin dependencias adicionales

## 🎨 Características Técnicas

### Optimizaciones para Móvil
- Viewport configurado para evitar zoom indeseado
- Controles táctiles con feedback visual
- Prevención de bounce/scroll en iOS
- Touch events optimizados para baja latencia
- Diseño adaptativo para orientación landscape y portrait

### Sistema de Física
- Gravedad: 800px/s²
- Velocidad de movimiento: 250px/s
- Velocidad de salto: -450px/s
- Multiplicador de velocidad durante trucos: 1.3x

### Responsive Design
- Adaptación automática al tamaño de pantalla
- Recreación de plataformas al cambiar orientación
- Controles táctiles mostrados solo en dispositivos móviles
- Información del juego adaptada según el dispositivo

## 🐛 Solución de Problemas

### El juego no carga en móvil
- Verifica que estés usando HTTPS o un servidor local
- Asegúrate de que JavaScript esté habilitado
- Prueba en modo incógnito para evitar problemas de caché

### Los controles táctiles no responden
- Asegúrate de tocar directamente los botones
- Verifica que no haya elementos superpuestos bloqueando los toques
- Intenta recargar la página

### El jugador no se mueve
- Verifica que el juego haya cargado completamente
- Revisa la consola del navegador para errores
- Asegúrate de que Phaser se haya cargado correctamente desde el CDN

## 🚀 Próximos Pasos para APK

Para convertir este juego en una aplicación Android (APK):

1. **Capacitor** (Recomendado):
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap open android
```

2. **Cordova**:
```bash
npm install -g cordova
cordova create AcrobaticGame com.example.acrobatic AcrobaticGame
cordova platform add android
cordova build android
```

3. **Android Studio**:
   - Importar el proyecto
   - Compilar y generar APK

## 📝 Notas de Desarrollo

- El juego usa gráficos simples (rectángulos de colores) para máxima compatibilidad
- El sistema de física está optimizado para móvil
- Los controles táctiles tienen un área de toque generosa (70x70px)
- El juego se adapta automáticamente a cambios de orientación

## 🎪 Inspiración del Tower Game

Este juego integra características del juego "Torre de Acróbatas" (Stack Tower):

### Características Implementadas:
- **Sistema de Combos**: Multiplicador de puntos por acciones consecutivas
- **Perfect Streak**: Contador de racha de trucos perfectos con emoji 🔥
- **Feedback Háptico**: Vibración mediante Web Vibration API
  - Light (10ms): Saltos
  - Medium (50ms): Trucos exitosos
  - Heavy (50-30-50ms): Caídas
- **Animaciones Fluidas**: Indicadores visuales con animaciones CSS
- **Sistema de Puntuación Complejo**: Multiplica por combo y streak

### Código de Referencia:
Para ver el análisis completo de las características del Tower Game y cómo fueron integradas, consulta:
- `TOWER_FEATURES.md` - Análisis detallado de características
- `components/game.js` (del repo Tower) - Código fuente original

### Mejoras Futuras:
- [ ] Sistema de wobble/tambaleo visual
- [ ] Múltiples personajes acrobáticos
- [ ] Dificultad progresiva más avanzada
- [ ] Partículas y efectos visuales
- [ ] Sonidos y música

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Mejorar la documentación
- Optimizar el código

---

**¡Disfruta del juego!** 🎮🎪
