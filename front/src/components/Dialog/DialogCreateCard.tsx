import React, { FC } from "react";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Ui/form";
import { Button } from "../Ui/ButtonShadcn";
import { Input } from "../Ui/input";
import { Card, CreateCardRequest } from "@/types/Card";
import { CardsCategoryEnum } from "@/types/CategoryCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Ui/select";
import { useCreateCardMutation } from "@/lib/services/cards";
import { toast } from "../Ui/use-toast";

type DialogCreateCardProps = {
  titleBtn: string;
};

const initialValues: Omit<CreateCardRequest, "id"> = {
  answer: "",
  question: "",
  tag: "",
};

const DialogCreateCard: FC<DialogCreateCardProps> = ({ titleBtn }) => {
  const [createCard] = useCreateCardMutation();

  const validationSchema = Yup.object().shape({
    question: Yup.string().required("Required"),
    answer: Yup.string().required("Required"),
    tag: Yup.string().required("Required"),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await createCard(values)
      .unwrap()
      .then(() => {
        form.reset();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.data.message,
          variant: "destructive",
        });
      });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{titleBtn}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create one card</DialogTitle>
          <DialogDescription>
            Fill in the form to create a new card
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter the answer" {...field} />
                  </FormControl>
                  <FormDescription>Please enter the answer</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter the question" {...field} />
                  </FormControl>
                  <FormDescription>Please enter the question</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input placeholder="Something to help you ?" {...field} />
                  </FormControl>
                  <FormDescription>Please enter the tag</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Add my card</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateCard;
