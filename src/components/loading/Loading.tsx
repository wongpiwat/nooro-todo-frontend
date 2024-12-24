import React from "react";
import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-40">
      <Spinner color="primary" label="Loading..." labelColor="primary" />
    </div>
  );
};

export default Loading;
