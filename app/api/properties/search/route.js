import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/search
export const GET = async (req) => {
  try {
    await connectDB();

    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    // Construct the query object
    let query = {};

    // Add location to query if provided
    if (location) {
      const locationPattern = new RegExp(location, 'i');
      query.$or = [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ];
    }

    // Add property type to query if provided and not 'All'
    if (propertyType && propertyType !== 'All') {
      const typePattern = new RegExp(propertyType, 'i');
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
