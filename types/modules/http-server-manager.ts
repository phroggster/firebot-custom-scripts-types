import { Express, Request, Response } from "express";
import http from "http";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE";

export type HttpServerManager = {
    sendToOverlay(
        eventName: string,
        meta?: Record<string, unknown>,
        overlayInstance?: string
    ): void;
    registerCustomRoute(
        prefix: string,
        route: string,
        method: HttpMethod,
        callback: (req: Request, res: Response) => Promise<void> | void
    ): boolean;
    unregisterCustomRoute(
        prefix: string,
        route: string,
        method: HttpMethod
    ): boolean;
    startHttpServer(name: string, port: number, instance: Express): http.Server;
    stopHttpServer(name: string): boolean;
};
