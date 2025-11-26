import Logo from "./Logo";
import UserMenu from "./userMenu";

export default function Header() {
  return (
    <div className=" flex justify-between p-4 border-b border-gray-400 items-center">
      <Logo />

      <div>
        <UserMenu />
      </div>
    </div>
  );
}
