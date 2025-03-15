"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ConnectionsPage() {
  const [user, loading] = useAuthState(auth);
  const [connection, setConnection] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchConnection = async () => {
      if (!user) return;
      const docRef = doc(db, "mtConnections", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setConnection(docSnap.data());
      }
    };
    fetchConnection();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Connection Details</CardTitle>
      </CardHeader>
      <CardContent>
        {connection ? (
          <div className="space-y-2">
            <p>
              <strong>Account ID:</strong> {connection.accountId}
            </p>
            <p>
              <strong>Server:</strong> {connection.server}
            </p>
            <p>
              <strong>Trading Pair:</strong> {connection.tradingPair}
            </p>
          </div>
        ) : (
          <p>No connection details found.</p>
        )}
        <Button
          className="mt-4 bg-green-600 hover:bg-green-700"
          onClick={async () => {
            // Call your start trading API if needed.
            toast.success("Trading started!");
            // Optionally navigate to a trading dashboard page.
            router.push("/trading-dashboard");
          }}
        >
          Start Trading
        </Button>
      </CardContent>
    </Card>
  );
}
