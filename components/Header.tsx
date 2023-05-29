import React, { ReactNode, FC } from "react";
import UserMenuDropDown from "./auth/UserMenuDropDown";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

type Props = {
  renderMen?: () => ReactNode;
  renderBrand?: () => ReactNode;
};

const Header: FC<Props> = ({ renderMen, renderBrand }: Props) => {
  return (
    <div className="fixed top-0 left-0 z-50  px-4 w-full h-14 max-md:px-[4px] max-md:py-[2px] flex items-center dark:bg-black bg-white">
      <Link className="shrink-0 pr-6" href={"/"}>
        {renderBrand && renderBrand()}
      </Link>

      {renderMen && renderMen()}
      <ThemeToggle />
      <UserMenuDropDown className="pl-8" />
    </div>
  );
};
export default Header;
