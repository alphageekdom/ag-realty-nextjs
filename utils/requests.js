const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchFromApi(endpoint, options = {}) {
  if (!apiDomain) {
    console.warn('API domain is unavailable');
    return null;
  }

  try {
    const res = await fetch(`${apiDomain}${endpoint}`, options);

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(
        `Failed to fetch data: ${res.status} ${res.statusText} - ${errorDetails}`
      );
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from API: ${error.message}`);
    return null;
  }
}

async function fetchProperties({ showFeatured = false } = {}) {
  const endpoint = `/properties${showFeatured ? '/featured' : ''}`;
  const options = { cache: 'no-store' };
  return fetchFromApi(endpoint, options) || [];
}

async function fetchProperty(id) {
  const endpoint = `/properties/${id}`;
  return fetchFromApi(endpoint) || null;
}

export { fetchProperties, fetchProperty };
