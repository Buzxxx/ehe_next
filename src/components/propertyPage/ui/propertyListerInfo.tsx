import Avataar from "@/components/dashboard/ui/avataar"
import { Button } from "@/components/ui/button"

const PropertyListerInfo = () => {
  return (
    <div className="md:mt-12 mt-4">
      <h4 className="text-xl font-semibold">Listed By Property Owner</h4>

      <div className="flex justify-between mt-4 flex-1 md:flex-auto items-center">
        <div className="flex gap-2 ">
          <Avataar />
          <div>
            <h6 className="text-md font-medium"> John Does</h6>
            <p className="text-xs text-slate-600"> Company name</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-transparent text-slate-500 border border-slate-500 hover:text-slate-700 hover:border-slate-700 w-fit text-xs h-fit md:h-full md:text-sm px-2 md:px-4">
            Ask A Question
          </Button>
          <Button className="bg-transparent text-slate-500 border border-slate-500 hover:text-slate-700 hover:border-slate-700 w-fit text-xs h-fit md:h-full md:text-sm px-2 md:px-4">
            Get More Info
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PropertyListerInfo
