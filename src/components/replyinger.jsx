import { BsArrowReturnLeft } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import { useState } from "react";

const Replyinger = ({ rating, sendReply, setReply }) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="dark:bg-primary bg-primaryLight rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 mt-4">
      <h2 className="text-xl font-bold italic m-2">{rating.user} </h2>
      <div className="dark:bg-bg/50 bg-bgLight/50 rounded-lg p-2 whitespace-pre-line">
        <span dangerouslySetInnerHTML={{ __html: rating.comment }} />
      </div>
      {showReply && (
        <div className="mt-2 flex items-center gap-1">
          <input
            className="rounded-md border-2 border-secondaryLight dark:border-secondary outline-none p-1 text-textLight"
            type="text"
            onChange={(e) => setReply(e.target.value)}
          />
          <button
            className="text-2xl"
            type="submit"
            onClick={() => sendReply(rating._id)}
          >
            <LuSendHorizonal />
          </button>
        </div>
      )}
      <button
        onClick={() => setShowReply(!showReply)}
        type="button"
        className="flex justify-end w-full pr-2 pt-2 text-2xl"
      >
        <BsArrowReturnLeft />
      </button>
    </div>
  );
};

export default Replyinger;
