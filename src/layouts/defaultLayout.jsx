import Nav from "../components/navbar/nav";
import TopBar from "../components/navbar/topBar";
import { GetUser } from "@/actions/getUser";

const Layout = ({ children }) => {
  const user = GetUser();
  return (
    <div
      className={"flex flex-col items-center w-screen dark:bg-bg bg-bgLight"}
    >
      <TopBar user={user} />
      <main className="overflow-hidden">{children}</main>
      {user && <Nav />}
    </div>
  );
};

export default Layout;
