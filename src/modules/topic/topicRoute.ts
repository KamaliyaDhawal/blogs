// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../validate";
import { TopicController } from "./topicController";
import { TopicMiddleware } from "./topicMiddleware";
import {
    TopicModel
} from "./topicModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const topicController: TopicController = new TopicController();
const topicMiddleware: TopicMiddleware = new TopicMiddleware();

router.post("/",
    v.validate(TopicModel),
    topicMiddleware.checkDuplication,
    topicController.addTopic
);

router.get("/",
    topicController.getTopics
);

// Export the express.Router() instance to be used by server.ts
export const TopicRoute: Router = router;
