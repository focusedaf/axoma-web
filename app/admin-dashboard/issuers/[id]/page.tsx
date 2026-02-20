import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function IssuerDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const issuer = {
    id: params.id,
    name: "John Doe",
    type: "Professor",
    email: "john@uni.edu",
    wallet: "0x1234...abcd",
    status: "pending",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Issuer Details</h2>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Name:</strong> {issuer.name}
          </p>
          <p>
            <strong>Type:</strong> {issuer.type}
          </p>
          <p>
            <strong>Email:</strong> {issuer.email}
          </p>
          <p>
            <strong>Wallet:</strong> {issuer.wallet}
          </p>
          <Badge>{issuer.status}</Badge>
        </CardContent>
      </Card>

      {issuer.status === "pending" && (
        <div className="flex gap-4">
          <Button>Approve</Button>
          <Button variant="destructive">Suspend</Button>
        </div>
      )}
    </div>
  );
}
