import {UsersRepository} from "../../dal/repositories/usersRepository";

export class ClockIntegratorScheduler {
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    public async execute(): Promise<void> {
        let users = await this.usersRepository.findAll();
        if (users) {
            users.forEach(user => {
                if (user.clockSerial) {
                    // here we have to call to the clock service to receive clock information,
                    // cast it to our format and save it as a clock information event
                }
            });
        }
    }
}