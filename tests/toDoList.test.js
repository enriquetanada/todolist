const db = require('./db')
const request = require("supertest")
const baseURL = "http://localhost:3000"

beforeAll(async () => await db.connect())

afterAll(async () => await db.closeConnection())

test('get lists of to do and it should return 200', async() => {
    const response = await request(baseURL).get("/api/v1/lists");
    expect(response.statusCode).toBe(200);
    expect(typeof response).toBe('object');
    expect(response.body.data.lists.length >= 1).toBe(true);
  }, 30000);

test('create new to do list and it should return 201', async() => {
  const newTodo = {task: 'swimming'}
  const response = await request(baseURL).post("/api/v1/lists").send(newTodo);
  expect(response.statusCode).toBe(201);
  expect(typeof response).toBe('object');
}, 30000);

test('update todo list and it should return 404 when id is not found', async() => {
  const id = '64dd6df420adea4e0dc62a60'
  const updateTodo = {task: 'typing'}
  const response = await request(baseURL).patch(`/api/v1/lists/${id}`).send(updateTodo, {
    completed: true,
  });
  expect(response.statusCode).toBe(404);
}, 30000);

test('update todo list and it should return 200', async() => {
  const id = '64dd6df420adea4e0dc62a60'
  const updateTodo = {task: 'typing'}
  const response = await request(baseURL).patch(`/api/v1/lists/${id}`).send(updateTodo, {
    completed: true,
  });
  expect(response.statusCode).toBe(200);
  expect(typeof response).toBe('object');
}, 30000);

test('delete todo list and it should return 404 when id is not found', async() => {
  const id = '64dd6df420adea4e0dc62a60'
  const response = await request(baseURL).delete(`/api/v1/lists/${id}`);
  expect(response.statusCode).toBe(404);
}, 30000);

test('it should return 204', async() => {
  const id = '64dd6df420adea4e0dc62a60'
  const response = await request(baseURL).delete(`/api/v1/lists/${id}`);
  expect(response.statusCode).toBe(204);
  expect(typeof response).toBe(object);
}, 30000);
