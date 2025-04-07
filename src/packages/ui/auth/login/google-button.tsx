import { signIn } from "next-auth/react";
import { Button } from "@ui/button";
import { Google } from "@/packages/icons/google";
import { useSearchParams } from "next/navigation";

export function GoogleButton({ next }: { next?: string }) {
	const params = useSearchParams();
	const finalNext = next ?? params.get("next") ?? "/dashboard";

	return (
		<Button
			text="Sign in with Google"
			variant={"secondary"}
			type="button"
			onClick={() => {
				signIn("google", { callbackUrl: "/onboarding/workspace" });
			}}
			icon={<Google className="w-4 h-4" />}
		/>
	);
}
