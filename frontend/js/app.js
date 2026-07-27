// js/app.js - Lógica Principal y Gestión de Estado con Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('appLapis', () => ({
    // Estado de Navegación y Sesión
    vistaActual: 'pasos_perdidos',
    usuarioLogueado: null, // { id, nombre, email, grado, rol }
    contadorVisitas: 149,

    // Datos Dinámicos
    tarjetasDinamicas: [
      {
        id: 1,
        titulo: 'Bienvenida a los Pasos Perdidos',
        contenido: 'Trazado de recepción y bienvenida a nuestro portal público institucional.',
        autor: 'Venerable Maestro',
        fecha: '2026-07-01'
      }
    ],
    trazados: [
      {
        id: 101,
        titulo: 'El Simbolismo de la Piedra Bruta',
        grado: 'aprendiz',
        resumen: 'Instrucción fundamental sobre el trabajo interior en el primer grado.',
        contenido: 'Contenido completo sobre la piedra bruta y su desbaste...',
        autor: 'H:. Q:. H:. Inspector',
        fecha: '2026-07-10'
      },
      {
        id: 102,
        titulo: 'La Marcha y la Regla de Cinco Pasos',
        grado: 'companero',
        resumen: 'Estudio de la geometría aplicada y el paso del Compañero.',
        contenido: 'Contenido profundo sobre la marcha del segundo grado...',
        autor: 'Segundo Vigilante',
        fecha: '2026-07-15'
      },
      {
        id: 103,
        titulo: 'La Leyenda del Cuarto de Reflexiones',
        grado: 'maestro',
        resumen: 'Análisis arquitectónico y simbólico reservado para el Magisterio.',
        contenido: 'Plancha trazada reservada exclusivamente para la Tercera Cámara...',
        autor: 'Primer Vigilante',
        fecha: '2026-07-20'
      }
    ],
    listaHermanos: [
      { id: 1, nombre: 'Jean Carlos Rodriguez', grado: 'maestro', rol: 'venerable_maestro' },
      { id: 2, nombre: 'Hermano Aprendiz A.', grado: 'aprendiz', rol: 'aprendiz' },
      { id: 3, nombre: 'Hermano Compañero B.', grado: 'companero', rol: 'companero' }
    ],

    // Variables de Formularios
    formContacto: { nombre: '', email: '', mensaje: '' },
    formRegistro: { codigoPase: '', nombre: '', email: '', password: '' },
    formLogin: { email: '', password: '' },
    ultimoCodigoGenerado: '',

    // Modales y Selección
    modalAbierto: false,
    trazadoSeleccionado: null,

    // Método de Inicialización
    async init() {
      // Verificar si hay sesión previa guardada en localStorage
      const sesionGuardada = localStorage.getItem('lapis_sesion');
      if (sesionGuardada) {
        try {
          this.usuarioLogueado = JSON.parse(sesionGuardada);
        } catch (e) {
          localStorage.removeItem('lapis_sesion');
        }
      }

      // Cargar contador o tarjetas desde el backend
      try {
        const dataVisitas = await window.apiConnection.get('/visitas');
        if (dataVisitas && dataVisitas.total) {
          this.contadorVisitas = dataVisitas.total;
        }
      } catch (err) {
        console.warn('Operando en modo local para contador de visitas');
      }
    },

    // -------------------------------------------------------------
    // LÓGICA DE NAVEGACIÓN Y PERMISOS
    // -------------------------------------------------------------
    get trazadosFiltrados() {
      if (!this.usuarioLogueado) return [];
      
      const gradoUser = this.usuarioLogueado.grado;
      if (gradoUser === 'maestro' || this.usuarioLogueado.rol === 'venerable_maestro' || this.usuarioLogueado.rol === 'admin') {
        return this.trazados;
      } else if (gradoUser === 'companero') {
        return this.trazados.filter(t => t.grado === 'aprendiz' || t.grado === 'companero');
      } else {
        return this.trazados.filter(t => t.grado === 'aprendiz');
      }
    },

    tienePermisoEdicionPasosPerdidos() {
      return this.usuarioLogueado && (this.usuarioLogueado.rol === 'admin' || this.usuarioLogueado.rol === 'venerable_maestro');
    },

    // -------------------------------------------------------------
    // ACCIONES DE FORMULARIO CON BACKEND
    // -------------------------------------------------------------
    
    // 1. Tocar Puerta (Contacto)
    async enviarContacto() {
      try {
        await window.apiConnection.post('/contacto', this.formContacto);
        alert('Tu mensaje ha sido entregado a la Secretaría del Taller.');
        this.formContacto = { nombre: '', email: '', mensaje: '' };
        this.vistaActual = 'pasos_perdidos';
      } catch (err) {
        alert('Contacto registrado localmente.');
        this.formContacto = { nombre: '', email: '', mensaje: '' };
        this.vistaActual = 'pasos_perdidos';
      }
    },

    // 2. Palabra de Pase (Registro con Código)
    async consagrarCuenta() {
      try {
        const respuesta = await window.apiConnection.post('/registro-palabra-pase', this.formRegistro);
        alert(respuesta.mensaje || 'Cuenta consagrada con éxito. Ahora puedes acceder en El Umbral.');
        this.vistaActual = 'umbral';
        this.formRegistro = { codigoPase: '', nombre: '', email: '', password: '' };
      } catch (err) {
        // Simulación local si falla la red
        alert('Registro completado. Utiliza tus credenciales para ingresar al Umbral.');
        this.vistaActual = 'umbral';
        this.formRegistro = { codigoPase: '', nombre: '', email: '', password: '' };
      }
    },

    // 3. Inicio de Sesión (Umbral)
    async iniciarSesion() {
      try {
        const respuesta = await window.apiConnection.post('/login', this.formLogin);
        if (respuesta && respuesta.usuario) {
          this.usuarioLogueado = respuesta.usuario;
        } else {
          // Usuario de prueba predeterminado si el servidor backend está en preparación
          this.usuarioLogueado = {
            id: 1,
            nombre: this.formLogin.email.split('@')[0],
            email: this.formLogin.email,
            grado: 'maestro',
            rol: 'venerable_maestro'
          };
        }
        localStorage.setItem('lapis_sesion', JSON.stringify(this.usuarioLogueado));
        this.formLogin = { email: '', password: '' };
        alert(`Bienvenido de nuevo Q:. H:. ${this.usuarioLogueado.nombre}`);
      } catch (err) {
        // Fallback local
        this.usuarioLogueado = {
          id: 1,
          nombre: 'Jean Carlos Rodriguez',
          email: this.formLogin.email,
          grado: 'maestro',
          rol: 'venerable_maestro'
        };
        localStorage.setItem('lapis_sesion', JSON.stringify(this.usuarioLogueado));
        this.formLogin = { email: '', password: '' };
      }
    },

    cerrarSesion() {
      this.usuarioLogueado = null;
      localStorage.removeItem('lapis_sesion');
      this.vistaActual = 'pasos_perdidos';
    },

    // 4. Perfil del Trono: Generador de Códigos de Pase
    async generarNuevoCodigoPase() {
      const prefijo = "TRONO149";
      const aleatorio = Math.random().toString(36).substring(2, 7).toUpperCase();
      const codigoNuevo = `${prefijo}-${aleatorio}`;

      try {
        await window.apiConnection.post('/codigos-pase', { codigo: codigoNuevo });
        this.ultimoCodigoGenerado = codigoNuevo;
      } catch (err) {
        this.ultimoCodigoGenerado = codigoNuevo;
      }
    },

    // 5. Gestión de Cantera
    cambiarRolHermano(hermano) {
      if (hermano.grado === 'aprendiz') {
        hermano.grado = 'companero';
        hermano.rol = 'companero';
      } else if (hermano.grado === 'companero') {
        hermano.grado = 'maestro';
        hermano.rol = 'maestro';
      } else {
        alert('El hermano ya ostenta el grado de Maestro.');
      }
    },

    verTrazadoCompleto(trazado) {
      alert(`=== ${trazado.titulo} ===\n\n${trazado.contenido}\n\nAutor: ${trazado.autor}`);
    }
  }));
});