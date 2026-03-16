import { Route, BrowserRouter as Router, Routes } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import PageClassification from "./pages/PageClassification";
import NotFound from "./pages/NotFound";
import PageClassificationList from "./pages/PageClassificationList";
import PageBeranda from "./pages/PageBeranda";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            {/* Menu */}
            <Route index path="/" element={<PageBeranda />} />
            <Route path="/classification" element={<PageClassification />} />
            <Route
              path="/classification-list"
              element={<PageClassificationList />}
            />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
