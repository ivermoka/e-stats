import { Disclosure } from "@headlessui/react";
import { BiDownArrow } from "react-icons/bi";

const TermsDisclosure = ({ header, text }) => {
  return (
    <div className="p-2 w-full rounded-md text-text bg-primary break-words">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={
                "w-full h-12 rounded-lg font-semibold text-2xl flex justify-between items-center px-4 gap-2"
              }
            >
              <span>{header}</span>
              <BiDownArrow
                className={`${open ? "rotate-180 transform" : ""} duration-300`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className={"w-full rounded-lg my-4 text-xl px-2"}>
              {text}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default TermsDisclosure;
