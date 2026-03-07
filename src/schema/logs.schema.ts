import z from "zod";

export type LogQuerySchema = {
    count?: number;
    cursor?: string|number,
};