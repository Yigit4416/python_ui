/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { image } = body;

  if (!image) {
    return NextResponse.json({ message: "Image is required" }, { status: 400 });
  }

  try {
    const roboflowResponse = await fetch(
      "https://serverless.roboflow.com/infer/workflows/traffic-sign-project-qkdyy/custom-workflow-2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: process.env.ROBOFLOW_API_KEY,
          inputs: {
            image: {
              type: "base64",
              value: image,
            },
          },
        }),
      },
    );

    const data = await roboflowResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Roboflow API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
