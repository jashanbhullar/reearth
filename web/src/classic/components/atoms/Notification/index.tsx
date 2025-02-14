import React from "react";

import Flex from "@reearth/classic/components/atoms/Flex";
import Icon from "@reearth/classic/components/atoms/Icon";
import Text from "@reearth/classic/components/atoms/Text";
import { metrics } from "@reearth/classic/theme";
import { styled, useTheme } from "@reearth/services/theme";

export type NotificationType = "error" | "warning" | "info" | "success";
export type Notification = {
  type: NotificationType;
  heading?: string;
  text: string;
};

export type Props = {
  visible?: boolean;
  notification?: Notification;
  setModal?: (show: boolean) => void;
  resetNotification?: () => void;
};

const NotificationBanner: React.FC<Props> = ({
  visible,
  notification,
  setModal,
  resetNotification,
}) => {
  const theme = useTheme();

  return (
    <StyledNotificationBanner
      aria-hidden={!visible}
      role="banner"
      visible={visible}
      type={notification?.type}
      direction="column">
      <HeadingArea justify="space-between">
        <Text
          size="m"
          color={theme.classic.notification.text}
          weight="bold"
          otherProperties={{ padding: "0 0 8px 0" }}>
          {notification?.heading}
        </Text>
        <CloseBtn
          role="button"
          icon="cancel"
          size={20}
          onClick={() => {
            setModal?.(false);
            resetNotification?.();
          }}
        />
      </HeadingArea>
      <Text size="s" color={theme.classic.notification.text}>
        {notification?.text}
      </Text>
    </StyledNotificationBanner>
  );
};

const StyledNotificationBanner = styled(Flex)<{
  type?: NotificationType;
  visible?: boolean;
}>`
  position: absolute;
  top: ${metrics.headerHeight}px;
  right: 0;
  width: 312px;
  padding: 8px 12px;
  background-color: ${({ type, theme }) =>
    type === "error"
      ? theme.classic.notification.errorBg
      : type === "warning"
      ? theme.classic.notification.warningBg
      : type === "success"
      ? theme.classic.notification.successBg
      : theme.classic.notification.infoBg};
  color: ${({ theme }) => theme.classic.notification.text};
  z-index: ${({ theme, visible }) => (visible ? theme.classic.zIndexes.notificationBar : 0)};
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  transition: all 0.5s;
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
`;

const HeadingArea = styled(Flex)`
  width: 100%;
`;

const CloseBtn = styled(Icon)`
  cursor: pointer;
`;

export default NotificationBanner;
