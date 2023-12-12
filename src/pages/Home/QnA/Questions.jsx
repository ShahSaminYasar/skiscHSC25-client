import { ScrollRestoration } from "react-router-dom";
import QnACard from "../../../components/Cards/QnACard/QnACard";
import LoaderDiv from "../../../components/Loaders/LoaderDiv";
import NoDataText from "../../../components/NoData/NoDataText";
import Title from "../../../components/Title/Title";
import useQnA from "../../../hooks/GET/useQnA";
import Container from "../../../layouts/Container/Container";

const Questions = () => {
  let qnas = useQnA();
  const qnasState = qnas;
  qnas = qnas?.data;

  if (qnasState?.isLoading) return <LoaderDiv />;
  if (qnasState?.error)
    return (
      <NoDataText>
        {qnasState?.error || "An error occured, please try again."}
      </NoDataText>
    );

  if (qnas?.length === 0) return;

  return (
    <section className="section bg-[#010313]">
      <ScrollRestoration />
      <Container>
        <Title>QnA</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {qnas?.map((qna) => (
            <QnACard key={qna?._id} qna={qna} />
          ))}
        </div>
      </Container>
    </section>
  );
};
export default Questions;
