import { Currency } from "./currency-access";
import { FirebotViewer } from "./user-db";

type CurrencyAdjustType = "set" | "adjust";

/** @deprecated */
export type CurrencyDB = {
    adjustCurrencyForUser: (
        username: string,
        currencyId: string,
        value: number,
        adjustType?: CurrencyAdjustType
    ) => Promise<boolean>;
    addCurrencyToOnlineUsers: (
        currencyId: string,
        value: string,
        ignoreDisposable?: boolean,
        adjustType?: CurrencyAdjustType
    ) => Promise<void>;
    getUserCurrencyAmount: (
        username: string,
        currencyId: string
    ) => Promise<number>;
    purgeCurrencyById: (currencyId: string) => void;
    refreshCurrencyCache: () => void;
    getCurrencies: () => Array<Currency>;
    getCurrencyById: (currencyId: string) => Currency | undefined;
    getCurrencyByName: (currencyName: string) => Currency | undefined;
    addCurrencyToUserGroupOnlineUsers: (
        roleIds: Array<string>,
        currencyId: string,
        value: string,
        ignoreDisposable?: boolean,
        adjustType?: CurrencyAdjustType
    ) => Promise<void>;
    isViewerDBOn: () => boolean;
    getTopCurrencyHolders: (
        currencyId: string,
        count: number
    ) => Promise<Array<FirebotViewer>>;
    getTopCurrencyPosition: (
        currencyId: string,
        position?: number
    ) => Promise<FirebotViewer | undefined>;
};
