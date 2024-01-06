import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "../../components/Footer/Footer";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Container from "../Container/Container";
import {
  FaBook,
  FaClipboardList,
  FaDoorOpen,
  FaEnvelope,
  FaGears,
  FaHouse,
  FaIdBadge,
  FaListCheck,
  FaPenNib,
  FaQuestion,
  FaUsers,
} from "react-icons/fa6";
import useAuth from "../../hooks/Auth/useAuth";
import { GiVote } from "react-icons/gi";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <Header />
      <main>
        <Container className="max-w-[1472px]">
          <div className="drawer lg:drawer-open">
            <input
              id="dashboard-sidebar"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content flex flex-col items-start justify-start px-5 py-3 pb-12 bg-[#010313] min-h-[90vh]">
              {/* Page content here */}
              <Outlet />
            </div>
            <div className="drawer-side lg:border-r-2 lg:border-r-[#241a7c] z-[998]">
              <label
                htmlFor="dashboard-sidebar"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="p-4 w-[220px] xs:w-[270px] sm:w-[300px]  min-h-full bg-[#04071F] text-white text-[20px] font-[400] flex flex-col gap-[5px] pb-14">
                {/* Sidebar content here */}
                <ProfileCard className="mb-3" />
                {/* Navlinks */}
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                      isActive
                        ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                        : "bg-transparent"
                    }`
                  }
                >
                  <FaIdBadge /> Profile
                </NavLink>
                <NavLink
                  to="/dashboard/my-notes"
                  className={({ isActive }) =>
                    `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                      isActive
                        ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                        : "bg-transparent"
                    }`
                  }
                >
                  <FaBook /> My Notes
                </NavLink>
                <NavLink
                  to="/dashboard/my-posts"
                  className={({ isActive }) =>
                    `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                      isActive
                        ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                        : "bg-transparent"
                    }`
                  }
                >
                  <FaPenNib /> My Posts
                </NavLink>
                <NavLink
                  to="/dashboard/qna"
                  className={({ isActive }) =>
                    `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                      isActive
                        ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                        : "bg-transparent"
                    }`
                  }
                >
                  <FaQuestion /> QnA
                </NavLink>
                <NavLink
                  to="/dashboard/my-votes"
                  className={({ isActive }) =>
                    `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                      isActive
                        ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                        : "bg-transparent"
                    }`
                  }
                >
                  <GiVote /> Votes by me
                </NavLink>

                {(user?.role === "admin" || user?.role === "developer") && (
                  <>
                    <div className="divider my-0"></div>

                    <NavLink
                      to="/dashboard/stats"
                      className={({ isActive }) =>
                        `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                          isActive
                            ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <FaGears /> Stats
                    </NavLink>
                    <NavLink
                      to="/dashboard/users"
                      className={({ isActive }) =>
                        `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                          isActive
                            ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <FaUsers /> Users
                    </NavLink>
                    <NavLink
                      to="/dashboard/homeworks"
                      className={({ isActive }) =>
                        `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                          isActive
                            ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <FaListCheck /> Homeworks
                    </NavLink>
                    <NavLink
                      to="/dashboard/assignments"
                      className={({ isActive }) =>
                        `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                          isActive
                            ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <FaClipboardList /> Assignments
                    </NavLink>
                    <NavLink
                      to="/dashboard/notes"
                      className={({ isActive }) =>
                        `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                          isActive
                            ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <FaBook /> Notes
                    </NavLink>
                    <NavLink
                      to="/dashboard/posts"
                      className={({ isActive }) =>
                        `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                          isActive
                            ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <FaPenNib /> Posts
                    </NavLink>
                    <NavLink
                      to="/dashboard/messages"
                      className={({ isActive }) =>
                        `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                          isActive
                            ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                            : "bg-transparent"
                        }`
                      }
                    >
                      <FaEnvelope /> Messages
                    </NavLink>
                  </>
                )}

                <div className="divider my-0"></div>

                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex flex-row gap-2 items-center px-3 py-[6px] rounded-md ${
                      isActive
                        ? "bg-gradient-to-r from-[#1E245A] to-[#261053]"
                        : "bg-transparent"
                    }`
                  }
                >
                  <FaHouse /> Home
                </NavLink>
                <button
                  onClick={logout}
                  className="text-[#FF002E] flex flex-row gap-2 items-center px-3 py-[6px]"
                >
                  <FaDoorOpen /> Logout
                </button>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};
export default DashboardLayout;
