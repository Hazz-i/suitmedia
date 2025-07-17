// API configuration utility
export const API_CONFIG = {
	// Base URL for API calls
	baseURL: import.meta.env.PROD
		? '' // Use relative URLs in production (handled by Vercel rewrites)
		: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173',

	// Backend URLs
	backendURL: import.meta.env.VITE_BACKEND_URL || 'https://suitmedia-backend.suitdev.com',
	assetsURL: import.meta.env.VITE_ASSETS_URL || 'https://assets.suitdev.com',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
	if (import.meta.env.PROD) {
		// In production, use relative URLs that will be handled by Vercel rewrites
		return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
	}

	// In development, use the full proxy URL
	return `${API_CONFIG.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Helper function to get asset URL
export const getAssetUrl = (path: string): string => {
	if (import.meta.env.PROD) {
		// In production, use relative URLs that will be handled by Vercel rewrites
		return path.startsWith('/storage') ? path : `/storage/${path}`;
	}

	// In development, use the proxy URL
	return `${API_CONFIG.baseURL}${path.startsWith('/storage') ? path : `/storage/${path}`}`;
};
