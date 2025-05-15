import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SelectWorkspace({ className }) {
  return (
    <div className={className}>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Workspace" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ecod">ECOD</SelectItem>
          <SelectItem value="dns">DNS</SelectItem>
          <SelectItem value="eco">ECO</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
