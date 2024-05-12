"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/global/loader";
import { Feedback, OrderDetails } from "@/types/product";
import UserProfile from "@/components/global/user-profile";
import { Phone } from "lucide-react";
import StarRating from "@/components/global/rating";
import { Textarea } from "@/components/ui/textarea";
import { useSendReply } from "@/server/feedback/mutations";

const formSchema = z.object({
  reply: z.string().min(2, {
    message: "Reply message must be at least 2 characters.",
  }),
});

interface ReplyFormProps {
  feedback: Feedback;
}

const ReplyForm = ({ feedback }: ReplyFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply: feedback.reply ?? "",
    },
  });
  const sendReply = useSendReply();
  const isLoading = form.formState.isLoading;
  function onSubmit(data: z.infer<typeof formSchema>) {
    const updatedFeedbackData = {
      feedbackId: feedback.id,
      ...data,
    };
    sendReply.mutate(updatedFeedbackData);
    form.reset();
  }
  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <Label className="text-xl font-bold mb-4">Customer</Label>
            <div className="border rounded-xl p-4 flex items-center justify-between">
              <UserProfile user={feedback.customer} />
              <Phone className="h-5 w-5 text-primary cursor-pointer" />
            </div>
          </div>
          <div>
            <Label className="text-xl font-bold mb-4">Feedback</Label>
            <div className="border rounded-xl p-4">
              <StarRating rating={feedback.rating} />
              <p className="text-sm mt-2">{feedback.message}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-xl font-bold mb-4">Order</Label>
              <p className="text-md font-bold text-primary cursor-pointer">
                See Order
              </p>
            </div>
            <ul className="list-disc prose-sm ml-4">
              {feedback.order.items &&
                feedback.order.items.map((ordDetails: OrderDetails) => (
                  <li key={ordDetails.id}>
                    {ordDetails.product.name} - ${ordDetails.product.price}
                  </li>
                ))}
            </ul>
          </div>
          <FormField
            control={form.control}
            name="reply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reply Message *</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Please enter the reply here."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={sendReply.isPending}
            className="w-full rounded-2xl"
          >
            {(isLoading || sendReply.isPending) && (
              <Loader className="h-4 w-4 mr-2" />
            )}
            Reply
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReplyForm;
