import { ReactNode } from "react";

import { styled } from "@reearth/services/theme";

import Text from "../Text";

type Props = {
  name?: string;
  description?: string;
  children: ReactNode;
};

const Property: React.FC<Props> = ({ name, description, children }) => {
  return (
    <Wrapper>
      <Text size="footnote">{name ?? "Unknown field"}</Text>
      {children}
      {description && (
        <Description size="xFootnote" customColor>
          {description}
        </Description>
      )}
    </Wrapper>
  );
};

export default Property;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Description = styled(Text)`
  color: ${({ theme }) => theme.content.weak};
`;
