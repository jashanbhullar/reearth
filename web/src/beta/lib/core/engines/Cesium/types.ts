import type { ShaderSource } from "@cesium/engine";
import type { Cesium3DTileFeature, Cesium3DTilePointFeature, Globe, Model } from "cesium";

export type InternalCesium3DTileFeature = Cesium3DTileFeature | Cesium3DTilePointFeature | Model;

export type PrivateCesiumGlobe = Globe & {
  _surface?: {
    _tileProvider?: {
      materialUniformMap?: Record<string, () => unknown>;
    };
  };
  _surfaceShaderSet?: {
    baseFragmentShaderSource?: ShaderSource;
  };
};
