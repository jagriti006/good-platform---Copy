import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.getElementById('main');
    if (main) {
      main.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
