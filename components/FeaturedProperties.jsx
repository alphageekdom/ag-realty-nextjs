'use client';

import { useState, useEffect } from 'react';
import { fetchProperties } from '@/utils/requests';
import FeaturedPropertyCard from './FeaturedPropertyCard';

const FeaturedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties({ showFeatured: true });
        setProperties(data);
      } catch (error) {
        setError('Failed to load properties.');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) {
    return <p>Loading featured properties...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (properties.length === 0) {
    return <p>No featured properties available at the moment.</p>;
  }

  return (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesPage;
