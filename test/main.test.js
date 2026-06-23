// Funciones auxiliares del sistema para pruebas unitarias

/**
 * Determina el rango/nivel del usuario según sus puntos de experiencia (XP)
 * @param {number} xp - Puntos de experiencia
 * @returns {string} Rango obtenido
 */
function getStudentLevel(xp) {
  if (xp >= 4000) return 'Mentor Académico';
  if (xp >= 1501) return 'Tutor Senior';
  if (xp >= 501) return 'Tutor Junior';
  return 'Novato';
}

/**
 * Valida si un correo electrónico pertenece al dominio institucional @virtual.upt.pe
 * @param {string} email - Correo a validar
 * @returns {boolean} True si es institucional, de lo contrario False
 */
function validateEmailDomain(email) {
  if (!email) return false;
  return email.toLowerCase().endsWith('@virtual.upt.pe');
}

/**
 * Calcula la nueva reputación del mentor en base a una nueva calificación de estrellas.
 * @param {number} currentReputation - Reputación actual (de 0.0 a 5.0)
 * @param {number} totalHelps - Cantidad total de ayudas previas
 * @param {number} newStars - Estrellas de la calificación actual (1 a 5)
 * @returns {number} Nueva reputación redondeada a 2 decimales
 */
function calculateNewReputation(currentReputation, totalHelps, newStars) {
  if (totalHelps === 0) return parseFloat(newStars.toFixed(2));
  const newAvg = ((currentReputation * totalHelps) + newStars) / (totalHelps + 1);
  return parseFloat(newAvg.toFixed(2));
}

// -------------------------------------------------------------
// Pruebas Unitarias con Jest
// -------------------------------------------------------------

describe('RCE UPT - Pruebas Unitarias del Sistema', () => {
  
  // Prueba 1: Validación del Sistema de Progresión (XP y Niveles)
  describe('Prueba 1: Sistema de Rangos y XP (getStudentLevel)', () => {
    it('debe asignar el rango "Novato" para XP menor o igual a 500', () => {
      expect(getStudentLevel(0)).toBe('Novato');
      expect(getStudentLevel(350)).toBe('Novato');
      expect(getStudentLevel(500)).toBe('Novato');
    });

    it('debe asignar el rango "Tutor Junior" para XP entre 501 y 1500', () => {
      expect(getStudentLevel(501)).toBe('Tutor Junior');
      expect(getStudentLevel(1000)).toBe('Tutor Junior');
      expect(getStudentLevel(1500)).toBe('Tutor Junior');
    });

    it('debe asignar el rango "Tutor Senior" para XP entre 1501 y 4000', () => {
      expect(getStudentLevel(1501)).toBe('Tutor Senior');
      expect(getStudentLevel(3000)).toBe('Tutor Senior');
    });

    it('debe asignar el rango "Mentor Académico" para XP mayor o igual a 4000', () => {
      expect(getStudentLevel(4000)).toBe('Mentor Académico');
      expect(getStudentLevel(4500)).toBe('Mentor Académico');
    });
  });

  // Prueba 2: Validación de Correos Institucionales
  describe('Prueba 2: Filtro de Dominio Institucional (validateEmailDomain)', () => {
    it('debe retornar true para correos válidos @virtual.upt.pe', () => {
      expect(validateEmailDomain('juan.medina@virtual.upt.pe')).toBe(true);
      expect(validateEmailDomain('jmedina255@virtual.upt.pe')).toBe(true);
    });

    it('debe retornar false para correos no institucionales o públicos', () => {
      expect(validateEmailDomain('juan.medina@gmail.com')).toBe(false);
      expect(validateEmailDomain('alumno@upt.edu.pe')).toBe(false);
      expect(validateEmailDomain('')).toBe(false);
      expect(validateEmailDomain(null)).toBe(false);
    });
  });

  // Prueba 3: Cálculo Dinámico de Reputación
  describe('Prueba 3: Cálculo de Reputación del Mentor (calculateNewReputation)', () => {
    it('debe asignar la calificación directamente si es la primera ayuda', () => {
      expect(calculateNewReputation(0, 0, 5)).toBe(5);
      expect(calculateNewReputation(0, 0, 4)).toBe(4);
    });

    it('debe calcular el promedio correctamente para múltiples ayudas', () => {
      // Reputación actual 5.0 con 1 ayuda. Recibe 4 estrellas. Nuevo promedio: (5*1 + 4)/2 = 4.5
      expect(calculateNewReputation(5.0, 1, 4)).toBe(4.5);
      
      // Reputación actual 4.5 con 2 ayudas. Recibe 3 estrellas. Nuevo promedio: (4.5*2 + 3)/3 = 4.0
      expect(calculateNewReputation(4.5, 2, 3)).toBe(4.0);
    });
  });
});
