import type { JsonDB } from "node-json-db";
import type { TypedEmitter } from "tiny-typed-emitter";
import type { FirebotViewer } from "../viewer";

export type Currency = {
    /** The unique identifier of the currency. */
    id: string;
    /** The unique name of the currency. */
    name: string;
    active: boolean;
    limit: number;
    transfer: "Allow" | "Disallow";
    interval: number;
    payout: number;
    /** Offline payout */
    offline?: number | string;
    /** Maps user role IDs to the amount of bonus payout they receive. */
    bonus: Record<string, number>;
};

type CurrencyCache = {
    [currencyName: string]: Currency;
};

interface CurrencyEvents {
    "currencies:currency-created": (currency: Currency) => void;
    "currencies:currency-deleted": (currency: Currency) => void;
    "currencies:currency-updated": (currency: Currency) => void;
}

export type CurrencyAccess = TypedEmitter<CurrencyEvents> & {
    /** Initialize the starting currency amounts for a new viewer to zero.
     * @param viewer The Firebot viewer to initialize currency data for.
     */
    addCurrencyToNewViewer(viewer: FirebotViewer): FirebotViewer;
    createCurrency(currency: Currency): boolean;
    deleteCurrency(currency: Currency): void;
    importCurrency(currency: Currency): void;
    isViewerDBOn(): boolean;
    getCurrencies(): CurrencyCache;
    getCurrencyById(id: string): Currency | undefined;
    getCurrencyByName(name: string): Currency | undefined;
    updateCurrency(currency: Currency): void;

    /** @private @internal */
    getCurrencyDb(): JsonDB;
    /** @private @internal */
    loadCurrencies(): void;
};
