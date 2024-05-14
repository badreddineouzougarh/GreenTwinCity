import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className={` bg-white	 hidden flex-row items-center justify-between sticky ${theme === "light" && "bg-white"} dark:text-white top-0 z-10 tablet:flex`}>
        <h1 onClick={() => router.push("/")} className="font-medium  text-2xl cursor-pointer mob:p-2 laptop:p-0 flex items-center">
          <img className="  mob:p-2 laptop:p-0 flex items-center h-6 mr-1" src={"/images/DALL·E-2024-05-09-22.41.svg"} alt="" />{name}.
        </h1>

        {!isBlog ?(
          <div className="flex">
            <Button onClick={() => router.push("")}>Home </Button>
            <Button onClick={handleWorkScroll}> Information on Bengureurir</Button>
            <Button onClick={handleAboutScroll}>City Organisation </Button>
            {showBlog && (
              <Button onClick={() => router.push("/blog")}>Decision Making</Button>
            )}
            {showResume && (
              <Button onClick={() => router.push("/resume")} classes="first:ml-1">
                About The project
              </Button>
            )}
            <Button onClick={() => window.open("mailto:ouzougarhbadred-dine@iav.ac.ma")}>
              Contact
            </Button>
            {mounted && theme && data.darkMode && (
              <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <img className="h-6" src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`} alt="" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex">
            <Button onClick={() => router.push("/")}>Home</Button>
            {showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            {showResume && (
              <Button onClick={() => router.push("/resume")} classes="first:ml-1">
                Resume
              </Button>
            )}
            <Button onClick={() => window.open("mailto:ouzougarhbadred-dine@iav.ac.ma")}>
              Contact
            </Button>
            {mounted && theme && data.darkMode && (
              <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <img className="h-6" src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`} alt="" />
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
