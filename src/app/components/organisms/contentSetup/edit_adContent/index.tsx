import { Button } from "@/app/components/atom/CTA";
import { TextArea } from "@/app/components/atom/input";
import { Heading1 } from "@/app/components/atom/typography";
import { useGenerateContent } from "@/app/hooks/generateContent";
import { useEditAdContentState } from "@/app/state-management/helper-state";

export const EditAdContentForm = () => {
  const { editGeneratedAdApiCall } =
    useGenerateContent();
  const [editAdContent, setEditAdContent] = useEditAdContentState();
  return (
    <form onSubmit={editGeneratedAdApiCall}>
      <Heading1 text="edit your ad conent" />
      <TextArea
        name="text"
        value={editAdContent.text}
        onChange={(e) =>
          setEditAdContent((prevState) => ({
            ...prevState,
            text: e.target.value,
          }))
        }
      />
      <Button type="submit" text="save" />
    </form>
  );
};
