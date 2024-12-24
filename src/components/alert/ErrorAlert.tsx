import React from "react";
import { Alert } from "@nextui-org/react";

const ErrorAlert = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center p-40">
      <Alert
        color="danger"
        title="Sorry, something went wrong."
        description={message}
      />
    </div>
  );
};

export default ErrorAlert;
