import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    // <!-- Renters and Owners -->
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='For Renters'
            backgroundColor='bg-gray-100'
            buttonInfo={{
              text: 'Browse Properties',
              link: '/properties',
              backgroundColor: 'bg-black',
            }}
          >
            Discover your ideal rental property. Save your favorite listings and
            reach out to landlords.
          </InfoBox>
          <InfoBox
            heading='For Property Owners'
            backgroundColor='bg-blue-100'
            buttonInfo={{
              text: 'Add Property',
              link: '/properties/add',
              backgroundColor: 'bg-blue-500',
            }}
          >
            Display your properties and connect with potential tenants. Offer
            rentals for short-term stays on Airbnb or long-term leases.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
