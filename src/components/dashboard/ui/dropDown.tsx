import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DropDownMenu = ({
  triggerEl,
  contentEl,
}: {
  triggerEl: JSX.Element;
  contentEl: JSX.Element;
}) => {
  return (
    <Popover>
      <PopoverTrigger> {triggerEl} </PopoverTrigger>
      <PopoverContent> {contentEl} </PopoverContent>
    </Popover>
  );
};

export default DropDownMenu;
