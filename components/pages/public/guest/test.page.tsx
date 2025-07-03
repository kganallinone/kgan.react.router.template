import { Atom } from "@/components/atoms/_kgan.atoms";

export default function TestPage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      {/* <Atomics.Button variant={"destructive"}>TEST</Button>
      <Label>TEST</Label> */}
      <Atom.Button variant={"link"}>TEST</Atom.Button>
    </div>
  );
}
