import '@/assets/styles/global.css';

export const metadata = {
  title: 'AG Realty | Find The Perfect Rental',
  description: 'Explore your next home',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
