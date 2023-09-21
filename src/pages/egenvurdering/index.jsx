import React, { useState } from "react";
import Egenvurdering from "@/components/home/egenvurdering/egenvurdering";
import After from "@/components/home/egenvurdering/after";
import Selector from "@/components/home/egenvurdering/selector";
const EgenvurderingContainer = () => {
  const [after, setAfter] = useState(false);
  return (
    <div className={"p-4 min-h-screen"}>
      {after ? <After /> : <Egenvurdering />}
      <Selector setAfter={setAfter} />
    </div>
  );
};

export default EgenvurderingContainer;
