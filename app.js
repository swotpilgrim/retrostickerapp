// Main app controller
const App = {
    currentTheme: "Vintage Americana", // Default theme
    currentMode: 'content', // 'content' or 'character'
    selectedCol1: null,
    selectedCol2: null,
    selectedCol3: null,
    
    init: function() {
        // Initialize the application
        this.setupEventListeners();
        this.loadColumn1();
    },
    
    setupEventListeners: function() {
        // Theme buttons
        document.getElementById('vintage-btn').addEventListener('click', () => {
            this.setTheme("Vintage Americana");
        });
        
        document.getElementById('retro-btn').addEventListener('click', () => {
            this.setTheme("Retro-Futurism");
        });
        
        document.getElementById('gothic-btn').addEventListener('click', () => {
            this.setTheme("Campy Gothic");
        });
        
        // Mode buttons
        document.getElementById('content-btn').addEventListener('click', () => {
            this.setMode('content');
        });
        
        document.getElementById('character-btn').addEventListener('click', () => {
            this.setMode('character');
        });
        
        // Dark/Light theme toggle
        document.getElementById('theme-toggle-btn').addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    },
    
    setTheme: function(theme) {
        this.currentTheme = theme;
        
        // Update active button
        document.querySelectorAll('.theme-btn').forEach(btn => {
            if (btn.textContent === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Reset selections
        this.selectedCol1 = null;
        this.selectedCol2 = null;
        this.selectedCol3 = null;
        
        // Reload column 1
        this.loadColumn1();
        
        // Clear other columns
        document.getElementById('column2').innerHTML = '<div class="column-title">CATEGORY 2</div>';
        document.getElementById('column3').innerHTML = '<div class="column-title">CATEGORY 3</div>';
        document.getElementById('column4').innerHTML = `<div class="column-title">${this.currentMode === 'content' ? 'CONTENT' : 'CHARACTERS'}</div>`;
    },
    
    setMode: function(mode) {
        this.currentMode = mode;
        
        // Update active button
        document.querySelectorAll('.mode-btn').forEach(btn => {
            if (btn.id === `${mode}-btn`) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update column 4 title
        document.querySelector('#column4 .column-title').textContent = 
            mode === 'content' ? 'CONTENT' : 'CHARACTERS';
        
        // Reset selections
        this.selectedCol1 = null;
        this.selectedCol2 = null;
        this.selectedCol3 = null;
        
        // Reload column 1
        this.loadColumn1();
        
        // Clear other columns
        document.getElementById('column2').innerHTML = '<div class="column-title">CATEGORY 2</div>';
        document.getElementById('column3').innerHTML = '<div class="column-title">CATEGORY 3</div>';
        document.getElementById('column4').innerHTML = `<div class="column-title">${mode === 'content' ? 'CONTENT' : 'CHARACTERS'}</div>`;
    },
    
    loadColumn1: function() {
        const container = document.getElementById('column1');
        container.innerHTML = '<div class="column-title">CATEGORY 1</div>';
        
        // Get data based on current theme and mode
        const data = this.currentMode === 'content' ? 
            contentCol1[this.currentTheme] : 
            characterCol1[this.currentTheme];
        
        // Add items to column 1
        data.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'item';
            element.textContent = item;
            element.dataset.value = item;
            
            element.addEventListener('click', () => {
                this.selectedCol1 = item;
                
                // Update selected item
                document.querySelectorAll('#column1 .item').forEach(el => {
                    el.classList.remove('selected');
                });
                element.classList.add('selected');
                
                // Load column 2
                this.loadColumn2();
                
                // Clear columns 3 and 4
                document.getElementById('column3').innerHTML = '<div class="column-title">CATEGORY 3</div>';
                document.getElementById('column4').innerHTML = `<div class="column-title">${this.currentMode === 'content' ? 'CONTENT' : 'CHARACTERS'}</div>`;
            });
            
            container.appendChild(element);
        });
    },
    
    loadColumn2: function() {
        if (!this.selectedCol1) return;
        
        const container = document.getElementById('column2');
        container.innerHTML = '<div class="column-title">CATEGORY 2</div>';
        
        // Get data based on selected column 1 item and mode
        const data = this.currentMode === 'content' ? 
            contentCol2[this.selectedCol1] : 
            characterCol2[this.selectedCol1];
        
        if (!data) {
            console.error(`No data found for ${this.selectedCol1}`);
            return;
        }
        
        // Add items to column 2
        data.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'item';
            element.textContent = item;
            element.dataset.value = item;
            
            element.addEventListener('click', () => {
                this.selectedCol2 = item;
                
                // Update selected item
                document.querySelectorAll('#column2 .item').forEach(el => {
                    el.classList.remove('selected');
                });
                element.classList.add('selected');
                
                // Load column 3
                this.loadColumn3();
                
                // Clear column 4
                document.getElementById('column4').innerHTML = `<div class="column-title">${this.currentMode === 'content' ? 'CONTENT' : 'CHARACTERS'}</div>`;
            });
            
            container.appendChild(element);
        });
    },
    
    loadColumn3: function() {
        if (!this.selectedCol1 || !this.selectedCol2) return;
        
        const container = document.getElementById('column3');
        container.innerHTML = '<div class="column-title">CATEGORY 3</div>';
        
        // Get data based on selected column 2 item and mode
        const data = this.currentMode === 'content' ? 
            contentCol3[this.selectedCol2] : 
            characterCol3[this.selectedCol2];
        
        if (!data) {
            console.error(`No data found for ${this.selectedCol2}`);
            return;
        }
        
        // Add items to column 3
        data.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'item';
            element.textContent = item;
            element.dataset.value = item;
            
            element.addEventListener('click', () => {
                this.selectedCol3 = item;
                
                // Update selected item
                document.querySelectorAll('#column3 .item').forEach(el => {
                    el.classList.remove('selected');
                });
                element.classList.add('selected');
                
                // Load column 4
                this.loadColumn4();
            });
            
            container.appendChild(element);
        });
    },
    
loadColumn4: function() {
    if (!this.selectedCol1 || !this.selectedCol2 || !this.selectedCol3) return;
    
    const container = document.getElementById('column4');
    container.innerHTML = `<div class="column-title">${this.currentMode === 'content' ? 'CONTENT' : 'CHARACTERS'}</div>`;
    
    // Get appropriate data object based on theme and mode
    let dataObject;
    
    if (this.currentMode === 'content') {
        // Select the right content file based on theme
        if (this.currentTheme === "Vintage Americana") {
            dataObject = contentCol4Vintage;
        } else if (this.currentTheme === "Retro-Futurism") {
            dataObject = contentCol4Retro;
        } else if (this.currentTheme === "Campy Gothic") {
            dataObject = contentCol4Gothic;
        }
    } else {
        // Select the right character file based on theme
        if (this.currentTheme === "Vintage Americana") {
            dataObject = characterCol4Vintage;
        } else if (this.currentTheme === "Retro-Futurism") {
            dataObject = characterCol4Retro;
        } else if (this.currentTheme === "Campy Gothic") {
            dataObject = characterCol4Gothic;
        }
    }
    
    // For content mode, we need to use the column 2 selection as the key
    let data = null;
    
    if (this.currentMode === 'content') {
        // In content mode, use selectedCol2 to find the matching key
        data = dataObject[this.selectedCol2];
        console.log("Content mode - using column 2 selection:", this.selectedCol2);
    } else {
        // In character mode, use selectedCol3 for direct match
        data = dataObject[this.selectedCol3];
        console.log("Character mode - using column 3 selection:", this.selectedCol3);
    }
    
    if (!data) {
        // If no specific data found, display a placeholder
        const placeholderItem = document.createElement('div');
        placeholderItem.className = 'content-item';
        placeholderItem.textContent = `No detailed content available for: ${this.currentMode === 'content' ? this.selectedCol2 : this.selectedCol3}`;
        container.appendChild(placeholderItem);
        
        // Add debug info
        console.log("Selected col1:", this.selectedCol1);
        console.log("Selected col2:", this.selectedCol2);
        console.log("Selected col3:", this.selectedCol3);
        console.log("Available keys:", Object.keys(dataObject || {}));
        return;
    }
    
    // Add content sections based on the data structure
    for (const category in data) {
        // Create category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'content-category';
        categoryHeader.textContent = category;
        container.appendChild(categoryHeader);
        
        // Create content item with the category content
        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';
        contentItem.textContent = data[category];
        container.appendChild(contentItem);
    }
}
};

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});