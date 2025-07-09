import type { Effects } from "../effects";

type EffectRunnerOutput = {
    success: boolean;
    stopEffectExecution: boolean;
    outputs: Record<string, any>;
} | null; // When sending effects to a queue

type ProcessEffectsRequest = {
    trigger: Effects.Trigger;
    effects: Effects.EffectList;
};

export type EffectRunner = {
    /** Asynchronously runs effects from the "effect-list" HTML element.
     * @param processEffectsRequest
     */
    processEffects(
        processEffectsRequest: ProcessEffectsRequest
    ): Promise<EffectRunnerOutput>;
};
