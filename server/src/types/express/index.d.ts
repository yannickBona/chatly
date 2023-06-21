import * as express from "express";
import { $JwtBody } from "..";
import { $UserSchemaInterface } from "../models";
/**
 * To compile correctly, add "typeRoots" in tsconfig.json
 * Also add --files in ts-node script of package.json
 */
declare global {
  namespace Express {
    interface Request {
      profile: $UserSchemaInterface;
    }
  }
}
