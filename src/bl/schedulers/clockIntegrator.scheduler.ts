import {UsersRepository} from "../../dal/repositories/usersRepository";

export class ClockIntegratorScheduler {
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    public async execute(): Promise<void> {
        let users = await this.usersRepository.findAll();
        let clockSerials = users != null ? users.map(user => user.clockSerial) : [];
        clockSerials.forEach(serial => {
            // here we have to call to the clock service to receive clock information,
            // cast it to our format and save it as a clock information event
        });
    }
}