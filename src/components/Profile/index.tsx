import { ProfileAndFinds } from "@/interfaces";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Find from "../Find";

interface ProfileProps {
  profileAndFinds: ProfileAndFinds | null | undefined;
  loading: boolean;
  invalidUsername: boolean;
}

function Profile({ profileAndFinds, loading, invalidUsername }: ProfileProps) {
  const Loading = () => {
    return (
      <div className="h-full flex items-center justify-center">
        <ArrowPathIcon className="w-5 h-5 text-primary animate-spin" />
      </div>
    );
  };

  const NoUser = () => {
    return (
      <div className="h-full flex items-center justify-center">
        <h1 className="text-xl tracking-tighter font-bold">No user found :(</h1>
      </div>
    );
  };

  const UserProfile = () => {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-36 h-36 mt-[-77px] transition-all sm:mt-10 z-10 shadow-lg bg-accent rounded-full" />
        <div className="w-full flex flex-col items-center gap-1">
          <h1 className="text-2xl tracking-tighter font-bold">
            @{profileAndFinds?.username}
          </h1>
          <p className="tracking-tighter">{profileAndFinds?.description}</p>
          <p className="tracking-tighter font-bold">
            {profileAndFinds?.finds.length} find
            {(profileAndFinds && profileAndFinds?.finds.length > 1) ||
            profileAndFinds?.finds.length === 0
              ? "s"
              : ""}
          </p>
        </div>
      </div>
    );
  };

  let DisplaySwitch;

  if (loading) {
    DisplaySwitch = <Loading />;
  } else if (
    profileAndFinds === null ||
    profileAndFinds === undefined ||
    invalidUsername === true
  ) {
    DisplaySwitch = <NoUser />;
  } else {
    DisplaySwitch = <UserProfile />;
  }

  const renderFinds = () => {
    if (profileAndFinds?.finds) {
      return profileAndFinds?.finds.map((find, key) => {
        return <Find key={key} find={find} />;
      });
    }
  };

  return (
    <div className="w-full sm:max-w-[500px] px-6 flex flex-col items-center gap-6 min-h-screen max-h-screen sm:overflow-scroll">
      {DisplaySwitch}
      {renderFinds()}
    </div>
  );
}

export default Profile;
