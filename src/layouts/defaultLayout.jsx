import Navbar from "./../components/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-bg">{children}</main>
    </>
  );
};

export default Layout;
