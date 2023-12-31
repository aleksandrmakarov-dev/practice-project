"use client";

import { ForgotPasswordBody } from "@/components/entities/auth";
import { useForgotPassword } from "@/components/features/auth";
import * as alert from "@/components/shared/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Form } from "@/components/shared/ui/form";
import { LoadingButton } from "@/components/shared/ui/loading-button";
import {
  ForgotPasswordDto,
  forgotPasswordDtoSchema,
} from "@/lib/dto/auth/forgot-password.dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ForgotPasswordCard() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useForgotPassword();

  const form = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordDtoSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordDto) {
    mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="text-center">
            <CardTitle>Password recovery</CardTitle>
            <CardDescription>
              No worries, we will send you reset instructions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess && (
              <alert.Alert variant="success" className="mb-3">
                <FontAwesomeIcon icon="check-circle" className="h-5 w-5" />
                <alert.AlertDescription>{data.message}</alert.AlertDescription>
              </alert.Alert>
            )}
            {isError && (
              <alert.Alert variant="error" className="mb-3">
                <FontAwesomeIcon
                  icon="exclamation-circle"
                  className="h-5 w-5"
                />
                <alert.AlertDescription>
                  {error.response?.data.message}
                </alert.AlertDescription>
              </alert.Alert>
            )}
            <ForgotPasswordBody control={form.control} isLoading={isPending} />
          </CardContent>
          <CardFooter className="flex flex-col">
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              className="w-full mb-3"
              type="submit"
            >
              Reset password
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
