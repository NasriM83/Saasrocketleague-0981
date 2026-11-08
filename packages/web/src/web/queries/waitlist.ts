import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useJoinWaitlist() {
  return useMutation(orpc.waitlist.join.mutationOptions());
}