import type { Effects } from "../effects";
import type { JsonDbManager } from "../json-db-manager";

type Timer = {
    /** A universally-unique identifier of the timer. */
    id: string;
    /** The name of the timer. */
    name: string;
    /** Whether or not the timer is considered to be active. */
    active: boolean;
    /** How many seconds should elapse in between triggering the timer's effects. */
    interval: number;
    /** How many chat messages must appear in between triggering the timer's effects. */
    requiredChatLines: number;
    /** `true` to only run trigger the timer's effects when the stream is online; `false` to trigger it regardless. */
    onlyWhenLive: boolean;
    /** The effects that should be triggered each time the timer's interval expires. */
    effects: Effects.EffectList;
    /** Unique identifiers of sort grouping tags to apply to the timer. */
    sortTags: string[];
};

export type TimerManager = JsonDbManager<Timer> & {
    /** (Re-)starts all timers that are active. */
    startTimers(): void;
    /**
     * Sets the {@link Timer.active} status of the timer with the given id to the provided value, persists the timer to
     * disk, and stops or (re)starts the timer.
     * @param timerId The unique identifier of the timer to update.
     * @param active Whether the timer should be active. @default false
     */
    updateTimerActiveStatus(timerId: string, active?: boolean): void;
};
