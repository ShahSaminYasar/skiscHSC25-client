import Title from "../../../components/Title/Title";
import Admins from "./Admins";
import Students from "./Students";
import Waiting from "./Waiting";

const Users = () => {
  return (
    <section className="w-full">
      <Admins />

      
      <Waiting />

      <div className="my-[25px]"></div>

      <Title className="mb-[5px]">Users</Title>
      <Students />
    </section>
  );
};
export default Users;
