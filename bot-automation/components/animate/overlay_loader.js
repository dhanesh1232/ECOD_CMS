"use client";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import DotByDotLoader from "./circle";

export const OverlayLoader = ({ open = false, size = "lg" }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent transparent>
        <VisuallyHidden>
          <AlertDialogTitle>Loading</AlertDialogTitle>
        </VisuallyHidden>
        <DotByDotLoader size={size} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
