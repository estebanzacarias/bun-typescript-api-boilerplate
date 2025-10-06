export enum httpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    OPTIONS = "OPTIONS",
    HEAD = "HEAD"
}

export type httpMethod = keyof typeof httpMethods;

export type Route = {
    path: string;
}