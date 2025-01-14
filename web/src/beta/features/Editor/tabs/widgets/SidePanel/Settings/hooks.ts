import { useCallback } from "react";

import { ValueType, ValueTypes } from "@reearth/beta/utils/value";
import { usePropertyFetcher } from "@reearth/services/api";

export default () => {
  const { useUpdatePropertyValue } = usePropertyFetcher();

  const handlePropertyValueUpdate = useCallback(
    (
      schemaGroupId: string,
      propertyId: string,
      fieldId: string,
      vt: ValueType,
      itemId?: string,
    ) => {
      return async (v?: ValueTypes[ValueType]) =>
        await useUpdatePropertyValue(propertyId, schemaGroupId, itemId, fieldId, "en", v, vt);
    },
    [useUpdatePropertyValue],
  );

  return {
    handlePropertyValueUpdate,
  };
};
