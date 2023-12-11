import { Link, NavLink } from "react-router-dom";
import Container from "../../Container/Container";
import UserDropdown from "../../../components/UserDropdown/UserDropdown";
import {
  FaBook,
  FaClipboardList,
  FaHouse,
  FaListCheck,
  FaPenNib,
  FaPlus,
  FaQuestion,
  FaSquareCaretUp,
  FaHandshakeAngle,
  FaSquareCaretDown,
} from "react-icons/fa6";
import { GiVote } from "react-icons/gi";
import UserDropup from "../../../components/UserDropup/UserDropup";
import NotificationsDropdown from "../../../components/NotificationsDropdown/NotificationsDropdown";

const Header = () => {
  const navlinks = [
    {
      path: "/",
      name: "home",
    },
    {
      path: "/homeworks",
      name: "homeworks",
    },
    {
      path: "/assignments",
      name: "assignments",
    },
    {
      path: "/notes",
      name: "notes",
    },
    {
      path: "/blog",
      name: "blog",
    },
  ];

  return (
    <>
      <header className="bg-[#04071F] bg-opacity-70 backdrop-blur-md text-white px-3 h-[70px] hidden mdd:flex items-center fixed top-0 left-0 w-full z-[998] shadow-lg">
        <Container className="flex flex-row gap-10 justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-[30px] mdd:text-[35px] font-[500] text-white">
              SKISC HSC25
            </h1>
          </Link>

          {/* Navlinks */}
          <nav className="flex flex-col mdd:flex-row gap-6 items-center">
            {navlinks?.map((navlink) => (
              <NavLink
                key={navlink?.name}
                to={navlink?.path}
                className={({ isActive }) =>
                  `capitalize text-[20px] font-400 ${
                    isActive ? "text-[#472DCF]" : "text-white"
                  }`
                }
              >
                {navlink?.name}
              </NavLink>
            ))}
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="text-[16px]">
                <FaSquareCaretDown />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] mt-2 p-2 shadow rounded-[30px] border border-[#2A34D2] flex flex-col gap-2 items-start text-[18px] translate-x-[16px]"
                style={{
                  background:
                    "linear-gradient(180deg, #070936 0%, #16002F 100%)",
                }}
              >
                <li className="w-full rounded-full bg-gradient-to-r from-[#171a4d] to-[#182058]">
                  <NavLink
                    to="/qna"
                    className={({ isActive }) =>
                      `w-full flex flex-row gap-2 items-center p-[6px] rounded-full ${
                        isActive
                          ? "bg-gradient-to-r from-[#070835] to-[#16002F]"
                          : ""
                      }`
                    }
                  >
                    <FaQuestion />
                  </NavLink>
                </li>
                <li className="w-full rounded-full bg-gradient-to-r from-[#171a4d] to-[#182058]">
                  <NavLink
                    to="/requests"
                    className={({ isActive }) =>
                      `w-full flex flex-row gap-2 items-center p-[6px] rounded-full ${
                        isActive
                          ? "bg-gradient-to-r from-[#070835] to-[#16002F]"
                          : ""
                      }`
                    }
                  >
                    <FaHandshakeAngle />
                  </NavLink>
                </li>
                <li className="w-full rounded-full bg-gradient-to-r from-[#171a4d] to-[#182058]">
                  <NavLink
                    to="/votes"
                    className={({ isActive }) =>
                      `w-full flex flex-row gap-2 items-center p-[6px] rounded-full ${
                        isActive
                          ? "bg-gradient-to-r from-[#070835] to-[#16002F]"
                          : ""
                      }`
                    }
                  >
                    <GiVote />
                  </NavLink>
                </li>
              </ul>
            </div>
            <NotificationsDropdown />
            <UserDropdown />
          </nav>
        </Container>
      </header>

      <header className="h-[70px] w-full flex justify-between items-center bg-[#04071F] bg-opacity-70 backdrop-blur-md text-white px-3 mdd:hidden">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-[30px] font-[300] text-white">SKISC HSC25</h1>
        </Link>
        <NotificationsDropdown />
      </header>

      <nav
        className="mdd:hidden fixed bottom-0 left-0 w-full h-[50px] z-[998] rounded-t-xl px-[8px] mdd:px-3 flex flex-row justify-center items-center"
        style={{
          background: "linear-gradient(90deg, #070936 0%, #16002F 100%)",
        }}
      >
        <div className="w-full max-w-[600px] flex flex-row justify-between items-center gap-1">
          <NavLink
            to={`/`}
            className={({ isActive }) =>
              `text-[10px] flex flex-col items-center duration-0 ${
                isActive ? "text-[#4421AF]" : "text-white text-opacity-80"
              }`
            }
          >
            <NavLink
              to={`/`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "duration-0 -translate-y-[3px] text-[23px]"
                    : "text-[20px]"
                }`
              }
            >
              <FaHouse />
            </NavLink>
            Home
          </NavLink>
          <NavLink
            to={`/homeworks`}
            className={({ isActive }) =>
              `text-[10px] flex flex-col items-center duration-0 ${
                isActive ? "text-[#4421AF]" : "text-white text-opacity-80"
              }`
            }
          >
            <NavLink
              to={`/homeworks`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "duration-0 -translate-y-[3px] text-[23px]"
                    : "text-[20px]"
                }`
              }
            >
              <FaListCheck />
            </NavLink>
            HW
          </NavLink>
          <NavLink
            to={`/assignments`}
            className={({ isActive }) =>
              `text-[10px] flex flex-col items-center duration-0 ${
                isActive ? "text-[#4421AF]" : "text-white text-opacity-80"
              }`
            }
          >
            <NavLink
              to={`/assignments`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "duration-0 -translate-y-[3px] text-[23px]"
                    : "text-[20px]"
                }`
              }
            >
              <FaClipboardList />
            </NavLink>
            Assignments
          </NavLink>
          <button
            className="w-[40px] h-[40px] rounded-full flex flex-col items-center justify-center text-[24px] -translate-y-[15px]"
            style={{
              background: "linear-gradient(290deg, #2E32D2, #7520C9)",
            }}
          >
            <FaPlus />
          </button>
          <NavLink
            to={`/notes`}
            className={({ isActive }) =>
              `text-[10px] flex flex-col items-center duration-0 ${
                isActive ? "text-[#4421AF]" : "text-white text-opacity-80"
              }`
            }
          >
            <NavLink
              to={`/notes`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "duration-0 -translate-y-[3px] text-[23px]"
                    : "text-[20px]"
                }`
              }
            >
              <FaBook />
            </NavLink>
            Notes
          </NavLink>
          <NavLink
            to={`/blog`}
            className={({ isActive }) =>
              `text-[10px] flex flex-col items-center duration-0 ${
                isActive ? "text-[#4421AF]" : "text-white text-opacity-80"
              }`
            }
          >
            <NavLink
              to={`/blog`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "duration-0 -translate-y-[3px] text-[23px]"
                    : "text-[20px]"
                }`
              }
            >
              <FaPenNib />
            </NavLink>
            Blog
          </NavLink>
          <div className="dropdown dropdown-top dropdown-end">
            <div tabIndex={0} role="button" className="text-[16px]">
              <FaSquareCaretUp />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] mb-2 p-2 shadow rounded-[30px] border border-[#2A34D2] flex flex-col gap-2 items-start text-[18px] translate-x-[14px]"
              style={{
                background: "linear-gradient(180deg, #070936 0%, #16002F 100%)",
              }}
            >
              <li className="w-full rounded-full bg-gradient-to-r from-[#171a4d] to-[#182058]">
                <NavLink
                  to="/qna"
                  className={({ isActive }) =>
                    `w-full flex flex-row gap-2 items-center p-[6px] rounded-full ${
                      isActive
                        ? "bg-gradient-to-r from-[#070835] to-[#16002F]"
                        : ""
                    }`
                  }
                >
                  <FaQuestion />
                </NavLink>
              </li>
              <li className="w-full rounded-full bg-gradient-to-r from-[#171a4d] to-[#182058]">
                <NavLink
                  to="/requests"
                  className={({ isActive }) =>
                    `w-full flex flex-row gap-2 items-center p-[6px] rounded-full ${
                      isActive
                        ? "bg-gradient-to-r from-[#070835] to-[#16002F]"
                        : ""
                    }`
                  }
                >
                  <FaHandshakeAngle />
                </NavLink>
              </li>
              <li className="w-full rounded-full bg-gradient-to-r from-[#171a4d] to-[#182058]">
                <NavLink
                  to="/votes"
                  className={({ isActive }) =>
                    `w-full flex flex-row gap-2 items-center p-[6px] rounded-full ${
                      isActive
                        ? "bg-gradient-to-r from-[#070835] to-[#16002F]"
                        : ""
                    }`
                  }
                >
                  <GiVote />
                </NavLink>
              </li>
            </ul>
          </div>
          <UserDropup />
        </div>
      </nav>
    </>
  );
};
export default Header;
