# 🎮 ROADMAP Y DISEÑO DEL JUEGO - Acrobatic Game Evolution

## 🎯 VISIÓN GENERAL

Transformar el juego actual en un **plataformero vertical** con:
- 👫 Selección de personaje (chico/chica)
- ⬆️ Progresión vertical infinita
- ⚡ Sistema de poderes (positivos y negativos)
- 👥 Sistema de compañeros/amigos
- 🎪 Animaciones y piruetas complejas
- 🎨 Gráficos mejorados y más visuales
- 📱 APK funcionando en Android

---

## 📊 ESTADO ACTUAL

✅ **Ya tenemos**:
- Controles web y móvil funcionando
- Sistema de física con Phaser 3
- Doble salto
- Sistema de trucos (rotación 360°)
- Combos y streak
- Feedback háptico
- Diseño responsive

❌ **Falta implementar**:
- Selección de personaje
- Sprites animados
- Sistema de poderes
- Compañeros/formaciones
- Scroll vertical
- APK para Android

---

## 🗺️ ROADMAP - FASES DE DESARROLLO

### **FASE 0: APK Básico** 🎯 *PRIORIDAD MÁXIMA*
**Objetivo**: Tener el juego actual funcionando como APK en celular
**Tiempo estimado**: 1-2 horas
**Tareas**:
- [ ] Setup Capacitor
- [ ] Configurar proyecto Android
- [ ] Generar APK de desarrollo
- [ ] Probar en celular
- [ ] Ajustar controles si es necesario

**Resultado**: APK funcionando con el juego actual

---

### **FASE 1: Mejoras Visuales Básicas** 🎨
**Objetivo**: Hacer el juego más "visual" con gráficos mejorados
**Tiempo estimado**: 2-3 días
**Tareas**:

#### 1.1 Personajes con Sprites
- [ ] Crear/buscar sprites de personaje masculino
- [ ] Crear/buscar sprites de personaje femenino
- [ ] Implementar animaciones:
  - Idle (quieto)
  - Walk (caminar)
  - Jump (saltar)
  - Double Jump (doble salto)
  - Trick (pirueta/voltereta)
  - Land (aterrizar)

#### 1.2 Plataformas Mejoradas
- [ ] Diseñar plataformas con textura
- [ ] Diferentes tipos de plataformas visuales
- [ ] Efectos de partículas al aterrizar

#### 1.3 Background y Ambiente
- [ ] Cielo con nubes animadas
- [ ] Diferentes layers de parallax
- [ ] Efectos de atmósfera

**Resultado**: Juego visualmente atractivo con sprites reales

---

### **FASE 2: Selección de Personaje** 👫
**Objetivo**: Poder elegir entre chico o chica antes de jugar
**Tiempo estimado**: 1-2 días
**Tareas**:

#### 2.1 Pantalla de Selección
- [ ] Diseñar UI de selección
- [ ] Preview de cada personaje
- [ ] Animación de selección
- [ ] Guardar selección (localStorage)

#### 2.2 Sistema de Personajes
```javascript
const characters = {
  boy: {
    name: "Max",
    sprites: {
      idle: "boy_idle.png",
      walk: "boy_walk.png",
      jump: "boy_jump.png",
      trick: "boy_trick.png"
    },
    abilities: {
      speed: 1.0,
      jump: 1.0,
      trickBonus: 1.0
    }
  },
  girl: {
    name: "Luna",
    sprites: { ... },
    abilities: {
      speed: 1.1,
      jump: 0.9,
      trickBonus: 1.2
    }
  }
}
```

#### 2.3 Diferencias de Personajes
- [ ] Estadísticas únicas para cada uno
- [ ] Animaciones diferentes
- [ ] Colores/temas diferentes

**Resultado**: Pantalla de selección funcional con 2 personajes

---

### **FASE 3: Sistema de Scroll Vertical** ⬆️
**Objetivo**: El juego sube infinitamente mientras el jugador avanza
**Tiempo estimado**: 2-3 días
**Tareas**:

#### 3.1 Scroll de Cámara
- [ ] Implementar cámara que sigue al jugador
- [ ] Scroll suave hacia arriba
- [ ] Límite inferior (caer = game over)

#### 3.2 Generación Procedural
- [ ] Algoritmo para generar plataformas infinitas
- [ ] Dificultad progresiva (más separación)
- [ ] Diferentes patterns de plataformas

#### 3.3 Sistema de Altura
- [ ] Contador de metros subidos
- [ ] Récord de altura máxima
- [ ] Checkpoints cada X metros

```javascript
// Ejemplo de generación
function generatePlatforms(height) {
  const difficulty = Math.floor(height / 100);
  const spacing = 80 + (difficulty * 10);
  const width = 120 - (difficulty * 5);

  // Generar plataformas más difíciles mientras más alto
}
```

**Resultado**: Juego con scroll vertical infinito

---

### **FASE 4: Sistema de Poderes** ⚡
**Objetivo**: Poderes buenos y malos que aparecen en el mapa
**Tiempo estimado**: 3-4 días
**Tareas**:

#### 4.1 Poderes Positivos 🟢
```javascript
const powerUps = {
  superJump: {
    icon: "🚀",
    duration: 10000, // 10 segundos
    effect: "jumpForce *= 1.5"
  },
  speedBoost: {
    icon: "⚡",
    duration: 8000,
    effect: "speed *= 1.5"
  },
  doublePoints: {
    icon: "💎",
    duration: 15000,
    effect: "points *= 2"
  },
  shield: {
    icon: "🛡️",
    duration: 5000,
    effect: "invulnerable = true"
  },
  magnetCoins: {
    icon: "🧲",
    duration: 12000,
    effect: "attractCoins = true"
  }
}
```

#### 4.2 Poderes Negativos 🔴
```javascript
const powerDowns = {
  slowMotion: {
    icon: "🐌",
    duration: 5000,
    effect: "speed *= 0.5"
  },
  lowJump: {
    icon: "⚓",
    duration: 8000,
    effect: "jumpForce *= 0.6"
  },
  reverseControls: {
    icon: "🔄",
    duration: 6000,
    effect: "left ↔ right"
  },
  heavyWeight: {
    icon: "🎈",
    duration: 10000,
    effect: "gravity *= 1.5"
  },
  blur: {
    icon: "😵",
    duration: 5000,
    effect: "vision blurred"
  }
}
```

#### 4.3 Sistema de Spawning
- [ ] Aparición aleatoria de poderes
- [ ] Probabilidad basada en altura
- [ ] Indicador visual de poder activo
- [ ] Timer visible
- [ ] Efectos visuales (aura, partículas)

#### 4.4 UI de Poderes Activos
```
┌──────────────────────┐
│ 🚀 Super Jump  [8s]  │
│ 💎 Double Pts [12s]  │
│ 🐌 Slow       [3s]   │
└──────────────────────┘
```

**Resultado**: Sistema completo de poderes que modifican gameplay

---

### **FASE 5: Sistema de Compañeros** 👥
**Objetivo**: Amigos que te ayudan y hacen formaciones acrobáticas
**Tiempo estimado**: 4-5 días
**Tareas**:

#### 5.1 Compañeros Básicos
```javascript
const companions = {
  partner: {
    name: "Compañero",
    icon: "👤",
    unlock: "Altura 50m",
    ability: "Sigue al jugador y duplica trucos"
  },
  spotter: {
    name: "Apoyo",
    icon: "🤝",
    unlock: "Altura 100m",
    ability: "Te salva de una caída"
  },
  juggler: {
    name: "Malabarista",
    icon: "🤹",
    unlock: "Altura 200m",
    ability: "Genera monedas extra"
  }
}
```

#### 5.2 Formaciones Acrobáticas
Inspirado en el Tower Game:

```javascript
const formations = {
  duo: {
    name: "Dúo Voltereta",
    sprite: "🤸🤸",
    bonus: "×2.0 puntos",
    requirement: "1 compañero + tecla especial"
  },
  pyramid: {
    name: "Pirámide Humana",
    sprite: "🤸🤸🤸",
    bonus: "×3.0 puntos + invulnerable 2s",
    requirement: "2 compañeros + tecla especial"
  },
  tower: {
    name: "Torre Acrobática",
    sprite: "🤸🤸🤸🤸",
    bonus: "×5.0 puntos + mega salto",
    requirement: "3 compañeros + perfect timing"
  }
}
```

#### 5.3 Sistema de Desbloqueables
- [ ] Compañeros se desbloquean por altura
- [ ] Sistema de experiencia/nivel
- [ ] Mejoras para cada compañero
- [ ] Slot system (elegir qué compañeros llevar)

#### 5.4 Animaciones de Formación
- [ ] Trigger de formación (botón especial)
- [ ] Animación de ensamblaje
- [ ] Formación activa por X segundos
- [ ] Bonus de puntos multiplicado
- [ ] Efectos visuales especiales

**Resultado**: Sistema completo de compañeros y formaciones

---

### **FASE 6: Monetización y Progresión** 💰
**Objetivo**: Sistema de monedas, tienda y progresión
**Tiempo estimado**: 3-4 días
**Tareas**:

#### 6.1 Sistema de Monedas
- [ ] Monedas en el mapa
- [ ] Monedas por trucos
- [ ] Contador persistente
- [ ] Animación de recolección

#### 6.2 Tienda
```javascript
const shop = {
  characters: [
    { name: "Ninja", cost: 1000 },
    { name: "Parkour", cost: 2500 },
    { name: "Bailarina", cost: 5000 }
  ],
  companions: [
    { name: "Compañero Pro", cost: 3000 },
    { name: "Gemelo", cost: 7500 }
  ],
  powerups: [
    { name: "Start with Shield", cost: 500 },
    { name: "Extra Life", cost: 800 }
  ],
  cosmetics: [
    { name: "Skin Arcoíris", cost: 2000 },
    { name: "Trail de Estrellas", cost: 1500 }
  ]
}
```

#### 6.3 Sistema de Logros
- [ ] Logros por altura
- [ ] Logros por combos
- [ ] Logros por formaciones
- [ ] Recompensas por logros

#### 6.4 Daily Challenges
- [ ] Desafío diario
- [ ] Recompensas especiales
- [ ] Racha de días consecutivos

**Resultado**: Sistema de progresión completo

---

### **FASE 7: Pulido y Efectos** ✨
**Objetivo**: Hacer el juego "más virtual" con efectos profesionales
**Tiempo estimado**: 2-3 días
**Tareas**:

#### 7.1 Efectos Visuales
- [ ] Partículas al saltar
- [ ] Trail (estela) del personaje
- [ ] Screen shake en trucos
- [ ] Glow effects en combos
- [ ] Slow motion en momentos épicos

#### 7.2 Audio
- [ ] Música de fondo
- [ ] SFX para saltos
- [ ] SFX para trucos
- [ ] SFX para poderes
- [ ] Voces/gritos del personaje

#### 7.3 Animaciones Avanzadas
- [ ] Transiciones suaves
- [ ] Anticipation en movimientos
- [ ] Squash & stretch
- [ ] Motion blur

#### 7.4 UI/UX Mejorada
- [ ] Menú principal profesional
- [ ] Pantalla de pausa
- [ ] Game over con estadísticas
- [ ] Leaderboard local
- [ ] Settings (volumen, controles, etc)

**Resultado**: Juego pulido y profesional

---

## 🎨 DISEÑO VISUAL - "Hacerlo más virtual"

### Opción 1: Pixel Art (Más Fácil)
- Estilo retro 16-bit
- Sprites simples pero efectivos
- Fácil de animar
- Menor tamaño de archivo

**Recursos**:
- OpenGameArt.org
- Itch.io (asset packs)
- Kenney.nl (assets gratis)

### Opción 2: Cartoon 2D (Recomendado)
- Estilo moderno y colorido
- Personajes expresivos
- Animaciones fluidas
- Más atractivo visualmente

**Herramientas**:
- Canva (crear sprites simples)
- Figma (diseño vectorial)
- Piskel (pixel art online)
- Adobe Illustrator

### Opción 3: 3D Pre-rendered (Avanzado)
- Modelos 3D renderizados como sprites 2D
- Look profesional
- Más trabajo de creación

---

## 📱 APK - PLAN DE IMPLEMENTACIÓN

### Paso 1: Setup Capacitor (AHORA)
```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android

npx cap init "Acrobatic Game" "com.acrobatic.game"
npx cap add android
```

### Paso 2: Configuración
```json
// capacitor.config.json
{
  "appId": "com.acrobatic.game",
  "appName": "Acrobatic Game",
  "webDir": ".",
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000
    }
  }
}
```

### Paso 3: Copiar archivos y abrir Android Studio
```bash
npx cap copy android
npx cap open android
```

### Paso 4: Generar APK
- Build → Generate Signed Bundle / APK
- Crear keystore
- Generar APK

### Paso 5: Instalar en celular
```bash
adb install app-release.apk
```

---

## 🗓️ CRONOGRAMA SUGERIDO

### Semana 1: **APK + Visual Básico**
- Días 1-2: Generar APK funcional
- Días 3-5: Agregar sprites básicos
- Días 6-7: Mejorar fondos y plataformas

### Semana 2: **Selección + Scroll**
- Días 1-3: Sistema de personajes (chico/chica)
- Días 4-7: Scroll vertical infinito

### Semana 3: **Poderes**
- Días 1-4: Implementar todos los poderes
- Días 5-7: Testing y balanceo

### Semana 4: **Compañeros**
- Días 1-5: Sistema de compañeros y formaciones
- Días 6-7: Animaciones de formaciones

### Semana 5: **Progresión y Pulido**
- Días 1-3: Sistema de monedas y tienda
- Días 4-7: Efectos, audio y pulido final

**Total**: ~5 semanas para juego completo

---

## 🎯 PRIORIDADES INMEDIATAS

### ⚡ ESTA SESIÓN (1-2 horas):
1. ✅ Setup Capacitor
2. ✅ Generar primer APK
3. ✅ Probar en celular
4. ⏳ Planear siguiente fase

### 📋 PRÓXIMA SESIÓN:
1. Buscar/crear sprites de personajes
2. Implementar selección de personaje
3. Agregar sprites animados básicos

### 🎨 DESPUÉS:
1. Scroll vertical
2. Sistema de poderes
3. Compañeros y formaciones

---

## 💡 RECURSOS NECESARIOS

### Assets Visuales
- **Sprites de personajes**: 2 personajes × 6 animaciones
- **Plataformas**: 5-10 tipos diferentes
- **Poderes**: 10 iconos (5 buenos, 5 malos)
- **Backgrounds**: 3-5 layers para parallax
- **UI**: Botones, iconos, fuentes

### Herramientas
- **Phaser 3**: Ya lo tenemos
- **Capacitor**: Para APK
- **Tiled**: Editor de mapas (opcional)
- **Aseprite/Piskel**: Para sprites
- **Audacity**: Para audio

### Opciones de Assets:
1. **Gratis**: OpenGameArt, Kenney, Itch.io
2. **Crear propios**: Piskel, Canva
3. **Comprar**: Unity Asset Store, Itch.io marketplace
4. **AI Generated**: MidJourney, DALL-E para concept art

---

## 🤔 DECISIONES A TOMAR

1. **Estilo Visual**: ¿Pixel art, cartoon 2D, o 3D pre-rendered?
2. **Assets**: ¿Gratis, crear propios, o comprar?
3. **Monetización**: ¿Gratis con ads, pago, o freemium?
4. **Plataformas**: ¿Solo Android, o también iOS?
5. **Nombre**: ¿"Acrobatic Game" o algo más llamativo?

---

## 📊 COMPARACIÓN DE OPCIONES

### Desarrollo Rápido (2 semanas):
- APK básico
- 2 personajes simples (sprites básicos)
- Scroll vertical
- Poderes básicos (3-4)
- Sin compañeros

### Desarrollo Completo (5 semanas):
- APK pulido
- 2+ personajes animados
- Scroll vertical con generación procedural
- 10+ poderes
- Sistema de compañeros y formaciones
- Tienda y progresión
- Audio y efectos

### Desarrollo Mínimo Viable (1 semana):
- APK funcional
- Sin cambios visuales grandes
- Mejoras menores
- Foco en estabilidad

---

## 🚀 ¿QUÉ HACEMOS AHORA?

**Opción A**: Empezamos con el APK inmediatamente (30 min - 1 hora)
**Opción B**: Primero mejoramos lo visual y luego APK (2-3 horas)
**Opción C**: Creamos un prototipo con sprites básicos primero (1-2 horas)

---

**¿Qué te parece el plan? ¿Empezamos con el APK o prefieres primero mejorar lo visual?** 🎮

Puedo ayudarte con cualquier fase. Mi recomendación es:
1. **Ahora**: APK básico (tenerlo funcionando en tu celu)
2. **Después**: Sprites y visuales
3. **Luego**: Features avanzadas (poderes, compañeros, etc.)
