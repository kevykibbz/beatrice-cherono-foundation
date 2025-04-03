import { Card, CardBody } from "@nextui-org/react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center ">
      <Card 
        className="h-14 w-14 rounded-full" 
        shadow="lg"
        style={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-10px)"
        }}
      >
        <CardBody className="flex items-center justify-center">
          <Loader2 
            className="h-8 w-8 animate-spin text-primary" 
            strokeWidth={2.5}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Loading;