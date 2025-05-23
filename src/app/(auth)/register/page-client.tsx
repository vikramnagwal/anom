"use client";

import {
	RegisterProvider,
	useRegisterContext,
} from "@/packages/ui/auth/register/context";
import { SignUpForm } from "@/packages/ui/auth/register/signup-form";
import { VerifyEmailForm } from "@/packages/ui/auth/register/verify-email";
import Link from "next/link";
import { useSonner } from "sonner";

export default function RegisterPageClient() {
	return (
		<RegisterProvider>
			<RegisterPageFlow />
		</RegisterProvider>
	);
}

function SignUp() {
	return (
		<>
			<div className="w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl sm:border sm:shadow-sm">
				<div className="border-b border-neutral-200 bg-white pb-6 pt-8 text-center">
					<h3 className="text-lg font-semibold">Get started with Anom</h3>
				</div>
				<div className="bg-neutral-50 px-4 py-8 sm:px-16">
					<SignUpForm />
				</div>
			</div>
			<p className="mt-4 text-center text-sm text-neutral-500">
				Already have an account?&nbsp;
				<Link
					href="/login"
					className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black"
				>
					Sign in
				</Link>
			</p>
		</>
	);
}

export function Verify() {
	const { email } = useRegisterContext();
	return (
		<>
			<div className="w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl sm:border sm:shadow-sm">
				<div className="flex flex-col items-center justify-center gap-3 border-b border-neutral-200 bg-white px-4 pb-6 pt-8 text-center sm:px-16">
					<h3 className="text-xl font-semibold">Verify your email address</h3>
					<p className="text-sm text-neutral-500">
						Enter the six digit verification code sent to{" "}
						<strong className="font-medium text-neutral-600" title={email}>
							{email}
						</strong>
					</p>
				</div>
				<div className="bg-neutral-50 px-4 py-8 sm:px-16">
					<VerifyEmailForm />
				</div>
			</div>
		</>
	);
}

function RegisterPageFlow() {
	const { step } = useRegisterContext();

	switch (step) {
		case "signup":
			return <SignUp />;
		case "verify":
			return <Verify />;
		default:
			return <SignUp />;
	}
}
