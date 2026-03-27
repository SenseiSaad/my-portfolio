const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal ? 'http://portfolio-backend-env.eba-7mp6mbh4.us-east-1.elasticbeanstalk.com/' : 'https://api.slancer.site';

// Dynamically route the Admin logins based on environment
document.addEventListener('DOMContentLoaded', () => {
    const desktopAdminLink = document.getElementById('desktop-admin-login');
    const mobileAdminLink = document.getElementById('mobile-admin-login');
    if (desktopAdminLink) desktopAdminLink.href = `${API_BASE_URL}/admin/`;
    if (mobileAdminLink) mobileAdminLink.href = `${API_BASE_URL}/admin/`;
});
