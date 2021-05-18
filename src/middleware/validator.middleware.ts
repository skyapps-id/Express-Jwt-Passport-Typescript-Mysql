import { Request, Response, NextFunction } from "express";

interface IMyObj { query: string, params: string; body: string;}

const Validator = (schema: any, property: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property as keyof IMyObj]); 
    const valid = error == null; 

    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map((i: any) => i.message).join(',');

      console.log("error", message); 
      res.status(422).json({ message:"Required", error: message, success:false })
    } 
  }
}
export default Validator;