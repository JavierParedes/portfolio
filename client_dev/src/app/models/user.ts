export class User{
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public nick: string,
        public email: string,
        public type: string,
        public image: string,
        public password: string
    ){}
}