# 🎪 Características del Juego Tower - Análisis e Integración

Este documento analiza las características del juego "Torre de Acróbatas" (Stack Tower) y cómo integrarlas en nuestro juego de plataformas acrobático.

## 📊 Análisis del Juego Tower

### Descripción General
El juego Tower es un Stack Tower (tipo Stack/Tower Building) donde apilas acróbatas cayendo desde arriba. El objetivo es colocarlos con precisión para construir la torre más alta posible.

### 🎯 Características Principales

#### 1. **Sistema de Combos** ⚡
- **Cómo funciona**: Cada colocación precisa aumenta el combo
- **Precisión requerida**:
  - >95% = Perfecta → +1 combo + vibración media
  - >75% = Buena → +1 combo + vibración suave
  - <75% = Regular → Reset combo + vibración fuerte
- **Impacto**: Multiplica los puntos por `1 + (combo × 0.2)`

**Ejemplo**:
```javascript
// Con combo de 5:
multiplicador = 1 + (5 × 0.2) = 2.0x puntos
```

#### 2. **Perfect Streak (Racha Perfecta)** 🔥
- **Qué es**: Contador de colocaciones perfectas consecutivas (>95%)
- **Visual**: Indicador de fuego 🔥 con el número
- **Ventaja**: Motivación extra + visual satisfactorio
- **Se reinicia**: Cuando haces una colocación <95%

#### 3. **Sistema de Wobble (Tambaleo)** 🌊
- **Física realista**: La torre se tambalea cuando la precisión no es perfecta
- **Intensidad**: Proporcional a la imprecisión (1 - precisión) × 15
- **Animación**: Rotación de -3° a +3° con spring animation
- **Duración**: ~550ms total
- **Efecto**: Genera tensión y realismo

```javascript
// Cálculo del tambaleo
const wobbleAmount = Math.max(0, (1 - precision) * 15);
```

#### 4. **Feedback Háptico (Vibración)** 📳
- **Light**: Colocación buena (>75%)
- **Medium**: Colocación perfecta (>95%)
- **Heavy**: Colocación regular (<75%)
- **Error**: Fallo completo
- **Plataforma**: Funciona en móvil (Expo Haptics)

#### 5. **Dificultad Progresiva** 📈
- **Niveles**: Basados en puntuación (cada 200 pts)
- **Formaciones**:
  - Nivel 0-1: Solo individuales y dúos (difficulty ≤ 2)
  - Nivel 2-4: Hasta tríos (difficulty ≤ 3)
  - Nivel 5+: Todas las formaciones (difficulty ≤ 4)
- **Velocidad**: Aumenta con cada nivel: `2 + (level × 0.15)`

#### 6. **Múltiples Formaciones** 🤸
- **14 formaciones diferentes**:
  - 5 individuales (emoji único)
  - 4 dúos (2 emojis)
  - 3 tríos (3 emojis)
  - 2 cuartetos (4 emojis)
- **Propiedades**:
  - `width`: Ancho de la formación
  - `count`: Cantidad de acróbatas
  - `difficulty`: 1-4
  - `name`: Nombre descriptivo

#### 7. **Sistema de Puntuación Complejo** 🎯

```javascript
puntos = basePoints × precision × count × comboMultiplier × difficulty

Donde:
- basePoints = 50
- precision = 0.0 a 1.0 (0% a 100%)
- count = 1 a 4 (cantidad de acróbatas)
- comboMultiplier = 1 + (combo × 0.2)
- difficulty = 1 a 4
```

**Ejemplo de cálculo**:
```
Colocación perfecta (95%) de trío (count=3, difficulty=3) con combo 5:
= 50 × 0.95 × 3 × 2.0 × 3
= 855 puntos
```

#### 8. **Animaciones Fluidas** ✨
- **Combo indicator**: Scale + fade con spring physics
- **Wobble**: Smooth rotation animation
- **Falling piece**: Aceleración constante (gravity-like)
- **Tower shake**: Feedback visual en colocaciones malas

---

## 🎮 Integración en Nuestro Juego

### ✅ Ya Implementado

1. **Doble salto** - Similar al doble jump del tower
2. **Sistema de física** - Phaser Arcade Physics
3. **Controles táctiles** - Optimizados para móvil
4. **Sistema de puntuación básico** - Por saltos y trucos
5. **Sistema de niveles** - Cada 300 puntos

### 🆕 Por Implementar

#### Prioridad Alta (Recomendado)

1. **Sistema de Combos**
   - Contador de trucos consecutivos exitosos
   - Multiplicador de puntos
   - Indicador visual de combo

2. **Perfect Streak**
   - Racha de trucos perfectos
   - Indicador de fuego 🔥
   - Bonificación extra

3. **Feedback Háptico**
   - Vibración en saltos
   - Vibración en trucos
   - Vibración en colisiones

#### Prioridad Media

4. **Sistema de Precisión**
   - Medir precisión en aterrizajes
   - Bonus por aterrizajes en el centro
   - Penalización por aterrizajes en los bordes

5. **Animaciones Mejoradas**
   - Combo pop-up animado
   - Screen shake en trucos
   - Partículas en movimientos perfectos

#### Prioridad Baja

6. **Multiple Character Formations**
   - Diferentes personajes acrobáticos
   - Cada uno con habilidades únicas
   - Desbloqueables por puntos

---

## 💻 Código de Referencia del Tower

### Sistema de Combos

```javascript
// Del tower game (game.js)
let currentCombo = combo;
if (isPerfect) {
  currentCombo += 1;
  setPerfectStreak(prev => prev + 1);
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
} else if (precision > 0.75) {
  currentCombo += 1;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
} else {
  currentCombo = 0;
  setPerfectStreak(0);
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
}
```

### Wobble Animation

```javascript
// Efecto de tambaleo
useEffect(() => {
  if (wobbleIntensity > 0) {
    Animated.sequence([
      Animated.timing(wobbleAnim, { toValue: wobbleIntensity, duration: 100 }),
      Animated.timing(wobbleAnim, { toValue: -wobbleIntensity, duration: 200 }),
      Animated.timing(wobbleAnim, { toValue: wobbleIntensity * 0.5, duration: 150 }),
      Animated.timing(wobbleAnim, { toValue: 0, duration: 100 })
    ]).start(() => setWobbleIntensity(0));
  }
}, [wobbleIntensity]);
```

### Dificultad Progresiva

```javascript
// Aumentar dificultad según nivel
const level = Math.floor(score / 200);
let availableFormations = ACROBAT_FORMATIONS;

if (level < 2) {
  availableFormations = ACROBAT_FORMATIONS.filter(f => f.difficulty <= 2);
} else if (level < 5) {
  availableFormations = ACROBAT_FORMATIONS.filter(f => f.difficulty <= 3);
}

const speed = 2 + Math.min(level * 0.15, 2);
```

---

## 🛠️ Plan de Implementación

### Fase 1: Sistema de Combos (30 min)

```javascript
// Agregar al game.js
let combo = 0;
let perfectStreak = 0;

function completeTrick() {
  // ... código existente ...

  combo++;
  perfectStreak++;

  const comboMultiplier = 1 + (combo * 0.2);
  const points = Math.floor(50 * comboMultiplier);

  addScore(points);
  showComboIndicator(combo);
}

function resetCombo() {
  combo = 0;
  perfectStreak = 0;
}
```

### Fase 2: Visual del Combo (20 min)

```html
<!-- Agregar al index.html -->
<div id="combo-indicator" class="combo-hidden">
  <span id="combo-text">0x COMBO!</span>
</div>
```

```css
/* Agregar al styles.css */
#combo-indicator {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%) scale(0);
  background: rgba(46, 204, 113, 0.95);
  padding: 15px 30px;
  border-radius: 25px;
  transition: all 0.3s ease;
  z-index: 300;
}

#combo-indicator.show {
  transform: translateX(-50%) scale(1.2);
}
```

### Fase 3: Feedback Háptico Web (15 min)

```javascript
// Agregar al game.js
function vibrate(type) {
  if ('vibrate' in navigator) {
    switch(type) {
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(50);
        break;
      case 'heavy':
        navigator.vibrate([50, 30, 50]);
        break;
    }
  }
}

// Uso:
vibrate('medium'); // En trucos exitosos
vibrate('light');  // En saltos
vibrate('heavy');  // En caídas
```

### Fase 4: Perfect Streak Indicator (15 min)

```html
<!-- Agregar al index.html -->
<div id="streak-indicator" class="streak-hidden">
  🔥 <span id="streak-count">0</span>
</div>
```

---

## 📈 Impacto en la Experiencia de Juego

### Ventajas de Integrar Features del Tower

1. **Mayor Engagement**: Sistema de combos motiva a seguir jugando
2. **Feedback Inmediato**: Vibración y visual refuerzan acciones
3. **Progresión Clara**: Streak y combos muestran mejora del jugador
4. **Satisfacción**: Animaciones y efectos hacen el juego más "jugoso"
5. **Rejugabilidad**: Querer superar récords de combos

### Compatibilidad

| Feature | Web Desktop | Web Mobile | APK Android | APK iOS |
|---------|-------------|------------|-------------|---------|
| Combos | ✅ | ✅ | ✅ | ✅ |
| Streak | ✅ | ✅ | ✅ | ✅ |
| Vibración | ❌ | ✅ | ✅ | ✅ |
| Animaciones | ✅ | ✅ | ✅ | ✅ |
| Wobble | ✅ | ✅ | ✅ | ✅ |

---

## 🎯 Próximos Pasos

1. [ ] Implementar sistema de combos básico
2. [ ] Agregar indicador visual de combo
3. [ ] Implementar perfect streak
4. [ ] Agregar vibración (Web Vibration API)
5. [ ] Implementar wobble effect en personaje
6. [ ] Mejorar sistema de puntuación
7. [ ] Agregar animaciones de combo
8. [ ] Testing en móvil

---

## 📚 Referencias

- **Juego Tower Original**: `/tmp/acrobatic_game_temp/components/game.js`
- **React Native Reanimated**: https://docs.swmansion.com/react-native-reanimated/
- **Expo Haptics**: https://docs.expo.dev/versions/latest/sdk/haptics/
- **Web Vibration API**: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
- **Phaser Tweens**: https://photonstorm.github.io/phaser3-docs/Phaser.Tweens.html

---

**¿Quieres implementar alguna de estas características?** Puedo ayudarte a integrarlas paso a paso. 🚀

Las más fáciles de empezar son:
1. Sistema de combos (30 min)
2. Vibración básica (15 min)
3. Indicador de combo visual (20 min)
