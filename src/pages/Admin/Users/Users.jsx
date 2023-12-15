import { Helmet } from "react-helmet";
import Title from "../../../components/Title/Title";
import Admins from "./Admins";
import Students from "./Students";
import Waiting from "./Waiting";

const Users = () => {
  return (
    <section className="w-full bg-[#010313]">
      <Helmet>
        <title>Users | SKISC HSC 2025</title>
      </Helmet>
      <Waiting />
      <div className="my-[25px]"></div>
      <Admins />
      <div className="my-[25px]"></div>
      <Title className="mb-[5px]">Users</Title>
      <Students />
    </section>
  );
};
export default Users;
