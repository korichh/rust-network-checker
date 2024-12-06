import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Api } from "./lib/api";
import { useOptionsStore } from "./lib/store";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Options from "./pages/Options";
import NotFound from "./pages/NotFound";

export default function App() {
  const setOptions = useOptionsStore((store) => store.setOptions);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const resData = await Api.getOptions({});

        setOptions(resData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setOptions]);

  return (
    <Router>
      <Loading isLoading={isLoading} />
      <div className="w-full min-h-full flex bg-default-light">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<Options />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}