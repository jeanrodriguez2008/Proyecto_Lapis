// js/api.js
// Módulo Adaptador de Conexión Frontend para FastAPI / Render

const apiConnection = {
    baseUrl: '/api',
    
    getAuthToken() {
        try {
            const sesion = localStorage.getItem('lapis_sesion');
            if (sesion) {
                const parsed = JSON.parse(sesion);
                return parsed.token || parsed.usuario || parsed.email || '';
            }
        } catch (e) {
            return '';
        }
        return '';
    },

    async request(endpoint, options = {}) {
        const token = this.getAuthToken();
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
        
        const config = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        };

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn(`[Lapis Connection Layer] Endpoint no alcanzable (${endpoint}). Operando en modo local/reactivo.`);
            return null;
        }
    },

    async get(endpoint) {
        return await this.request(endpoint, { method: 'GET' });
    },

    async post(endpoint, body) {
        return await this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    },

    async put(endpoint, body) {
        return await this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    },

    async patch(endpoint, body) {
        return await this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body)
        });
    },

    async delete(endpoint) {
        return await this.request(endpoint, { method: 'DELETE' });
    }
};

window.apiConnection = apiConnection;