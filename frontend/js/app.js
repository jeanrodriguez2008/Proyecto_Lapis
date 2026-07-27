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
        
        credenciales: {
            usuario: '',
            password: ''
        },
        registroDatos: {
            usuario: '',
            password: '',
            password_confirm: '',
            nombre_real: '',
            rol: 'aprendiz',
            codigo_pase: '',
            respuesta_secreta: ''
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

        pasesGenerados: [
            { codigo: 'LAPIS-777X', rol: 'maestro', usado: false },
            { codigo: 'LAPIS-333A', rol: 'aprendiz', usado: true },
            { codigo: 'LAPIS-555B', rol: 'companero', usado: false }
        ],

        toquesDePuerta: [
            { nombre: 'Carlos Mendoza', cedula: 'V-14.340.112', correo: 'carlos.m@mail.com', telefono: '0412-5551234', mensaje: 'Deseo ingresar para expandir mi formación ética.', estado: 'pendiente', codigo_generado: '' }
        ],

        // =====================================================================
        // 🔄 MÉTODOS Y MANEJADORES DE FLUJO
        // =====================================================================
        
        cambiarVista(nuevaVista) {
            this.vistaActual = nuevaVista;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

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

        registrarUsuario() {
            const paseEncontrado = this.pasesGenerados.find(
                p => p.codigo === this.registroDatos.codigo_pase.toUpperCase() && !p.usado
            );

            if (paseEncontrado) {
                paseEncontrado.usado = true;
                alert(`Registro consagrado con éxito. Bienvenido al Taller.`);
                
                this.usuarioLogueado = {
                    nombre: this.registroDatos.usuario,
                    rol: 'aprendiz',
                    rol_etiqueta: 'Aprendiz'
                };
                this.sesionActiva = true;
                this.cambiarVista('umbral');
                this.limpiarFormularios();
            } else {
                alert('La palabra de pase o código introducido es inválido o ya ha sido utilizado.');
            }
        },

        cerrarSesion() {
            this.sesionActiva = false;
            this.usuarioLogueado = null;
            this.cambiarVista('pasos_perdidos');
        },

        limpiarFormularios() {
            this.credenciales = { usuario: '', password: '' };
            this.registroDatos = { usuario: '', password: '', password_confirm: '', nombre_real: '', rol: 'aprendiz', codigo_pase: '', respuesta_secreta: '' };
            this.nuevoCenso = { nombre: '', cedula: '', correo: '', telefono: '', grado: 'Aprendiz', profesion: '', nacimiento: '', direccion: '', pregunta_mascota: '', pregunta_pelicula: '', pregunta_deporte: '' };
        }
    }));
});