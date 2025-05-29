import React from "react";
import ProjectsList from "../components/profilepage/projects/ProjectsList";
import  ProfileLeft  from "../components/profilepage/ProfileLeft";
import { BlogList } from "../components/profilepage/article/ArticleList";
import { CertItemList } from "../components/profilepage/certifications/CertItemList";

function ProfilePage() {
  return (
    <div className="p-5 text-white min-h-screen">
      <ProfileLeft />
      <div className="pl-[50%] min-h-screen">
        <div className="max-w-4xl mx-auto py-20 space-y-22  pr-20 ">
          <section id="projects-section" className="" >
            <h2 className="text-3xl font-bold mb-8 text-white">Projects</h2>
            <ProjectsList />
          </section>

          <section id="articles-section" >
            <h2 className="text-3xl font-bold mb-8 text-white">Articles</h2>
            <BlogList />
          </section>

          <section id="certifications-section" >
            <h2 className="text-3xl font-bold mb-8 text-white">
              Certifications
            </h2>
            <CertItemList />
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
