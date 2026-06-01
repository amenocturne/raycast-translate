import {
  Detail,
  LaunchProps,
  ActionPanel,
  Action,
  Clipboard,
  showHUD,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { translate } from "./ollama";

export default function Translate(
  props: LaunchProps<{ arguments: { text: string } }>
) {
  const { text } = props.arguments;

  const { isLoading, data, error } = usePromise(() => translate(text));

  if (error) {
    const isConnection = String(error).includes("ECONNREFUSED");
    const message = isConnection
      ? "Cannot connect to Ollama. Is it running?"
      : String(error);
    return <Detail markdown={`## Translation Failed\n\n${message}`} />;
  }

  if (isLoading || !data) {
    return <Detail isLoading markdown="" />;
  }

  const markdown = `${data.translation}`;

  return (
    <Detail
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Direction" text={data.direction} />
          <Detail.Metadata.Label title="Input" text={text} />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <Action
            title="Copy Translation"
            onAction={async () => {
              await Clipboard.copy(data.translation);
              await showHUD("Copied!");
            }}
          />
          <Action
            title="Paste Translation"
            onAction={async () => {
              await Clipboard.paste(data.translation);
            }}
          />
        </ActionPanel>
      }
    />
  );
}
