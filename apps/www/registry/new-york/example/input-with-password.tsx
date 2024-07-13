import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"

export default function InputWithPassword() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password-2">Password</Label>
      <Input
        type="password"
        id="password-2"
        placeholder="Password"
        className="focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <p className="text-sm text-muted-foreground">Enter your password.</p>
    </div>
  )
}
