"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export const TestForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = async (values: any) => {
    const response = await axios.post("/api/user", values);
    console.log("data", values);
    console.log("res", response);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
          </div>
          <Button type="submit" className="mt-8 w-full">
            제출
          </Button>
        </form>
      </Form>
    </>
  );
};
