"use client";
import { SignUpBody } from "@/components/entities/auth";
import { useSignUpLocal } from "@/components/features/auth";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shared/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/shared/ui/card";
import { Form } from "@/components/shared/ui/form";
import { LoadingButton } from "@/components/shared/ui/loading-button";
import {
  SignUpLocalDto,
  signUpLocalDtoSchema,
} from "@/lib/dto/auth/sign-up-local.dto";
import { Routing } from "@/lib/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";

export function SignUpCard() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useSignUpLocal();

  const form = useForm<SignUpLocalDto>({
    resolver: zodResolver(signUpLocalDtoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignUpLocalDto) {
    mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-center">Create your Account</CardTitle>
          </CardHeader>
          <CardContent>
            {isError && (
              <Alert variant="error" className="mb-3">
                <MdErrorOutline className="h-5 w-5" />
                <AlertTitle>{error.response?.data.error}</AlertTitle>
                <AlertDescription>
                  {error.response?.data.message}
                </AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="success" className="mb-3 ">
                <MdCheckCircleOutline className="h-5 w-5 " />
                <AlertTitle>Registration success</AlertTitle>
                <AlertDescription>{data.message}</AlertDescription>
              </Alert>
            )}
            <SignUpBody control={form.control} isLoading={isPending} />
          </CardContent>
          <CardFooter className="flex flex-col">
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              className="w-full mb-5"
              type="submit"
            >
              Create an account
            </LoadingButton>
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                className="text-primary font-semibold hover:underline"
                href={Routing.auth.signIn()}
              >
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
