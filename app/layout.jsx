import '@/assets/styles/global.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: 'AG Realty | Find The Perfect Rental',
  description: 'Explore your next home',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
