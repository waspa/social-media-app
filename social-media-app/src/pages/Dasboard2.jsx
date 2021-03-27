import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/Timeline";

export default function Dasboard2() {
  useEffect(() => {
    document.title = "Home - Social App";
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <Timeline />
      <div>I am the dashboard</div>
    </>
  );
}
