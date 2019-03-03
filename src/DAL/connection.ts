import { Document, Schema, Model, model, connect} from "mongoose";

interface IUser extends Document {
  name: string;
  age: number;
}

export var UserSchema: Schema = new Schema({
  name: String,
  age: Number
});

const User = model<IUser>("User", UserSchema);
export default User;
export class dbConnection {
   
    constructor(){
      
      let uri = 'mongodb://132.145.207.51/juliette';
      connect(uri, { useNewUrlParser: true }, (err) => {
        if (err) {
          console.log(err.message);
          console.log(err);
        }
        else {
          console.log('Connected to MongoDb');
        }
      });
    }

    public addUser(user: IUser){
      return user.save().then(x=> {return x;});
    }
   
     public getAllUsers(){
      return User.find().then(users => {
          return users;
        });
      }

      public getUserById(id: string){
        return User.findById(id).then(users => {
          return users;
        });
      }

      public deleteUserById(id: string){
        return User.deleteOne({ _id: id }).then(users => {
          return users;
        });
      }

      public updateUser(id: string,u: any ){
          return User.findByIdAndUpdate(id, u).then(users => {
            return users;
          });
           
      }
     
  }    
