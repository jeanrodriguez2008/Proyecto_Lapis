// js/app.js - Lógica Principal y Gestión de Estado con Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('appLapis', () => ({
    // Estado de Navegación y Sesión
    vistaActual: 'pasos_perdidos',
    seccionUmbral: 'trazados',
    categoriaPasosPerdidos: null,
    modoRecuperar: false,
    usuarioLogueado: null,
    contadorVisitas: 0,

    // Gestión del Chat Interno
    salaChatActual: 'aprendiz',
    nuevoMensajeChat: '',
    mensajesChat: [
      { id: 1, sala: 'aprendiz', autor: 'Carlos Mendoza', grado: '1º - Aprendiz', texto: 'Fraterno saludo a la Cámara de Aprendiz.', fecha: '2026-07-28 10:00' },
      { id: 2, sala: 'companero', autor: 'Hermano Compañero B.', grado: '2º - Compañero', texto: 'Senda de trabajo en la segunda cámara.', fecha: '2026-07-28 10:15' },
      { id: 3, sala: 'maestro', autor: 'Venerable Maestro Actual', grado: '3º - Maestro', texto: 'Trazados y trabajos del Magisterio.', fecha: '2026-07-28 10:30' }
    ],

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

    // Publicaciones Dinámicas
    tarjetasDinamicas: [],
    trazados: [],
    listaBalotajes: [],

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

    aspirantesRegistrados: [
      {
        id: 1,
        nombre: 'Carlos Mendoza',
        email: 'carlos.m@gmail.com',
        grado: '1º - Aprendiz',
        fechaRegistro: '2026-07-26'
      }
    ],

    listaHermanos: [
      { id: 1, nombre: 'Webmaster', email: 'webmaster@lapis.com', grado: 'Webmaster', rol: 'webmaster', esFijo: true, password: 'lapis123' },
      { id: 2, nombre: 'Venerable Maestro Actual', email: 'venerable@lapis.com', grado: '3º - Maestro', rol: 'venerable_maestro', esFijo: false, password: 'lapis123' },
      { id: 3, nombre: 'Hermano Maestro B.', email: 'maestro@lapis.com', grado: '3º - Maestro', rol: 'maestro', esFijo: false, password: 'lapis123' },
      { id: 4, nombre: 'Hermano Compañero B.', email: 'companero@lapis.com', grado: '2º - Compañero', rol: 'companero', esFijo: false, password: 'lapis123' },
      { id: 5, nombre: 'Carlos Mendoza', email: 'carlos.m@gmail.com', grado: '1º - Aprendiz', rol: 'aprendiz', esFijo: false, password: 'lapis123' }
    ],

    escalafon: [
      { grado: '1º - Aprendiz', rol: 'aprendiz' },
      { grado: '2º - Compañero', rol: 'companero' },
      { grado: '3º - Maestro', rol: 'maestro' },
      { grado: '3º - Maestro', rol: 'venerable_maestro' }
    ],

    formContacto: { nombre: '', email: '', telefono: '', redes: '', mensaje: '' },
    formRegistro: { codigoPase: '', nombre: '', grado: '1º - Aprendiz', email: '', password: '', respuestaSecreta: '' },
    formLogin: { email: '', password: '' },
    formRecuperar: { email: '', respuestaSecreta: '', nuevaPassword: '' },

    async init() {
      // Registrar e incrementar el contador global en FastAPI
      if (window.apiConnection) {
        try {
          const res = await window.apiConnection.get('/pasos-perdidos/visitas');
          if (res && res.visitas !== undefined) {
            this.contadorVisitas = res.visitas;
            localStorage.setItem('lapis_contador_visitas', this.contadorVisitas);
          }
        } catch (e) {
          console.warn('Servidor offline, utilizando contador local.');
          let visitasLocales = localStorage.getItem('lapis_contador_visitas');
          this.contadorVisitas = visitasLocales ? parseInt(visitasLocales, 10) + 1 : 1;
          localStorage.setItem('lapis_contador_visitas', this.contadorVisitas);
        }
      } else {
        let visitasLocales = localStorage.getItem('lapis_contador_visitas');
        this.contadorVisitas = visitasLocales ? parseInt(visitasLocales, 10) + 1 : 1;
        localStorage.setItem('lapis_contador_visitas', this.contadorVisitas);
      }

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

      await this.cargarPasosPerdidos();
      await this.cargarTrazados();

      if (this.usuarioLogueado) {
        await this.cargarBalotajesBackend();
      }
    },

    // Carga robusta con soporte de LocalStorage + API Backend
    async cargarPasosPerdidos() {
      let publicaciones = [];
      
      // 1. Intentar descargar desde la API
      if (window.apiConnection) {
        try {
          const remotePasos = await window.apiConnection.get('/pasos-perdidos');
          if (remotePasos && Array.isArray(remotePasos)) {
            publicaciones = remotePasos.map(p => ({
              id: p.id,
              titulo: p.titulo,
              categoria: p.categoria,
              contenido: p.contenido,
              urlPdf: p.url_pdf || null,
              autor: p.autor || 'Institucional',
              fecha: p.fecha ? p.fecha.split('T')[0] : new Date().toISOString().split('T')[0]
            }));
          }
        } catch (e) {
          console.warn('Backend API no disponible. Utilizando almacenamiento local de Pasos Perdidos.');
        }
      }

      // 2. Combinar con elementos guardados en LocalStorage (Backup local)
      const localesGuardados = localStorage.getItem('lapis_pasos_locales');
      let publicacionesLocales = [];
      if (localesGuardados) {
        try {
          publicacionesLocales = JSON.parse(localesGuardados);
        } catch (e) {
          publicacionesLocales = [];
        }
      }

      // Fusionar evitando duplicados por ID
      const idsServidor = new Set(publicaciones.map(p => p.id));
      const localesNoDuplicadas = publicacionesLocales.filter(p => !idsServidor.has(p.id));
      
      this.tarjetasDinamicas = [...publicaciones, ...localesNoDuplicadas];

      // 3. Si no hay nada, mostrar la tarjeta por defecto
      if (this.tarjetasDinamicas.length === 0) {
        this.tarjetasDinamicas = [
          {
            id: 1,
            titulo: 'Bienvenida a los Pasos Perdidos',
            categoria: 'principios',
            contenido: 'Trazado de recepción y bienvenida a nuestro portal público institucional sobre valores y fraternidad.',
            urlPdf: null,
            autor: 'Venerable Maestro / Webmaster',
            fecha: '2026-07-01'
          }
        ];
      }
    },

    guardarPublicacionEnLocalStorage(nuevaTarjeta) {
      let locales = [];
      const datosGuardados = localStorage.getItem('lapis_pasos_locales');
      if (datosGuardados) {
        try { locales = JSON.parse(datosGuardados); } catch (e) { locales = []; }
      }
      locales.unshift(nuevaTarjeta);
      localStorage.setItem('lapis_pasos_locales', JSON.stringify(locales));
    },

    async abrirModalNuevaTarjeta() {
      if (!this.tienePermisoEdicionPasosPerdidos()) {
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado',
          text: 'Esta sección solo puede ser editada por el Venerable Maestro y el Webmaster.',
          confirmButtonColor: '#b91c1c'
        });
        return;
      }

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

        let guardadoEnBackend = false;

        // Intentar guardar en FastAPI
        if (window.apiConnection) {
          try {
            const res = await window.apiConnection.post('/pasos-perdidos', {
              titulo: titulo,
              contenido: contenido,
              categoria: categoria,
              url_pdf: urlPdf || null
            });
            if (res && res.id) nuevaTarjeta.id = res.id;
            guardadoEnBackend = true;
          } catch (e) {
            console.warn('API POST no respondió adecuadamente. Guardando en persistencia local.');
          }
        }

        // Guardar siempre en estado de Alpine y en LocalStorage
        this.tarjetasDinamicas.unshift(nuevaTarjeta);
        this.guardarPublicacionEnLocalStorage(nuevaTarjeta);
        this.categoriaPasosPerdidos = categoria;

        Swal.fire({
          icon: 'success',
          title: guardadoEnBackend ? '¡Publicado en Servidor!' : '¡Publicado Localmente!',
          text: guardadoEnBackend 
            ? 'La publicación se ha guardado exitosamente en la base de datos.' 
            : 'Publicación guardada localmente de forma permanente.',
          timer: 2200,
          showConfirmButton: false
        });
      }
    },

    async eliminarTarjeta(id) {
      if (!this.tienePermisoEdicionPasosPerdidos()) {
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado',
          text: 'Esta sección solo puede ser editada por el Venerable Maestro y el Webmaster.',
          confirmButtonColor: '#b91c1c'
        });
        return;
      }

      const result = await Swal.fire({
        title: '¿Confirmas la eliminación?',
        text: 'Deseas eliminar esta publicación de Pasos Perdidos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        if (window.apiConnection) {
          try {
            await window.apiConnection.delete(`/pasos-perdidos/${id}`);
          } catch (e) {
            console.warn('Eliminando de almacenamiento local.');
          }
        }
        
        this.tarjetasDinamicas = this.tarjetasDinamicas.filter(t => t.id !== id);
        
        // Limpiar también de LocalStorage
        const locales = localStorage.getItem('lapis_pasos_locales');
        if (locales) {
          try {
            const parsed = JSON.parse(locales).filter(t => t.id !== id);
            localStorage.setItem('lapis_pasos_locales', JSON.stringify(parsed));
          } catch (e) {}
        }

        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'La publicación ha sido removida.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },

    async cargarTrazados() {
      if (window.apiConnection) {
        try {
          const remoteTrazados = await window.apiConnection.get('/trazados');
          if (remoteTrazados && Array.isArray(remoteTrazados)) {
            this.trazados = remoteTrazados.map(t => ({
              id: t.id,
              titulo: t.titulo,
              grado: t.camara_destino === 'companero' ? '2º - Compañero' : (t.camara_destino === 'maestro' ? '3º - Maestro' : '1º - Aprendiz'),
              resumen: t.contenido.substring(0, 100) + '...',
              contenido: t.contenido,
              autor: t.autor,
              fecha: t.fecha_publicacion ? t.fecha_publicacion.split('T')[0] : new Date().toISOString().split('T')[0]
            }));
            return;
          }
        } catch (e) {
          console.warn('Cargando trazados por defecto.');
        }
      }
    },

    toggleCategoriaAcordeon(cat) {
      this.categoriaPasosPerdidos = (this.categoriaPasosPerdidos === cat) ? null : cat;
    },

    verArticuloPasosPerdidos(tarjeta) {
      let botonPdf = '';
      if (tarjeta.urlPdf) {
        botonPdf = `<div class="mt-4 pt-3 border-t text-center"><a href="${tarjeta.urlPdf}" target="_blank" class="inline-block bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow">📄 Abrir / Descargar Documento PDF</a></div>`;
      }

      Swal.fire({
        title: tarjeta.titulo,
        width: '800px',
        customClass: {
          htmlContainer: 'max-h-[70vh] overflow-y-auto text-left'
        },
        html: `
          <div class="text-left text-sm space-y-3">
            <div class="flex justify-between items-center text-xs text-slate-500 border-b pb-2">
              <span><b>Autor:</b> ${tarjeta.autor || 'Institucional'}</span>
              <span><b>Fecha:</b> ${tarjeta.fecha || ''}</span>
            </div>
            <div class="text-slate-800 leading-relaxed whitespace-pre-wrap py-2">${tarjeta.contenido}</div>
            ${botonPdf}
          </div>
        `,
        confirmButtonColor: '#d97706',
        confirmButtonText: 'Cerrar'
      });
    },

    async cargarBalotajesBackend() {
      if (!window.apiConnection) return;
      try {
        const remoteBalotajes = await window.apiConnection.get('/balotajes');
        if (remoteBalotajes && Array.isArray(remoteBalotajes)) {
          this.listaBalotajes = remoteBalotajes.map(b => ({
            id: b.id,
            candidato: b.candidato,
            motivo: b.motivo,
            descripcion: b.descripcion,
            activo: b.activo,
            fechaInicio: b.fecha_inicio,
            fechaFin: b.fecha_fin,
            blancas: b.blancas,
            negras: b.negras
          }));
        }
      } catch (e) {
        console.warn('Usando balotajes locales.');
      }
    },

    puedeAccederSalaChat(sala) {
      if (!this.usuarioLogueado) return false;
      const rol = this.usuarioLogueado.rol || '';
      const grado = this.usuarioLogueado.grado || '';
      const esMaestroOAlto = rol === 'webmaster' || rol === 'venerable_maestro' || rol === 'maestro' || grado.includes('Maestro') || grado === 'Webmaster';
      const esCompanero = rol === 'companero' || grado.includes('Compañero');

      if (sala === 'aprendiz') return true;
      if (sala === 'companero') return esCompanero || esMaestroOAlto;
      if (sala === 'maestro') return esMaestroOAlto;
      return false;
    },

    get mensajesChatFiltrados() {
      return this.mensajesChat.filter(m => m.sala === this.salaChatActual);
    },

    enviarMensajeChat() {
      if (!this.nuevoMensajeChat.trim()) return;
      if (!this.puedeAccederSalaChat(this.salaChatActual)) {
        Swal.fire({ icon: 'error', title: 'Acceso Denegado', text: 'No tienes privilegios para participar en esta sala de chat.' });
        return;
      }

      const hora = new Date().toISOString().replace('T', ' ').substring(0, 16);
      this.mensajesChat.push({
        id: Date.now(),
        sala: this.salaChatActual,
        autor: this.usuarioLogueado ? this.usuarioLogueado.nombre : 'Anónimo',
        grado: this.usuarioLogueado ? this.usuarioLogueado.grado : '1º - Aprendiz',
        texto: this.nuevoMensajeChat.trim(),
        fecha: hora
      });

      this.nuevoMensajeChat = '';
    },

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
      return rol === 'webmaster' || rol === 'venerable_maestro';
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

    async iniciarSesion() {
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

      if (window.apiConnection) {
        try {
          const payload = {
            usuario: inputUsuario.includes('@') ? inputUsuario.split('@')[0] : inputUsuario,
            password: inputPassword
          };
          const respuesta = await window.apiConnection.post('/auth/login', payload);
          
          if (respuesta && respuesta.usuario) {
            const esWebmaster = respuesta.usuario.rol === 'webmaster' || respuesta.usuario.usuario === 'webmaster';
            this.usuarioLogueado = {
              ...respuesta.usuario,
              nombre: esWebmaster ? 'Webmaster' : (respuesta.usuario.nombre || respuesta.usuario.nombre_real),
              grado: esWebmaster ? 'Webmaster' : respuesta.usuario.grado,
              token: respuesta.token
            };
            localStorage.setItem('lapis_sesion', JSON.stringify(this.usuarioLogueado));
            this.formLogin = { email: '', password: '' };
            await this.cargarPasosPerdidos();
            await this.cargarBalotajesBackend();

            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: 'Sesión iniciada correctamente',
              timer: 2000,
              showConfirmButton: false
            });
            return;
          }
        } catch (err) {
          console.warn('Fallo la conexión API Backend, verificando catálogo local...');
        }
      }

      const usuarioLocal = this.listaHermanos.find(h => 
        (h.email && h.email.toLowerCase() === inputUsuario) || 
        (h.nombre && h.nombre.toLowerCase() === inputUsuario) || 
        (h.rol && h.rol.toLowerCase() === inputUsuario)
      );

      if (usuarioLocal) {
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
          await this.cargarBalotajesBackend();

          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: `Sesión iniciada correctamente como ${this.usuarioLogueado.nombre}`,
            timer: 2000,
            showConfirmButton: false
          });
          return;
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'Usuario o contraseña incorrectos.',
        confirmButtonColor: '#b91c1c'
      });
    },

    async generarCodigoParaAspirante(solicitud) {
      let codigo = '';
      if (window.apiConnection) {
        try {
          const resp = await window.apiConnection.post(`/contacto/${solicitud.id}/generar-codigo`);
          if (resp && resp.codigo) {
            codigo = resp.codigo;
          }
        } catch (err) {
          const aleatorio = Math.random().toString(36).substring(2, 7).toUpperCase();
          codigo = `TRONO149-${aleatorio}`;
        }
      } else {
        const aleatorio = Math.random().toString(36).substring(2, 7).toUpperCase();
        codigo = `TRONO149-${aleatorio}`;
      }

      solicitud.codigoGenerado = codigo;

      Swal.fire({
        icon: 'info',
        title: 'Palabra de Pase Generada',
        html: `<p class="mb-2">Código para <b>${solicitud.nombre}</b>:</p><div class="p-3 bg-amber-100 font-mono text-xl text-amber-900 rounded font-bold border border-amber-300 select-all">${codigo}</div><p class="text-xs text-slate-500 mt-2">Entrega esta Palabra de Pase al aspirante para que realice su registro.</p>`,
        confirmButtonColor: '#d97706'
      });
    },

    async abrirModalCrearTrazado() {
      const { value: formValues } = await Swal.fire({
        title: 'Crear Trazado',
        html:
          '<input id="swal-trazado-titulo" class="swal2-input" placeholder="Título del Trazado">' +
          '<select id="swal-trazado-grado" class="swal2-input">' +
          '  <option value="1º - Aprendiz">1º - Aprendiz</option>' +
          '  <option value="2º - Compañero">2º - Compañero</option>' +
          '  <option value="3º - Maestro">3º - Maestro</option>' +
          '</select>' +
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
            Swal.showValidationMessage('Todos los campos son obligatorios');
            return false;
          }
          return { titulo, grado, resumen, contenido };
        }
      });

      if (formValues) {
        if (window.apiConnection) {
          try {
            let camara = 'aprendiz';
            if (formValues.grado.includes('Compañero')) camara = 'companero';
            if (formValues.grado.includes('Maestro')) camara = 'maestro';

            await window.apiConnection.post('/trazados', {
              titulo: formValues.titulo,
              contenido: formValues.contenido,
              camara_destino: camara
            });
            await this.cargarTrazados();
          } catch (e) {
            console.warn('Trazado guardado en memoria local.');
            this.trazados.unshift({
              id: Date.now(),
              ...formValues,
              autor: this.usuarioLogueado ? this.usuarioLogueado.nombre : 'Webmaster',
              fecha: new Date().toISOString().split('T')[0]
            });
          }
        }

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
        text: 'Deseas eliminar este trazado de la Cámara.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        this.trazados = this.trazados.filter(t => t.id !== id);
        if (window.apiConnection) {
          try {
            await window.apiConnection.delete(`/trazados/${id}`);
          } catch (e) {
            console.warn('Trazado eliminado localmente.');
          }
        }

        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Trazado eliminado de la Cámara.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },

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
        if (window.apiConnection) {
          try {
            await window.apiConnection.post('/balotajes', {
              candidato: formValues.candidato,
              motivo: formValues.motivo,
              descripcion: formValues.descripcion,
              fecha_inicio: formValues.fechaInicio,
              fecha_fin: formValues.fechaFin
            });
            await this.cargarBalotajesBackend();
          } catch (e) {
            console.warn('Balotaje guardado localmente.');
            this.listaBalotajes.unshift({
              id: Date.now(),
              candidato: formValues.candidato,
              motivo: formValues.motivo,
              descripcion: formValues.descripcion,
              activo: true,
              fechaInicio: formValues.fechaInicio,
              fechaFin: formValues.fechaFin,
              blancas: 0,
              negras: 0
            });
          }
        }

        Swal.fire({
          icon: 'success',
          title: 'Balotaje Iniciado',
          text: 'Proceso de balotaje abierto exitosamente.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    },

    async emitirVotoBalotaje(id, tipo) {
      const balotaje = this.listaBalotajes.find(b => b.id === id);
      if (balotaje && balotaje.activo) {
        if (window.apiConnection) {
          try {
            await window.apiConnection.post(`/balotajes/${id}/votar`, { voto: tipo, tipo_voto: tipo });
            if (tipo === 'blanca') balotaje.blancas++;
            if (tipo === 'negra') balotaje.negras++;

            Swal.fire({
              icon: 'success',
              title: 'Voto Depositado',
              text: 'Tu balota ha sido depositada de manera secreta en el saco.',
              timer: 1800,
              showConfirmButton: false
            });
          } catch (err) {
            const msg = err.data && err.data.detail 
              ? err.data.detail 
              : 'Error al procesar la balota.';
            
            Swal.fire({
              icon: 'error',
              title: 'Voto No Registrado',
              text: msg,
              confirmButtonColor: '#b91c1c'
            });
          }
        } else {
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
      }
    },

    async cerrarBalotaje(id) {
      const balotaje = this.listaBalotajes.find(b => b.id === id);
      if (balotaje) {
        if (window.apiConnection) {
          try {
            await window.apiConnection.patch(`/balotajes/${id}/cerrar`);
          } catch (e) {
            console.warn('Balotaje cerrado localmente.');
          }
        }

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
        if (window.apiConnection) {
          try {
            await window.apiConnection.delete(`/balotajes/${id}`);
          } catch (e) {
            console.warn('Balotaje eliminado localmente.');
          }
        }

        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El escrutinio ha sido eliminado.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    },

    async enviarContacto() {
      const solicitud = {
        id: Date.now(),
        ...this.formContacto,
        codigoGenerado: null
      };

      if (window.apiConnection) {
        try {
          const resp = await window.apiConnection.post('/contacto', this.formContacto);
          if (resp && resp.id) {
            solicitud.id = resp.id;
          }
        } catch (err) {
          console.warn('Contacto registrado localmente.');
        }
      }

      this.listaSolicitudesContacto.unshift(solicitud);

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

      if (window.apiConnection) {
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

        if (window.apiConnection) {
          try {
            await window.apiConnection.delete(`/aspirantes/${asp.id}`);
          } catch (e) {
            console.warn('Eliminado localmente.');
          }
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

        if (window.apiConnection) {
          try {
            await window.apiConnection.delete(`/usuarios/${hermano.id}`);
          } catch (e) {
            console.warn('Eliminado localmente.');
          }
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
      if (window.apiConnection) {
        try {
          const payload = {
            usuario: this.formRecuperar.email.includes('@') ? this.formRecuperar.email.split('@')[0] : this.formRecuperar.email,
            respuesta_secreta: this.formRecuperar.respuestaSecreta,
            nueva_password: this.formRecuperar.nuevaPassword
          };
          await window.apiConnection.post('/auth/recuperar-password', payload);

          Swal.fire({
            icon: 'success',
            title: 'Contraseña Actualizada',
            text: 'Contraseña actualizada con éxito. Ya puedes iniciar sesión.',
            confirmButtonColor: '#d97706'
          });

          this.modoRecuperar = false;
          this.formRecuperar = { email: '', respuestaSecreta: '', nuevaPassword: '' };
        } catch (err) {
          const msg = err.data && err.data.detail 
            ? err.data.detail 
            : 'Error al recuperar la contraseña. Verifica tus datos.';

          Swal.fire({
            icon: 'error',
            title: 'Error de Recuperación',
            text: msg,
            confirmButtonColor: '#b91c1c'
          });
        }
      }
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

      if (window.apiConnection) {
        try {
          await window.apiConnection.patch(`/usuarios/${hermano.id}/rol`, {
            grado: nuevoGrado,
            rol: nuevoRol
          });
        } catch (e) {
          console.warn('Cambio aplicado localmente.');
        }
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
        width: '800px',
        customClass: {
          htmlContainer: 'max-h-[70vh] overflow-y-auto text-left'
        },
        html: `<div class="text-left text-sm space-y-3"><p class="text-slate-600 border-b pb-2"><b>Autor:</b> ${trazado.autor}</p><div class="text-slate-800 leading-relaxed whitespace-pre-wrap">${trazado.contenido}</div></div>`,
        confirmButtonColor: '#d97706',
        confirmButtonText: 'Cerrar'
      });
    }
  }));
});