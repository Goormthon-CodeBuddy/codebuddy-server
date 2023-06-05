import { NextFunction } from "express";
import express, { Request, Response } from "express";
const service = require("../service/gptService");
const { BUDDY_MODE } = require("../constant/gpt.constants");

const router = express.Router();

router.get(
  "/api/gpt",
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      message: "Hello from GPT",
    });
  }
);

router.post("/api/error-solution", async (req, res) => {
  const { stack = "", prompt, description = "", roomIndex } = req.body;

  try {
    const data = await service.codeErrorSolution({
      code: prompt,
      description,
      stack,
      roomIndex,
      mode: BUDDY_MODE.CODE_ERROR_SOLUTION,
    });

    return res.json(data);
  } catch (error) {
    return error;
  }
});

router.post("/api/code-explanation", async (req, res) => {
  const { stack = "", prompt, description = "", roomIndex } = req.body;

  try {
    const data = await service.codeExplanation({
      code: prompt,
      description,
      stack,
      roomIndex,
      mode: BUDDY_MODE.CODE_EXPLANATION,
    });

    return res.json(data);
  } catch (error) {
    return error;
  }
});

router.post("/api/code-refactoring", async (req, res) => {
  const { stack = "", prompt, description = "", roomIndex } = req.body;

  try {
    const data = await service.codeRefactoring({
      code: prompt,
      description,
      stack,
      roomIndex,
      mode: BUDDY_MODE.CODE_REFACTORING,
    });

    return res.json(data);
  } catch (error) {
    return error;
  }
});

router.post("/api/newRoom", async (req, res) => {
  const { containerUid } = req.body;
  try {
    const data = await service.createchatRoom({
      containerUid,
    });
    res.send({ result: true, data });
  } catch (error) {
    return error;
  }
});

router.get("/api/roomList", async (req, res) => {
  const { containerUid } = req.query;
  try {
    const data = await service.getRoomList({
      containerUid,
    });
    res.send({ result: true, data: { rooms: data } });
  } catch (error) {
    return error;
  }
});

router.get("api/room/:room_index", async (req, res) => {
  const { room_index } = req.params;
  try {
    const data = await service.getRoomHistory({
      room_index,
    });
    res.send({ result: true, data });
  } catch (error) {
    return error;
  }
});

export { router as gptRouter };
