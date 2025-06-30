import type { CurrencyCommandManager } from "./currency-command-manager";
import type { FirebotViewer } from "./user-db";

type CurrencyAdjustType = "set" | "adjust";

export type CurrencyManagerNew = {
    /** Set currency amount for all viewers to the specified `value`, regardless of whether they're online or not.
     * @param currencyId The unique currency identifier to adjust.
     * @param value The amount of currency to assign to all viewers.
     */
    addCurrencyToAllViewers(currencyId: string, value: number): Promise<void>;
    /** Add, remove, or set the currency value for all viewers that are currently marked as online.
     * @param currencyId The unique currency identifier to adjust.
     * @param value The amount to adjust the currency by, or to set it to. When `string`-typed, it will be parsed into
     * an integer.
     * @param ignoreDisable If `true`, ignores the option to disable viewer stats accrual as is commonly enabled for
     * known bots. Otherwise, honors the stats accrual settings for the users. @default false
     * @param adjustType Whether to set or adjust the currency. @default "adjust"
     */
    addCurrencyToOnlineViewers(
        currencyId: string,
        value: number | string,
        ignoreDisable?: boolean,
        adjustType?: CurrencyAdjustType
    ): Promise<void>;
    /** Add currency to all online viewers of a viewer group.
     * @param roleIds An array of the unique role group identifiers to award to.
     * @param currencyId The unique currency identifier to adjust.
     * @param value The amount to adjust the currency by, or to set it to. When `string`-typed, it will be parsed into
     * an integer.
     * @param ignoreDisable If `true`, ignores the option to disable viewer stats accrual as is commonly enabled for
     * known bots. Otherwise, honors the stats accrual settings for the users. @default false
     * @param adjustType Whether to set or adjust the currency. @default "adjust"
     */
    addCurrencyToViewerGroupOnlineViewers(
        roleIds: string[],
        currencyId: string,
        value: number | string,
        ignoreDisable?: boolean,
        adjustType?: CurrencyAdjustType
    ): Promise<void>;
    /** Adjusts or sets the currency for all viewers in the database.
     * @param currencyId The unique currency identifier to adjust.
     * @param value The amount to adjust the currency by, or to set it to. When `string`-typed, it will be parsed into
     * an integer.
     * @param ignoreDisable If `true`, ignores the option to disable viewer stats accrual as is commonly enabled for
     * known bots. Otherwise, honors the stats accrual settings for the users. @default false
     * @param adjustType Whether to set or adjust the currency. @default "adjust"
     */
    adjustCurrencyForAllViewers(
        currencyId: string,
        value: number | string,
        ignoreDisable?: boolean,
        adjustType?: CurrencyAdjustType
    ): Promise<void>;
    /** Adjust or set a viewer's currency.
     * @param viewer The viewer whose currency value should be adjusted.
     * @param currencyId The unique currency identifier to adjust.
     * @param value The amount to adjust the currency by, or to set it to. When `string`-typed, it will be parsed into
     * an integer.
     * @param adjustType Whether to set or adjust the currency. @default "adjust"
     */
    adjustCurrency(
        viewer: FirebotViewer,
        currencyId: string,
        value: number | string,
        adjustType?: CurrencyAdjustType
    ): Promise<void>;
    /** Adjust or set a viewer's currency by username. Username-specific helper shortcut for
     * {@link CurrencyManagerNew.adjustCurrency}.
     * @param username The name of the viewer whose currency value should be adjusted.
     * @param currencyId The unique currency identifier to adjust.
     * @param value The amount to adjust the currency by, or to set it to. When `string`-typed, it will be parsed into
     * an integer.
     * @param adjustType Whether to set or adjust the currency. @default "adjust"
     * @returns `true` if the adjustment likely succeeded; otherwise, `false`.
     */
    adjustCurrencyForViewer(
        username: string,
        currencyId: string,
        value: number | string,
        adjustType?: CurrencyAdjustType
    ): Promise<boolean>;
    /** Adjust or set a viewer's currency by user ID. UserID-specific helper shortcut for
     * {@link CurrencyManagerNew.adjustCurrency}.
     * @param userId The unique identifier of the viewer whose currency value should be adjusted.
     * @param currencyId The unique currency identifier to adjust.
     * @param value The amount to adjust the currency by, or to set it to. When `string`-typed, it will be parsed into
     * an integer.
     * @param overrideValue `true` to set the currency to `value`; otherwise, adjusts it by `value`. @default false
     * @returns `true` if the adjustment likely succeeded; otherwise, `false`.
     */
    adjustCurrencyForViewerById(
        userId: string,
        currencyId: string,
        value: number | string,
        overrideValue?: boolean
    ): Promise<boolean>;
    /** Completely delete a specific currency from the viewer database.
     * @param currencyId The unique currency identifier to delete from all users.
     * @see {@link CurrencyManagerNew.purgeCurrencyById}
     */
    deleteCurrencyById(currencyId: string): Promise<void>;
    /** Get the richest viewers of the specified currency.
     * @param currencyIdOrName The currency name or unique currency identifier.
     * @param count The number of richest viewers to get.
     * @param byName `true` to treat `currencyIdOrName` as a currency name; otherwise, it is treated as a unique
     * currency ID. @default false
     */
    getTopCurrencyHolders(
        currencyIdOrName: string,
        count: number,
        byName?: boolean
    ): Promise<FirebotViewer[]>;
    /** Get the richest viewer of a particular currency.
     * @param currencyId The unique identifier of the currency to sort by.
     * @param position Which 1-based index of the richest users should be returned. @default 1
     */
    getTopCurrencyPosition(
        currencyId: string,
        position?: number
    ): Promise<FirebotViewer | null | undefined>;
    /** Get the records of a particular user's currency balances.
     * @param usernameOrId The unique username or identifier of the user to get.
     * @param isUsername `true` if `usernameOrId` should be treated as a username; otherwise, it is treated as a unique
     * user ID. @default false
     * @returns A record of the user's currency holdings keyed by currency ID, or `null` if the viewer was not found,
     * or an empty object if the viewer database is offline.
     */
    getViewerCurrencies(
        usernameOrId: string,
        isUsername?: boolean
    ): Promise<Record<string, number> | null>;
    /** Get the balance for a particular username in the specified currency.
     * @param username The unique user name of the viewer to lookup.
     * @param currencyId The unique identifier of the currency to lookup for the viewer.
     * @returns The amount the viewer has in the specified currency, or `null` if an error occurred.
     */
    getViewerCurrencyAmount(
        username: string,
        currencyId: string
    ): Promise<number | null>;
    /** Get the ranking of a particular user for holding the most amount of the specified currency.
     * @param currencyId The unique identifier of the currency to sort by.
     * @param usernameOrId The unique username or identifier of the user to get.
     * @param isUsername `true` if `usernameOrId` should be treated as a username; otherwise, it is treated as a unique
     * user ID. @default false
     * @returns The specified user's ranking according to the currency, or `0` if a problem occurred.
     */
    getViewerCurrencyRank(
        currencyId: string,
        usernameOrId: string,
        isUsername?: boolean
    ): Promise<number>;
    /** Set all viewers to 0 for a specific currency.
     * @param currencyId The unique currency identifier to purge from all viewers.
     * @see {@link CurrencyManagerNew.deleteCurrencyById}
     */
    purgeCurrencyById(currencyId: string): Promise<void>;
    /** Start up the currency timers at the next full minute mark.
     *
     * This will be done automatically by Firebot during startup, but you *should* restart the timer after invoking
     * {@link CurrencyManagerNew.stopTimer}.
     */
    startTimer(): void;
    /** Stop the currency timers.
     *
     * There is little reason to ever do this from a third-party script (besides perhaps manual viewer database
     * editing), but if you stop the currency timers, you *should* restart them later by invoking
     * {@link CurrencyManagerNew.startTimer}.
     */
    stopTimer(): void;
};

/** @deprecated */
export type CurrencyManager = {
    /** @deprecated Firebot v5.61 (#2363) @see {@link CurrencyCommandManager.createAllCurrencyCommands} */
    createAllCurrencyCommands: () => void;
    /** @deprecated @see {@link CurrencyManagerNew.stopTimer}*/
    startTimer: () => void;
    /** @deprecated @see {@link CurrencyManagerNew.startTimer} */
    stopTimer: () => void;
};
