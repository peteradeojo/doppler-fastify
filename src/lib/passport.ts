import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "@/lib/prisma";
import env from "@/config/env";
import { Authenticator } from "@fastify/passport";

export default async function setupPassport(passport: Authenticator) {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        issuer: "usedoppler.app",
      },
      async (payload, done) => {
        const user = await prisma.user.findUnique({
          where: { id: payload.id },
        });

        if (!user) {
          return done(null, false, "Bad request");
        }

        return done(null, user);
      },
    ),
  );
}
