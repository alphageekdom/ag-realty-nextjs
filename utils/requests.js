const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch All Properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle if domain is unavailable
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error(`Failed To Fetch Data: ${errorDetails}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch Single Property
async function fetchProperty(id) {
  try {
    // Handle if domain is unavailable
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
