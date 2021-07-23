import {expect} from 'chai';
import AuthHelper from '../helper/auth.helper'



describe('auth', function () {
    const credentials = {
        valid: {
            login: process.env.LOGIN,
            password: process.env.PASSWORD
        },
        invalid: {
            login: 'invalid',
            password: 'invalid'
        }
    }


    describe('successful log in', function () {
        const authHelper = new AuthHelper();

        before(async function () {
            await authHelper.post(credentials.valid.login, credentials.valid.password);
        });

        it('response status code is 200 ', function () {
        //     request
        //         .post('/auth')
        //         .send({login: process.env.LOGIN, password: process.env.PASSWORD})
        //         .end(function (err, res) {
        //             expect(res.statusCode).to.eq(200);
        //
        //         });

            expect (authHelper.response.statusCode).to.eq(200);

        });

        it('response body contains authorization token', function () {
             // request
             //     .post('/auth')
             //     .send({login: process.env.LOGIN, password: process.env.PASSWORD})
             //     .end(function (err, res) {
             //
             //         expect(res.body.token).not.to.be.undefined;


                // });
               expect(authHelper.response.body.token).not.to.be.undefined;


            });
        });

   describe('log in with wrong credential should return error', function (){
       const authHelper = new AuthHelper();
             before(async function (){

                 await authHelper.post(credentials.invalid.login, credentials.invalid.password);
         });

           it('response status code is 404', function (){
               expect (authHelper.response.statusCode).to.eq(404);

           });

         it('response body contains error message', function (){
             expect(authHelper.response.body.message).to.eq('Wrong login or password.');

           });
   });
});

