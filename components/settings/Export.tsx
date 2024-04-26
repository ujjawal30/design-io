import { exportToPDF } from "@/lib/utils";
import { Button } from "../ui/button";

const Export = () => {
  return (
    <section className="flex flex-col border-b border-primary-grey-200 p-4 gap-4">
      <h3 className="text-[10px] uppercase">Export</h3>

      <Button
        className="w-full bg-primary-grey-200 text-white border border-primary-grey-100 hover:bg-primary-purple hover:text-white"
        onClick={exportToPDF}
      >
        Export to PDF
      </Button>
    </section>
  );
};

export default Export;
