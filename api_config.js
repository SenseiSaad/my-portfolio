const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal ? 'http://127.0.0.1:8000' : 'https://api.yourdomain.com';
