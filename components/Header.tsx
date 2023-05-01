import React, { ReactNode, FC } from "react";

type Props = {
  renderMen?: () => ReactNode;
  renderBrand?: () => ReactNode;
};

const Header: FC<Props> = ({  renderMen, renderBrand }: Props) => {
  return (
    <div className="fixed top-0 left-0 z-50  px-4 w-full h-14 flex items-center dark:bg-black bg-white">
      {renderBrand && renderBrand()}
      {renderMen && renderMen()}
    </div>
  );
};
export default Header;
