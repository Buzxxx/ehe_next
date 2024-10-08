import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import WhatsAppIcon from "@/components/ui/icons/whatsAppIcon";
import { Phone, ExternalLink } from "@/components/ui/icons";
import Link from "next/link";
import { formatDate } from "@/utility/formatDate";
import { paths } from "../../urls";
import { Lead } from "@/components/lead/features/leadObject";

type LeadCardProps = {
  isSelected: boolean;
  onToggle: () => void;
  idx: number;
  lead: Lead;
};

export const LeadCard: React.FC<LeadCardProps> = ({
  idx,
  lead,
  isSelected,
  onToggle,
}) => (
  <Card className="bg-charcoal-foreground border border-slate-300 text-stone-600 md:w-[49%] xl:w-[24%]">
    <CardHeader className="py-2 flex-row items-center gap-2 px-4">
      <Checkbox
        className="mt-2 rounded-none data-[state=checked]:bg-dashboard-primary data-[state=checked]:border-dashboard-primary"
        checked={isSelected}
        onClick={onToggle}
      />

      <div className="flex items-center justify-between w-full">
        <Link href={paths.leadPage + lead.id}>
          <CardTitle className="text-lg text-dashboard-primary ">
            {lead.name ?? "Card Title"}
          </CardTitle>
        </Link>
        <Link href={paths.leadPage + lead.id}>
          <ExternalLink className="text-zinc-300 hover:text-zinc-400/50 transition-all" />
        </Link>
      </div>
    </CardHeader>
    <CardContent className="flex-col text-sm p-4 pt-0">
      <div>
        <p className="font-semibold ">
          Created at:{" "}
          <span className="font-normal">
            {formatDate(lead.created_dt) ?? "Jun 04, 2024, 17:01"}
          </span>
        </p>
      </div>
      <div>
        <p className="font-semibold ">
          Status: <span className="font-normal">{lead.status ?? "Closed"}</span>
        </p>
      </div>
    </CardContent>

    <CardFooter className="gap-2 justify-end px-2 pb-4">
      <Button className="flex items-center gap-2 bg-tertiary hover:bg-tertiary hover:border-slate-500 py-1">
        <WhatsAppIcon />
        Whatsapp
      </Button>
      <Button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 py-1">
        <Phone size={16} strokeWidth={1} />
        Call
      </Button>
    </CardFooter>
  </Card>
);
