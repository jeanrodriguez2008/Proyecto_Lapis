// Catálogo de Componentes HTML - Proyecto Lapis
window.VistasProyectoLapis = {
  // 1. PASOS PERDIDOS (INICIO)
  pasos_perdidos: `
    <section class="text-center py-12 px-4 bg-slate-900 text-white rounded-2xl shadow-xl mb-12 border border-amber-500/30 relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <h1 class="text-4xl md:text-5xl font-extrabold text-amber-400 mb-4 tracking-tight">
        Resp:. Logia Dignidad Humana N° 149
      </h1>
      <p class="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-6">
        Un espacio de reflexión, búsqueda de la verdad y construcción moral al servicio de la humanidad y el perfeccionamiento del espíritu.
      </p>

      <div class="inline-flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-full border border-amber-500/40 shadow-inner">
        <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold">Visitas al Taller:</span>
        <span class="text-lg font-bold text-white font-mono" x-text="contadorVisitas">0</span>
      </div>
    </section>

    <div class="grid md:grid-cols-3 gap-8 mb-12">
      <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
          🏛️
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Principios Fundamentales</h3>
        <p class="text-slate-600 text-sm leading-relaxed">
          Cultivamos la fraternidad, la tolerancia, la libertad de pensamiento y la filantropía. Trabajamos para desbastar la piedra bruta en busca de la verdad.
        </p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
          📖
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Docencia y Tradición</h3>
        <p class="text-slate-600 text-sm leading-relaxed">
          Preservamos el simbolismo ritualista como vehículo pedagógico para transmitir enseñanzas morales y filosóficas universales a través de los grados.
        </p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
          🤝
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Acción Exterior</h3>
        <p class="text-slate-600 text-sm leading-relaxed">
          Extendemos nuestra acción benéfica a la sociedad, promoviendo el progreso, la educación y el auxilio fraterno a quien lo necesite.
        </p>
      </div>
    </div>

    <section class="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">Divulgación y Planchas Públicas</h2>
          <p class="text-sm text-slate-500">Trazados abiertos al mundo profano</p>
        </div>
        <template x-if="tienePermisoEdicionPasosPerdidos()">
          <button @click="abrirModalCrearTarjeta()" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
            <span>+</span> Nueva Plancha
          </button>
        </template>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <template x-for="tarjeta in tarjetasDinamicas" :key="tarjeta.id">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
            <h4 class="text-lg font-bold text-slate-800 mb-2" x-text="tarjeta.titulo"></h4>
            <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3" x-text="tarjeta.contenido"></p>
            <div class="flex justify-between items-center text-xs text-slate-400">
              <span x-text="tarjeta.autor"></span>
              <span x-text="tarjeta.fecha"></span>
            </div>
            <template x-if="tienePermisoEdicionPasosPerdidos()">
              <button @click="eliminarTarjeta(tarjeta.id)" class="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xs font-bold">
                ✕
              </button>
            </template>
          </div>
        </template>
      </div>
    </section>
  `,

  // 2. TOCAR PUERTA (CONTACTO PROFANO)
  tocar_puerta: `
    <div class="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
      <div class="text-center mb-6">
        <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">✊</div>
        <h2 class="text-2xl font-bold text-slate-800">Tocar a la Puerta del Taller</h2>
        <p class="text-slate-600 text-sm mt-1">Si deseas solicitar información o iniciar tu proceso de acercamiento, envíanos tu mensaje.</p>
      </div>
      <form @submit.prevent="enviarContacto()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
          <input type="text" x-model="formContacto.nombre" placeholder="Ej: Juan Pérez" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm focus:ring-amber-500 focus:border-amber-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
          <input type="email" x-model="formContacto.email" placeholder="ejemplo@correo.com" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm focus:ring-amber-500 focus:border-amber-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Motivo / Mensaje</label>
          <textarea x-model="formContacto.mensaje" rows="4" placeholder="Expresa tus inquietudes o motivos para contactar al Taller..." required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm focus:ring-amber-500 focus:border-amber-500"></textarea>
        </div>
        <button type="submit" class="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-bold transition-colors shadow">
          Enviar Solicitud
        </button>
      </form>
    </div>
  `,

  // 3. PALABRA DE PASE (REGISTRO CON CÓDIGO DEL TRONO)
  palabra_pase: `
    <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
      <div class="text-center mb-6">
        <div class="w-12 h-12 bg-slate-900 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">🔑</div>
        <h2 class="text-2xl font-bold text-slate-800">Palabra de Pase</h2>
        <p class="text-slate-500 text-sm mt-1">Consagración de cuenta mediante el código otorgado por el Venerable Maestro o el Trono.</p>
      </div>
      <form @submit.prevent="consagrarCuenta()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Código de Pase (Generado por el Trono)</label>
          <input type="text" x-model="formRegistro.codigoPase" placeholder="EJ: TRONO149-XYZ" required class="w-full border-slate-300 rounded-lg p-2.5 border uppercase tracking-widest text-center font-mono font-bold text-amber-700 bg-amber-50/50">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
          <input type="text" x-model="formRegistro.nombre" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
          <input type="email" x-model="formRegistro.email" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Nueva Contraseña</label>
          <input type="password" x-model="formRegistro.password" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
        </div>
        <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 py-3 rounded-lg font-bold transition-colors shadow">
          Validar e Registrar Cuenta
        </button>
      </form>
    </div>
  `,

  // 4. UMBRAL (INICIO DE SESIÓN / PORTAL INTERNO)
  umbral: `
    <!-- Si NO está logueado, muestra el formulario de Login para entrar al Umbral -->
    <template x-if="!usuarioLogueado">
      <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <div class="text-center mb-6">
          <div class="w-12 h-12 bg-slate-900 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">🏛️</div>
          <h2 class="text-2xl font-bold text-slate-800">El Umbral</h2>
          <p class="text-slate-500 text-sm mt-1">Identificación de acceso para miembros del Taller</p>
        </div>
        <form @submit.prevent="iniciarSesion()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
            <input type="email" x-model="formLogin.email" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input type="password" x-model="formLogin.password" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
          </div>
          <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-bold transition-colors shadow">
            Entrar al Taller
          </button>
        </form>
      </div>
    </template>

    <!-- Si YA está logueado, muestra la Cámara de Trazados según su Nivel de Perfil -->
    <template x-if="usuarioLogueado">
      <div class="space-y-6">
        <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h2 class="text-2xl font-bold text-slate-800">El Umbral - Cámara de Trazados</h2>
            <p class="text-slate-500 text-sm">
              Trabajos arquitectónicos e instrucción para: <span class="font-bold text-amber-600 capitalize" x-text="usuarioLogueado.grado"></span>
            </p>
          </div>
          <button @click="abrirModalCrearTrazado()" class="bg-slate-900 text-amber-400 hover:bg-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
            + Presentar Trazado
          </button>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <template x-for="trazado in trazadosFiltrados" :key="trazado.id">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-amber-100 text-amber-800" x-text="trazado.grado"></span>
                  <span class="text-xs text-slate-400" x-text="trazado.fecha"></span>
                </div>
                <h3 class="font-bold text-slate-800 text-lg mb-2" x-text="trazado.titulo"></h3>
                <p class="text-slate-600 text-sm line-clamp-3 mb-4" x-text="trazado.resumen"></p>
              </div>
              <div class="flex justify-between items-center pt-4 border-t border-slate-100">
                <span class="text-xs text-slate-500 font-medium" x-text="trazado.autor"></span>
                <button @click="verTrazadoCompleto(trazado)" class="text-xs text-amber-600 font-bold hover:underline">Leer Más →</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  `,

  // 5. VISTA DE ADMINISTRACIÓN / PERFIL DEL TRONO
  admin: `
    <div class="space-y-8">
      <div class="bg-slate-900 text-white p-6 rounded-xl border border-amber-500/30 flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-amber-400">Perfil del Trono - Administración Gremial</h2>
          <p class="text-slate-300 text-sm">Panel exclusivo del Venerable Maestro y Dignatarios.</p>
        </div>
        <span class="bg-amber-500/20 text-amber-400 text-xs px-3 py-1.5 rounded-full border border-amber-500/40 font-mono">Venerable Maestro</span>
      </div>

      <!-- Generador de Código de Pase del Venerable Maestro -->
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 class="text-lg font-bold text-slate-800 mb-2">Generar Nuevo Código de Pase</h3>
        <p class="text-slate-500 text-sm mb-4">Genera un código único para habilitar el registro de nuevos hermanos en la vista 'Palabra de Pase'.</p>
        <div class="flex gap-4">
          <button @click="generarNuevoCodigoPase()" class="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
            Generar Código
          </button>
          <div class="flex-grow bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-center font-mono font-bold text-slate-700" x-text="ultimoCodigoGenerado || 'Presiona para generar...'"></div>
        </div>
      </div>

      <!-- Gestión de Miembros y Cantera -->
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 class="text-lg font-bold text-slate-800 mb-4">Gestión de Cantera y Cuadro Logial</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-100 text-slate-600 font-semibold uppercase text-xs">
              <tr>
                <th class="p-3">Hermano</th>
                <th class="p-3">Grado Actual</th>
                <th class="p-3">Rol</th>
                <th class="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <template x-for="hermano in listaHermanos" :key="hermano.id">
                <tr>
                  <td class="p-3 font-medium text-slate-800" x-text="hermano.nombre"></td>
                  <td class="p-3 text-slate-600 capitalize" x-text="hermano.grado"></td>
                  <td class="p-3 text-slate-600 capitalize" x-text="hermano.rol"></td>
                  <td class="p-3">
                    <button @click="cambiarRolHermano(hermano)" class="text-amber-600 hover:underline font-bold text-xs">Aumentar Salario / Rol</button>
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