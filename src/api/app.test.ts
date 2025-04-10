import request from 'supertest';
import app from './app';

// Mock the users array to reset it before each test
const initialUsers = [
  { id: 1, name: "Jan Kowalski", email: "jan@example.com", role: "admin" },
  { id: 2, name: "Anna Nowak", email: "anna@example.com", role: "user" },
  { id: 3, name: "Piotr Wiśniewski", email: "piotr@example.com", role: "user" },
  { id: 4, name: "Marta Lis", email: "marta@example.com", role: "moderator" }
];

describe('API Endpoints', () => {
  let userId: number; // Add missing semicolon

  beforeEach(() => {
    // Reset the users array before each test
    (app as any).set('users', [...initialUsers]);
  });

  it('should return a message on the root endpoint', async () => {
    const res = await request(app).get('/.netlify/functions/api/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "API działa poprawnie" });
  });

  it('should get all users', async () => {
    const res = await request(app).get('/.netlify/functions/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a user by ID', async () => {
    const res = await request(app).get('/.netlify/functions/api/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(1);
  });

  it('should return 404 if user is not found', async () => {
    const res = await request(app).get('/.netlify/functions/api/users/999');
    expect(res.statusCode).toEqual(404);
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    };

    const res = await request(app)
      .post('/.netlify/functions/api/users')
      .send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Test User');
    expect(res.body.email).toEqual('test@example.com');
    userId = res.body.id; // Capture the created user's ID
  });

  it('should return 400 if name or email is missing', async () => {
    const invalidUser = { role: 'user' };
    const res = await request(app)
      .post('/.netlify/functions/api/users')
      .send(invalidUser);

    expect(res.statusCode).toEqual(400);
  });

  it('should update a user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    };

    const createRes = await request(app)
      .post('/.netlify/functions/api/users')
      .send(newUser);

    expect(createRes.statusCode).toEqual(201);
    userId = createRes.body.id;

    const updatedUser = {
      name: 'Updated User',
      email: 'updated@example.com',
      role: 'admin',
    };

    const res = await request(app)
      .put(`/.netlify/functions/api/users/${userId}`)
      .send(updatedUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated User');
    expect(res.body.email).toEqual('updated@example.com');
  });

  it('should delete a user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    };

    const createRes = await request(app)
      .post('/.netlify/functions/api/users')
      .send(newUser);

    expect(createRes.statusCode).toEqual(201);
    userId = createRes.body.id;

    const res = await request(app).delete(`/.netlify/functions/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
  });
});
