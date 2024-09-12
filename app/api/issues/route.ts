import { NextRequest, NextResponse } from "next/server";
//for data validation we use zod -> to check whether there is zod -> zod version 3.22.2
import { createIssueSchema } from "@/app/validationSchema";
//importing the primsa singleton instance we created already.
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
    /* 
        we can also use,
        return NextResponse.json(validation.error.format(), {status: 400})
        //format method for a properly structured error response.
        */
    //learn what are the params for Next Response. -> check in notes.
  }
  //.issue is the name of the model
  //prisma functions are mostly async.
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
//my GET code.
export async function GET() {
  try {
    const issues = await prisma.issue.findMany(); //fetch all records.
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
  
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
  
    try {
      const deletedIssue = await prisma.issue.delete({
        where: { id: Number(id) },
      });
      return NextResponse.json(deletedIssue, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to delete issue" }, { status: 500 });
    }
  }