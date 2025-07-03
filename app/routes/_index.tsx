import TestPage from "@/components/pages/public/guest/test.page";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "FTCC | EMR" },
    {
      name: "description",
      content: "Electronic Medical Records system for FTCC.",
    },
  ];
};

export default function Home() {
  return <TestPage />;
}
