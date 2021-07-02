import request from 'supertest';
import {app} from "../src/app";

describe("Grades Create", ()=>{

    it("Should be able create a new grade", async ()=>{
        const response = await request(app).post("/grade/")
        .send({
            name: "Joaquin Phoenix",
            subject: "Arte",
            type: "Interpretação",
            value: 9.8,
        })

        expect(response.status).toBe(201);
    })
})
describe("Grades findall", ()=>{

    it("Should be able findall grade", async ()=>{
        const response = await request(app).get("/grade/")
        expect(response.status).toBe(200);
    })
})
describe("Grades findone", ()=>{

    it("Should be able findone grade", async ()=>{
        const response = await request(app).get("/grade/60da6bae876bbf06dc37efec")
        

        expect(response.status).toBe(200);
    })
    it("Should not to be able findone grade", async ()=>{
        const response = await request(app).get("/grade/60da6bae876btfdbf06dc37efec")
        
        expect(response.status).toBe(response.statusCode);
    })
})
describe("Grades update", ()=>{

    it("Should be able update a grade", async ()=>{
        const response = await request(app).put("/grade/60da6bae876bbf06dc37efec")
        .send({
            name: "Sergio Ramos",
            subject: "Educação Fisica",
            type: "Futebol",
            value:9,
        })

        expect(response.status).toBe(200);
    })
    it("Should not be able update a grade because its not have body", async ()=>{
        const response = await request(app).put("/grade/60da6bae876bbf06dc37efec")
        
        expect(response.status).toBe(response.statusCode);
    })
    it("Should not be able update a grade beacause id is invalid", async ()=>{
        const response = await request(app).put("/grade/60da6bae876btfdbf06dc37efec")
        .send({
            name: "Sergio Ramos",
            subject: "Educação Fisica",
            type: "Futebol",
            value: 10.0,
        })

        expect(response.status).toBe(response.statusCode);
    })
})
describe("Grades remove", ()=>{

    it("Should be able delete a grade", async ()=>{
        const response = await request(app).delete("/grade/60da6d10c4143d37b0c063ac")
      

        expect(response.status).toBe(200);
    })
    it("Should not be able delte a grade", async ()=>{
        const response = await request(app).delete("/grade/60da4154cb14a7a270b44eaf8d0")

        expect(response.status).toBe(response.statusCode);
    })
})
/* describe("Grades removeall", ()=>{

    it("Should be able delete the all grade", async ()=>{
        const response = await request(app).delete("/grade/")
      

        expect(response.status).toBe(200);
    })
  
}) */