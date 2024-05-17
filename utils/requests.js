const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch single property
async function fetchProperty(id) {
  try {
    // Check if apiDomain is defined
    if (!apiDomain) {
      console.error('apiDomain is not defined');
      return null;
    }

    // Log the full URL being fetched
    const url = `${apiDomain}/properties/${id}`;
    console.log('Fetching property from URL:', url);

    const res = await fetch(url);

    // Log the status of the response
    console.log('Response status:', res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchProperty:', error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
