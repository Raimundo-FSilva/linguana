import {List, X} from "phosphor-react";
import Link from "next/link";
import {useRef, useState} from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export const MobileMenuDrop = () => {
  const [active, setActive] = useState(false);

  const refDropMenu = useRef(null);

  const handleOpen = () => {
    setActive(true)
  }

  const handleClose = () => {
    if(!active) return;

    setActive(false)
  }

  const navigationItems = [
    {path: "/revisoes", label: "Aulas"},
    {path: "/sobre", label: "Sobre"}
  ]

  useOutsideClick(refDropMenu, handleClose)

  return (
    <div
      ref={refDropMenu}
      className={"md:hidden relative"}>
      <button
        onClick={active ?  handleClose : handleOpen}
        className={"transition-all hover:scale-90 h-9 w-9 flex items-center justify-center text-white rounded-[.5rem] bg-[#00CC2D]"}>
        {
          active ?
            <X size={20} weight={"bold"}/>
            :
            <List size={20} weight={"bold"}/>
        }
      </button>

      {
        active &&
          <ul
              style={{boxShadow: "0px 8px 51px rgba(0, 0, 0, 0.06)", border: "1px solid #E6E6E6"}}
              className={"bg-white absolute top-[calc(100%+8px)] rounded-[.5rem] right-0 gap-3 flex flex-col px-3 py-2"}>
            {
              navigationItems.map((item, key) =>
                <Link
                  key={key}
                  href={item.path}>
                  <li className={"text-sm font-sora text-[#4D4D4D] hover:scale-90 transition-all hover:bg-[#F2F2F2] hover:text-[#00801C] px-3 text-center rounded  py-2"}>{item.label}</li>
                </Link>
              )
            }
          </ul>
      }

    </div>
  );
};