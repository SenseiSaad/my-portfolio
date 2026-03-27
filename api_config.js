const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal ? 'http://127.0.0.1:8000' : 'http://portfolio-backend-env.eba-7mp6mbh4.us-east-1.elasticbeanstalk.com';

// Dynamically route the Admin logins based on environment
document.addEventListener('DOMContentLoaded', () => {
    const desktopAdminLink = document.getElementById('desktop-admin-login');
    const mobileAdminLink = document.getElementById('mobile-admin-login');
    if (desktopAdminLink) desktopAdminLink.href = `http://portfolio-backend-env.eba-7mp6mbh4.us-east-1.elasticbeanstalk.com/admin/`;
    if (mobileAdminLink) mobileAdminLink.href = `http://portfolio-backend-env.eba-7mp6mbh4.us-east-1.elasticbeanstalk.com/admin/`;
});
