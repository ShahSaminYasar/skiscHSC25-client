import { useEffect, useState } from "react";
import Title from "../../../components/Title/Title";
import useAuth from "../../../hooks/Auth/useAuth";
import useAxiosPublic from "../../../hooks/Axios/useAxiosPublic";
import useToast from "../../../hooks/Toaster/useToast";
import axios from "axios";
import Loader from "../../../components/Loaders/Loader";
import { Helmet } from "react-helmet";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, setUser, updateUser } = useAuth();
  const toast = useToast;
  const axiosPublic = useAxiosPublic();

  const [editMode, setEditMode] = useState(false);
  const [profileImg, setProfileImg] = useState(user?.dp);
  const [updating, setUpdating] = useState(false);
  const [clearDP, setClearDP] = useState(false);

  const inputStyle = {
    borderRadius: "8px",
    borderWidth: "2px",
    background: "#0B0F2E",
    fontSize: "20px",
    fontWeight: "400",
    color: "#ffffff",
    width: "100%",
    padding: "8px 12px",
    outline: "none",
    display: "block",
  };

  const handleRemoveDP = () => {
    setProfileImg("");
    setClearDP(true);
  };

  const handleImageInput = (e) => {
    const imgFile = e.target.files[0];

    if (imgFile) {
      const tempImgUrl = URL.createObjectURL(imgFile);
      setProfileImg(tempImgUrl);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const dp = form.dp.files;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const roll = form.roll.value;
    const id = form.id.value;
    const address = form.address.value;

    try {
      let dp_url = profileImg;
      if (clearDP === true) {
        dp_url = "";
      } else {
        if (dp[0]) {
          const imageFile = dp[0];
          const imgbb = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMGBB_APIKEY
            }`,
            { image: imageFile },
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          );
          // console.log("IMGBB response => ", imgbb);
          if (imgbb?.data?.success === true) {
            dp_url = imgbb?.data?.data?.display_url;
          } else {
            setUpdating(false);
            return toast("Couldn't upload image, please try again.", "error");
          }
        }
      }

      const updatedData = {
        dp: dp_url,
        name,
        email,
        phone,
        roll,
        id,
        address,
      };

      setClearDP(false);

      updateUser(name, dp_url)
        .then((res) => {
          console.log(res);
          axiosPublic
            .put("/users", updatedData)
            .then((res) => {
              if (res?.data?.message === "success") {
                setUser({
                  ...user,
                  name: updatedData?.name,
                  dp: updatedData?.dp,
                  phone: Number(updatedData?.phone),
                  roll: Number(updatedData?.roll),
                  id: Number(updatedData?.id),
                  address: updatedData?.address,
                });
                toast("Details updated", "success");
              } else {
                toast(res?.data?.message || "Failed to update data", "info");
              }
              setEditMode(false);
              return setUpdating(false);
            })
            .catch((error) => {
              toast(error?.message || "An error occured", "error");
              return setUpdating(false);
            });
        })
        .catch((error) => {
          toast(error?.message || "An error occured", "error");
        });
    } catch (error) {
      setUpdating(false);
    }
  };

  return (
    <section className="w-full bg-[#010313]">
      <Helmet>
        <title>Profile | SKISC HSC 2025</title>
      </Helmet>
      <Title className="mb-[5px]">Profile</Title>

      <div className="max-w-[800px] mx-auto">
        <span className="block text-[25px] text-slate-500 font-[300] mb-3">
          @{user?.username}
        </span>
        <form
          onSubmit={handleUpdateProfile}
          className="w-full max-w-[850px] mr-auto flex flex-col md:flex-row gap-10 md:items-start items-center"
        >
          <div className="w-full max-w-[200px] relative">
            <div className="mask mask-squircle w-[200px] h-[200px]">
              <img
                src={
                  profileImg ||
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                }
                alt="User Profile Picture"
                className="w-full aspect-square object-cover"
              />
            </div>

            <div
              className={`mask mask-squircle w-[200px] h-[200px] absolute inset-0 bg-black bg-opacity-40 ${
                editMode ? "opacity-100 md:opacity-0" : "opacity-0 md:opacity-0"
              } backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center p-6 transition-opacity duration-300 pointer-events-none rounded-xl ${
                editMode
                  ? "md:hover:opacity-100 cursor-pointer pointer-events-auto"
                  : undefined
              }`}
            >
              <input
                type="file"
                className="w-full"
                name="dp"
                onInput={(e) => handleImageInput(e)}
              />
            </div>

            <div className={editMode && user?.dp !== "" ? "block" : "hidden"}>
              <button
                type="button"
                onClick={handleRemoveDP}
                className="btn btn-sm mt-7 block hover:bg-red-700 font-[300] mx-auto bg-red-800 text-white text-opacity-70 text-center border-none outline-none w-fit text-[15px]"
              >
                Remove picture
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Name
              </label>
              <input
                type="text"
                style={inputStyle}
                name="name"
                placeholder="Name"
                defaultValue={user?.name}
                className={editMode ? "border-[#3C3F58]" : "border-transparent"}
                disabled={!editMode}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Email
              </label>
              <input
                type="email"
                style={inputStyle}
                name="email"
                placeholder="Email"
                defaultValue={user?.email}
                className={"border-transparent"}
                disabled={true}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Phone
              </label>
              <input
                type="number"
                style={inputStyle}
                name="phone"
                placeholder="Phone"
                defaultValue={user?.phone}
                className={editMode ? "border-[#3C3F58]" : "border-transparent"}
                disabled={!editMode}
                required
              />
            </div>

            <div className="flex flex-row gap-4">
              <div>
                <label
                  htmlFor="roll"
                  className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
                >
                  Roll
                </label>
                <input
                  type="number"
                  style={inputStyle}
                  name="roll"
                  placeholder="Class Roll"
                  defaultValue={user?.roll}
                  className={
                    editMode ? "border-[#3C3F58]" : "border-transparent"
                  }
                  disabled={!editMode}
                />
              </div>

              <div>
                <label
                  htmlFor="id"
                  className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
                >
                  College ID No.
                </label>
                <input
                  type="number"
                  style={inputStyle}
                  name="id"
                  placeholder="College ID Number"
                  defaultValue={user?.id}
                  className={
                    editMode ? "border-[#3C3F58]" : "border-transparent"
                  }
                  disabled={!editMode}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-white text-opacity-70 text-[14px] xss:text-[17px]"
              >
                Address
              </label>
              <input
                type="text"
                style={inputStyle}
                name="address"
                placeholder="Address"
                defaultValue={user?.address}
                className={editMode ? "border-[#3C3F58]" : "border-transparent"}
                disabled={!editMode}
              />
            </div>

            {editMode && (
              <button
                type="submit"
                style={{
                  borderRadius: "10px",
                  background:
                    "linear-gradient(97deg, #1E245A 0%, #261053 100%)",
                }}
                className="block w-fit py-[6px] px-5 ml-auto text-slate-200 text-[20px]"
                disabled={updating}
              >
                {updating ? <Loader /> : "Save"}
              </button>
            )}
          </div>
        </form>
        {!editMode && (
          <div className="w-full max-w-[850px] mt-4">
            <button
              onClick={() => setEditMode(true)}
              type="button"
              className="block w-fit py-[6px] px-5 ml-auto text-slate-200 text-[20px] bg-[#2734D2] rounded-[10px] hover:bg-[#181e5a]"
              disabled={updating}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default Profile;
