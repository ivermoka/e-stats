import Navbar from "./../components/navbar/navbar";
import Footer from "./../components/footer/footer";

const Layout = ({ children }) => {
  return (
    <>
      <main className="bg-bg">{children}</main>
      <Navbar />
    </>
  );
};

export default Layout;
