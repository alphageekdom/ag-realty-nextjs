import '@/assets/styles/global.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'AG Realty | Find The Perfect Rental',
  description: 'Explore your next home',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
