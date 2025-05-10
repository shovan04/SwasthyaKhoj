'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeProviderDetails, SummarizeProviderDetailsInput, SummarizeProviderDetailsOutput } from '@/ai/flows/summarize-provider-details';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Sparkles, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export default function ProviderSummaryPage() {
  const [providerDetails, setProviderDetails] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!providerDetails.trim()) {
      setError('Please enter provider details.');
      toast({
        title: "Input Required",
        description: "Provider details cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      const input: SummarizeProviderDetailsInput = { providerDetails };
      const result: SummarizeProviderDetailsOutput = await summarizeProviderDetails(input);
      setSummary(result.summary);
      toast({
        title: "Summary Generated",
        description: "AI has successfully summarized the provider details.",
      });
    } catch (err) {
      console.error('Error summarizing provider details:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Failed to generate summary: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-4"> {/* Added py-4 for vertical spacing consistent with other pages */}
      <section>
        <h2 className="text-2xl font-semibold mb-1 text-primary">AI Provider Summary</h2>
        <p className="text-muted-foreground">
          Enter details about a healthcare provider to get an AI-generated summary of their specializations and background.
        </p>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-primary" />
            Generate Summary
          </CardTitle>
          <CardDescription>
            Paste the provider's information below (e.g., from a website or document).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter provider details here..."
            value={providerDetails}
            onChange={(e) => setProviderDetails(e.target.value)}
            rows={10}
            className="text-base"
            aria-label="Provider details input"
          />
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <LoadingSpinner size={20} className="mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Summary
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {summary && !isLoading && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-6 w-6 mr-2 text-primary" />
              Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-base leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
