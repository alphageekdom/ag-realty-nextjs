const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch All Properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle if domain is unavailable
    if (!apiDomain) {
      console.error('API domain is not set.');
      return [];
    }

    const endpoint = `${apiDomain}/api/properties${
      showFeatured ? '/featured' : ''
    }`;

    const res = await fetch(endpoint, { cache: 'no-store' });

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(`Failed To Fetch Data: ${errorDetails}`);
    }

    return res.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

// Fetch Single Property
async function fetchProperty(id) {
  try {
    // Handle if domain is unavailable
    if (!apiDomain) {
      console.error('API domain is not set.');
      return null;
    }

    const endpoint = `${apiDomain}/api/properties/${id}`;

    const res = await fetch(endpoint);

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(`Failed To Fetch Data: ${errorDetails}`);
    }

    return res.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export { fetchProperties, fetchProperty };
