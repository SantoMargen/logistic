const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../app");
const Auth = require("../db/models/auth")
const PasswordHelper = require("../helpers/brcrypt")
const TokenHelper = require("../helpers/jwt");


chai.use(chaiHttp);

describe("POST /auth/creater", () => {
    const authTest = {
        username: "username1",
        msisdn: "83365347356",
        name: "name 1",
        password: "Password1$"
    }
    afterEach(async () => { //Before each test we empty the database
        await Auth.destroy({
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    });

    describe("POST /auth/create, [SUCCESS  REGISTER CASE]", () => {
        it("Should return status 201", async () => {
            const res = await chai.request(app)
                .post("/auth/create")
                .send(authTest)

            chai.expect(res.status).to.eql(201);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("id").and.to.be.a("string");
            chai.expect(res.body).to.have.deep.property("created_at").and.to.be.a("string");
            chai.expect(res.body).to.have.deep.property("updated_at").and.to.be.a("string");
            chai.expect(res.body).to.have.deep.property("msisdn").and.to.be.a("string");
            chai.expect(res.body).to.have.deep.property("username").and.to.be.a("string");
            chai.expect(res.body).to.have.deep.property("name").and.to.be.a("string");
            chai.expect(res.body).to.have.deep.property("msisdn").and.to.be.a("string");
        });
    })
})

describe("POST - /auth/create [FAILED REGISTER CASE]", () => {
    const authTestError = {
        username: "username2",
        msisdn: "833653473566",
        name: "name2",
        password: "Password1$"
    }
    describe("POST /auth/creater, [FAILED  REGISTER CASE]", () => {
        beforeEach(async () => {
            await Auth.create(authTestError)
        })
        describe("POST /auth/creater, [FAILED  REGISTER CASE]", () => {
            it("Should return status 400 where username already exist", async () => {
                const res = await chai.request(app)
                    .post("/auth/create")
                    .send(authTestError)

                chai.expect(res.status).to.eql(400);
                chai.expect(res.body).be.a("object");
                chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
            })
        })

    })
    describe("POST /auth/creater, [FAILED  REGISTER CASE]", () => {
        it("Should return status 400 where msisdn already exist", async () => {
            const msisdnError = {
                ...authTestError,
                username: "username3"
            }
            const res = await chai.request(app)
                .post("/auth/create")
                .send(msisdnError)

            chai.expect(res.status).to.eql(400);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
    describe("POST /auth/creater, [FAILED  REGISTER CASE]", () => {
        it("Should return status 400 where msisdn null", async () => {
            const msisdnNull = {
                ...authTestError,
                msisdn: null
            }
            const res = await chai.request(app)
                .post("/auth/create")
                .send(msisdnNull)

            chai.expect(res.status).to.eql(400);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
    describe("POST /auth/creater, [FAILED  REGISTER CASE]", () => {
        it("Should return status 400 where name null", async () => {
            const namenNull = {
                ...authTestError,
                username: "username4",
                msisdn: "8336531490",
                name: null
            }
            const res = await chai.request(app)
                .post("/auth/create")
                .send(namenNull)

            chai.expect(res.status).to.eql(400);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
    describe("POST /auth/creater, [FAILED  REGISTER CASE]", () => {
        it("Should return status 400 where username null", async () => {
            const usernameNull = {
                ...authTestError,
                msisdn: "8336531490",
                name: "mock name",
                username: null
            }
            const res = await chai.request(app)
                .post("/auth/create")
                .send(usernameNull)

            chai.expect(res.status).to.eql(400);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
    describe("POST /auth/creater, [FAILED  REGISTER CASE]", () => {
        it("Should return status 400 where password null", async () => {
            const passwordNull = {
                ...authTestError,
                msisdn: "8336531491",
                name: "mock name",
                username: "username4",
                password: null
            }
            const res = await chai.request(app)
                .post("/auth/create")
                .send(passwordNull)

            chai.expect(res.status).to.eql(500);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
})

describe("POST /auth/login [SUCCESS CASE]", () => {
    const auth = {
        username: "username8",
        msisdn: "0123456",
        name: "name2",
        password: PasswordHelper.hashPassword("Password1$")
    }
    beforeEach(async () => {
        const user = await Auth.create(auth)
    })
    describe("POST /auth/login, [SUCCESS  LOGIN CASE]", () => {
        it("Should return status 201", async () => {
            const loginUser = {
                msisdn: "620123456",
                password: "Password1$"
            }
            const res = await chai.request(app)
                .post("/auth/login")
                .send(loginUser)
            chai.expect(res.status).to.eql(200);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("acces_token").and.to.be.a("string");
        })

    })
})

describe("POST /auth/login [FAILED CASE]", () => {
    const auth = {
        username: "username9",
        msisdn: "0123457",
        name: "name2",
        password: PasswordHelper.hashPassword("Password1$")
    }
    beforeEach(async () => {
        await Auth.create(auth)
    })
    describe("POST /auth/login, where msisdn not found", () => {
        it("Should return status 404", async () => {
            const loginUser = {
                msisdn: "6201234519",
                password: "Password1$"
            }
            const res = await chai.request(app)
                .post("/auth/login")
                .send(loginUser)

            chai.expect(res.status).to.eql(404);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
})

describe("POST /auth/login [FAILED CASE]", () => {
    const auth = {
        username: "username10",
        msisdn: "01234511",
        name: "name2",
        password: PasswordHelper.hashPassword("Password1$")
    }
    beforeEach(async () => {
        await Auth.create(auth)
    })
    const loginUser = {
        msisdn: "6201234511",
        password: "Password1$$"
    }
    describe("POST /auth/login, where password not match", () => {
        it("Should return status 404", async () => {
            const res = await chai.request(app)
                .post("/auth/login")
                .send(loginUser)
            chai.expect(res.status).to.eql(404);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
})

describe("POST /auth/login [FAILED CASE]", () => {
    const auth = {
        username: "username11",
        msisdn: "01234512",
        name: "name2",
        password: PasswordHelper.hashPassword("Password1$")
    }
    beforeEach(async () => {
        await Auth.create(auth)
    })
    const loginUser = {
        msisdn: "6201234512",
        password: "Password1$"
    }
    describe("POST /auth/login, msisdn null", () => {
        it("Should return status 400", async () => {
            const msisdnNull = {
                ...loginUser,
                msisdn: null,
            }
            const res = await chai.request(app)
                .post("/auth/login")
                .send(msisdnNull)
            chai.expect(res.status).to.eql(400);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
})


describe("POST /auth/login [FAILED CASE]", () => {
    const auth = {
        username: "username12",
        msisdn: "01234513",
        name: "name2",
        password: PasswordHelper.hashPassword("Password1$")
    }
    beforeEach(async () => {
        await Auth.create(auth)
    })
    const loginUser = {
        msisdn: "6201234513",
        password: "Password1$"
    }
    describe("POST /auth/login, success", () => {
        it("Should return status 200", async () => {
            const passwordNull = {
                ...loginUser,
                password: null,
            }
            const res = await chai.request(app)
                .post("/auth/login")
                .send(passwordNull)
            chai.expect(res.status).to.eql(400);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
})



describe("POST /auth/login [FAILED CASE]", () => {
    const auth = {
        username: "username14",
        msisdn: "01234515",
        name: "name2",
        password: PasswordHelper.hashPassword("Password1$")
    }
    beforeEach(async () => {
        await Auth.create(auth)
    })
    const loginUser = {
        msisdn: "6201234515",
        password: "Password1$"
    }

    describe("POST /auth/login, Invalid Token", () => {
        it("Should return status 401", async () => {
            const { body: { acces_token } } = await chai.request(app)
                .post("/auth/login")
                .send(loginUser)
            const res = await chai.request(app).get("/auth/verify").set("authorization", acces_token)

            chai.expect(res.status).to.eql(200);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("id").and.to.be.a("string");
        })
    })
})


describe("POST /auth/login [SUCCESS CASE]", () => {
    const auth = {
        username: "username13",
        msisdn: "01234514",
        name: "name2",
        password: PasswordHelper.hashPassword("Password1$")
    }
    beforeEach(async () => {
        await Auth.create(auth)
    })
    const loginUser = {
        msisdn: "6201234514",
        password: "Password1$"
    }
    describe("POST /auth/login, Invalid Token null", () => {
        it("Should return status 400", async () => {
            const acces_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkNGNhZGU5LTdhMzMtNDU1OC1hMWMxLWRhNjRlYmI3OWE1NiIsImlhdCI6MTY4NjE5NjgzNywiZXhwIjoxNjg2MjgzMjM3fQ.2jTxh05rspUOEVxwH-RKRAIyvk4jtj1AK1sdO8hLUP"
            const res = await chai.request(app).get("/auth/verify").set("authorization", acces_token)

            chai.expect(res.status).to.eql(401);
            chai.expect(res.body).be.a("object");
            chai.expect(res.body).to.have.deep.property("message").and.to.be.a("string");
        })
    })
})
