import axios from "axios";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface EmailNotification{
     formId: number ;
     enable:boolean
}

export default function EmailNotificationToggle({ formId,enable }:EmailNotification) {
  const [enabled, setEnabled] = useState<boolean | null>(enable);

  const toggleNotification = async () => {
    if (enabled === null) return; 
    console.log(enabled)

    const newEnabledState = !enabled;
    setEnabled(newEnabledState);

    try {
      await axios.post(`/api/email-notification?formId=${formId}`, { enabled: newEnabledState });
    } catch (error) {
      console.error("Failed to update email notifications:", error);
      setEnabled(enabled); 
    }
  };

  return (
    <div className="flex items-center border rounded-md pr-2 pl-3 gap-x-2 bg-black/50 max-md:p-2">
      {enabled !== null && (
        <Checkbox checked={enabled} onCheckedChange={toggleNotification} />
      )}
      <Label className="mr-2 text-sm font-medium">Email Notifications</Label>
    </div>
  );
}

