import { JwtPayload } from "jsonwebtoken";

export interface $JwtBody extends JwtPayload {
  username: string;
}
