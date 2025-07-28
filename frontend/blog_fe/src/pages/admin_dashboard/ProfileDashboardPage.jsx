import React from "react";
import { FaGithub, FaLinkedin, FaMedium  } from "react-icons/fa";
import img from "../../assets/img/samuelprof1.png";

const ProfileDashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
        {/* Profile Image */}
        <img
          src={img}
          alt="Profile"
          className="w-40 h-40 object-contain rounded-full border-4 border-[#8CBF75] shadow-lg"
        />

        {/* Name & Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#8CBF75]">Samuel Joseph</h1>
          <p className="text-gray-400">
            Software Developer | Writer | Tech Enthusiast
          </p>
        </div>

        {/* Bio Paragraph */}
        <Paragraph />

        {/* More About Me */}
        <div className="bg-[#1a1a1a] w-full p-6 rounded-lg shadow-lg border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-[#8CBF75]">
            More About Me
          </h2>
          <ul className="text-gray-300 list-disc list-inside space-y-2">
            <li>
              Top graduating student from Computer Science department with a
              strong academic record.
            </li>
            <li>
              Skilled in building backend systems using{" "}
              <span className="text-white font-semibold">Spring Boot</span>.
            </li>
            <li>
              Experienced with frontend frameworks like{" "}
              <span className="text-white font-semibold">ReactJS</span>.
            </li>
            <li>
              Proficient in version control, continuous integration & delivery (
              <span className="text-white font-semibold">CI/CD</span>) and
              Dockerized microservices.
            </li>
            <li>
              Passionate about system design, clean code, and writing impactful
              technical articles.
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-6 text-[#8CBF75]">
          <a
            href="https://github.com/samuelgbenga"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/samuel-joseph-gbenga/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://medium.com/@samuelgbenga972"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMedium size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboardPage;

const Paragraph = () => {
  return (
    <p className="leading-loose mb-6 text-justify text-gray-300 relative">
      I'm a{" "}
      <span className="font-bold text-[#8CBF75] text-xl inline-block cursor-pointer">
        Software Developer
      </span>{" "}
      who builds smart, scalable{" "}
      <span className="font-bold text-[#8CBF75] text-xl inline-block cursor-pointer">
        solutions
      </span>{" "}
      for startups, SMEs, and established brands looking to grow in the tech
      space. Backed by a{" "}
      <span className="font-bold text-[#8CBF75] text-xl inline-block cursor-pointer">
        team
      </span>{" "}
      of goal-getters, I turn ideas into reality — quickly and effectively. I
      also write weekly{" "}
      <span className="font-bold text-[#8CBF75] text-xl inline-block cursor-pointer">
        articles{" "}
      </span>{" "}
      on tech and life, sharing insights you'll actually enjoy reading. And yes
      — Lesth I forget,{" "}
      <span className="font-bold text-[#8CBF75] text-xl inline-block cursor-pointer">
        Jesus loves you.
      </span>
    </p>
  );
};
