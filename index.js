const menuItems = {
    individual: {
        title: "Individual",
        items: [
            { name: "Budget Tracker", link: "https://capify-updated-ev7i.vercel.app/budget-tracker" },
            { name: "Balance Tracker", link: "https://capify-updated-ev7i.vercel.app/budget" },
            { name: "Personalized Recommendations", link: "/recommendations" },
            { name: "Stock Market Prediction", link: "https://stockpredicto.streamlit.app/" },
            { name: "Resources", link: "https://resources-section.vercel.app/" },
            { name: "Blogs", link: "https://blogs-section-three.vercel.app/" },
            { name: "Financial Health Quiz", link: "https://financial-calculators-seven.vercel.app/" }
        ]
    },
    groupUser: {
        title: "Group User",
        items: [{ name: "Split Smart", link: "https://capify-updated-ev7i.vercel.app/splitwise" }]
    },
    smallBusiness: {
        title: "Small Business",
        items: [{ name: "Invoice Analyzer", link: "https://invoice-analyser.streamlit.app/" }]
    },
    login: {
        title: "Login",
        items: [{ name: "Dashboard", link: "https://capify-updated-ev7i.vercel.app/" }]
    }
};

let activeDropdown = null;
let hoverTimeout;
let isMobileMenuOpen = false;

function createNavItems() {
    const navItemsContainer = document.getElementById('navItems');
    if (!navItemsContainer) return;

    Object.entries(menuItems).forEach(([key, { title, items }]) => {
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';

        const button = document.createElement('button');
        button.className = 'nav-button';
        button.innerHTML = `
            <span>${title}</span>
            <svg class="chevron" width="10" height="6" viewBox="0 0 10 6">
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        
        items.forEach(({ name, link }) => {
            const anchor = document.createElement('a');
            anchor.href = link;
            anchor.className = 'dropdown-item';
            anchor.textContent = name;
            anchor.target = "_blank"; // Opens in new tab
            dropdown.appendChild(anchor);
        });

        // Handle hover states for desktop
        if (window.innerWidth > 768) {
            navItem.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                if (activeDropdown) {
                    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
                }
                dropdown.classList.add('active');
                activeDropdown = key;
            });

            navItem.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    dropdown.classList.remove('active');
                    activeDropdown = null;
                }, 100);
            });
        }

        // Handle click states for mobile
        button.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                if (activeDropdown === key) {
                    dropdown.classList.remove('active');
                    activeDropdown = null;
                } else {
                    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
                    dropdown.classList.add('active');
                    activeDropdown = key;
                }
            }
        });

        navItem.appendChild(button);
        navItem.appendChild(dropdown);
        navItemsContainer.appendChild(navItem);
    });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createNavItems();
    
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const navItems = document.getElementById('navItems');

    if (mobileMenuButton && navItems) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            isMobileMenuOpen = !isMobileMenuOpen;
            navItems.classList.toggle('mobile-active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-items') && !event.target.closest('.mobile-menu-button')) {
            if (window.innerWidth <= 768) {
                navItems.classList.remove('mobile-active');
                isMobileMenuOpen = false;
            }
            // Close dropdowns
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            document.querySelectorAll('.chevron').forEach(c => c.classList.remove('rotate'));
            activeDropdown = null;
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navItems = document.getElementById('navItems');
        if (navItems) {
            navItems.classList.remove('mobile-active');
            isMobileMenuOpen = false;
        }
    }
});

window.addEventListener('load', () => {
    const gradientDiv = document.getElementById('gradientBackground');

    // Example function to change gradient dynamically
    function changeGradient(color1, color2) {
        gradientDiv.style.background = `radial-gradient(${color1}, ${color2})`;
    }

    // Change the gradient after 3 seconds for demonstration
    // setTimeout(() => {
    //     changeGradient( "#000000","#000000");
    // }, 3000);
});