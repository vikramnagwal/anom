"use client";

import React, { PropsWithChildren, WheelEventHandler } from "react";
import * as PopoverPrimitive from "@radix-ui/themes/components/popover";
import { Drawer } from "vaul";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "../utils/functions/cn";

export type PopoverProps = PropsWithChildren<{
	content: React.ReactNode;
	align?: "center" | "start" | "end";
	side?: "bottom" | "top" | "left" | "right";
	openPopover: boolean;
	setOpenPopover: (open: boolean) => void;
	mobileOnly?: boolean;
	popoverContentClassName?: string;
	collisionBoundary?: Element | Element[];
	sticky?: "partial" | "always";
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	onWheel?: WheelEventHandler;
}>;

export function Popover({
	children,
	content,
	align = "center",
	side = "bottom",
	openPopover,
	setOpenPopover,
	mobileOnly = false,
	popoverContentClassName,
	collisionBoundary,
	sticky,
	onEscapeKeyDown,
	onWheel,
}: PopoverProps) {
	const isMobile = useMediaQuery("only screen and (max-width : 768px)");

	if (mobileOnly || isMobile) {
		return (
			<Drawer.Root open={openPopover} onOpenChange={setOpenPopover}>
				<Drawer.Trigger className="sm:hidden" asChild>
					{children}
				</Drawer.Trigger>
				<Drawer.Portal>
					<Drawer.Overlay className="bg-bg-subtle fixed inset-0 z-50 bg-opacity-10 backdrop-blur" />
					<Drawer.Content
						className="border-border-subtle bg-bg-default fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t"
						onEscapeKeyDown={onEscapeKeyDown}
						onPointerDownOutside={(e) => {
							if (
								e.target instanceof Element &&
								e.target.closest("[data-sonner-toast]")
							) {
								e.preventDefault();
							}
						}}
					>
						<div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
							<div className="bg-border-default my-3 h-1 w-12 rounded-full" />
						</div>
						<div className="bg-bg-default flex min-h-[150px] w-full items-center justify-center overflow-hidden pb-8 align-middle shadow-xl">
							{content}
						</div>
					</Drawer.Content>
					<Drawer.Overlay />
				</Drawer.Portal>
			</Drawer.Root>
		);
	}

	return (
		<PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
			<PopoverPrimitive.Trigger>{children}</PopoverPrimitive.Trigger>
			<PopoverPrimitive.Content
				sideOffset={8}
				align={align}
				side={side}
				className={cn(
					"animate-slide-up-fade border-border-subtle bg-bg-default z-50 items-center rounded-lg border drop-shadow-lg sm:block",
					popoverContentClassName,
				)}
				sticky={sticky}
				collisionBoundary={collisionBoundary}
				onEscapeKeyDown={onEscapeKeyDown}
				onWheel={onWheel}
			>
				{content}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Root>
	);
}
