import BGGFX from "../../assets/bg-graphics.jpg";
import Container from "../../layouts/Container/Container";

const Footer = () => {
  return (
    <footer
      style={{
        background: `linear-gradient(188deg, rgba(3, 8, 50, 0.90) 1.07%, rgba(87, 44, 210, 0.90) 117.56%), url(${BGGFX}), lightgray 50% / cover no-repeat`,
        backgroundPosition: "center",
        borderTop: "3px solid #2D1FC8",
      }}
      className="hidden md:block"
    >
      <Container
        className={`py-20 px-3 text-white text-center text-[20px] font-[300]`}
      >
        2023 @ SHAH SAMIN YASAR
        <br />
        HSC BATCH 2025
      </Container>
    </footer>
  );
};
export default Footer;
