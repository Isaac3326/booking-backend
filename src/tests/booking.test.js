const request = require('supertest')
const app = require('../app')

let id;
let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: "test@gmail.com", 
        password: "123456", 
    })
    token = res.body.token
})

test('GET/ bookings debe retornar las bookings ', async () => {
    const res = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ bookings debe crear la booking', async () => {
    const body = {
        checkIn: "2022-12-14",
        checkOut: "2024-05-14"
    }
    const res = await request(app).post('/bookings').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.comment).toBe(body.comment);
});

test('PUT/ bookings/:id debe retornar la booking creada', async () => {
    const body = {
        checkIn: "2022-08-12 "
    }
    const res = await request(app).put(`/bookings/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('DELETE/ bookings/:id elimina la booking por su id', async () => {
    const res = await request(app).delete(`/bookings/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});