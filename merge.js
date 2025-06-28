// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");

// async function exportDatabaseToJson(mongoUri, outputDir) {
//   try {
//     // Connect to the MongoDB database
//     await mongoose.connect(mongoUri);

//     console.log("Connected to the database.");

//     // Safely access the `db` property
//     const db = mongoose.connection.db;
//     if (!db) {
//       throw new Error("Database connection is not established.");
//     }

//     // Get all collection names
//     const collections = await db.listCollections().toArray();
//     const collectionNames = collections.map((col) => col.name);

//     // Ensure the output directory exists
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }

//     // Fetch and save data for each collection
//     for (const collectionName of collectionNames) {
//       const data = await db.collection(collectionName).find({}).toArray();
//       const filePath = path.join(outputDir, `${collectionName}.json`);

//       // Write the data to a JSON file
//       fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
//       console.log(`Exported ${collectionName} to ${filePath}`);
//     }

//     console.log("Database export completed.");
//   } catch (error) {
//     console.error("Error exporting database:", error);
//   } finally {
//     // Disconnect from the database
//     await mongoose.disconnect();
//     console.log("Disconnected from the database.");
//   }
// }

// // Example usage
// const mongoUri =
//   "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks";
// const outputDir = "./database-backup";

// exportDatabaseToJson(mongoUri, outputDir).catch(console.error);

const mongoose = require("mongoose");
const fs = require("fs");

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    videoUrl: { type: String, default: null },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: { type: Number, required: true },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt
  }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    imageUrl: { type: String, default: null },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt
  }
);

const Course = mongoose.model("Course", courseSchema);

async function addCoursesFromJson(jsonFilePath) {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(
      "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks");

    console.log("Connected to the database.");

    // Read the JSON file
    const rawData = fs.readFileSync(jsonFilePath, "utf-8");
    const courses = JSON.parse(rawData);

    // Insert the courses into the database
    const insertedCourses = await Course.insertMany(courses);

    console.log(`${insertedCourses.length} courses added to the database.`);
  } catch (error) {
    console.error("Error adding courses:", error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

// // Example usage
// const jsonFilePath = "./database-backup/courses.json";
// addCoursesFromJson(jsonFilePath).catch(console.error);

const newChapters = [
  {
    "title": "Chapter 41: Intro to WhatsApp marketing 1",
    "description": "Introduction to WhatsApp marketing - part 1.",
    "videoUrl": "https://youtu.be/sJQCeIp284M?si=er6qqEiZxVBq4NQG",
    "courseId": "67e7de73e355ca5404744e78",
    "order": 41
  },
  {
    "title": "Chapter 42: Intro to WhatsApp marketing 2",
    "description": "Introduction to WhatsApp marketing - part 2.",
    "videoUrl": "https://youtu.be/r9nXeZc7sF8?si=BW_LRvj-p_YSn1ky",
    "courseId": "67e7de73e355ca5404744e78",
    "order": 42
  },
  {
    "title": "Chapter 43: Yanda ake WhatsApp marketing 1",
    "description": "Yadda ake amfani da WhatsApp wajen marketing - 1.",
    "videoUrl": "https://youtu.be/WZKwDGjaOao?si=hdMXkbdOGffCQHs2",
    "courseId": "67e7de73e355ca5404744e78",
    "order": 43
  },
  {
    "title": "Chapter 44: Yanda ake WhatsApp marketing 2",
    "description": "Yadda ake amfani da WhatsApp wajen marketing - 2.",
    "videoUrl": "https://youtu.be/_oDGThXV_CA?si=sOssxeY5Eu2XVHmy",
    "courseId": "67e7de73e355ca5404744e78",
    "order": 44
  }
]


async function addChaptersAndReturnIds(chapterJsonPath, outputJsonPath) {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks"
    );

    console.log("Connected to the database.");

    // Read the chapter JSON file
    const chapterData = JSON.parse(fs.readFileSync(chapterJsonPath, "utf-8"));

    // Insert chapters into the database
    const insertedChapters = await Chapter.insertMany(newChapters);

    // Extract only the _id field and convert it to 'id'
    const chapterIds = insertedChapters.map((chapter) =>
      chapter._id.toString()
    );

    // Optionally, save the IDs to a new JSON file
    // fs.writeFileSync(
    //   outputJsonPath,
    //   JSON.stringify(chapterIds, null, 2),
    //   "utf-8"
    // );

    console.log(
      `Inserted ${insertedChapters.length} chapters and saved their IDs to ${outputJsonPath}.`
    );
    console.log("Chapter IDs:", chapterIds);

    return chapterIds; // Return the array of chapter IDs
  } catch (error) {
    console.error("Error adding chapters:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

// // Example usage
// const chapterJsonPath = "./database-backup/chapters.json"; // Adjust path to your chapters JSON file
// const outputJsonPath = "./database-backup/chapterIds.json"; // Output path for the saved file
// addChaptersAndReturnIds(chapterJsonPath, outputJsonPath)
//   .then((chapterIds) => {
//     console.log("Returned Chapter IDs:", chapterIds);
//   })
//   .catch(console.error);

const chapters = [
  "67f6be92739b6649213b0dbd",
  "67f6be92739b6649213b0dbe",
  "67f6be92739b6649213b0dbf",
  "67f6be92739b6649213b0dc0",
  "67f6be92739b6649213b0dc1",
  "67f6be92739b6649213b0dc2",
  "67f6be92739b6649213b0dc3",
  "67f6be92739b6649213b0dc4",
  "67f6be92739b6649213b0dc5",
  "67f6be92739b6649213b0dc6",
  "67f6be92739b6649213b0dc7",
  "67f6be92739b6649213b0dc8",
  "67f6be92739b6649213b0dc9",
  "67f6be92739b6649213b0dca",
  "67f6be92739b6649213b0dcb",
  "67f6be92739b6649213b0dcc",
  "67f6be92739b6649213b0dcd",
  "67f6be92739b6649213b0dce",
  "67f6be92739b6649213b0dcf",
  "67f6be92739b6649213b0dd0",
  "67f6be92739b6649213b0dd1",
  "67f6be92739b6649213b0dd2",
  "67f6be92739b6649213b0dd3",
  "67f6be92739b6649213b0dd4",
  "67f6be92739b6649213b0dd5",
  "67f6be92739b6649213b0dd6",
  "67f6be92739b6649213b0dd7",
  "67f6be92739b6649213b0dd8",
  "67f6be92739b6649213b0dd9",
  "67f6be92739b6649213b0dda",
  "67f6be92739b6649213b0ddb",
  "67f6be92739b6649213b0ddc",
  "67f6be92739b6649213b0ddd",
  "67f6be92739b6649213b0dde",
  "67f6be92739b6649213b0ddf",
  "67f6be92739b6649213b0de0",
  "67f6be92739b6649213b0de1",
  "67f6be92739b6649213b0de2",
  "67f6be92739b6649213b0de3",
  "67f6be92739b6649213b0de4",
  "684f77ae7278663e6f1fb453",
  "684f77ae7278663e6f1fb454",
  "684f77ae7278663e6f1fb455",
  "684f77ae7278663e6f1fb456",
  ///////////
  "67f6be92739b6649213b0de5",
  "67f6be92739b6649213b0de6",
  "67f6be92739b6649213b0de7",
  "67f6be92739b6649213b0de8",
  "67f6be92739b6649213b0de9",
  "67f6be92739b6649213b0dea",
  "67f6be92739b6649213b0deb",
  "67f6be92739b6649213b0dec",
  "67f6be92739b6649213b0ded",
  "67f6be92739b6649213b0dee",
  "67f6be92739b6649213b0def",
  "67f6be92739b6649213b0df0",
  "67f6be92739b6649213b0df1",
  "67f6be92739b6649213b0df2",
  "67f6be92739b6649213b0df3",
  "67f6be92739b6649213b0df4",
  "67f6be92739b6649213b0df5",
  "67f6be92739b6649213b0df6",
  "67f6be92739b6649213b0df7",
  "67f6be92739b6649213b0df8",
  "67f6be92739b6649213b0df9",
  "67f6be92739b6649213b0dfa",
];

const chapersToUpdate = [
  '684f77ae7278663e6f1fb453',
  '684f77ae7278663e6f1fb454',
  '684f77ae7278663e6f1fb455',
  '684f77ae7278663e6f1fb456',
]

console.log(chapters.length);

const firstPart = chapters.slice(0, 44);
const secondPart = chapters.slice(40, 55);
const thirdPart = chapters.slice(55, 62);
console.log(chapters[44])

console.log(firstPart.length, secondPart.length, thirdPart.length);
console.log(firstPart.length + secondPart.length + thirdPart.length);


async function updateCourseChapters(courseId, chapterIds) {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks"
    );

    console.log("Connected to the database.");

    // Ensure chapterIds are in ObjectId format
    const ObjectId = mongoose.Types.ObjectId;
    const chapterObjectIds = chapterIds.map((id) => new ObjectId(id));

    // Find the course by its ID and update the chapters
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: { chapters: chapterObjectIds } },
      { new: true } // Return the updated course document
    );

    if (!updatedCourse) {
      throw new Error("Course not found.");
    }

    console.log("Course updated:", updatedCourse);
    return updatedCourse;
  } catch (error) {
    console.error("Error updating course:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

// // Example usage
const courseId = "67e7de73e355ca5404744e78"; // Replace with your actual course ID

updateCourseChapters(courseId, firstPart)
  .then((updatedCourse) => {
    console.log("Updated Course:", updatedCourse);
  })
  .catch(console.error);
