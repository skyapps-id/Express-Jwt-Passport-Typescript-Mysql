import { ExtractJwt, Strategy } from "passport-jwt";
import { getRepository } from "typeorm";
import secretConfig from "../config/secret";
import { User } from "../models";

const Passport = (passport: any) => {
  let opts: any = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = secretConfig.jwt_encryption;
	passport.use(new Strategy(opts, 
		async (jwt_payload: any, done: Function) => {
			if(jwt_payload.scope === 'Admin'){
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ email: String(jwt_payload.email) });
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
			} else {
				done(null, false);
			}
		}
	));
}
export default Passport;