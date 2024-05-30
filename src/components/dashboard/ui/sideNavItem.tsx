import { useState } from "react";
import Link from "next/link";

interface SideNavItemProps {
  title: string;
  subItems: string[];
  icon: React.ReactNode;
}

const SideNavItem: React.FC<SideNavItemProps> = ({ title, subItems, icon }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleItemClick = () => {
    setOpenMenu((prevState) => !prevState);
  };

  return (
    <li
      className={`flex items-center hover:bg-zinc-900 transition-all ${
        subItems.length ? `relative` : "after:content-['<'] pr-4"
      }  cursor-pointer after:font-bold after:ml-auto`}
      onClick={handleItemClick}
    >
      {subItems.length ? (
        <div className="relative w-full">
          <span
            className={`hover:border-l-4 border-primary px-4 py-3 flex gap-3 relative w-full items-center hover:text-neutral-200 ${
              openMenu ? "border-l-4 bg-zinc-900" : "border-0"
            }`}
          >
            {icon} {title}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-neutral-200 p-1 text-xs rounded-sm">
              {subItems.length}
            </span>
          </span>
          {openMenu && (
            <ul className="block  bg-zinc-800 pl-8 transition-all pt-2">
              {subItems.map((subItem, index) => (
                <li key={index} className="px-4 py-1 hover:text-neutral-200">
                  <Link href={`/${subItem.toLowerCase()}`} className="">
                    {subItem}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Link
          href={`/dashboard/${title.toLowerCase()}`}
          className="hover:border-l-4 border-primary px-4 py-3 flex gap-3 text-neutral-300 hover:text-neutral-200 w-full "
        >
          {icon} {title}
        </Link>
      )}
    </li>
  );
};

export default SideNavItem;
