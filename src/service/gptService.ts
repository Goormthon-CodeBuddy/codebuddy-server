/* global OPENAI_AI_GOORMEE_KEY */
const { Configuration, OpenAIApi } = require("openai");
const { GPT_TEMPLATE } = require("../constant/gpt.constants");
const modchatMessage = require("../model/chatMessage");
const modchatRoom = require("../model/chatRoom");

const openAIConfig = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(openAIConfig);

const chatGPTCore = async ({
  code,
  description,
  stack,
  template,
}: {
  code: string;
  description: string;
  stack: string;
  template: any;
}) =>
  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // temperature: 1,
    // n: 1,
    // top_p: 0.2,
    // frequency_penalty: 0.3,
    // presence_penalty: 0,
    messages: [{ role: "user", content: template(code, description, stack) }],
  });

// 코드 오류 해결
exports.codeErrorSolution = async ({
  code,
  description,
  stack,
  roomIndex,
}: {
  code: string;
  description: string;
  stack: string;
  roomIndex: number;
}) => {
  try {
    // openai API 에 코드와 질의 템플릿 보내기
    const { data } = await chatGPTCore({
      code,
      description,
      stack,
      template: GPT_TEMPLATE.CODE_ERROR_SOLUTION,
    });

    await modchatMessage.createMessage({
      content: { code, description, stack },
      template_index: 0,
      room_index: roomIndex,
    });

    // 가공되지 않은 답변
    const rawAnswer = data?.choices[0]?.message.content;

    // 설명 및 추천코드 분리 가공
    let details = "";
    let fixedCode = "";

    // 각 태그로 감싸져 있는 부분 추출
    details = rawAnswer
      .substring(
        rawAnswer.indexOf("<DETAILS>") + 9,
        rawAnswer.indexOf("</DETAILS>")
      )
      .trim();
    fixedCode = rawAnswer
      .substring(
        rawAnswer.indexOf("<FIXED_CODE>") + 12,
        rawAnswer.indexOf("</FIXED_CODE>")
      )
      .trim();

    await modchatMessage.saveAnswer({
      content: { fixedCode, details },
      template_index: 0,
      room_index: roomIndex,
    });

    return {
      details,
      fixedCode,
    };
  } catch (e) {
    return e;
  }
};

//코드 설명
exports.codeExplanation = async ({
  code,
  description,
  stack,
  roomIndex,
}: {
  code: string;
  description: string;
  stack: string;
  roomIndex: number;
}) => {
  try {
    // openai API 에 코드와 질의 템플릿 보내기
    const { data } = await chatGPTCore({
      code,
      description,
      stack,
      template: GPT_TEMPLATE.CODE_EXPLANATION,
    });

    await modchatMessage.createMessage({
      content: { code, description, stack },
      template_index: 1,
      room_index: roomIndex,
    });

    const rawAnswer = data?.choices[0]?.message.content;

    let details = "";

    details = rawAnswer
      .substring(
        rawAnswer.indexOf("<DETAILS>") + 9,
        rawAnswer.indexOf("</DETAILS>")
      )
      .trim();

    await modchatMessage.saveAnswer({
      content: { details },
      template_index: 1,
      room_index: roomIndex,
    });

    return details;
  } catch (error) {
    return error;
  }
};

//코드 개선
exports.codeRefactoring = async ({
  code,
  description,
  stack,
  roomIndex,
}: {
  code: string;
  description: string;
  stack: string;
  roomIndex: number;
}) => {
  try {
    // openai API 에 코드와 질의 템플릿 보내기
    const { data } = await chatGPTCore({
      code,
      description,
      stack,
      template: GPT_TEMPLATE.CODE_ERROR_SOLUTION,
    });

    await modchatMessage.createMessage({
      content: { code, description, stack },
      template_index: 2,
      room_index: roomIndex,
    });

    // 가공되지 않은 답변
    const rawAnswer = data?.choices[0]?.message.content;

    // 설명 및 추천코드 분리 가공
    let details = "";
    let fixedCode = "";

    // 각 태그로 감싸져 있는 부분 추출
    details = rawAnswer
      .substring(
        rawAnswer.indexOf("<DETAILS>") + 9,
        rawAnswer.indexOf("</DETAILS>")
      )
      .trim();
    fixedCode = rawAnswer
      .substring(
        rawAnswer.indexOf("<FIXED_CODE>") + 12,
        rawAnswer.indexOf("</FIXED_CODE>")
      )
      .trim();

    await modchatMessage.saveAnswer({
      content: { fixedCode, details },
      template_index: 2,
      room_index: roomIndex,
    });

    return {
      details,
      fixedCode,
    };
  } catch (e) {
    return e;
  }
};

exports.createchatRoom = async ({ containerUid }: { containerUid: string }) => {
  try {
    const newroom = await modchatRoom.createRoom({ containerUid });
    return newroom;
  } catch (error) {
    throw error;
  }
};

exports.getRoomList = async ({ containerUid }: { containerUid: string }) => {
  try {
    const rooms = await modchatRoom.getRoomList({ containerUid });
    return rooms;
  } catch (error) {
    throw error;
  }
};

exports.getRoomHistory = async ({ room_index }: { room_index: number }) => {
  try {
    const histories = await modchatMessage.getHistory(room_index);
    return histories;
  } catch (error) {
    throw error;
  }
};
