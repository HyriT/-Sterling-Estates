const properties = [
  {
    category: "Luxury Floor",
    title: "Grand Palace Estate",
    price: "$2,500,000",
    bedrooms: 5,
    bathrooms: 4,
    location: "Beverly Hills, CA",
    description: "A luxurious mansion with panoramic views, featuring a private pool and smart home technology.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  },
  {
    category: "Luxury Floor",
    title: "Oceanfront Villa",
    price: "$3,200,000",
    bedrooms: 4,
    bathrooms: 3,
    location: "Malibu, CA",
    description: "Stunning oceanfront property with direct beach access and modern interiors.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  },
  {
    category: "Modern Floor",
    title: "Urban Loft",
    price: "$750,000",
    bedrooms: 2,
    bathrooms: 2,
    location: "Downtown Miami, FL",
    description: "Sleek and stylish loft with open-plan living and city skyline views.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  },
  {
    category: "Modern Floor",
    title: "Smart Condo",
    price: "$900,000",
    bedrooms: 3,
    bathrooms: 2,
    location: "San Francisco, CA",
    description: "Tech-savvy condo with integrated smart home systems and eco-friendly design.",
    image: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  },
  {
    category: "Classic Floor",
    title: "Victorian Manor",
    price: "$1,200,000",
    bedrooms: 4,
    bathrooms: 3,
    location: "Boston, MA",
    description: "Charming historic manor with restored interiors and a large garden.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  },
  {
    category: "Classic Floor",
    title: "Country Cottage",
    price: "$600,000",
    bedrooms: 3,
    bathrooms: 2,
    location: "Charleston, SC",
    description: "Cozy cottage with classic charm, perfect for a serene lifestyle.",
    image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  }
];

function displayProperties() {
  const propertiesGrid = document.getElementById('properties-grid');
  propertiesGrid.innerHTML = ''; // Clear existing content

  const categories = [...new Set(properties.map(p => p.category))];

  categories.forEach(category => {
    // Create container 
    const categorySection = document.createElement('div');
    categorySection.style.marginBottom = '60px';

    
    const heading = document.createElement('h2');
    heading.textContent = category;
    heading.style.cssText = `
      font-size: 28px;
      font-weight: 600;
      color: #003366;
      margin: 40px 0 20px;
      text-align: center;
      text-transform: uppercase;
    `;

    const grid = document.createElement('div');
    grid.className = 'properties-grid';
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
      justify-content: center;
    `;

    // add listings
    properties
      .filter(p => p.category === category)
      .forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.style.cssText = `
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease;
        `;

        card.innerHTML = `
          <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 200px; object-fit: cover;">
          <div class="property-content" style="padding: 20px;">
            <h3 style="font-size: 20px; margin-bottom: 8px;">${property.title}</h3>
            <div class="price" style="color: #0077cc; font-weight: bold; margin-bottom: 10px;">${property.price}</div>
            <p style="font-size: 14px; color: #555; margin-bottom: 12px;">${property.description}</p>
            <div class="property-details" style="font-size: 13px; color: #777; margin-bottom: 15px;">
              <span>Bedrooms: ${property.bedrooms}</span> | 
              <span>Bathrooms: ${property.bathrooms}</span> | 
              <span>Location: ${property.location}</span>
            </div>
            <button class="contact-agent-btn" data-title="${property.title}" style="
              padding: 10px 20px;
              background-color: #0056d2;
              color: #fff;
              border: none;
              border-radius: 6px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            ">Contact Agent</button>
          </div>
        `;

        grid.appendChild(card);
      });

    categorySection.appendChild(heading);
    categorySection.appendChild(grid);
    propertiesGrid.appendChild(categorySection);
  });

  document.querySelectorAll('.contact-agent-btn').forEach(button => {
    button.addEventListener('click', () => {
          alert(`Contacting agent for: ${button.dataset.title}`);
    });
  });
}

window.onload = displayProperties;

//Filter Properties

document.getElementById("filter-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const minPrice = document.getElementById("price-min").value;
  const maxPrice = document.getElementById("price-max").value;
  const bedrooms = document.getElementById("bedrooms").value;
  const bathrooms = document.getElementById("bathrooms").value;
  const location = document.getElementById("location").value;

  // Build query string
  const queryParams = new URLSearchParams({
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    ...(bedrooms && { bedroom: bedrooms }),
    ...(bathrooms && { bathroom: bathrooms }),
    ...(location && { location }),
  });

  try {
    const res = await fetch(`http://localhost:5000/api/listing/filter?${queryParams.toString()}`);
    const data = await res.json();

    const grid = document.getElementById("properties-grid");
    grid.innerHTML = "";

    if (data.length === 0) {
      grid.innerHTML = "<p>No properties found.</p>";
      return;
    }

    // Populate listings dynamically
    data.forEach(property => {
      const card = document.createElement("div");
      card.classList.add("property-card");
      card.innerHTML = `
        <h3>${property.title}</h3>
        <p>${property.address}</p>
        <p><strong>Price:</strong> $${property.regularPrice}</p>
        <p><strong>Bedrooms:</strong> ${property.bedroom}</p>
        <p><strong>Bathrooms:</strong> ${property.bathroom}</p>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
});


