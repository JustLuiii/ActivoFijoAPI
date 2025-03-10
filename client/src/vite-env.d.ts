/// <reference types="vite/client" />

import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";

interface ImportMetaEnv {
  VITE_DOMAIN_API: string;
  VITE_VERSION_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  
  interface BaseQueryArgs {
    args: string | FetchArgs;
    api: BaseQueryApi;
    extraOptions: Record<string, unknown>;
  }

  
  type TypeBaseQuery = BaseQueryFn<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    string | { url: string; method: string; body?: any },
    unknown,
    unknown
  >;
}