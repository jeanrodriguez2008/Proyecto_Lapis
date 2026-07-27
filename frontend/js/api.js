// js/api.js
// Módulo Adaptador de Conexión Frontend para FastAPI / Render

const apiConnection = {
    baseUrl: '/api',
    
    async request(endpoint, options = {}) {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        
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

    async delete(endpoint) {
        return await this.request(endpoint, { method: 'DELETE' });
    }
};