# INFORME DE EVALUACIÓN Y AUTOMATIZACIÓN – UNIDAD III

## 📝 Datos de Identificación
* **Curso:** Desarrollo de Aplicaciones Móviles
* **Fecha:** 23 de Junio de 2026
* **Estudiante:** Joan Cristian Medina Quispe
* **Código:** 2022074255
* **Repositorio de GitHub:** [SM2_ExamenUnidad3](https://github.com/JMedina255/SM2_ExamenUnidad3.git)

---

## 📸 Evidencias del Sistema (Capturas de Pantalla)

### A. Estructura de carpetas `.github/workflows/`
A continuación se adjunta la estructura de directorios del proyecto evidenciando los archivos de configuración de workflows de GitHub Actions para el backend, la aplicación móvil y el chequeo de calidad:

![Estructura de Carpetas](docs/screenshots/workflows_structure.png)

*(Nota: Si realiza la visualización en local o GitHub, guarde la captura de pantalla de su explorador de archivos con el nombre `workflows_structure.png` dentro de la carpeta `docs/screenshots/`)*

### B. Contenido del archivo `quality-check.yml`
Captura que muestra la configuración final del pipeline de control de calidad unitaria utilizando las últimas versiones de las acciones oficiales y Node.js 22:

![Contenido de quality-check.yml](docs/screenshots/quality_check_yml.png)

*(Nota: Guarde la captura del editor con el código de `quality-check.yml` con el nombre `quality_check_yml.png` dentro de la carpeta `docs/screenshots/`)*

### C. Ejecución del workflow en la pestaña Actions
Evidencia de la correcta ejecución del pipeline `Quality Check` en GitHub Actions, corriendo exitosamente las 8 pruebas unitarias sin advertencias (warnings) de deprecación:

![Ejecución exitosa del Workflow](docs/screenshots/workflow_execution.png)

*(Nota: Guarde la captura de pantalla de la pestaña Actions de GitHub con el nombre `workflow_execution.png` dentro de la carpeta `docs/screenshots/`)*

---

## 🛠️ Explicación de lo Realizado

### 1. Migración y Corrección de GitHub Actions (Advertencias de Deprecación)
Durante las pruebas de integración continua iniciales, GitHub Actions emitió una advertencia de deprecación crítica debido al uso de versiones obsoletas basadas en **Node.js 20** (el cual llegó al fin de su vida útil).
Para solucionar esto, se realizaron los siguientes cambios:

* **Actualización de Actions oficiales:**
  * **`actions/checkout`:** Actualizado de `@v4` a **`@v7`** en los tres workflows (`quality-check.yml`, `backend.yml`, y `mobile.yml`), implementando mejoras en la seguridad de clonación de repositorios.
  * **`actions/setup-node`:** Actualizado de `@v4` a **`@v6`** para garantizar compatibilidad con entornos basados en Node.js 24 y habilitar almacenamiento en caché robusto.
  * **`actions/setup-python`:** Actualizado de `@v5` a **`@v6`** en el archivo del backend para el análisis estático.
  * **`actions/setup-java`:** Actualizado de `@v4` a **`@v5`** para el proceso de compilación del APK de Android.
* **Actualización del Runtime de Node.js:** Se modificó la versión de ejecución de Node.js de `20` a **`22` (LTS)** dentro de los archivos `quality-check.yml` y `mobile.yml`. Esto no solo elimina la advertencia de obsolescencia, sino que ofrece una ejecución de pruebas unitarias más rápida y segura.

### 2. Estructura de Pruebas Unitarias (`test/main.test.js`)
El pipeline ejecuta Jest sobre el suite de pruebas en el archivo `test/main.test.js`, el cual valida tres pilares funcionales de la Red Colaborativa Estudiantil (RCE):

1. **`getStudentLevel(xp)` (Nivelación por XP):** Comprueba que a los usuarios se les asigne correctamente su rango correspondiente (*Novato, Tutor Junior, Tutor Senior, o Mentor Académico*) según la experiencia acumulada, verificando límites exactos y casos frontera.
2. **`validateEmailDomain(email)` (Filtro Institucional):** Bloquea el acceso a correos que no pertenezcan al dominio universitario oficial de la UPT (`@virtual.upt.pe`), validando también correos vacíos o nulos.
3. **`calculateNewReputation(currentReputation, totalHelps, newStars)` (Reputación Ponderada):** Realiza un cálculo ponderado de estrellas (1-5) cuando un alumno califica a su mentor al terminar una mentoría. Se comprueba tanto la primera ayuda (calificación directa) como el recálculo correcto con múltiples ayudas previas.

---

## 📖 Documentación Adicional
Toda la información del diseño del proyecto, temática de gamificación, hoja de ruta, diagramas de arquitectura y despliegue rápido se encuentran unificados y detallados en la [Documentación Maestra del Proyecto](file:///DOCUMENTACION_PROYECTO.md).
