import { useEffect } from "react";

interface Props {}

const useTitleHook = (title: string) => {
  useEffect(() => {
    window.document.title = title;
    return () => {
      window.document.title = title;
    };
  }, []);
};

export default useTitleHook;
