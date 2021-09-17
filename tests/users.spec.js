import { expect } from 'chai';
import UsersHelper from '../helper/users.helper';
import ConfigHelper from '../helper/config.helper';
import { getRandomItem } from '../helper/common.helper';

describe('users', function() {
    const configHelper = new ConfigHelper();

    describe('create user', function() {
        const usersHelper = new UsersHelper();

        before(async function() {
            await usersHelper.create();
        });

        it('response status code is 200', function() {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('response body contains user id', function() {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });

        it('response body contains amount', function() {
            expect(usersHelper.response.body.amount).not.to.be.undefined;
        });
    })

    describe('get specific user', function() {
        const usersHelper = new UsersHelper();

        before(async function() {
            await usersHelper.create();
            await usersHelper.getSpecific(usersHelper.response.body.id);
        });

        it('response status code is 200', function() {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('response body contains user id', function() {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });

        it('response body contains amount', function() {
            expect(usersHelper.response.body.amount).not.to.be.undefined;
        });
    });

    describe('get all users', function() {
        const usersHelper = new UsersHelper();

        before(async function() {
            for await (const user of Array(3)) {
                await usersHelper.create();
            }
            await usersHelper.getAll();
        });

        it('response status code is 200', function() {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('response body contains list of 3 or more items', function() {
            expect(usersHelper.response.body.length).to.be.at.least(3);
        });

        it('response body list item contains id', function() {
            expect(getRandomItem(usersHelper.response.body).id)
                .not.to.be.undefined;
        });

        it('response body list item contains amount', function() {
            expect(getRandomItem(usersHelper.response.body).amount)
                .not.to.be.undefined;
        });
    });

    describe('delete user', function() {
        const usersHelper = new UsersHelper();

        before(async function() {
            await usersHelper.create();
            await usersHelper.delete(usersHelper.response.body.id);
        });

        it('response status code is 200', function() {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('response body contains success message', function() {
            expect(usersHelper.response.body.message).to.eq('User deleted.');
        });
    });

    after(async function() {
        await configHelper.wipeData();
    });
})