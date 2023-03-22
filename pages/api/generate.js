import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  
  console.log(11111);

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "未配置 OpenAI API 密钥，请按照 README.md 中的说明进行操作",
      }
    });
    return;
  }

  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "请输入有效信息!",
      }
    });
    return;
  }

  try {
    console.log(22222);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(message),
      temperature: 0.6,
    });
    const chatbotResponse = completion.data.choices[0].text.trim().replace('ChatGPT:', '');
    res.status(200).json({ result: chatbotResponse });
  } catch(error) {
    console.log(error);
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(message, character = "普通朋友") {
  return `请以${character}的语气、方式和词汇来回答，回答的内容需要更加精确，内容长度不能超过100字。 我的问题是：${message}`;
}
