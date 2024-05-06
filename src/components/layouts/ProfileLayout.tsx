import React from "react";
import { StickyNav } from "../common";
import {
  BackIcon,
  CalendarIcon,
  LinkIcon,
  LocationIcon,
} from "../SingleUseComponents/Icon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useProfileStore } from "@/store/useProfile";
import { decodedUsername, formatMonthYear } from "@/utils/handlers";
import { useEvent } from "@/store/useEven";
import ModalEditProfile from "../common/portal/ModalEditProfile";
import { useGetProfile } from "@/hooks/users/useQuery";
import { GhostButton } from "../common/Button";
type TParams = {
  username: string;
};
interface IProfile {
  children?: React.ReactNode;
  params: TParams;
}
const ProfileLayout: React.FC<IProfile> = ({ children, params }) => {
  const router = useRouter();
  const username = decodedUsername(params.username);
  const { userProfile, updateProfile } = useProfileStore(
    (state) => state
  );
  const { data: dataUserProfile, isSuccess } = useGetProfile(username);
  const { showModal, setShowModal } = useEvent((state) => state);
  const handleBackHome = React.useCallback(() => {
    router.back();
  }, [router]);
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path
      ? "text-white py-4 px-2 border-b-[3px] border-textBlue transition"
      : "";
  };
  const handleOpenModal = React.useCallback(() => {
    setShowModal(true);
  }, [showModal]);

  React.useEffect(() => {
    // getUserProfile(username);
    // setShowModal(!statusUpdate)
    if (isSuccess) {
      if (!dataUserProfile) return;
      updateProfile(dataUserProfile);
    }
  }, [isSuccess]);
  return (
    <div className="w-[600px] flex flex-col h-full min-h-screen border-r-[0.5px] border-borderGrayPrimary">
      <StickyNav>
        <div className="flex items-center pt-1 px-4">
          <div className="text-white p-2 mr-6 rounded-full hover:bg-white/10 transition duration-200 cursor-pointer">
            <BackIcon
              onClick={handleBackHome}
              className="text-white w-full h-full"
            ></BackIcon>
          </div>
          <div>
            <h2 className="text-xl font-bold">{userProfile?.name}</h2>
            <p className="text-textGray text-sm font-light">0 posts</p>
          </div>
        </div>
      </StickyNav>
      <div className="flex flex-col h-screen overflow-auto">
        <div className="relative w-full h-[200px] z-0">
          <div className="absolute w-full h-full top-0 left-0 bg-borderGrayPrimary">
            {userProfile.cover_photo && <img
              src={userProfile.cover_photo}
              alt=""
              className="w-full h-full object-cover cursor-pointer"
            />}
          </div>
          <div className="w-[134px] h-[134px] absolute bottom-0 left-4 translate-y-1/2 cursor-pointer">
            <div className="group absolute inset-0 rounded-full">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full rounded-full object-cover border-[3px] border-black"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
            </div>
          </div>
        </div>
        <div className="w-full px-4">
          <div className="w-full pt-3 mb-4">
            <div className="pb-[10px] flex flex-col w-full items-end mb-4">
              <GhostButton
                className="px-4 py-2 text-white rounded-full w-max"
                onClick={handleOpenModal}
              >
                Edit profile
              </GhostButton>
            </div>
            <div className="flex flex-col items-start text-sm gap-y-4">
              <div>
                <h2 className="text-base font-bold">{userProfile?.name}</h2>
                <span className="text-textGray">
                  {userProfile?.username}
                </span>
              </div>
              <div>{userProfile?.bio}</div>
              <div className="flex items-center gap-x-4">
                {userProfile?.location && (
                  <div className="flex text-textGray">
                    <LocationIcon />
                    <span>{userProfile?.location}</span>
                  </div>
                )}
                {userProfile?.website && (
                  <div className="flex text-textGray">
                    <LinkIcon />
                    <a href={userProfile?.website}>
                      {userProfile?.website.slice(0, 33) + "..."}
                    </a>
                  </div>
                )}
                <div className="flex text-textGray">
                  <CalendarIcon />
                  <span>
                    Joined{" "}
                    {formatMonthYear(
                      userProfile?.created_at?.toString() as string
                    )}
                  </span>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 flex items-center gap-x-[2px]">
                  <p>100</p>
                  <span className="text-textGray">Following</span>
                </div>
                <div className="flex items-center gap-x-[2px]">
                  <p>112</p>
                  <span className="text-textGray">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
              <Link
                href={`/profile${username}`}
                className={`text-textGray hover:no-underline p-4 text-center ${isActive(
                  "/profile" + username
                )}`}
              >
                Post
              </Link>
            </div>
            <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
              <Link
                href={`/profile${username}/with_replies`}
                className={`text-textGray hover:no-underline px-4 text-center py-4 ${isActive(
                  "/profile" + username + "/with_replies"
                )}`}
              >
                Replies
              </Link>
            </div>
            <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
              <Link
                href={`/profile${username}/highlights`}
                className={`text-textGray hover:no-underline px-4 text-center py-4 ${isActive(
                  "/profile" + username + "/highlights"
                )}`}
              >
                HighLights
              </Link>
            </div>
            <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
              <Link
                href={`/profile${username}/media`}
                className={`text-textGray hover:no-underline px-4 text-center py-4 ${isActive(
                  "/profile" + username + "/media"
                )}`}
              >
                Media
              </Link>
            </div>
            <div className="h-[53px] flex-1 hover:bg-white/10 flex items-center justify-center">
              <Link
                href={`/profile${username}/likes`}
                className={`text-textGray hover:no-underline px-4 text-center py-4 ${isActive(
                  "/profile" + username + "/likes"
                )}`}
              >
                Likes
              </Link>
            </div>
          </div>
          <div className="py-4 border-y-[0.5px] border-borderGrayPrimary">
            {children}
          </div>
        </div>
      </div>
      <ModalEditProfile></ModalEditProfile>
    </div>
  );
};

export default ProfileLayout;
