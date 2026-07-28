// js/app.js - Lógica Principal y Gestión de Estado con Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('appLapis', () => ({
    // Estado de Navegación y Sesión
    vistaActual: 'pasos_perdidos',
    seccionUmbral: 'trazados',
    categoriaPasosPerdidos: 'todos', // Filtro dinámico de tarjetas: 'todos', 'principios', 'docencia', 'accion', 'biblioteca'
    modoRecuperar: false, // Aseguramos que inicie en false
    usuarioLogueado: null,
    contadorVisitas: 149,

    // Catálogo de los 33 Grados del R.E.A.A.
    gradosREAA: [
      { id: 1, nombre: '1º - Aprendiz' },
      { id: 2, nombre: '2º - Compañero' },
      { id: 3, nombre: '3º - Maestro' },
      { id: 4, nombre: '4º - Maestro Secreto' },
      { id: 5, nombre: '5º - Maestro Perfecto' },
      { id: 6, nombre: '6º - Secretario Íntimo' },
      { id: 7, nombre: '7º - Juez y Preboste' },
      { id: 8, nombre: '8º - Intendente de los Edificios' },
      { id: 9, nombre: '9º - Maestro Elegido de los Nueve' },
      { id: 10, nombre: '10º - Ilustre Elegido de los Quince' },
      { id: 11, nombre: '11º - Sublime Caballero Elegido' },
      { id: 12, nombre: '12º - Gran Maestro Arquitecto' },
      { id: 13, nombre: '13º - Real Arco de Salomón' },
      { id: 14, nombre: '14º - Gran Elegido Perfecto y Sublime Masón' },
      { id: 15, nombre: '15º - Caballero de Oriente o de la Espada' },
      { id: 16, nombre: '16º - Príncipe de Jerusalén' },
      { id: 17, nombre: '17º - Caballero de Oriente y Occidente' },
      { id: 18, nombre: '18º - Caballero Rosa Cruz' },
      { id: 19, nombre: '19º - Gran Pontífice' },
      { id: 20, nombre: '20º - Gran Maestro ad Vitam' },
      { id: 21, nombre: '21º - Noaquita o Caballero Patriarca' },
      { id: 22, nombre: '22º - Caballero Real Hacha o Príncipe del Líbano' },
      { id: 23, nombre: '23º - Jefe del Tabernáculo' },
      { id: 24, nombre: '24º - Príncipe del Tabernáculo' },
      { id: 25, nombre: '25º - Caballero de la Serpiente de Bronce' },
      { id: 26, nombre: '26º - Príncipe de Merced o Escocés Trinitario' },
      { id: 27, nombre: '27º - Gran Comendador del Templo' },
      { id: 28, nombre: '28º - Caballero del Sol o Príncipe Adepto' },
      { id: 29, nombre: '29º - Gran Escocés de San Andrés' },
      { id: 30, nombre: '30º - Caballero Kadosh' },
      { id: 31, nombre: '31º - Inspector Inquisidor Comendador' },
      { id: 32, nombre: '32º - Sublime y Sublimado Príncipe del Real Secreto' },
      { id: 33, nombre: '33º - Soberano Gran Inspector General' }
    ],

    // Datos Dinámicos de Pasos Perdidos con Categorías e Hipervínculos PDF
    tarjetasDinamicas: [
      {
        id: 1,
        titulo: 'Bienvenida a los Pasos Perdidos',
        categoria: 'principios',
        contenido: 'Trazado de recepción y bienvenida a nuestro portal público institucional sobre valores y fraternidad.',
        urlPdf: null,
        autor: 'Venerable Maestro / Webmaster',
        fecha: '2026-07-01'
      },
      {
        id: 2,
        titulo: 'Simbolismo y Filosofía en la Logia',
        categoria: 'docencia',
        contenido: 'Una breve revisión pedagógica e histórica sobre los rituales morales y el valor del estudio filosófico.',
        urlPdf: null,
        autor: 'Maestro de Docencia',
        fecha: '2026-07-05'
      },
      {
        id: 3,
        titulo: 'Jornada Filantrópica Institucional',
        categoria: 'accion',
        contenido: 'Informe de las actividades benéficas y el auxilio fraterno extendido a la comunidad civil.',
        urlPdf: null,
        autor: 'Hospitalario',
        fecha: '2026-07-12'
      },
      {
        id: 4,
        titulo: 'Constitución Masónica General',
        categoria: 'biblioteca',
        contenido: 'Documento fundamental con los principios y reglamentos para consulta abierta en PDF.',
        urlPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        autor: 'Biblioteca Digital',
        fecha: '2026-07-18'
      }
    ],

    // Trazados de la Cámara del Umbral
    trazados: [
      {
        id: 101,
        titulo: 'El Simbolismo de la Piedra Bruta',
        grado: '1º - Aprendiz',
        resumen: 'Instrucción fundamental sobre el trabajo interior en el primer grado.',
        contenido: 'Contenido completo sobre la piedra bruta y su desbaste...',
        autor: 'H:. Q:. H:. Inspector',
        fecha: '2026-07-10'
      },
      {
        id: 102,
        titulo: 'La Marcha y la Regla de Cinco Pasos',
        grado: '2º - Compañero',
        resumen: 'Estudio de la geometría aplicada y el paso del Compañero.',
        contenido: 'Contenido profundo sobre la marcha del segundo grado...',
        autor: 'Segundo Vigilante',
        fecha: '2026-07-15'
      },
      {
        id: 103,
        titulo: 'La Leyenda del Cuarto de Reflexiones',
        grado: '3º - Maestro',
        resumen: 'Análisis arquitectónico y simbólico reservado para el Magisterio.',
        contenido: 'Plancha trazada reservada exclusivamente para la Tercera Cámara...',
        autor: 'Primer Vigilante',
        fecha: '2026-07-20'
      }
    ],

    // Datos de Balotaje
    listaBalotajes: [
      {
        id: 1,
        candidato: 'Venerable Maestro',
        motivo: 'INICIACION',
        descripcion: 'Esta de acuerdo con iniciar a los profanos actuales?',
        activo: false,
        fechaInicio: '2026-07-20',
        fechaFin: '2026-07-27',
        blancas: 1,
        negras: 2
      }
    ],

    // Lista de Contactos recibidos
    listaSolicitudesContacto: [
      {
        id: 1,
        nombre: 'Carlos Mendoza',
        email: 'carlos.m@gmail.com',
        telefono: '+58 412 9876543',
        redes: 'IG: @carlosm',
        mensaje: 'Deseo conocer información sobre las reuniones públicas.',
        codigoGenerado: 'TRONO149-CARLOS'
      }
    ],

    // Lista de Aspirantes Admitidos e Iniciados
    aspirantesRegistrados: [
      {
        id: 1,
        nombre: 'Carlos Mendoza',
        email: 'carlos.m@gmail.com',
        grado: '1º - Aprendiz',
        fechaRegistro: '2026-07-26'
      }
    ],

    // Cuadro Logial Único
    listaHermanos: [
      { id: 1, nombre: 'Webmaster', email: 'webmaster@lapis.com', grado: 'Webmaster', rol: 'webmaster', esFijo: true, password: 'lapis123' },
      { id: 2, nombre: 'Venerable Maestro Actual', email: 'venerable@lapis.com', grado: '3º - Maestro', rol: 'venerable_maestro', esFijo: false, password: 'lapis123' },
      { id: 3, nombre: 'Hermano Maestro B.', email: 'maestro@lapis.com', grado: '3º - Maestro', rol: 'maestro', esFijo: false, password: 'lapis123' },
      { id: 4, nombre: 'Hermano Compañero B.', email: 'companero@lapis.com', grado: '2º - Compañero', rol: 'companero', esFijo: false, password: 'lapis123' },
      { id: 5, nombre: 'Carlos Mendoza', email: 'carlos.m@gmail.com', grado: '1º - Aprendiz', rol: 'aprendiz', esFijo: false, password: 'lapis123' }
    ],

    // Escalafón para promoción de usuarios
    escalafon: [
      { grado: '1º - Aprendiz', rol: 'aprendiz' },
      { grado: '2º - Compañero', rol: 'companero' },
      { grado: '3º - Maestro', rol: 'maestro' },
      { grado: '3º - Maestro', rol: 'venerable_maestro' }
    ],

    // Variables de Formularios
    formContacto: { nombre: '', email: '', telefono: '', redes: '', mensaje: '' },
    formRegistro: { codigoPase: '', nombre: '', grado: '1º - Aprendiz', email: '', password: '', respuestaSecreta: '' },
    formLogin: { email: '', password: '' },
    formRecuperar: { email: '', respuestaSecreta: '', nuevaPassword: '' },

    // Modales y Selección
    modalAbierto: false,
    trazadoSeleccionado: null,

    // Método de Inicialización
    async init() {
      const sesionGuardada = localStorage.getItem('lapis_sesion');
      if (sesionGuardada) {
        try {
          const parsed = JSON.parse(sesionGuardada);
          if (parsed && (parsed.rol === 'webmaster' || parsed.usuario === 'webmaster')) {
            parsed.nombre = 'Webmaster';
            parsed.nombre_real = 'Webmaster';
            parsed.grado = 'Webmaster';
          }
          this.usuarioLogueado = parsed;
        } catch (e) {
          localStorage.removeItem('lapis_sesion');
        }
      }

      try {
        const dataVisitas = await window.apiConnection.get('/visitas');
        if (dataVisitas && dataVisitas.total) {
          this.contadorVisitas = dataVisitas.total;
        }
      } catch (err) {
        console.warn('Operando en modo local para contador de visitas');
      }
    },

    // Permisos
    esAdministradorOWebmaster() {
      if (!this.usuarioLogueado) return false;
      const rol = this.usuarioLogueado.rol;
      return rol === 'webmaster' || rol === 'venerable_maestro' || rol === 'trono' || rol === 'admin';
    },

    tienePermisoPerfilTrono() {
      return this.esAdministradorOWebmaster();
    },

    tienePermisoEdicionPasosPerdidos() {
      if (!this.usuarioLogueado) return false;
      const rol = this.usuarioLogueado.rol;
      return rol === 'webmaster' || rol === 'venerable_maestro' || rol === 'maestro' || rol === 'trono' || rol === 'admin';
    },

    get tarjetasFiltradasPasosPerdidos() {
      if (this.categoriaPasosPerdidos === 'todos') {
        return this.tarjetasDinamicas;
      }
      return this.tarjetasDinamicas.filter(t => t.categoria === this.categoriaPasosPerdidos);
    },

    get trazadosFiltrados() {
      if (!this.usuarioLogueado) return [];
      
      const gradoUser = this.usuarioLogueado.grado || '';
      if (this.usuarioLogueado.rol === 'webmaster' || gradoUser === 'Webmaster' || gradoUser.includes('Maestro') || this.esAdministradorOWebmaster()) {
        return this.trazados;
      } else if (gradoUser.includes('Compañero')) {
        return this.trazados.filter(t => t.grado.includes('Aprendiz') || t.grado.includes('Compañero'));
      } else {
        return this.trazados.filter(t => t.grado.includes('Aprendiz'));
      }
    },

    // Método de Iniciar Sesión Corregido con SweetAlert2
    async iniciarSesion() {
      // Forzar que el modo de recuperación permanezca desactivado
      this.modoRecuperar = false;

      const inputUsuario = this.formLogin.email ? this.formLogin.email.trim().toLowerCase() : '';
      const inputPassword = this.formLogin.password ? this.formLogin.password.trim() : '';

      if (!inputUsuario || !inputPassword) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos Incompletos',
          text: 'Por favor, ingresa tu usuario/correo y contraseña.',
          confirmButtonColor: '#d97706'
        });
        return;
      }

      // 1. Validar contra el listado local de cuentas
      const usuarioLocal = this.listaHermanos.find(h => 
        (h.email && h.email.toLowerCase() === inputUsuario) || 
        (h.nombre && h.nombre.toLowerCase() === inputUsuario) || 
        (h.rol && h.rol.toLowerCase() === inputUsuario)
      );

      if (usuarioLocal) {
        // Verificar contraseña
        const passCorrecta = usuarioLocal.password 
          ? (inputPassword === usuarioLocal.password) 
          : (inputPassword === 'lapis123');

        if (passCorrecta) {
          const esWebmaster = usuarioLocal.rol === 'webmaster';
          this.usuarioLogueado = {
            id: usuarioLocal.id,
            nombre: esWebmaster ? 'Webmaster' : usuarioLocal.nombre,
            email: usuarioLocal.email || 'correo@ejemplo.com',
            grado: esWebmaster ? 'Webmaster' : usuarioLocal.grado,
            rol: usuarioLocal.rol,
            token: 'test-token'
          };
          localStorage.setItem('lapis_sesion', JSON.stringify(this.usuarioLogueado));
          this.formLogin = { email: '', password: '' };

          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: `Sesión iniciada correctamente como ${this.usuarioLogueado.nombre}`,
            timer: 2000,
            showConfirmButton: false
          });
          return;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'Contraseña incorrecta',
            confirmButtonColor: '#b91c1c'
          });
          return;
        }
      }

      // 2. Si no es un usuario local registrado, intentar mediante backend
      try {
        const payload = {
          usuario: inputUsuario.split('@')[0],
          password: inputPassword
        };
        const respuesta = await window.apiConnection.post('/auth/login', payload);
        
        if (respuesta && respuesta.usuario) {
          const esWebmaster = respuesta.usuario.rol === 'webmaster' || respuesta.usuario.usuario === 'webmaster';
          this.usuarioLogueado = {
            ...respuesta.usuario,
            nombre: esWebmaster ? 'Webmaster' : (respuesta.usuario.nombre_real || respuesta.usuario.nombre),
            grado: esWebmaster ? 'Webmaster' : respuesta.usuario.grado,
            token: respuesta.token
          };
          localStorage.setItem('lapis_sesion', JSON.stringify(this.usuarioLogueado));
          this.formLogin = { email: '', password: '' };

          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Sesión iniciada correctamente',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'Contraseña incorrecta',
            confirmButtonColor: '#b91c1c'
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado',
          text: 'Contraseña incorrecta',
          confirmButtonColor: '#b91c1c'
        });
      }
    },

    // Generar Código Único para Aspirante
    async generarCodigoParaAspirante(solicitud) {
      const aleatorio = Math.random().toString(36).substring(2, 7).toUpperCase();
      const codigo = `TRONO149-${aleatorio}`;
      
      try {
        await window.apiConnection.post('/codigos/generar', { email: solicitud.email, codigo: codigo });
      } catch (err) {
        console.log('Código generado localmente:', codigo);
      }

      solicitud.codigoGenerado = codigo;

      Swal.fire({
        icon: 'info',
        title: 'Palabra de Pase Generada',
        html: `<p class="mb-2">Código para <b>${solicitud.nombre}</b>:</p><div class="p-3 bg-amber-100 font-mono text-xl text-amber-900 rounded font-bold border border-amber-300 select-all">${codigo}</div><p class="text-xs text-slate-500 mt-2">Entrega esta Palabra de Pase al aspirante para que realice su registro.</p>`,
        confirmButtonColor: '#d97706'
      });
    },

    // Publicaciones Pasos Perdidos y Biblioteca Digital
    async abrirModalNuevaTarjeta() {
      const { value: formValues } = await Swal.fire({
        title: 'Nueva Publicación en Pasos Perdidos',
        html:
          '<select id="swal-card-cat" class="swal2-input">' +
          '  <option value="principios">Principios Fundamentales (Valores/Masonería)</option>' +
          '  <option value="docencia">Docencia y Tradición (Filosofía/Historia)</option>' +
          '  <option value="accion">Acción Exterior (Eventos Filantrópicos)</option>' +
          '  <option value="biblioteca">Biblioteca Digital (Libro / Documento PDF)</option>' +
          '</select>' +
          '<input id="swal-card-titulo" class="swal2-input" placeholder="Título de la Publicación o Libro">' +
          '<textarea id="swal-card-contenido" class="swal2-textarea" placeholder="Descripción o Resumen del Artículo/Libro"></textarea>' +
          '<input id="swal-card-pdf" class="swal2-input" placeholder="URL Enlace PDF en la nube (Opcional)">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Publicar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d97706',
        preConfirm: () => {
          const cat = document.getElementById('swal-card-cat').value;
          const t = document.getElementById('swal-card-titulo').value;
          const c = document.getElementById('swal-card-contenido').value;
          const pdf = document.getElementById('swal-card-pdf').value;
          if (!t || !c) {
            Swal.showValidationMessage('El título y el contenido son obligatorios');
            return false;
          }
          if (cat === 'biblioteca' && !pdf) {
            Swal.showValidationMessage('Se requiere la URL del enlace PDF para la Biblioteca Digital');
            return false;
          }
          return [cat, t, c, pdf];
        }
      });

      if (formValues) {
        const [categoria, titulo, contenido, urlPdf] = formValues;
        const nuevaTarjeta = {
          id: Date.now(),
          categoria: categoria,
          titulo: titulo,
          contenido: contenido,
          urlPdf: urlPdf || null,
          autor: this.usuarioLogueado ? this.usuarioLogueado.nombre : 'Webmaster',
          fecha: new Date().toISOString().split('T')[0]
        };

        this.tarjetasDinamicas.unshift(nuevaTarjeta);

        Swal.fire({
          icon: 'success',
          title: 'Publicado',
          text: 'Publicación agregada con éxito a Pasos Perdidos.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    },

    async eliminarTarjeta(id) {
      const result = await Swal.fire({
        title: '¿Confirmas la eliminación?',
        text: 'Deseas eliminar esta publicación de Pasos Perdidos',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        this.tarjetasDinamicas = this.tarjetasDinamicas.filter(t => t.id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'La publicación ha sido removida.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },

    async abrirModalCrearTrazado() {
      const { value: formValues } = await Swal.fire({
        title: 'Crear Trazado',
        html:
          '<input id="swal-trazado-titulo" class="swal2-input" placeholder="Título del Trazado">' +
          '<input id="swal-trazado-grado" class="swal2-input" placeholder="Grado (ej. 1º - Aprendiz)" value="1º - Aprendiz">' +
          '<input id="swal-trazado-resumen" class="swal2-input" placeholder="Resumen corto">' +
          '<textarea id="swal-trazado-contenido" class="swal2-textarea" placeholder="Contenido completo del trazado"></textarea>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d97706',
        preConfirm: () => {
          const titulo = document.getElementById('swal-trazado-titulo').value;
          const grado = document.getElementById('swal-trazado-grado').value;
          const resumen = document.getElementById('swal-trazado-resumen').value;
          const contenido = document.getElementById('swal-trazado-contenido').value;

          if (!titulo || !resumen || !contenido) {
            Swal.showValidationMessage('Todos los campos principales son obligatorios');
            return false;
          }
          return { titulo, grado: grado || '1º - Aprendiz', resumen, contenido };
        }
      });

      if (formValues) {
        const nuevoTrazado = {
          id: Date.now(),
          ...formValues,
          autor: this.usuarioLogueado ? this.usuarioLogueado.nombre : 'Webmaster',
          fecha: new Date().toISOString().split('T')[0]
        };

        this.trazados.unshift(nuevoTrazado);

        Swal.fire({
          icon: 'success',
          title: 'Trazado Grabado',
          text: 'Ingresado al Umbral con éxito.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    },

    async eliminarTrazado(id) {
      const result = await Swal.fire({
        title: '¿Eliminar trazado?',
        text: 'Deseas eliminar este trazado de la Cámara',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        this.trazados = this.trazados.filter(t => t.id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Trazado eliminado de la Cámara.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },

    // Gestión de Balotaje
    async abrirModalCrearBalotaje() {
      const hoy = new Date().toISOString().split('T')[0];
      const { value: formValues } = await Swal.fire({
        title: 'Iniciar Proceso de Balotaje',
        html:
          '<input id="swal-balotaje-cand" class="swal2-input" placeholder="Nombre del Candidato o Cargo">' +
          '<input id="swal-balotaje-motivo" class="swal2-input" placeholder="Motivo (ej. INICIACION / Aumento de Salario)">' +
          '<textarea id="swal-balotaje-desc" class="swal2-textarea" placeholder="Observaciones o pregunta del Balotaje"></textarea>' +
          '<div class="text-left mt-3"><label class="text-xs font-bold text-slate-600 block mb-1">Fecha de Inicio:</label><input id="swal-balotaje-inicio" type="date" class="swal2-input !mt-0 !w-full" value="' + hoy + '"></div>' +
          '<div class="text-left mt-2"><label class="text-xs font-bold text-slate-600 block mb-1">Fecha Final:</label><input id="swal-balotaje-fin" type="date" class="swal2-input !mt-0 !w-full"></div>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Iniciar Balotaje',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d97706',
        preConfirm: () => {
          const candidato = document.getElementById('swal-balotaje-cand').value;
          const motivo = document.getElementById('swal-balotaje-motivo').value;
          const descripcion = document.getElementById('swal-balotaje-desc').value;
          const fechaInicio = document.getElementById('swal-balotaje-inicio').value;
          const fechaFin = document.getElementById('swal-balotaje-fin').value;

          if (!candidato || !motivo || !fechaInicio || !fechaFin) {
            Swal.showValidationMessage('Candidato, motivo y ambas fechas son obligatorios');
            return false;
          }
          return { candidato, motivo, descripcion: descripcion || '', fechaInicio, fechaFin };
        }
      });

      if (formValues) {
        const nuevoBalotaje = {
          id: Date.now(),
          ...formValues,
          activo: true,
          blancas: 0,
          negras: 0
        };

        this.listaBalotajes.unshift(nuevoBalotaje);

        Swal.fire({
          icon: 'success',
          title: 'Balotaje Iniciado',
          text: 'Proceso de balotaje abierto exitosamente.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    },

    emitirVotoBalotaje(id, tipo) {
      const balotaje = this.listaBalotajes.find(b => b.id === id);
      if (balotaje && balotaje.activo) {
        if (tipo === 'blanca') balotaje.blancas++;
        if (tipo === 'negra') balotaje.negras++;

        Swal.fire({
          icon: 'success',
          title: 'Voto Depositado',
          text: 'Tu balota ha sido depositada de manera secreta en el saco.',
          timer: 1800,
          showConfirmButton: false
        });
      }
    },

    cerrarBalotaje(id) {
      const balotaje = this.listaBalotajes.find(b => b.id === id);
      if (balotaje) {
        balotaje.activo = false;
        
        Swal.fire({
          icon: 'info',
          title: 'Escrutinio Cerrado',
          html: `<div class="text-left"><p class="font-bold text-lg mb-2">Resultado Final:</p><ul class="list-disc pl-5"><li>Balotas Blancas: <span class="font-bold text-emerald-600">${balotaje.blancas}</span></li><li>Balotas Negras: <span class="font-bold text-red-600">${balotaje.negras}</span></li></ul></div>`,
          confirmButtonColor: '#d97706'
        });
      }
    },

    async eliminarBalotaje(id) {
      const result = await Swal.fire({
        title: '¿Eliminar escrutinio?',
        text: 'Esta acción eliminará el registro del balotaje permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        this.listaBalotajes = this.listaBalotajes.filter(b => b.id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El escrutinio ha sido eliminado.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },

    // Formularios
    async enviarContacto() {
      const solicitud = {
        id: Date.now(),
        ...this.formContacto,
        codigoGenerado: null
      };
      this.listaSolicitudesContacto.unshift(solicitud);

      try {
        await window.apiConnection.post('/contacto', this.formContacto);
      } catch (err) {
        console.warn('Contacto registrado localmente.');
      }

      Swal.fire({
        icon: 'success',
        title: 'Mensaje Enviado',
        text: 'Tu mensaje ha sido entregado a la Secretaría del Taller.',
        confirmButtonColor: '#d97706'
      });

      this.formContacto = { nombre: '', email: '', telefono: '', redes: '', mensaje: '' };
      this.vistaActual = 'pasos_perdidos';
    },

    async consagrarCuenta() {
      let rolTecnico = 'aprendiz';
      let gradoTecnico = this.formRegistro.grado;

      if (this.formRegistro.grado.includes('Compañero')) {
        rolTecnico = 'companero';
      } else if (this.formRegistro.grado.includes('Maestro') || parseInt(this.formRegistro.grado) >= 3) {
        rolTecnico = 'maestro';
      }

      try {
        const payload = {
          usuario: this.formRegistro.email.split('@')[0],
          codigo_pase: this.formRegistro.codigoPase,
          nombre_real: this.formRegistro.nombre,
          password: this.formRegistro.password,
          rol: rolTecnico,
          grado: gradoTecnico
        };
        await window.apiConnection.post('/auth/registro', payload);
      } catch (err) {
        console.warn('Registro procesado dinámicamente.');
      }

      const nuevoRegistrado = {
        id: Date.now(),
        nombre: this.formRegistro.nombre,
        email: this.formRegistro.email,
        grado: this.formRegistro.grado,
        fechaRegistro: new Date().toISOString().split('T')[0]
      };

      this.aspirantesRegistrados.unshift(nuevoRegistrado);

      this.listaHermanos.push({
        id: Date.now(),
        nombre: this.formRegistro.nombre,
        email: this.formRegistro.email,
        password: this.formRegistro.password,
        grado: gradoTecnico,
        rol: rolTecnico,
        esFijo: false
      });

      Swal.fire({
        icon: 'success',
        title: '¡Cuenta Consagrada!',
        html: `Bienvenido Q:. H:. <b>${this.formRegistro.nombre}</b>.<br>Tu cuenta ha sido consagrada exitosamente con el perfil de <b>${this.formRegistro.grado}</b>.`,
        confirmButtonColor: '#d97706'
      });

      this.vistaActual = 'umbral';
      this.formRegistro = { codigoPase: '', nombre: '', grado: '1º - Aprendiz', email: '', password: '', respuestaSecreta: '' };
    },

    async editarGradoAdmitido(hermanoAdmitido) {
      let optionsObj = {};
      this.gradosREAA.forEach(g => {
        optionsObj[g.id] = g.nombre;
      });

      const { value: numGrado } = await Swal.fire({
        title: `Nuevo Grado para ${hermanoAdmitido.nombre}`,
        input: 'select',
        inputOptions: optionsObj,
        inputPlaceholder: 'Selecciona un grado...',
        showCancelButton: true,
        confirmButtonColor: '#d97706',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Guardar'
      });

      if (numGrado) {
        const gradoObj = this.gradosREAA.find(g => g.id === parseInt(numGrado));
        if (gradoObj) {
          hermanoAdmitido.grado = gradoObj.nombre;

          const hEncontrado = this.listaHermanos.find(h => h.nombre === hermanoAdmitido.nombre || h.email === hermanoAdmitido.email);
          if (hEncontrado && !hEncontrado.esFijo) {
            hEncontrado.grado = gradoObj.nombre;
          }

          Swal.fire({
            icon: 'success',
            title: 'Grado Actualizado',
            text: `Grado asignado: ${gradoObj.nombre}`,
            timer: 1800,
            showConfirmButton: false
          });
        }
      }
    },

    // Eliminar Aspirante Admitido
    async eliminarAspiranteAdmitido(asp) {
      const result = await Swal.fire({
        title: '¿Confirmas la eliminación?',
        text: `¿Estás seguro de que deseas eliminar al aspirante/hermano ${asp.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        this.aspirantesRegistrados = this.aspirantesRegistrados.filter(a => a.id !== asp.id);
        this.listaHermanos = this.listaHermanos.filter(h => h.nombre !== asp.nombre && h.email !== asp.email);

        try {
          await window.apiConnection.delete(`/aspirantes/${asp.id}`);
        } catch (e) {
          console.warn('Eliminado localmente.');
        }

        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: `El registro de ${asp.nombre} ha sido eliminado.`,
          timer: 1800,
          showConfirmButton: false
        });
      }
    },

    // Eliminar Hermano del Cuadro Logial
    async eliminarHermanoCuadro(hermano) {
      if (hermano.esFijo || hermano.rol === 'webmaster') {
        Swal.fire({
          icon: 'error',
          title: 'Acción No Permitida',
          text: 'El perfil del Webmaster es único e inalterable.',
          confirmButtonColor: '#d97706'
        });
        return;
      }

      const result = await Swal.fire({
        title: 'Retirar del Cuadro Logial',
        text: `¿Deseas eliminar a Q:. H:. ${hermano.nombre} del Cuadro Logial?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, retirar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        this.listaHermanos = this.listaHermanos.filter(h => h.id !== hermano.id);

        try {
          await window.apiConnection.delete(`/usuarios/${hermano.id}`);
        } catch (e) {
          console.warn('Eliminado localmente.');
        }

        Swal.fire({
          icon: 'success',
          title: 'Retirado',
          text: `Q:. H:. ${hermano.nombre} ha sido retirado del Cuadro Logial.`,
          timer: 1800,
          showConfirmButton: false
        });
      }
    },

    async procesarRecuperacion() {
      try {
        await window.apiConnection.post('/recuperar-password', this.formRecuperar);
      } catch (err) {
        console.warn('Procesado localmente.');
      }

      Swal.fire({
        icon: 'success',
        title: 'Contraseña Actualizada',
        text: 'Contraseña actualizada con éxito. Ya puedes iniciar sesión.',
        confirmButtonColor: '#d97706'
      });

      this.modoRecuperar = false;
      this.formRecuperar = { email: '', respuestaSecreta: '', nuevaPassword: '' };
    },

    cerrarSesion() {
      this.usuarioLogueado = null;
      this.modoRecuperar = false;
      localStorage.removeItem('lapis_sesion');
      this.vistaActual = 'pasos_perdidos';

      Swal.fire({
        icon: 'info',
        title: 'Sesión Cerrada',
        text: 'Has salido del sistema.',
        timer: 1500,
        showConfirmButton: false
      });
    },

    // Gestión de Roles Protegida
    obtenerIndiceEscalafon(hermano) {
      return this.escalafon.findIndex(
        e => e.rol === hermano.rol || (e.grado === hermano.grado && e.rol === hermano.rol)
      );
    },

    async aplicarCambioRol(hermano, nuevoGrado, nuevoRol) {
      if (hermano.esFijo || hermano.rol === 'webmaster') {
        Swal.fire({
          icon: 'error',
          title: 'Acción No Permitida',
          text: 'El perfil del Webmaster es único e inalterable.',
          confirmButtonColor: '#d97706'
        });
        return;
      }

      const idx = this.listaHermanos.findIndex(h => h.id === hermano.id);
      
      if (idx !== -1) {
        this.listaHermanos[idx].grado = nuevoGrado;
        this.listaHermanos[idx].rol = nuevoRol;
        this.listaHermanos = [...this.listaHermanos];
      }

      try {
        await window.apiConnection.patch(`/usuarios/${hermano.id}/rol`, {
          grado: nuevoGrado,
          rol: nuevoRol
        });
      } catch (e) {
        console.warn('Cambio aplicado localmente.');
      }
    },

    async aumentarRolHermano(hermano) {
      if (hermano.esFijo || hermano.rol === 'webmaster') {
        Swal.fire({
          icon: 'error',
          title: 'Acción No Permitida',
          text: 'El Webmaster posee un perfil único e inalterable.',
          confirmButtonColor: '#d97706'
        });
        return;
      }

      let idx = this.obtenerIndiceEscalafon(hermano);
      if (idx === -1) idx = 0;

      if (idx < this.escalafon.length - 1) {
        const siguiente = this.escalafon[idx + 1];
        await this.aplicarCambioRol(hermano, siguiente.grado, siguiente.rol);
        Swal.fire({
          icon: 'success',
          title: 'Grado Promovido',
          text: `${hermano.nombre} ha sido promovido a ${siguiente.grado}`,
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Máximo Nivel',
          text: `El H:. ${hermano.nombre} ya posee la máxima investidura dentro del cuadro logial.`,
          confirmButtonColor: '#d97706'
        });
      }
    },

    async disminuirRolHermano(hermano) {
      if (hermano.esFijo || hermano.rol === 'webmaster') {
        Swal.fire({
          icon: 'error',
          title: 'Acción No Permitida',
          text: 'El Webmaster posee un perfil único e inalterable.',
          confirmButtonColor: '#d97706'
        });
        return;
      }

      let idx = this.obtenerIndiceEscalafon(hermano);

      if (idx > 0) {
        const anterior = this.escalafon[idx - 1];
        await this.aplicarCambioRol(hermano, anterior.grado, anterior.rol);
        Swal.fire({
          icon: 'info',
          title: 'Nivel Ajustado',
          text: `${hermano.nombre} ajustado a ${anterior.grado}`,
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Primer Nivel',
          text: `El H:. ${hermano.nombre} se encuentra en el primer nivel (Aprendiz).`,
          confirmButtonColor: '#d97706'
        });
      }
    },

    async editarRolDirecto(hermano) {
      if (hermano.esFijo || hermano.rol === 'webmaster') {
        Swal.fire({
          icon: 'error',
          title: 'Acción No Permitida',
          text: 'El perfil del Webmaster es único y no puede ser editado.',
          confirmButtonColor: '#d97706'
        });
        return;
      }

      const { value: seleccion } = await Swal.fire({
        title: `Editar Rol de ${hermano.nombre}`,
        input: 'select',
        inputOptions: {
          '1': '1º - Aprendiz',
          '2': '2º - Compañero',
          '3': '3º - Maestro',
          '4': 'Venerable Maestro'
        },
        inputPlaceholder: 'Selecciona el nuevo rol/grado...',
        showCancelButton: true,
        confirmButtonColor: '#d97706',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Actualizar'
      });

      const mapa = {
        '1': { grado: '1º - Aprendiz', rol: 'aprendiz' },
        '2': { grado: '2º - Compañero', rol: 'companero' },
        '3': { grado: '3º - Maestro', rol: 'maestro' },
        '4': { grado: '3º - Maestro', rol: 'venerable_maestro' }
      };

      if (seleccion && mapa[seleccion]) {
        const target = mapa[seleccion];
        await this.aplicarCambioRol(hermano, target.grado, target.rol);
        Swal.fire({
          icon: 'success',
          title: 'Rol Actualizado',
          text: `Rol de ${hermano.nombre} actualizado correctamente.`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    },

    verTrazadoCompleto(trazado) {
      Swal.fire({
        title: trazado.titulo,
        html: `<div class="text-left text-sm space-y-3"><p class="text-slate-600 border-b pb-2"><b>Autor:</b> ${trazado.autor}</p><div class="text-slate-800 leading-relaxed whitespace-pre-wrap">${trazado.contenido}</div></div>`,
        confirmButtonColor: '#d97706',
        confirmButtonText: 'Cerrar'
      });
    }
  }));
});