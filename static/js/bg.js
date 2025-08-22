// Blood Glucose Widget - Enhanced Version
// By: Daniel Diaz 2025 (Updated)

class GlucoseWidget {
    constructor() {
        this.apiUrl = "https://diaz-bg.herokuapp.com/api/v1/entries.json";
        this.ranges = {
            veryLow: 54,
            low: 80,
            target: 120,
            high: 180,
            veryHigh: 250
        };
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.start();
            });
        } else {
            this.start();
        }
    }

    start() {
        console.log('Glucose widget starting...');
        
        // Show initial empty state
        setTimeout(() => {
            const donut = document.querySelector('.donut');
            if (donut) {
                donut.classList.add('almost-empty');
            }
        }, 500);

        // Load glucose data
        this.loadGlucoseData();
    }

    async loadGlucoseData() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            
            if (data && data.length > 0) {
                const entry = data[0];
                this.displayGlucoseData(entry);
            }
        } catch (error) {
            console.error('Error loading glucose data:', error);
            this.showErrorState();
        }
    }

    displayGlucoseData(entry) {
        const bg = entry.sgv;
        const trend = entry.trend;
        const direction = entry.direction;
        const timestamp = new Date(entry.date);

        console.log('Displaying glucose data:', { bg, trend, direction });

        // Update text display
        this.updateTextDisplay(bg, trend, direction, timestamp);
        
        // Update donut visualization
        this.updateDonutVisualization(bg);
        
        // Setup intersection observer for in-view behavior
        this.setupInViewHandler(bg);
    }

    updateDonutVisualization(bg) {
        const donut = document.querySelector('.donut');
        console.log('Updating donut for BG:', bg, 'Element found:', !!donut);
        
        if (!donut) return;

        // Remove all classes except 'donut'
        donut.className = 'donut';

        // Add appropriate class based on glucose level
        let newClass = '';
        if (bg < this.ranges.veryLow) {
            newClass = 'critical-low';
        } else if (bg < this.ranges.low) {
            newClass = 'one-quarter-filled';
        } else if (bg <= this.ranges.high) {
            newClass = 'half-filled';
        } else if (bg <= this.ranges.veryHigh) {
            newClass = 'three-quarter-filled';
        } else {
            newClass = 'critical-high';
        }

        donut.classList.add(newClass);
        console.log('Applied class:', newClass, 'Final className:', donut.className);
    }

    updateTextDisplay(bg, trend, direction, timestamp) {
        const textElement = document.getElementById('glucose-text');
        if (!textElement) return;

        const statusText = this.getGlucoseStatusText(bg);
        const trendText = this.getTrendText(trend, direction);
        const timeText = this.getTimeText(timestamp);
        const trendArrow = this.getTrendArrow(direction);

        textElement.innerHTML = `
            <div class="glucose-reading">
                <span class="glucose-trend-arrow">${trendArrow}</span>
            </div>
            <div class="glucose-status">${statusText}${trendText}</div>
            <div class="glucose-timestamp">${timeText}</div>
        `;
    }

    getGlucoseStatusText(bg) {
        if (bg < this.ranges.veryLow) {
            return "Blood glucose is critically low";
        } else if (bg < this.ranges.low) {
            return "Blood glucose is below target range";
        } else if (bg <= this.ranges.high) {
            return "Blood glucose is in target range";
        } else if (bg <= this.ranges.veryHigh) {
            return "Blood glucose is above target range";
        } else {
            return "Blood glucose is critically high";
        }
    }

    getTrendText(trend, direction) {
        if (!trend || !direction) return "";
        
        const directionText = this.getDirectionText(direction);
        
        if (direction === 'Flat') return " and is stable";
        return ` and is ${directionText}`;
    }

    getDirectionText(direction) {
        const directionMap = {
            'Flat': 'stable',
            'SingleUp': 'rising slowly',
            'DoubleUp': 'rising rapidly',
            'FortyFiveUp': 'rising',
            'SingleDown': 'falling slowly',
            'DoubleDown': 'falling rapidly',
            'FortyFiveDown': 'falling'
        };
        return directionMap[direction] || 'changing';
    }

    getTrendArrow(direction) {
        const arrowMap = {
            'Flat': '→',
            'SingleUp': '↗',
            'DoubleUp': '⤴',
            'FortyFiveUp': '↗',
            'SingleDown': '↘',
            'DoubleDown': '⤵',
            'FortyFiveDown': '↘'
        };
        return arrowMap[direction] || '';
    }

    getTimeText(timestamp) {
        const now = new Date();
        const diffMs = now - timestamp;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        
        if (diffMins < 1) {
            return "Just now";
        } else if (diffMins < 60) {
            return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        } else {
            const diffHours = Math.floor(diffMins / 60);
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        }
    }

    setupInViewHandler(currentBg) {
        const donut = document.querySelector('.donut');
        if (!donut) return;

        // Use Intersection Observer to handle in-view behavior
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Widget is visible, show current glucose state
                    if (currentBg) {
                        this.updateDonutVisualization(currentBg);
                    }
                } else {
                    // Widget is not visible, show minimal state
                    donut.className = 'donut almost-empty';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(donut);
    }

    showErrorState() {
        const textElement = document.getElementById('glucose-text');
        const donut = document.querySelector('.donut');
        
        if (textElement) {
            textElement.innerHTML = `
                <div class="glucose-status glucose-error">Unable to load glucose data</div>
                <div class="glucose-timestamp">Please check connection</div>
            `;
        }
        
        if (donut) {
            donut.className = 'donut almost-empty';
        }
    }
}

// Initialize the widget
const glucoseWidget = new GlucoseWidget();