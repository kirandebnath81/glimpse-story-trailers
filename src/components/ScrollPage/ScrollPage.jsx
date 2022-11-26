import { useEffect, useState } from "react";

//icon
import { BsFillArrowUpCircleFill } from "react-icons/bs";

//styles
import { ScrollTopButton } from "./ScrollPage.styles";

const ScrollPage = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  //display the scroll btn when the window scrolls a specific height
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 500) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <ScrollTopButton
      onClick={() => window.scroll(0, 0)}
      style={{ bottom: showScrollBtn ? "120px" : "-120px" }}
    >
      <BsFillArrowUpCircleFill />
    </ScrollTopButton>
  );
};

export default ScrollPage;
