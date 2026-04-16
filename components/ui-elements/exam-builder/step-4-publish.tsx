"use client";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function Step4Publish({ walletLoading, txLoading, publishing }: any) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Ready to Publish?</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Final Step</AlertTitle>
            <AlertDescription>
              Your exam will be stored on-chain and made available to
              candidates.
            </AlertDescription>
          </Alert>

          {walletLoading && <Spinner text="Waiting for MetaMask..." />}
          {txLoading && <Spinner text="Confirming blockchain transaction..." />}
          {publishing && !walletLoading && !txLoading && (
            <Spinner text="Publishing exam..." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
