import {
  BaseAddress,
  ClaimStatusType,
  PropertyWithRelationships,
} from "@/interfaces";

interface ProfileProps {
  username: string | undefined;
  loading: boolean;
}

function Profile({ username }: ProfileProps) {
  return (
    <div className="w-full sm:max-w-[500px] px-6 flex flex-col items-center gap-3 h-screen">
      <div className="w-36 h-36 mt-[-77px] transition-all sm:mt-10 z-10 shadow-lg bg-accent rounded-full" />
      <div className="w-full flex flex-col items-center gap-1">
        <h1 className="text-2xl tracking-tighter font-bold">@{username}</h1>
        <p className="tracking-tighter">Some of my fave finds in NYC!</p>
      </div>
    </div>
  );
}

export default Profile;
