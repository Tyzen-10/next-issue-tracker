"use client";
import { Button, TextArea, TextField, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; //only this one works with app router.
import { createIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";

//is this IssueForm interface, necessary. Becoz TS seemed to work without this.
interface IssueForm {
  title: string;
  description: string;
}
/* we can also use -> 
type IssueForm = z.infer<typeof createIssueSchema>;
and we can provide this in the generic for useForm.
*/

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    //formState contains everything we need to know about the form including errors
    resolver: zodResolver(createIssueSchema), //handles validation
  });
  // console.log(register('title'));
  //handleSubmit (reactHookForm) -> returns a function that will be used onSubmit.s
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data); //axios returns a promise.
            router.push("/issues"); //go to issues page.
          } catch (error) {
            console.log(error);
            setError("An unexpected error occured. Check console.");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
          )}
          name="description"
          control={control}
        ></Controller>
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
