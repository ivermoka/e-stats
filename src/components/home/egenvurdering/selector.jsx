import { Switch } from "@headlessui/react";

const Selector = ({ showAfter, setShowAfter }) => {
  return (
    <div className="flex flex-col fixed left-1/2 -translate-x-1/2 bottom-28 items-center">
      <Switch
        checked={showAfter}
        onChange={() => setShowAfter(!showAfter)}
        className={`${
          showAfter ? "bg-blue-700" : "bg-secondaryLight"
        } inline-flex h-10 w-20 items-center rounded-full`}
      >
        <span
          className={`${
            showAfter ? "translate-x-12" : "translate-x-2"
          } inline-block h-6 w-6 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
};

export default Selector;
