import SidePanelCommon from "@reearth/beta/features/Editor/SidePanel";
import ContentPage from "@reearth/beta/features/Editor/tabs/story/SidePanel/ContentPage";
import { useT } from "@reearth/services/i18n";

// TODO: these are currently rough definition
type Props = {
  // story
  // stories: any;
  // selectedStory: any;
  // onStorySelect: (id: string) => void;
  // onStoryAdd: () => void;

  // page
  selectedPageId?: string;
  onPageSelect: (id: string) => void;
  onPageDuplicate: (id: string) => void;
  onPageDelete: (id: string) => void;
  onPageAdd: () => void;
};

const SidePanel: React.FC<Props> = ({ onPageAdd, onPageSelect, onPageDuplicate, onPageDelete }) => {
  const t = useT();

  return (
    <SidePanelCommon
      location="left"
      contents={[
        // you can use this when get multiple story feature
        // {
        //   id: "story",
        //   title: t("Story"),
        //   maxHeight: "33%",
        //   children: <ContentStory ... />,
        // },
        {
          id: "page",
          title: t("Page"),
          children: (
            <ContentPage
              onPageAdd={onPageAdd}
              onPageSelect={onPageSelect}
              onPageDuplicate={onPageDuplicate}
              onPageDelete={onPageDelete}
            />
          ),
        },
      ]}
    />
  );
};

export default SidePanel;