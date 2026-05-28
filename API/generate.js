export default async function handler(req, res) {
  return res.status(200).json({
    message: "API FUNCTION WORKING",
    hasKey: !!process.env.OPENAI_API_KEY
  });
}
