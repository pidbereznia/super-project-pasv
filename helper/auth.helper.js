import supertest from 'supertest';

class AuthHelper{
    constructor(){
        this.response = undefined;

    }
    async post(login, password){
        await supertest(process.env.BASE_URL)
            .post('/auth')
            .send({login: login, password: password})
            .then( (res) => { this.response = res });


        return this.response;

    }
}
export default AuthHelper;