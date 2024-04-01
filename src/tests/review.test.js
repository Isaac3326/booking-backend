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

test('GET/ reviews debe retornar todas las reviews ', async () => {
    const res = await request(app).get('/reviews').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('POST/ reviews debe retornar la review creada', async () => {
    const body = {
        rating: 5,
        comment: "Hola soy Isaac"
    }
    const res = await request(app).post('/reviews').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.comment).toBe(body.comment);
});

test('PUT/ reviews/:id debe retornar la review actualizada', async () => {
    const body = {
        comment: "Hola soy isaac"
    }
    const res = await request(app).put(`/reviews/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.comment).toBe(body.comment);
});

test('DELETE/ reviews/:id eliminar la review por id', async () => {
    const res = await request(app).delete(`/reviews/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});