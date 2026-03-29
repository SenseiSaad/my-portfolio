document.addEventListener('DOMContentLoaded', async () => {
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

        // LOGIC:
        // INTERVIEW NOTE: We filter the data from the API endpoint based on the 'category' field.
        // 'personal' projects go to the Horizontal Carousel, and 'experience' goes to the Vertical Timeline.
        projects.forEach(item => {
            if (item.category === 'personal' && projContainer) {
                // Project HTML 
                const projectHTML = `
                    <a href="project-detail.html?id=${item.id}" class="glass-panel rounded-2xl overflow-hidden flex flex-col group cursor-pointer min-w-[320px] md:min-w-[400px] snap-center">
                        <div class="h-48 bg-gray-800 relative overflow-hidden shrink-0">
                            <img src="${(item.image ? (item.image.startsWith('http') ? item.image : API_BASE_URL + item.image) : null) || 'https://placehold.co/600x400/9a3412/FFF?text=Project'}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700">
                            <div class="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs font-mono text-white border border-white/20">${item.tech_stack || 'Tech'}</div>
                        </div>
                        <div class="p-6 flex flex-col flex-1">
                            <h4 class="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">${item.title}</h4>
                            <p class="text-sm text-gray-400 mb-4 flex-1 leading-relaxed">
                                ${item.description}
                            </p>
                            <span class="mt-auto text-xs font-bold text-white uppercase tracking-widest border-b border-transparent group-hover:border-white w-max transition-all">View Case Study &rarr;</span>
                        </div>
                    </a>
                `;
                projContainer.insertAdjacentHTML('beforeend', projectHTML);
            } else if (item.category === 'experience' && expContainer) {
                // Experience HTML using alternating logic
                // Ensure alternating behavior implicitly happens via CSS `experience-item` and `:nth-child`
                const expDate = new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                const expHTML = `
                    <div class="experience-item relative flex flex-col gap-8 items-center group">
                        <div class="md:w-1/2 w-full pl-12 md:pl-0 exp-content">
                            <h4 class="text-2xl font-bold text-white">${item.title}</h4>
                            <p class="text-sm text-primary font-mono mb-3">Work | ${expDate}</p>
                            <div class="bg-white/5 p-6 rounded-xl border border-white/5 mb-4 hover:bg-white/10 transition duration-300">
                                <p class="text-gray-300 text-sm leading-relaxed mb-2"><strong class="text-white">What I did:</strong> ${item.description}</p>
                                <p class="text-gray-400 text-sm leading-relaxed"><strong class="text-white">How:</strong> ${item.tech_stack || ''}</p>
                            </div>
                            <a href="${item.live_link || '#'}" class="inline-block px-6 py-2 border border-white/20 rounded-full text-white text-xs hover:bg-white hover:text-black transition-all font-bold" target="_blank">View Details</a>
                        </div>
                        <div class="absolute left-4 md:left-1/2 -translate-x-[9px] w-5 h-5 bg-black border-4 border-white rounded-full z-10 mt-2"></div>
                        <div class="md:w-1/2 w-full pl-12 md:pl-0 flex exp-image opacity-80 group-hover:opacity-100 transition duration-500">
                            <div class="w-full max-w-md aspect-video bg-gray-800 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                <img src="${(item.image ? (item.image.startsWith('http') ? item.image : API_BASE_URL + item.image) : null) || 'https://placehold.co/600x400/be185d/FFF?text=Image'}" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                `;
                expContainer.insertAdjacentHTML('beforeend', expHTML);
            }
        });
        
        // --- ADD BLOGS DYNAMIC BEHAVIOR ---
        const blogRes = await fetch(`${API_BASE_URL}/api/blogs/`);
        if (blogRes.ok) {
            const blogs = await blogRes.json();
            const blogContainer = document.getElementById('blogs-container');
            
            if (blogContainer) {
                blogContainer.innerHTML = ''; // Clear default items
                blogs.forEach(blog => {
                    const blogHTML = `
                        <a href="blog-detail.html?id=${blog.id}" class="glass-panel p-6 rounded-xl flex flex-col h-full group hover:border-white/30 cursor-pointer">
                            <span class="text-xs font-mono text-gray-400 mb-2 border-b border-white/10 pb-2 w-max">BLOG</span>
                            <h4 class="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">${blog.title}</h4>
                            <p class="text-sm text-muted flex-1 mb-4">By ${blog.author}</p>
                            <span class="text-xs text-white underline decoration-white/30 group-hover:decoration-white transition-all">Read Article</span>
                        </a>
                    `;
                    blogContainer.insertAdjacentHTML('beforeend', blogHTML);
                });
            }
        }

    } catch (e) {
        console.error('Error fetching dynamic data:', e);
    }
});
