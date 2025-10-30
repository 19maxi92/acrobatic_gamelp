# 👫 Diseño de Personajes y Sistema de Selección

## 🎯 Concepto General

**Protagonistas**: Dos acróbatas (chico y chica) que pueden hacer piruetas increíbles.
**Estilo**: Moderno, colorido, energético - inspirado en parkour y acrobacia urbana.

---

## 👦 PERSONAJE MASCULINO - "MAX"

### Perfil
- **Nombre**: Max
- **Edad**: 18-20 años
- **Estilo**: Parkour urbano
- **Personalidad**: Audaz, rápido, arriesgado
- **Color principal**: Azul eléctrico y negro

### Estadísticas Base
```javascript
{
  speed: 1.0,          // Velocidad normal
  jumpForce: 1.0,      // Salto normal
  trickBonus: 1.0,     // Bonus de trucos normal
  specialAbility: "Double Backflip" // Pirueta especial
}
```

### Animaciones Necesarias
1. **Idle**: Parado, respirando, listo para saltar
2. **Walk/Run**: Corriendo hacia adelante
3. **Jump**: Despegando del suelo
4. **Double Jump**: Segundo impulso en el aire
5. **Trick_Basic**: Voltereta simple (backflip)
6. **Trick_Advanced**: Doble mortal
7. **Trick_Special**: Tirabuzón con giro
8. **Land**: Aterrizando con flexión de rodillas
9. **Fall**: Cayendo descontrolado
10. **Celebrate**: Victoria/celebración

### Apariencia Visual
```
Cabeza: Gorra de béisbol hacia atrás
Torso: Hoodie deportiva (azul)
Piernas: Joggers negros
Zapatos: Zapatillas deportivas rojas
Accesorios: Muñequeras, mochila pequeña
```

---

## 👧 PERSONAJE FEMENINO - "LUNA"

### Perfil
- **Nombre**: Luna
- **Edad**: 18-20 años
- **Estilo**: Gimnasia artística + acrobacia
- **Personalidad**: Ágil, precisa, elegante
- **Color principal**: Rosa/violeta y blanco

### Estadísticas Base
```javascript
{
  speed: 1.1,          // 10% más rápida
  jumpForce: 0.95,     // 5% menos salto
  trickBonus: 1.2,     // 20% más puntos en trucos
  specialAbility: "Corkscrew Twist" // Pirueta especial
}
```

### Animaciones Necesarias
1. **Idle**: Postura de gimnasta, lista
2. **Walk/Run**: Corriendo con estilo gimnástico
3. **Jump**: Salto grácil
4. **Double Jump**: Impulso con splits
5. **Trick_Basic**: Mortal adelante
6. **Trick_Advanced**: Arabesque en el aire
7. **Trick_Special**: Corkscrew completo
8. **Land**: Aterrizaje de gimnasta perfecto
9. **Fall**: Caída
10. **Celebrate**: Poses de gimnasta

### Apariencia Visual
```
Cabeza: Coleta alta con scrunchie
Torso: Top deportivo (rosa/violeta)
Piernas: Leggings holográficos
Zapatos: Zapatillas ligeras blancas
Accesorios: Cintas en las muñecas
```

---

## 🎨 Sistema de Selección de Personaje

### Pantalla de Selección

```
┌────────────────────────────────────────┐
│         SELECCIONA TU ACRÓBATA         │
├────────────────────────────────────────┤
│                                        │
│   ┌──────────┐         ┌──────────┐   │
│   │          │         │          │   │
│   │   MAX    │         │   LUNA   │   │
│   │   🤸‍♂️    │         │   🤸‍♀️    │   │
│   │          │         │          │   │
│   └──────────┘         └──────────┘   │
│                                        │
│   ┌─────────────────────────────────┐ │
│   │  Velocidad:  ████░░░░░░         │ │
│   │  Salto:      █████░░░░░         │ │
│   │  Trucos:     █████░░░░░         │ │
│   └─────────────────────────────────┘ │
│                                        │
│         [  SELECCIONAR  ]              │
└────────────────────────────────────────┘
```

### Implementación HTML/CSS

```html
<div id="character-select-screen">
  <h1>Selecciona tu Acróbata</h1>

  <div class="character-options">
    <div class="character-card" data-character="max">
      <div class="character-preview">
        <img src="assets/max_preview.png" alt="Max">
      </div>
      <h2>MAX</h2>
      <p class="character-subtitle">Parkour Master</p>
      <div class="stats">
        <div class="stat">
          <span>Velocidad</span>
          <div class="stat-bar"><div style="width: 50%"></div></div>
        </div>
        <div class="stat">
          <span>Salto</span>
          <div class="stat-bar"><div style="width: 50%"></div></div>
        </div>
        <div class="stat">
          <span>Trucos</span>
          <div class="stat-bar"><div style="width: 50%"></div></div>
        </div>
      </div>
      <button class="select-btn">SELECCIONAR</button>
    </div>

    <div class="character-card" data-character="luna">
      <!-- Similar structure -->
    </div>
  </div>
</div>
```

---

## 🤝 SISTEMA DE COMPAÑEROS (Futuro)

### Compañero 1: "KAI" - El Apoyo
```
Tipo: Spotter (apoyo)
Habilidad: Te salva de una caída
Desbloqueo: Altura 50m
Visual: Chico con ropa deportiva verde
```

### Compañero 2: "MIRA" - La Malabarista
```
Tipo: Juggler
Habilidad: Genera monedas extra
Desbloqueo: Altura 100m
Visual: Chica con outfit colorido
```

### Compañero 3: "ZEN" - El Mentor
```
Tipo: Maestro
Habilidad: Aumenta duración de poderes buenos
Desbloqueo: Altura 200m
Visual: Persona mayor con ropa de maestro
```

---

## 🎪 FORMACIONES ACROBÁTICAS

### Formación: DÚO VOLTERETA
```
Personaje principal + 1 compañero
Sprite: 🤸🤸
Animación: Ambos hacen backflip sincronizado
Bonus: ×2.0 puntos
Input: Botón especial en el aire
```

### Formación: PIRÁMIDE HUMANA
```
Personaje + 2 compañeros
Sprite:
     🤸
    🤸🤸
Animación: Forman pirámide y saltan
Bonus: ×3.0 puntos + 2s invulnerable
Input: Mantener botón especial
```

### Formación: TORRE ACROBÁTICA
```
Personaje + 3 compañeros
Sprite:
      🤸
      🤸
      🤸
      🤸
Animación: Torre humana vertical
Bonus: ×5.0 puntos + mega salto
Input: Perfect timing al aterrizar
```

---

## 💫 PIRUETAS Y TRUCOS

### Nivel 1: Básico
- **Backflip**: Mortal hacia atrás simple
- **Frontflip**: Mortal hacia adelante
- **Barrel Roll**: Giro de barril

### Nivel 2: Intermedio
- **Double Backflip**: Doble mortal
- **Twist**: Giro con rotación
- **Pike**: Pirueta en posición de carpa

### Nivel 3: Avanzado
- **Triple Backflip**: Triple mortal
- **Corkscrew**: Tirabuzón completo
- **Layout**: Mortal extendido

### Nivel 4: Profesional
- **Quadruple Flip**: Cuádruple mortal
- **Double Corkscrew**: Doble tirabuzón
- **Full Twist Layout**: Combinación compleja

### Nivel 5: Legendario (Con compañeros)
- **Synchronized Duo**: Dúo sincronizado
- **Human Pyramid**: Pirámide humana
- **Tower Stack**: Torre acrobática

---

## 🎮 SISTEMA DE PROGRESIÓN

### Niveles de Personaje
```javascript
const characterLevels = {
  1: { xp: 0, unlock: "Trick básico" },
  5: { xp: 1000, unlock: "Trick intermedio" },
  10: { xp: 5000, unlock: "Compañero 1" },
  15: { xp: 10000, unlock: "Trick avanzado" },
  20: { xp: 20000, unlock: "Compañero 2" },
  25: { xp: 35000, unlock: "Trick profesional" },
  30: { xp: 50000, unlock: "Compañero 3" },
  35: { xp: 75000, unlock: "Trick legendario" },
  40: { xp: 100000, unlock: "Formación Torre" }
}
```

### Experiencia
- Por altura: 10 XP por metro
- Por truco: 50 XP por truco básico, +50 por nivel
- Por combo: XP × combo multiplicador
- Por formación: 500 XP

---

## 🎨 REFERENCIAS VISUALES

### Estilo Recomendado: Cartoon 2D

**Inspiración**:
- Subway Surfers (estilo urbano colorido)
- Alto's Adventure (minimalista pero expresivo)
- Crossy Road (simple pero carismático)

### Paleta de Colores

**Max (Azul)**:
- Primario: #00A8FF (azul eléctrico)
- Secundario: #1C1C1C (negro)
- Acento: #FF4757 (rojo)

**Luna (Rosa/Violeta)**:
- Primario: #FF6B9D (rosa vibrante)
- Secundario: #C44569 (violeta)
- Acento: #FFF (blanco)

**UI General**:
- Background: #87CEEB (cielo)
- Plataformas: #8B4513 (marrón)
- Poderes buenos: #2ECC71 (verde)
- Poderes malos: #E74C3C (rojo)

---

## 📐 Especificaciones Técnicas

### Tamaño de Sprites
- Personaje: 64x64 pixels (o 128x128 para HD)
- Compañeros: 48x48 pixels
- Poderes: 32x32 pixels
- UI Icons: 24x24 pixels

### Formato
- PNG con transparencia
- Sprite sheets para animaciones
- Máximo 2048x2048 por sheet

### Frames de Animación
- Idle: 4-6 frames
- Walk: 6-8 frames
- Jump: 3-4 frames
- Trick: 8-12 frames (según complejidad)
- Land: 3-4 frames

---

## 🛠️ Implementación en Phaser

```javascript
// Cargar sprites
function preload() {
  // Max
  this.load.spritesheet('max_idle', 'assets/max/idle.png', {
    frameWidth: 64,
    frameHeight: 64
  });
  this.load.spritesheet('max_jump', 'assets/max/jump.png', {
    frameWidth: 64,
    frameHeight: 64
  });
  // ... más animaciones

  // Luna
  this.load.spritesheet('luna_idle', 'assets/luna/idle.png', {
    frameWidth: 64,
    frameHeight: 64
  });
  // ... más animaciones
}

// Crear animaciones
function create() {
  // Animación de Max idle
  this.anims.create({
    key: 'max_idle_anim',
    frames: this.anims.generateFrameNumbers('max_idle', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  // Crear jugador con sprite
  player = this.physics.add.sprite(100, 100, 'max_idle');
  player.play('max_idle_anim');
}
```

---

## 🎯 Próximos Pasos

1. **Buscar/Crear assets**:
   - OpenGameArt.org
   - Itch.io asset packs
   - Kenney.nl
   - Crear propios en Piskel

2. **Implementar selección de personaje**:
   - Pantalla de selección
   - Guardar elección en localStorage
   - Cargar sprites correctos

3. **Agregar animaciones**:
   - Implementar sprite sheets
   - Crear animaciones en Phaser
   - Vincular con acciones del juego

4. **Testing**:
   - Verificar que animaciones se ven bien
   - Ajustar timing
   - Optimizar rendimiento

---

**¿Quieres que busque assets gratis para empezar, o prefieres que te ayude a crear sprites simples?**
