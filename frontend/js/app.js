// js/app.js
// Lógica de Control y Estados Globales para el Proyecto Lapis

document.addEventListener('alpine:init', () => {
    Alpine.data('appLapis', () => ({
        // =====================================================================
        // 📊 ESTADOS GLOBALES DE LA APLICACIÓN
        // =====================================================================
        vistaActual: 'pasos_perdidos',
        sesionActiva: false,
        contadorVisitas: 357,
        usuarioLogueado: null,
        
        modalAbierto: false,
        seccionDestino: '',
        trazadoSeleccionado: null,

        // Formulario de edición/creación
        nuevaTarjeta: { titulo: '', contenido: '', categoriaDestino: 'masoneria', enlace: '', textoEnlace: '', imagen: '' },
        nuevaEncuestaDatos: { pregunta: '', categoria: '' },
        nuevoTrazadoDatos: { titulo: '', contenido: '', imagen: '' },

        // Credenciales y formularios de entrada
        credenciales: { usuario: '', password: '' },
        registroDatos: { usuario: '', password: '', password_confirm: '', nombre_real: '', rol: 'aprendiz', codigo_pase: '', respuesta_secreta: '' },
        recuperarDatos: { usuario: '', respuesta_secreta: '', nueva_password: '' },
        contactoDatos: { nombre: '', cedula: '', correo: '', telefono: '', profesion: '', redes: '', direccion: '', mensaje: '' },
        nuevoCenso: { nombre: '', cedula: '', correo: '', telefono: '', grado: 'Aprendiz', profesion: '', nacimiento: '', direccion: '', pregunta_mascota: '', pregunta_pelicula: '', pregunta_deporte: '' },

        // Chat multigrado
        nuevoMensajeTexto: '',
        historialChat: [
            { autor: '[Venerable Maestro]:', rol: 'venerable_maestro', texto: 'Trazado de trabajos listo para la sesión.' },
            { autor: '[Primer Vigilante]:', rol: 'primer_vigilante', texto: 'Columnas alineadas, todo en orden.' },
            { autor: '[Segundo Vigilante]:', rol: 'segundo_vigilante', texto: 'Verificando el ingreso en el Umbral.' }
        ],

        // Cantera de Miembros
        hermanosTaller: [
            { nombre: 'Hermano Venerable Activo', rol: 'venerable_maestro' },
            { nombre: 'Hermano Primer Vigilante', rol: 'primer_vigilante' },
            { nombre: 'Hermano Segundo Vigilante', rol: 'segundo_vigilante' },
            { nombre: 'Hermano Maestro 1', rol: 'maestro' },
            { nombre: 'Hermano Compañero 1', rol: 'companero' },
            { nombre: 'Hermano Aprendiz 1', rol: 'aprendiz' }
        ],

        // Trazados del Umbral
        trazados: [
            { titulo: 'La Rectitud de la Plomada', contenido: 'Breve reflexión sobre el equilibrio moral que todo Maestro debe infundir en los valles del taller.', autor: 'Hermano Maestro 1', gradoMinimo: 'maestro', fecha: '17 Jul 2026', imagen: '' }
        ],

        // Balotajes / Encuestas
        encuestas: [
            { pregunta: '¿Se aprueba el presupuesto extraordinario para la remodelación de la fachada de la Logia?', categoria: 'Finanzas', favor: 12, contra: 3 },
            { pregunta: '¿Autorizar el cambio de fecha de los trabajos solemnes de fin de mes para el sábado subsiguiente?', categoria: 'Logística', favor: 8, contra: 8 }
        ],

        // Pases generados e invitaciones
        pasesGenerados: [
            { codigo: 'LAPIS-777X', rol: 'maestro', usado: false },
            { codigo: 'LAPIS-333A', rol: 'aprendiz', usado: true },
            { codigo: 'LAPIS-555B', rol: 'companero', usado: false },
            { codigo: 'LAPIS-1000', rol: 'aprendiz', usado: false }
        ],

        // Solicitudes de ingreso (Toques de puerta)
        toquesDePuerta: [
            { nombre: 'Carlos Mendoza', cedula: 'V-14.340.112', correo: 'carlos.m@mail.com', telefono: '0412-5551234', mensaje: 'Deseo ingresar para expandir mi formación ética y colaborar con las obras filantrópicas.', estado: 'pendiente', codigo_generado: '' },
            { nombre: 'Andrés Gil', cedula: 'V-18.990.453', correo: 'andres_g@mail.com', telefono: '0424-7778899', mensaje: 'Interesado en el estudio profundo de las corrientes de pensamiento filosóficas clásicas.', estado: 'pendiente', codigo_generado: '' }
        ],

        // Tarjetas reactivas de Pasos Perdidos
        tarjetasReactivas: {
            masoneria: [
                { titulo: '¿Qué es la Masonería?', contenido: 'Una institución filosófica, filantrópica y progresista que busca el perfeccionamiento moral e intelectual de la humanidad a través del estudio de las ciencias y las artes.', imagen: '' },
                { titulo: 'Mitos y Realidades', contenido: 'Lejos de los secretos conspirativos del imaginario popular, la orden opera como una escuela de ciudadanía y fraternidad abierta al libre pensamiento respetuoso.', imagen: '' }
            ],
            educacion: [
                { titulo: 'Biblioteca Digital', contenido: 'Acceso a textos clásicos de filosofía universal y simbolismo.', enlace: '#', textoEnlace: 'Explorar tomos →', imagen: '' },
                { titulo: 'Cátedra Masónica', contenido: 'Ciclos de conferencias abiertas sobre historia y ética.', enlace: '#', textoEnlace: 'Ver cronograma →', imagen: '' },
                { titulo: '¿Sabías qué?', contenido: 'Grandes próceres civiles e inventores históricos trazaron sus planos bajo nuestras escuadras.', enlace: '', textoEnlace: '', imagen: '' },
                { titulo: 'Efemérides', contenido: 'Conmemoración del solsticio e hitos históricos de nuestra orden en la república.', enlace: '', textoEnlace: '', imagen: '' }
            ],
            noticias: [
                { titulo: 'Hoy', contenido: '🧪 Ciencia: Avances en astrofísica', imagen: '' },
                { titulo: 'Ayer', contenido: '💻 Tecnología: El impacto ético de la IA', imagen: '' },
                { titulo: '14 Jul', contenido: '⚽ Deporte: Valores e integración juvenil', imagen: '' }
            ],
            filantropia: [
                { titulo: 'Agosto 2026', contenido: 'Próximo evento: Jornada de donación escolar y apoyo médico comunitario.', imagen: '' }
            ]
        },

        // =====================================================================
        // 🔄 INICIALIZACIÓN Y GETTERS
        // =====================================================================
        async init() {
            const datosIniciales = await apiConnection.get('/estado-inicial');
            if (datosIniciales) {
                if (datosIniciales.tarjetasReactivas) this.tarjetasReactivas = datosIniciales.tarjetasReactivas;
                if (datosIniciales.trazados) this.trazados = datosIniciales.trazados;
                if (datosIniciales.encuestas) this.encuestas = datosIniciales.encuestas;
                if (datosIniciales.hermanosTaller) this.hermanosTaller = datosIniciales.hermanosTaller;
                if (datosIniciales.toquesDePuerta) this.toquesDePuerta = datosIniciales.toquesDePuerta;
            }
        },

        get trazadosFiltrados() {
            if (!this.usuarioLogueado) return [];
            const rol = this.usuarioLogueado.columna || this.usuarioLogueado.rol;

            return this.trazados.map((item, index) => ({ ...item, idIndex: index })).filter(trazado => {
                const grado = trazado.gradoMinimo || 'maestro';
                if (grado === 'aprendiz') return true;
                if (grado === 'companero') {
                    return ['companero', 'maestro', 'venerable_maestro', 'primer_vigilante', 'segundo_vigilante', 'trono_supremo'].includes(rol);
                }
                if (grado === 'maestro') {
                    return ['maestro', 'venerable_maestro', 'primer_vigilante', 'segundo_vigilante', 'trono_supremo'].includes(rol);
                }
                return true;
            });
        },

        // =====================================================================
        // 🔀 NAVEGACIÓN Y PERMISOS
        // =====================================================================
        cambiarVista(nuevaVista) {
            this.vistaActual = nuevaVista;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        tienePermisoEdicionPasosPerdidos() {
            if (!this.sesionActiva || !this.usuarioLogueado) return false;
            return ['trono_supremo', 'venerable_maestro', 'primer_vigilante', 'segundo_vigilante'].includes(this.usuarioLogueado.rol);
        },

        tienePermisoEliminarTrazados() {
            if (!this.sesionActiva || !this.usuarioLogueado) return false;
            return ['venerable_maestro', 'trono_supremo'].includes(this.usuarioLogueado.rol);
        },

        // =====================================================================
        // 🔐 AUTENTICACIÓN Y REGISTRO
        // =====================================================================
        iniciarSesion() {
            if (this.credenciales.usuario === 'venerable' && this.credenciales.password === 'lapis123') {
                this.usuarioLogueado = {
                    nombre: 'Venerable Maestro',
                    rol: 'venerable_maestro',
                    rol_etiqueta: 'Venerable Maestro Activo'
                };
                this.sesionActiva = true;
                this.cambiarVista('admin');
                this.limpiarFormularios();
            } else if (this.credenciales.usuario === 'trono' && this.credenciales.password === 'webmaster') {
                this.usuarioLogueado = {
                    nombre: 'Webmaster Supremo',
                    rol: 'trono_supremo',
                    rol_etiqueta: 'Rol Supremo (Webmaster)'
                };
                this.sesionActiva = true;
                this.cambiarVista('admin');
                this.limpiarFormularios();
            } else {
                alert('Las credenciales introducidas no corresponden a ninguna dignidad registrada en el taller.');
            }
        },

        cerrarSesion() {
            this.sesionActiva = false;
            this.usuarioLogueado = null;
            this.cambiarVista('pasos_perdidos');
        },

        registrarUsuario() {
            if (this.registroDatos.password !== this.registroDatos.password_confirm) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            const paseEncontrado = this.pasesGenerados.find(
                p => p.codigo === this.registroDatos.codigo_pase.toUpperCase() && !p.usado
            );

            if (paseEncontrado) {
                paseEncontrado.usado = true;
                
                const nuevoRol = paseEncontrado.rol || 'aprendiz';
                this.hermanosTaller.push({
                    nombre: this.registroDatos.nombre_real || this.registroDatos.usuario,
                    rol: nuevoRol
                });

                this.usuarioLogueado = {
                    nombre: this.registroDatos.usuario,
                    rol: nuevoRol,
                    rol_etiqueta: nuevoRol.toUpperCase()
                };
                this.sesionActiva = true;
                this.cambiarVista('umbral');
                this.limpiarFormularios();
                alert(`Registro consagrado con éxito. Bienvenido al Taller.`);
            } else {
                alert('La palabra de pase o código introducido es inválido o ya ha sido utilizado.');
            }
        },

        restablecerPassword() {
            if (!this.recuperarDatos.usuario || !this.recuperarDatos.respuesta_secreta || !this.recuperarDatos.nueva_password) {
                alert('Por favor completa todos los campos.');
                return;
            }
            alert('Contraseña restablecida con éxito. Puedes ingresar nuevamente.');
            this.cambiarVista('login');
            this.limpiarFormularios();
        },

        // =====================================================================
        // ✍️ EDICIÓN Y GESTIÓN DE CONTENIDO (PASOS PERDIDOS Y TRAZADOS)
        // =====================================================================
        abrirEditor(seccion) {
            this.seccionDestino = seccion;
            if (seccion === 'nueva_encuesta') {
                this.nuevaEncuestaDatos = { pregunta: '', categoria: '' };
            } else if (seccion === 'nuevo_trazado') {
                this.nuevoTrazadoDatos = { titulo: '', contenido: '', imagen: '' };
            } else if (seccion === 'pasos_perdidos') {
                this.nuevaTarjeta = { titulo: '', contenido: '', categoriaDestino: 'masoneria', enlace: '', textoEnlace: '', imagen: '' };
            }
            this.modalAbierto = true;
        },

        async procesarInyeccion() {
            if (this.seccionDestino === 'nueva_encuesta') {
                await this.guardarNuevaEncuesta();
            } else if (this.seccionDestino === 'nuevo_trazado') {
                await this.guardarNuevoTrazado();
            } else if (this.seccionDestino === 'pasos_perdidos') {
                await this.guardarNuevaTarjetaDinamica();
            }
        },

        async guardarNuevaTarjetaDinamica() {
            if (!this.nuevaTarjeta.titulo || !this.nuevaTarjeta.contenido) return;
            
            const catDestino = this.nuevaTarjeta.categoriaDestino; 
            const payload = {
                titulo: this.nuevaTarjeta.titulo,
                contenido: this.nuevaTarjeta.contenido,
                enlace: this.nuevaTarjeta.enlace || '',
                textoEnlace: this.nuevaTarjeta.textoEnlace || '',
                imagen: this.nuevaTarjeta.imagen || ''
            };
            
            await apiConnection.post(`/pasos-perdidos/${catDestino}`, payload);

            if (!this.tarjetasReactivas[catDestino]) {
                this.tarjetasReactivas[catDestino] = [];
            }
            this.tarjetasReactivas[catDestino].push(payload);
            this.modalAbierto = false;
        },

        async eliminarTarjeta(seccion, index) {
            await apiConnection.delete(`/pasos-perdidos/${seccion}/${index}`);
            this.tarjetasReactivas[seccion].splice(index, 1);
        },

        async guardarNuevoTrazado() {
            if (!this.nuevoTrazadoDatos.titulo || !this.nuevoTrazadoDatos.contenido) return;
            const hoy = new Date();
            const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
            
            let gradoAutor = this.usuarioLogueado.columna || this.usuarioLogueado.rol;
            if (['venerable_maestro', 'primer_vigilante', 'segundo_vigilante', 'trono_supremo'].includes(gradoAutor)) {
                gradoAutor = 'maestro';
            }

            const nuevoTrazado = {
                titulo: this.nuevoTrazadoDatos.titulo,
                contenido: this.nuevoTrazadoDatos.contenido,
                imagen: this.nuevoTrazadoDatos.imagen || '',
                autor: this.usuarioLogueado.nombre,
                gradoMinimo: gradoAutor,
                fecha: hoy.toLocaleDateString('es-ES', opciones)
            };

            await apiConnection.post('/trazados', nuevoTrazado);

            this.trazados.unshift(nuevoTrazado);
            this.modalAbierto = false;
            alert('Trazado publicado exitosamente en el Umbral.');
        },

        async eliminarTrazado(index) {
            await apiConnection.delete(`/trazados/${index}`);
            this.trazados.splice(index, 1);
            this.trazadoSeleccionado = null;
        },

        // =====================================================================
        // 🗳️ GESTIÓN DE BALOTAJES / ENCUESTAS
        // =====================================================================
        async guardarNuevaEncuesta() {
            if (!this.nuevaEncuestaDatos.pregunta || !this.nuevaEncuestaDatos.categoria) return;

            const nuevaEncuesta = {
                pregunta: this.nuevaEncuestaDatos.pregunta,
                categoria: this.nuevaEncuestaDatos.categoria,
                favor: 0,
                contra: 0
            };

            await apiConnection.post('/encuestas', nuevaEncuesta);
            this.encuestas.push(nuevaEncuesta);
            this.modalAbierto = false;
        },

        async eliminarEncuesta(index) {
            await apiConnection.delete(`/encuestas/${index}`);
            this.encuestas.splice(index, 1);
        },

        votar(index, opcion) {
            if (opcion === 'favor') {
                this.encuestas[index].favor++;
            } else if (opcion === 'contra') {
                this.encuestas[index].contra++;
            }
            apiConnection.put(`/encuestas/${index}`, this.encuestas[index]);
        },

        calcularPorcentaje(favor, contra) {
            const total = favor + contra;
            if (total === 0) return 50;
            return Math.round((favor / total) * 100);
        },

        // =====================================================================
        // 🚪 SOLICITUDES, CENSO Y PASES DIGITALES
        // =====================================================================
        enviarContacto() {
            if (!this.contactoDatos.nombre || !this.contactoDatos.correo) return;

            const nuevaSolicitud = {
                nombre: this.contactoDatos.nombre,
                cedula: this.contactoDatos.cedula,
                correo: this.contactoDatos.correo,
                telefono: this.contactoDatos.telefono,
                mensaje: this.contactoDatos.mensaje,
                estado: 'pendiente',
                codigo_generado: ''
            };

            this.toquesDePuerta.push(nuevaSolicitud);
            apiConnection.post('/toques-puerta', nuevaSolicitud);

            alert('Tu toque de puerta ha sido presentado ante la secretaría del Taller.');
            this.cambiarVista('pasos_perdidos');
            this.limpiarFormularios();
        },

        consignarPlanilla() {
            alert('Ficha de Censo consignada correctamente ante la secretaría.');
            this.cambiarVista('pasos_perdidos');
            this.limpiarFormularios();
        },

        generarCodigoPase() {
            const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
            const nuevoCodigo = `LAPIS-${numeroAleatorio}`;
            this.pasesGenerados.push({
                codigo: nuevoCodigo,
                rol: 'aprendiz',
                usado: false
            });
            alert(`Pase labrado con éxito: ${nuevoCodigo}`);
        },

        aprobarSolicitud(index) {
            const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
            const nuevoCodigo = `LAPIS-${numeroAleatorio}`;
            
            this.toquesDePuerta[index].estado = 'aprobado';
            this.toquesDePuerta[index].codigo_generado = nuevoCodigo;

            this.pasesGenerados.push({
                codigo: nuevoCodigo,
                rol: 'aprendiz',
                usado: false
            });

            alert(`Código generado para la solicitud: ${nuevoCodigo}`);
        },

        // =====================================================================
        // 👥 ADMINISTRACIÓN DE HERMANOS Y CHAT
        // =====================================================================
        cambiarRolHermano(index, nuevoRol) {
            if (!nuevoRol) return;
            this.hermanosTaller[index].rol = nuevoRol;
            apiConnection.put(`/hermanos/${index}`, this.hermanosTaller[index]);
        },

        ascenderAVenerable(index) {
            this.hermanosTaller[index].rol = 'venerable_maestro';
            apiConnection.put(`/hermanos/${index}`, this.hermanosTaller[index]);
        },

        removerVenerable(index) {
            this.hermanosTaller[index].rol = 'maestro';
            apiConnection.put(`/hermanos/${index}`, this.hermanosTaller[index]);
        },

        enviarMensajeChat() {
            if (!this.nuevoMensajeTexto.trim()) return;

            const msg = {
                autor: `[${this.usuarioLogueado.nombre}]:`,
                rol: this.usuarioLogueado.rol,
                texto: this.nuevoMensajeTexto.trim()
            };

            this.historialChat.push(msg);
            this.nuevoMensajeTexto = '';
        },

        limpiarFormularios() {
            this.credenciales = { usuario: '', password: '' };
            this.registroDatos = { usuario: '', password: '', password_confirm: '', nombre_real: '', rol: 'aprendiz', codigo_pase: '', respuesta_secreta: '' };
            this.recuperarDatos = { usuario: '', respuesta_secreta: '', nueva_password: '' };
            this.contactoDatos = { nombre: '', cedula: '', correo: '', telefono: '', profesion: '', redes: '', direccion: '', mensaje: '' };
            this.nuevoCenso = { nombre: '', cedula: '', correo: '', telefono: '', grado: 'Aprendiz', profesion: '', nacimiento: '', direccion: '', pregunta_mascota: '', pregunta_pelicula: '', pregunta_deporte: '' };
        }
    }));
});