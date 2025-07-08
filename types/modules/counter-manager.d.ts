import { Effects } from "../effects";
import { JsonDbManager } from "../json-db-manager";
import EffectList = Effects.EffectList;

type Counter = {
    id: string;
    name: string;
    value: number;
    /**
     * Effects that are triggered when the counter value has reached its maximal value.
     */
    maximumEffects: EffectList;
    /**
     * Effects that are triggered when the counter value has reached its minimal value.
     */
    minimumEffects: EffectList;
    /**
     * Effects that are triggered when the counter value is updated.
     */
    updateEffects: EffectList;
    /** @deprecated Completely ignored upstream? */
    saveToTxtFile?: boolean;
};

// TODO: some of CounterManager is typed asynchronously, but doesn't async (createCounter, saveCounter, saveItem...).
// Likely leftover artifacts from conversion to inheriting from `JsonDbManager`, or something.
// `saveToTxtFile` is totally ignored everywhere upstream

export type CounterManager = Omit<JsonDbManager<Counter>, "saveItem"> & {
    // TODO: doesn't check if counter name already exists, will overwrite happily with a different ID
    // TODO: typed upstream as async, but totally is not. also is not referenced directly upstream, but is exported ...
    /** Construct a new counter and persist it to disk.
     * @param name The name of the new counter.
     */
    createCounter(name: string): Counter;
    /** Save an existing counter.
     *
     * Use {@link CounterManager.createCounter} to create new counter instances.
     * @param item The Counter to be saved.
     * @override
     */
    saveItem(counter: Counter): Counter | null;
    /** Change the value of the counter by/to the provided `value`.
     * @param id of the counter that should be changed.
     * @param value the counter should be changed by/to. Can be negative.
     * @param overridePreviousValue `true` to set the counter to `value`; `false` to add `value` to the counter.
     * @default false
     */
    updateCounterValue(
        id: string,
        value: number,
        overridePreviousValue?: boolean
    ): Promise<void>;

    /** @deprecated @see {@link JsonDbManager.getItem} */
    getCounter(id: string): Counter | null;
    /** @deprecated @see {@link JsonDbManager.getItemByName} */
    getCounterByName(name: string): Counter | null;
};
