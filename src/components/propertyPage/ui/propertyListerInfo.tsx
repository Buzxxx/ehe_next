import Avataar from "@/components/dashboard/ui/avataar"
import { Button } from "@/components/ui/button"

const PropertyListerInfo = () => {
  return (
    <div className="mt-10">
      <h4 className="text-xl font-semibold">Listed By Property Owner</h4>

      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <Avataar />
          <div>
            <h6 className="text-md font-medium"> John Does</h6>
            <p className="text-xs text-slate-600"> Company name</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-transparent text-slate-500 border border-slate-500 hover:text-slate-700 hover:border-slate-700">
            Ask A Question
          </Button>
          <Button className="bg-transparent text-slate-500 border border-slate-500 hover:text-slate-700 hover:border-slate-700">
            Get More Info
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PropertyListerInfo
