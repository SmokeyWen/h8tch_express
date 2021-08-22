const app = require('../index');
const supertest = require('supertest');

describe('Test connection to MongoDB', () => {
    test('GET /task/get', async () => {
        await supertest(app).get('/task/get')
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
        })
    })
})

describe('Test Add', () => {
    const testTask = {
        "name" : "Task for Test",
        "date" : "08/08/8888",
        "is_deleted" : 0,
        "is_done" : 0
    };

    test("POST /task/add", async () => {
      await supertest(app).post("/task/add")
        .send(testTask)
        .expect(200)
        .then((response) => {
            const isFound = response.body.find(obj => obj.name === 'Task for Test');
            expect(isFound.name).toEqual(testTask.name);
        });
    });
});

describe('Test Update Task', () => {
    test("UPDATE /task/upd", async () => {
    await supertest(app).get("/task/get")
        .then( async (response) => {
            if (response.body.length > 0){
                console.log('has content');
                const isDoneBefore = response.body[0].is_done;
                const targetId = response.body[0]._id;
                await supertest(app).put("/task/upd?id=" + targetId)
                    .then((response) => {
                        const isDoneAfter = response.body[0].is_done;
                        const expected = isDoneBefore === 1 ? 0 : 1;
                        expect(isDoneAfter).toEqual(expected);
                    })
            }
            else {
                console.log('no content');
            }
        })
    });
});

describe('Test Delete One Task', () => {
    test("DELETE /task/del", async () => {
    await supertest(app).get("/task/get")
        .then( async (response) => {
            if (response.body.length > 0){
                const lengthBefore = response.body.length;
                console.log('has content');
                const targetId = response.body[0]._id;
                await supertest(app).delete("/task/del?id=" + targetId)
                    .then((response) => {
                        const lengthAfter = response.body.length;
                        expect(lengthAfter).toEqual(lengthBefore - 1);
                    })
            }
            else {
                console.log('no content');
            }
        })
    });
});


describe('Test DeleteAll', () => {
    test("DELETE /task/del/all", async () => {
      await supertest(app).delete("/task/del/all")
        .expect(200)
        .then((response) => {
            // console.log(response)
            const expected = {msg : 'All tasks deleted'};
            const actual = response.body;
            expect(actual).toEqual(expected);
        //   expect(response.body.length).toBe(0);
        });
    });
});