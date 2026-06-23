# EXAMEN PRÁCTICO – UNIDAD III

* Curso: Desarrollo de Aplicaciones Móviles
* Tema: Automatización de calidad con GitHub Actions
* Estudiante: Joan Cristian Medina Quispe
* Codigo: 2022074255

## 🎓 Red Colaborativa Estudiantil (RCE UPT)
> **"Democratizando el apoyo académico inmediato mediante el aprendizaje entre pares."**

RCE UPT es una plataforma integral de mentoría académica P2P diseñada específicamente para estudiantes de la **Universidad Privada de Tacna (UPT)**. Su objetivo principal es conectar a estudiantes que dominan materias específicas (Mentores) con aquellos que necesitan ayuda inmediata (Alumnos), creando una red de seguridad académica institucional que reduce la deserción escolar y fomenta el apoyo mutuo.

---

## 🚀 Características Principales

### 🔐 Autenticación y Verificación Institucional
* **Inicio de Sesión con Google & Firebase:** Restricción automática para correos bajo el dominio oficial `@virtual.upt.pe`.
* **Lista Blanca (Whitelist):** Permite el acceso controlado de cuentas externas (como invitados o administradores de desarrollo) con roles específicos (`EXTERNO`).
* **Verificación de Estudiantes (Scraper UPT):** El backend sincroniza datos oficiales extrayendo información de la web institucional de la UPT para validar el nombre, carrera y ciclo de cada alumno registrado.

### 📋 Feed Académico y Priorización Inteligente
* **Feed Dinámico:** Los estudiantes publican dudas con título, descripción detallada, materia (Subject) y capturas fotográficas.
* **Algoritmo de Priorización:** El feed ordena las dudas priorizando automáticamente aquellas que corresponden a la misma carrera y facultad del usuario que navega en la app.
* **Marcadores (Bookmarks) y Likes:** Guarda dudas importantes en favoritos y apoya publicaciones útiles.

### 🧠 Moderación Inteligente Anti-Monetización (Gemini AI)
* **Detección Automática con Gemini 1.5 Flash:** La red es 100% gratuita y colaborativa. El sistema analiza automáticamente el texto y las imágenes de publicaciones, comentarios y chats para identificar y bloquear intentos de cobro (monetización como Yape, Plin, tarifas, cuentas bancarias, etc.) o fraude académico pagado.
* **Seguridad de la Comunidad:** Bloquea en tiempo real mensajes fraudulentos antes de ser transmitidos en las salas de chat.

### 💬 Chat en Tiempo Real y Programación de Tutorías
* **WebSockets en Tiempo Real:** Chat privado instantáneo entre el mentor y el estudiante que inició la consulta.
* **Estados de Mensajes:** Soporta notificaciones de entrega (`delivered`), lectura (`read`), eliminación lógica de mensajes y almacenamiento histórico persistente.
* **Integración con Calendario & Videollamadas:** Los mentores pueden programar la fecha y hora de la mentoría. El backend genera de forma automática un evento con enlace de **Google Meet** (mediante la API de Google Calendar) o, en su defecto, una sala privada segura en **Jitsi Meet**.

### 🎮 Gamificación y Reputación (XP)
* **Sistema de Rangos de Experiencia (XP):**
  1. 🥉 **Novato** *(0 - 500 XP)*: Recién llegado.
  2. 🥈 **Tutor Junior** *(501 - 1,500 XP)*: Ayudante frecuente.
  3. 🥇 **Tutor Senior** *(1,501 - 4,000 XP)*: Mentor con experiencia reconocida.
  4. 💎 **Mentor Académico** *(+4,000 XP)*: Máximo rango. Permite solicitar el **Certificado Oficial de Tutoría** avalado por la universidad.
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

## 🛠️ Stack Tecnológico

La plataforma está construida utilizando un esquema desacoplado y reactivo:

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
  * **BeautifulSoup4 & httpx:** Scraper as�SM2_ExamenUnidad3_Medina/
├── README.md                           # Documento de descripción y guía del proyecto
├── DOCUMENTACION_PROYECTO.md           # Documentación maestra de reglas y roadmap
├── diagramas_secuencia.puml           # Diagramas de secuencia en PlantUML
├── backend/                            # Directorio del Backend (FastAPI)
│   ├── main.py                        # Archivo de inicio del servidor y WebSocket Endpoint
│   ├── database.py                    # Configuración de base de datos y sesión SQLAlchemy
│   ├── firebase_config.py             # Verificación de tokens de autenticación de Firebase
│   ├── ws_manager.py                  # Gestor de conexiones concurrentes por WebSocket
│   ├── config.py                      # Ajustes y carga de variables de entorno (.env)
│   ├── dependencies.py                # Dependencias inyectables (ej. control de administradores)
│   ├── models/                        # Modelos de base de datos PostgreSQL
│   │   ├── user.py                    # Modelo User (XP, reputación, rol, nivel)
│   │   ├── doubt.py                   # Modelo Doubt (estado, autor, me gusta)
│   │   ├── comment.py                 # Modelo Comment (comentarios en las dudas)
│   │   ├── chat.py                    # Modelo ChatRoom y ChatMessage
│   │   ├── rating.py                  # Calificaciones y estrellas de las mentorías
│   │   ├── university_student.py      # Registro de estudiantes scrapeados de la UPT
│   │   ├── career.py                  # Carreras universitarias y códigos de dependencia UPT
│   │   ├── laboratory.py              # Laboratorios del campus físico de la UPT
│   │   ├── whitelist.py               # Lista blanca para accesos externos
│   │   ├── bookmark.py                # Marcadores o dudas guardadas por el usuario
│   │   ├── notification.py            # Notificaciones del sistema
│   │   └── report.py                  # Reportes de contenido inapropiado
│   ├── routes/                        # Controladores y rutas HTTP (Endpoints)
│   │   ├── auth.py, doubts.py, users.py, comments.py, chat.py,
│   │   │   admin.py, verification.py, labs.py, bookmarks.py,
│   │   │   reports.py, notifications.py, upload.py
│   ├── schemas/                       # Validaciones de entrada/salida mediante Pydantic
│   └── services/                      # Lógica de negocio y APIs de terceros
│       ├── google_meet_service.py     # Creación de eventos y salas Meet en Google Calendar
│       ├── moderation_service.py      # Clasificación de contenido con Gemini API
│       ├── push_service.py            # Envío de notificaciones FCM push
│       └── upt_scraper.py             # Scraper institucional de estudiantes de la UPT
└── mobile/                             # Directorio de la App Móvil (Expo)
    ├── App.js                         # Inicializador de la App React Native
    ├── src/
    │   ├── navigation/                # Flujos de navegación (AppNavigator, MainTabs)
    │   ├── screens/                   # Vistas de la interfaz de usuario
    │   │   ├── LoginScreen.js, HomeScreen.js, FeedScreen.js, DoubtDetailScreen.js,
    │   │   │   PostScreen.js, ChatScreen.js, ChatListScreen.js, ProfileScreen.js,
    │   │   │   LeaderboardScreen.js, AdminDashboardScreen.js, LabsScreen.js, etc.
    │   ├── components/                # Componentes reusables (Splash, Loading, etc.)
    │   └── services/                  # Clientes API HTTP y WebSocket para el backend
```e la interfaz de usuario
        │   │   ├── LoginScreen.js, HomeScreen.js, FeedScreen.js, DoubtDetailScreen.js,
        │   │   │   PostScreen.js, ChatScreen.js, ChatListScreen.js, ProfileScreen.js,
        │   │   │   LeaderboardScreen.js, AdminDashboardScreen.js, LabsScreen.js, etc.
        │   ├── components/             # Componentes reusables (Splash, Loading, etc.)
        │   └── services/               # Clientes API HTTP y WebSocket para el backend
```

---

## 🗄️ Esquema de Base de Datos y Relaciones

El proyecto gestiona las siguientes entidades relacionadas:
* **`User` ↔ `Doubt`:** Un usuario puede publicar múltiples dudas (autoría).
* **`Doubt` ↔ `Comment`:** Cada duda puede tener múltiples comentarios o respuestas de otros alumnos.
* **`Doubt` ↔ `ChatRoom`:** Una duda activa puede tener múltiples chats privados abiertos por diferentes tutores interesados en colaborar.
* **`ChatRoom` ↔ `ChatMessage`:** Cada sala de chat contiene los mensajes en tiempo real enviados por el Mentor o el Alumno.
* **`ChatRoom` ↔ `Rating`:** Al finalizar y cerrar la sesión del chat, se genera una calificación de estrellas (`Rating`) que suma XP al Mentor.
* **`Career` ↔ `UniversityStudent`:** Clasificación jerárquica de estudiantes oficiales extraídos de la UPT por carrera.
* **`User` ↔ `Bookmark`:** Relación muchos a muchos para marcar dudas de interés.
* **`User` ↔ `Report`:** Los usuarios reportan publicaciones, comentarios o mensajes sospechosos para la moderación del Administrador.

---

## ⚙️ Configuración Rápida y Despliegue

### Requisitos Previos
* **Python 3.10+** instalado.
* **Node.js LTS** (para Expo CLI).
* **PostgreSQL** en funcionamiento (local o vía Docker).

### 🖥️ 1. Configuración del Backend

1. Ingresa a la carpeta del servidor:
   ```bash
   cd Red-Colaborativa-Estudiantil-main/backend
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

---

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

## 📄 Documentación Adicional
Para leer a detalle las reglas de negocio detalladas del sistema de XP, el roadmap completo y diagramas de arquitectura, consulta la [Documentación Maestra](file:///DOCUMENTACION_PROYECTO.md).

---
*© 2026 - Proyecto de Móviles II - Escuela de Ingeniería de Sistemas - UPT*
