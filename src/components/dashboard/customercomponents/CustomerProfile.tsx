import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/api/authApi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';
import demoUserImage from '../../../assets/images/babul.png';
import coverImage from '../../../assets/images/cover.jpg';

const CustomerProfile = () => {
  CheckRoleAndLogout('customer');

  const [showProfileUpdateModal, setShowProfileUpdateModal] =
    useState<boolean>(false);
  const [showProfilePhotoUpdateModal, setShowProfilePhotoUpdateModal] =
    useState<boolean>(false);
  const [showPasswordUpdateModal, setShowPasswordUpdateModal] =
    useState<boolean>(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [userNewName, setUserNewName] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userState, setUserState] = useState<string>('');
  const [userCountry, setUserCountry] = useState<string>('');
  const [userPostalCode, setUserPostalCode] = useState<string>('');
  const [userMobile, setUserMobile] = useState<string>('');
  const [newProfileImage, setNewProfileImage] = useState('' as any);
  const [updateProfilePhotoOngoing, setUpdateProfilePhotoOngoing] =
    useState(false);

  const [changePassword] = useChangePasswordMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  // handle profile image upload
  const handleProfilePhotoUpload = (e: any) => {
    e.preventDefault();
    setUpdateProfilePhotoOngoing(true);

    const preset_key = 'test';
    const cloud_name = 'test';

    const formData = new FormData();

    if (!newProfileImage) {
      setUpdateProfilePhotoOngoing(false);
      toast.error('Please select an image to upload', {
        position: 'top-right',
        duration: 1500,
      });
      return;
    }

    // check if image size is less than 1MB and type is jpg, jpeg or png
    if (newProfileImage) {
      if (newProfileImage.size > 1024 * 1024) {
        setUpdateProfilePhotoOngoing(false);
        toast.error('Image size should be less than 1MB', {
          position: 'top-right',
          duration: 1500,
        });
        return;
      } else if (
        newProfileImage.type !== 'image/jpeg' &&
        newProfileImage.type !== 'image/jpg' &&
        newProfileImage.type !== 'image/png'
      ) {
        setUpdateProfilePhotoOngoing(false);
        toast.error('We accept only jpg, jpeg and png type images', {
          position: 'top-right',
          duration: 1500,
        });
        return;
      } else {
        formData.append('file', newProfileImage);
        formData.append('upload_preset', preset_key);
      }
    }

    fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        const response = await updateProfile({
          name: userProfileFromDb?.name,
          profileImage: data?.secure_url
            ? data?.secure_url
            : userProfileFromDb?.profileImage,
        }).unwrap();

        if (response?.statusCode === 200) {
          toast.success('Profile photo updated successfully', {
            position: 'top-right',
            duration: 1500,
          });
          setShowProfilePhotoUpdateModal(!showProfilePhotoUpdateModal);
          setUpdateProfilePhotoOngoing(false);
          setNewProfileImage('');
        } else {
          toast.error('Profile photo update failed', {
            position: 'top-right',
            duration: 1500,
          });
          setUpdateProfilePhotoOngoing(false);
        }
      })
      .catch(() => {
        toast.error('Image upload failed', {
          position: 'top-right',
          duration: 1500,
        });
        setUpdateProfilePhotoOngoing(false);
      });
  };

  // handle profile  update
  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();

    const isAnyFieldFilled =
      userNewName ||
      userAddress ||
      userCity ||
      userState ||
      userCountry ||
      userPostalCode ||
      userMobile;

    if (!isAnyFieldFilled) {
      toast.error('Whats the update you want to made?', {
        position: 'top-right',
        duration: 1500,
      });
      return;
    } else {
      const response = await updateProfile({
        name: userNewName ? userNewName : userProfileFromDb?.name,
        profileImage: userProfileFromDb?.profileImage,
        address: {
          address: userAddress
            ? userAddress
            : userProfileFromDb?.address?.address,
          city: userCity ? userCity : userProfileFromDb?.address?.city,
          state: userState ? userState : userProfileFromDb?.address?.state,
          country: userCountry
            ? userCountry
            : userProfileFromDb?.address?.country,
          postalCode: userPostalCode
            ? userPostalCode
            : userProfileFromDb?.address?.postalCode,
          mobile: userMobile ? userMobile : userProfileFromDb?.address?.mobile,
        },
      }).unwrap();

      if (response?.statusCode === 200) {
        toast.success('Profile updated successfully', {
          position: 'top-right',
          duration: 1500,
        });
        setShowProfileUpdateModal(!showProfileUpdateModal);
        setUserNewName('');
      } else {
        toast.error('Name update failed', {
          position: 'top-right',
          duration: 1500,
        });
      }
    }
  };

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();

    if (
      userProfileFromDb?.email === 'demoadmin@gmail.com' ||
      userProfileFromDb?.email === 'democustomer@gmail.com' ||
      userProfileFromDb?.email === 'demovendor@gmail.com'
    ) {
      toast.error(
        `Any visitor may use this demo account, so you can't change this account's password`,
        {
          position: 'top-right',
          duration: 1500,
          icon: '🔒',
        }
      );
      return;
    }

    if (!currentPassword || !newPassword) {
      toast.error('Please fill all the fields', {
        position: 'top-right',
        duration: 1500,
      });
    } else {
      const response = await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();

      if (response?.statusCode === 200) {
        toast.success('Password updated successfully', {
          position: 'top-right',
          duration: 1500,
        });
        setShowPasswordUpdateModal(!showPasswordUpdateModal);
        setCurrentPassword('');
        setNewPassword('');
      } else {
        toast.error('Password update failed', {
          position: 'top-right',
          duration: 1500,
        });
      }
    }
  };

  const toggleShowingCurrentPassword = () => {
    const passwordInput = document.getElementById(
      'currentpassword'
    ) as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setIsCurrentPasswordVisible(true);
    } else {
      passwordInput.type = 'password';
      setIsCurrentPasswordVisible(false);
    }
  };
  const toggleShowingNewPassword = () => {
    const passwordInput = document.getElementById(
      'newpassword'
    ) as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setIsNewPasswordVisible(true);
    } else {
      passwordInput.type = 'password';
      setIsNewPasswordVisible(false);
    }
  };

  const userImage = userProfileFromDb?.profileImage || demoUserImage;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">
        Profile Management
      </h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        In this section, you can manage your profile, update information and can
        see some short stats. In the next update, more amazing features will be
        added.
      </p>
      <div className="mt-5">
        <div className="w-full md:w-11/12 mx-auto py-5 px-3 relative">
          {isLoading ? (
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-300"></div>
          ) : (
            <>
              <img
                src={coverImage}
                alt="cover"
                className="w-full h-16 md:h-20 lg:h-28 object-cover rounded-t-md"
              />
              <div className="flex justify-between items-center -mt-5">
                <div className="flex justify-center space-x-3 items-center">
                  <img
                    src={userProfileFromDb?.profileImage || userImage}
                    alt={userProfileFromDb?.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold mt-2">
                      {userProfileFromDb?.name}
                    </h2>
                    <p className="w-16 bg-orange text-sm rounded-sm text-center text-white">
                      {userProfileFromDb?.role}
                    </p>
                  </div>
                </div>
                <div
                  className="text-md text-red-300 hover:text-red-400 duration-300 transition-all ease-in-out cursor-pointer"
                  title="Update Account"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <CiEdit
                        style={{ fontSize: '24px', fontWeight: 'bold' }}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={{ background: 'white' }}>
                      <DropdownMenuItem>
                        <button
                          onClick={() => setShowProfileUpdateModal(true)}
                          className="text-md hover:text-red-300 transition-all duration-300 ease-out cursor-pointer"
                        >
                          Update Profile
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          onClick={() => setShowProfilePhotoUpdateModal(true)}
                          className="text-md hover:text-red-300 transition-all duration-300 ease-out cursor-pointer"
                        >
                          Update Profile Photo
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          onClick={() => setShowPasswordUpdateModal(true)}
                          className="text-md hover:text-red-300 transition-all duration-300 ease-out cursor-pointer"
                        >
                          Update Password
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* about and adress section */}
              <div className="flex flex-col lg:flex-row justify-between space-y-3">
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold mt-8">About</h3>
                  <h3 className="text-sm mt-0.5 lg:w-8/12">
                    Welcome to my profile! I love discovering new products and
                    deals. Whether it's tech gadgets, home essentials, or the
                    latest fashion trends, I enjoy finding items that enhance my
                    daily life. My goal is to share reviews and feedback on
                    purchases to help others make informed decisions. I value
                    quality, convenience, and style in everything I buy. In my
                    free time, I explore the latest product launches and engage
                    with communities that share my interests. Let’s connect and
                    enjoy the best of online shopping together!
                  </h3>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="text-sm mt-4">
                    <h3 className="text-sm font-semibold">Address</h3>
                    <span>{userProfileFromDb?.address?.address}</span>
                    {','}
                    <span>{userProfileFromDb?.address?.postalCode}</span>
                    <span>
                      {userProfileFromDb?.address?.city}
                      {','}
                      {userProfileFromDb?.address?.state}
                      {','}
                      {userProfileFromDb?.address?.country}
                    </span>
                  </div>
                  <div className="flex flex-col w-full">
                    <h3 className="text-sm font-semibold mt-2">Contact</h3>
                    <span className="text-sm">{userProfileFromDb?.email}</span>
                    <span className="text-sm">
                      {userProfileFromDb?.address?.mobile}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* profile update modal */}
          <div>
            {showProfileUpdateModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  data-aos="zoom-in"
                  data-aos-duration="500"
                >
                  <div className="relative w-[370px] lg:w-[640px] my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-md font-semibold text-center">
                          {`Update - ${userProfileFromDb?.name}`}
                        </h3>
                        <button
                          className="text-2xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => setShowProfileUpdateModal(false)}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                      {/*body*/}
                      <form className="py-6 px-10">
                        <div className="grid gap-4 grid-cols-2 sm:gap-x-6 sm:gap-y-4">
                          {/*  name */}
                          <div className="w-full">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium"
                            >
                              Name
                            </label>

                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${userProfileFromDb?.name}`}
                              onChange={(e) => setUserNewName(e.target.value)}
                            />
                          </div>
                          {/*  address */}
                          <div className="w-full">
                            <label
                              htmlFor="address"
                              className="block mb-2 text-sm font-medium "
                            >
                              Address
                            </label>

                            <input
                              type="text"
                              name="Address"
                              id="Address"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${
                                userProfileFromDb?.address?.address ||
                                'Jinjirtala'
                              }`}
                              onChange={(e) => setUserAddress(e.target.value)}
                            />
                          </div>
                          {/* city */}
                          <div className="w-full">
                            <label
                              htmlFor="city"
                              className="block mb-2 text-sm font-medium "
                            >
                              City
                            </label>

                            <input
                              type="text"
                              name="city"
                              id="city"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${
                                userProfileFromDb?.address?.city || 'Dhunat'
                              }`}
                              onChange={(e) => setUserCity(e.target.value)}
                            />
                          </div>
                          {/*  state */}
                          <div className="w-full">
                            <label
                              htmlFor="state"
                              className="block mb-2 text-sm font-medium "
                            >
                              State
                            </label>

                            <input
                              type="text"
                              name="state"
                              id="state"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${
                                userProfileFromDb?.address?.state || 'Bogura'
                              }`}
                              onChange={(e) => setUserState(e.target.value)}
                            />
                          </div>
                          {/*  country */}
                          <div className="w-full">
                            <label
                              htmlFor="country"
                              className="block mb-2 text-sm font-medium "
                            >
                              Country
                            </label>

                            <input
                              type="text"
                              name="country"
                              id="country"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${
                                userProfileFromDb?.address?.country ||
                                'Bangladesh'
                              }`}
                              onChange={(e) => setUserCountry(e.target.value)}
                            />
                          </div>
                          {/*  postal code */}
                          <div className="w-full">
                            <label
                              htmlFor="postalCode"
                              className="block mb-2 text-sm font-medium "
                            >
                              Postal Code
                            </label>

                            <input
                              type="text"
                              name="postalCode"
                              id="postalCode"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${
                                userProfileFromDb?.address?.postalCode || '5850'
                              }`}
                              onChange={(e) =>
                                setUserPostalCode(e.target.value)
                              }
                            />
                          </div>
                          {/*  mobile */}
                          <div className="w-full">
                            <label
                              htmlFor="mobile"
                              className="block mb-2 text-sm font-medium "
                            >
                              Mobile
                            </label>

                            <input
                              type="text"
                              name="mobile"
                              id="mobile"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${
                                userProfileFromDb?.address?.mobile ||
                                '01740020464'
                              }`}
                              onChange={(e) => setUserMobile(e.target.value)}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-red-300 rounded-md px-4 py-2 cursor-pointer text-white hover:bg-red-400 transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-6 ml-auto disabled:cursor-not-allowed disabled:bg-gray-300"
                          onClick={(e) => handleUpdateProfile(e)}
                        >
                          Update Profile
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black transition-all duration-300"></div>
              </>
            ) : null}
          </div>
          {/* profile photo update modal */}
          <div>
            {showProfilePhotoUpdateModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  data-aos="zoom-in"
                  data-aos-duration="500"
                >
                  <div className="relative w-[370px] lg:w-[640px] my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-md font-semibold text-center">
                          Update Profile Photo
                        </h3>
                        <button
                          className="text-2xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => setShowProfilePhotoUpdateModal(false)}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                      {/*body*/}
                      <form className="py-6 px-10">
                        <div className="grid gap-4 grid-cols-1 sm:gap-x-6 sm:gap-y-4">
                          {/* profile image */}
                          <div className="w-full">
                            <label
                              htmlFor="profileimage"
                              className="block mb-2 text-sm font-medium "
                            >
                              Profile Photo
                            </label>

                            <input
                              type="file"
                              name="profileimage"
                              id="profileimage"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              required
                              onChange={(e) => {
                                const selectedFile =
                                  e.target.files && e.target.files[0];
                                if (selectedFile) {
                                  setNewProfileImage(selectedFile);
                                }
                              }}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-red-300 rounded-md px-4 py-2 cursor-pointer text-white hover:bg-red-400 transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-6 ml-auto disabled:cursor-not-allowed disabled:bg-gray-300"
                          onClick={(e) => handleProfilePhotoUpload(e)}
                          disabled={updateProfilePhotoOngoing}
                        >
                          {updateProfilePhotoOngoing
                            ? 'Updating Profile'
                            : 'Update Profile'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black transition-all duration-300"></div>
              </>
            ) : null}
          </div>
          {/* password update modal */}
          <div>
            {showPasswordUpdateModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  data-aos="zoom-in"
                  data-aos-duration="500"
                >
                  <div className="relative w-[370px] lg:w-[640px] my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-md font-semibold text-center">
                          Update Password
                        </h3>
                        <button
                          className="text-2xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => setShowPasswordUpdateModal(false)}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                      {/*body*/}
                      <form className="py-6 px-10">
                        <div className="grid gap-4 grid-cols-1 sm:gap-x-6 sm:gap-y-4">
                          {/*  current password */}
                          <div className="w-full relative">
                            <label
                              htmlFor="currentpassword"
                              className="block mb-2 text-sm font-medium "
                            >
                              Current Password
                            </label>

                            <input
                              type="password"
                              name="currentpassword"
                              id="currentpassword"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder="e.g. awal123"
                              required
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                            />
                            <span
                              className="absolute cursor-pointer top-10 right-3"
                              onClick={toggleShowingCurrentPassword}
                            >
                              {isCurrentPasswordVisible ? (
                                <IoEyeOutline />
                              ) : (
                                <IoEyeOffOutline />
                              )}
                            </span>
                          </div>
                          {/* new password */}
                          <div className="w-full relative">
                            <label
                              htmlFor="newpassword"
                              className="block mb-2 text-sm font-medium"
                            >
                              New Password
                            </label>

                            <input
                              type="password"
                              name="newpassword"
                              id="newpassword"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder="e.g. newpassword123"
                              required
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span
                              className="absolute cursor-pointer top-10 right-3"
                              onClick={toggleShowingNewPassword}
                            >
                              {isNewPasswordVisible ? (
                                <IoEyeOutline />
                              ) : (
                                <IoEyeOffOutline />
                              )}
                            </span>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-red-300 rounded-md px-4 py-2 cursor-pointer text-white hover:bg-red-400 transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-6 ml-auto"
                          onClick={(e) => handleUpdatePassword(e)}
                        >
                          Update Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black transition-all duration-300"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
