import { Button } from "@nextui-org/react";

export const AnswerButtons = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button style={{ width: 20 }}>知っている</Button>
      <div style={{ width: 10 }} />
      <Button style={{ width: 20 }}>知らない</Button>
    </div>
  );
};
