import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorProps {
  text: string;
}

const Error = ({ text }: ErrorProps) => {
  return (
    <div className="text-center">
      <h1 className="text-[192px] leading-none font-bold text-primary-purple">404</h1>
      <h3 className="text-4xl text-primary-grey-300 font-semibold leading-normal">Ooopsss... We can&apos;t find your page.</h3>
      <p className="text-primary-grey-300">{text}</p>
      <Button className="bg-primary-purple mt-8">
        <ArrowLeft />
        &nbsp; Back to Homepage
      </Button>
    </div>
  );
};

export default Error;
