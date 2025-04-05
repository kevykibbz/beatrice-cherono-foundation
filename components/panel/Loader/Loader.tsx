import { Card, CardBody } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Card
        className="h-14 w-14 rounded-full"
        shadow="lg"
        style={{
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transform: "translateY(-2px)",
        }}
      >
        <CardBody className="flex items-center justify-center p-0 overflow-hidden">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </CardBody>
      </Card>
    </div>
  );
}