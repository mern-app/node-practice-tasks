import express from "express";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const filePath = path.join(import.meta.dirname, "data", "courses.json");

app.get("/api/courses", async (req, res) => {
    // read the file
    const courses = await fs.readFile(filePath, "utf-8");

    // convert to object
    const coursesObj = JSON.parse(courses);

    // send it
    res.json(coursesObj);
});

app.get("/api/courses/:id", async (req, res) => {
    // read the file and JSON.parse
    const courses = await fs.readFile(filePath, "utf-8");
    const coursesObj = JSON.parse(courses);

    // get the id
    const { id } = Number(req.params);

    // find the course
    const course = coursesObj.find((c) => c.id === id);

    // not found
    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }

    // found
    res.json(course);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
