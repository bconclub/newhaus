import Header from './Header';
import Footer from './Footer';
import FloatingButtons from '../shared/FloatingButtons';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Layout;
