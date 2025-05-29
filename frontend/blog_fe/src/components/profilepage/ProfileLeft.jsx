import React from "react";

export default function ProfileLeft() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed h-screen w-1/2 top-0 left-0 p-20 ">
      {/* Profile Section */}
      <h1 className="text-5xl mb-2">Sarah Dayan</h1>
      <h2 className="text-2xl mb-4 text-gray-400">
        Principal Software Engineer at Algolia
      </h2>
      <p className="leading-relaxed mb-6">
        I build open-source front-end libraries at{" "}
        <a href="#" className="underline hover:no-underline">
          Algolia
        </a>{" "}
        and host two tech podcasts:{" "}
        <a href="#" className="underline hover:no-underline">
          Developer Experience
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:no-underline">
          Entre Devs
        </a>
        . In my spare time, I share what I learn on my{" "}
        <a href="#" className="underline hover:no-underline">
          blog
        </a>{" "}
        and speak at{" "}
        <a href="#" className="underline hover:no-underline">
          tech conferences
        </a>{" "}
        around the world.
      </p>

      {/* Navigation */}
      <nav>
        <ul>
          <li
            className="mb-4 text-lg cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => scrollToSection("projects-section")}
          >
            <span className="mr-2 text-gray-400">01</span> PROJECTS
          </li>
          <li
            className="mb-4 text-lg cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => scrollToSection("articles-section")}
          >
            <span className="mr-2 text-gray-400">02</span> ARTICLES
          </li>
          <li
            className="mb-4 text-lg cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => scrollToSection("certifications-section")}
          >
            <span className="mr-2 text-gray-400">03</span> CERTIFICATIONS
          </li>
        </ul>
      </nav>

      {/* Social Links */}
      <div className="mt-8 flex items-center">
        {/* Placeholder for profile picture */}
        <img src="#" alt="Profile" className="w-12 h-12 rounded-full mr-5" />
        <a href="#" className="mr-5 underline hover:no-underline">
          Twitter
        </a>
        <a href="#" className="underline hover:no-underline">
          GitHub
        </a>
      </div>
    </div>
  );
}
