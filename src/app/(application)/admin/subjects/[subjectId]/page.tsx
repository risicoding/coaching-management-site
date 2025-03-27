"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InforBarDialog } from "@/app/(application)/_components/info-bar-dialog";
import { Clipboard, LayoutList, Pen } from "lucide-react";
import { api } from "@/trpc/react";
import { env } from "@/env";
import { toast } from "sonner";
import { SubjectsMenu } from "./_components/menu";

const Page = () => {
  const params = useParams<{ subjectId: string }>();

  const { subjectId } = params;

  const { data } = api.subjects.getById.useQuery(subjectId);

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
      <InforBarDialog Icon={LayoutList} header={data?.name ?? "loading"}>
        <div className="flex gap-4">
          <Button variant="outline">
            Edit
            <Pen />
          </Button>
          <Button onClick={handleCopyLink}>
            Copy link <Clipboard />
          </Button>
        </div>
      </InforBarDialog>

      <div className="p-0">
        <SubjectsMenu />
      </div>
    </div>
  );
};

export default Page;
