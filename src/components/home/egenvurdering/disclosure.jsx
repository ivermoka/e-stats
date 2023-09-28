import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import Box from "./ratingBox";
import Arrow from "../../../../assets/icons/arrowSVG";

const DisclosureMenu = ({ header, setDisclosure }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="py-2 w-full rounded-md dark:text-text text-textLight">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex flex-col justify-center items-center p-2">
              <Disclosure.Button className="p-2 text-lg font-semibold flex justify-center items-center gap-2 w-full rounded-lg bg-bg/40">
                <span>{header}</span>
                <Arrow
                  className={`${open ? "rotate-180 transform" : ""}
              h-6 w-6 m1 duration-200`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className={`grid grid-cols-5 gap-4 mt-6`}>
                <Box
                  onClick={() => {
                    setSelected(1);
                    setDisclosure(1);
                  }}
                  number="1"
                  className={`${
                    selected === 1
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(2);
                    setDisclosure(2);
                  }}
                  number="2"
                  className={`${
                    selected === 2
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(3);
                    setDisclosure(3);
                  }}
                  number="3"
                  className={`${
                    selected === 3
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(4);
                    setDisclosure(4);
                  }}
                  number="4"
                  className={`${
                    selected === 4
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(5);
                    setDisclosure(5);
                  }}
                  number="5"
                  className={`${
                    selected === 5
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(6);
                    setDisclosure(6);
                  }}
                  number="6"
                  className={`${
                    selected === 6
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(7);
                    setDisclosure(7);
                  }}
                  number="7"
                  className={`${
                    selected === 7
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(8);
                    setDisclosure(8);
                  }}
                  number="8"
                  className={`${
                    selected === 8
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(9);
                    setDisclosure(9);
                  }}
                  number="9"
                  className={`${
                    selected === 9
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
                <Box
                  onClick={() => {
                    setSelected(10);
                    setDisclosure(10);
                  }}
                  number="10"
                  className={`${
                    selected === 10
                      ? "dark:bg-text bg-textLight dark:text-primary text-primaryLight"
                      : ""
                  }`}
                />
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default DisclosureMenu;
