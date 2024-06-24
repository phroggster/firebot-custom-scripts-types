# About
TypeScript types for Firebot's Custom Scripts

## Branch
This is from a custom branch that adds some additional functionality over the primary distrubtion. These features are not (yet?) a part of the main package, but may someday be added.

## Utilize
```shell
npm i -D "https://github.com/phroggster/firebot-custom-scripts-types.git#phroggies-divergance"
```

## DIY
Want to use the official package in your custom Firebot script, but use features from this unofficial branch? Easy, just add the type definition overrides directly to your source.

In your shell (assuming NPM), without installing the devDependancy mentioned just above:
```shell
npm i -D @crowbartools/firebot-custom-scripts-types
```

In your custom script's TypeScript file:
```ts
import { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";

type UpdatedTwitchChat = ScriptModules["twitchChat"] & {
  /** Whether or not the streamer is currently connected to chat. */
  get chatIsConnected(): boolean;
  /**
   * Adds the listener function to the end of the listeners array for the event named eventName.
   * @param eventName The name of the event.
   * @param listener The callback function.
   */
  on<ExpectedArgs extends Array<any> = [], ReturnPayload = void>(
     eventName: string | symbol,
     listener: (...args: ExpectedArgs[]) => ReturnPayload
  );
  /**
   * Adds a one-time listener function to the end of the listeners array for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked.
   * @param eventName The name of the event.
   * @param listener The callback function.
   */
  once<ExpectedArgs extends Array<any> = [], ReturnPayload = void>( // eslint-disable-line @typescript-eslint/no-explicit-any
    eventName: string | symbol,
    listener: (...args: ExpectedArgs[]) => ReturnPayload
  ): UpdatedTwitchChat;
}

function foobar(modules: ScriptModules) {
  const twitchChat = modules.twitchChat as UpdatedTwitchChat;
  twitchChat.on("connected", () => modules.logger.debug("Twitch chat has been connected, as observed from my custom script!"));
}
```
