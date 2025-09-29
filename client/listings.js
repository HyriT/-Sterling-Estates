// ====================
// Sample Property Data
// ====================
const properties = [
  {
    id: 1,
    title: "Luxury Villa in the Hills",
    price: "$1,200,000",
    location: "Hillside, Dream City",
    bedrooms: 4,
    bathrooms: 3,
    area: "3500 sq ft",
    description: `
      This luxurious villa offers panoramic views of the hills and city skyline.
      Featuring high ceilings, floor-to-ceiling windows, and a modern open-concept
      kitchen. The villa includes a private pool, spa, and a beautifully landscaped garden.
    `,
    amenities: ["Private Pool", "Garage for 2 Cars", "Smart Home System", "Large Garden"],
    reviews: "⭐⭐⭐⭐☆ (24 reviews)",
    images: [
      "/client/images/esref-yasa-549nOjXh1E4-unsplash.jpg",
      "https://media.vrbo.com/lodging/72000000/71470000/71468700/71468634/f6c0b8f2.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      "https://media.vrbo.com/lodging/72000000/71470000/71468700/71468634/3964e58f.jpg?impolicy=resizecrop&rw=1200&ra=fit"
    ]
  },
  {
    id: 2,
    title: "Modern Apartment Downtown",
    price: "$750,000",
    location: "Downtown, City Center",
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq ft",
    description: `
      Located in the heart of the city, this modern apartment features elegant interiors,
      smart layout, and walking distance to shopping centers, restaurants, and public transport.
      Perfect for young professionals and families who want to be close to the action.
    `,
    amenities: ["Balcony", "Gym Access", "Underground Parking", "24/7 Security"],
    reviews: "⭐⭐⭐☆☆ (20 reviews)",
    images: [
      "/client/images/connie-garrad-VGtMvqHDpFw-unsplash.jpg",
      "https://images.trvl-media.com/lodging/46000000/45840000/45838600/45838600/9a7ccc63.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      "https://images.trvl-media.com/lodging/46000000/45840000/45838600/45838600/b26d05e5.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
    ]
  },
  {
    id: 3,
    title: "Cozy Suburban Home",
    price: "$500,000",
    location: "Green Valley Suburbs",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sq ft",
    description: `
      A family-friendly home located in a quiet neighborhood with nearby schools and parks.
      Features a modern kitchen, spacious living area, and a large backyard perfect for kids and pets.
    `,
    amenities: ["Backyard", "Garage", "Modern Kitchen", "Nearby Schools"],
    reviews: "⭐⭐⭐⭐☆ (27 reviews)",
    images: [
      "/client/images/durian-bullet-JCMQo028t3Q-unsplash.jpg",
      "https://ssl.cdn-redfin.com/photo/145/bigphoto/511/2403511_1_2.jpg",
      "https://i.pinimg.com/736x/e2/fc/2d/e2fc2d1426377f4ba203b781462e2182.jpg"
    ]
  },
  {
    id: 4,
    title: "Seaside Cottage",
    price: "$350,000",
    location: "Oceanfront, Blue Bay",
    bedrooms: 2,
    bathrooms: 1,
    area: "900 sq ft",
    description: `
      Enjoy breathtaking sea views from this cozy cottage. Ideal as a holiday home,
      it includes a charming deck, rustic interiors, and direct beach access. Perfect for relaxation
      and weekend getaways.
    `,
    amenities: ["Ocean View Deck", "Fireplace", "Private Path to Beach", "Outdoor Dining Area"],
    reviews: "⭐⭐⭐⭐ (30 reviews)",
    images: [
      "/client/images/timo-wielink-fUazXkugSAM-unsplash.jpg",
      "https://katharinepooley.b-cdn.net/wp-content/uploads/2021/05/1_27_Devon_Beach_House_63806713-2560x1353.jpg",
      "https://katharinepooley.b-cdn.net/wp-content/uploads/2021/05/1_27_Devon_Beach_House_63788235-aspect-ratio-2560-1686.jpg"
    ]
  }
];

// ====================
// PROPERTY DETAILS PAGE
// ====================
const propertyDetailsContainer = document.getElementById("property-details");
if (propertyDetailsContainer) {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = parseInt(urlParams.get("id"));
  const property = properties.find(p => p.id === propertyId);

  if (property) {
    propertyDetailsContainer.innerHTML = `
      <h2>${property.title}</h2>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Location:</strong> ${property.location}</p>
      <p><strong>Bedrooms:</strong> ${property.bedrooms} | 
         <strong>Bathrooms:</strong> ${property.bathrooms} | 
         <strong>Area:</strong> ${property.area}</p>
      <p><strong>Description:</strong> ${property.description}</p>
      <p><strong>Amenities:</strong> ${property.amenities.join(", ")}</p>
      <p><strong>Reviews:</strong> ${property.reviews}</p>
      <div class="gallery" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:15px;">
        ${property.images.map(img => `<img src="${img}" alt="${property.title}" style="width:250px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.2)">`).join('')}
      </div>
    `;
  } 
}

const filterForm = document.getElementById('filter-form');
const propertiesGrid = document.getElementById('properties-grid');

// Funksioni për të krijuar kartën e pronës me butonin Reserve
function createPropertyCard(p) {
  return `
  <div class="property-card">
    <img src="${p.imageUrls && p.imageUrls.length ? p.imageUrls[0] : 'default.jpg'}" alt="${p.name}">
    <div class="property-info">
      <h3>${p.name}</h3>
      <p>Price: $${p.discountPrice || p.regularPrice}</p>
      <p>${p.bedrooms} Bed • ${p.bathrooms} Bath</p>
      <p><i class="fas fa-map-marker-alt"></i> ${p.address}</p>
      <p>Type: ${p.type}</p>
      <button class="reserve-btn" data-id="${p._id}">Reserve</button>
    </div>
  </div>
  `;
} 

// Filtrimi i pronave
filterForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const filters = {
    maxPrice: document.getElementById('price-max').value,
    minPrice: document.getElementById('price-min').value,
    bedroom: document.getElementById('bedrooms').value,
    bathroom: document.getElementById('bathrooms').value,
    type: document.getElementById('type') ? document.getElementById('type').value : undefined,
    location: document.getElementById('location').value
  };

  // Fshij filter që janë bosh
  Object.keys(filters).forEach(key => {
    if (!filters[key]) delete filters[key];
  });

  try {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`http://localhost:5000/api/listing/filter?${query}`);
    let properties = await res.json();

    // Filtrim ekstra për minPrice
    if (filters.minPrice) {
      properties = properties.filter(p => (p.discountPrice || p.regularPrice) >= Number(filters.minPrice));
    }

    // Popullo grid-in
    propertiesGrid.innerHTML = properties.map(p => createPropertyCard(p)).join('');

  } catch (error) {
    console.error('Error fetching properties:', error);
  }
});

propertiesGrid.addEventListener('click', async (e) => {
  if (e.target.classList.contains('reserve-btn')) {
    const propertyId = e.target.dataset.id;

    try {
      const res = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ propertyId })
      });

      const data = await res.json();
      console.log('Status:', res.status);
      console.log('Response:', data);

      if (res.ok) alert('Booking successfully!');
      else alert(data.message || 'Error.');
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Error connecting to server.');
    }
  }
});
