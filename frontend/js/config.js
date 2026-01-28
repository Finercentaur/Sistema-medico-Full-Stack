/* ===================================
   CONFIGURACIÓN GLOBAL DEL PROYECTO
   =================================== */

const CONFIG = {
  // Información de la aplicación
  APP: {
    NAME: 'Sistema Médico Salud Digna',
    VERSION: '1.0.0',
    ENVIRONMENT: 'development', // 'development' | 'production'
    AUTHOR: 'Joshua Olvera Cruz',
  },

  // URLs de la API (para cuando tengamos backend)
  API: {
    BASE_URL: 'http://localhost:3000',
    ENDPOINTS: {
      AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        FORGOT_PASSWORD: '/api/auth/forgot-password',
        RESET_PASSWORD: '/api/auth/reset-password',
      },
      USERS: {
        PROFILE: '/api/users/profile',
        UPDATE: '/api/users/update',
      },
      RESULTS: {
        GET_BY_TICKET: '/api/results/ticket',
        GET_ALL: '/api/results',
        DOWNLOAD: '/api/results/download',
      },
      APPOINTMENTS: {
        CREATE: '/api/appointments',
        GET_ALL: '/api/appointments',
        UPDATE: '/api/appointments/update',
        CANCEL: '/api/appointments/cancel',
      },
    },
  },

  // Configuración de UI
  UI: {
    // Duración de animaciones (ms)
    ANIMATION_DURATION: 300,

    // Duración de notificaciones/toasts (ms)
    TOAST_DURATION: 3000,

    // Duración de modales (ms)
    MODAL_ANIMATION: 250,

    // Debounce para búsquedas (ms)
    SEARCH_DEBOUNCE: 500,

    // Items por página en paginación
    ITEMS_PER_PAGE: 12,

    // Máximo de caracteres en inputs
    MAX_INPUT_LENGTH: {
      NAME: 100,
      EMAIL: 255,
      PASSWORD: 128,
      PHONE: 15,
      ADDRESS: 500,
      MESSAGE: 1000,
    },
  },

  // Validaciones
  VALIDATION: {
    // Regex para email
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Regex para teléfono (México)
    PHONE_REGEX: /^(\+52)?[1-9]\d{9}$/,

    // Longitud mínima de password
    PASSWORD_MIN_LENGTH: 8,

    // Password debe contener
    PASSWORD_REQUIREMENTS: {
      UPPERCASE: true,
      LOWERCASE: true,
      NUMBER: true,
      SPECIAL_CHAR: false, // Opcional por ahora
    },
  },

  // Archivos
  FILES: {
    // Tamaño máximo de archivos (bytes)
    MAX_SIZE: 5 * 1024 * 1024, // 5MB

    // Tipos de archivo permitidos
    ALLOWED_TYPES: {
      IMAGES: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      DOCUMENTS: ['application/pdf'],
    },
  },

  // Mensajes de la aplicación
  MESSAGES: {
    SUCCESS: {
      LOGIN: 'Sesión iniciada correctamente',
      REGISTER: 'Registro exitoso. Por favor, inicia sesión.',
      LOGOUT: 'Sesión cerrada correctamente',
      UPDATE: 'Información actualizada correctamente',
      APPOINTMENT_CREATED: 'Cita agendada exitosamente',
      APPOINTMENT_CANCELLED: 'Cita cancelada correctamente',
    },
    ERROR: {
      GENERIC: 'Ocurrió un error. Por favor, intenta de nuevo.',
      LOGIN: 'Credenciales incorrectas',
      REGISTER: 'Error al registrar. Verifica tus datos.',
      NETWORK: 'Error de conexión. Verifica tu internet.',
      REQUIRED_FIELDS: 'Por favor, completa todos los campos requeridos',
      INVALID_EMAIL: 'Email inválido',
      INVALID_PHONE: 'Teléfono inválido',
      PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres',
      PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
      FILE_TOO_LARGE: 'El archivo es demasiado grande (máx. 5MB)',
      FILE_TYPE_NOT_ALLOWED: 'Tipo de archivo no permitido',
    },
    WARNING: {
      UNSAVED_CHANGES: '¿Seguro que quieres salir? Tienes cambios sin guardar.',
      CANCEL_APPOINTMENT: '¿Estás seguro de cancelar esta cita?',
    },
    INFO: {
      LOADING: 'Cargando...',
      NO_RESULTS: 'No se encontraron resultados',
      NO_APPOINTMENTS: 'No tienes citas agendadas',
    },
  },

  // Servicios médicos disponibles
  SERVICES: [
    {
      id: 'laboratorio',
      name: 'Laboratorio Clínico',
      icon: 'fa-flask',
      color: '#00a651',
    },
    {
      id: 'imagenologia',
      name: 'Imagenología',
      icon: 'fa-x-ray',
      color: '#0066b2',
    },
    {
      id: 'ultrasonido',
      name: 'Ultrasonido',
      icon: 'fa-heartbeat',
      color: '#ff6b35',
    },
    {
      id: 'mastografia',
      name: 'Mastografía',
      icon: 'fa-user-md',
      color: '#9b59b6',
    },
    {
      id: 'rayos-x',
      name: 'Rayos X',
      icon: 'fa-radiation',
      color: '#e74c3c',
    },
    {
      id: 'consultas',
      name: 'Consultas Médicas',
      icon: 'fa-stethoscope',
      color: '#3498db',
    },
  ],

  // Tipos de estudios
  STUDY_TYPES: {
    LABORATORIO: 'Laboratorio',
    RAYOS_X: 'Rayos X',
    ULTRASONIDO: 'Ultrasonido',
    MASTOGRAFIA: 'Mastografía',
    TOMOGRAFIA: 'Tomografía',
    OTROS: 'Otros',
  },

  // Estados de citas
  APPOINTMENT_STATUS: {
    PENDING: 'Pendiente',
    CONFIRMED: 'Confirmada',
    COMPLETED: 'Completada',
    CANCELLED: 'Cancelada',
  },

  // LocalStorage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'salud_digna_auth_token',
    USER_DATA: 'salud_digna_user_data',
    THEME: 'salud_digna_theme',
    LANGUAGE: 'salud_digna_language',
  },

  // Configuración de desarrollo
  DEV: {
    ENABLE_LOGS: true,
    ENABLE_DEBUG: true,
    MOCK_API: false, // Simular respuestas de API cuando no hay backend
  },
};

// Funciones de utilidad para configuración

/**
 * Obtener URL completa de un endpoint
 * @param {string} category - Categoría del endpoint (AUTH, USERS, etc.)
 * @param {string} endpoint - Nombre del endpoint
 * @returns {string} URL completa
 */
CONFIG.getApiUrl = function (category, endpoint) {
  const endpointPath = this.API.ENDPOINTS[category]?.[endpoint];
  if (!endpointPath) {
    console.error(`Endpoint no encontrado: ${category}.${endpoint}`);
    return this.API.BASE_URL;
  }
  return `${this.API.BASE_URL}${endpointPath}`;
};

/**
 * Log de desarrollo (solo en modo desarrollo)
 * @param {string} message - Mensaje a mostrar
 * @param {*} data - Datos adicionales
 */
CONFIG.log = function (message, data = null) {
  if (this.DEV.ENABLE_LOGS && this.APP.ENVIRONMENT === 'development') {
    console.log(`[${this.APP.NAME}]`, message, data || '');
  }
};

/**
 * Log de error
 * @param {string} message - Mensaje de error
 * @param {Error} error - Objeto de error
 */
CONFIG.error = function (message, error = null) {
  console.error(`[${this.APP.NAME} ERROR]`, message, error || '');
};

/**
 * Verificar si estamos en producción
 * @returns {boolean}
 */
CONFIG.isProduction = function () {
  return this.APP.ENVIRONMENT === 'production';
};

/**
 * Verificar si estamos en desarrollo
 * @returns {boolean}
 */
CONFIG.isDevelopment = function () {
  return this.APP.ENVIRONMENT === 'development';
};

// Congelar objeto para evitar modificaciones accidentales
Object.freeze(CONFIG);

// Log inicial
CONFIG.log('Configuración cargada', {
  version: CONFIG.APP.VERSION,
  environment: CONFIG.APP.ENVIRONMENT,
});

// Exportar (comentado por ahora, cuando uses modules lo descomentarás)
// export default CONFIG;
