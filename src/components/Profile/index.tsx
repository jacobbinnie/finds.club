import { ProfileAndFinds } from "@/interfaces";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

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
      <>
        <div className="w-36 h-36 mt-[-77px] transition-all sm:mt-10 z-10 shadow-lg bg-accent rounded-full" />
        <div className="w-full flex flex-col items-center gap-1">
          <h1 className="text-2xl tracking-tighter font-bold">
            @{profileAndFinds?.username}
          </h1>
          <p className="tracking-tighter">{profileAndFinds?.description}</p>
        </div>
      </>
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

  return (
    <div className="w-full sm:max-w-[500px] px-6 flex flex-col items-center gap-3 h-screen">
      {DisplaySwitch}
    </div>
  );
}

export default Profile;
