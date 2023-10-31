import Nav from "../components/navbar/nav";
import TopBar from "../components/navbar/topBar";
import { GetUser } from "@/actions/getUser";

const Layout = ({ children }) => {
  const user = GetUser();
  return (
    <div className={"flex flex-col items-center bg-bgLight dark:bg-bg"}>
      <TopBar user={user} />
      <main className="dark:bg-bg bg-bgLight w-screen">{children}</main>
      <Nav />
    </div>
  );
};

export default Layout;
