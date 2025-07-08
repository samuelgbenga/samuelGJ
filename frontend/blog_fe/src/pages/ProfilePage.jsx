import React, { useState, useEffect, useRef } from "react";
import ProjectsList from "../components/profilepage/projects/ProjectsList";
import ProfileLeft from "../components/profilepage/ProfileLeft";
import { BlogList } from "../components/profilepage/article/ArticleList";
import { CertItemList } from "../components/profilepage/certifications/CertItemList";
import img from "../assets/img/samuelprof1.png";

function ProfilePage() {
  // State to track which section is currently visible
  const [visibleSections, setVisibleSections] = useState({
    Projects: true,
    Articles: false,
    Certifications: false,
  });

  // Refs for each section heading (h2)
  const projectsHeadingRef = useRef(null);
  const articlesHeadingRef = useRef(null);
  const certificationsHeadingRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    // Track which sections are currently visible to avoid duplicate logs
    const visibleSectionsSet = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionName = entry.target.textContent.toLowerCase();

        if (entry.isIntersecting && !visibleSectionsSet.has(sectionName)) {
          // Section just entered the viewport
          visibleSectionsSet.add(sectionName);

          // Get the current scroll position to determine direction
          const elementTop = entry.boundingClientRect.top;

          // Determine if the section is entering from top or bottom
          let direction = "";
          if (elementTop < 0) {
            direction = "from bottom (scrolling up)";
          } else {
            direction = "from top (scrolling down)";
          }

          // console.log(`${sectionName} section entered the screen ${direction}`);

          // Update the visibleSections state
          const newVisibleSections = {
            Projects: false,
            Articles: false,
            Certifications: false,
          };

          // Set the current section to true based on the section name
          if (sectionName === "projects") {
            newVisibleSections.Projects = true;
          } else if (sectionName === "articles") {
            newVisibleSections.Articles = true;
          } else if (sectionName === "certifications") {
            newVisibleSections.Certifications = true;
          }

          setVisibleSections(newVisibleSections);
          //console.log("Updated visibleSections:", newVisibleSections);
        } else if (
          !entry.isIntersecting &&
          visibleSectionsSet.has(sectionName)
        ) {
          // Section just left the viewport
          visibleSectionsSet.delete(sectionName);
          //console.log(`${sectionName} section left the screen`);
        }
      });
    }, observerOptions);

    // Observe all section headings (h2)
    if (projectsHeadingRef.current)
      observer.observe(projectsHeadingRef.current);
    if (articlesHeadingRef.current)
      observer.observe(articlesHeadingRef.current);
    if (certificationsHeadingRef.current)
      observer.observe(certificationsHeadingRef.current);

    // Cleanup
    return () => {
      if (projectsHeadingRef.current)
        observer.unobserve(projectsHeadingRef.current);
      if (articlesHeadingRef.current)
        observer.unobserve(articlesHeadingRef.current);
      if (certificationsHeadingRef.current)
        observer.unobserve(certificationsHeadingRef.current);
    };
  }, []);

  return (
    <>
      {/* Fixed background image layer */}
      <div
        className="fixed inset-0 w-screen h-screen bg-contain bg-no-repeat bg-center z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.99) 100%), url(${img})`,
        }}
      />
      {/* Foreground content */}
      <div className="relative z-10">
        <ProfileLeft visibleSections={visibleSections} />
        <div className="pl-[50%] min-h-screen">
          <div className="max-w-4xl mx-auto py-20 space-y-22  pr-20 ">
            <section id="projects-section" className="">
              <h2
                ref={projectsHeadingRef}
                className="text-3xl font-bold mb-8 text-white font-['Tektur']"
              >
                PROJECTS
              </h2>
              <ProjectsList />
            </section>

            <section id="articles-section">
              <h2
                ref={articlesHeadingRef}
                className="text-3xl font-bold mb-8 text-white font-['Tektur']"
              >
                ARTICLES
              </h2>
              <BlogList />
            </section>

            <section id="certifications-section">
              <h2
                ref={certificationsHeadingRef}
                className="text-3xl font-bold mb-8 text-white font-['Tektur']"
              >
                CERTIFICATIONS
              </h2>
              <CertItemList />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
