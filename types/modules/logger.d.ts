/** The signature of a logging write-completed, or errored, callback function. */
export type LogCallback = (
    error?: any,
    level?: LogLevel | string,
    msg?: string,
    meta?: any
) => void;

/** The union of `string` level options for a leveled logging function. */
export type LogLevel =
    | "error"
    | "warn"
    | "info"
    | "verbose"
    | "debug"
    | "silly";

/** Filters allow modifying the contents of log messages.
 * @returns Either a modified log message, or the modified message and associated metadata.
 */
type MetadataFilter = (
    /** The {@link LogLevel} of the message. */
    level: LogLevel | string,
    /** The `string` representation of the unformatted message. */
    msg: string,
    /** Optional metadata associated with the log message. */
    meta: any
) => string | { msg: any; meta: any };

/** Rewriters allow modifying the contents of log meta e.g. to mask data that should not appear in logs.
 * @returns The sanitized metadata associated with the log message.
 */
type MetadataRewriter = (
    /** The {@link LogLevel} of the message. */
    level: LogLevel | string,
    /** The `string` representation of the unformatted message. */
    msg: string,
    /** Optional metadata associated with the log message. */
    meta: any
) => any;

/** The Firebot instance of a Winston v2 application logger. */
export type Logger = {
    /** Filters allow modifying the contents of log messages. Please do **NOT** remove any filters that you did not
     * add to this collection.
     * @example
     * logger.filters.push(function(level, msg, meta) {
     *   return meta.production ? maskCardNumbers(msg) : msg;
     * });
     *
     * // may output: "info: transaction with card number 123456****2345 successful."
     * logger.info('transaction with card number 123456789012345 successful.');
     */
    filters: MetadataFilter[];
    /** Rewriters allow modifying the contents of log meta e.g. to mask data that should not appear in logs. Please do
     * **NOT** remove any rewriters that you did not add to this collection.
     * @example
     * logger.rewriters.push(function(level, msg, meta) {
     *   if (meta.creditCard) {
     *     meta.creditCard = maskCardNumbers(meta.creditCard);
     *   }
     *   return meta;
     * });
     *
     * // may output: "info: transaction ok creditCard=123456****2345"
     * logger.info('transaction ok', { creditCard: 123456789012345 });
     */
    rewriters: MetadataRewriter[];

    /** Write the provided error message to the Firebot application log.
     * @param msg The message to write to the error log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    error(msg: string, callback?: LogCallback | null): Logger;
    /** Write the provided error message to the Firebot application log.
     * @param msg The message to write to the error log.
     * @param meta Additional information to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    error(msg: string, meta: any, callback?: LogCallback | null): Logger;
    /** Write the provided error message to the Firebot application log.
     * @param msg The message to write to the error log.
     * @param meta Additional information to write to the log.
     */
    error(msg: string, ...meta: any[]): Logger;

    /** Write the provided warning message to the Firebot application log.
     * @param msg The message to write to the warning log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    warn(msg: string, callback?: LogCallback | null): Logger;
    /** Write the provided warning message to the Firebot application log.
     * @param msg The message to write to the warning log.
     * @param meta Additional information to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    warn(msg: string, meta: any, callback?: LogCallback | null): Logger;
    /** Write the provided warning message to the Firebot application log.
     * @param msg The message to write to the warning log.
     * @param meta Additional information to write to the log.
     */
    warn(msg: string, ...meta: any[]): Logger;

    /** Write the provided informational message to the Firebot application log.
     * @param msg The message to write to the info log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    info(msg: string, callback?: LogCallback | null): Logger;
    /** Write the provided informational message to the Firebot application log.
     * @param msg The message to write to the info log.
     * @param meta Additional information to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    info(msg: string, meta: any, callback?: LogCallback | null): Logger;
    /** Write the provided informational message to the Firebot application log.
     * @param msg The message to write to the info log.
     * @param meta Additional information to write to the log.
     */
    info(msg: string, ...meta: any[]): Logger;

    /** Write the provided verbose message to the Firebot application log.
     * @param msg The message to write to the verbose log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    verbose(msg: string, callback?: LogCallback | null): Logger;
    /** Write the provided verbose message to the Firebot application log.
     * @param msg The message to write to the verbose log.
     * @param meta Additional information to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    verbose(msg: string, meta: any, callback?: LogCallback | null): Logger;
    /** Write the provided verbose message to the Firebot application log.
     * @param msg The message to write to the verbose log.
     * @param meta Additional information to write to the log.
     */
    verbose(msg: string, ...meta: any[]): Logger;

    /** Write the provided debug message to the Firebot application log. In release builds, debug logging will *likely*
     * **not** be written to file, but *should* be written to the dev tools panel.
     * @param msg The message to write to the debug log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    debug(msg: string, callback?: LogCallback | null): Logger;
    /** Write the provided debug message to the Firebot application log. In release builds, debug logging will *likely*
     * **not** be written to file, but *should* be written to the dev tools panel.
     * @param msg The message to write to the debug log.
     * @param meta Additional information to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    debug(msg: string, meta: any, callback?: LogCallback | null): Logger;
    /** Write the provided debug message to the Firebot application log. In release builds, debug logging will *likely*
     * **not** be written to file, but *should* be written to the dev tools panel.
     * @param msg The message to write to the debug log.
     * @param meta Additional information to write to the log.
     */
    debug(msg: string, ...meta: any[]): Logger;

    /** Write the provided silly message to the Firebot application log. In release builds, silly logging will *likely*
     * **not** be written to file, but *should* be written to the dev tools panel.
     * @param msg The message to write to the silly log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    silly(msg: string, callback?: LogCallback | null): Logger;
    /** Write the provided silly message to the Firebot application log. In release builds, silly logging will *likely*
     * **not** be written to file, but *should* be written to the dev tools panel.
     * @param msg The message to write to the silly log.
     * @param meta Additional information to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    silly(msg: string, meta: any, callback?: LogCallback | null): Logger;
    /** Write the provided silly message to the Firebot application log. In release builds, silly logging will *likely*
     * **not** be written to file, but *should* be written to the dev tools panel.
     * @param msg The message to write to the silly log.
     * @param meta Additional information to write to the log.
     */
    silly(msg: string, ...meta: any[]): Logger;

    /** Log the provided message to Firebot's application log at the specified log level, and receive a callback when
     * the message gets flushed, or an error occurs.
     * @param level The log level to write the message to.
     * @param msg The message to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    log(level: LogLevel, msg: string, callback?: LogCallback | null): Logger;
    /** Log the provided message to Firebot's application log at the specified log level, and receive a callback when
     * the message gets flushed, or an error occurs.
     * @param level The log level to write the message to.
     * @param msg The message to write to the log.
     * @param meta Additional information to write to the log.
     * @param callback A callback to be invoked after the message is flushed on all receivers, or an error occurs.
     */
    log(
        level: LogLevel,
        msg: string,
        meta: any,
        callback?: LogCallback | null
    ): Logger;
    /** Log the provided message to Firebot's application log at the specified log level.
     * @param level The log level to write the message to.
     * @param msg The message to write to the log.
     * @param meta Additional information to write to the log.
     */
    log(level: LogLevel, msg: string, ...meta: any[]): Logger;
};
