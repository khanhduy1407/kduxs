/**
 * Extends interfaces in Kdu.js
 */

import { ComponentCustomOptions } from "kdu";
import { Store } from "./index";

declare module "@nkduy/runtime-core" {
  interface ComponentCustomOptions {
    store?: Store<any>;
  }
}
