import { Editor } from "@tiptap/core";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import * as Popover from "@radix-ui/react-popover";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "デフォルト",
    color: "var(--novel-black)",
  },
  {
    name: "紫",
    color: "#9333EA",
  },
  {
    name: "赤",
    color: "#E00000",
  },
  {
    name: "黄色",
    color: "#EAB308",
  },
  {
    name: "青",
    color: "#2563EB",
  },
  {
    name: "緑",
    color: "#008A00",
  },
  {
    name: "オレンジ",
    color: "#FFA500",
  },
  {
    name: "ピンク",
    color: "#BA4081",
  },
  {
    name: "グレー",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "デフォルト",
    color: "var(--novel-highlight-default)",
  },
  {
    name: "紫",
    color: "var(--novel-highlight-purple)",
  },
  {
    name: "赤",
    color: "var(--novel-highlight-red)",
  },
  {
    name: "黄色",
    color: "var(--novel-highlight-yellow)",
  },
  {
    name: "青",
    color: "var(--novel-highlight-blue)",
  },
  {
    name: "緑",
    color: "var(--novel-highlight-green)",
  },
  {
    name: "オレンジ",
    color: "var(--novel-highlight-orange)",
  },
  {
    name: "ピンク",
    color: "var(--novel-highlight-pink)",
  },
  {
    name: "グレー",
    color: "var(--novel-highlight-gray)",
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <Popover.Root open={isOpen}>
      <div className="novel-relative novel-h-full">
        <Popover.Trigger
          className="novel-flex novel-h-full novel-items-center novel-gap-1 novel-p-2 novel-text-sm novel-font-medium novel-text-stone-600 hover:novel-bg-stone-100 active:novel-bg-stone-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className="novel-rounded-sm novel-px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>

          <ChevronDown className="novel-h-4 novel-w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="novel-z-[99999] novel-my-1 novel-flex novel-max-h-80 novel-w-48 novel-flex-col novel-overflow-hidden novel-overflow-y-auto novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-p-1 novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-top-1"
        >
          <div className="novel-my-1 novel-px-2 novel-text-sm novel-text-stone-500">
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== "Default" &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                setIsOpen(false);
              }}
              className="novel-flex novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-stone-600 hover:novel-bg-stone-100"
              type="button"
            >
              <div className="novel-flex novel-items-center novel-space-x-2">
                <div
                  className="novel-rounded-sm novel-border novel-border-stone-200 novel-px-1 novel-py-px novel-font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textStyle", { color }) && (
                <Check className="novel-h-4 novel-w-4" />
              )}
            </button>
          ))}

          <div className="novel-mb-1 novel-mt-2 novel-px-2 novel-text-sm novel-text-stone-500">
            Background
          </div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Default" && editor.commands.setHighlight({ color });
                setIsOpen(false);
              }}
              className="novel-flex novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-stone-600 hover:novel-bg-stone-100"
              type="button"
            >
              <div className="novel-flex novel-items-center novel-space-x-2">
                <div
                  className="novel-rounded-sm novel-border novel-border-stone-200 novel-px-1 novel-py-px novel-font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="novel-h-4 novel-w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
