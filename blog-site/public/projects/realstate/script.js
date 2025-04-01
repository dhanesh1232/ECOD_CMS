// Property Data
const properties = [
  {
    id: 1,
    title: "Luxury Villa in Beverly Hills",
    address: "123 Hollywood Blvd, Beverly Hills, CA",
    price: 2500000,
    pricePer: "",
    type: "house",
    bedrooms: 5,
    bathrooms: 4.5,
    area: 4500,
    year: 2018,
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Stunning modern villa with panoramic city views, infinity pool, and smart home technology.",
  },
  {
    id: 2,
    title: "Downtown Loft Apartment",
    address: "456 Main St, New York, NY",
    price: 1200000,
    pricePer: "",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    year: 2015,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Industrial-chic loft with exposed brick, high ceilings, and downtown skyline views.",
  },
  {
    id: 3,
    title: "Waterfront Mansion",
    address: "789 Ocean Dr, Miami, FL",
    price: 4500000,
    pricePer: "",
    type: "house",
    bedrooms: 6,
    bathrooms: 5,
    area: 6200,
    year: 2020,
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Luxurious waterfront estate with private dock, home theater, and tropical landscaping.",
  },
  {
    id: 4,
    title: "Modern Condo with City Views",
    address: "101 Skyline Blvd, Chicago, IL",
    price: 750000,
    pricePer: "",
    type: "condo",
    bedrooms: 2,
    bathrooms: 2.5,
    area: 2200,
    year: 2019,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Sleek condo featuring floor-to-ceiling windows, chef's kitchen, and rooftop terrace.",
  },
  {
    id: 5,
    title: "Historic Brownstone",
    address: "202 Park Ave, Boston, MA",
    price: 3200000,
    pricePer: "",
    type: "house",
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3800,
    year: 1920,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Beautifully restored historic brownstone with original details and modern amenities.",
  },
  {
    id: 6,
    title: "Lakefront Cottage",
    address: "303 Lakeside Dr, Lake Tahoe, CA",
    price: 950000,
    pricePer: "",
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    year: 2005,
    image:
      "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Charming lakefront cottage with private beach, deck, and mountain views.",
  },
  {
    id: 7,
    title: "Penthouse with Terrace",
    address: "404 Highrise Ave, Seattle, WA",
    price: 2800000,
    pricePer: "",
    type: "apartment",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 3500,
    year: 2017,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Luxurious penthouse featuring private rooftop terrace and panoramic city views.",
  },
  {
    id: 8,
    title: "Desert Retreat",
    address: "505 Canyon Rd, Scottsdale, AZ",
    price: 1800000,
    pricePer: "",
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    year: 2016,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: true,
    description:
      "Modern desert home with infinity pool, mountain views, and minimalist design.",
  },
];

// Agent Data
const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    phone: "(212) 555-1001",
    email: "sarah@primeproperties.com",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "With over 12 years of experience in luxury real estate, Sarah has helped hundreds of clients find their dream homes.",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Commercial Real Estate Specialist",
    phone: "(212) 555-1002",
    email: "michael@primeproperties.com",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Michael specializes in commercial properties and investment opportunities with a focus on long-term value.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Residential Sales Agent",
    phone: "(212) 555-1003",
    email: "emily@primeproperties.com",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Emily's attention to detail and negotiation skills ensure her clients get the best possible deals.",
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Property Management Director",
    phone: "(212) 555-1004",
    email: "david@primeproperties.com",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "David oversees our property management division, ensuring optimal performance for investment properties.",
  },
];

// DOM Elements
const listingsGrid = document.querySelector(".listings-grid");
const agentsGrid = document.querySelector(".agents-grid");
const mobileMenu = document.querySelector(".mobile-menu");
const nav = document.querySelector("nav");
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const header = document.querySelector("header");

// Initialize the app
function init() {
  renderFeaturedProperties();
  renderAgents();
  setupEventListeners();
  setupHeroObserver();
  setupSectionObserver();
}

// Render featured properties
function renderFeaturedProperties() {
  listingsGrid.innerHTML = "";

  properties.forEach((property) => {
    const propertyCard = document.createElement("div");
    propertyCard.className = "listing-card";

    propertyCard.innerHTML = `
            <div class="listing-image">
                <img src="${property.image}" alt="${property.title}">
                <span class="listing-badge">For Sale</span>
            </div>
            <div class="listing-details">
                <div class="listing-price">$${property.price.toLocaleString()}<span>${property.pricePer}</span></div>
                <h3 class="listing-title">${property.title}</h3>
                <p class="listing-address"><i class="fas fa-map-marker-alt"></i> ${property.address}</p>
                <div class="listing-features">
                    <div class="listing-feature">
                        <i class="fas fa-bed"></i>
                        <span>${property.bedrooms} Beds</span>
                    </div>
                    <div class="listing-feature">
                        <i class="fas fa-bath"></i>
                        <span>${property.bathrooms} Baths</span>
                    </div>
                    <div class="listing-feature">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.area} sqft</span>
                    </div>
                </div>
            </div>
        `;

    listingsGrid.appendChild(propertyCard);
  });
}

// Render agents
function renderAgents() {
  agentsGrid.innerHTML = "";

  agents.forEach((agent) => {
    const agentCard = document.createElement("div");
    agentCard.className = "agent-card";

    agentCard.innerHTML = `
            <div class="agent-image">
                <img src="${agent.image}" alt="${agent.name}">
                <div class="agent-social">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="agent-info">
                <h3>${agent.name}</h3>
                <p>${agent.title}</p>
                <div class="agent-contact">
                    <a href="tel:${agent.phone}"><i class="fas fa-phone-alt"></i></a>
                    <a href="mailto:${agent.email}"><i class="fas fa-envelope"></i></a>
                </div>
            </div>
        `;

    agentsGrid.appendChild(agentCard);
  });
}

// Section Observer for Active Nav Links
function setupSectionObserver() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active class from all nav links
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Find the corresponding nav link and add active class
        const id = entry.target.getAttribute("id");
        const correspondingLink = document.querySelector(
          `nav ul li a[href="#${id}"]`
        );

        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }, options);

  // Observe all sections with IDs
  sections.forEach((section) => {
    observer.observe(section);
  });
}

function setupHeroObserver() {
  const hero = document.querySelector(".hero");
  const homeLink = document.querySelector('nav ul li a[href="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          hero.classList.add("is-inview");
          // Highlight home link when hero is in view
          document.querySelectorAll("nav ul li a").forEach((link) => {
            link.classList.remove("active");
          });
          homeLink.classList.add("active");
        } else {
          hero.classList.remove("is-inview");
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(hero);
}

// Testimonial slider
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial) => {
    testimonial.classList.remove("active");
  });

  testimonials[index].classList.add("active");
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Mobile menu toggle
function toggleMenu() {
  nav.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
}

// Header scroll effect
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (nav.classList.contains("active")) {
          toggleMenu();
        }
      }
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu
  mobileMenu.addEventListener("click", toggleMenu);

  // Testimonial slider
  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);

  // Header scroll effect
  window.addEventListener("scroll", handleScroll);

  // Smooth scrolling
  setupSmoothScrolling();

  // Auto-advance testimonials
  setInterval(nextTestimonial, 5000);
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
