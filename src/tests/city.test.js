const request = require('supertest');
const app = require('../app');
let token;
let id;

beforeAll(async () =>{
    const res = await request(app).post('/users/login').send({
        email: "test@gmail.com",
        password: "123456"
    });
    token =  res.body.token;
})

test('GET /cities debe traer las cuidades', async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /cities debe crear una cuidad', async () =>{
    const body = {
        name: "moca",
        country: "republica dominicana",
        countryId: "DR"
    }
    const res = await request(app).post('/cities').send(body).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('DELETE /cities/:id debe eliminar una cuidad', async () =>{
    const res = await request(app).delete(`/cities/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});