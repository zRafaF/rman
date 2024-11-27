import { Outlet } from "react-router";
import Header from "./components/Header";
import { FunctionComponent } from "react";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
