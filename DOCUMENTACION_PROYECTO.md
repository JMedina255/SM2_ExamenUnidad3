# Documentación Maestra: Red Colaborativa Estudiantil (RCE UPT)
**Proyecto:** ProyectoMovilesII (Mobile App & FastAPI Backend)

Este documento sirve como la **"Fuente de Verdad"** para el desarrollo del proyecto. Define la visión, las reglas, la arquitectura y el camino a seguir para construir una plataforma académica colaborativa, escalable y de alto impacto.

---

## 1. Visión y Propósito
**Propósito:** Democratizar el éxito académico mediante una **Red de Seguridad Académica P2P**.

La plataforma no es solo un foro; es un ecosistema diseñado para reducir la deserción estudiantil. Al conectar a estudiantes que dominan un tema (Mentores) con otros que necesitan ayuda inmediata (Alumnos), eliminamos la frustración y fomentamos la colaboración dentro de la **Universidad Privada de Tacna (UPT)**.

---

## 2. Actores del Sistema

| Actor | Responsabilidad | Objetivo Principal |
| :--- | :--- | :--- |
| **Estudiante** | Solicitante y Tutor | Resolver sus dudas o ayudar a otros para ganar prestigio (XP) y reputación. |
| **Docente** | Observador de Analítica | Identificar temas críticos de error en sus cursos mediante dashboards de IA. |
| **Administrador** | Gestor de Red | Emitir certificados oficiales, moderar reportes y validar accesos institucionales. |

---

## 3. La Temática: Gamificación y Progresión (XP)

Para incentivar la ayuda orgánica, implementamos un sistema de **Puntos de Experiencia (XP)** y **Rangos**.

### Sistema de Puntos
* **Responder una duda:** +50 XP (si es marcada como útil).
* **Calificación perfecta:** +20 XP extra.
* **Uso diario:** +5 XP (recompensa por constancia).

### Niveles y Prestigio
1. 🥉 **Novato** (0 - 500 XP): Recién llegado a la red.
2. 🥈 **Tutor Junior** (501 - 1,500 XP): Ayudante frecuente.
3. 🥇 **Tutor Senior** (1,501 - 4,000 XP): Experto reconocido por sus pares.
4. 💎 **Mentor Académico** (+4,000 XP): Estatus máximo. Desbloquea la solicitud de **Certificado de Tutoría Académica** avalado por la facultad.

---

## 4. Estrategia Anti-Monetización (Moderación Silenciosa)
Para evitar que la app se use para cobrar dinero real por tareas o exámenes:
* **Filtro NLP (Python & Gemini AI):** Análisis y bloqueo automático de mensajes y publicaciones con palabras clave de transacción (Yape, Plin, precio, cobro, etc.).
* **Detección de QRs:** El backend procesa imágenes para identificar si corresponden a códigos QR de cobro.
* **Shadowbanning:** Los usuarios infractores se vuelven invisibles para el resto de la red sin ser notificados explícitamente, reduciendo su impacto negativo y evitando la creación evasiva de cuentas.

---

## 5. Características Principales

### 🔐 Autenticación y Verificación Institucional
* **Inicio de Sesión con Google & Firebase:** Restricción automática para correos bajo el dominio oficial `@virtual.upt.pe`.
* **Lista Blanca (Whitelist):** Permite el acceso controlado de cuentas externas (como invitados o administradores de desarrollo) con roles específicos (`EXTERNO`).
* **Verificación de Estudiantes (Scraper UPT):** El backend sincroniza datos oficiales extrayendo información de la web institucional de la UPT para validar el nombre, carrera y ciclo de cada alumno registrado.

### 📋 Feed Académico y Priorización Inteligente
* **Feed Dinámico:** Los estudiantes publican dudas con título, descripción detallada, materia (Subject) y capturas fotográficas.
* **Algoritmo de Priorización:** El feed ordena las dudas priorizando automáticamente aquellas que corresponden a la misma carrera y facultad del usuario que navega en la app.
* **Marcadores (Bookmarks) y Likes:** Guarda dudas importantes en favoritos y apoya publicaciones útiles.

### 💬 Chat en Tiempo Real y Programación de Tutorías
* **WebSockets en Tiempo Real:** Chat privado instantáneo entre el mentor y el estudiante que inició la consulta.
* **Estados de Mensajes:** Soporta notificaciones de entrega (`delivered`), lectura (`read`), eliminación lógica de mensajes y almacenamiento histórico persistente.
* **Integración con Calendario & Videollamadas:** Los mentores pueden programar la fecha y hora de la mentoría. El backend genera de forma automática un evento con enlace de **Google Meet** (mediante la API de Google Calendar) o, en su defecto, una sala privada segura en **Jitsi Meet**.

### 🎮 Gamificación y Reputación (XP)
* **Cálculo Dinámico de Reputación:** Calificaciones en base a estrellas (1-5) otorgadas por el estudiante una vez resuelta la duda, modificando dinámicamente la reputación del mentor.
* **Leaderboard (Tabla de Líderes):** Clasificación pública de los mentores más activos de la UPT ordenada por XP.

### 🏫 Control de Laboratorios y Administración
* **Visualización de Laboratorios:** Módulo para comprobar la disponibilidad y capacidad de los laboratorios físicos de computación y estudio del campus en tiempo real.
* **Panel de Administración (Admin Dashboard):**
  * Estadísticas de uso (tasa de resolución de dudas, usuarios activos, etc.).
  * Gestión de roles y estados de actividad de usuarios (Baneos/Activaciones).
  * Envío de comunicados y anuncios globales en la red.
  * Moderación de reportes de contenido ofensivo o inapropiado.

---

## 6. Stack Tecnológico

### Frontend (Mobile App)
* **Framework:** [React Native (Expo SDK 54)](https://expo.dev/)
* **Navegación:** React Navigation v7 (Stack & Bottom Tabs)
* **Estilo & Animaciones:** React Native Reanimated v4 y Expo Linear Gradient para un acabado UI moderno y premium.
* **Autenticación & Notificaciones:** SDK de Firebase Web y Expo Notifications para alertas en segundo plano (FCM).

### Backend (API Service)
* **Core:** [FastAPI (Python 3.10+)](https://fastapi.tiangolo.com/)
* **ORM & Base de Datos:** [SQLAlchemy](https://www.sqlalchemy.org/) + [PostgreSQL](https://www.postgresql.org/)
* **Mensajería Síncrona:** Python WebSockets
* **Servicios Externos:**
  * **Firebase Admin SDK:** Manejo de credenciales de Firebase, almacenamiento de imágenes y envío de notificaciones Push.
  * **Google API Client:** Integración automatizada para programar eventos en Google Calendar y generar salas de Google Meet.
  * **Gemini 1.5 Flash API:** Filtro inteligente NLP y procesamiento visual de imágenes para detectar transacciones monetarias.
  * **BeautifulSoup4 & httpx:** Scraper institucional de alumnos de la UPT.

---

## 7. Estructura del Proyecto

```
SM2_ExamenUnidad3_Medina/
├── .github/
│   └── workflows/
│       ├── backend.yml                 # Workflow de validación y CI/CD del Backend
│       ├── mobile.yml                  # Workflow de validación y compilación (APK) de la App Móvil
│       └── quality-check.yml           # Workflow de pruebas unitarias con Jest
├── backend/                            # Directorio del Backend (FastAPI)
│   ├── main.py                         # Archivo de inicio del servidor y WebSocket Endpoint
│   ├── database.py                     # Configuración de base de datos y sesión SQLAlchemy
│   ├── firebase_config.py              # Verificación de tokens de autenticación de Firebase
│   ├── ws_manager.py                   # Gestor de conexiones concurrentes por WebSocket
│   ├── config.py                       # Ajustes y carga de variables de entorno (.env)
│   ├── dependencies.py                 # Dependencias inyectables (ej. control de administradores)
│   ├── models/                         # Modelos de base de datos PostgreSQL
│   │   ├── user.py                     # Modelo User (XP, reputación, rol, nivel)
│   │   ├── doubt.py                    # Modelo Doubt (estado, autor, me gusta)
│   │   ├── comment.py                  # Modelo Comment (comentarios en las dudas)
│   │   ├── chat.py                     # Modelo ChatRoom y ChatMessage
│   │   ├── rating.py                   # Calificaciones y estrellas de las mentorías
│   │   ├── university_student.py       # Registro de estudiantes scrapeados de la UPT
│   │   ├── career.py                   # Carreras universitarias y códigos de dependencia UPT
│   │   ├── laboratory.py               # Laboratorios del campus físico de la UPT
│   │   ├── whitelist.py                # Lista blanca para accesos externos
│   │   ├── bookmark.py                 # Marcadores o dudas guardadas por el usuario
│   │   ├── notification.py             # Notificaciones del sistema
│   │   └── report.py                   # Reportes de contenido inapropiado
│   ├── routes/                         # Controladores y rutas HTTP (Endpoints)
│   ├── schemas/                        # Validaciones de entrada/salida mediante Pydantic
│   └── services/                       # Lógica de negocio y APIs de terceros
│       ├── google_meet_service.py      # Creación de eventos y salas Meet en Google Calendar
│       ├── moderation_service.py       # Clasificación de contenido con Gemini API
│       ├── push_service.py             # Envío de notificaciones FCM push
│       └── upt_scraper.py              # Scraper institucional de estudiantes de la UPT
├── mobile/                             # Directorio de la App Móvil (Expo)
│   ├── App.js                          # Inicializador de la App React Native
│   ├── src/
│   │   ├── navigation/                 # Flujos de navegación (AppNavigator, MainTabs)
│   │   ├── screens/                    # Vistas de la interfaz de usuario (Login, Home, Feed, etc.)
│   │   ├── components/                 # Componentes reusables (Splash, Loading, etc.)
│   │   └── services/                   # Clientes API HTTP y WebSocket para el backend
├── test/                               # Directorio de pruebas unitarias
│   └── main.test.js                    # Pruebas unitarias de Jest (XP, correo institucional, reputación)
├── DOCUMENTACION_PROYECTO.md           # Documentación maestra (este archivo)
├── README.md                           # Informe de evaluación y pruebas unitarias
├── jest.config.json                    # Configuración de Jest
├── diagramas_secuencia.puml            # Diagramas de secuencia en PlantUML
└── .gitignore                          # Exclusiones de Git
```

---

## 8. Esquema de Base de Datos y Relaciones

El proyecto gestiona las siguientes entidades relacionadas en PostgreSQL:
* **`User` ↔ `Doubt`:** Un usuario puede publicar múltiples dudas (autoría).
* **`Doubt` ↔ `Comment`:** Cada duda puede tener múltiples comentarios o respuestas de otros alumnos.
* **`Doubt` ↔ `ChatRoom`:** Una duda activa puede tener múltiples chats privados abiertos por diferentes tutores interesados en colaborar.
* **`ChatRoom` ↔ `ChatMessage`:** Cada sala de chat contiene los mensajes en tiempo real enviados por el Mentor o el Alumno.
* **`ChatRoom` ↔ `Rating`:** Al finalizar y cerrar la sesión del chat, se genera una calificación de estrellas (`Rating`) que suma XP al Mentor.
* **`Career` ↔ `UniversityStudent`:** Clasificación jerárquica de estudiantes oficiales extraídos de la UPT por carrera.
* **`User` ↔ `Bookmark`:** Relación muchos a muchos para marcar dudas de interés.
* **`User` ↔ `Report`:** Los usuarios reportan publicaciones, comentarios o mensajes sospechosos para la moderación del Administrador.

---

## 9. Configuración Rápida y Despliegue

### Requisitos Previos
* **Python 3.10+** instalado.
* **Node.js LTS** (para Expo CLI).
* **PostgreSQL** en funcionamiento (local o vía Docker).

### 🖥️ 1. Configuración del Backend
1. Ingresa a la carpeta del servidor:
   ```bash
   cd backend
   ```
2. Crea un entorno virtual e instala las dependencias:
   ```bash
   python -m venv venv
   # En Windows:
   .\venv\Scripts\activate
   # En macOS/Linux:
   source venv/bin/activate

   pip install -r requirements.txt
   ```
3. Configura el archivo de entorno `.env` en la raíz de la carpeta `backend/` basándote en la siguiente plantilla:
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/mentoria_academica
   FIREBASE_CREDENTIALS_PATH=./firebase-service-account.json
   ALLOWED_DOMAIN=virtual.upt.pe
   HOST=0.0.0.0
   PORT=8000
   ROOT_PATH=
   GOOGLE_SERVICE_ACCOUNT_JSON=./google-service-account.json
   GOOGLE_CALENDAR_ID=primary
   GEMINI_API_KEY=tu_gemini_api_key_aqui
   FIREBASE_STORAGE_BUCKET=tu_storage_bucket_firebase.appspot.com
   ```
4. Ejecuta el servidor de desarrollo:
   ```bash
   python main.py
   # O a través de uvicorn directamente
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
5. **Despliegue con Docker Compose (Opcional):**
   Si deseas utilizar Docker para levantar la base de datos PostgreSQL y la API en contenedores aislados:
   ```bash
   docker-compose up --build
   ```

### 📱 2. Configuración de la App Móvil (Expo)
1. Ingresa a la carpeta del frontend:
   ```bash
   cd mobile
   ```
2. Instala los módulos de Node:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```
4. Utiliza la aplicación Expo Go en tu teléfono inteligente (escaneando el código QR generado) o inicia un simulador de Android/iOS presionando `a` o `i` en la consola.

---

## 10. Hoja de Ruta (Phased Roadmap)

### 🚀 Fase 1: El MVP Funcional (Foco Actual)
* **Backend:** Actualizar modelos SQL para incluir XP, Materias y Dudas.
* **Mobile:**
  * Login institucional con Google/Firebase.
  * Edición de Perfil (Visualización de Nivel y XP).
  * Home Feed (Lista de dudas activas filtrables por materia).
  * Publicación de dudas con foto.

### 🎮 Fase 2: Interacción y Chat Avanzado
* Implementar Chat en tiempo real vía Firebase Firestore o WebSockets directos.
* Lógica de asignación de puntos (XP) al marcar duda como resuelta.
* **Videollamadas y Calendario:** Integración con Google Calendar API para agendar mentorías sincrónicas generando un enlace de Google Meet de manera automática.

### 🎓 Fase 3: Ecosistema Universitario
* Eventos de "Semana de Parciales" (XP x3).
* Notificaciones Push inteligentes por curso.
* Módulo de Certificados automáticos para Mentores.

### 🧠 Fase 4: IA y Analítica (Portal Docente)
* Procesamiento de chats con IA (Gemini/OpenAI) para detectar errores comunes en los temas de estudio.
* Dashboards analíticos en React Web para profesores y directivos.

---

## 11. Estándares de Programación (Clean Code)
* **Backend (Python/FastAPI):** `snake_case` para variables/funciones. Tipado estricto obligatorio. Capas de Rutas $\rightarrow$ Servicios $\rightarrow$ Modelos.
* **Mobile (React Native):** `camelCase` para variables, `PascalCase` para componentes. Lógica en Hooks, UI en componentes limpios.
* **Documentación:** El código debe ser autodescriptivo. No usar comentarios redundantes.
