document.addEventListener('DOMContentLoaded', async () => {
    // --- FETCH PROJECTS & EXPERIENCE ---
    try {
        const res = await fetch(`${API_BASE_URL}/api/projects/view_all/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const projects = await res.json();
        
        // Containers
        const projContainer = document.getElementById('projects-container');
        
        // Find experience container: it is the inner div of section#experience
        const expSection = document.getElementById('experience');
        const expContainer = expSection ? expSection.querySelector('.relative.space-y-24') : null;

        // Clear existing static items but KEEP the vertical line for experience container
        if (projContainer) projContainer.innerHTML = '';
        if (expContainer) {
            const line = expContainer.querySelector('.absolute.left-4.md\\:left-1\\/2');
            expContainer.innerHTML = '';
            if (line) expContainer.appendChild(line);
        }

        // Categorize projects
        const personalProjects = projects.filter(item => item.category === 'personal' || !item.category);
        const experienceProjects = projects.filter(item => item.category === 'experience');

        // Render Personal Projects (Equivalent to {% for project in projects %} and {% empty %})
        if (projContainer) {
            if (personalProjects.length === 0) {
                projContainer.innerHTML = '<div class="w-full text-center py-12 text-gray-400 font-mono">No projects found.</div>';
            } else {
                personalProjects.forEach((item, index) => {
                    // Split tech stack into nice little pill badges
                    const techStackHTML = (item.tech_stack || 'Tech').split(',').slice(0, 3).map(tech => 
                        `<span class="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-white border border-white/20 whitespace-nowrap">${tech.trim()}</span>`
                    ).join('');

                    const projectHTML = `
                        <a href="project-detail.html?id=${item.id}" class="glass-panel rounded-2xl overflow-hidden flex flex-col group cursor-pointer w-full">
                            <div class="p-6 flex flex-col flex-1">
                                <div class="mb-4 flex flex-wrap gap-2 overflow-hidden max-h-[30px]">
                                    ${techStackHTML}
                                    ${(item.tech_stack || '').split(',').length > 3 ? `<span class="text-xs text-gray-500 self-center">...</span>` : ''}
                                </div>
                                <h4 class="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">${item.title}</h4>
                                <p class="text-sm text-gray-400 mb-4 flex-1 leading-relaxed line-clamp-3">
                                    ${item.short_description || item.description}
                                </p>
                                <span class="mt-auto text-xs font-bold text-white uppercase tracking-widest border-b border-transparent group-hover:border-white w-max transition-all">View Case Study &rarr;</span>
                            </div>
                        </a>
                    `;
                    projContainer.insertAdjacentHTML('beforeend', projectHTML);
                });
            }
        }

        // Render Experience
        if (expContainer) {
            if (experienceProjects.length === 0) {
                // Keep the vertical line but show empty message
                const lineHTML = `<div class="absolute left-4 md:left-1/2 -translate-x-[0px] w-0.5 h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>`;
                expContainer.innerHTML = lineHTML + '<div class="w-full text-center py-12 text-gray-400 font-mono">No experience found.</div>';
            } else {
                experienceProjects.forEach(item => {
                    const expDate = item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Recent';
                    const expHTML = `
                        <div class="experience-item relative flex flex-col gap-8 items-center group">
                            <div class="md:w-1/2 w-full pl-12 md:pl-0 exp-content">
                                <h4 class="text-2xl font-bold text-white">${item.title}</h4>
                                <p class="text-sm text-primary font-mono mb-3">Work | ${expDate}</p>
                                <div class="bg-white/5 p-6 rounded-xl border border-white/5 mb-4 hover:bg-white/10 transition duration-300">
                                    <p class="text-gray-300 text-sm leading-relaxed mb-2 line-clamp-3"><strong class="text-white">What I did:</strong> ${item.short_description || item.description}</p>
                                    <p class="text-gray-400 text-sm leading-relaxed truncate"><strong class="text-white">How:</strong> ${item.tech_stack || ''}</p>
                                </div>
                                <a href="${item.live_link || '#'}" class="inline-block px-6 py-2 border border-white/20 rounded-full text-white text-xs hover:bg-white hover:text-black transition-all font-bold" target="_blank">View Details</a>
                            </div>
                            <div class="absolute left-4 md:left-1/2 -translate-x-[9px] w-5 h-5 bg-black border-4 border-white rounded-full z-10 mt-2"></div>
                        </div>
                    `;
                    expContainer.insertAdjacentHTML('beforeend', expHTML);
                });
            }
        }
    } catch (e) {
        console.error('Error fetching projects dynamic data:', e);
    }

    // --- FETCH BLOGS ---
    try {
        const blogRes = await fetch(`${API_BASE_URL}/api/blogs/view_all/`);
        if (blogRes.ok) {
            const blogs = await blogRes.json();
            const blogContainer = document.getElementById('blogs-container');
            
            if (blogContainer) {
                blogContainer.innerHTML = ''; // Clear default items
                if (blogs.length === 0) {
                    blogContainer.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400 font-mono">No blogs found.</div>';
                } else {
                    blogs.forEach(blog => {
                        const blogHTML = `
                            <a href="blog-detail.html?id=${blog.id}" class="glass-panel p-6 rounded-xl flex flex-col h-full group hover:border-white/30 cursor-pointer">
                                <span class="text-xs font-mono text-gray-400 mb-2 border-b border-white/10 pb-2 w-max">BLOG</span>
                                <h4 class="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">${blog.title}</h4>
                                <p class="text-sm text-muted flex-1 mb-4">By ${blog.author || 'Saad Waseem'}</p>
                                <span class="text-xs text-white underline decoration-white/30 group-hover:decoration-white transition-all">Read Article</span>
                            </a>
                        `;
                        blogContainer.insertAdjacentHTML('beforeend', blogHTML);
                    });
                }
            }
        }
    } catch (e) {
        console.error('Error fetching blogs dynamic data:', e);
    }
});
