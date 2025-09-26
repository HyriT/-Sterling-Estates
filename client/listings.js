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

    // Kontrollo nëse përdoruesi është i loguar
    const token = localStorage.getItem('authToken'); 
    if (!token) {
      alert('You need to login to to a booking.');
      window.location.href = '/auth.html';
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId })
      });

      const data = await res.json();

      if (res.ok) alert('Booking sucesfully!');
      else alert(data.message || 'Error.');
    } catch (err) {
      console.error(err);
      alert('error');
    }
  }
});
