// js/componentes.js
// Catálogo de Vistas Estructuradas para el Proyecto Lapis

window.VistasProyectoLapis = {
    // =====================================================================
    // 🏛️ CÁMARA 1: PASOS PERDIDOS (PORTAL PÚBLICO / BIENVENIDA)
    // =====================================================================
    pasos_perdidos: `
        <div class="space-y-8 animate-fade-in">
            <!-- Encabezado Principal Solemne -->
            <div class="text-center max-w-2xl mx-auto space-y-3">
                <span class="text-amber-500 font-serif tracking-widest text-xs uppercase block font-semibold">Bienvenido al Umbral Virtual</span>
                <h2 class="font-serif text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Sala de Pasos Perdidos</h2>
                <div class="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4"></div>
                <p class="text-slate-400 text-sm leading-relaxed pt-2">
                    Este espacio precede a los trabajos del Taller. Desde aquí, los Obreros de la escuadra pueden interactuar con las herramientas digitales oficiales, actualizar su censo institucional o solicitar acceso a las columnas internas.
                </p>
            </div>

            <!-- Grilla de Acciones Principales -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <!-- Tarjeta 1: Sistema de Censo -->
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

                <!-- Tarjeta 2: Consagración de Registro -->
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

            <!-- Acordeón Informativo y Solemne (Preguntas Frecuentes) -->
            <div x-data="{ abierto: null }" class="bg-slate-950/40 border border-slate-900 rounded-xl p-4 mt-6">
                <h4 class="font-serif text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 px-2">ℹ️ Protocolos de Información</h4>
                
                <!-- Ítem 1 -->
                <div class="border-b border-slate-900 last:border-0">
                    <button @click="abierto = (abierto === 1 ? null : 1)" class="w-full text-left py-3 px-2 flex justify-between items-center text-xs font-semibold text-slate-300 hover:text-amber-400 transition">
                        <span>¿Quiénes pueden acceder al área interna del Taller?</span>
                        <span x-text="abierto === 1 ? '−' : '+'" class="text-amber-500 text-sm"></span>
                    </button>
                    <div x-show="abierto === 1" x-collapse class="px-2 pb-3 text-slate-400 text-xs leading-relaxed">
                        Solo los Hermanos debidamente registrados que posean un usuario activo y conozcan la palabra de pase vigente asignada a sus respectivas dignidades pueden trasponer el Umbral del Taller.
                    </div>
                </div>

                <!-- Ítem 2 -->
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

            <!-- Estadísticas e Información a Pie de Página -->
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
                <!-- Datos de Identidad -->
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

                <!-- Contacto y Ubicación -->
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

                <!-- Cuestionario de Seguridad Masónica -->
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

                <!-- Botón de Envío -->
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
                    <label class="text-[10px] uppercase text-slate-400 tracking-wider">Rango / Columna Asignada</label>
                    <select x-model="registroDatos.rol" class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition">
                        <option value="aprendiz">Columna de Aprendices</option>
                        <option value="companero">Columna de Compañeros</option>
                        <option value="maestro">Cámara de Maestros</option>
                    </select>
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
    // 📜 CÁMARA 5: INTRANET DE ADMINISTRACIÓN (EL TALLER INTERNO)
    // =====================================================================
    admin: `
        <div class="animate-fade-in space-y-6">
            <!-- Banner de Control Superior -->
            <div class="bg-gradient-to-r from-slate-950 via-slate-950 to-amber-950/20 border border-slate-900 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl">
                <div class="space-y-1">
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-bold uppercase tracking-widest px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">Cámara Activa</span>
                        <span class="text-slate-600 text-[10px]">•</span>
                        <span class="text-[10px] text-slate-400 font-mono uppercase" x-text="'Rol: ' + usuarioLogueado?.rol"></span>
                    </div>
                    <h2 class="font-serif text-xl font-bold text-slate-100" x-text="'Trabajos de ' + (usuarioLogueado?.nombre || 'Hermano')"></h2>
                </div>
                
                <!-- Acciones Rápidas del Admin -->
                <button @click="generarCodigoPase()" class="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow transition duration-300">
                    ⚒️ Labrar Pase Digital
                </button>
            </div>

            <!-- Panel Central: Control de Invitaciones -->
            <div class="space-y-3">
                <h3 class="font-serif text-sm font-bold text-slate-300 uppercase tracking-wider">Libro de Registro de Pases Digitales</h3>
                <p class="text-slate-400 text-xs leading-relaxed">Códigos de invitación vigentes emitidos para la admisión de nuevos usuarios en las columnas digitales.</p>
                
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
        </div>
    `
};