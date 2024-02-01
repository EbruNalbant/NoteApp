import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type LayoutPropsType = {
  notes: Note[];
};

// finding the correct note based on id from url and
// passing this note information to all child routes
const Layout = ({ notes }: LayoutPropsType) => {
  const { id } = useParams();

  //   find the note
  const found = notes.find((n) => n.id === id);

  //   if the note is not found, redirect to the homepage.
  if (!found) return <Navigate to={"/"} replace />;

  return <Outlet context={found} />;
};

export default Layout;
