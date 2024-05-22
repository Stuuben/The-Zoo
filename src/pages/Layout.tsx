import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export const Layout = () => {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};
