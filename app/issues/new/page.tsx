"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation"; //only this one works with app router.

//is this IssueForm interface, necessary. Becoz TS seemed to work without this.
interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter(); 
    const {register, control, handleSubmit} = useForm<IssueForm>();
    // console.log(register('title'));
    //handleSubmit (reactHookForm) -> returns a function that will be used onSubmit.s
  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data)=> {
        await axios.post('/api/issues', data); //axios returns a promise.
        router.push('/issues'); //go to issues page.
    })}>
      <TextField.Root placeholder="Title" {...register("title")}></TextField.Root>
      <Controller render={({field})=><SimpleMDE placeholder="Description" {...field}></SimpleMDE>} name="description" control={control}></Controller>
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
