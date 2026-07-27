// js/componentes.js
// Catálogo de Vistas Estructuradas para el Proyecto Lapis

window.VistasProyectoLapis = {
    // =====================================================================
    // 🏛️ CÁMARA 1: PASOS PERDIDOS (PORTAL PÚBLICO / BIENVENIDA)
    // =====================================================================
    pasos_perdidos: `
        <div class="space-y-8 animate-fade-in">
            <div class="text-center max-w-2xl mx-auto space-y-3">
                <span class="text-amber-500 font-serif tracking-widest text-xs uppercase block font-semibold">Bienvenido al Umbral Virtual</span>
                <h2 class="font-serif text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Sala de Pasos Perdidos</h2>
                <div class="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4"></div>
                <p class="text-slate-400 text-sm leading-relaxed pt-2">
                    Este espacio precede a los trabajos del Taller. Desde aquí, los Obreros de la escuadra pueden interactuar con las herramientas digitales oficiales, actualizar su censo institucional o solicitar acceso a las columnas internas.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div class="bg-slate-950/60 border border-slate-900 rounded-xl p-6 hover:border-amber-500/30 transition duration-300 group flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl text-amber-500">📋</span>
                            <span class="text-[9px] uppercase tracking-widest bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold">Obligatorio</span>
                        </div>
                        <h3 class="font-serif text-lg font-bold text-slate-200 group-hover:text-amber-400 transition mb-2">Censo Gremial 2026</h3>
                        <p class="text-slate-400 text-xs leading-relaxed mb-4">
                            Si eres miembro activo de la Logia, es tu deber actualizar tu ficha de datos socio-profesionales para mantener la regularidad en los registros del archivo secreto.
                        </p>
                    </div>
                    <button @click="cambiarVista('censo')" class="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition">
                        Actualizar Ficha
                    </button>
                </div>

                <div class="bg-slate-950/60 border border-slate-900 rounded-xl p-6 hover:border-amber-500/30 transition duration-300 group flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl text-amber-500">🔑</span>
                            <span class="text-[9px] uppercase tracking-widest bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold">Invitados</span>
                        </div>
                        <h3 class="font-serif text-lg font-bold text-slate-200 group-hover:text-amber-400 transition mb-2">Registrar Credenciales</h3>
                        <p class="text-slate-400 text-xs leading-relaxed mb-4">
                            ¿Has recibido un pase digital generado en las canteras? Utiliza tu código de autorización para consagrar tu usuario y clave privada de acceso al Taller.
                        </p>
                    </div>
                    <button @click="cambiarVista('registro')" class="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition">
                        Consagrar Cuenta
                    </button>
                </div>
            </div>

            <div x-data="{ abierto: null }" class="bg-slate-950/40 border border-slate-900 rounded-xl p-4 mt-6">
                <h4 class="font-serif text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 px-2">ℹ️ Protocolos de Información</h4>
                
                <div class="border-b border-slate-900 last:border-0">
                    <button @click="abierto = (abierto === 1 ? null : 1)" class="w-full text-left py-3 px-2 flex justify-between items-center text-xs font-semibold text-slate-300 hover:text-amber-400 transition">
                        <span>¿Quiénes pueden acceder al área interna del Taller?</span>
                        <span x-text="abierto === 1 ? '−' : '+'" class="text-amber-500 text-sm"></span>
                    </button>
                    <div x-show="abierto === 1" x-collapse class="px-2 pb-3 text-slate-400 text-xs leading-relaxed">
                        Solo los Hermanos debidamente registrados que posean un usuario activo y conozcan la palabra de pase vigente asignada a sus respectivas dignidades pueden trasponer el Umbral del Taller.
                    </div>
                </div>

                <div class="border-b border-slate-900 last:border-0">
                    <button @click="abierto = (abierto === 2 ? null : 2)" class="w-full text-left py-3 px-2 flex justify-between items-center text-xs font-semibold text-slate-300 hover:text-amber-400 transition">
                        <span>¿Qué ocurre si mis datos del censo están desactualizados?</span>
                        <span x-text="abierto === 2 ? '−' : '+'" class="text-amber-500 text-sm"></span>
                    </button>
                    <div x-show="abierto === 2" x-collapse class="px-2 pb-3 text-slate-400 text-xs leading-relaxed">
                        La falta de información actualizada podría congelar temporalmente la emisión automática de tus pases de acceso digital, requiriendo validación física ante la secretaría del Taller.
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between border-t border-slate-900 pt-6 text-[10px] tracking-widest text-slate-500 uppercase">
                <div>Estado de Red: <span class="text-emerald-500 font-bold">● Operativo</span></div>
                <div>Visitas al Portal: <span x-text="contadorVisitas" class="text-slate-300 font-bold"></span></div>
            </div>
        </div>
    `,

    // =====================================================================
    // 📋 CÁMARA 2: FORMULARIO DE CENSO GREMIAL
    // =====================================================================
    censo: `
        <div class="animate-fade-in space-y-6">
            <div class="flex items-center justify-between border-b border-slate-900 pb-4">
                <div>
                    <h2 class="font-serif text-xl font-bold text-slate-100">Ficha de Censo Anual</h2>
                    <p class="text-[10px] uppercase tracking-widest text-slate-500">Actualización de Registros Históricos</p>
                </div>
                <button @click="cambiarVista('pasos_perdidos')" class="text-xs text-slate-400 hover:text-amber-500 transition">✕ Cancelar</button>
            </div>

            <form @submit.prevent="consignarPlanilla()" class="space-y-6">
                <div class="bg-slate-950/40 p-4 rounded-xl border border-slate-900 space-y-4">
                    <h3 class="text-[10px] font-bold tracking-widest uppercase text-amber-500">1. Identidad Personal y Gremial</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Nombre Completo</label>
                            <input type="text" x-model="nuevoCenso.nombre" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="Ej. Juan Pérez">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Cédula de Identidad</label>
                            <input type="text" x-model="nuevoCenso.cedula" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="Ej. 12345678">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Grado Actual</label>
                            <select x-model="nuevoCenso.grado" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                                <option value="Aprendiz">Aprendiz</option>
                                <option value="Compañero">Compañero</option>
                                <option value="Maestro">Maestro</option>
                                <option value="Past Master">Past Master</option>
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Profesión u Oficio Profano</label>
                            <input type="text" x-model="nuevoCenso.profesion" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="Ej. Ingeniero de Software">
                        </div>
                    </div>
                </div>

                <div class="bg-slate-950/40 p-4 rounded-xl border border-slate-900 space-y-4">
                    <h3 class="text-[10px] font-bold tracking-widest uppercase text-amber-500">2. Canales de Comunicación</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Correo Electrónico</label>
                            <input type="email" x-model="nuevoCenso.correo" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="hermano@correo.com">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Teléfono de Contacto</label>
                            <input type="tel" x-model="nuevoCenso.telefono" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="+58 412-0000000">
                        </div>
                        <div class="sm:col-span-2 space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Dirección de Domicilio</label>
                            <input type="text" x-model="nuevoCenso.direccion" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="Ciudad, Estado, Municipio...">
                        </div>
                    </div>
                </div>

                <div class="bg-slate-950/40 p-4 rounded-xl border border-slate-900 space-y-4">
                    <h3 class="text-[10px] font-bold tracking-widest uppercase text-amber-500">3. Palabras de Reconocimiento y Seguridad</h3>
                    <p class="text-[11px] text-slate-400 leading-relaxed italic">Contesta estas breves preguntas profanas que servirán para validar tu identidad en caso de pérdida de claves.</p>
                    <div class="space-y-3">
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">¿Cuál fue el nombre de tu primera mascota?</label>
                            <input type="text" x-model="nuevoCenso.pregunta_mascota" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">¿Cuál es tu película favorita de la infancia?</label>
                            <input type="text" x-model="nuevoCenso.pregunta_pelicula" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                        </div>
                    </div>
                </div>

                <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest py-3 rounded-xl text-xs shadow-lg shadow-amber-500/10 transition duration-300">
                    🏛️ Tocar la Puerta del Archivo
                </button>
            </form>
        </div>
    `,

    // =====================================================================
    // 🔑 CÁMARA 3: REGISTRO MEDIANTE CÓDIGO DE PASE
    // =====================================================================
    registro: `
        <div class="animate-fade-in max-w-md mx-auto space-y-6 py-4">
            <div class="text-center space-y-2">
                <h2 class="font-serif text-2xl font-bold text-slate-100">Consagrar Nueva Cuenta</h2>
                <p class="text-[10px] uppercase tracking-widest text-slate-500">Usa tu Código de Invitación Autorizado</p>
                <div class="h-0.5 w-12 bg-amber-500 mx-auto mt-2"></div>
            </div>

            <form @submit.prevent="registrarUsuario()" class="bg-slate-950/50 border border-slate-900 p-6 rounded-2xl space-y-4 shadow-xl">
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 tracking-wider">Código de Pase Digital</label>
                    <input type="text" x-model="registroDatos.codigo_pase" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-amber-400 font-mono font-bold uppercase text-center focus:outline-none focus:border-amber-500 tracking-widest transition" placeholder="LAPIS-XXXX">
                </div>
                
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 tracking-wider">Nombre Completo Institucional</label>
                    <input type="text" x-model="registroDatos.nombre_real" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="Q:. H:. Nombre Apellido">
                </div>

                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 tracking-wider">Nombre de Usuario Único</label>
                    <input type="text" x-model="registroDatos.usuario" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="ej. hsecretario">
                </div>

                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 tracking-wider">Clave Privada</label>
                    <input type="password" x-model="registroDatos.password" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="••••••••">
                </div>

                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 tracking-wider">Confirmar Clave Privada</label>
                    <input type="password" x-model="registroDatos.password_confirm" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="••••••••">
                </div>

                <button type="submit" class="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold uppercase tracking-widest py-2.5 rounded-lg text-xs transition duration-300 mt-2">
                    Validar e Ingresar
                </button>
            </form>

            <p class="text-[10px] text-center text-slate-500 uppercase tracking-wide">
                ¿Ya posees una cuenta activa? <span @click="cambiarVista('login')" class="text-amber-500 cursor-pointer hover:underline">Cruza el Umbral aquí</span>
            </p>
        </div>
    `,

    // =====================================================================
    // 🚪 CÁMARA 4: ACCESO E IDENTIFICACIÓN (LOGIN)
    // =====================================================================
    login: `
        <div class="animate-fade-in max-w-sm mx-auto space-y-6 py-6">
            <div class="text-center space-y-2">
                <div class="inline-flex w-12 h-12 items-center justify-center rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-400 text-xl mb-1">🔐</div>
                <h2 class="font-serif text-2xl font-bold text-slate-100">Traspasar el Umbral</h2>
                <p class="text-[10px] uppercase tracking-widest text-slate-500">Identificación Oficial del Taller</p>
            </div>

            <form @submit.prevent="iniciarSesion()" class="bg-slate-950/50 border border-slate-900 p-6 rounded-2xl space-y-4 shadow-2xl">
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 font-medium tracking-wider">Identidad / Usuario</label>
                    <input type="text" x-model="credenciales.usuario" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="ej. venerable">
                </div>

                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 font-medium tracking-wider">Palabra de Pase Oculta</label>
                    <input type="password" x-model="credenciales.password" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition" placeholder="••••••••">
                </div>

                <div class="text-right">
                    <button type="button" @click="cambiarVista('recuperar_password')" class="text-[11px] text-amber-500/80 hover:text-amber-400 underline transition">
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>

                <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest py-2.5 rounded-lg text-xs shadow-md shadow-amber-500/5 transition duration-300 mt-2">
                    Iniciar Trabajos 📐
                </button>
            </form>

            <div class="bg-slate-950/30 border border-slate-900/60 p-3 rounded-lg text-[10px] text-slate-500 leading-relaxed text-center">
                <span class="text-amber-500/80 font-bold block mb-0.5">🔑 CREDENCIALES DE PRUEBA:</span>
                Usuario: <code class="text-slate-300 font-mono">venerable</code> | Clave: <code class="text-slate-300 font-mono">lapis123</code>
            </div>
        </div>
    `,

    // =====================================================================
    // 🚪 CÁMARA 5: SOLICITUD DE CONTACTO (TOCAR PUERTA)
    // =====================================================================
    tocar_puerta: `
        <div class="space-y-6 max-w-2xl mx-auto">
            <div class="flex items-center justify-between border-b border-slate-900 pb-4">
                <div>
                    <h2 class="font-serif text-xl font-bold text-slate-100">Tocar la Puerta del Taller</h2>
                    <p class="text-[10px] uppercase tracking-widest text-slate-500">Solicitud Formal de Contacto e Ingreso</p>
                </div>
                <button @click="cambiarVista('pasos_perdidos')" class="text-xs text-slate-400 hover:text-amber-500 transition">✕ Cerrar</button>
            </div>
            <form @submit.prevent="enviarContacto()" class="bg-slate-950/50 border border-slate-900 p-6 rounded-xl space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Nombre Y Apellido</label>
                        <input type="text" x-model="contactoDatos.nombre" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Cédula de Identidad</label>
                        <input type="text" x-model="contactoDatos.cedula" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Correo Electrónico</label>
                        <input type="email" x-model="contactoDatos.correo" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Teléfono</label>
                        <input type="tel" x-model="contactoDatos.telefono" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Profesión</label>
                        <input type="text" x-model="contactoDatos.profesion" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Redes Sociales</label>
                        <input type="text" x-model="contactoDatos.redes" placeholder="@usuario" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 font-medium">Dirección de Habitación</label>
                    <input type="text" x-model="contactoDatos.direccion" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 font-medium">Motivo de la Solicitud</label>
                    <textarea x-model="contactoDatos.mensaje" rows="4" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition resize-none" placeholder="Expresa detalladamente aquí los motivos..."></textarea>
                </div>
                <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest py-3 rounded-lg text-xs transition shadow-lg">
                    🏛️ Presentar Toque en la Puerta del Taller
                </button>
            </form>
        </div>
    `,

    // =====================================================================
    // 🔑 CÁMARA 6: REGISTRO RÁPIDO CON PALABRA DE PASE
    // =====================================================================
    palabra_pase: `
        <div class="max-w-xl mx-auto space-y-6">
            <div class="flex items-center justify-between border-b border-slate-900 pb-4">
                <div>
                    <h2 class="font-serif text-xl font-bold text-slate-100">Palabra de Pase</h2>
                    <p class="text-[10px] uppercase tracking-widest text-slate-500">Registro de Nuevo Miembro Autorizado</p>
                </div>
                <button @click="cambiarVista('pasos_perdidos')" class="text-xs text-slate-400 hover:text-amber-500 transition">✕ Cancelar</button>
            </div>
            <form @submit.prevent="registrarUsuario()" class="bg-slate-950/50 border border-slate-900 p-6 rounded-xl space-y-4 shadow-xl">
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 font-medium tracking-wider">Código de Autorización</label>
                    <input type="text" x-model="registroDatos.codigo_pase" placeholder="LAPIS-XXXX" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-amber-400 font-mono text-center tracking-widest focus:outline-none focus:border-amber-500 transition">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 font-medium">Nombre de Usuario</label>
                    <input type="text" x-model="registroDatos.usuario" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Contraseña</label>
                        <input type="password" x-model="registroDatos.password" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Confirmar Contraseña</label>
                        <input type="password" x-model="registroDatos.password_confirm" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                </div>
                <div class="pt-2 border-t border-slate-900 space-y-3">
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Tu Respuesta Oculta (Película Favorita)</label>
                        <input type="text" x-model="registroDatos.respuesta_secreta" required placeholder="Escribe tu respuesta aquí" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                </div>
                <button type="submit" class="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold uppercase tracking-widest py-3 rounded-lg text-xs transition shadow-lg mt-2">
                    Consagrar Registro y Cuenta
                </button>
            </form>
        </div>
    `,

    // =====================================================================
    // 🔮 CÁMARA 7: EL UMBRAL (VISTA INTERNA)
    // =====================================================================
    umbral: `
        <div>
            <template x-if="!sesionActiva">
                <div class="max-w-sm mx-auto space-y-6 py-4">
                    <div class="text-center space-y-3 flex flex-col items-center">
                        <img src="frontend/logo.png" alt="Emblema del Taller" class="w-24 h-24 object-contain filter drop-shadow-lg hover:scale-105 transition-transform">
                        <div>
                            <h2 class="font-serif text-2xl font-bold text-slate-100">El Umbral</h2>
                            <p class="text-[10px] uppercase tracking-widest text-slate-500">Identificación Oficial y Apertura de Trabajos</p>
                        </div>
                    </div>
                    <form @submit.prevent="iniciarSesion()" class="bg-slate-950/50 border border-slate-900 p-6 rounded-2xl space-y-4">
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Identidad / Usuario</label>
                            <input type="text" x-model="credenciales.usuario" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[10px] uppercase text-slate-400 font-medium">Palabra Clave</label>
                            <input type="password" x-model="credenciales.password" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                        </div>
                        <div class="text-right">
                            <button type="button" @click="cambiarVista('recuperar_password')" class="text-[11px] text-amber-500/80 hover:text-amber-400 underline transition">
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest py-2.5 rounded-lg text-xs transition">
                            Ingresar al Taller 📐
                        </button>
                    </form>
                </div>
            </template>

            <template x-if="sesionActiva">
                <div class="space-y-8 py-4">
                    <div class="border-b border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                            <h2 class="font-serif text-2xl font-bold text-slate-100">Trabajos del Umbral</h2>
                            <p class="text-[10px] uppercase tracking-widest text-slate-400" x-text="'Cámara de: ' + usuarioLogueado.nombre + ' (' + usuarioLogueado.rol_etiqueta + ')'"></p>
                        </div>
                        <button @click="abrirEditor('nuevo_trazado')" class="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg transition shadow-lg">
                            ✍️ Publicar Trazado
                        </button>
                    </div>

                    <div class="space-y-8">
                        <div class="space-y-4">
                            <div class="flex items-center space-x-2 border-b border-slate-900 pb-2">
                                <span class="text-base">🏛️</span>
                                <h3 class="font-serif text-base font-bold text-amber-400 uppercase tracking-wider">Contenido Informativo (Pasos Perdidos)</h3>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <template x-for="(item, index) in tarjetasReactivas.masoneria" :key="'umb-mas-'+index">
                                    <div @click="trazadoSeleccionado = item" class="bg-slate-900/60 border border-slate-800 p-4 rounded-lg relative group/card cursor-pointer hover:border-amber-500/40 transition">
                                        <span class="text-[9px] uppercase font-mono text-amber-500/70 block mb-1">Categoría: Masonería</span>
                                        <template x-if="item.imagen">
                                            <img :src="item.imagen" alt="Imagen Masonería" class="w-full h-28 object-cover rounded mb-2 border border-slate-800">
                                        </template>
                                        <h4 class="font-bold text-slate-200 uppercase mb-2 tracking-wide" x-text="item.titulo"></h4>
                                        <p class="text-slate-400 leading-relaxed line-clamp-3" x-text="item.contenido"></p>
                                        <template x-if="tienePermisoEdicionPasosPerdidos()">
                                            <button @click.stop="eliminarTarjeta('masoneria', index)" class="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 bg-red-950 text-red-400 border border-red-900/50 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold transition hover:bg-red-900 hover:text-white">Eliminar</button>
                                        </template>
                                    </div>
                                </template>
                                <template x-for="(item, index) in tarjetasReactivas.educacion" :key="'umb-edu-'+index">
                                    <div @click="trazadoSeleccionado = item" class="bg-slate-900/60 border border-slate-800 p-4 rounded-lg relative group/card flex flex-col justify-between cursor-pointer hover:border-amber-500/40 transition">
                                        <div>
                                            <span class="text-[9px] uppercase font-mono text-blue-400/70 block mb-1">Categoría: Educación</span>
                                            <template x-if="item.imagen">
                                                <img :src="item.imagen" alt="Imagen Educación" class="w-full h-28 object-cover rounded mb-2 border border-slate-800">
                                            </template>
                                            <h4 class="font-bold text-slate-200 uppercase mb-2 tracking-wide" x-text="item.titulo"></h4>
                                            <p class="text-slate-400 leading-relaxed line-clamp-3" x-text="item.contenido"></p>
                                        </div>
                                        <template x-if="item.enlace">
                                            <span class="text-amber-500/80 hover:text-amber-400 underline mt-2 block font-medium" x-text="item.textoEnlace"></span>
                                        </template>
                                        <template x-if="tienePermisoEdicionPasosPerdidos()">
                                            <button @click.stop="eliminarTarjeta('educacion', index)" class="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 bg-red-950 text-red-400 border border-red-900/50 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold transition hover:bg-red-900 hover:text-white">Eliminar</button>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="flex items-center space-x-2 border-b border-slate-900 pb-2">
                                <span class="text-base">✍️</span>
                                <h3 class="font-serif text-base font-bold text-amber-400 uppercase tracking-wider">Trazados Grabados en el Umbral</h3>
                            </div>
                            <div class="grid grid-cols-1 gap-4 text-xs">
                                <template x-for="(trazado, index) in trazadosFiltrados" :key="'traz-'+index">
                                    <div @click="trazadoSeleccionado = trazado" class="bg-slate-950/60 border border-slate-900 p-5 rounded-xl space-y-2 relative cursor-pointer hover:border-amber-500/40 transition group/trazado shadow-md hover:shadow-xl">
                                        <template x-if="trazado.imagen">
                                            <img :src="trazado.imagen" alt="Imagen Trazado" class="w-full h-40 object-cover rounded-lg mb-2 border border-slate-800">
                                        </template>
                                        <div class="flex justify-between items-center text-[10px] uppercase font-mono text-slate-500">
                                            <span x-text="'Autor: ' + trazado.autor"></span>
                                            <div class="flex items-center gap-2">
                                                <span class="opacity-0 group-hover/trazado:opacity-100 text-amber-400 text-[9px] uppercase font-bold transition tracking-wider">📖 Lectura Profunda</span>
                                                <span x-text="trazado.fecha"></span>
                                            </div>
                                        </div>
                                        <h4 class="font-serif text-sm font-bold text-slate-200 group-hover:text-amber-400 transition" x-text="trazado.titulo"></h4>
                                        <p class="text-slate-400 leading-relaxed whitespace-pre-line line-clamp-3 group-hover:text-slate-300 transition" x-text="trazado.contenido"></p>
                                        
                                        <template x-if="tienePermisoEliminarTrazados()">
                                            <button @click.stop="eliminarTrazado(trazado.idIndex)" class="mt-2 bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-900/60 px-2 py-1 rounded text-[9px] uppercase font-bold transition">
                                                🗑️ Eliminar Trazado
                                            </button>
                                        </template>
                                    </div>
                                </template>
                                <template x-if="trazadosFiltrados.length === 0">
                                    <p class="text-slate-500 italic text-center py-2">No hay trazados visibles para tu grado en este momento.</p>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    `,

    // =====================================================================
    // 🔄 CÁMARA 8: RECUPERACIÓN DE CONTRASEÑA
    // =====================================================================
    recuperar_password: `
        <div class="max-w-md mx-auto space-y-6">
            <div class="flex items-center justify-between border-b border-slate-900 pb-4">
                <div>
                    <h2 class="font-serif text-xl font-bold text-slate-100">Restaurar Credenciales</h2>
                    <p class="text-[10px] uppercase tracking-widest text-slate-500">Reemplazo Seguro de Palabra Clave</p>
                </div>
                <button @click="cambiarVista('umbral')" class="text-xs text-slate-400 hover:text-amber-500 transition">✕ Volver</button>
            </div>
            <form @submit.prevent="restablecerPassword()" class="bg-slate-950/50 border border-slate-900 p-6 rounded-xl space-y-4 shadow-xl">
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 font-medium">Ingresa tu Usuario</label>
                    <input type="text" x-model="recuperarDatos.usuario" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] uppercase text-slate-400 font-medium">Tu Respuesta Archivada (Película Favorita)</label>
                    <input type="text" x-model="recuperarDatos.respuesta_secreta" required placeholder="Verificar identidad" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                </div>
                <div class="pt-2 border-t border-slate-900 space-y-3">
                    <div class="space-y-1">
                        <label class="text-[10px] uppercase text-slate-400 font-medium">Nueva Contraseña</label>
                        <input type="password" x-model="recuperarDatos.nueva_password" required class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    </div>
                </div>
                <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest py-2.5 rounded-lg text-xs transition shadow-lg">
                    Reemplazar Contraseña e Ir al Umbral
                </button>
            </form>
        </div>
    `,

    // =====================================================================
    // 📜 CÁMARA 9: INTRANET DE ADMINISTRACIÓN (EL TALLER INTERNO)
    // =====================================================================
    admin: `
        <div class="space-y-6">
            <div class="bg-gradient-to-r from-slate-950 via-slate-950 to-amber-950/20 border border-slate-900 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 class="font-serif text-xl font-bold text-slate-100" x-text="'Cámara Interna — ' + (usuarioLogueado?.nombre || 'Oficial')"></h2>
                    <p class="text-[10px] uppercase tracking-widest text-slate-500" x-text="'Rol Activo: ' + usuarioLogueado?.rol_etiqueta"></p>
                </div>
                <button @click="generarCodigoPase()" class="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow transition duration-300">
                    ⚒️ Labrar Pase Digital
                </button>
            </div>

            <!-- TABLA DE PASES GENERADOS -->
            <div class="space-y-3">
                <h3 class="font-serif text-sm font-bold text-slate-300 uppercase tracking-wider">Libro de Registro de Pases Digitales</h3>
                <div class="overflow-x-auto bg-slate-950/60 border border-slate-900 rounded-xl shadow-lg">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-slate-900 bg-slate-950 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <th class="p-4">Palabra / Token</th>
                                <th class="p-4">Columna Destino</th>
                                <th class="p-4 text-center">Estado de Uso</th>
                            </tr>
                        </thead>
                        <tbody class="text-xs text-slate-300 font-mono">
                            <template x-for="pase in pasesGenerados" :key="pase.codigo">
                                <tr class="border-b border-slate-900/50 hover:bg-slate-900/20 transition">
                                    <td class="p-4 font-bold text-amber-400 tracking-wide" x-text="pase.codigo"></td>
                                    <td class="p-4 uppercase text-slate-400 text-[11px]" x-text="pase.rol"></td>
                                    <td class="p-4 text-center">
                                        <span :class="pase.usado ? 'bg-red-950 text-red-400 border-red-900/30' : 'bg-emerald-950 text-emerald-400 border-emerald-900/30'" class="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold border" x-text="pase.usado ? 'Consagrado' : 'Disponible'"></span>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- CANTERA DE MIEMBROS -->
            <template x-if="['trono_supremo', 'venerable_maestro'].includes(usuarioLogueado?.rol)">
                <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
                    <div class="border-b border-slate-800 pb-2 flex items-center space-x-2">
                        <span class="text-base">👥</span>
                        <div>
                            <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400">Cantera de Miembros Registrados</h3>
                            <p class="text-[10px] text-slate-400">Usa los selectores para cambiar el rol estructural de cada hermano de forma inmediata.</p>
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="border-b border-slate-800 text-[10px] uppercase text-slate-500 font-mono">
                                    <th class="py-2 px-3">Hermano / Cuenta</th>
                                    <th class="py-2 px-3">Rol Actual</th>
                                    <th class="py-2 px-3 text-right">Asignar Nuevo Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template x-for="(miembro, idx) in hermanosTaller" :key="idx">
                                    <tr class="border-b border-slate-900/60 bg-slate-950/20 hover:bg-slate-950/60 transition">
                                        <td class="py-3 px-3 font-medium text-slate-200" x-text="miembro.nombre"></td>
                                        <td class="py-3 px-3">
                                            <span :class="{
                                                'bg-amber-500/10 text-amber-400 border-amber-500/30': miembro.rol === 'venerable_maestro',
                                                'bg-blue-500/10 text-blue-400 border-blue-500/20': ['primer_vigilante', 'segundo_vigilante'].includes(miembro.rol),
                                                'bg-slate-800 text-slate-400 border-slate-700': ['maestro', 'companero', 'aprendiz'].includes(miembro.rol)
                                            }" class="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded border" x-text="miembro.rol.replace('_', ' ')"></span>
                                        </td>
                                        <td class="py-3 px-3 text-right">
                                            <template x-if="miembro.rol === 'venerable_maestro'">
                                                <div class="flex justify-end gap-1 items-center">
                                                    <template x-if="usuarioLogueado?.rol === 'trono_supremo'">
                                                        <button @click="removerVenerable(idx)" class="bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-900/50 px-2 py-1 rounded text-[10px] font-bold uppercase transition">Quitar Trono</button>
                                                    </template>
                                                    <template x-if="usuarioLogueado?.rol !== 'trono_supremo'">
                                                        <span class="text-[9px] text-slate-600 uppercase font-mono tracking-widest">Inviolable</span>
                                                    </template>
                                                </div>
                                            </template>

                                            <template x-if="miembro.rol !== 'venerable_maestro' && miembro.rol !== 'trono_supremo'">
                                                <div class="flex justify-end gap-1 items-center">
                                                    <template x-if="usuarioLogueado?.rol === 'trono_supremo'">
                                                        <button @click="ascenderAVenerable(idx)" class="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase hover:bg-amber-400 transition mr-2">Hacer VM</button>
                                                    </template>
                                                    
                                                    <select @change="cambiarRolHermano(idx, $event.target.value)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-amber-500 font-medium">
                                                        <option value="" selected disabled>Seleccionar Rol...</option>
                                                        <option value="primer_vigilante">1er Vigilante</option>
                                                        <option value="segundo_vigilante">2do Vigilante</option>
                                                        <option value="maestro">Maestro</option>
                                                        <option value="companero">Compañero</option>
                                                        <option value="aprendiz">Aprendiz</option>
                                                    </select>
                                                </div>
                                            </template>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>

            <!-- BALOTAJES Y VOTACIONES -->
            <template x-if="!['aprendiz', 'companero'].includes(usuarioLogueado?.rol)">
                <div class="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-4">
                    <div class="flex justify-between items-center border-b border-slate-900 pb-2">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400">🗳️ Balotajes y Votaciones del Taller</h3>
                        <template x-if="['trono_supremo', 'venerable_maestro'].includes(usuarioLogueado?.rol)">
                            <button @click="abrirEditor('nueva_encuesta')" class="bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded transition border border-amber-500/30">
                                + Diseñar Balotaje
                            </button>
                        </template>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <template x-for="(encuesta, index) in encuestas" :key="index">
                            <div class="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3 flex flex-col justify-between relative group/voto">
                                <div>
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="text-[9px] uppercase font-mono tracking-wider bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20" x-text="encuesta.categoria"></span>
                                        <span class="text-[10px] text-slate-500 font-medium" x-text="'Total: ' + (encuesta.favor + encuesta.contra) + ' votos'"></span>
                                    </div>
                                    <h4 class="text-xs font-bold text-slate-200 leading-snug" x-text="encuesta.pregunta"></h4>
                                </div>

                                <div class="space-y-1.5 pt-2">
                                    <div class="w-full bg-slate-950 h-2 rounded overflow-hidden flex border border-slate-900">
                                        <div class="bg-emerald-500 transition-all duration-500" :style="'width: ' + calcularPorcentaje(encuesta.favor, encuesta.contra) + '%'"></div>
                                        <div class="bg-red-500 transition-all duration-500" :style="'width: ' + (100 - calcularPorcentaje(encuesta.favor, encuesta.contra)) + '%'"></div>
                                    </div>
                                    <div class="flex justify-between text-[10px] font-mono text-slate-400">
                                        <span class="text-emerald-400" x-text="'A favor: ' + encuesta.favor + ' (' + calcularPorcentaje(encuesta.favor, encuesta.contra) + '%)'"></span>
                                        <span class="text-red-400" x-text="'En contra: ' + encuesta.contra + ' (' + (100 - calcularPorcentaje(encuesta.favor, encuesta.contra)) + '%)'"></span>
                                    </div>
                                </div>

                                <div class="flex gap-2 pt-2 border-t border-slate-950">
                                    <button @click="votar(index, 'favor')" class="flex-1 bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-900/60 text-emerald-400 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition">👍 A Favor</button>
                                    <button @click="votar(index, 'contra')" class="flex-1 bg-red-950/40 hover:bg-red-900 border border-red-900/60 text-red-400 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition">👎 En Contra</button>
                                </div>

                                <template x-if="['trono_supremo', 'venerable_maestro'].includes(usuarioLogueado?.rol)">
                                    <button @click="eliminarEncuesta(index)" class="absolute -top-1 -right-1 opacity-0 group-hover/voto:opacity-100 bg-red-950 text-red-400 border border-red-900/40 px-1 py-0.5 rounded text-[8px] font-bold uppercase transition hover:bg-red-950">Eliminar</button>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </template>

            <!-- SOLICITUDES PENDIENTES (TOQUES DE PUERTA) -->
            <template x-if="['trono_supremo', 'venerable_maestro', 'primer_vigilante', 'segundo_vigilante'].includes(usuarioLogueado?.rol)">
                <div class="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-3">
                    <div class="border-b border-slate-900 pb-2">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400">🚪 Solicitudes Pendientes (Toques de Puerta)</h3>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="border-b border-slate-800 text-[10px] uppercase text-slate-500 font-mono">
                                    <th class="py-2 px-3">Nombre / Cédula</th>
                                    <th class="py-2 px-3">Contacto / Correo</th>
                                    <th class="py-2 px-3">Motivo / Mensaje</th>
                                    <th class="py-2 px-3 text-right">Acción Autorizada</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template x-for="(solicitud, index) in toquesDePuerta" :key="index">
                                    <tr class="border-b border-slate-900 bg-slate-900/20 hover:bg-slate-900/40 transition">
                                        <td class="py-3 px-3">
                                            <div class="font-bold text-slate-200" x-text="solicitud.nombre"></div>
                                            <div class="text-[10px] text-slate-500 font-mono" x-text="solicitud.cedula"></div>
                                        </td>
                                        <td class="py-3 px-3 text-slate-400">
                                            <div x-text="solicitud.correo"></div>
                                            <div class="text-[10px]" x-text="solicitud.telefono"></div>
                                        </td>
                                        <td class="py-3 px-3 text-slate-400 max-w-xs truncate" :title="solicitud.mensaje" x-text="solicitud.mensaje"></td>
                                        <td class="py-3 px-3 text-right">
                                            <template x-if="solicitud.estado === 'pendiente'">
                                                <button @click="aprobarSolicitud(index)" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded transition shadow-md">
                                                    ⚒️ Labrar Código
                                                </button>
                                            </template>
                                            <template x-if="solicitud.estado === 'aprobado'">
                                                <span class="text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20" x-text="'Aprobado: ' + solicitud.codigo_generado"></span>
                                            </template>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>

            <!-- CHAT SELECTIVO MULTIGRADO -->
            <div class="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-4">
                <div class="border-b border-slate-900 pb-2">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400">Canal de Comunicación Multigrado</h3>
                </div>
                
                <div class="bg-slate-950/80 border border-slate-900 rounded-lg p-4 h-48 overflow-y-auto space-y-3 font-mono text-xs">
                    <template x-for="(msg, i) in historialChat" :key="i">
                        <div class="flex items-start gap-2">
                            <span class="text-amber-500 font-bold shrink-0" x-text="msg.autor"></span>
                            <span class="text-slate-300 break-words" x-text="msg.texto"></span>
                        </div>
                    </template>
                </div>

                <form @submit.prevent="enviarMensajeChat()" class="flex gap-2">
                    <input type="text" x-model="nuevoMensajeTexto" placeholder="Escribe un mensaje en el canal..." class="flex-grow bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                    <button type="submit" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    `
};