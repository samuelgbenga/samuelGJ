import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../route/route";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import wave from "../../assets/img/waving1.gif";

export default function ProfileLeft({ visibleSections }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed h-screen w-1/2 top-0 left-0 p-20 font-['Tektur'] ">
      {/* Profile Section */}

      <h1 className="text-5xl font-bold mb-8 relative overflow-hidden">
        <div className="relative">
          <div className="relative h-30">
            <div className="absolute top-0 left-0 animate-hi-appear">
              Hi{" "}
              <img
                src={wave}
                alt="waving gif"
                height={36}
                width={36}
                className="inline"
              />{" "}
              <PetalsHi />
            </div>
            <div className="absolute top-15 left-0 animate-myname-appear">
              My name is
            </div>
            <div className="absolute top-0 left-0 animate-name-appear">
              Samuel <span className="text-[#8CBF75]">Gbenga</span> <br />{" "}
              Joseph
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white animate-line-disappear"></div>
        </div>
      </h1>
      <h2 className=" text-[#cccccc] mb-3 text-xl font-bold leading-[1.208]! text-dark sm:text-[42px] lg:text-[40px] xl:text-3xl">
        Software Developer <Petals />
      </h2>

      <Paragraph />
      {/* Navigation */}
      <nav>
        <ul>
          <li
            className={`mb-4 text-[#8CBF75]  text-lg font-bold cursor-pointer flex w-8 ${
              visibleSections.Projects && "text-white"
            }  diagonal-shake`}
            onClick={() => scrollToSection("projects-section")}
          >
            <span
              className={` ${
                visibleSections.Projects ? "text-white" : "text-[#8CBF75]"
              }`}
            >
              -
            </span>{" "}
            PROJECTS
          </li>
          <li
            className={`mb-4 text-[#8CBF75] text-lg font-bold cursor-pointer flex w-8  ${
              visibleSections.Articles && "text-white"
            }  diagonal-shake`}
            onClick={() => scrollToSection("articles-section")}
          >
            <span
              className={` ${
                visibleSections.Articles ? "text-white" : "text-[#8CBF75]"
              }`}
            >
              -
            </span>{" "}
            ARTICLES
          </li>
          <li
            className={`mb-4 text-[#8CBF75] text-lg font-bold cursor-pointer flex w-8  ${
              visibleSections.Certifications && "text-white"
            }  diagonal-shake`}
            onClick={() => scrollToSection("certifications-section")}
          >
            <span
              className={` ${
                visibleSections.Certifications ? "text-white" : "text-[#8CBF75]"
              }`}
            >
              -
            </span>{" "}
            CERTIFICATIONS
          </li>
        </ul>
      </nav>

      {/* Social Links */}
      <div className="mt-30 flex items-center justify-between">
        <a
          href="#"
          className="text-white hover:text-[#8CBF75] transition-colors duration-300 text-lg"
        >
          <FaLinkedin />
        </a>
        <a
          href="#"
          className="text-white hover:text-[#8CBF75] transition-colors duration-300 text-lg"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          className="text-white hover:text-[#8CBF75] transition-colors duration-300 text-lg"
        >
          <FaGithub />
        </a>
        <Petals1 />
        <Petals2 />
        <Petals3 />
      </div>
    </div>
  );
}

// components
const OpenQuote = () => {
  return (
    <>
      <svg
        className="absolute -left-2 -top-2"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10 C5 15, 5 25, 15 30"
          stroke="#8CBF75"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 10 C15 15, 15 25, 25 30"
          stroke="#8CBF75"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </>
  );
};

const Petals = () => {
  return (
    <>
      <svg
        className="absolute -left-2 -top-2"
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6;
          return (
            <ellipse
              key={i}
              cx="50"
              cy="30"
              rx="15"
              ry="30"
              fill="#8CBF75"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </svg>
    </>
  );
};

const PetalsHi = () => {
  return (
    <>
      <svg
        className="absolute left-17 top-15"
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6;
          return (
            <ellipse
              key={i}
              cx="50"
              cy="30"
              rx="15"
              ry="30"
              fill="#8CBF75"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </svg>
    </>
  );
};

const Petals1 = () => {
  return (
    <>
      <svg
        className="absolute right-15 top-15 font-bold text-[#8CBF75] text-xl diagonal-shake inline-block cursor-pointer"
        width="16"
        height="16"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6;
          return (
            <ellipse
              key={i}
              cx="50"
              cy="30"
              rx="15"
              ry="30"
              fill="#8CBF75"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </svg>
    </>
  );
};

const Petals2 = () => {
  return (
    <>
      <svg
        className="absolute left-102 bottom-84 font-bold text-[#8CBF75] text-xl diagonal-shake inline-block cursor-pointer"
        width="12"
        height="12"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6;
          return (
            <ellipse
              key={i}
              cx="50"
              cy="30"
              rx="15"
              ry="30"
              fill="#8CBF75"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </svg>
    </>
  );
};

const Petals3 = () => {
  return (
    <>
      <svg
        className="absolute left-60 bottom-69 font-bold text-[#8CBF75] text-xl diagonal-shake inline-block cursor-pointer"
        width="11"
        height="11"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6;
          return (
            <ellipse
              key={i}
              cx="50"
              cy="30"
              rx="15"
              ry="30"
              fill="#8CBF75"
              opacity="0.3"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </svg>
    </>
  );
};
const CloseQoute = () => {
  return (
    <>
      <svg
        className="absolute left-38 -bottom-3"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 10 C30 15, 30 25, 20 30"
          stroke="#8CBF75"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M15 10 C20 15, 20 25, 10 30"
          stroke="#8CBF75"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </>
  );
};

const Paragraph = () => {
  return (
    <>
      <p className="leading-loose mb-6 text-justify relative ">
        I'm a{" "}
        <span className="font-bold text-[#8CBF75] text-xl diagonal-shake inline-block cursor-pointer">
          Software Developer
        </span>{" "}
        who builds smart, scalable{" "}
        <span className="font-bold text-[#8CBF75] text-xl diagonal-shake inline-block cursor-pointer">
          solutions
        </span>{" "}
        for startups, SMEs, and established brands looking to grow in the tech
        space. Backed by a{" "}
        <span className="font-bold text-[#8CBF75] text-xl diagonal-shake inline-block cursor-pointer">
          team
        </span>{" "}
        of goal-getters, I turn ideas into reality — quickly and effectively. I
        also write weekly{" "}
        <span className="font-bold text-[#8CBF75] text-xl diagonal-shake inline-block cursor-pointer">
          articles{" "}
        </span>{" "}
        on tech and life, sharing insights you'll actually enjoy reading. And
        yes — Lesth I forget,{" "}
        <span className="font-bold text-[#8CBF75] text-xl diagonal-shake inline-block cursor-pointer">
          Jesus love you.
        </span>
      </p>
    </>
  );
};

// Add loading under the my name is
// the blank/idle pacing should be dealth with
