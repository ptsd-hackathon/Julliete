import {UsersRepository} from '../../dal/repositories/usersRepository';

export async function authUser(root: any, {userEmail, appToken}: { userEmail: string, appToken: string }): Promise<Boolean> {
    let usersRepository = new UsersRepository();
    let user = await usersRepository.findByEmailAndAppToken(userEmail, appToken)
    return !!user;
}