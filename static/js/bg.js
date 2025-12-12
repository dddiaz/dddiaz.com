// Blood Glucose Widget - Enhanced Version
// By: Daniel Diaz 2025 (Updated)

class GlucoseWidget {
    constructor() {
        this.apiUrl = "https://api.dddiaz.com/glucose/summary";
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

            if (data && data.statusText) {
                this.displayGlucoseData(data);
            }
        } catch (error) {
            console.error('Error loading glucose data:', error);
            this.showErrorState();
        }
    }

    displayGlucoseData(data) {
        const statusText = data.statusText;
        const direction = data.direction;
        const trendArrow = data.trendArrow;
        const directionText = data.directionText;
        const timestamp = new Date(data.date);
        const stale = data.stale;

        console.log('Displaying glucose data:', { statusText, direction, stale });

        // Update text display (now uses pre-computed values from API)
        this.updateTextDisplay(statusText, direction, trendArrow, directionText, timestamp, stale);

        // Update donut visualization (infer from status text)
        this.updateDonutVisualization(statusText);

        // Setup intersection observer for in-view behavior
        this.setupInViewHandler(statusText);
    }

    updateDonutVisualization(statusText) {
        const donut = document.querySelector('.donut');
        console.log('Updating donut for status:', statusText, 'Element found:', !!donut);

        if (!donut) return;

        // Remove all classes except 'donut'
        donut.className = 'donut';

        // Map status text to visualization class
        let newClass = this.getDonutClassFromStatus(statusText);

        donut.classList.add(newClass);
        console.log('Applied class:', newClass, 'Final className:', donut.className);
    }

    getDonutClassFromStatus(statusText) {
        // Map API status text to donut CSS classes
        const statusLower = statusText.toLowerCase();

        if (statusLower.includes('critically low')) {
            return 'critical-low';
        } else if (statusLower.includes('below target')) {
            return 'one-quarter-filled';
        } else if (statusLower.includes('in target')) {
            return 'half-filled';
        } else if (statusLower.includes('above target')) {
            return 'three-quarter-filled';
        } else if (statusLower.includes('critically high')) {
            return 'critical-high';
        } else {
            // Fallback for unknown status
            return 'almost-empty';
        }
    }

    updateTextDisplay(statusText, direction, trendArrow, directionText, timestamp, stale) {
        const textElement = document.getElementById('glucose-text');
        if (!textElement) return;

        const trendText = this.getTrendText(direction, directionText);
        const timeText = this.getTimeText(timestamp);
        const staleIndicator = stale ? '<span class="glucose-stale-badge">CACHED</span>' : '';

        textElement.innerHTML = `
            <div class="glucose-reading">
                <span class="glucose-trend-arrow">${trendArrow}</span>
            </div>
            <div class="glucose-status">${statusText}${trendText} ${staleIndicator}</div>
            <div class="glucose-timestamp">${timeText}</div>
        `;
    }

    getTrendText(direction, directionText) {
        // Handle unknown/missing direction
        if (!direction || direction === 'NONE' || !directionText) {
            return "";
        }

        if (direction === 'Flat') {
            return " and is stable";
        }

        return ` and is ${directionText}`;
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

    setupInViewHandler(statusText) {
        const donut = document.querySelector('.donut');
        if (!donut) return;

        // Use Intersection Observer to handle in-view behavior
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Widget is visible, show current glucose state
                    if (statusText) {
                        this.updateDonutVisualization(statusText);
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
