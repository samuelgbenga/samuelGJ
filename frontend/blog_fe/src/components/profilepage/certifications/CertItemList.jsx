import React from "react";
import CertItems from "./CertItems";

const certificationsData = [
  {
    type: "play",
    title: "What sets a senior engineer apart",
    source: "Inside Intercom — with Brian Scanlan, Liam Geraghty",
    date: "AUGUST 18, 2022",
  },
  {
    type: "play",
    title: "JavaScript Autocomplete",
    source: "Learn With Jason — with Jason Lengstorf",
    date: "JUNE 29, 2021",
  },
  {
    type: "play",
    title: "StaffEng",
    source: "StaffEng — with David Noël-Romas, Alex Kessinger",
    date: "MARCH 30, 2021",
  },
  // {
  //   type: "play",
  //   title: "StaffEng",
  //   source: "StaffEng — with David Noël-Romas, Alex Kessinger",
  //   date: "MARCH 30, 2021",
  // },
  // {
  //   type: "play",
  //   title: "StaffEng",
  //   source: "StaffEng — with David Noël-Romas, Alex Kessinger",
  //   date: "MARCH 30, 2021",
  // },
  // {
  //   type: "play",
  //   title: "StaffEng",
  //   source: "StaffEng — with David Noël-Romas, Alex Kessinger",
  //   date: "MARCH 30, 2021",
  // },
  // {
  //   type: "play",
  //   title: "StaffEng",
  //   source: "StaffEng — with David Noël-Romas, Alex Kessinger",
  //   date: "MARCH 30, 2021",
  // },
  // {
  //   type: "play",
  //   title: "StaffEng",
  //   source: "StaffEng — with David Noël-Romas, Alex Kessinger",
  //   date: "MARCH 30, 2021",
  // },
  // {
  //   type: "play",
  //   title: "StaffEng",
  //   source: "StaffEng — with David Noël-Romas, Alex Kessinger",
  //   date: "MARCH 30, 2021",
  // },
  
];

export const CertItemList = () => {
  return (
    <div className="mt-2">
      {certificationsData.map((item, index) => (
        <CertItems key={index} item={item} />
      ))}
    </div>
  );
};
