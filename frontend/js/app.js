// js/app.js
// Lógica de Control y Estados Globales para el Proyecto Lapis

document.addEventListener('alpine:init', () => {
    Alpine.data('appLapis', () => ({
        // =====================================================================
        // 📊 ESTADOS GLOBALES DE LA APLICACIÓN
        // =====================================================================
        vistaActual: 'pasos_perdidos', // Vista inicial por defecto
        sesionActiva: false,           // Control de acceso al taller (Intranet)
        contadorVisitas: 357,          // Contador simulado para Pasos Perdidos
        usuarioLogueado: null,         // Almacena los datos del usuario activo
        
        // Modelos de datos para los distintos formularios del sistema
        credenciales: {
            usuario: '',
            password: ''
        },
        registroDatos: {
            usuario: '',
            password: '',
            nombre_real: '',
            rol: 'aprendiz',
            codigo_pase: ''
        },
        nuevoCenso: {
            nombre: '',
            cedula: '',
            correo: '',
            telefono: '',
            grado: 'Aprendiz',
            profesion: '',
            nacimiento: '',
            direccion: '',
            pregunta_mascota: '',
            pregunta_pelicula: '',
            pregunta_deporte: ''
        },

        // Registro base de pases emitidos en el taller (Simulación de persistencia)
        pasesGenerados: [
            { codigo: 'LAPIS-777X', rol: 'maestro', usado: false },
            { codigo: 'LAPIS-333A', rol: 'aprendiz', usado: true },
            { codigo: 'LAPIS-555B', rol: 'companero', usado: false }
        ],

        // =====================================================================
        // 🔄 MÉTODOS Y MANEJADORES DE FLUJO
        // =====================================================================
        
        // Cambiar entre las diferentes vistas de componentes.js
        cambiarVista(nuevaVista) {
            this.vistaActual = nuevaVista;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        // Procesar el ingreso formal a la Intranet (Pasar el Umbral)
        iniciarSesion() {
            // Validación de credenciales de prueba
            if (this.credenciales.usuario === 'venerable' && this.credenciales.password === 'lapis123') {
                this.usuarioLogueado = {
                    nombre: 'Venerable Maestro',
                    rol: 'venerable_maestro'
                };
                this.sesionActiva = true;
                this.cambiarVista('admin');
                this.limpiarFormularios();
            } else if (this.credenciales.usuario === 'trono' && this.credenciales.password === 'tech999') {
                this.usuarioLogueado = {
                    nombre: 'Oficial del Trono',
                    rol: 'trono'
                };
                this.sesionActiva = true;
                this.cambiarVista('admin');
                this.limpiarFormularios();
            } else {
                alert('Las credenciales introducidas no corresponden a ninguna dignidad registrada en el taller.');
            }
        },

        // Registrar un nuevo usuario utilizando un código de pase válido
        registrarUsuario() {
            // Verificar si el código de pase existe y no ha sido usado
            const paseEncontrado = this.pasesGenerados.find(
                p => p.codigo === this.registroDatos.codigo_pase.toUpperCase() && !p.usado
            );

            if (paseEncontrado) {
                paseEncontrado.usado = true;
                alert(`Registro consagrado con éxito. Bienvenido a la columna de los ${this.registroDatos.rol}s, Q:. H:. ${this.registroDatos.nombre_real}.`);
                
                // Forzar inicio de sesión automático con el rol asignado
                this.usuarioLogueado = {
                    nombre: this.registroDatos.nombre_real,
                    rol: this.registroDatos.rol
                };
                this.sesionActiva = true;
                this.cambiarVista('admin');
                this.limpiarFormularios();
            } else {
                alert('La palabra de pase o código introducido es inválido o ya ha sido utilizado en un registro previo.');
            }
        },

        // Guardar los datos del formulario de censo (Tocar puerta)
        consignarPlanilla() {
            alert(`Planilla de censo del Obrero ${this.nuevoCenso.nombre} recibida en el servidor. Los Oficiales de la Logia evaluarán tus datos.`);
            this.cambiarVista('pasos_perdidos');
            this.limpiarFormularios();
        },

        // Generar dinámicamente un código de pase aleatorio (Solo para Dignidades)
        generarCodigoPase() {
            const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
            const nuevoCodigo = `LAPIS-${numeroAleatorio}X`;
            
            this.pasesGenerados.push({
                codigo: nuevoCodigo,
                rol: 'aprendiz',
                usado: false
            });
            
            alert(`Nueva palabra de pase generada en las canteras: ${nuevoCodigo}`);
        },

        // Cerrar la sesión y retornar al espacio público
        cerrarSesion() {
            this.sesionActiva = false;
            this.usuarioLogueado = null;
            this.cambiarVista('pasos_perdidos');
        },

        // Utilidad para limpiar los datos temporales de los inputs
        limpiarFormularios() {
            this.credenciales = { usuario: '', password: '' };
            this.registroDatos = { usuario: '', password: '', nombre_real: '', rol: 'aprendiz', codigo_pase: '' };
            this.nuevoCenso = { nombre: '', cedula: '', correo: '', telefono: '', grado: 'Aprendiz', profesion: '', nacimiento: '', direccion: '', pregunta_mascota: '', pregunta_pelicula: '', pregunta_deporte: '' };
        }
    }));
});