'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { createPitch } from "@/lib/actions";
import { toast } from "sonner"
import { z } from 'zod';
import { useRouter } from "next/navigation";
const StartupForm = () => {

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("");
  const router = useRouter()

  const handleFormSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);
      console.log(formValues)
      const result = await createPitch( formData, pitch);

      if (result.status === "SUCCESS") {
        toast("Success", {
          className: "!bg-green-700 !text-white",                // main toast
          descriptionClassName: "!text-white",
          description: "Your startup pitch has been created successfully.",
        });
        router.push(`/startup/${result._id}`)
      }
      return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        console.log(fieldErrors)

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast("Error", {
          className: "!bg-red-700 !text-white",                // main toast
          descriptionClassName: "!text-white",
          description: "Please check your inputs and try again",
        });

        return { 
     // @ts-expect-error
          ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast("A unexpected error has occurred", {
        className: "!bg-red-700 !text-white",                // main toast
        descriptionClassName: "!text-white",
        description: "Please check your inputs and try again",
      });
      return {
     // @ts-expect-error
        ...prevState,
        error: "A unexpected error has occurred",
        status: "ERROR"
      }

    } finally {

    }
  }
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '', status: "INITIAL"
  }
  )
  return (
    <form action={formAction} className='startup-form' >
      <div className="">
        <label htmlFor="title" className='startup-form_label' >Title</label>
        <Input id='title' name='title' className='startup-form_input' required placeholder='Startup title' />
        {errors.title && <p className='startup-form_error' >{errors.title}</p>}
      </div>
      <div className="">
        <label htmlFor="description" className='startup-form_label' >description</label>
        <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup description' />
        {errors.description && <p className='startup-form_error' >{errors.description}</p>}
      </div>
      <div className="">
        <label htmlFor="category" className='startup-form_label' >Category</label>
        <Input id='category' name='category' className='startup-form_input' required placeholder='Startup category (Tech, Education, Health, Game..)' />
        {errors.category && <p className='startup-form_error' >{errors.category}</p>}
      </div>
      <div className="">
        <label htmlFor="link" className='startup-form_label' >Image URL</label>
        <Input id='link' name='link' className='startup-form_input' required placeholder='Startup Image Url' />
        {errors.link && <p className='startup-form_error' >{errors.link}</p>}
      </div>
      <div className="" data-color-mode="light">
        <label htmlFor="pitch" className='startup-form_label' >Pitch</label>
        <MDEditor
          className='startup-form_editor'
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview='edit'
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves"
          }}
          previewOptions={{
            disallowedElements: ['style']
          }}
        />
        {errors.pitch && <p className='startup-form_error' >{errors.pitch}</p>}
      </div>
      <Button type='submit' className='startup-form_btn text-white' disabled={isPending} >{isPending ? "Submitting.." : "Submit your pitch"}<Send className='size-6 ml-2' /></Button>
    </form>
  )
}

export default StartupForm