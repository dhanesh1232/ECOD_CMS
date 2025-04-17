import OpenAI from "openai";

export const createOpenAIClient = (apiKey) => {
  return new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });
};

export const generateChatResponse = async (openai, messages) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response from OpenAI");
  }
};

export const generateSocialMediaPost = async (openai, prompt, platform) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a social media content creator specialized in ${platform} posts. Generate engaging content based on the user's prompt.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate social media post");
  }
};
