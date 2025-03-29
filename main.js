// Load common components
function loadComponents() {
    const components = [
        { file: 'header.html', elementId: 'header' },
        { file: 'footer.html', elementId: 'footer' }
    ];

    components.forEach(({ file, elementId }) => {
        fetch(file)
            .then(response => response.text())
            .then(html => {
                document.getElementById(elementId).innerHTML = html;
                if (elementId === 'header') setupSearch();
            });
    });
}

// Tool database
const tools = [
    // Text Tools
    { 
        title: 'Word Counter',
        category: 'Text Tools',
        link: 'tools/word-counter.html',
        description: 'Count words, characters, and sentences in your text'
    },
    {
        title: 'JSON Formatter',
        category: 'Developer Tools',
        link: 'tools/json-formatter.html',
        description: 'Format and validate JSON data'
    },
    // Add more tools here...
];

// Initialize search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterTools);
}

// Filter tools based on search input
function filterTools() {
    const searchTerm = this.value.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const description = card.dataset.description.toLowerCase();
        card.style.display = (title.includes(searchTerm) || 
                            (description.includes(searchTerm)) ? 'block' : 'none';
    });
}

// Display tools in grid
function renderTools() {
    const grid = document.getElementById('toolsGrid');
    
    tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'col-md-4 col-lg-3 mb-4 tool-card';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${tool.title}</h5>
                    <p class="card-text text-muted small">${tool.description}</p>
                    <span class="badge bg-primary">${tool.category}</span>
                </div>
                <a href="${tool.link}" class="stretched-link"></a>
            </div>
        `;
        card.dataset.title = tool.title;
        card.dataset.description = tool.description;
        grid.appendChild(card);
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    renderTools();
});