import React, { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import { FiLogOut } from "react-icons/fi";
import { Upload } from "react-feather";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [fileName, setFileName] = useState("Upload Image");
  const [profilePicture, setProfilePicture] = useState(
    "../src/assets/profile/av3.jpg"
  );

  const [imageUploaded, setImageUploaded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Maria",
    middleName: "",
    lastName: "Dela Cruz",
    email: "",
    address: "",
    dateOfBirth: "",
  });
  const navigate = useNavigate(); // ✅ Hook to handle navigation

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setImageUploaded(true);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("Upload Image");
      setProfilePicture("../src/assets/profile/av3.jpg");
      setImageUploaded(false);
    }
  };

  const handleSave = () => {
    console.log("Profile Data Saved:", profileData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      <TopNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isMobile={true}
          isOpen={mobileSidebarOpen}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
        />
        <Sidebar
          isMobile={false}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
        />

        <main className="flex-1 bg-[#f6f7fb] p-6 min-h-[calc(100vh-64px)] flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold mb-6">Profile</h1>

          <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-4xl flex flex-col items-center sm:flex-row sm:items-center sm:space-x-10">
            <div className="flex flex-col items-center">
              <img
                src={profilePicture}
                alt="Profile Avatar"
                className="w-64 h-64 rounded-full object-cover mb-4"
              />

              <div className="relative w-full max-w-xs">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="w-full p-2 bg-transparent border border-gray-300 rounded-md cursor-pointer flex items-center justify-center"
                >
                  <span className="text-gray-700 text-xs flex-1 text-center">
                    {fileName}
                  </span>
                  <Upload className="w-3 h-3 ml-2" strokeWidth={1} />
                </label>
              </div>

              {imageUploaded && (
                <div className="mt-4">
                  <button
                    onClick={handleSave}
                    className="text-purple-600 hover:underline"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 mt-8 sm:mt-0 flex flex-col items-center">
              <div className="grid grid-cols-1 gap-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-500">Name</p>
                  <p className="text-base font-regular text-gray-800">
                    {profileData.firstName} {profileData.middleName}{" "}
                    {profileData.lastName}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Date of Birth</p>
                  <p className="text-base text-gray-800">
                    {profileData.dateOfBirth || "-"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Email</p>
                  <p className="text-base text-gray-800">
                    {profileData.email || "-"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Address</p>
                  <p className="text-base text-gray-800">
                    {profileData.address || "-"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center px-4 py-2 border border-purple-500 text-purple-600 rounded-md hover:bg-purple-50 transition"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

{/* Keep both buttons but control their visibility with responsive classes */}
<div className="mt-10">
  {/* Desktop Logout - hidden on mobile */}
  <button
    onClick={() => navigate("/")}
    className="hidden sm:flex items-center text-purple-600 hover:underline text-sm"
  >
    <FiLogOut className="w-4 h-4 mr-1" />
    Logout
  </button>
</div>

{/* Mobile Logout FAB - hidden on desktop */}
<div className="sm:hidden fixed bottom-4 right-4">
  <button
    onClick={() => navigate("/")}
    className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition"
  >
    <FiLogOut className="w-5 h-5" />
  </button>
</div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={profileData.middleName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      middleName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={profileData.dateOfBirth}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      dateOfBirth: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
