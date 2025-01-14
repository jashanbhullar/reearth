import TextInput from "@reearth/beta/components/properties/TextInput";
import SidePanelSectionField from "@reearth/beta/components/SidePanelSectionField";
import { type Item } from "@reearth/services/api/propertyApi/utils";
import { styled } from "@reearth/services/theme";

import useHooks from "./hooks";

type Props = {
  widgetPropertyId: string;
  propertyItems?: Item[];
};

const Settings: React.FC<Props> = ({ widgetPropertyId, propertyItems }) => {
  const { handlePropertyValueUpdate } = useHooks();
  console.log("PI", propertyItems);

  return (
    <Wrapper>
      {propertyItems?.map((i, idx) => (
        <SidePanelSectionField title={i.title ?? "Undefined"} key={idx}>
          {i.schemaFields.map(sf => {
            const isList = i && "items" in i;
            const value = !isList ? i.fields.find(f => f.id === sf.id)?.value : sf.defaultValue;
            return sf.type === "string" ? (
              sf.ui === "color" ? (
                <p key={sf.id}>Color field</p>
              ) : sf.ui === "selection" || sf.choices ? (
                <p key={sf.id}>Selection or choices field</p>
              ) : sf.ui === "buttons" ? (
                <p key={sf.id}>Button radio field</p>
              ) : (
                <TextInput
                  key={sf.id}
                  name={sf.name}
                  value={(value as string) ?? ""}
                  description={sf.description}
                  onChange={handlePropertyValueUpdate(
                    i.schemaGroup,
                    widgetPropertyId,
                    sf.id,
                    sf.type,
                  )}
                />
              )
            ) : (
              <p key={sf.id}>{sf.name} field</p>
            );
          })}
        </SidePanelSectionField>
      ))}
    </Wrapper>
  );
};

export default Settings;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled.div`
  padding: 8px;
  background: ${({ theme }) => theme.bg[1]};
  border-radius: 4px;
`;
