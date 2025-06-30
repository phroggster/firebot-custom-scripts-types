import type { CommandDefinition, SystemCommand } from "./command-manager";
import type { Currency } from "./currency-access";

type CurrencyCommandDefinition = CommandDefinition & {
    addAllMessageTemplate: string;
    addMessageTemplate: string;
    currencyBalanceMessageTemplate: string;
    removeAllMessageTemplate: string;
    removeMessageTemplate: string;
    setMessageTemplate: string;
    whisperCurrencyBalanceMessage: boolean;
};
type PartialCurrency = Partial<Currency> & Pick<Currency, "id" | "name">;

export type CurrencyCommandManager = {
    /** Loops through all currencies we have and passes them to
     * {@link CurrencyCommandManager.refreshCurrencyCommands}. This lets us create all of our currency commands when
     * the application is started.
     */
    createAllCurrencyCommands(): void;
    /** Creates a command definition for a given currency.
     * @param currency The currency to create a system command definition for.
     * @returns A definition for a system command to manage the specified currency.
     */
    createCurrencyCommandDefinition(
        currency: PartialCurrency
    ): SystemCommand<CurrencyCommandDefinition>;
    /** Makes sure the Firebot currency system commands are up to date for a given currency.
     * @param action Which action to take for the specified currency.
     * @param currency Which currency to refresh.
     */
    refreshCurrencyCommands(
        action: "create" | "update" | "delete",
        currency: PartialCurrency
    ): void;
};
