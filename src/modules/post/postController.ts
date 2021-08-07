import { Request, Response } from "express";
import _ = require("lodash");
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { PostUtils } from "./postUtils";

export class PostController {
  private postUtils: PostUtils = new PostUtils();

  public addPost = async (req: Request, res: Response) => {
    const { topicId } = req.params;
    const userId = req._locals.user.id;
    const { details, images, attachments } = req.body;
    const post: Json = { topicId, userId, details, images: JSON.stringify(images) };
    await this.postUtils.addPost(post);
    const rb = ResponseBuilder.data({ details, images: attachments }, req.t("SUCCESS_ADDED", { name: Constants.ADDED_FIELDS.POST }));
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg, user: rb.result });
  }


  public getPosts = async (req: Request, res: Response) => {
    const { page = Constants.DEFAULT_PAGE, limit = Constants.DEFAULT_LIMITS, topicId } = req.query;
    const limits = Utils.getLimits(page, limit);
    const result = await this.postUtils.getPosts(limits, topicId);
    const rb = ResponseBuilder.paginateData(result.posts, result.count, req.t("SUCCESS_GET", { name: Constants.ADDED_FIELDS.POST }));
    res.status(Constants.SUCCESS_CODE).json(rb);
  }

}
