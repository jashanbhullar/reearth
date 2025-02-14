import { styled } from "@reearth/services/theme";

import useHook from "./hooks";
import LeftSection from "./LeftSection";
import useRightSide from "./useRightSection";

type Props = {
  sceneId?: string;
  projectId?: string;
  workspaceId?: string;
  isDashboard?: boolean;
  currentTab: Tab;
};

export const Tabs = ["map", "story", "widgets", "publish"] as const;
export type Tab = (typeof Tabs)[number];

export function isTab(tab: string): tab is Tab {
  return Tabs.includes(tab as never);
}

const Navbar: React.FC<Props> = ({
  sceneId,
  projectId,
  workspaceId,
  currentTab = "map",
  isDashboard = false,
}) => {
  const {
    currentProject,
    workspace,
    isPersonal,
    username,
    workspaces,
    workspaceModalVisible,
    handleLogout,
    handleWorkspaceChange,
    handleWorkspaceCreate,
    handleWorkspaceModalClose,
    handleWorkspaceModalOpen,
  } = useHook({ projectId, workspaceId });

  const { rightSide } = useRightSide({
    currentTab,
    sceneId,
    page: "editor",
  });

  return (
    <Wrapper>
      <LeftSection
        currentProject={currentProject}
        dashboard={isDashboard}
        currentWorkspace={workspace}
        username={username}
        personalWorkspace={isPersonal}
        modalShown={workspaceModalVisible}
        workspaces={workspaces}
        onWorkspaceChange={handleWorkspaceChange}
        onWorkspaceCreate={handleWorkspaceCreate}
        onSignOut={handleLogout}
        onModalClose={handleWorkspaceModalClose}
        openModal={handleWorkspaceModalOpen}
      />

      {rightSide}
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  gap: 24px;
  background: ${({ theme }) => theme.bg[0]};
  border-bottom: 0.5px solid ${({ theme }) => theme.outline.weak};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
