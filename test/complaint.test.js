import request from 'supertest'
import app from '../src/app.js'

describe('Complaint API', () => {
  let complaintId

  test('should create a new complaint', async () => {
    const response = await request(app)
      .post('/complaints')
      .send({ title: 'Test complaint', description: 'Test description' })
      .set('Accept', 'application/json')
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    complaintId = response.body.id
  })

  test('should retrieve the created complaint', async () => {
    const response = await request(app).get(`/complaints/${complaintId}`)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      title: 'Test complaint',
      description: 'Test description'
    })
  })

  test('should list complaints', async () => {
    const response = await request(app).get('/complaints')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    const found = response.body.find(c => c.id === complaintId)
    expect(found).toBeDefined()
  })

  test('should update a complaint', async () => {
    const response = await request(app)
      .put(`/complaints/${complaintId}`)
      .send({ title: 'Updated title' })
      .set('Accept', 'application/json')
    expect(response.status).toBe(200)
    expect(response.body.title).toBe('Updated title')
  })

  test('should delete a complaint', async () => {
    const response = await request(app).delete(`/complaints/${complaintId}`)
    expect(response.status).toBe(204)
  })
})
