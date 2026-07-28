// Catálogo de Componentes HTML - Proyecto Lapis
window.VistasProyectoLapis = {
  // 1. PASOS PERDIDOS (CON TARJETAS INTERACTIVAS Y MODAL DE LECTURA COMPLETA)
  pasos_perdidos: `
    <section class="text-center py-12 px-4 bg-slate-900 text-white rounded-2xl shadow-xl mb-12 border border-amber-500/30 relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <img src="logo.png" alt="Logo Logia Dignidad Humana N° 149" class="h-56 w-auto mx-auto mb-6 object-contain drop-shadow-xl">
      
      <h1 class="text-3xl md:text-5xl font-extrabold text-amber-400 mb-4 tracking-tight">
        Resp:. Logia:. Sob:. Dignidad Humana N° 149
      </h1>
      <p class="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-6">
        Un espacio de reflexión, búsqueda de la verdad y construcción moral al servicio de la humanidad y el perfeccionamiento del espíritu.
      </p>

      <div class="inline-flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-full border border-amber-500/40 shadow-inner">
        <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold">Visitas a Pasos Perdidos:</span>
        <span class="text-lg font-bold text-white font-mono" x-text="contadorVisitas">0</span>
      </div>
    </section>

    <!-- Botón de publicar superior solo visible para perfiles autorizados -->
    <template x-if="tienePermisoEdicionPasosPerdidos()">
      <div class="flex justify-end mb-6">
        <button @click="abrirModalNuevaTarjeta()" class="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-md">
          <span>+</span> Nueva Publicación
        </button>
      </div>
    </template>

    <!-- Grid de Tarjetas de Publicaciones en Pasos Perdidos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
      <template x-for="tarjeta in tarjetasDinamicas" :key="tarjeta.id">
        <div @click="verArticuloPasosPerdidos(tarjeta)" 
             class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 relative">
          
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-amber-100 text-amber-800 capitalize" x-text="tarjeta.categoria"></span>
              <span class="text-[10px] text-slate-400" x-text="tarjeta.fecha"></span>
            </div>
            
            <h3 class="text-lg font-bold text-slate-800 group-hover:text-amber-600 transition-colors mb-2 leading-snug" x-text="tarjeta.titulo"></h3>
            
            <p class="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4" x-text="tarjeta.contenido"></p>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-amber-600 font-bold group-hover:underline flex items-center gap-1">
              Leer artículo <span>→</span>
            </span>

            <template x-if="tienePermisoEdicionPasosPerdidos()">
              <button @click.stop="eliminarTarjeta(tarjeta.id)" title="Eliminar Publicación" class="text-red-500 hover:text-red-700 font-bold p-1">
                🗑️
              </button>
            </template>
          </div>

        </div>
      </template>

      <template x-if="tarjetasDinamicas.length === 0">
        <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p class="text-slate-400 italic text-sm">No hay publicaciones disponibles en Pasos Perdidos.</p>
        </div>
      </template>
    </div>
  `,

  // 2. TOCAR PUERTA
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
          <label class="block text-sm font-medium text-slate-700 mb-1">Número Telefónico</label>
          <input type="tel" x-model="formContacto.telefono" placeholder="Ej: +58 412 1234567" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm focus:ring-amber-500 focus:border-amber-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Redes Sociales <span class="text-slate-400 text-xs font-normal">(Opcional)</span></label>
          <input type="text" x-model="formContacto.redes" placeholder="Ej: IG: @usuario, FB: /usuario, TikTok: @usuario" class="w-full border-slate-300 rounded-lg p-2.5 border text-sm focus:ring-amber-500 focus:border-amber-500">
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

  // 3. PALABRA DE PASE
  palabra_pase: `
    <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
      <div class="text-center mb-6">
        <div class="w-12 h-12 bg-slate-900 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">🔑</div>
        <h2 class="text-2xl font-bold text-slate-800">Palabra de Pase</h2>
        <p class="text-slate-500 text-sm mt-1">Consagración de cuenta mediante el código otorgado por el Venerable Maestro.</p>
      </div>
      <form @submit.prevent="consagrarCuenta()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Palabra de Pase (Código generado por el Venerable Maestro)</label>
          <input type="text" x-model="formRegistro.codigoPase" placeholder="EJ: TRONO149-XYZ" required class="w-full border-slate-300 rounded-lg p-2.5 border uppercase tracking-widest text-center font-mono font-bold text-amber-700 bg-amber-50/50">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Nombre Completo (Q:. H:.)</label>
          <input type="text" x-model="formRegistro.nombre" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Grado Simbólico / R.E.A.A. Actual</label>
          <select x-model="formRegistro.grado" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm font-medium bg-slate-50">
            <template x-for="g in gradosREAA" :key="g.id">
              <option :value="g.nombre" x-text="g.nombre"></option>
            </template>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
          <input type="email" x-model="formRegistro.email" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Nueva Contraseña</label>
          <input type="password" x-model="formRegistro.password" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Respuesta Secreta</label>
          <p class="text-xs text-slate-500 mb-1">¿Cuál es tu película favorita?</p>
          <input type="text" x-model="formRegistro.respuestaSecreta" placeholder="Tu película favorita" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
        </div>
        <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 py-3 rounded-lg font-bold transition-colors shadow">
          Validar y Registrar Cuenta
        </button>
      </form>
    </div>
  `,

  // 4. UMBRAL (CÁMARA DE TRAZADOS, BALOTAJE Y CHAT DE CÁMARAS)
  umbral: `
    <template x-if="!usuarioLogueado">
      <div>
        <div x-show="!modoRecuperar" class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
          <div class="text-center mb-6">
            <div class="w-12 h-12 bg-slate-900 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">🏛️</div>
            <h2 class="text-2xl font-bold text-slate-800">El Umbral</h2>
            <p class="text-slate-500 text-sm mt-1">Identificación de acceso para miembros del Taller</p>
          </div>
          <form @submit.prevent="iniciarSesion()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Usuario o Correo Electrónico</label>
              <input type="text" x-model="formLogin.email" placeholder="webmaster o correo@ejemplo.com" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-sm font-medium text-slate-700">Contraseña</label>
                <button type="button" @click="modoRecuperar = true" class="text-xs text-amber-600 hover:underline font-medium">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <input type="password" x-model="formLogin.password" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
            </div>
            <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-bold transition-colors shadow">
              Entrar al Taller
            </button>
          </form>
        </div>

        <div x-show="modoRecuperar" class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-200">
          <div class="text-center mb-6">
            <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">🔓</div>
            <h2 class="text-2xl font-bold text-slate-800">Recuperar Contraseña</h2>
            <p class="text-slate-500 text-sm mt-1">Ingresa tu usuario o correo y valida tu respuesta secreta.</p>
          </div>
          <form @submit.prevent="procesarRecuperacion()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Usuario o Correo Electrónico</label>
              <input type="text" x-model="formRecuperar.email" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Respuesta Secreta</label>
              <p class="text-xs text-slate-500 mb-1">¿Cuál es tu película favorita?</p>
              <input type="text" x-model="formRecuperar.respuestaSecreta" placeholder="Tu respuesta registrada" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Nueva Contraseña</label>
              <input type="password" x-model="formRecuperar.nuevaPassword" placeholder="Ingresa tu nueva clave" required class="w-full border-slate-300 rounded-lg p-2.5 border text-sm">
            </div>
            <button type="submit" class="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-bold transition-colors shadow">
              Restablecer Contraseña
            </button>
            <div class="text-center pt-2">
              <button type="button" @click="modoRecuperar = false" class="text-xs text-slate-500 hover:text-slate-800 underline">
                ← Volver al Inicio de Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>

    <template x-if="usuarioLogueado">
      <div class="space-y-8">
        <!-- Pestañas Internas del Umbral -->
        <div class="flex border-b border-slate-200">
          <button @click="seccionUmbral = 'trazados'" 
                  :class="seccionUmbral === 'trazados' ? 'border-amber-600 text-amber-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-700'"
                  class="py-3 px-6 border-b-2 text-sm font-medium transition-colors">
            📜 Cámara de Trazados
          </button>
          <button @click="seccionUmbral = 'chat'" 
                  :class="seccionUmbral === 'chat' ? 'border-amber-600 text-amber-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-700'"
                  class="py-3 px-6 border-b-2 text-sm font-medium transition-colors flex items-center gap-2">
            <span>💬</span> Chat de Cámaras
          </button>
          <button @click="seccionUmbral = 'balotaje'" 
                  :class="seccionUmbral === 'balotaje' ? 'border-amber-600 text-amber-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-700'"
                  class="py-3 px-6 border-b-2 text-sm font-medium transition-colors flex items-center gap-2">
            <span>🗳️</span> Saco de Proposiciones / Balotaje
          </button>
        </div>

        <!-- 1. VISTA CÁMARA DE TRAZADOS -->
        <div x-show="seccionUmbral === 'trazados'" class="space-y-6">
          <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div>
              <h2 class="text-2xl font-bold text-slate-800">El Umbral - Cámara de Trazados</h2>
              <p class="text-slate-500 text-sm">
                Trabajos arquitectónicos e instrucción para: <span class="font-bold text-amber-600 capitalize" x-text="usuarioLogueado.grado"></span>
              </p>
            </div>
            <button @click="abrirModalCrearTrazado()" class="bg-slate-900 text-amber-400 hover:bg-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow">
              + Presentar Trazado
            </button>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <template x-for="trazado in trazadosFiltrados" :key="trazado.id">
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative">
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
                  <div class="flex items-center gap-2">
                    <template x-if="esAdministradorOWebmaster()">
                      <button @click="eliminarTrazado(trazado.id)" title="Eliminar Trazado" class="text-red-500 hover:text-red-700 text-xs font-bold">
                        ✕
                      </button>
                    </template>
                    <button @click="verTrazadoCompleto(trazado)" class="text-xs text-amber-600 font-bold hover:underline">Leer Más →</button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- 2. VISTA CHAT INTERNO DE CÁMARAS -->
        <div x-show="seccionUmbral === 'chat'" class="space-y-6">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-slate-800 mb-1">Salas de Chat de Cámara</h2>
            <p class="text-slate-500 text-sm mb-6">Comunicación interna y fraterna por nivel de jerarquía y grado simbólico.</p>
            
            <div class="grid sm:grid-cols-3 gap-4 mb-6">
              <button @click="salaChatActual = 'aprendiz'" 
                      :class="salaChatActual === 'aprendiz' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                      class="p-4 rounded-xl text-left transition-all flex flex-col justify-between border border-amber-500/20">
                <div>
                  <div class="font-bold text-sm mb-1">📐 Cámara de Aprendiz</div>
                  <div class="text-xs opacity-90">Acceso: Aprendices, Compañeros, Maestros, Venerable y Webmaster.</div>
                </div>
                <div class="text-[10px] uppercase tracking-wider font-bold mt-3 text-right">Sala General</div>
              </button>

              <button @click="if(puedeAccederSalaChat('companero')) { salaChatActual = 'companero'; } else { Swal.fire({icon:'error', title:'Acceso Denegado', text:'Reservado para Compañeros, Maestros, Venerable y Webmaster.'}); }"
                      :class="salaChatActual === 'companero' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                      class="p-4 rounded-xl text-left transition-all flex flex-col justify-between border border-amber-500/20 relative">
                <div>
                  <div class="font-bold text-sm mb-1 flex items-center justify-between">
                    <span>📐📐 Cámara de Compañero</span>
                    <span x-show="!puedeAccederSalaChat('companero')" class="text-xs">🔒</span>
                  </div>
                  <div class="text-xs opacity-90">Acceso: Compañeros, Maestros, Venerable y Webmaster.</div>
                </div>
                <div class="text-[10px] uppercase tracking-wider font-bold mt-3 text-right">Segunda Cámara</div>
              </button>

              <button @click="if(puedeAccederSalaChat('maestro')) { salaChatActual = 'maestro'; } else { Swal.fire({icon:'error', title:'Acceso Denegado', text:'Reservado para Maestros, Venerable y Webmaster.'}); }"
                      :class="salaChatActual === 'maestro' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                      class="p-4 rounded-xl text-left transition-all flex flex-col justify-between border border-amber-500/20 relative">
                <div>
                  <div class="font-bold text-sm mb-1 flex items-center justify-between">
                    <span>🏛️ Cámara de Maestros</span>
                    <span x-show="!puedeAccederSalaChat('maestro')" class="text-xs">🔒</span>
                  </div>
                  <div class="text-xs opacity-90">Acceso: Maestros, Venerable Maestro y Webmaster.</div>
                </div>
                <div class="text-[10px] uppercase tracking-wider font-bold mt-3 text-right">Tercera Cámara</div>
              </button>
            </div>

            <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col h-[400px]">
              <div class="flex-grow overflow-y-auto space-y-3 pr-2">
                <template x-for="m in mensajesChatFiltrados" :key="m.id">
                  <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm max-w-2xl">
                    <div class="flex justify-between items-center mb-1">
                      <span class="font-bold text-xs text-amber-700" x-text="m.autor + ' (' + m.grado + ')'"></span>
                      <span class="text-[10px] text-slate-400" x-text="m.fecha"></span>
                    </div>
                    <p class="text-sm text-slate-800" x-text="m.texto"></p>
                  </div>
                </template>
                <template x-if="mensajesChatFiltrados.length === 0">
                  <div class="h-full flex items-center justify-center text-slate-400 italic text-sm">
                    No hay intervenciones registradas en esta cámara.
                  </div>
                </template>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-200 flex gap-2">
                <input type="text" x-model="nuevoMensajeChat" @keydown.enter="enviarMensajeChat()" 
                       placeholder="Escribe tu trazado verbal para la cámara..." 
                       class="flex-grow border-slate-300 rounded-lg p-2.5 border text-sm focus:ring-amber-500 focus:border-amber-500">
                <button @click="enviarMensajeChat()" class="bg-slate-900 hover:bg-slate-800 text-amber-400 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. VISTA SECCIÓN DE BALOTAJE -->
        <div x-show="seccionUmbral === 'balotaje'" class="space-y-6">
          <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div>
              <h2 class="text-2xl font-bold text-slate-800">Escrutinio y Balotaje Secreto</h2>
              <p class="text-slate-500 text-sm">Procesos de votación para admisiones y aumentos de salario.</p>
            </div>
            <template x-if="esAdministradorOWebmaster()">
              <button @click="abrirModalCrearBalotaje()" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow">
                + Iniciar Balotaje
              </button>
            </template>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <template x-for="b in listaBalotajes" :key="b.id">
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-bold text-slate-800 text-lg" x-text="b.candidato"></h3>
                  <span :class="b.activo ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'" 
                        class="text-xs font-bold px-2 py-1 rounded uppercase tracking-wider" 
                        x-text="b.activo ? 'En Curso' : 'Cerrado'"></span>
                </div>
                <p class="text-xs text-amber-700 font-bold uppercase mb-2" x-text="b.motivo"></p>
                <p class="text-slate-600 text-sm mb-3" x-text="b.descripcion"></p>

                <template x-if="b.fechaInicio || b.fechaFin">
                  <div class="flex items-center gap-4 text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded border border-slate-100">
                    <span x-show="b.fechaInicio"><b>Inicio:</b> <span x-text="b.fechaInicio"></span></span>
                    <span x-show="b.fechaFin"><b>Fin:</b> <span x-text="b.fechaFin"></span></span>
                  </div>
                </template>

                <template x-if="b.activo">
                  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
                    <p class="text-xs font-bold text-slate-700 mb-3 text-center">Emitir Balota Secreta:</p>
                    <div class="flex gap-4 justify-center">
                      <button @click="emitirVotoBalotaje(b.id, 'blanca')" class="bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-800 px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm">
                        ⚪ Bola Blanca (A favor)
                      </button>
                      <button @click="emitirVotoBalotaje(b.id, 'negra')" class="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm">
                        ⚫ Bola Negra (En contra)
                      </button>
                    </div>
                  </div>
                </template>

                <template x-if="esAdministradorOWebmaster()">
                  <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                    <div>
                      <span>Resultados: </span>
                      <span class="font-bold text-slate-800" x-text="'⚪ ' + b.blancas + ' / ⚫ ' + b.negras"></span>
                    </div>
                    <div class="flex items-center gap-2">
                      <button x-show="b.activo" @click="cerrarBalotaje(b.id)" class="text-red-600 font-bold hover:underline">
                        Cerrar Escrutinio
                      </button>
                      <button x-show="!b.activo" @click="eliminarBalotaje(b.id)" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1 rounded text-xs font-bold transition-colors">
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  `,

  // 5. PERFIL DEL TRONO / WEBMASTER
  admin: `
    <div class="space-y-8">
      <div class="bg-slate-900 text-white p-6 rounded-xl border border-amber-500/30 flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-amber-400">Perfil del Trono - Administración Gremial</h2>
          <p class="text-slate-300 text-sm">Panel de control exclusivo del Venerable Maestro y Webmaster del Taller.</p>
        </div>
        <span class="bg-amber-500/20 text-amber-400 text-xs px-3 py-1.5 rounded-full border border-amber-500/40 font-mono capitalize" x-text="usuarioLogueado ? usuarioLogueado.rol.replace('_', ' ') : 'Trono del Venerable'"></span>
      </div>

      <!-- Solicitudes de Tocar Puerta Pendientes -->
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 class="text-lg font-bold text-slate-800 mb-2">Solicitudes en Puerta (Mensajes Profanos)</h3>
        <p class="text-slate-500 text-sm mb-4">Registro de mensajes recibidos a través de la opción 'Tocar Puerta'. Genera la palabra de pase para admitir al aspirante.</p>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-100 text-slate-600 font-semibold uppercase text-xs">
              <tr>
                <th class="p-3">Nombre</th>
                <th class="p-3">Contacto</th>
                <th class="p-3">Redes</th>
                <th class="p-3">Mensaje</th>
                <th class="p-3 text-center">Acciones / Admitir</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <template x-for="sol in listaSolicitudesContacto" :key="sol.id">
                <tr>
                  <td class="p-3 font-medium text-slate-800" x-text="sol.nombre"></td>
                  <td class="p-3 text-slate-600">
                    <div x-text="sol.email"></div>
                    <div class="text-xs text-slate-400" x-text="sol.telefono"></div>
                  </td>
                  <td class="p-3 text-slate-600 text-xs" x-text="sol.redes || 'N/A'"></td>
                  <td class="p-3 text-slate-600 text-xs leading-snug" x-text="sol.mensaje"></td>
                  <td class="p-3 text-center">
                    <template x-if="!sol.codigoGenerado">
                      <button @click="generarCodigoParaAspirante(sol)" class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow">
                        🔑 Generar Código
                      </button>
                    </template>
                    <template x-if="sol.codigoGenerado">
                      <div class="inline-flex flex-col items-center">
                        <span class="bg-amber-50 text-amber-800 font-mono font-bold text-xs px-2 py-1 rounded border border-amber-300" x-text="sol.codigoGenerado"></span>
                        <span class="text-[10px] text-green-600 font-semibold mt-1">✓ Código Generado</span>
                      </div>
                    </template>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Aspirantes Admitidos e Iniciados -->
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <div>
            <h3 class="text-lg font-bold text-slate-800">Aspirantes Admitidos e Iniciados</h3>
            <p class="text-slate-500 text-sm">Hermanos consagrados mediante Palabra de Pase. Puedes ajustar el Grado asignado o eliminar el registro si es necesario.</p>
          </div>
          <span class="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold" x-text="aspirantesRegistrados.length + ' Confirmados'"></span>
        </div>
        
        <div class="overflow-x-auto mt-4">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-100 text-slate-600 font-semibold uppercase text-xs">
              <tr>
                <th class="p-3">Querido Hermano</th>
                <th class="p-3">Correo Confirmado</th>
                <th class="p-3 text-center">Grado del Q:. H:.</th>
                <th class="p-3">Fecha de Ingreso</th>
                <th class="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <template x-for="asp in aspirantesRegistrados" :key="asp.id">
                <tr>
                  <td class="p-3 font-medium text-slate-800 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500"></span>
                    <span x-text="'Q:. H:. ' + asp.nombre"></span>
                  </td>
                  <td class="p-3 text-slate-600 font-mono text-xs" x-text="asp.email"></td>
                  <td class="p-3 text-center">
                    <span class="bg-amber-100 text-amber-800 font-semibold text-xs px-2.5 py-1 rounded-full border border-amber-300 inline-flex items-center gap-1">
                      <span>📐</span> <span x-text="asp.grado"></span>
                    </span>
                  </td>
                  <td class="p-3 text-slate-500 text-xs" x-text="asp.fechaRegistro"></td>
                  <td class="p-3 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button @click="editarGradoAdmitido(asp)" class="bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 border border-slate-300 px-2.5 py-1 rounded text-xs font-bold transition-colors">
                        ✏️ Editar Grado
                      </button>
                      <button @click="eliminarAspiranteAdmitido(asp)" title="Eliminar Aspirante" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-2.5 py-1 rounded text-xs font-bold transition-colors">
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              <template x-if="aspirantesRegistrados.length === 0">
                <tr>
                  <td colspan="5" class="p-4 text-center text-slate-400 text-xs italic">
                    Aún no hay hermanos registrados con Palabra de Pase.
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Cuadro Logial -->
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 class="text-lg font-bold text-slate-800 mb-4">Gestión de Cantera y Cuadro Logial</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-100 text-slate-600 font-semibold uppercase text-xs">
              <tr>
                <th class="p-3">Nombre</th>
                <th class="p-3">Grado Actual</th>
                <th class="p-3">Rol / Cargo</th>
                <th class="p-3 text-center">Gestión de Grado</th>
                <th class="p-3 text-center">Acciones Directas</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <template x-for="hermano in listaHermanos" :key="hermano.id">
                <tr :class="hermano.esFijo ? 'bg-amber-50/40' : ''">
                  <td class="p-3 font-medium text-slate-800">
                    <span x-text="hermano.nombre"></span>
                    <template x-if="hermano.esFijo">
                      <span class="ml-2 text-[10px] bg-slate-900 text-amber-400 px-2 py-0.5 rounded font-bold uppercase">Único</span>
                    </template>
                  </td>
                  <td class="p-3 text-slate-600 font-semibold" x-text="hermano.grado"></td>
                  <td class="p-3 text-slate-500 uppercase text-xs" x-text="hermano.rol.replace('_', ' ')"></td>
                  <td class="p-3 text-center">
                    <template x-if="!hermano.esFijo && hermano.rol !== 'webmaster'">
                      <div class="flex items-center justify-center gap-2">
                        <button @click="disminuirRolHermano(hermano)" title="Disminuir Nivel" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-2 py-1 rounded text-xs font-bold">
                          ▼
                        </button>
                        <button @click="aumentarRolHermano(hermano)" title="Aumentar Nivel" class="bg-amber-600 hover:bg-amber-700 text-white px-2 py-1 rounded text-xs font-bold">
                          ▲
                        </button>
                      </div>
                    </template>
                  </td>
                  <td class="p-3 text-center">
                    <template x-if="!hermano.esFijo && hermano.rol !== 'webmaster'">
                      <div class="flex items-center justify-center gap-2">
                        <button @click="editarRolDirecto(hermano)" class="bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 border border-slate-300 px-2 py-1 rounded text-xs font-bold">
                          ✏️ Editar Rol
                        </button>
                        <button @click="eliminarHermanoCuadro(hermano)" title="Retirar Hermano" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-2 py-1 rounded text-xs font-bold">
                          🗑️ Retirar
                        </button>
                      </div>
                    </template>
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