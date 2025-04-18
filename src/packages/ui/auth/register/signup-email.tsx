"use client";

import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterContext } from "./context";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { createNewUser } from "@/app/lib/actions/create-user-action";

const emailSignUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type EmailSignUp = z.infer<typeof emailSignUpSchema>;

export function SignUpEmail() {
	const { setEmail, setPassword, setStep } = useRegisterContext();

	const {
		register,
		getValues,
		formState: { errors },
	} = useForm<EmailSignUp>();
	const { executeAsync, isPending } = useAction(createNewUser, {
		onSuccess: () => {
			toast.success("Account created successfully");
			setEmail(getValues().email);
			setPassword(getValues().password);
			setStep("verify");
		},
		onError: (_) => {
			toast.error("Failed to create account. Please try again later.");
		},
	});

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await executeAsync({
					email: getValues().email,
					password: getValues().password,
				});
			}}
		>
			<div className="flex flex-col space-y-4 w-full">
				<Input
					{...register("email")}
					type="email"
					error={errors.email?.message}
					placeholder="Email"
					autoComplete="email"
				/>
				<Input
					{...register("password")}
					type="password"
					placeholder="Password"
					error={errors.password?.message}
				/>

				<Button
					type="submit"
					text={isPending ? "Submitting.." : "Sign Up"}
					loading={isPending}
					disabled={isPending}
				/>
			</div>
		</form>
	);
}
