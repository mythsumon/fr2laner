import { redirect } from "next/navigation";

export default function ExpertsPage() {
  // Redirect to search page with sellers filter
  redirect("/search?type=sellers");
}




