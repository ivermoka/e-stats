import Nav from "../components/navbar/nav";
import TopBar from "../components/navbar/topBar";
import { GetUser } from "@/actions/getUser";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const user = GetUser();
  return (
    <div className={"flex flex-col items-center w-screen"}>
      <TopBar user={user} />
      <main className="overflow-hidden">{children}</main>
      {user && <Nav />}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Layout;
