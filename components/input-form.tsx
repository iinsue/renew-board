"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

export const TestForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = async (data: any) => {
    const response = await axios.post("/api/user", data);
    console.log("data", data);
    console.log("res", response);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-8 w-full">
            제출
          </Button>
        </form>
      </Form>
    </>
  );
};
