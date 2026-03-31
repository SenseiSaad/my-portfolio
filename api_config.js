// Global API Configuration
const API_BASE_URL = 'https://api.slancer.site'; 

document.addEventListener('DOMContentLoaded', () => {
    const desktopAdminLink = document.getElementById('desktop-admin-login');
    const mobileAdminLink = document.getElementById('mobile-admin-login');
    
    // Direct link to the secure Django Admin
    const adminUrl = `https://api.slancer.site/admin/login/?next=/admin/`; 
    
    if (desktopAdminLink) {
        desktopAdminLink.href = adminUrl;
        desktopAdminLink.target = "_blank"; // Keeps your portfolio open 
    }
    
    if (mobileAdminLink) {
        mobileAdminLink.href = adminUrl;
        mobileAdminLink.target = "_blank";
    }
});

// Example fetch call for your projects 
async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/`); // Adjust path if needed 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Connection failed:", error);
    }
}