import { faker } from '@faker-js/faker';


class FakerService {

    getFullName() {
        return faker.person.fullName()
    }

}


export default new FakerService();
