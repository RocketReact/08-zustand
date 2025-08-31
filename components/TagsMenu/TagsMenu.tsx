"use client";

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import tagsList from "@/types/note";
export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes {isOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagsList.map((item) => (
            <li key={item} className={css.menuItem}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${item}`}
                className={css.menuLink}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
