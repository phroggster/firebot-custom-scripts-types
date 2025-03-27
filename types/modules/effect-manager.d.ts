import { Effects } from "../effects";
import EffectType = Effects.EffectType;

export type EffectManager = {
    getEffectById<
        EffectModel,
        OverlayData = unknown,
        Outputs extends Record<string, unknown> = Record<string, unknown>
    >(
        effectId: string
    ): EffectType<EffectModel, OverlayData, Outputs> | undefined;
    registerEffect<
        EffectModel,
        OverlayData = unknown,
        Outputs extends Record<string, unknown> = Record<string, unknown>
    >(
        effectType: EffectType<EffectModel, OverlayData, Outputs>
    ): void;
};
