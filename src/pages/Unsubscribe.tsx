import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const supabaseUrl = (supabase as any).supabaseUrl ?? import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleUnsubscribe = async () => {
    setStatus("loading");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="font-display text-2xl font-bold text-foreground mb-4">
          Email Preferences
        </h1>

        {status === "loading" && (
          <p className="text-muted-foreground">Loading…</p>
        )}

        {status === "valid" && (
          <>
            <p className="text-muted-foreground mb-6">
              Click the button below to unsubscribe from future emails.
            </p>
            <button
              onClick={handleUnsubscribe}
              className="bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Confirm Unsubscribe
            </button>
          </>
        )}

        {status === "success" && (
          <p className="text-muted-foreground">
            You've been unsubscribed. You won't receive any more emails.
          </p>
        )}

        {status === "already" && (
          <p className="text-muted-foreground">
            You're already unsubscribed.
          </p>
        )}

        {status === "invalid" && (
          <p className="text-muted-foreground">
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {status === "error" && (
          <p className="text-destructive">
            Something went wrong. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
