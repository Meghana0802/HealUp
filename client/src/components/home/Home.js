import React from "react";
import MainLayout from "../MainLayout";
import HomeLayout from "./HomeLayout";
import { Route, Routes } from "react-router-dom";
import Resources from "../resources/Resources";
import Journal from "../journal/Journal";
import Forum from "../forum/Forum";

export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<div />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route exact path="resources" element={<Resources />} />
          <Route exact path="journal" element={<Journal />} />
          <Route exact path="forum" element={<Forum />} />
        </Route>
      </Routes>
    </>
  );
}
