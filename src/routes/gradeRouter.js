"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeRouter = void 0;
var express_1 = __importDefault(require("express"));
var gradeController_1 = __importDefault(require("../controllers/gradeController"));
var app = express_1.default();
exports.gradeRouter = app;
app.post("/grade/", gradeController_1.default.create);
app.get("/grade/", gradeController_1.default.findAll);
app.get("/grade/:id", gradeController_1.default.findOne);
app.put("/grade/:id", gradeController_1.default.update);
app.delete("/grade/:id", gradeController_1.default.remove);
app.delete("/grade/", gradeController_1.default.removeAll);
