import Nav from "../components/navbar/nav";
import TopBar from "../components/navbar/topBar";

const Layout = ({ children }) => {
  return (
    <div className={"flex flex-col items-center"}>
      <TopBar />
      <main className="bg-bg w-screen">{children}</main>
      <Nav />
    </div>
  );
};

export default Layout;
