"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InfoBar } from "@/components/info-bar";
import { Clipboard, LayoutList, Pen } from "lucide-react";
import { env } from "@/env";
import { toast } from "sonner";
import { SubjectsMenu } from "@/components/subjects/menu";
import { EditSubjectsDialog } from "@/components/subjects/edit-subject";
import { useSubjectById } from "@/features/subjects/hooks";

const Page = () => {
  const params = useParams<{ subjectId: string }>();

  const { subjectId } = params;

  const { data } = useSubjectById(subjectId);

  const handleCopyLink = async () => {
    const url = new URL(
      `/dashboard/subjects/${subjectId}`,
      env.NEXT_PUBLIC_BETTER_AUTH_URL,
    ).toString();

    try {
      await navigator.clipboard.writeText(url);
      toast("Invite link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="space-y-6">
      <InfoBar Icon={LayoutList} header={data?.name ?? "loading"}>
        <div className="flex gap-2">
          <EditSubjectsDialog subjectId={subjectId}>
            <Button variant="outline">
              Edit
              <Pen />
            </Button>
          </EditSubjectsDialog>
          <Button onClick={handleCopyLink}>
            Copy link <Clipboard />
          </Button>
        </div>
      </InfoBar>

      <div className="p-0">
        <SubjectsMenu />
      </div>
    </div>
  );
};

export default Page;
