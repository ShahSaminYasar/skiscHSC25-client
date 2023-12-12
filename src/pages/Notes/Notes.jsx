// TODO: Add pagination
// import { useState } from "react";
import useNotes from "../../hooks/GET/useNotes";
import LoaderPage from "../../components/Loaders/LoaderPage";
import NoDataText from "../../components/NoData/NoDataText";
import Container from "../../layouts/Container/Container";
import PageBanner from "../../components/PageBanner/PageBanner";
import NoteCard from "../../components/Cards/NoteCard/NoteCard";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Notes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const [limit, setLimit] = useState(9);
  let notes = useNotes(null, null);

  if (notes?.isLoading) return <LoaderPage />;
  if (notes?.error)
    return (
      <NoDataText className="text-red-500">
        {notes?.error || "An error occured"}
      </NoDataText>
    );

  notes = notes?.data;

  return (
    <section className="page">
      <Helmet>
        <title>Notes | SKISC HSC 2025</title>
      </Helmet>
      <PageBanner>NOTES</PageBanner>
      <Container
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-5 py-7 px-3 pb-12`}
      >
        {notes?.map((note) => (
          <NoteCard key={note?._id} note={note} />
        ))}
      </Container>
    </section>
  );
};
export default Notes;
