import { Disclosure } from "@headlessui/react";
import Box from "./ratingBox";
import Arrow from "./arrowSVG";

const DisclosureMenu = () => {
  return (
    <div className="bg-secondary w-full rounded-md text-text">
      <Disclosure>
        <div className="flex flex-col justify-center items-center p-4">
          <Disclosure.Button className="bg-primary rounded-md p-2 text-lg font-bold flex">
            <span>Hvor fornuftig har jeg spist i dag?</span>
            <Arrow />
          </Disclosure.Button>
          <Disclosure.Panel className="bg-primary p-2">
            <Box />
          </Disclosure.Panel>
        </div>
      </Disclosure>
    </div>
  );
};

export default DisclosureMenu;
